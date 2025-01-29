import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function SignIn(){
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState(false);

  // criando a função de login

  function handleLogin(){
    if(type){
      if(name === '' || email === '' || password === '') {return;}

      auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name,
        })
        .then( () => {
          navigation.goBack();
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Esse email já está em uso!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('Esse email é invalido!');
        }

        console.error(error);
      });

    } else {
      auth().signInWithEmailAndPassword(email, password)
      .then( () => {
        navigation.goBack();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Esse email já está em uso!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('Esse email é invalido!');
        }

        console.error(error);
      });

    }
  }


  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HeyGrupos</Text>
      <Text style={{marginBottom: 20}}>Ajude, colabore e faça networking!</Text>


      {type && (
        <TextInput
        value={name}
        onChangeText={ (text) => setName(text)}
        placeholder="Digite seu nome"
        placeholderTextColor="#99999B"
        style={styles.input}
      />
      )}



      <TextInput
        value={email}
        onChangeText={ (text) => setEmail(text)}
        placeholder="Digite seu Email"
        placeholderTextColor="#99999B"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={ (text) => setPassword(text)}
        placeholder="Digite sua Senha"
        placeholderTextColor="#99999B"
        style={styles.input}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText }>
          {type ? 'Cadastrar' : 'Acessar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setType(!type)}>
        <Text>
          {type ? 'já possuo uma conta' : 'Criar uma nova conta'}
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: Platform.OS === 'android' ? 55 : 80,
  },
  input: {
    width: '90%',
    backgroundColor: '#ebebebeb',
    color: '#000',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 8,
    height: 50,
  },
  button: {
    backgroundColor: '#2E54D4',
    width: '90%',
    borderRadius: 6,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffff',
    fontSize: 18,

  },
});
