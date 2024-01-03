import { getDatabase, ref, onValue } from "firebase/database";
import { FIREBASE_DATABASE } from "../../../../../firebaseConfig";

export const getFilenameFromDB = (reservationId: string) => {
  return new Promise((resolve, reject) => {
    const filenameRef = ref(FIREBASE_DATABASE, `reservations/${reservationId}/filename`);

    onValue(filenameRef, (snapshot) => {
      const filename = snapshot.val();
      if (filename) {
        resolve(filename);
      } else {
        reject("No filename found");
      }
    });
  });
};
