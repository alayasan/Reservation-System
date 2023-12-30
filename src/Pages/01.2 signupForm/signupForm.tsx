import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavProps } from "../../interface/navProps";
import styles from "../../styles";
import { TextInput, Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Capitalize, validateEmail } from "../../functions";

export const SignUpScreen = ({ navigation }: NavProps) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLasttname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = getFirestore();

  const signUp = async () => {
    setLoading(true);
    try {
      if (!email.includes("@")) {
        throw new Error("Invalid email format");
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      const userDoc = doc(firestore, "users", response.user.uid);

      await setDoc(userDoc, {
        firstname,
        lastname,
        email,
        phonenumber,
        address,
        password,
      });
      Alert.alert("Success ✅", "You have successfully created an account.");
      console.log("User account created & signed in!");
      navigation.navigate("LoginForm");
    } catch (error: any) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Error ❌",
          "The email address is already in use by another account."
        );
      } else {
        Alert.alert("Error ❌", "Unsuccessful creation of account.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setFirstname("");
      setLasttname("");
      setEmail("");
      setPhonenumber("");
      setAddress("");
      setPassword("");
      setConfirmPassword("");
    });

    return unsubscribe;
  }, [navigation]);
  

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.signupContainer]}>
          <TextInput
            label="First name"
            value={firstname}
            style={[styles.textInput, { width: "90%", height: 60 }]}
            onChangeText={(firstname) => setFirstname(firstname)}
            textTransform="capitalize"
          ></TextInput>
          <TextInput
            label="Last Name"
            value={lastname}
            style={[styles.textInput, { width: "90%", height: 60 }]}
            onChangeText={(lastname) => setLasttname(lastname)}
            textTransform="capitalize"
          ></TextInput>
          <TextInput
            label="Email"
            value={email}
            style={[styles.textInput, { width: "90%", height: 60 }]}
            onChangeText={(email) => {
              setEmail(email);
              if (!validateEmail(email)) {
                setEmailError("Invalid email format");
              } else {
                setEmailError(null);
              }
            }}
            keyboardType="email-address"
            error={emailError}
          ></TextInput>
          <TextInput
            label="Phone Number"
            value={phonenumber}
            style={[styles.textInput, { width: "90%", height: 60 }]}
            onChangeText={(phonenumber) => setPhonenumber(phonenumber)}
            keyboardType="number-pad"
            maxLength={11}
          ></TextInput>
          <TextInput
            label="Address"
            value={address}
            multiline
            numberOfLines={3}
            style={[styles.textInput, { width: "90%", height: 90 }]}
            onChangeText={(address) => setAddress(address)}
            textTransform="capitalize"
          ></TextInput>
          <TextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            style={[styles.textInput, { width: "90%", height: 60 }]}
            onChangeText={(password) => setPassword(password)}
          ></TextInput>
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            secureTextEntry={true}
            style={[styles.textInput, { width: "90%", height: 60 }]}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          ></TextInput>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button
              mode="elevated"
              onPress={signUp}
              style={{ width: "30%", backgroundColor: "#fff", marginTop: 20 }}
            >
              Sign up
            </Button>
          )}
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text style={{ marginRight: 3 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("LoginForm")}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                Login here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignUpScreen;
