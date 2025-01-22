"use server";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { firebaseConfig } from "@/util/firebase";

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
let storageRef = ref(storage);

export const storeImage = async (file, filename, metadata) => {
  storageRef = ref(storage, filename);
  const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
  const imgUrl = await getDownloadURL(uploadTask.ref);
  return imgUrl;
};
