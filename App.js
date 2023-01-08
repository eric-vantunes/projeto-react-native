// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { IconButton, Switch } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { darkTheme, lightTheme } from './theme';
import { verifyTheme } from './services/util';

import { isLoggedIn } from './services/auth';

import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { saveStorage } from './services/storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    const [modeColor, setModeColor] = useState('light');
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
    verifyTheme(setModeColor);
  }, [])

  const changeThemeColor = () => {
    return <>
            <Switch 
              value={modeColor === "dark"}
              onValueChange={()=>{
                let m = modeColor === "light" ? "dark" : "light";
                setModeColor(m)
                saveStorage("modeColor", m)
              }}
            />
           </>
  }

  return (
    <PaperProvider theme={modeColor === 'light' ? lightTheme : darkTheme}>
        <NavigationContainer>
      {
        userLoggedIn ?
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Home: 'home',
                Profile: 'account',
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
            <Tab.Screen name="Home"
            component={Home}
            options={{
              title: 'My tasks',
              headerStyle: {
                backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
              },
              headerTintColor:  modeColor === 'light' ? lightTheme.colors.headerColorText : darkTheme.colors.headerColorText,
              headerRight: () => changeThemeColor(),
              tabBarStyle: {
                backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
              },
              headerTitleAlign: "home",
              headerRight: () => changeThemeColor()
            }}
            />
            <Tab.Screen name="Profile" 
            component={Profile}
            options={{
              headerStyle: {
                backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
              },
              headerTintColor:  modeColor === 'light' ? lightTheme.colors.headerColorText : darkTheme.colors.headerColorText,
              headerRight: () => changeThemeColor(),
              tabBarStyle: {
                backgroundColor: modeColor === 'light' ? lightTheme.colors.headerBackground : darkTheme.colors.headerBackground,
              },
              headerTitleAlign: "Profile",
              headerRight: () => changeThemeColor()
            }}
            initialParams={{
              modeColor
            }}
            />
          </Tab.Navigator>
          :
          <Stack.Navigator
            initialRouteName="Register"
          >
            <Stack.Screen 
              name='Login' 
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              name='Register' 
              component={Register}
              options={{
                headerShown: false
              }}
              />
          </Stack.Navigator>
      }

    </NavigationContainer>
    </PaperProvider>


  );
}


