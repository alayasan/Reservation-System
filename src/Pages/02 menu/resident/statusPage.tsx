import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../../firebaseConfig";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import { NavProps } from "../../../interface/navProps";

const StatusPage = ({ navigation }: NavProps) => {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const reservationsRef = ref(
        FIREBASE_DATABASE,
        `reservations/${user.uid}`
      );

      const handleData = (snap: DataSnapshot) => {
        if (snap.val()) {
          const reservationObjects = snap.val();
          const reservationList = Object.keys(reservationObjects).map(
            (key) => ({
              ...reservationObjects[key],
              id: key,
            })
          );
          setReservations(reservationList);
        }
      };
      const unsubscribe = onValue(reservationsRef, handleData, {});
      return () => unsubscribe();
    }
  }, []);

  return (
    <View style={{ marginTop: 10 }}>
      {reservations.map((reservation) => (
        <View
          key={reservation.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
            marginHorizontal: 10,
            padding: 15,
            borderRadius: 10,
            backgroundColor:
              reservation.status === "approved"
                ? "lightgreen"
                : reservation.status === "rejected"
                ? "#FF7F7F"
                : "lightgray",
          }}
        >
          <View>
            <Text style={{ fontSize: 16 }}>
              Reservation ID: {reservation.id}
            </Text>
            <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
              Status: {reservation.status}
            </Text>
          </View>
          <TouchableOpacity
            key={reservation.id}
            onPress={() =>
              navigation.navigate("Status Details", { reservation })
            }
          >
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default StatusPage;
