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

const Rejectpage = ({ route, navigation }: NavProps) => {
  const [reason, setReason] = useState("");
  const { userId, reservationId } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerStyle: { backgroundColor: "rgba(255, 89, 99, 1)", elevation: 0 },
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
      <View style={styles.backgroundReject}>
        <View style={[styles.content, { alignItems: "center" }]}>
          <Text style={[styles.upload, { marginTop: 10, marginBottom: 20 }]}>
            Reason for Rejection
          </Text>
          <TextInput
            label="Reason"
            style={[
              styles.textInput,
              { width: "100%", height: 100, borderRadius: 5 },
            ]}
            value={reason}
            multiline
            numberOfLines={4}
            onChangeText={(text) => setReason(text)}
          ></TextInput>
          <TouchableOpacity
            style={{ borderRadius: 50, padding: 10, paddingTop: 50 }}
            onPress={() => {
              Alert.alert(
                "Confirm Rejection",
                "Are you sure you want to reject this reservation?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Reject",
                    onPress: () => {
                      const reservationRef = ref(
                        FIREBASE_DATABASE,
                        `reservations/${userId}/${reservationId}`
                      );
                      update(reservationRef, { rejectionReason: reason })
                        .then(() => {
                          Alert.alert(
                            "Reservation Rejected",
                            "The reservation has been successfully rejected.",
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
                        })
                        .catch((error) =>
                          console.error(
                            "Error updating rejection reason:",
                            error
                          )
                        );
                    },
                  },
                ]
              );
            }}
          >
            <Image
              source={require("../../../assets/images/cross.png")}
              style={{ width: 60, height: 60 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Rejectpage;
