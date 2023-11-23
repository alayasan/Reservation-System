import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

function LoginScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Text>test</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Home")}>
        Press me
      </Button>
    </View>
  );
}

export default LoginScreen;
