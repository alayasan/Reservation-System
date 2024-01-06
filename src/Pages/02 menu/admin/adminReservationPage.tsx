import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, DataSnapshot, get } from "firebase/database";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../../firebaseConfig";
import styles from "../../../styles";
import { NavProps } from "../../../interface/navProps";
import { Ionicons } from "@expo/vector-icons";
import { IconButton, Menu } from "react-native-paper";

const AdminReservationPage = ({ navigation }: NavProps) => {
  type Reservation = { id: string; [key: string]: any };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [visible, setVisible] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dropDownMenu, setDropdownMenu] = useState("");

  const fetchReservationsByStatus = (status: string) => {
    setDropdownMenu(status);
    const reservationsRef = ref(FIREBASE_DATABASE, `reservations`);

    const handleData = (snap: DataSnapshot) => {
      if (snap.val()) {
        const reservationObjects = snap.val();
        let reservationList = Object.keys(reservationObjects).map((userId) =>
          Object.keys(reservationObjects[userId]).map((reservationId) => ({
            ...reservationObjects[userId][reservationId],
            id: reservationId,
            userId: userId,
          }))
        );

        reservationList = reservationList.flat();
        reservationList = reservationList.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateB.getTime() - dateA.getTime();
        });

        // Filter the reservations to only include those with the selected status
        const filteredReservations =
          status === "All"
            ? reservationList
            : reservationList.filter(
                (reservation) => reservation.status === status
              );

        setReservations(filteredReservations);
      }
    };

    const unsubscribe = onValue(reservationsRef, handleData, {});
    return () => unsubscribe();
  };

  // dropdown menu
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", marginRight: 10 }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="menu"
                iconColor="black"
                size={25}
                onPress={openMenu}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                fetchReservationsByStatus("All");
                closeMenu();
              }}
              title="All"
            />
            <Menu.Item
              onPress={() => {
                fetchReservationsByStatus("pending");
                closeMenu();
              }}
              title="Pending"
            />
            <Menu.Item
              onPress={() => {
                fetchReservationsByStatus("approved");
                closeMenu();
              }}
              title="Approved"
            />
            <Menu.Item
              onPress={() => {
                fetchReservationsByStatus("rejected");
                closeMenu();
              }}
              title="Rejected"
            />
            <Menu.Item
              onPress={() => {
                fetchReservationsByStatus("returned");
                closeMenu();
              }}
              title="Returned"
            />
            <Menu.Item
              onPress={() => {
                fetchReservationsByStatus("completed");
                closeMenu();
              }}
              title="Completed"
            />
          </Menu>
        </View>
      ),
    });
  }, [navigation, visible]);

  useEffect(() => {
    fetchReservationsByStatus("All");
  }, []);

  return (
    <ScrollView style={{ marginTop: 5 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 10,
          textTransform: "capitalize",
          paddingLeft: 12,
        }}
      >
        {dropDownMenu}
      </Text>
      {reservations.map((reservation) => (
        <TouchableOpacity
          key={reservation.id}
          onPress={() => {
            console.log("userId:", reservation.userId);
            navigation.navigate("Reservation Details", {
              reservationId: reservation.id,
              reservationData: reservation,
              userId: reservation.userId,
            });
          }}
        >
          <View
            style={[
              styles.approvalContainer,
              {
                backgroundColor:
                  reservation.status === "approved"
                    ? "rgba(36, 150, 137, 0.8)"
                    : reservation.status === "rejected"
                    ? "rgba(255, 89, 99, 1)"
                    : reservation.status === "returned"
                    ? "rgba(238, 139, 96, 1)"
                    : reservation.status == "completed"
                    ? "rgba(249, 207, 88, 1)"
                    : "rgba(224, 227, 231, 100)",
              },
            ]}
          >
            <View>
              <Text style={styles.textApprovalPage}>
                Reservation ID: {reservation.id}
              </Text>
              <Text
                style={[
                  styles.textApprovalPage,
                  { textTransform: "capitalize" },
                ]}
              >
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

export default AdminReservationPage;
