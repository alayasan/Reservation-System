import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_DATABASE } from "../../../../../firebaseConfig";

export const updateFilenameInDB = async (
  reservationId: string,
  filename: string
) => {
  const filenameRef = ref(FIREBASE_DATABASE, `reservations/${reservationId}/filename`);
  await set(filenameRef, filename);
};
