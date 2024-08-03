import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

const DonutChart = ({ maxValue, currentValue, radius, strokeWidth }) => {
    const circleCircumference = 2 * Math.PI * radius;
  
    const leftToSpendAmount = maxValue - currentValue;
    const targetAmount = maxValue;
  
    const spentAmount = targetAmount - leftToSpendAmount;
    const percentage = (spentAmount / targetAmount) * 100;
    const strokeDashoffset =
      circleCircumference - (circleCircumference * percentage) / 100;
  
    return (
      <View style={styles.container}>
        <View style={styles.graphWrapper}>
          <Svg height="100" width="100" viewBox="0 0 180 180">
            <G rotation={-90} originX="90" originY="90">
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#E9E7FC"
                fill="transparent"
                strokeWidth={strokeWidth}
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#0477D2"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </G>
          </Svg>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DonutChart;
