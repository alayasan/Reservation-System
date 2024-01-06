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
import ResidentMenu from "./src/pages/02 menu/resident/residentMenu";
import StatusDetails from "./src/pages/02 menu/resident/statusDetails";
import ReservationPage from "./src/pages/02 menu/resident/reservationForm";
import AdminReservationPage from "./src/pages/02 menu/admin/adminReservationPage";
import AdminReservationDetails from "./src/pages/02 menu/admin/adminReservationDetails";
import UploadDocument from "./src/pages/02 menu/admin/uploadDocument";
import RemarksReject from "./src/pages/02 menu/admin/reject";
import RemarksApprove from "./src/pages/02 menu/admin/approve";

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
              <AdminStack.Navigator initialRouteName="AdminMenu">
                <AdminStack.Screen
                  name="AdminMenu"
                  component={AdminMenu}
                  options={{ headerShown: false }}
                />
                <AdminStack.Screen
                  name="Reservation Forms"
                  component={AdminReservationPage}
                />
                <AdminStack.Screen
                  name="Reservation Details"
                  component={AdminReservationDetails}
                  options={{ headerTitle: "" }}
                />
                <AdminStack.Screen
                  name="Upload Document"
                  component={UploadDocument}
                  options={{ headerShown: false }}
                />
                <AdminStack.Screen
                  name="Reject"
                  component={RemarksReject}
                  options={{ headerShown: false }}
                />
                <AdminStack.Screen
                  name="Approve"
                  component={RemarksApprove}
                  options={{ headerShown: false }}
                />
              </AdminStack.Navigator>
            )}
          </Stack.Screen>
          <Stack.Screen name="Resident" options={{ headerShown: false }}>
            {() => (
              <ResidentStack.Navigator initialRouteName="ResidentMenu">
                <ResidentStack.Screen
                  name="ResidentMenu"
                  component={ResidentMenu}
                  options={{ headerShown: false }}
                />
                {/* <ResidentStack.Screen
                  name="Reservation Form"
                  component={ReservationPage}
                /> */}
                <ResidentStack.Screen
                  name="Status Details"
                  component={StatusDetails}
                  options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerTintColor: "#000",
                  }}
                />
              </ResidentStack.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
