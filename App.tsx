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
import { useColorScheme } from "react-native";
import { useFonts } from "@expo-google-fonts/dev";
import { HomePage, LoginFormScreen, SignUpScreen } from "./src/pages";
import AdminMenu from "./src/pages/02 menu/admin/adminMenu";
import ReservationPage from "./src/pages/02 menu/resident/ReservationPage";
import ResidentMenu from "./src/pages/02 menu/resident/residentMenu";
import StatusDetails from "./src/pages/02 menu/resident/statusDetails";

const Stack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const ResidentStack = createNativeStackNavigator();

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
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomePage} />

          <Stack.Screen
            name="LoginForm"
            component={LoginFormScreen}
            options={{
              title: "Login",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
          <Stack.Screen
            name="SignupForm"
            component={SignUpScreen}
            options={{
              title: "Signup",
              headerShown: true,
              headerStyle: {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
          <Stack.Screen name="Admin" options={{ headerShown: false }}>
            {() => (
              <AdminStack.Navigator>
                <AdminStack.Screen
                  name="AdminMenu"
                  component={AdminMenu}
                  options={{ headerShown: false }}
                />
              </AdminStack.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Resident" options={{ headerShown: false }}>
            {() => (
              // <ResidentStack.Navigator>
              <ResidentStack.Navigator initialRouteName="ResidentMenu">
                <ResidentStack.Screen
                  name="ResidentMenu"
                  component={ResidentMenu}
                  options={{ headerShown: false }}
                />
                <ResidentStack.Screen
                  name="Reservation Form"
                  component={ReservationPage}
                />
                <ResidentStack.Screen
                  name="Status Details"
                  component={StatusDetails}
                />
                {/* <ResidentStack.Screen
                  name="Upload Proof"
                  component={UploadProof}
                /> */}
              </ResidentStack.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
