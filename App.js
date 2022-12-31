import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { isLoggedIn } from './services/auth';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, [])

  return (
    <View>
    </View>
  );
}


