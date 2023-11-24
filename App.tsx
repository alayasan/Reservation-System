import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  PaperProvider,
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/login";
import HomeScreen from "./src/pages/home";
import { useColorScheme } from "react-native";
import { useFonts } from "@expo-google-fonts/dev";
import { LoginChoiceScreen, LoginFormScreen, SignUpChoiceScreen } from "./src/pages";

const Stack = createNativeStackNavigator();
const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
});

export default function App() {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === "dark" ? { ...MD3DarkTheme } : { ...MD3LightTheme };

  let [fontsLoaded, fontError] = useFonts({
    JosefinSans: require("./src/assets/fonts/JosefinSans-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={LightTheme}>
        <Stack.Navigator
          initialRouteName="LoginForm"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LoginChoice" component={LoginChoiceScreen} />
          <Stack.Screen name="SignUpChoice" component={SignUpChoiceScreen} />
          <Stack.Screen name="LoginForm" component={LoginFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
