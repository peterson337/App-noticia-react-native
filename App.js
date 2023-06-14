import { StatusBar } from 'expo-status-bar';

import { 
StyleSheet,
Text,
View,
Button,
ImageBackground,
ScrollView,
TouchableOpacity,
Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Carrosel} from "./carrosel";
import {db} from "./firebase";
import {addDoc, collection} from "firebase/firestore";

function HomeScreen({ navigation }) {

  const image = {uri: 'https://reactjs.org/logo-og.png'};

  return (
    <View
    style={{flex: 1,}}>

    <View style={styles.container}>

    <ScrollView 
    style={styles.container}
    contentContainerStyle={{
    height: 250, 
    width: '200%',
  }}
    horizontal
    >

    <ImageBackground 
    source={image}  
    style={styles.image}>

      <TouchableOpacity
      onPress={() => navigation.navigate('Notícia', {
        titulo: 'Um titulo de noticia',
        conteudo: 'minha noticia de teste'
      })}
      style={styles.gray}
      ></TouchableOpacity>

      <Text style={styles.text}>A minha notícia</Text>

    </ImageBackground>




    <ImageBackground 
    source={image}  
    style={styles.image}>

      <TouchableOpacity
      style={styles.gray}
      ></TouchableOpacity>

      <Text style={styles.text}>A minha notícia</Text>

    </ImageBackground>
    </ScrollView>

  </View>

      <View
      style={{
      flex:0.7, 
      padding: 20,
      }}
      
      >

      <View
      style={{
      width: 50,
      height: 2,
      position: 'absolute',
      left: 40,
      top: 40,
      backgroundColor: '#069' 
    }}
      >

      </View>  

     <Text>Mais notícias</Text>   

     <ScrollView
     contentContainerStyle={{padding: 20,}}
     style={{flex: 1,}}
     >
      <View
      style={{flexDirection: 'row', marginBottom: 10,}}
      >
          <TouchableOpacity
          style={{flexDirection: 'row',}}
          onPress={() => navigation.navigate('Notícia', {
            titulo: 'Um titulo de noticia',
            conteudo: 'minha noticia de teste'
          })}>

          <Image
          source={image}
          style={{width: 100, height: 100,}}
          />
          <Text
          style={{padding: 10}}>Minha notícia de teste</Text>
          </TouchableOpacity>

      </View>

     </ScrollView>

      </View>
  </View>
  );
}


function NoticiaScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{route.params.titulo}</Text>
        <Text>{route.params.conteudo}</Text>

    </View>
  );
}

const Stack = createNativeStackNavigator();


export default function App({ navigation }) {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Portal" component={HomeScreen} />
      <Stack.Screen name="Notícia" component={NoticiaScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 0.3,
  },
  image: {
    flex: 1, 
    resizeMode: 'cover',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 29,
    marginLeft: 10,
    position: 'absolute',
    justifyContent: 'flex-end',
    /* 
    bottom:60, // Ajuste a posição vertical do texto conforme necessário
    left: 0, // Ajuste a posição horizontal do texto conforme necessário
    */
  },
  gray: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
