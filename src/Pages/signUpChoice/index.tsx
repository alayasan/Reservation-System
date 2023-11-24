import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Background from "../../layout/background";
import styles from "../../styles";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export const SignUpChoiceScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Background>
        <Text variant="headlineLarge" style={[styles.headlineText]}>
          Sign up as?
        </Text>
        <Button
          mode="elevated"
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Personnel</Text>
        </Button>
        <Button
          mode="elevated"
          onPress={() => navigation.navigate("LoginChoice")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Resident</Text>
        </Button>
      </Background>
    </View>
  );
};

export default SignUpChoiceScreen;
