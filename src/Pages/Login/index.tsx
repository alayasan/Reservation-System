import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import Background from "../../layout/background";
import styles from "../../styles";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export const LoginScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Background>
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
          onPress={() => navigation.navigate("LoginChoice")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Button>
        <Button
          mode="elevated"
          onPress={() => navigation.navigate("SignUpChoice")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign-up</Text>
        </Button>
      </Background>
    </View>
  );
};

export default LoginScreen;
