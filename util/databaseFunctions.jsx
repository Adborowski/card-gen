import { database } from "@/util/firebase";
import { ref, set } from "firebase/database";

export const deleteCard = async (card) => {
  set(ref(database, `/cards-deleted/${card.id}`), {
    ...card,
    dateDeleted: new Date().toUTCString(),
  });

  set(ref(database, `/cards/${card.id}`), null)
    .then(() => {
      console.log("deleted card", card.id);
    })
    .catch((e) => {
      console.log("failed to delete card", card.id, "//////", e.message);
    });
};
