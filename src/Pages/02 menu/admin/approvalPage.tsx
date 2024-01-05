import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, DataSnapshot, get } from "firebase/database";
import { FIREBASE_DATABASE } from "../../../../firebaseConfig";
import styles from "../../../styles";
import { NavProps } from "../../../interface/navProps";
import { Ionicons } from "@expo/vector-icons";

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
          const allReservations = reservations.flat();
          setReservations(allReservations);
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
              <View
                style={[
                  styles.approvalContainer,
                  {
                    backgroundColor:
                      item.status === "approved"
                        ? "rgba(36, 150, 137, 0.8)"
                        : item.status === "rejected"
                        ? "rgba(255, 89, 99, 1)"
                        : item.status === "returned"
                        ? "rgba(249, 207, 88, 1)"
                        : "rgba(224, 227, 231, 100)",
                  },
                ]}
              >
                <View>
                  <Text style={styles.textApprovalPage}>
                    Reservation ID: {item.id}
                  </Text>
                  <Text
                    style={[
                      styles.textApprovalPage,
                      { textTransform: "capitalize" },
                    ]}
                  >
                    Status: {item.status}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="black"
                />
              </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ApprovalPage;
