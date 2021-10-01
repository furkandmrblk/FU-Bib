import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { MiddleBody } from '../components/Body/MiddleBody';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import {
  black100,
  purple100,
  purple60,
  purple80,
  white,
} from '../constants/Colors';
import {
  subtitleThree,
  subtitleTwo,
  subtitleWeight,
  textTwo,
} from '../constants/Fonts';

export default function TabFourScreen() {
  const email: string = 'ibrahimfud00@zedat.fu-berlin.de';

  return (
    <View style={styles.container}>
      <Header
        upperColor={purple100}
        lowerColor={purple80}
        logoColor={purple100}
      />
      <UpperBody>
        <ManropeText bold={true} style={styles.title}>
          {email}
        </ManropeText>
        <PatternLeft />
      </UpperBody>
      <MiddleBody
        infoPage={true}
        firstLayerColor={purple60}
        secondLayerColor={purple80}
        thirdLayerColor={purple100}
      >
        <ManropeText bold={true} style={styles.label}>
          Name
        </ManropeText>
        <ManropeText style={styles.text}>Ibrahim Furkan Demirbilek</ManropeText>
        <ManropeText bold={true} style={styles.label}>
          Studiengang
        </ManropeText>
        <ManropeText style={styles.text}>Betriebswirtschaftslehre</ManropeText>
        <ManropeText bold={true} style={styles.label}>
          Statistiken
        </ManropeText>
        <ManropeText bold={true} style={styles.statistics}>
          Meist besuchte Bibliothek
        </ManropeText>
        <ManropeText style={styles.statistics}>Campusbibliothek</ManropeText>
        <ManropeText bold={true} style={styles.statistics}>
          Meist genutzter Tisch
        </ManropeText>
        <ManropeText style={styles.statistics}>11B00</ManropeText>
        <ManropeText bold={true} style={styles.statistics}>
          Reservierungen
        </ManropeText>
        <ManropeText style={styles.statistics}>18</ManropeText>
        <ManropeText bold={true} style={styles.statistics}>
          Verlängerungen
        </ManropeText>
        <ManropeText style={styles.statistics}>29</ManropeText>
      </MiddleBody>
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
    fontWeight: subtitleWeight,
  },
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
