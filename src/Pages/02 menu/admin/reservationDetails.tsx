import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles";
import "firebase/database";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";
import { ref, update } from "firebase/database";
import { NavProps } from "../../../interface/navProps";

type Reservation = { [key: string]: any };

const ReservationDetails = ({ route, navigation }: NavProps) => {
  const { reservationId, reservationData, userId } = route.params;
  const [reservation, setReservation] = useState<Reservation | null>(
    reservationData
  );

  // const approveReservation = () => {
  //   console.log("Approve button pressed");
  //   console.log("userId:", userId);
  //   console.log("reservationId:", reservationId);

  //   const reservationRef = ref(
  //     FIREBASE_DATABASE,
  //     `reservations/${userId}/${reservationId}`
  //   );
  //   update(reservationRef, { status: "approved" })
  //     .then(() => {
  //       console.log("Reservation status updated to approved");
  //       navigation.navigate("Upload Document", {
  //         reservationId: reservationId,
  //         userId: userId,
  //       });
  //     })
  //     .catch((error) =>
  //       console.error("Error updating reservation status:", error)
  //     );
  // };

  const approveReservation = () => {
    Alert.alert(
      "Confirm Approval",
      "Are you sure you want to approve this reservation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const reservationRef = ref(
              FIREBASE_DATABASE,
              `reservations/${userId}/${reservationId}`
            );
            update(reservationRef, { status: "approved" })
              .then(() => {
                Alert.alert(
                  "Confirmation",
                  "The reservation has been approved.",
                  [
                    {
                      text: "OK",
                      onPress: () => navigation.navigate("AdminMenu"),
                    },
                  ]
                );
              })
              .catch((error) =>
                console.error("Error updating reservation status:", error)
              );
          },
        },
      ]
    );
  };

  const rejectReservation = () => {
    console.log("Reject button pressed");

    const reservationRef = ref(
      FIREBASE_DATABASE,
      `reservations/${userId}/${reservationId}`
    );
    update(reservationRef, { status: "rejected" })
      .then(() => {
        console.log("Reservation status updated to rejected");
        navigation.navigate("Reject", {
          userId: userId,
          reservationId: reservationId,
        });
      })
      .catch((error) =>
        console.error("Error updating reservation status:", error)
      );
  };

  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={styles.reservationDetails}>
          Reservation ID: {reservationId}
        </Text>
        {reservation && (
          <>
            <Text
              style={[styles.reservationDetailsSubtext, { paddingTop: 20 }]}
            >
              Name of Borrower: {reservation.borrower}
            </Text>
            <Text
              style={[
                styles.reservationDetailsSubtext,
                { textTransform: "capitalize" },
              ]}
            >
              Address: {reservation.address}
            </Text>
            <Text style={[styles.reservationDetailsSubtext]}>
              Venue to be used: {reservation.venue}
            </Text>
            <Text style={styles.reservationDetailsSubtext}>
              Active Phone Number: {reservation.activePhonenumber}
            </Text>
            <Text style={styles.reservationDetailsSubtext}>
              Purpose: {reservation.purpose}
            </Text>
            <Text style={styles.reservationDetailsSubtext}>
              Borrow Date: {reservation.borrowDate}
            </Text>
            <Text style={styles.reservationDetailsSubtext}>
              Return Date: {reservation.returnDate}
            </Text>
            <Text
              style={[
                styles.reservationDetailsSubtext,
                { textTransform: "capitalize" },
              ]}
            >
              Status: {reservation.status}
            </Text>

            <Text
              style={[
                styles.reservationDetailsSubtext,
                { fontWeight: "bold", paddingTop: 20 },
              ]}
            >
              Borrowed Items:
            </Text>

            {reservation &&
              reservation.items &&
              Object.entries(reservation.items).map(([key, value]) => {
                if (value) {
                  let imageSource;
                  let displayText;
                  switch (key) {
                    case "monoblocChair":
                      imageSource = require("../../../assets/images/monobloc.png");
                      displayText = "Monobloc Chair";
                      break;
                    case "tent":
                      imageSource = require("../../../assets/images/tent.jpg");
                      displayText = "Tent";
                      break;
                    case "soundSystem":
                      imageSource = require("../../../assets/images/soundsystem.jpg");
                      displayText = "Sound System";
                      break;
                    case "serviceVehicle":
                      imageSource = require("../../../assets/images/servicecar.jpg");
                      displayText = "Service Vehicle";
                      break;
                  }
                  return (
                    <View
                      key={key}
                      style={[
                        styles.checkboxContainer,
                        {
                          padding: 10,
                          marginHorizontal: 10,
                          marginVertical: 5,
                          backgroundColor: "rgba(241, 244, 248, 100)",
                          borderColor: "black",
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <View style={[styles.imageItems]}>
                        <Image
                          source={imageSource}
                          style={{ width: 60, height: 60 }}
                        />
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 16 }}>{displayText}</Text>
                        <Text style={{ fontSize: 12 }}>Quantity: {value} </Text>
                      </View>
                    </View>
                  );
                }
              })}
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        {reservation?.status === "rejected" && (
          <View
            style={{ backgroundColor: "rgba(255, 89, 99, 1)", padding: 10, borderRadius: 10 }}
          >
            <Text style={{ color: "white" }}>Rejection Reason: {reservation.rejectionReason}</Text>
          </View>
        )}
        {reservation?.status === "pending" && (
          <>
            <TouchableOpacity
              style={{ borderRadius: 50, padding: 10 }}
              onPress={() => {
                approveReservation();
              }}
            >
              <Image
                source={require("../../../assets/images/check.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ borderRadius: 50, padding: 10 }}
              onPress={() => {
                rejectReservation();
              }}
            >
              <Image
                source={require("../../../assets/images/cross.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ReservationDetails;
