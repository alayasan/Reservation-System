import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { NavProps } from "../../interface/navProps";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../../styles";
import { useState } from "react";
import { store } from "../../state";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

export const LoginFormScreen = ({ navigation }: NavProps) => {
  const [user, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    store.username = user;
    console.log(store.username);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: "#F1F4F8" }]}>
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
          label={"Email"}
          activeUnderlineColor="blue"
          placeholder="abcd@gmail.com"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          style={[styles.textInput, { height: 60 }]}
          value={user}
          onChangeText={setUser}
        ></TextInput>

        <TextInput
          label={"Password"}
          placeholder="*******"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          activeUnderlineColor="blue"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.textInput, { height: 60 }]}
        />
        <MaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
        <Button
          mode="elevated"
          onPress={() => handleLogin()}
          style={{ width: "30%", backgroundColor: "#fff", marginTop: 20 }}
        >
          Login
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginFormScreen;
