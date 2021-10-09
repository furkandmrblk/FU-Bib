import React from 'react';
import { StyleSheet } from 'react-native';
import { purple100, purple60, purple80 } from '../../constants/Colors';
import { View } from '../Themed';

export const PatternLeft = (props: { left?: boolean }) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255,255,255, 0)',
      marginTop: 20,
      marginLeft: props.left ? 0 : -32,
      marginRight: props.left ? -150 : 0,
    },
    upperPattern: {
      height: 30,
      width: 200,
      backgroundColor: purple100,
      borderBottomRightRadius: props.left ? 0 : 5,
      borderTopRightRadius: props.left ? 0 : 5,
      borderBottomLeftRadius: props.left ? 5 : 0,
      borderTopLeftRadius: props.left ? 5 : 0,
      marginBottom: 5,
      marginLeft: props.left ? 40 : 0,
    },
    middlePattern: {
      height: 30,
      width: 220,
      backgroundColor: purple80,
      borderBottomRightRadius: props.left ? 0 : 5,
      borderTopRightRadius: props.left ? 0 : 5,
      borderBottomLeftRadius: props.left ? 5 : 0,
      borderTopLeftRadius: props.left ? 5 : 0,
      marginBottom: 5,
      marginLeft: props.left ? 20 : 0,
    },
    lowerPattern: {
      height: 30,
      width: 240,
      backgroundColor: purple60,
      borderBottomRightRadius: props.left ? 0 : 5,
      borderTopRightRadius: props.left ? 0 : 5,
      borderBottomLeftRadius: props.left ? 5 : 0,
      borderTopLeftRadius: props.left ? 5 : 0,
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
