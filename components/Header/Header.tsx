import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { peach100, peach80, purple100, purple80 } from '../../constants/Colors';
import { Logo } from '../Logo/Logo';
import { View } from '../Themed';

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
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    lowerPattern: {
      height: 30,
      width: 143,
      backgroundColor: purple80,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.patternWrapper}>
        <View style={styles.upperPattern} />
        <View style={styles.lowerPattern} />
      </View>
    </View>
  );
};
