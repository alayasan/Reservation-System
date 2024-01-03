import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, DataSnapshot, get } from "firebase/database";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";
import styles from "../../../styles";
import { NavProps } from "../../../interface/navProps";

const ApprovalPage = ({ navigation }: NavProps) => {
  type Reservation = { id: string; [key: string]: any };
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const usersRef = ref(FIREBASE_DATABASE, "reservations");
    const handleData = (snap: DataSnapshot) => {
      if (snap.val()) {
        const users = Object.keys(snap.val());
        const fetchReservations = users.map((userId) => {
          const userReservationsRef = ref(
            FIREBASE_DATABASE,
            `reservations/${userId}`
          );
          return get(userReservationsRef).then((resSnap) => {
            if (resSnap.exists()) {
              return Object.entries(resSnap.val()).map(([id, reservation]) => ({
                ...reservation,
                id,
                userId,
              }));
            } else {
              return [];
            }
          });
        });

        Promise.all(fetchReservations).then((reservations) => {
          const pendingReservations = reservations
            .flat()
            .filter((reservation) => reservation.status === "pending");
          setReservations(pendingReservations);
        });
      }
    };

    const unsubscribe = onValue(usersRef, handleData, {
      onlyOnce: true,
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={reservations}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(`User ID: ${item.userId}`);
              navigation.navigate("Reservation Details", {
                reservationId: item.id,
                reservationData: item,
                userId: item.userId,
              });
            }}
          >
            <View style={styles.parentContainer}>
              <View style={styles.approvalContainer}>
                <Text style={styles.textApprovalPage}>{item.id}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ApprovalPage;
