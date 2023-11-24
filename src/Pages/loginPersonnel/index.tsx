import { View } from "react-native";
import { NavProps } from "../../interface";
import { Button, Text, TextInput } from "react-native-paper";
import styles from "../../styles";
import { useState } from "react";
import { store } from "../../state";

export const LoginFormScreen = ({ navigation }: NavProps) => {
  const [user, setUser] = useState("");

  const handleLogin = () => {
    store.username = user;
    console.log(store.username);
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={[styles.headlineText]}>
        Login
      </Text>
      <TextInput
        label={"Username"}
        activeUnderlineColor="black"
        style={styles.textInput}
        value={user}
        onChangeText={setUser}
      ></TextInput>
      <TextInput
        label={"Password"}
        activeUnderlineColor="black"
        style={styles.textInput}
      ></TextInput>
      <Button
        mode="elevated"
        onPress={() => handleLogin()}
        style={styles.button}
      >
        Login
      </Button>

      <Text>Welcome, {store.username}</Text>
    </View>
  );
};

export default LoginFormScreen;
