import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import styles from "../../../styles";
import { ref, update } from "firebase/database";
import { NavProps } from "../../../interface/navProps";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";

const statusColor = {
  approved: "rgba(36, 150, 137, 0.8)",
  rejected: "rgba(255, 89, 99, 1)",
  pending: "rgba(224, 227, 231, 100)",
  returned: "rgba(249, 207, 88, 1)",
};

const StatusDetails = ({ route, navigation }: NavProps) => {
  const { reservation, userId } = route.params;
  const backgroundColor = statusColor[reservation.status] || "defaultColor";

  const dynamicStyles = StyleSheet.create({
    backgroundStatus: {
      ...styles.backgroundStatus,
      backgroundColor,
    },
  });

  return (
    <View style={[dynamicStyles.backgroundStatus, { paddingTop: 30 }]}>
      <View style={[styles.content, { height: "85%" }]}>
        <Text style={[styles.reservationDetails, { textAlign: "center" }]}>
          Reservation ID: {reservation.id}
        </Text>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Name of Borrower: </Text>
          <Text style={{ paddingRight: 50 }}>{reservation.borrower}</Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Address: </Text>
          <Text style={{ paddingRight: 50, textTransform: "capitalize" }}>
            {reservation.address}
          </Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Venue to be used: </Text>
          <Text style={{ paddingRight: 50 }}>
            {reservation.venue}
          </Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Purpose: </Text>
          <Text style={{ paddingRight: 50 }}>{reservation.purpose}</Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Date to be Borrowed: </Text>
          <Text>{reservation.borrowDate}</Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Date to be Returned:</Text>
          <Text> {reservation.returnDate}</Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Status: </Text>
          <Text style={{ textTransform: "capitalize" }}>
            {reservation.status}
          </Text>
        </View>

        {reservation.status === "approved" && (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.submitButton, { width: "60%" }]}
              onPress={() => {
                console.log("reservationId:", reservation.id);
                console.log("userId:", reservation.uid);

                Alert.alert("Confirmation", "Have you returned the items?", [
                  {
                    text: "No",
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      const reservationRef = ref(
                        FIREBASE_DATABASE,
                        `reservations/${userId}/${reservation.id}`
                      );
                      update(reservationRef, { status: "returned" })
                        .then(() => {
                          Alert.alert(
                            "Success!",
                            "Thank you for returning the items.",
                            [
                              {
                                text: "OK",
                                onPress: () =>
                                  navigation.navigate("Status"),
                              },
                            ]
                          );
                        })
                        .catch((error) =>
                          console.error(
                            "Error updating reservation status:",
                            error
                          )
                        );
                    },
                    style: "default",
                  },
                ]);
              }}
            >
              <Text style={{ textAlign: "center" }}>Return items</Text>
            </TouchableOpacity>
          </View>
        )}

        {reservation.status === "rejected" && (
          <View>
            <View
              style={[
                styles.checkboxContainer,
                {
                  height: "30%",
                  marginTop: 20,
                  alignItems: "flex-start",
                  padding: 20,
                  borderColor: "black",
                  borderWidth: 1,
                },
              ]}
            >
              <View style={{ flexDirection: "column" }}>
                <Text>Reason for rejection:</Text>
                <Text style={{ width: 220 }}>
                  {reservation.rejectionReason}
                </Text>
              </View>
            </View>

            <View
              style={{
                // flex: 1,
                alignItems: "center",
                paddingTop: 140,
              }}
            >
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate("ResidentMenu")}
              >
                <Text>Ok.</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default StatusDetails;
