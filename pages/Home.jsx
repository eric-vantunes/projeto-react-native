import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Modal, Text, Portal, Button, Provider, FAB, TextInput } from "react-native-paper";


const Home = ({navigation}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeExpiration, setTimeExpiration] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");

  const toggleModal = () => {
    setVisible(!visible)
  }

  return <View style={{
        ...style.box,
            backgroundColor: theme.colors.bodyBackground
          }}>
          <Provider theme={theme}>
      <Portal>
        <Modal visible={visible} onDismiss={toggleModal} contentContainerStyle={{
          ...style.modal,
          backgroundColor: theme.colors.bodyBackground,

        }}>
          <TextInput
              style={style.input}
              mode="outlined"
              label="Title"
              value={title}
              onChangeText={text => setTitle(text)}
            />
          <TextInput
              multiline={true}
              numberOfLines={5}         
              style={{
                ...style.input,
                padding: 0,
                margin: 0,
                height: 150,
                width: '100%'
                
              }}
              mode="outlined"
              label="Description"
              color="primary"
              value={description}
              onChangeText={text => setDescription(text)}
            />

        </Modal>
      </Portal>
    </Provider>
      <FAB
          icon="plus"
          style={{
            ...style.fab,
            backgroundColor: theme.colors.primary,
            color: theme.colors.textColor
          }}
          onPress={toggleModal}
      />

        </View>
        
}

const style = StyleSheet.create({
  box: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    bottom: 10,
    right: 10,
    borderRadius: '100%'
  },

  modal: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 18
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 10,
    width: '100%', 
  },
})

export default Home;