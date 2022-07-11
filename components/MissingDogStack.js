import { createStackNavigator } from '@react-navigation/stack';
import AddMyDog from './AddMyDog';
import MissingDogInfo from './MissingDogInfo';
import React from 'react';
import ValueProvider from './ValueStorageContext';


const Stack = createStackNavigator();

const App = () => {
  let data = {
    name: "",
    address: "",
    breed: "",
    image: "",
    time: new Date(),
  }
  return (
    <ValueProvider value={data} tag="missingdog">
      <Stack.Navigator>
        <Stack.Screen name="All missing dogs" component={MissingDogInfo} />
        <Stack.Screen name="Add My Dog" component={AddMyDog} />
      </Stack.Navigator>
    </ValueProvider>
  );
}

export default App;
