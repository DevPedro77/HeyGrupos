import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';

import Icon from '@react-native-vector-icons/evil-icons';
import ChatList from '../../components/ChatList';

export default function Search() {
  const isFocused = useIsFocused();
  const [input, setInput] = useState('');
  const[hasUser, setHastUser] = useState(null);
  const [chats, setChats] =  useState([]);

  useEffect(() =>{

    const user = auth().currentUser ? auth().currentUser.toJSON() : null;
    setHastUser(user);

  },[isFocused]);

  async function pesquisarChats(){
    if(input === ''){return;}

    const response = await firestore()
    .collection('MESSAGE_THREADS')
    .where('name', '>=', input)
    .where('name', '<=', input + '\uf8ff')
    .get()
    .then( (querySnapshot) => {
      const threads = querySnapshot.docs.map( doc =>  {
        return{
          _id: doc.id,
          name: '',
          lastMessage: {text: ''},
          ...doc.data(),

        };
      });

      setChats(threads);
      setInput('');
      Keyboard.dismiss();
    });
  }


return (
  <SafeAreaView style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Digite o nome da sala?"
          value={input}
          onChangeText={ (text) => setInput(text) }
          style={styles.input}
          autoCapitalize={'none'}
        />
        <TouchableOpacity style={styles.buttonSearch} onPress={pesquisarChats}>
          <Icon name="search" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({item}) => <ChatList data={item} userStatus={hasUser}/>}


      />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFF',
  },
  containerInput:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 14,
  },
  input:{
    backgroundColor: '#EBEBEB',
    marginLeft: 10,
    height: 50,
    width: '80%',
    borderRadius: 4,
    padding: 5,
  },
  buttonSearch:{
    backgroundColor: '#2e54d4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
    marginLeft: 5,
    marginRight: 10,
  },
});
