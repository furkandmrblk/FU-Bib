import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import { titleOne, titleWeight } from '../../constants/Fonts';
import { peach100, purple100 } from '../../constants/Colors';

type LogoProps = {
  color?: string;
};

export const Logo = () => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 32,
    },
    title: {
      fontSize: titleOne,
      fontWeight: titleWeight,
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
      <Text style={styles.title}>FU Bib</Text>
      <View style={styles.logoLine} />
    </View>
  );
};
