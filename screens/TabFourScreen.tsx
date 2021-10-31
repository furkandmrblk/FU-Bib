import React from 'react';
import { Platform, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { white } from '../constants/Colors';
import { refresh } from '../utils/refresh';
import { containerStyle, headerTitleStyle } from '../utils/styles';

export default function TabFourScreen() {
  const { onRefresh, refreshing } = refresh('TabFour');

  return (
    <>
      <Header />
      <ScrollView
        style={{ backgroundColor: white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={containerStyle.container}>
          <UpperBody>
            <ManropeText bold={true} style={headerTitleStyle.title}>
              Neuigkeiten
            </ManropeText>
          </UpperBody>
        </View>
      </ScrollView>
    </>
  );
}
