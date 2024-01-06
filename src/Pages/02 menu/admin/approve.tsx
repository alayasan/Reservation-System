import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NavProps } from "../../../interface/navProps";
import styles from "../../../styles";
import { TextInput } from "react-native-paper";
import { ref, update } from "firebase/database";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const RemarksApprove = ({ route, navigation }: NavProps) => {
  const [remarks, setRemarks] = useState("");
  const { userId, reservationId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerStyle: { backgroundColor: "rgba(36, 150, 137, 0.8)", elevation: 0 },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={25}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.backgroundApprove}>
        <View style={[styles.content, { alignItems: "center" }]}>
          <Text style={[styles.upload, { marginTop: 10, marginBottom: 20 }]}>
            Remarks
          </Text>
          <TextInput
            label=" "
            style={[
              styles.textInput,
              { width: "100%", height: 100, borderRadius: 5 },
            ]}
            value={remarks}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setRemarks(text)}
          ></TextInput>
          <TouchableOpacity
            style={{ borderRadius: 50, padding: 10, paddingTop: 50 }}
            onPress={() => {
              Alert.alert(
                "Approve Reservation",
                "Are you sure you want to approve this reservation?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Approve",
                    onPress: () => {
                      const reservationRef = ref(
                        FIREBASE_DATABASE,
                        `reservations/${userId}/${reservationId}`
                      );
                      update(reservationRef, {
                        remarks: remarks,
                        status: "approved",
                      })
                        .then(() => {
                          Alert.alert(
                            "Reservation Approved",
                            "The reservation has been successfully approved.",
                            [
                              {
                                text: "OK",
                                onPress: () => {
                                  console.log("OK Pressed");
                                  navigation.navigate("Reservation Forms");
                                },
                              },
                            ]
                          );
                        })
                        .catch((error) =>
                          console.error("Error updating remarks:", error)
                        );
                    },
                  },
                ]
              );
            }}
          >
            <Image
              source={require("../../../assets/images/check.png")}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RemarksApprove;
