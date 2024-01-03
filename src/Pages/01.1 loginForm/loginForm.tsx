import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NavProps } from "../../interface/navProps";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import styles from "../../styles";
import { useEffect, useState } from "react";
import { Image, BackHandler, ToastAndroid } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validateEmail } from "../../functions";
import { CommonActions } from "@react-navigation/native";

export const LoginFormScreen = ({ navigation }: NavProps) => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
    const [emailError, setEmailError] = useState<string | null>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEmail("");
      setPassword("");
    });

    return unsubscribe;
  }, [navigation]);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      if (response.user) {
        const userDoc = doc(FIREBASE_DB, "users", response.user.uid);
        const userDocSnapshot = await getDoc(userDoc);
        const userData = userDocSnapshot.data();

        if (userData) {
          const type = userData.type;
          console.log("User data: ", userData);
          console.log("Type: ", type);
          Alert.alert("Success ✅", "You have successfully logged in.");

          if (type === "admin") {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Admin", params: { screen: "AdminMenu" } }],
              })
            );
            console.log("Admin");
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: "Resident", params: { screen: "ResidentMenu" } },
                ],
              })
            );
            console.log("Resident");
          }
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/invalid-credential") {
        Alert.alert("Error ❌", "Invalid credentials or the account does not exist. Please try again.");
      } else {
        Alert.alert("Error ❌", "Unsuccessful login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container]}>
        <Image
          style={{
            width: 150,
            height: 150,
            marginBottom: 30,
            marginTop: -120,
          }}
          source={require("../../assets/images/profile.png")}
        />
        <TextInput
          value={email}
          label={"Email"}
          activeUnderlineColor="blue"
          autoCapitalize="none"
          onChangeText={(email) => {
            setEmail(email);
            if (!validateEmail(email)) {
              setEmailError("Invalid email format");
            } else {
              setEmailError(null);
            }
          }}
          error={emailError}
          placeholder="abcd@gmail.com"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          style={[styles.textInput, { height: 60 }]}
          keyboardType="email-address"
        ></TextInput>

        <TextInput
          value={password}
          label={"Password"}
          placeholder="*******"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          activeUnderlineColor="blue"
          autoCapitalize="none"
          secureTextEntry={!showPassword}
          onChangeText={(text) => setPassword(text)}
          style={[styles.textInput, { height: 60 }]}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button
              mode="elevated"
              style={{ width: "30%", backgroundColor: "#fff", marginTop: 20 }}
              onPress={signIn}
            >
              Login
            </Button>
          </>
        )}

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={{ marginRight: 3 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupForm")}>
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              Sign up here.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginFormScreen;