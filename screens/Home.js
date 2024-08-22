import React, { useState, useEffect } from "react";
import { View, Text, useColorScheme, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Alert, Platform } from "react-native";
import { getColors } from "../utilies/Color";
import { fontStyles } from "../utilies/Fonts";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Dato from "../components/Dato";
import cheerio from 'cheerio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../components/AuthContext";
import axios from 'axios';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

// Definisci gli ID per le unità pubblicitarie di test per Android e iOS
const testAdUnitIdBIG = TestIds.BANNER;
const testAdUnitIdMEDIUM = TestIds.BANNER;
const testAdUnitIdINTERSTITIAL = TestIds.INTERSTITIAL;

// Definisci gli ID per le unità pubblicitarie reali per Android e iOS
const adUnitIdAndroidBIG = process.env.EXPO_PUBLIC_BIG_BANNER_ANDROID;
const adUnitIdIOSBIG = process.env.EXPO_PUBLIC_BIG_BANNER_IOS;
const adUnitIdAndroidMEDIUM = process.env.EXPO_PUBLIC_MEDIUM_BANNER_ANDROID;
const adUnitIdIOSMEDIUM = process.env.EXPO_PUBLIC_MEDIUM_BANNER_IOS;
const adUnitIdAndroidINTERSTITIAL = process.env.EXPO_PUBLIC_INTERSTITIAL_BANNER_ANDROID;
const adUnitIdIOSINTERSTITIAL = process.env.EXPO_PUBLIC_INTERSTITIAL_BANNER_IOS;

// Determina la piattaforma corrente
const adUnitIdBIG = process.env.EXPO_PUBLIC_DEVELOP_MODE_ADMOB === 'true' ? testAdUnitIdBIG : (Platform.OS === 'android' ? adUnitIdAndroidBIG : adUnitIdIOSBIG);
const adUnitIdMEDIUM = process.env.EXPO_PUBLIC_DEVELOP_MODE_ADMOB === 'true' ? testAdUnitIdMEDIUM : (Platform.OS === 'android' ? adUnitIdAndroidMEDIUM : adUnitIdIOSMEDIUM);
const adUnitIdINTERSTITIAL = process.env.EXPO_PUBLIC_DEVELOP_MODE_ADMOB === 'true' ? testAdUnitIdINTERSTITIAL : (Platform.OS === 'android' ? adUnitIdAndroidINTERSTITIAL : adUnitIdIOSINTERSTITIAL);

const interstitial = InterstitialAd.createForAdRequest(adUnitIdINTERSTITIAL, {

});


