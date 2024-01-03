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
import { ResidentMenuPage } from "./mainMenu";
import StatusPage from "./statusPage";

const Tab = createBottomTabNavigator();

const ResidentMenu = ({ navigation }: NavProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          paddingBottom: 5,
          height: 50,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ResidentMenuPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Status"
        component={StatusPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={size}
            />
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
    </Tab.Navigator>
  );
};

export default ResidentMenu;
