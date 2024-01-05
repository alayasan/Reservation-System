import { View, Text } from "react-native";
import React from "react";
import { NavProps } from "../../../interface/navProps";
import styles from "../../../styles";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminMenuPage from "./mainMenu";

const Tab = createBottomTabNavigator();

const AdminMenu = ({ navigation }: NavProps) => {
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
        component={AdminMenuPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <View style={[styles.container]}>
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

export default AdminMenu;
