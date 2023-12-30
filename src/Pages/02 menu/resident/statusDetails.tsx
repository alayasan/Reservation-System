import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import styles from "../../../styles";

const StatusDetails = ({ route }) => {
  const { reservation } = route.params;

  return (
    <View>
      <Text>Reservation ID: {reservation.id}</Text>
      <Text>Status: {reservation.status}</Text>
      <Text>Status: {reservation.address}</Text>
      <Text>Status: {reservation.borrowDate}</Text>
      {/* Display other reservation details here */}
      {reservation.status === "approved" && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            // Add your download logic here
          }}
        >
          <Text>Download File</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StatusDetails;
