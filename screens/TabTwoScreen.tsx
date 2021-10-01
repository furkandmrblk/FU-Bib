import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { MiddleBody } from '../components/Body/MiddleBody';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button/Button';
import {
  black100,
  emerald100,
  emerald60,
  emerald80,
  white,
} from '../constants/Colors';
import {
  subtitleThree,
  subtitleWeight,
  textOne,
  textTwo,
  textWeight,
} from '../constants/Fonts';
import { getLibrary } from '../utils/valueStore';

const hasQR: boolean = false;

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Header
        upperColor={emerald100}
        lowerColor={emerald80}
        logoColor={emerald100}
      />
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
      <MiddleBody
        firstLayerColor={emerald60}
        secondLayerColor={emerald80}
        thirdLayerColor={emerald100}
      >
        <View style={styles.innerContainer}>
          {getLibrary() !== undefined && hasQR && (
            <>
              <ManropeText bold={true} style={styles.bodyTitle}>
                {getLibrary()?.name}
              </ManropeText>
              <ManropeText style={styles.bodySubtitle}>
                {getLibrary()?.address}
              </ManropeText>
              {getLibrary()?.secondAddress && (
                <ManropeText style={styles.bodySubtitle}>
                  {getLibrary()?.secondAddress}
                </ManropeText>
              )}
              <ManropeText style={styles.bodySubtitle}>
                {getLibrary()?.email}
              </ManropeText>
              {getLibrary()?.secondEmail && (
                <ManropeText style={styles.bodySubtitle}>
                  {getLibrary()?.secondEmail}
                </ManropeText>
              )}
              <ManropeText bold={true} style={styles.bodyTableId}>
                Tisch Nr.: 107
              </ManropeText>
            </>
          )}
          {!hasQR && (
            <>
              <ManropeText bold={true} style={styles.bodyTitle}>
                Derzeit haben Sie keinen Platz reserviert.
              </ManropeText>
              <ManropeText style={styles.bodySubtitle}>
                Um einen QR Code zu generieren, müssen Sie sich einen Platz
                buchen.
              </ManropeText>
              <MaterialIcons
                style={{ opacity: 0.25, marginTop: -10 }}
                name="qr-code-2"
                size={325}
              />
            </>
          )}
        </View>

        <Button backgroundColor={white}>
          <ManropeText
            bold={true}
            style={{
              color: black100,
              fontSize: textTwo,
              fontWeight: 'bold',
            }}
          >
            Reservierung Verlängern
          </ManropeText>
        </Button>
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
    fontWeight: subtitleWeight,
  },
  subtext: {
    fontSize: textOne,
    fontWeight: textWeight,
  },
  bodyTitle: {
    color: black100,
    fontSize: subtitleThree,
    fontWeight: subtitleWeight,
    textAlign: 'center',
  },
  bodySubtitle: {
    color: black100,
    fontSize: textTwo,
    fontWeight: textWeight,
    textAlign: 'center',
  },
  bodyTableId: {
    color: black100,
    fontSize: textTwo,
    fontWeight: textWeight,
    textAlign: 'center',
    marginTop: 10,
  },
});
