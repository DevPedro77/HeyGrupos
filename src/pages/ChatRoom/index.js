    import React, {useState} from 'react';
    import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal} from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import Icon from '@react-native-vector-icons/evil-icons';
    import auth from '@react-native-firebase/auth';

    import FabButton from '../../components/FabButton';
    import ModalNewRoom from '../../components/ModalNewRoom';

    export default function ChatRoom() {
      const navigation = useNavigation();
      const [modalVisible, setModalVisible] = useState(false);

        function handleSignOut(){
          auth()
          .signOut()
          .then(() => {
            navigation.navigate('SignIn');
          })
          .catch((err) =>{
            console.log('Error', err);
          });
        }
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.headerRoom}>
            <View style={styles.headerRoomLeft}>

              <TouchableOpacity onPress={handleSignOut}>
                <Icon name="user" color="#fff" size={30} />
              </TouchableOpacity>

              <Text style={styles.title}>Grupos</Text>
            </View>

            <TouchableOpacity>
              <Icon name="search" color="#fff" size={28} />
            </TouchableOpacity>
          </View>

          <FabButton setVisible={() => setModalVisible(true)}/>

          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <ModalNewRoom setVisible={() => setModalVisible(false)}/>
          </Modal>

        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      headerRoom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#2E54D4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      headerRoomLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        paddingLeft: 10,
      },
    });
