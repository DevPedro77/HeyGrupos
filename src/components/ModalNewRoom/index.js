import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ModalNewRoom({setVisible}){
  const[room, setRoom] = useState('');
  return(
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={styles.modal}/>
      </TouchableWithoutFeedback>


      <View style={styles.modalContainer}>

        <Text style={styles.title}>Criar um novo Grupo</Text>
        <TextInput
          style={styles.input}
          value={room}
          onChangeText={ ((text) => setRoom(text))}
          placeholder="Crie sua sala"
          placeholderTextColor={'#000'}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Criar Sala</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(34,34,34,0.4)',

  },
  modal:{
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 4,
    height: 45,
    marginVertical: 15,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#2E54D4',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
});
