import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Firestore,
} from "firebase/firestore";

type Props = {
  db: Firestore;
};
const useShopsCollection = ({ db }: Props) => {
  const [shopsList, setShopsList] = useState<Array<ShopsType>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [shopsCollectionRef] = useState(() => collection(db, "shops"));

  const handleGetShops = async () => {
    try {
      const shops = await getDocs(shopsCollectionRef);
      const shopDocs = shops.docs.map((shopDoc) => ({
        ...shopDoc.data(),
        id: shopDoc.id,
      })) as ShopsType[];

      setShopsList(shopDocs);
      setIsLoading(false);
      setIsError(false);
    } catch (error: any) {
      setIsLoading(false);
      setIsError(true);
      setError(error.message);
    }
  };

  const handleCreateShop = async (newShopData: Omit<ShopsType, "id">) => {
    try {
      await addDoc(shopsCollectionRef, newShopData);
      await handleGetShops();
    } catch (error: any) {
      setIsError(true);
      setError(error.message);
    }
  };
  const handleUpdateShop = async (
    id: string,
    newShopData: Partial<ShopsType>
  ) => {
    try {
      const shopDoc = doc(db, "shops", id);
      await updateDoc(shopDoc, newShopData);
      await handleGetShops();
    } catch (error: any) {
      setIsError(true);
      setError(error.message);
    }
  };
  const handleDeleteShop = async (id: string) => {
    try {
      const shopDoc = doc(db, "shops", id);
      await deleteDoc(shopDoc);
      await handleGetShops();
    } catch (error: any) {
      setIsError(true);
      setError(error.message);
    }
  };

  useEffect(() => {
    handleGetShops();
  }, []);

  return {
    isLoading,
    isError,
    error,
    shopsList,
    handleGetShops,
    handleCreateShop,
    handleUpdateShop,
    handleDeleteShop,
  };
};

export default useShopsCollection;
