import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Linking } from "react-native";

export const downloadFileFromStorage = async (
  reservationId: string,
  filename: string
) => {
  const storage = getStorage();
  const fileRef = ref(storage, `reservations/${reservationId}/${filename}`);

  try {
    const url = await getDownloadURL(fileRef);
    // Use the download URL
    Linking.openURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
