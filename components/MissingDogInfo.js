import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, Text, View, SafeAreaView, FlatList, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MissingDogInfo = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [streetAddress, setStreetAddress] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [breed, setBreed] = useState("")
    const [missingDogInfo, setMissingDogInfo] = useState([])
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
                setDate("")
                setTime("")
                setStreetAddress("")
                setZipCode("")
                setBreed("")
                setMissingDogInfo([])
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
                <Text>{item.date}</Text>
                <Text>{item.time}</Text>
                <Text>{item.streetAddress} </Text>
                <Text>{item.zipCode} </Text>
                <Text>{item.breed} </Text>
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
                margin: 20,
                justifyContent: 'space-evenly'
            }}>
                <TextInput
                    style={{ fontSize: 20, }}
                    placeholder="Date(MM/DD/YYYY)"
                    onChangeText={text => {
                        setDate(text);
                    }}
                    value={date}
                />

                <TextInput
                    style={{ fontSize: 20, }}
                    placeholder="Time"
                    onChangeText={text => {
                        setTime(text);
                    }}
                    value={time}
                />

                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="streetAddress"
                    onChangeText={text => {
                        setStreetAddress(text);
                    }}
                    value={streetAddress}
                />

                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="zipcode"
                    onChangeText={text => {
                        setZipCode(text);
                    }}
                    value={zipCode}
                />

                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="breed"
                    onChangeText={text => {
                        setBreed(text);
                    }}
                    value={breed}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <Button
                    title={"publish"}
                    color="blue"
                    onPress={() => {
                        const newMissingInfo =
                            missingDogInfo.concat(
                                {
                                    'date': date,
                                    'time':time,
                                    'streetAddress': streetAddress,
                                    'zipCode': zipCode,
                                    'breed': breed,
                                })
                        setMissingDogInfo(newMissingInfo)
                        storeData(newMissingInfo)
                        setDate("")
                        setTime("")
                        setStreetAddress("")
                        setZipCode("")
                        setBreed("")
                    }}
                />
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
export default MissingDogInfo;