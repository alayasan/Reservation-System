import { View, Text } from "react-native";
import React from "react";
import { NavProps } from "../../../interface/navProps";
import styles from "../../../styles";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { Button } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Profile } from "./profile";
import { MainMenu } from "./mainMenu";
import StatusPage from "./statusPage";

const Tab = createBottomTabNavigator();

const ResidentMenu = ({ navigation }: NavProps) => {
  const auth = FIREBASE_AUTH;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("LoginForm"); // navigate back to login screen
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
    <Tab.Navigator
    screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
      >
      <Tab.Screen
        name="Main Menu"
        component={MainMenu}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />

      <Tab.Screen
        name="Status"
        component={StatusPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="Logout" options={{ title: "Logout" }}>
        {() => (
          <View style={[styles.container]}>
            <Text>Resident...</Text>
            <Button
              mode="elevated"
              onPress={handleLogout}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </Button>
          </View>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default ResidentMenu;
