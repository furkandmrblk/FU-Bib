import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { black100 } from '../constants/Colors';
import { subtitleThree } from '../constants/Fonts';

export default function TabFourScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText bold={true} style={styles.title}>
          Neuigkeiten
        </ManropeText>
      </UpperBody>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS == 'ios' ? 40 : 25,
    overflow: 'visible',
  },
  title: {
    color: black100,
    fontSize: subtitleThree,
  },
});
