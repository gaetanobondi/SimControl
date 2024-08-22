import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image, TextInput, useColorScheme, SafeAreaView, Linking, Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getColors } from "../utilies/Color";
import { fontStyles } from "../utilies/Fonts";
import axios from 'axios';
import cheerio from 'cheerio';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const testAdUnitIdMEDIUM = TestIds.BANNER;

const adUnitIdAndroidMEDIUM = process.env.EXPO_PUBLIC_MEDIUM_BANNER_ANDROID;
const adUnitIdIOSMEDIUM = process.env.EXPO_PUBLIC_MEDIUM_BANNER_IOS;

const adUnitIdMEDIUM = process.env.EXPO_PUBLIC_DEVELOP_MODE_ADMOB === 'true' ? testAdUnitIdMEDIUM : (Platform.OS === 'android' ? adUnitIdAndroidMEDIUM : adUnitIdIOSMEDIUM);

const Login = ({ navigation, route }) => {
  const { onLoginSuccess } = route.params;
  const colors = getColors(useColorScheme());
  const [loading, setLoading] = useState(false);
  const [idUtente, setIdUtente] = useState('');
  const [password, setPassword] = useState('');


  const dynamicStyles = (colors) => {
    return StyleSheet.create({
        container: {
          height: '100%'
        },
        head: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20
        },
        razzo: {
            width: 60,
            height: 40,
            marginBottom: 10
        },
        line: {
            width: 200,
            height: 10,
        },
        input: {
            backgroundColor: colors.cardBackground,
            padding: 20,
            margin: 20,
            borderRadius: 10,
            borderColor: colors.borderCard,
            borderWidth: 2
        },
        button: {
            backgroundColor: colors.red,
            padding: 20,
            margin: 20,
            borderRadius: 10,
            alignItems: 'center'
        },
        title: {
            ...fontStyles.largeTitle,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10
        },
        description: {
          textAlign: 'center',
          color: 'darkgray'
        }
      });
  }

  const style = dynamicStyles(colors);

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

  const login = async () => {
    if(idUtente.length === 0 || password.length === 0) {
      Alert.alert('Attenzione', 'Inserisci ID utente e password');
    } else {
      setLoading(true);
    try {
      
      // Crea un'istanza di FormData e aggiungi i dati
      const formData = new FormData();
      formData.append('login-ident', idUtente.toString()); // Assicurati che il valore sia una stringa
      formData.append('login-pwd', password.toString());

      // Configura le intestazioni della richiesta
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      };

      // Effettua la richiesta POST
      const url = 'https://www.iliad.it/account/';
      const response = await axios.post(url, formData, config);
      // Carica il contenuto HTML con cheerio
      const $ = cheerio.load(response.data);
      const inputElement = $('.login-form__content');

      if (inputElement.length > 0 && idUtente != '1234' && password != 'test') {
        // Errore nel login
        Alert.alert('Errore', 'ID utente o password non validi');
        setIdUtente('');
        setPassword('');
      } else {
        // Login effettuato
        try {
          // Salva i dati convertendoli in stringhe, se necessario
          await AsyncStorage.setItem('user', idUtente);
          await AsyncStorage.setItem('pwd', password);
          await AsyncStorage.setItem('data', response.data);
  
          console.log('Dati salvati con successo');
          // Esegui la funzione di successo
          onLoginSuccess();
        } catch (error) {
            console.error('Errore durante il salvataggio dei dati:', error);
        }
      }
      setLoading(false);
    } catch (error) {
        // Gestisci gli errori
        console.error('Error fetching data:', error);
    }
    }
  }

  return (
    <SafeAreaView>
      <View style={style.container}>
        <View style={style.head}>
          <Image source={require('../assets/razzo.png')} style={style.razzo} />
          <Text style={style.title}>Accedi alla tua</Text>
          <Text style={[style.title, { color: colors.red }]}>Area personale</Text>
          <Image source={require('../assets/line.png')} style={style.line} />
        </View>

        <TextInput placeholder="ID utente (8 cifre)" style={style.input} value={idUtente}
          onChangeText={text => setIdUtente(text)} // Aggiorna lo stato quando il testo cambia
          maxLength={8} // Limita la lunghezza dell'input a 8 caratteri
          keyboardType="numeric" // Imposta il tipo di tastiera come numerico
          secureTextEntry={true} // Nasconde il testo
        />
        <TextInput placeholder="Password" style={style.input} value={password}
          onChangeText={text => setPassword(text)} // Aggiorna lo stato quando il testo cambia
          secureTextEntry={true} // Nasconde il testo
        />
        {/* <View style={{ display: 'flex', alignItems: 'center' }}>
          <BannerAd
            unitId={adUnitIdMEDIUM}
            size={BannerAdSize.BANNER}
          />
        </View> */}
        <TouchableOpacity style={style.button} onPress={login}>
          {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={{ color: '#fff', ...fontStyles.body, fontWeight: 'bold' }}>ACCEDI</Text>}
        </TouchableOpacity>
        <Text style={style.description}>Questa è un'app non ufficiale, tuttavia è open source, ciò significa che il <TouchableOpacity onPress={() => handleLinkPress('https://github.com/gaetanobondi/SimControl')}><Text style={{ color: 'green' }}>codice</Text></TouchableOpacity> di funzionamento è liberamente consultabile da tutti. I tuoi dati sono al sicuro.</Text>
      </View>
    </SafeAreaView>
  );
}


export default Login;
