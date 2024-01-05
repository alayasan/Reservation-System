import React, { useState, useEffect } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../../firebaseConfig";
import styles from "../../../styles";
import { signOut } from "firebase/auth";
import { NavProps } from "../../../interface/navProps";
import { Ionicons } from "@expo/vector-icons";

export function Profile({ navigation }: NavProps) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(FIREBASE_DB, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigation.navigate("LoginForm");
      console.log("User signed out");

      navigation.reset({
        index: 0,
        routes: [{ name: "LoginForm" }],
      });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          margin: 20,
          // marginTop: 50,
        }}
      >
        <Ionicons name="person-circle" size={200} color="black" />
        <View style={[styles.checkboxContainer, { flexDirection: "column", padding: 10}]}>
          <Text style={{ textTransform: "capitalize", textAlign: "center" }}>
            {user?.firstname} {user?.lastname}
          </Text>
          <Text style={{ textAlign: "center" }}>Phone Number: {user?.phonenumber}</Text>
          <Text style={{ textAlign: "center" }}>Email: {user?.email}</Text>
          <Text style={{ textAlign: "center", textTransform:"capitalize" }}>Address: {user?.address}</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: 20,
        }}
      >
        <Button mode="elevated" onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
