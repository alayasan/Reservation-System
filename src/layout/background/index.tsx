import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import styles from "../../styles";

interface BackgroundProps {
  children: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/brgy_hall_kauswagan.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

export default Background;
