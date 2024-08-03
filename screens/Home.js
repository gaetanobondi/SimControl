import React, { useState, useEffect } from "react";
import { View, Text, useColorScheme, StyleSheet, Image } from "react-native";
import { getColors } from "../utilies/Color";
import { fontStyles } from "../utilies/Fonts";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Dato from "../components/Dato";
import scrapeWebsite from "../services/scraping";
import cheerio from 'cheerio';

const Home = () => {
    const colors = getColors(useColorScheme());

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
                color: '#CF1B1F',
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
                backgroundColor: '#CF1B1F',
                width: 80,
                height: 80,
                borderRadius: '50%',
                shadowColor: '#CF1B1F',
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
            }
        });
    }

    const style = dynamicStyles(colors);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offerName, setOfferName] = useState('');
    const [credit, setCredit] = useState(0);
    const [expiration, setExpiration] = useState('');
    const [totalCalls, setTotalCalls] = useState(0);
    const [totalSMS, setTotalSMS] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [gigaTotali, setGigaTotali] = useState(0);

    const handleScrape = async () => {
        setLoading(true);
        const scrapedData = await scrapeWebsite('https://www.iliad.it/account/', 'difcl8mlu1ighdm5md718ro4kh');
        setData(scrapedData);
        setLoading(false);

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

        console.log('Giga totali:', gigaTotali);

        setTotalCalls(chiamate);
        setTotalSMS(sms);
        setTotalData(dati);
    };

    useEffect(() => {
        handleScrape();
    }, []);

    const data2 = [
        {
            icon: <FontAwesome5 name="phone-alt" size={24} color="#c00" />,
            title: 'Chiamate',
            value: totalCalls,
        },
        {
            icon: <FontAwesome5 name="envelope" size={24} color="#c00" />,
            title: 'SMS',
            value: totalSMS,
        },
        {
            icon: <FontAwesome6 name="arrow-right-arrow-left" size={24} color="#c00" style={{transform: [{ rotate: '90deg' }, { scaleX: -1 }],}} />,
            title: 'Dati',
            value: totalData,
            total: gigaTotali
        }
    ];

    return (
        <View>
            <View style={style.header}>
                <Image
                    source={require('../assets/logo-iliad.png')}
                    style={style.logo}
                />
                <FontAwesome5 name="user" size={18} color="#c00" />
            </View>
            <View style={style.card}>
                <View style={style.cardTop}>
                    <View style={style.info}>
                        <Text style={style.offerStatus}>Offerta attiva</Text>
                        <Text style={style.offerName}>{offerName}</Text>
                        <Text>Credito: <Text style={style.creditValue}>{credit}</Text></Text>
                    </View>
                    <View style={style.ricarica}>
                        <FontAwesome name="credit-card" size={24} color="#fff" />
                        <Text style={{ color: '#fff', marginTop: 4, ...fontStyles.caption1, fontWeight: 'bold' }}>Ricarica</Text>
                    </View>
                </View>
                <View style={style.countries}>
                    <Text style={style.countryText}>IN ITALIA</Text>
                    <Text style={style.countryText}>|</Text>
                    <Text style={style.countryText}>ESTERO</Text>
                </View>
                <Text style={style.expiration}>{expiration}</Text>
                <View style={style.dati}>
                    { data2.map((item, index) => <Dato key={index} data={item} />) }
                </View>
            </View>
        </View>
    );
}

export default Home;