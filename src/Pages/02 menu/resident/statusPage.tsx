import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../../firebaseConfig";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import { NavProps } from "../../../interface/navProps";
import { IconButton, Menu } from "react-native-paper";

const StatusPage = ({ navigation }: NavProps) => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [dropDownMenu, setDropdownMenu] = useState("");

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const fetchReservationsByStatus = (status: string) => {
    setDropdownMenu(status);
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const reservationsRef = ref(
        FIREBASE_DATABASE,
        `reservations/${user.uid}`
      );

      const handleData = (snap: DataSnapshot) => {
        if (snap.val()) {
          const reservationObjects = snap.val();
          let reservationList = Object.keys(reservationObjects).map(
            (key) => ({
              ...reservationObjects[key],
              id: key,
            })
          );

          reservationList = reservationList.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return dateB.getTime() - dateA.getTime();
          });

          const filteredReservations =
            status == "All"
              ? reservationList
              : reservationList.filter(
                  (reservation) => reservation.status === status
                );
          setReservations(filteredReservations);
        }
      };

      const unsubscribe = onValue(reservationsRef, handleData, {});
      return () => unsubscribe();
    }
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
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setUserId(user.uid);
      fetchReservationsByStatus("All");
    }
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
            console.log("userId:", FIREBASE_AUTH.currentUser?.uid);
            navigation.navigate("Status Details", { reservation, userId });
          }}
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
                  : reservation.status === "returned"
                  ? "rgba(238, 139, 96, 1)"
                  : reservation.status == "completed"
                  ? "rgba(249, 207, 88, 1)"
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
