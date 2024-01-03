import { View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import styles from "../../../styles";
import { NavProps } from "../../../interface/navProps";

export function ResidentMenuPage({ navigation }: NavProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        mode="elevated"
        style={{ width: "45%", backgroundColor: "#fff", marginTop: 20, borderColor: "#000", borderWidth: 1 }}
        onPress={() => navigation.navigate("Reservation Form")}
      >
        Reserve Items!
      </Button>
    </View>
  );
}
