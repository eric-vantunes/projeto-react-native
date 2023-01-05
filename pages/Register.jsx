import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button ,TextInput, Avatar, useTheme } from "react-native-paper";
import { register } from "../services/auth";

const Register = ({ route, navigation }) => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
      email: {
          status: false,
          msg: ""
      },
      password: {
          status: false,
          msg: ""
      },
      confirmPassword: {
          status: false,
          msg: ""
      },
  });
  
  return <View style={{
              ...style.box,
              backgroundColor: theme.colors.inverseOnSurface
          }}>
            <Avatar.Image style={style.avatar} size={250} source={require('../assets/img/logo.png')} />
            <Text style={style.text}>Sign-up</Text>
            <TextInput
            style={style.input}
            mode="outlined"
            label="E-mail"
            value={email}
            error={errors.email.status}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={style.input}
            mode="outlined"
            label="Password"
            value={password}
            error={errors.password.status}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          { errors.password.status ? <Text style={style.erro}>{ errors.password.msg }</Text> : <Text></Text> }
          <TextInput
            style={style.input}
            mode="outlined"
            label="Confirm password"
            value={confirmPassword}
            error={errors.confirmPassword.status}
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
          />
          <View style={style.container}>
          { errors.confirmPassword.status ? <Text style={style.erro}>{ errors.confirmPassword.msg }</Text> : <Text></Text> }
            <Button 
                  style={style.button}
                  mode="contained" 
                  onPress={() => register(email, password, confirmPassword, setErrors)}>Register
                </Button>
            <Button style={style.button} onPress={() => navigation.navigate('Login')}>Login</Button>
          </View>
         </View> 
}

const style = StyleSheet.create({
  avatar: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },

  text: {
    fontSize: 24,
  },

  container: {
    marginTop: 10,
    width: '100%',
  },

  button: {
    borderRadius: 5
  },

  input: {
    width: '100%'
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  erro: {
    color: 'red'
  }

})

export default Register;