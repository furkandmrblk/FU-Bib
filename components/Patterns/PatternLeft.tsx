import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  peach100,
  purple100,
  purple60,
  purple80,
} from '../../constants/Colors';
import { View } from '../Themed';
import { LinearGradient } from 'expo-linear-gradient';

export const PatternLeft = (props: {
  left?: boolean;
  one?: boolean;
  two?: boolean;
  three?: boolean;
}) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255,255,255, 0)',
      marginTop: 20,
      marginLeft: props.left ? 0 : -25,
      marginRight: props.left ? (Platform.OS == 'ios' ? -160 : -180) : 0,
    },
    upperPattern: {
      height: 30,
      width: 200,
      backgroundColor: purple100,
      marginBottom: 5,
      marginLeft: props.left ? 40 : 0,
      borderRadius: 5,
    },
    middlePattern: {
      height: 30,
      width: 220,
      backgroundColor: purple80,
      marginBottom: 5,
      marginLeft: props.left ? 20 : 0,
      borderRadius: 5,
    },
    lowerPattern: {
      height: 30,
      width: 240,
      backgroundColor: purple60,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      {props.one && (
        <LinearGradient
          start={[props.left ? 0 : 1, props.left ? 1 : 0]}
          end={[props.left ? 1 : 0, props.left ? 0 : 1]}
          colors={[purple100, peach100]}
          style={styles.upperPattern}
        />
      )}
      {props.two && (
        <LinearGradient
          start={[props.left ? 0 : 1, props.left ? 1 : 0]}
          end={[props.left ? 1 : 0, props.left ? 0 : 1]}
          colors={[purple100, peach100]}
          style={styles.middlePattern}
        />
      )}
      {props.three && (
        <LinearGradient
          start={[props.left ? 0 : 1, props.left ? 1 : 0]}
          end={[props.left ? 1 : 0, props.left ? 0 : 1]}
          colors={[purple100, peach100]}
          style={styles.lowerPattern}
        />
      )}
      {!props.one && !props.two && !props.three && (
        <>
          <LinearGradient
            start={[props.left ? 0 : 1, props.left ? 1 : 0]}
            end={[props.left ? 1 : 0, props.left ? 0 : 1]}
            colors={[purple100, peach100]}
            style={styles.upperPattern}
          />
          <LinearGradient
            start={[props.left ? 0 : 1, props.left ? 1 : 0]}
            end={[props.left ? 1 : 0, props.left ? 0 : 1]}
            colors={[purple100, peach100]}
            style={styles.middlePattern}
          />
          <LinearGradient
            start={[props.left ? 0 : 1, props.left ? 1 : 0]}
            end={[props.left ? 1 : 0, props.left ? 0 : 1]}
            colors={[purple100, peach100]}
            style={styles.lowerPattern}
          />
        </>
      )}
    </View>
  );
};
