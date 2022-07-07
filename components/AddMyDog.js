import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { useValue } from './ValueStorageContext';

function AddMyDog ()  {
    const { currentValue, setCurrentValue } = useValue();
    const [time, setTime] = useState(currentValue.time);
    const [address, setAddress] = useState(currentValue.address);
    const [name, setName] = useState(currentValue.name);
    const [breed, setBreed] = useState(currentValue.breed);
    const [image, setImage] = useState(currentValue.image);
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 12 }}>
                Enter the info of your dog
            </Text>

            <View style={{
                margin: 20,
                justifyContent: 'space-evenly'
            }}>
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Name"
                    onChangeText={text => {
                        setName(text);
                    }}
                    value={name}
                />
                
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Address"
                    onChangeText={text => {
                        setAddress(text);
                    }}
                    value={address}
                />

                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="breed"
                    onChangeText={text => {
                        setBreed(text);
                    }}
                    value={breed}
                />
                
                <TextInput
                    style={{ fontSize: 20 }}
                    placeholder="Image"
                    onChangeText={text => {
                        setImage(text);
                    }}
                    value={image}
                />
                <DatePicker date={time} mode="datetime" onDateChange={setTime} />

            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>
                <Button
                    title={"publish"}
                    color="blue"
                    onPress={() => {
                        setCurrentValue({ name, address, breed, image, time })
                        setName("")
                        setAddress("")
                        setImage("")
                        setBreed("")
                        setTime(new Date())
                    }}
                />
            </View>
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
});
export default AddMyDog;