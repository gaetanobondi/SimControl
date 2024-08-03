import React from "react";
import { View, useColorScheme, Text, StyleSheet } from "react-native";
import { getColors } from "../utilies/Color";
import { fontStyles } from "../utilies/Fonts";
import Svg, { G, Circle } from 'react-native-svg';

const Dato = ({ data }) => {
    const colors = getColors(useColorScheme());
    const dynamicStyles = (colors) => {
        return StyleSheet.create({
            container: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10
            },
            circle: {
                width: 80,
                height: 80,
                borderRadius: 80,
                backgroundColor: colors.cardBackground,
                borderColor: colors.borderCard,
                borderWidth: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 4
            },
            title: {
                ...fontStyles.body,
                marginTop: 10
            },
            dataContainer: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5
            },
            value: {
                ...fontStyles.caption1,
                color: '#CF1B1F'
            },
            totale: {
                ...fontStyles.caption1,
            },
            graphWrapper: {
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            },
            iconWrapper: {
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
            }
        });
    }
    const styles = dynamicStyles(colors);

    // Ottengo solo il numero
    let maxValue;
    let currentValue;
    let radius;
    let strokeWidth;
    let circleCircumference;
    let leftToSpendAmount;
    let targetAmount;
    let spentAmount;
    let percentage;
    let strokeDashoffset;
    if(data.total) {
        maxValue = data.total.replace(/[^\d.]/g, '');
        currentValue = data.value.replace(/[^\d,]/g, '').replace(',', '.');
        console.log(currentValue, maxValue)
        radius = 80;
        strokeWidth = 12;
        circleCircumference = 2 * Math.PI * radius;
    
        leftToSpendAmount = maxValue - currentValue;
        targetAmount = maxValue;
    
        spentAmount = targetAmount - leftToSpendAmount;
        percentage = (spentAmount / targetAmount) * 100;
        strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;
    }

    return (
        <View style={styles.container}>
            { !data.total ? (
                <View style={styles.circle}>
                    { data.icon }
                </View>
            ) : (
                <View style={styles.graphWrapper}>
                    <Svg height="82" width="82" viewBox="0 0 180 180">
                        <G rotation={-90} originX="90" originY="90">
                        <Circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke={colors.borderCard}
                            fill="transparent"
                            strokeWidth={strokeWidth}
                        />
                        <Circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="#CF1B1F"
                            fill="transparent"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circleCircumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                        />
                        </G>
                    </Svg>
                    <View style={styles.iconWrapper}>
                        { data.icon }
                    </View>
                </View>
            )}
            <Text style={styles.title}>{ data.title }</Text>
            <View style={styles.dataContainer} >
                <Text style={styles.value}>{ data.value }</Text>
                { data.total && <Text style={styles.totale}> / { data.total }</Text> }
            </View>
        </View>
    );
}

export default Dato;