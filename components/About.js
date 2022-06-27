import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Image, Text, View } from 'react-native';

const About = () =>{
    return(
      <View style={styles.container}>
        <Text style={styles.header}> About the developer</Text>
        <Text style={styles.content}>I am a third year undergraduate student at Brandeis</Text>
        <Text style={styles.content}>This is a picture of my dog. His name is Barton.</Text>
        <Image source={require('./sources/MyDog.jpg')}
          style={styles.image}
        />
        <Text style={styles.content}>I want to build an app that every one can post the information of their losing pets. And others who find the pet can reply to that post.</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:20,
      backgroundColor: "white",
      alignItems:"center"
    },
    header: {
      fontWeight: "bold",
      fontSize:20,
    },
    content:{
      color:"blue",
      fontSize:15,
      paddingLeft:20,
    },
    image:{
      width:200,
      height:250,
      alignSelf:"center",
    },
  });
  
  export default About;