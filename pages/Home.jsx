import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Modal, Portal, Provider, FAB, Snackbar} from "react-native-paper";
import Task from "../components/Task";


const Home = ({navigation}) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [taskId] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeExpiration, setTimeExpiration] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");

  const toggleSnack = () => {
    setVisibleSnack(!visibleSnack);
  }

  const toggleModal = () => {
    setVisible(!visible)
  }

  const saveTask = () => {
    toggleModal();
    toggleSnack();
  }

  return <View style={{
        ...style.box,
            backgroundColor: theme.colors.bodyBackground
          }}>
          <Provider theme={theme}>
      <Portal>
        <Modal visible={visible} onDismiss={toggleModal} contentContainerStyle={{
          ...style.modal,
          backgroundColor: theme.colors.bodyBackground
        }}>
          <Task 
            taskId={taskId}
            title = {title} 
            setTitle = {setTitle}
            description = {description}
            setDescription = {setDescription}
            timeExpiration = {timeExpiration}
            setTimeExpiration = {setTimeExpiration}
            dateExpiration = {dateExpiration}
            setDateExpiration = {setDateExpiration}
            saveTask={saveTask}
            toggleModal={toggleModal}
          />

        </Modal>
      </Portal>
    </Provider>

    <Snackbar
        visible={visibleSnack}
        duration={4000}
        onDismiss={toggleSnack}>
        Task saved sucessfuly!!!
      </Snackbar>

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
  }
})

export default Home;