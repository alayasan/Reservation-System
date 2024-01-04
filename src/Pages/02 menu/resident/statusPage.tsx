import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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
    <ScrollView style={{ marginTop: 5 }}>
      {reservations.map((reservation) => (
        <TouchableOpacity
          key={reservation.id}
          onPress={() => navigation.navigate("Status Details", { reservation })}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 15,
              marginVertical: 2,
              marginHorizontal: 10,
              borderRadius: 10,
              backgroundColor:
                reservation.status === "approved"
                  ? "rgba(36, 150, 137, 0.8)"
                  : reservation.status === "rejected"
                  ? "rgba(255, 89, 99, 1)"
                  : "rgba(224, 227, 231, 100)",
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
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StatusPage;
