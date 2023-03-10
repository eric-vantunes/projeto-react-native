import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button ,TextInput, Avatar, useTheme } from "react-native-paper";
import { login } from "../services/auth";

const Login = ({ route, navigation }) => {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return <View style={{
    ...style.box,
    backgroundColor: theme.colors.bodyBackground
  }}>
            <Avatar.Image style={style.avatar} size={250} source={require('../assets/img/logo.png')} />
            <Text style={style.text}>Log-in</Text>
            <TextInput
            style={style.input}
            mode="outlined"
            label="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={style.input}
            mode="outlined"
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <View style={style.container}>
          <Button style={style.button} mode="contained" onPress={async () => {
                    try{
                        await login(email, password, route.params.firebaseApp);
                        route.params.setUserLoggedIn(true);
                    }catch(err){
                        alert(err)
                    }
                }}>Entrar</Button>
            <Button style={style.button} onPress={() => navigation.navigate('Register')}>Register</Button>
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
    backgroundColor: '#000444',
    padding: 20,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }

})

export default Login;