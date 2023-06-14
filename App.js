import React, {useEffect, useState} from 'react';
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
import {addDoc, collection, orderBy, onSnapshot, query} from "firebase/firestore";
import { WebView } from 'react-native-webview';
import YoutubePlayer from "react-native-youtube-iframe";



function HomeScreen({ navigation }) {

  const [noticias, setarNoticias] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'noticias'), orderBy('data', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setarNoticias(
        snapshot.docs.map((doc) => ({
          info: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);
  

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
         {
  noticias.map((val, index) => {
    if (index < 2) {
      return (
        <ImageBackground
           key={val.info.titulo}
          source={{
            uri: val.info.imagem,
          }}
          style={styles.image}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Notícia', {
                titulo: val.info.titulo,
                conteudo: val.info.conteudo,
                imagem:  val.info.imagem,
              })
            }
            style={styles.gray}
          ></TouchableOpacity>

          <Text style={styles.text}>{val.info.titulo}</Text>
        </ImageBackground>
      );
    }

    return null; // Adicionado um retorno nulo caso o índice seja maior que 1
  })

  
}

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
     
{
  noticias.map((val, index) => {
    if (index >= 2) {
      return (
        <View
        key={val.info.data}
        style={{flexDirection: 'row', marginBottom: 10,}}
        >

          <TouchableOpacity
          style={{flexDirection: 'row',}}
          onPress={() => navigation.navigate('Notícia', {
            titulo: val.info.titulo,
            conteudo: val.info.conteudo,
            imagem: val.info.imagem

          })}>

          <Image
          source={{
            uri: val.info.imagem,
          }}
          style={{width: 100, height: 100,}}
          />
          <Text
          style={{padding: 10}}>{val.info.titulo}</Text>
          </TouchableOpacity>
        </View>

      );
    }else{
    <View>Não tem nenhuma notícia</View>

    }

  })

  
}

    

     </ScrollView>

      </View>
  </View>
  );
}


function NoticiaScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.title}>{route.params.titulo}</Text>

        <ImageBackground
          source={{ uri: route.params.imagem }}
          style={{ ...styles.image, height: 200 }}
        ></ImageBackground>

        <View style={styles.conteudoContainer}>
          {route.params.conteudo.split('<br>').map((paragraph, index) => {
            if (paragraph.includes('[imagem:')) {
              const start = paragraph.indexOf('[imagem:');
              const end = paragraph.indexOf(']', start);
              const imageUrl = paragraph.substring(start + 8, end);

              return (
                <View key={index}
                style={styles.imageContainer}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.img}
                  />
                  <Text style={styles.conteudo}>
                    {paragraph.substring(end + 1)}
                  </Text>
                </View>
              );
            } else {
              return (
                <Text key={index} style={styles.conteudo}>
                  {paragraph}
                </Text>
              );
            }
          })}
        </View>
      </ScrollView>
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
    flex: 0.5, 
    resizeMode: 'cover',
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 25,
    marginLeft: 10,
    position: 'absolute',
    bottom:80, 
    opacity: 0.4,

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

  title: {
    padding: 15,
    fontWeight: 'bold',
    fontSize: 25,
  },

  conteudo: {
    padding: 20,
    fontSize: 15,
      textAlign: 'justify',
  lineHeight: 24,

  },

  conteudoContainer: {
    padding: 10,
      lineHeight: 24,

  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  
  img:{
    width: 100,
    height: 100,
    marginRight: 10,
  },
});