const Home = () => {
    const colors = getColors(useColorScheme());
    const { setAuthenticationStatus } = useAuth();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
          const { status } = await requestTrackingPermissionsAsync();
          if (status === 'granted') {
            console.log('Yay! I have user permission to track data');
          }
        })();
      }, []);

    const dynamicStyles = (colors) => {
        return StyleSheet.create({
            header: {
                marginBottom: 10,
                padding: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.cardBackground
            },
            logo: {
                width: 60,
                height: 30,
            },
            card: {
                borderRadius: 20,
                padding: 20,
                backgroundColor: colors.cardBackground,
                margin: 20,
                borderColor: colors.borderCard,
                borderWidth: 2
            },
            offerStatus: {
                ...fontStyles.caption1,
                fontWeight: 'bold'
            },
            offerName: {
                ...fontStyles.title1,
                fontWeight: 'bold',
                marginVertical: 5
            },
            creditValue: {
                color: colors.red,
                fontWeight: 'bold'
            },
            expiration: {
                ...fontStyles.caption1,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10
            },
            cardTop: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20
            },
            ricarica: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.red,
                width: 80,
                height: 80,
                borderRadius: 80,
                shadowColor: colors.red,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 5,
            },
            countries: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10
            },
            countryText: {
                ...fontStyles.headline,
                fontWeight: 'bold',
                marginRight: 10
            },
            dati: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20
            },
            name: {
                ...fontStyles.title1,
                fontWeight: 'bold',
                margin: 20,
                marginBottom: 0
            },
        });
    }

    const styles = dynamicStyles(colors);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
            setTimeout(() => {
              interstitial.show();
            }, 2000);
          });
      
          // Start loading the interstitial straight away
          interstitial.load();
      
          // Unsubscribe from events on unmount
          return unsubscribe;
      }, []);

      const test = async () => {
        const user = await AsyncStorage.getItem('user');
          if(user == '1234') {
            setOfferName('Giga 50');
            setCredit(3.99);
            setExpiration('Scade il 31/12/2024');
            setTotalCalls('100m 34s');
            setTotalSMS(50);
            setTotalData('5GB');
            setGigaTotali('50GB');
            setName('Test');
          }
        };
    
    
      // No advert ready to show yet
      if (!loaded) {
        // return null;
      }

    const logout = async () => {
        try {
            const url = 'https://www.iliad.it/account/?logout=user';
            await axios.get(url);
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('pwd');
            await AsyncStorage.removeItem('data');
            setAuthenticationStatus(false);
        } catch (error) {
            console.error(`Si è verificato un errore durante il logout: ${error}`);
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('pwd');
            await AsyncStorage.removeItem('data');
        }
    };

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [offerName, setOfferName] = useState('');
    const [credit, setCredit] = useState(0);
    const [expiration, setExpiration] = useState('');
    const [totalCalls, setTotalCalls] = useState(0);
    const [totalSMS, setTotalSMS] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [gigaTotali, setGigaTotali] = useState(0);
    const [name, setName] = useState('');

    // Dati per FlatList
    const offers = [
        {
            id: '1',
            offerName,
            credit,
            expiration,
            totalCalls,
            totalSMS,
            totalData,
            gigaTotali,
            name
        },
    ];

    const refreshData = async () => {
        setLoading(true);
        setRefreshing(false);
        const user = await AsyncStorage.getItem('user');
        const pwd = await AsyncStorage.getItem('pwd');
        try {
            // Crea un'istanza di FormData e aggiungi i dati
            const formData = new FormData();
            formData.append('login-ident', user.toString()); // Assicurati che il valore sia una stringa
            formData.append('login-pwd', pwd.toString());

            // Configura le intestazioni della richiesta
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data' // Indica che il corpo è in formato form-data
                }
            };

            // Effettua la richiesta POST
            const url = 'https://www.iliad.it/account/';
            const response = await axios.post(url, formData, config);
            // Carica il contenuto HTML con cheerio
            const $ = cheerio.load(response.data);
            const inputElement = $('.login-form__content');

            if (inputElement.length > 0 && user != '1234' && pwd != 'test') {
                // Errore nel login
                logout();
            } else {
                await AsyncStorage.setItem('data', response.data);
                handleScrape();
            }
        } catch (error) {
            // Gestisci gli errori
            console.error('Error fetching data:', error);
            logout();
        }
    }

    const handleScrape = async () => {
        setLoading(true);
        const user = await AsyncStorage.getItem('user');
        if(user == '1234') {
            test();
            setLoading(false);
        } else {
            const scrapedData = await AsyncStorage.getItem('data');

            if (scrapedData) {
                // Carica il contenuto HTML con cheerio
                const $ = cheerio.load(scrapedData);
                $('.grid-c.w-4 h2 span').each((index, element) => {
                    setOfferName($(element).text().split('Offerta iliad ')[1]);
                });
                $('.grid-c.w-4 h2 b').each((index, element) => {
                    setCredit($(element).text());
                });
                $('.end_offerta').each((index, element) => {
                    setExpiration($(element).text().trim());
                });
                $('.identite').each((index, element) => {
                    setName($(element).text().trim());
                });

                // Consumi
                // Estrai le informazioni
                const chiamate = $('.conso__text').first().find('.red').first().text().trim();
                const sms = $('.conso__text').eq(1).find('.red').first().text().trim();
                const dati = $('.conso__text').eq(2).find('.red').first().text().trim();
                // Usa split per ottenere solo i dati totali
                // Seleziona l'elemento contenente i dati
                const datiTesto = $('.conso__text').text().trim();

                // Usa split per ottenere la parte dopo "/"
                const parti = datiTesto.split('/').map(part => part.trim());

                // Prendi la seconda parte (giga totali) e rimuovi eventuali spazi extra
                setGigaTotali(parti[1] ? parti[1].split(' ')[0].trim() : 'N/A');


                setTotalCalls(chiamate);
                setTotalSMS(sms);
                setTotalData(dati);
                setLoading(false);
            } else {
                logout();
            }
        }
    };

    useEffect(() => {
        refreshData();
        test();
    }, []);
    useEffect(() => {
        refreshData();
    }, [refreshing]);

    const data2 = [
        {
            icon: <FontAwesome5 name="phone-alt" size={24} color={colors.red} />,
            title: 'Chiamate',
            value: totalCalls,
        },
        {
            icon: <FontAwesome5 name="envelope" size={24} color={colors.red} />,
            title: 'SMS',
            value: totalSMS,
        },
        {
            icon: <MaterialIcons name="compare-arrows" size={30} color={colors.red} style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }], }} />,
            title: 'Dati',
            value: totalData,
            total: gigaTotali
        }
    ];

    const ricarica = () => {
        Alert.alert('Ricarica', 'Presto dispobile!', [
            { text: 'Cancella', style: 'cancel' },
            { text: 'Ok', onPress: () => console.log('Recharge confirmed') }
        ]);
    }

    // Render item per FlatList
    const renderItem = ({ item }) => (
        <>
            <Text style={styles.name}>Ciao {name}</Text>
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.info}>
                        <Text style={styles.offerStatus}>Offerta attiva</Text>
                        <Text style={styles.offerName}>{item.offerName}</Text>
                        <Text>Credito: <Text style={styles.creditValue}>{item.credit}</Text></Text>
                    </View>
                    <TouchableOpacity style={styles.ricarica} onPress={ricarica}>
                        <FontAwesome name="credit-card" size={24} color="#fff" />
                        <Text style={{ color: '#fff', marginTop: 4, ...fontStyles.caption1, fontWeight: 'bold' }}>Ricarica</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.countries}>
                    <Text style={styles.countryText}>IN ITALIA</Text>
                    <Text style={styles.countryText}>|</Text>
                    <Text style={styles.countryText}>ESTERO</Text>
                </View>
                <Text style={styles.expiration}>{item.expiration}</Text>
                <View style={styles.dati}>
                    {data2.map((item, index) => <Dato key={index} data={item} />)}
                </View>
            </View>
            {/* <View style={{ display: 'flex', alignItems: 'center', marginBottom: 150 }}>
                <BannerAd
                    unitId={adUnitIdBIG}
                    size={BannerAdSize.MEDIUM_RECTANGLE}
                />
            </View> */}
        </>
    );

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Image
                    source={require('../assets/logo-iliad.png')}
                    style={styles.logo}
                />
                <FontAwesome5 name="user" size={18} color="#c00" />
            </View>
            {/* <View style={{ display: 'flex', alignItems: 'center' }}>
                <BannerAd
                    unitId={adUnitIdMEDIUM}
                    size={BannerAdSize.BANNER}
                />
            </View> */}
            {loading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={offers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    onRefresh={() => { setLoading(true); setRefreshing(true) }}
                    refreshing={refreshing}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

export default Home;