import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import styles from "../../../styles";
import { ref, set, update } from "firebase/database";
import { NavProps } from "../../../interface/navProps";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";

const statusColor = {
  approved: "rgba(36, 150, 137, 0.8)",
  rejected: "rgba(255, 89, 99, 1)",
  pending: "rgba(224, 227, 231, 100)",
  returned: "rgba(238, 139, 96, 1)",
  completed: "rgba(249, 207, 88, 1)",
};

const StatusDetails = ({ route, navigation }: NavProps) => {
  const { reservation, userId } = route.params;
  const [backgroundColor, setBackgroundColor] = useState(
    statusColor[reservation.status] || "defaultColor"
  );
  const dynamicStyles = StyleSheet.create({
    backgroundStatus: {
      ...styles.backgroundStatus,
      backgroundColor,
    },
  });

  const handleReturnItems = () => {
    Alert.alert("Return Items", "Are you sure you want to return the items?", [
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
          const returnDate = new Date();
          const returnStatus = "returned";
          const formattedReturnDate = `${
            returnDate.getMonth() + 1
          }/${returnDate.getDate()}/${returnDate.getFullYear()}`;

          set(reservationRef, {
            ...reservation,
            status: returnStatus,
            returnDate: formattedReturnDate,
            timestamp: new Date().toISOString(),
          });
          setBackgroundColor(statusColor.pending);
          Alert.alert(
            "Wait for confirmation",
            "Wait for confirmation of admin if the items are returned!"
          );
          navigation.goBack();
        },
      },
    ]);
  };

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
          <Text style={{ fontWeight: "bold" }}>Contact Number: </Text>
          <Text style={{ paddingRight: 50 }}>{reservation.phonenumber}</Text>
        </View>
        <View style={[styles.reservationsubDetails, { flexDirection: "row" }]}>
          <Text style={{ fontWeight: "bold" }}>Venue to be used: </Text>
          <Text style={{ paddingRight: 50 }}>{reservation.venue}</Text>
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
          <><View
            style={[styles.reservationsubDetails, { flexDirection: "row" }]}
          >
            <Text style={{ fontWeight: "bold" }}>Remarks: </Text>
            <Text style={{ textTransform: "capitalize" }}>
              {reservation.remarks}
            </Text>
          </View><View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleReturnItems}
              >
                <Text style={{ textAlign: "center" }}>Return items</Text>
              </TouchableOpacity>
            </View></>
        )}

        {reservation.status === "rejected" && (
          <View>
            <View
              style={[
                styles.checkboxContainer,
                {
                  height: "25%",
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
