import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { peach100, purple100, purple80 } from '../../constants/Colors';
import { Logo } from '../Logo/Logo';
import { View } from '../Themed';
import { LinearGradient } from 'expo-linear-gradient';

export const Header = () => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: Platform.OS == 'ios' ? 40 : 25,
    },
    patternWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    upperPattern: {
      height: 25,
      width: 163,
      backgroundColor: purple100,
      borderRadius: 5,
      marginRight: -5,
    },
    lowerPattern: {
      height: 30,
      width: 143,
      backgroundColor: purple80,
      borderRadius: 5,
      marginTop: 5,
      marginRight: -5,
    },
  });

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.patternWrapper}>
        <LinearGradient
          start={[1, 0]}
          end={[0, 1]}
          colors={[purple100, peach100]}
          style={styles.upperPattern}
        />
        <LinearGradient
          start={[1, 0]}
          end={[0, 1]}
          colors={[purple100, peach100]}
          style={styles.lowerPattern}
        />
      </View>
    </View>
  );
};
