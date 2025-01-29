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

export default function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HeyGrupos</Text>
      <Text style={{marginBottom: 20}}>Ajude, colabore e faça networking!</Text>

      <TextInput
        value={name}
        onChangeText={ (text) => setName(text)}
        placeholder="Digite seu nome"
        placeholderTextColor="#99999B"
        style={styles.input}
      />

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
      >
        <Text style={styles.buttonText }>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Criar uma nova conta</Text>
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
    backgroundColor: '#51C880',
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
