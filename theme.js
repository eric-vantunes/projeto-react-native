import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DefaultDarkTheme
} from 'react-native-paper';

const lightTheme = {
  ...DefaultTheme,
  myOwnProperty: true
}

const darkTheme = {
  ...DefaultDarkTheme,
  myOwnProperty: true
}

export {
  lightTheme,
  darkTheme
}