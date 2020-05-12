import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Home from '../pages/Home';

const AppStack = createStackNavigator();

export default function Routes() {
  return(
    <AppStack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#fafafa'
        }
      }}
    >
      <AppStack.Screen name="Login" component={Login} />
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
}
