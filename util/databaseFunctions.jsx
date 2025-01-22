export const database = getDatabase(firebase);
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { firebase } from "@/util/firebase";

export const getCards = async () => {
  console.log("getting cards...");
  const dbRef = ref(getDatabase());

  const snapshot = await get(child(dbRef, "cards/"));

  let cardsData = {};

  if (snapshot.exists()) {
    cardsData = snapshot.val();
  } else {
    console.log("no data");
  }

  return cardsData;
};
