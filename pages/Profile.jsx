import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FAB, Button ,TextInput, Avatar, Card } from "react-native-paper";
import { updateProfile } from "../services/user";

const Profile = ({ route }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  
  return <View style={{
          ...style.box,
          // backgroundColor: route.params.modeColor === 'light' ? '#fff' : '#222'
        }}>
            <Card style={style.card}>
              <Avatar.Image style={style.avatar} size={200} source={require('../assets/img/profile.jpg')} />
              <FAB
                icon="camera"
                style={{
                  ...style.fab,
                  left: '-10.5%'
                }}
                onPress={() => console.log('Pressed')}
              />
              <FAB
                icon="folder-image"
                style={{
                  ...style.fab,
                  right: '-10.5%'
                }}
                onPress={() => console.log('Pressed')}
              />
            </Card>
            <Text style={style.text}>My Profile</Text>
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
            label="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
            <TextInput
            style={style.input}
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <View style={style.container}>
            <Button 
                  style={style.button}
                  mode="contained" 
                  onPress={() => updateProfile({})}>Update profile
                </Button>
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
  card: {
    backgroundColor: 'transparent'
  },

  fab: {
    backgroundColor: '#f3f3f3',
    position: 'absolute',
    margin: 16,
    bottom: 0,
    borderRadius: '100%'
  },

})

export default Profile;