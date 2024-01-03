import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../../../styles";
import { downloadFileFromStorage } from "./downloadFile/downloadfile";
import { getFilenameFromDB } from "./downloadFile/getfilename";
import { ref, onValue } from "firebase/database";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";
import { NavProps } from "../../../interface/navProps";

const statusColor = {
  approved: "rgba(36, 150, 137, 0.8)",
  rejected: "rgba(255, 89, 99, 1)",
  pending: "rgba(224, 227, 231, 100)",
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
        <Text style={{ paddingTop: 20 }}>Status: {reservation.status}</Text>
        <Text>Name of Borrower: {reservation.borrower}</Text>
        <Text>Address: {reservation.address}</Text>
        <Text>Purpose: {reservation.purpose}</Text>
        <Text>Date Borrowed: {reservation.borrowDate}</Text>
        <Text>Date Borrowed: {reservation.returnDate}</Text>

        {reservation.status === "approved" && (
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.submitButton}
              onPress={async () => {
                const filename = await getFilenameFromDB(
                  reservation.id
                );
                downloadFileFromStorage(reservation.id, filename);
              }}
            >
              <Text>Download File</Text>
            </TouchableOpacity>
          </View>
        )}

        {reservation.status === "rejected" && (
          <View>
            <View
              style={[
                styles.checkboxContainer,
                {
                  height: "40%",
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
                paddingTop: 140
              }}
            >
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate("ResidentMenu")}
              >
                <Text>I understand</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default StatusDetails;
