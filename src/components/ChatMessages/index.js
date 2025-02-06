import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

function ChatMessagesList({ data }) {
  const user = auth().currentUser?.toJSON();

  const myMessages = useMemo(() => {
    return data?.user?._id === user?.uid;
  }, [data]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: myMessages ? '#dcf8c5' : '#fff',
            marginLeft: myMessages ? 50 : 0,
            marginRight: myMessages ? 0 : 50,
          },
        ]}
      >
        {!myMessages && <Text style={styles.name}>{data?.user?.displayName || 'Usuário'}</Text>}

        <Text style={styles.message}>{data?.text || 'Mensagem indisponível'}</Text>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  messageBox: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#000',
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  message: {
    marginTop: 2,
  },
});

export default ChatMessagesList;
