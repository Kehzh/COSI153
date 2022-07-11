import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Image, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from './ValueStorageContext';
import moment from 'moment';

function MissingDogInfo({ navigation }) {
    const { currentValue, setCurrentValue } = useValue();
    const [missingDogInfo, setMissingDogInfo] = useState([{ name: 'Barton', address: "100 A Rd", breed: "Scottish Terrier", image: "https://www.thesprucepets.com/thmb/7v39ZR1kMomKzDtmWMft3NWMOh4=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Scottishterrieroutside-5af801f8056a4a00a01b032a8da8eabf.jpg", time: new Date() }]);
    useEffect(() => { getData() }, []);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@MissingInfo')
            let data = null
            if (jsonValue != null) {
                data = JSON.parse(jsonValue)
                setMissingDogInfo(data)
                console.log(JSON.stringify(missingDogInfo));
                console.log(missingDogInfo instanceof Array);
                console.log('missing dog info has been loaded');
            } else {
                console.log('empty Storage')
            }
        } catch (e) {
            console.log("error in getData ")
            console.dir(e)
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

    const deleteOne = async (item) => {
        try {
            var index = missingDogInfo.indexOf(item);
            if (index != -1) {
                missingDogInfo.splice(index, 1);
            }
            storeData(missingDogInfo);
        } catch (e) {
            console.log("error in delete data");
            console.dir(e);
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

    const renderMissingDogInfo = ({ item }) => {
        console.log("render item invoked");
        console.log(JSON.stringify(item));
        console.log('name' + JSON.stringify(item.name));
        console.log("address" + JSON.stringify(item.address));
        return (
            <View style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <Text>Name: {item.name}</Text>
                <Text>Address: {item.address}</Text>
                <Text>Breed: {item.breed} </Text>
                <Text>Last seen on: {moment(item.time).format('YYYY-MM-DD')} </Text>
                <Image style={{ width: 180, height: 180 }} source={{ uri: item.image }} />
                <TouchableOpacity
                    style={{ width: 40, height: 500 }}
                    onPress={() => deleteOne(item)}>
                    <Text style={{fontSize:5}}>delete</Text>
                </TouchableOpacity> 
                <View style={styles.seperator}></View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.missingInfoSheet}>
                <Text style={styles.headerText}>All missing dogs</Text>
                <FlatList
                    data={missingDogInfo}
                    renderItem={renderMissingDogInfo}
                    keyExtractor={image => image}
                />
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 10
            }}>
                <Text style={{
                    fontSize: 12,
                    padding: 10,
                    textAlign: 'center'
                }}>
                    preview
                </Text>
                <View style={{
                    justifyContent: "center"
                }}>
                    <Text>Name: {currentValue.name}</Text>
                    <Text>Address: {currentValue.address}</Text>
                    <Text>Breed: {currentValue.breed} </Text>
                    <Text>Last seen on: {moment(currentValue.time).format('YYYY-MM-DD')} </Text>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: currentValue.image }} />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate("Add My Dog") }}>
                        <Text>Add My Dog</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            console.log(typeof missingDogInfo)
                            const newMissingDogInfo = missingDogInfo.concat(currentValue);
                            setMissingDogInfo(newMissingDogInfo);
                            storeData(newMissingDogInfo);
                            setCurrentValue({ name: null, address: null, breed: null, image: null, time: null })
                        }}>
                        <Text>Publish</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate("Add My Dog") }}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{
                    alignSelf: "flex-end",
                    backgroundColor: "#a7a7a7",
                    padding: 10,
                    marginBottom: 10
                }}
                    onPress={() => {
                        clearAll()
                        setMissingDogInfo([])
                    }}>
                    <Text style={{ color: "0d0d0d" }}>Clear</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#e2fdfd',
        padding: 20,
    },
    missingInfoSheet: {
        flex: 2,
        padding: 10,
        flexDirection: 'column',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold",
    },
    seperator: {
        height: 1,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: "#dde0e0",
    },
    button: {
        alignSelf: "flex-end",
        padding: 10,

        flexgrow: 1
    },
    buttonGroup: {
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#c0f7f7",
    }

});

export default MissingDogInfo;
