import { useIsFocused } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { bodyContainerStyle } from '../components/Libraries/Library';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { purple100, white } from '../constants/Colors';
import { getLibrary } from '../utils/valueStore';
import { containerStyle, headerTitleStyle } from './TabOneScreen';
import QRCodeIcon from '../assets/images/QRCodeIcon';

const hasQR: boolean = false;

export default function TabThreeScreen() {
  const isFocused = useIsFocused();

  useEffect(() => {
    getLibrary;
  }, [isFocused]);

  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          {hasQR ? (
            <ManropeText style={headerTitleStyle.title}>
              Erfolgreich einen Platz im{' '}
              <ManropeText bold={true} style={headerTitleStyle.title}>
                {getLibrary()?.name}
              </ManropeText>{' '}
              gebucht!
            </ManropeText>
          ) : (
            <ManropeText bold={false} style={headerTitleStyle.title}>
              Reservieren Sie sich zunächst einen Tisch in einer Bibliothek.
            </ManropeText>
          )}
        </UpperBody>
        {hasQR ? (
          <View
            style={[
              bodyContainerStyle.container,
              {
                alignItems: hasQR ? 'flex-start' : 'center',
                justifyContent: hasQR ? 'flex-start' : 'center',
              },
            ]}
          ></View>
        ) : (
          <QRCodeIcon height={500} width={300} />
        )}
        {hasQR && (
          <Button backgroundColor={purple100}>
            <ManropeText bold={true} style={{ color: white }}>
              Verlängern
            </ManropeText>
          </Button>
        )}
      </View>
    </>
  );
}
