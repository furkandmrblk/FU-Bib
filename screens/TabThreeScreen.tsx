import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { black100, white } from '../constants/Colors';
import { subtitleThree, textOne, textTwo } from '../constants/Fonts';
import { getLibrary } from '../utils/valueStore';

const hasQR: boolean = false;

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        {hasQR ? (
          <ManropeText style={styles.title}>
            Erfolgreich einen Platz im{' '}
            <ManropeText bold={true} style={styles.title}>
              {getLibrary()?.name}
            </ManropeText>{' '}
            gebucht!
          </ManropeText>
        ) : (
          <ManropeText bold={false} style={styles.title}>
            Reservieren Sie sich zunächst einen Tisch in einer Bibliothek.
          </ManropeText>
        )}
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
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: white,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  title: {
    color: black100,
    fontSize: subtitleThree,
  },
  subtext: {
    fontSize: textOne,
  },
  bodyTitle: {
    color: black100,
    fontSize: subtitleThree,

    textAlign: 'center',
  },
  bodySubtitle: {
    color: black100,
    fontSize: textTwo,
    textAlign: 'center',
  },
  bodyTableId: {
    color: black100,
    fontSize: textTwo,
    textAlign: 'center',
    marginTop: 10,
  },
});
