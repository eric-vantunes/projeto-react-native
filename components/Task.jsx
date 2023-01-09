import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { TimePickerModal } from "react-native-paper-dates";
import { useState, useCallback } from "react";

const Task = ({
  taskId,
  title,
  setTitle,
  description,
  setDescription,
  timeExpiration,
  setTimeExpiration,
  dateExpiration,
  setDateExpiration,
  saveTask,
  toggleModal
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTimeExpiration(
        `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`
      );
    },
    [setVisible]
  );

  return (
    <>
      <Text variant="headlineSmall">{ taskId ? "Edit Task" : "Add Task" }</Text>
      <TextInput
        style={style.input}
        mode="outlined"
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        multiline={true}
        numberOfLines={5}
        style={{
          ...style.input,
          padding: 0,
          margin: 0,
          height: 100,
          width: "100%",
        }}
        mode="outlined"
        label="Description"
        color="primary"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TextInput
        style={style.input}
        mode="outlined"
        label="Data"
        color="primary"
        value={dateExpiration}
        onClick={() => setDateExpiration(true)}
      />
      <TextInput
        style={style.input}
        mode="outlined"
        label="Hora"
        color="primary"
        value={timeExpiration}
        onClick={() => setVisible(true)}
      />

      <TimePickerModal
        locale="pt"
        visible={open}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12} 
        minutes={14}
        label="Select time" 
        uppercase={false} 
        cancelLabel="Cancel" 
        confirmLabel="Ok" 
        animationType="fade"
      />

      <Button
        style={style.button}
        mode="contained"
        onPress={() => {
          saveTask();
        }}
      >
        Save
      </Button>
      <Button
        style={{
          ...style.button,
          backgroundColor: theme.colors.error
        }}
        mode="contained"
        color="error"
        onPress={toggleModal}>
        Cancelar
      </Button>
    </>
  );
};

const style = StyleSheet.create({
  input: {
    width: "100%",
  },
  button: {
    marginTop: 10,
    width: "100%",
  },
});

export default Task;
