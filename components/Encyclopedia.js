import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
var breedId = '1';
var imgUrl = '';

function InfoHome({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBreeds = async () => {
        try {
            const response = await fetch('https://api.thedogapi.com/v1/breeds?limit=300&page=0', {
                headers: { 'x-api-key': '7cd9b01f-0461-4dfc-9cc4-ba41fc4ab7dc' }
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getBreeds() }, [])

    return (
        <ScrollView>
            <Text style={{ fontSize: 30, margin: 10 }}>Find a breed</Text>
            <View style={{ margin: 10 }}>
                <Text>All breeds:</Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Details'); breedId = item.id; imgUrl = JSON.stringify(item.image.url) }}>
                            <Text>{item.name}</Text>
                            <Image
                                style={{ width: 50, height: 50, }}
                                source={{ uri: item.image.url }} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </ScrollView>
    );
}

function BreedDetail({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDetails = async () => {
        try {
            const response = await fetch('https://api.thedogapi.com/v1/breeds/' + breedId, {
                headers: { 'x-api-key': '7cd9b01f-0461-4dfc-9cc4-ba41fc4ab7dc' }
            });
            const json = await response.json();
            setData(json);
            console.log(imgUrl)
            console.log(typeof (imgUrl))
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getDetails() }, [])
    return (
        <SafeAreaView style={styles.detail}>
            <View style={{ margin: 10 }}>
                <Text>{data.name}</Text>
            </View>

            <ScrollView>
                {/* <Text>Weight: {data.weight.metric} kg</Text> */}
                {/*<Text>height: {data.height}</Text> */}
                <Image style={{ width: 300, height: 300 }}
                    source={{ url: imgUrl }} />
                <Text>{data.description}</Text>
                <Text>bred_for: {data.bred_for}</Text>
                <Text>breed_group: {data.breed_group}</Text>
                <Text>life_span: {data.life_span}</Text>
                <Text>history: {data.history}</Text>
                <Text>temperament: {data.temperament}</Text>
            </ScrollView>

        </SafeAreaView>
    )
}

const Stack = createStackNavigator();

const Info = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="InfoHome" component={InfoHome} />
            <Stack.Screen name="Details" component={BreedDetail} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 15,
        margin: 5,
        borderWidth: 2,
        justifyContent: 'space-evenly',
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    detail: {
        padding: 15,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});


export default Info;