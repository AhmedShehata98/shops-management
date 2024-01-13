import { useState } from "react";
import "./App.css";
import AddShopsModalWrapper from "./components/AddShopsModalWrapper";
import GmapsWrapper from "./components/GmapsWrapper";
import HeadingBar from "./components/HeadingBar";
import ShopsTableWrapper from "./components/ShopsTableWrapper";
import useFIrebase from "./hooks/useFIrebase";
import useFireStore from "./hooks/useFireStore";
import useShopsCollection from "./hooks/useShopsCollection";
import usePathsList from "./hooks/usePathsList";

function App() {
  const { app: firebaseApp } = useFIrebase();
  const { db } = useFireStore({ app: firebaseApp });
  const {
    isLoading,
    error,
    isError,
    shopsList,
    handleCreateShop,
    handleUpdateShop,
    handleDeleteShop,
  } = useShopsCollection({ db });
  usePathsList({ isError, isLoading, shops: shopsList });

  return (
    <main className="app-main">
      <div className="google-maps">
        <HeadingBar />
        <GmapsWrapper />
      </div>
      <ShopsTableWrapper
        onDelete={handleDeleteShop}
        shops={shopsList}
        isLoading={isLoading}
        isError={isError}
      />
      <AddShopsModalWrapper
        onCreate={handleCreateShop}
        onEdit={handleUpdateShop}
      />
    </main>
  );
}

export default App;
