import * as React from "react";
import { useState, useEffect } from "react";
import { Switch } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { darkTheme, lightTheme } from "./theme";
import { verifyTheme } from "./services/util";

import { isLoggedIn, reautenticate } from "./services/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { saveStorage } from "./services/storage";

import { pt, registerTranslation } from "react-native-paper-dates";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBGOJH7tpZHsJd1s7j8AVSZuxwAvV1z7b8",
  authDomain: "open-task-e447e.firebaseapp.com",
  projectId: "open-task-e447e",
  storageBucket: "open-task-e447e.appspot.com",
  messagingSenderId: "83453092145",
  appId: "1:83453092145:web:42008faad7cf740d14d010",
  measurementId: "G-RDFX7XG8DM",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

registerTranslation("pt", pt);

export default function App() {
  const [modeColor, setModeColor] = useState("light");
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const initApp = async () => {
    setUserLoggedIn(await isLoggedIn());
    verifyTheme(setModeColor);
  };

  useEffect(() => {
    reautenticate(firebaseApp);
    initApp();
  }, []);

  const changeThemeColor = () => {
    return (
      <>
        <Switch
          value={modeColor === "dark"}
          onValueChange={() => {
            let m = modeColor === "light" ? "dark" : "light";
            setModeColor(m);
            saveStorage("modeColor", m);
          }}
        />
      </>
    );
  };

  return (
    <PaperProvider theme={modeColor === "light" ? lightTheme : darkTheme}>
      <NavigationContainer>
        {userLoggedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                const icons = {
                  Home: "home",
                  Profile: "account",
                };

                return (
                  <MaterialCommunityIcons
                    name={icons[route.name]}
                    color={color}
                    size={size}
                  />
                );
              },
            })}
            initialRouteName="Home"
          >
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                title: "My tasks",
                headerStyle: {
                  backgroundColor:
                    modeColor === "light"
                      ? lightTheme.colors.headerBackground
                      : darkTheme.colors.headerBackground,
                },
                headerTintColor:
                  modeColor === "light"
                    ? lightTheme.colors.headerColorText
                    : darkTheme.colors.headerColorText,
                headerRight: () => changeThemeColor(),
                tabBarStyle: {
                  backgroundColor:
                    modeColor === "light"
                      ? lightTheme.colors.headerBackground
                      : darkTheme.colors.headerBackground,
                },
                headerTitleAlign: "home",
                headerRight: () => changeThemeColor(),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                headerStyle: {
                  backgroundColor:
                    modeColor === "light"
                      ? lightTheme.colors.headerBackground
                      : darkTheme.colors.headerBackground,
                },
                headerTintColor:
                  modeColor === "light"
                    ? lightTheme.colors.headerColorText
                    : darkTheme.colors.headerColorText,
                headerRight: () => changeThemeColor(),
                tabBarStyle: {
                  backgroundColor:
                    modeColor === "light"
                      ? lightTheme.colors.headerBackground
                      : darkTheme.colors.headerBackground,
                },
                headerTitleAlign: "Profile",
                headerRight: () => changeThemeColor(),
              }}
              initialParams={{
                modeColor,
                setModeColor,
                firebaseApp,
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
              initialParams={{
                firebaseApp,
                setUserLoggedIn,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
              initialParams={{
                firebaseApp,
                setUserLoggedIn,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
