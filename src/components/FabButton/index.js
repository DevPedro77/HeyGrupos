import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FabButton({setVisible, statusUser}){
  const navigation = useNavigation();

  function handleNavigateButton(){
    statusUser ? setVisible() : navigation.navigate("SignIn");
  }
  return(
    <TouchableOpacity
      style={style.container}
      activeOpacity={0.7}
      onPress={handleNavigateButton}
      >
      <View>
        <Text style={style.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E54D4',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    right: '6%',

  },
  text: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
});
