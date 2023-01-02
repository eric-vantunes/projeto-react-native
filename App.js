import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';

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

  return (
    <NavigationContainer>
      {
        userLoggedIn ?
                  <Tab.Navigator>
                    <Tab.Screen name="My tasks" 
                    component={Home}
                    options={{
                      headerTitleAlign: "My tasks",
                      headerRight: () => {
                        return <Text>Exit</Text>
                      }
                    }}
                    />
                    <Tab.Screen name="Profile" component={Profile}/>
                  </Tab.Navigator>
                  :
                  <Stack.Navigator>
                    <Stack.Screen name='Login' component={Login}/>
                    <Stack.Screen name='Register' component={Register}/>
                  </Stack.Navigator>
      }

    </NavigationContainer>
  );
}


