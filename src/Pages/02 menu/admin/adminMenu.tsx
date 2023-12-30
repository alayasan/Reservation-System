import { View, Text } from "react-native";
import React from "react";
import { NavProps } from "../../../interface/navProps";
import styles from "../../../styles";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { Button } from "react-native-paper";

const AdminMenu = ({ navigation }: NavProps) => {
  const auth = FIREBASE_AUTH;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginForm"); // navigate back to login screen
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <View style={[styles.container]}>
      <Text>Admin Menu</Text>
      <Button mode="elevated" onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </Button>
    </View>
  );
};

export default AdminMenu;
