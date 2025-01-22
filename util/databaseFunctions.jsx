import { database } from "@/util/firebase";
import { ref, set } from "firebase/database";

export const deleteCard = async (cardId) => {
  set(ref(database, `/cards/${cardId}`), null)
    .then(() => {
      console.log("deleted card", cardId);
    })
    .catch((e) => {
      console.log("failed to delete card", cardId, "//////", e.message);
    });
};
