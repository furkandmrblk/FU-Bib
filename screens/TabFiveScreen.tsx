import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { black100, white } from '../constants/Colors';
import { subtitleThree, textTwo } from '../constants/Fonts';
import { containerStyle, headerTitleStyle } from './TabOneScreen';

export default function TabFiveScreen() {
  const email: string = 'ibrahimfud00@zedat.fu-berlin.de';

  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          <ManropeText bold={true} style={headerTitleStyle.title}>
            {email}
          </ManropeText>
          <PatternLeft />
        </UpperBody>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: white,
    fontSize: subtitleThree,
    marginBottom: 5,
  },
  text: {
    color: white,
    fontSize: textTwo,
    marginBottom: 7.5,
  },
  statistics: {
    color: white,
    fontSize: textTwo,
    marginLeft: 10,
    marginBottom: 5,
  },
});
