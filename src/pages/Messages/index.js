import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from '@react-native-vector-icons/evil-icons';

import ChatMessagesList from '../../components/ChatMessages';

export default function Messages({route}){

  const {thread} = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const user = auth().currentUser.toJSON();

    useEffect( ()=>{

      const chatMessages = firestore().collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(docSnapshot => {
        const messages = docSnapshot.docs.map( doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };

          if(!firebaseData.system){
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;


        });

        setMessages(messages);
        console.log(messages);
      });

      return () => chatMessages();


    },[thread._id]);

    async function enviarMenssagem(){
      if(input === '') {return;}

      await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text: input,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName,
        },
      });

      await firestore()
      .collection('MESSAGE_THREADS')
      .doc(thread._id)
      .set(
        {
          lastMessage: {
            text: input,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
        },
        { merge: true }
      );

      setInput('');

    }

  return(
    <SafeAreaView style={styles.container}>
        <FlatList
        styles={{width: '100%'}}
        data={messages}
        keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
        renderItem={({ item }) => item?._id ? <ChatMessagesList data={item} /> : null}
        inverted={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{width: '100%'}}
        keyboardVerticalOffset={100}
      >
        <View style={styles.containerInput}>
            <View style={styles.maincontainerInput}>
                <TextInput
                  placeholder="digite sua mensagem"
                  style={styles.textInput}
                  value={input}
                  onChangeText={ (text) => setInput(text)}
                  multiline={true}
                />
            </View>

            <TouchableOpacity onPress={enviarMenssagem}>
              <View style={styles.buttonContainer}>
                <Icon name="sc-telegram" color="#fff" size={30}/>
              </View>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end',
  },
  maincontainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  textInput:{
    flex: 1,
    marginHorizontal: 10,
    maxHeight: 120,
    minHeight: 48,

  },
  buttonContainer:{
    backgroundColor: '#51C880',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    borderRadius: 25,
  },
});
