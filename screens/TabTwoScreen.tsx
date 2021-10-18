import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { Library } from '../components/Libraries/Library';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { black100, gray80, purple100, white } from '../constants/Colors';
import { subtitleThree } from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import { getLibrary } from '../utils/valueStore';
import ChooseLibIcon2 from '../assets/images/ChooseLibIcon2';
import Button from '../components/Button/Button';
import { containerStyle, headerTitleStyle } from './TabOneScreen';

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const isFocused = useIsFocused();

  useEffect(() => {
    getLibrary;
  }, [isFocused]);

  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          {getLibrary() !== undefined ? (
            <ManropeText style={headerTitleStyle.title}>
              Wählen Sie sich einen Tisch im{' '}
              <ManropeText bold={true}>{getLibrary()?.name}</ManropeText> aus.
            </ManropeText>
          ) : (
            <ManropeText style={headerTitleStyle.title}>
              Bitte wählen Sie{' '}
              <ManropeText
                onPress={() => navigation.navigate('TabOne')}
                style={{ textDecorationLine: 'underline' }}
                bold={true}
              >
                hier
              </ManropeText>{' '}
              zunächst eine Bibliothek aus.
            </ManropeText>
          )}
        </UpperBody>
        {getLibrary() !== undefined && (
          <>
            <Library library={getLibrary()} />
            <Button backgroundColor={purple100}>
              <ManropeText bold={true} style={{ color: white }}>
                Reservieren
              </ManropeText>
            </Button>
          </>
        )}

        {!getLibrary() && <ChooseLibIcon2 height={500} width={250} />}
      </View>
    </>
  );
}
