import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { containerStyle, headerTitleStyle } from '../utils/styles';

export default function TabFourScreen() {
  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          <ManropeText bold={true} style={headerTitleStyle.title}>
            Neuigkeiten
          </ManropeText>
        </UpperBody>
      </View>
    </>
  );
}
