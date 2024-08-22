import React, { useState, useEffect } from "react";
import { View, Text, useColorScheme, StyleSheet, SafeAreaView, TouchableOpacity, Image, Linking } from "react-native";
import { getColors } from "../utilies/Color";
import { fontStyles } from "../utilies/Fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../components/AuthContext";
import axios from 'axios';

const Info = () => {
    const colors = getColors(useColorScheme());
    const { setAuthenticationStatus } = useAuth();

    const dynamicStyles = (colors) => {
        return StyleSheet.create({
            container: {
                backgroundColor: colors.cardBackground,
                height: '100%',
                padding: 20,
            },
            title: {
                ...fontStyles.largeTitle,
                fontWeight: 'bold',
                marginBottom: 10,
            },
            description: {
                ...fontStyles.body,
            },
            logoutButton: {
                marginTop: 20,
                padding: 10,
                backgroundColor: colors.red,
                borderRadius: 5,
            },
            logoutButtonText: {
                color: '#fff',
                textAlign: 'center',
            },
            creditsContainer: {
                marginTop: 20,
            },
            personContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 25,
            },
            personImage: {
                width: 100,
                height: 100,
                borderRadius: 100,
                marginRight: 10,
                borderColor: colors.borderCard,
                borderWidth: 2
            },
            personInfo: {
                flex: 1,
            },
            personName: {
                fontWeight: 'bold',
                fontSize: 16,
            },
            link: {
                color: '#007BFF',
                ...fontStyles.body,
                marginBottom: 5,
            },
        });
    }

    const styles = dynamicStyles(colors);

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
        }
    };

    const handleLinkPress = (url) => {
        Linking.openURL(url).catch((err) => console.error("An error occurred", err));
    };

    // Dati delle persone
    const credits = [
        {
            name: 'Gaetano Bondì',
            description: 'Sviluppatore',
            image: require('../assets/gaetano.jpg'),
            instagram: 'https://instagram.com/gaetano.bondi',
            tiktok: 'https://tiktok.com/@gaetano.bondi',
        },
        {
            name: 'Riccardo Breccia',
            description: 'Designer',
            image: require('../assets/riccardo.jpg'),
            instagram: 'https://instagram.com/breccia.riccardo',
            tiktok: 'https://tiktok.com/@breccia.riccardo',
        },
    ];


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Info</Text>
                <Text style={styles.description}>Questa è un'app non ufficiale per i clienti Iliad mobile.</Text>
                <View style={styles.creditsContainer}>
                    {credits.map((person, index) => (
                        <View key={index} style={styles.personContainer}>
                            <Image source={person.image} style={styles.personImage} />
                            <View style={styles.personInfo}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                                    <Text style={styles.personName}>{person.name}</Text>
                                    <Text style={{ color: colors.red, marginLeft: 10 }}>{person.description}</Text>
                                </View>
                                <TouchableOpacity onPress={() => handleLinkPress(person.instagram)}>
                                    <Text style={styles.link}>Instagram</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleLinkPress(person.tiktok)}>
                                    <Text style={styles.link}>TikTok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Esci</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Info;