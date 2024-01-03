import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { NavProps } from "../../../interface/navProps";
import styles from "../../../styles";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_STORAGE } from "../../../../firebaseConfig";
import { StorageReference, ref, uploadBytesResumable } from "firebase/storage";
import { updateFilenameInDB } from "./filenameupdate/filnameupdate";


const UploadDocument = ({ route, navigation }: NavProps) => {
  const { reservationId } = route.params;
  const [filename, setFilename] = useState("");
  const [fileRef, setFileRef] = useState<StorageReference | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);

  const selectDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all file types
      });

      if (!res.canceled && res.assets && res.assets.length > 0) {
        const actualFilename = res.assets[0].name;
        setFilename(actualFilename);

        // Create a reference to the file in Firebase Storage
        const fileRef = ref(
          FIREBASE_STORAGE,
          `reservations/${reservationId}/${actualFilename}`
        );
        setFileRef(fileRef);
        setUri(res.assets[0].uri);
      } else {
        console.log("Document picker was cancelled");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadDocument = async (fileRef: string, uri: string) => {
    setUploadStarted(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadTask = uploadBytesResumable(fileRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);

        if (progress === 100) {
          Alert.alert(
            "Upload Complete",
            "The reservation form has been approved.",
            [
              {
                text: "OK",
                onPress: () => {
                  console.log("OK Pressed");
                  navigation.navigate("AdminMenu");
                },
              },
            ]
          );
          updateFilenameInDB(reservationId, filename);
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log("Upload is complete");
      }
    );
  };

  return (
    <View style={[styles.backgroundApprove, {paddingTop: 30}]}>
      <View style={[styles.content, { alignItems: "center" }]}>
        <Text style={[styles.upload, { marginTop: 10, marginBottom: 20 }]}>
          Upload the Document
        </Text>
        <Ionicons name="document-text-outline" size={230} color="#000" />
        {filename && <Text>{filename}</Text>}
        {/* <Text>{reservationId}</Text> */}
        <TouchableOpacity
          style={[styles.submitButton]}
          onPress={selectDocument}
        >
          <Text>Select File</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton]}
          onPress={() => uploadDocument(fileRef, uri)}
        >
          <Text>Upload File</Text>
        </TouchableOpacity>
        {uploadStarted && (
          <Text style={{ paddingTop: 29 }}>
            Upload Progress: {uploadProgress}%
          </Text>
        )}
      </View>
    </View>
  );
};

export default UploadDocument;
