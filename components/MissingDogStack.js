import { createStackNavigator } from '@react-navigation/stack';
import AddMyDog from './AddMyDog';
import React, { useEffect } from 'react';
import { StyleSheet, Button, Image, Text, View, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from './ValueStorageContext';

const Stack = createStackNavigator();

function MissingDogInfo(navigation) {
  const { currentValue } = useValue()
  useEffect(() => { getData() }, [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@MissingInfo')
      let data = null
      if (jsonValue != null) {
        data = JSON.parse(jsonValue)
        setMissingDogInfo(data)
        console.log('missing dog info has been loaded')
      } else {
        console.log('empty Storage')
      }
    } catch (e) {
      console.log("error in getData ")
      console.dir(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@MissingInfo', jsonValue)
      console.log('just stored ' + jsonValue)
    } catch (e) {
      console.log("error in storeData ")
      console.dir(e)
      // saving error
    }
  }

  const clearAll = async () => {
    try {
      console.log('clearData')
      await AsyncStorage.clear()
    } catch (e) {
      console.log("error in clearData ")
      console.dir(e)
      // clear error
    }
  }

  const renderMissingDogInfo = ({ item }) => {
    return (
      <View style={styles.missingInfoSheet}>
        <Text>{currentValue.name}</Text>
        <Text>{currentValue.address}</Text>
        <Text>{currentValue.breed} </Text>
        <Text>{currentValue.time} </Text>
        <Image style={{ width: 66, height: 58, }} source={{ uri: currentValue.image }} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>MissingDogInfo</Text>
      <Text style={{ fontSize: 12 }}>
        Enter the info of your dog
      </Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around'
      }}>
        <Button
          title={"Add My Dog"}
          color="blue"
          onPress={() => { navigation.navigate("Add My Dog") }
          }
        />
        <View style={styles.missingInfoSheet}>
          <Text>My Dog</Text>
          <Text>{currentValue.name}</Text>
          <Text>{currentValue.address}</Text>
          <Text>{currentValue.breed} </Text>
          <Text>{currentValue.time} </Text>
          <Image style={{ width: 66, height: 58, }} source={{ uri: currentValue.image }} />
          <Button
            title={"publish"}
            color="cyan"
            onPress={() => { storeData(currentValue) }
            }
          />
        </View>

        <Button
          title={"Clear"}
          color="red"
          onPress={() => {
            clearAll()
            setMissingDogInfo([])
          }}
        />

      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
      }}>
        <Text style={{ fontSize: 20 }}>
          All missing dogs
        </Text>
      </View>

      <FlatList
        data={missingDogInfo.reverse()}
        renderItem={renderMissingDogInfo}
        keyExtractor={item => item.date}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign: 'left',
    marginTop: 20,
    padding: 20,
  },
  missingInfoSheet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    backgroundColor: '#aaa',
    fontSize: 32,
    padding: 10,
    color: 'blue'
  },

});

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All missing dogs" component={MissingDogInfo} />
      <Stack.Screen name="Add My Dog" component={AddMyDog} />
    </Stack.Navigator>
  );
}

