import { StatusBar } from 'expo-status-bar';
import React  from 'react';
import { StyleSheet, Button, Image, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import About from './components/About'
import Encyclopedia from './components/Encyclopedia'
import MissingDogInfo from './components/MissingDogInfo';

const Tab = createBottomTabNavigator();
const screen = () =>{
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Dog's Encyclopedia" component={Encyclopedia} />
        <Tab.Screen name="Missing Dogs" component={MissingDogInfo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default screen;