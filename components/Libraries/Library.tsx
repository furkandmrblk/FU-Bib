import { gql, useQuery } from '@apollo/client';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  crimson100,
  emerald80,
  gray80,
  grayTransparent,
  purple100,
} from '../../constants/Colors';
import { textThree, textTwo } from '../../constants/Fonts';
import { bodySubtitleStyle, bodyTitleStyle } from '../../screens/TabOneScreen';
import { RootStackParamList, RootTabParamList } from '../../types';
import { LibraryProps } from '../../utils/types';
import Button from '../Button/Button';
import { ManropeText } from '../StyledText';

const getLibrary = gql`
  query getLibrary($name: String!) {
    getLibrary(name: $name) {
      id
      section
      name
      adress
      floor
      email
      website
      table {
        id
        identifier
        order
        floor
        booked
        time
      }
    }
  }
`;

export const Library = (library: LibraryProps | any) => {
  const navigation = useNavigation();

  const name = library.library.name;

  const libraryData = useQuery(getLibrary, {
    variables: {
      name: name,
    },
  });
  if (libraryData.loading)
    return (
      <View
        style={[
          bodyContainerStyle.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ManropeText bold={true}>Loading... Please wait a moment.</ManropeText>
      </View>
    );

  const currentLibrary: LibraryProps = libraryData.data.getLibrary;

  const styles = StyleSheet.create({
    tableContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
    },
    table: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 25,
      width: 60,
      backgroundColor: gray80,
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 2,
      fontSize: textThree,
      marginBottom: 5,
      marginRight: 5,
    },
  });

  return (
    <View style={bodyContainerStyle.container}>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          paddingLeft: 15,
          paddingRight: Platform.OS === 'ios' ? 5 : 20,
        }}
      >
        {/* ERDGESCHOSS */}
        {currentLibrary.floor!.includes('EG') && (
          <ManropeText bold={true} style={bodyTitleStyle.bodyTitle}>
            Erdgeschoss :
          </ManropeText>
        )}
        <View style={styles.tableContainer}>
          {currentLibrary
            .table!.slice()
            .sort((a, b) => a.order - b.order)
            .map(
              (
                table: {
                  id: string;
                  booked: boolean;
                  floor: string;
                  identifier: string;
                },
                index: number
              ) => (
                <View key={index}>
                  {table.floor === 'EG' && (
                    <View
                      style={[
                        styles.table,
                        { borderColor: table.booked ? crimson100 : emerald80 },
                      ]}
                    >
                      <ManropeText
                        onPress={() => {
                          if (!table.booked) {
                            // Create QR Code with userId
                            navigation.navigate('Root', { screen: 'TabThree' });
                          }
                        }}
                      >
                        {table.identifier}
                      </ManropeText>
                    </View>
                  )}
                </View>
              )
            )}
        </View>
        {/* 1. OBERGESCHOSS */}
        {currentLibrary.floor!.includes('1.OG') && (
          <ManropeText
            bold={true}
            style={[bodyTitleStyle.bodyTitle, { marginTop: 10 }]}
          >
            1. Obergeschoss :
          </ManropeText>
        )}
        <View style={styles.tableContainer}>
          {currentLibrary
            .table!.slice()
            .sort((a, b) => a.order - b.order)
            .map(
              (
                table: {
                  id: string;
                  booked: boolean;
                  floor: string;
                  identifier: string;
                },
                index: number
              ) => (
                <View key={index + 100}>
                  {table.floor === '1.OG' && (
                    <View
                      key={index + 100}
                      style={[
                        styles.table,
                        { borderColor: table.booked ? crimson100 : emerald80 },
                      ]}
                    >
                      <ManropeText
                        onPress={() => {
                          if (!table.booked) {
                            // Create QR Code with userId
                            navigation.navigate('Root', { screen: 'TabThree' });
                          }
                        }}
                      >
                        {table.identifier}
                      </ManropeText>
                    </View>
                  )}
                </View>
              )
            )}
        </View>
        {/* 2. OBERGESCHOSS */}
        {currentLibrary.floor!.includes('2.OG') && (
          <ManropeText
            bold={true}
            style={[bodyTitleStyle.bodyTitle, { marginTop: 10 }]}
          >
            2. Obergeschoss :
          </ManropeText>
        )}
        <View style={styles.tableContainer}>
          {currentLibrary
            .table!.slice()
            .sort((a, b) => a.order - b.order)
            .map(
              (
                table: {
                  id: string;
                  booked: boolean;
                  floor: string;
                  identifier: string;
                },
                index: number
              ) => (
                <View key={index + 100}>
                  {table.floor === '2.OG' && (
                    <View
                      key={index + 100}
                      style={[
                        styles.table,
                        { borderColor: table.booked ? crimson100 : emerald80 },
                      ]}
                    >
                      <ManropeText
                        onPress={() => {
                          if (!table.booked) {
                            // Create QR Code with userId
                            navigation.navigate('Root', { screen: 'TabThree' });
                          }
                        }}
                      >
                        {table.identifier}
                      </ManropeText>
                    </View>
                  )}
                </View>
              )
            )}
        </View>
        {/* 3. OBERGESCHOSS */}
        {currentLibrary.floor!.includes('3.OG') && (
          <ManropeText
            bold={true}
            style={[bodyTitleStyle.bodyTitle, { marginTop: 10 }]}
          >
            3. Obergeschoss :
          </ManropeText>
        )}
        <View style={styles.tableContainer}>
          {currentLibrary
            .table!.slice()
            .sort((a, b) => a.order - b.order)
            .map(
              (
                table: {
                  id: string;
                  booked: boolean;
                  floor: string;
                  identifier: string;
                },
                index: number
              ) => (
                <View key={index + 200}>
                  {table.floor === '3.OG' && (
                    <View
                      key={index + 200}
                      style={[
                        styles.table,
                        { borderColor: table.booked ? crimson100 : emerald80 },
                      ]}
                    >
                      <ManropeText
                        onPress={() => {
                          if (!table.booked) {
                            // Create QR Code with userId
                            navigation.navigate('Root', { screen: 'TabThree' });
                          }
                        }}
                      >
                        {table.identifier}
                      </ManropeText>
                    </View>
                  )}
                </View>
              )
            )}
        </View>
      </ScrollView>
    </View>
  );
};

export const bodyContainerStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    maxHeight: 470,
    backgroundColor: grayTransparent,
    borderRadius: 5,
    borderColor: purple100,
    borderStyle: 'solid',
    borderWidth: 2,
    paddingVertical: 10,
    marginBottom: 12.5,
    overflow: 'hidden',
  },
});
