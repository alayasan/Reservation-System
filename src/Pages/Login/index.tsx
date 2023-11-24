import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ImageBackground, View } from "react-native";
import styles from "./styles";
import { Avatar, Button, Text } from "react-native-paper";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/brgy_hall_kauswagan.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Avatar.Image
            size={150}
            source={require("../../assets/images/e-kauswagan-real.png")}
            style={styles.logo}
          />
          <Text variant="headlineLarge" style={[styles.headlineText]}>
            Barangay Kauswagan Reservation System
          </Text>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("Home")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Button>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("Home")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign-up</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

export default LoginScreen;
