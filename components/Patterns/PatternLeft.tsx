import React from 'react';
import { StyleSheet } from 'react-native';
import { purple100, purple60, purple80 } from '../../constants/Colors';
import { View } from '../Themed';

export const PatternLeft = (props: {
  upperColor?: string;
  middleColor?: string;
  lowerColor?: string;
}) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255,255,255, 0)',
      marginTop: 30,
      marginLeft: -32,
    },
    upperPattern: {
      height: 30,
      width: 200,
      backgroundColor: props.upperColor ? props.upperColor : purple100,
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      marginBottom: 5,
    },
    middlePattern: {
      height: 30,
      width: 220,
      backgroundColor: props.middleColor ? props.middleColor : purple80,
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      marginBottom: 5,
    },
    lowerPattern: {
      height: 30,
      width: 240,
      backgroundColor: props.lowerColor ? props.lowerColor : purple60,
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.upperPattern} />
      <View style={styles.middlePattern} />
      <View style={styles.lowerPattern} />
    </View>
  );
};
