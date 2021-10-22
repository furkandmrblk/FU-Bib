import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';
import { titleOne } from '../../constants/Fonts';
import { peach100, purple100 } from '../../constants/Colors';
import { ManropeText } from '../StyledText';
import { LinearGradient } from 'expo-linear-gradient';

export const Logo = () => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 15,
    },
    title: {
      fontSize: titleOne,
      marginBottom: 1,
    },
    logoLine: {
      height: 4,
      width: 90,
      transform: [{ skewX: '-20deg' }],
      backgroundColor: purple100,
    },
  });

  return (
    <View style={styles.container}>
      <ManropeText bold={true} style={styles.title}>
        FU Bib
      </ManropeText>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={[purple100, peach100]}
        style={styles.logoLine}
      />
    </View>
  );
};
