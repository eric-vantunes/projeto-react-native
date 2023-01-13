import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FAB, Button, TextInput, Avatar, Card, Snackbar } from 'react-native-paper';
import { getUser, _updateProfile, getFile } from '../services/user';
import { useTheme } from 'react-native-paper';
import { logout } from '../services/auth';
import { pickImage } from '../services/image';

const Profile = ({ route }) => {
  const theme = useTheme();

  const [snackBarShow, setSnackBarShow] = useState(false);
  const [messageSnack, setMessageSnack] = useState("");

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [photoURLShow, setPhotoURLShow] = useState("");

  const loadUser = async () => {
    const user = await getUser();
    setEmail(user.email)
    setDisplayName(user.displayName)
    if(user.photoURL){
        try{
            setPhotoURLShow(await getFile(route.params.firebaseApp, user.photoURL))
        }catch(err){

        }
    }
}

const uploadPhoto = async () => {
    const image = await pickImage();
    setPhotoURL(image);
    setPhotoURLShow(image);
}

useEffect(() => {
    loadUser();
}, []);

  return (
    <View
      style={{
        ...style.box,
        backgroundColor: theme.colors.bodyBackground,
      }}
    >
      <Card style={style.card}>
        <Avatar.Image
          style={style.avatar}
          size={200}
          source={{ uri: photoURLShow ? photoURLShow : require("../assets/img/user.jpg")}}
        />
        {/* <FAB
          icon="camera"
          style={{
            ...style.fab,
            left: "-10.5%",
          }}
          onPress={() => console.log("Pressed")}
        /> */}
        <FAB
          icon="folder-image"
          style={{
            ...style.fab,
            right: "-12.5%",
          }}
          onPress={uploadPhoto}
        />
      </Card>
      <Text style={style.text}>My Profile</Text>
      <TextInput
        style={style.input}
        mode="outlined"
        label="E-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={style.input}
        mode="outlined"
        label="Name"
        value={displayName}
        onChangeText={(text) => setDisplayName(text)}
      />
      <View style={style.container}>
      <Button style={style.button} mode="contained" color="primary" onPress={async () => {
              try{
                  await _updateProfile(route.params.firebaseApp, {
                      email,
                      displayName,
                      photoURL
                  })
                  setMessageSnack("Perfil atualizado com sucesso!")
              }catch(err){
                  setMessageSnack("Erro ao atualizar perfil!")
              }
              setSnackBarShow(true)
          }}>Update profile
        </Button>
        <Button style={{
              ...style.button,
              backgroundColor: theme.colors.error
          }} mode="contained" color="error" onPress={async () => {
              await logout()
              route.params.setUserLoggedIn(false);
          }}>Exit
        </Button>
      </View>

      <Snackbar
        visible={snackBarShow}
        duration={1000}>
        {messageSnack}
      </Snackbar>
    </View>
  );
};

const style = StyleSheet.create({
  avatar: {
    backgroundColor: "transparent",
    marginBottom: 10,
  },

  text: {
    fontSize: 24,
  },

  container: {
    marginTop: 10,
    width: "100%",
  },

  button: {
    borderRadius: 5,
    marginBottom: 5,
  },

  input: {
    width: "100%",
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "transparent",
  },

  fab: {
    position: "absolute",
    margin: 16,
    bottom: 0,
    borderRadius: "100%",
  },
});

export default Profile;
