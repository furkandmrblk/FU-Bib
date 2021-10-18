import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import { titleOne } from '../../constants/Fonts';
import { purple100 } from '../../constants/Colors';
import { ManropeText } from '../StyledText';

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
      <View style={styles.logoLine} />
    </View>
  );
};
