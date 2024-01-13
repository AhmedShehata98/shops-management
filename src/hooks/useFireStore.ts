import React, { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

type Props = {
  app: FirebaseApp;
};
const useFireStore = ({ app }: Props) => {
  const [db] = useState(() => getFirestore(app));
  return { db };
};

export default useFireStore;
