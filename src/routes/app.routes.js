import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import ChatRoom from '../pages/ChatRoom';
import Messages from '../pages/Messages';
import Search from '../pages/Search';

const AppStack = createStackNavigator();

function AppRoutes(){
  return(
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Faça o login',
        }}
      />

      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={ {
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={ ({route}) =>({
          title: route.params.thread.name,
        })}
      />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
