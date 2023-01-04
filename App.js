import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { isLoggedIn } from './services/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, [])

  const leaveButton = () => {
    return <IconButton
              icon="exit-to-app"
              size={20}
              onPress={() => console.log('Pressed')}
           />
  }

  return (
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
              headerTitleAlign: "home",
              headerRight: () => leaveButton()
            }}
            />
            <Tab.Screen name="Profile" 
            component={Profile}
            options={{
              headerTitleAlign: "Profile",
              headerRight: () => leaveButton()
            }}
            />
          </Tab.Navigator>
          :
          <Stack.Navigator>
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
  );
}


