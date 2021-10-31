import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  crimson100,
  emerald80,
  gray80,
  grayTransparent,
  peach100,
  peach60,
  purple100,
} from '../../constants/Colors';
import { textThree } from '../../constants/Fonts';
import { LibraryProps, TableProps } from '../../utils/types';
import { ManropeText } from '../StyledText';
import { LinearGradient } from 'expo-linear-gradient';
import { bodyContainerStyle, bodyTitleStyle } from '../../utils/styles';

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

interface LibProps {
  library: LibraryProps | any;
  pickedTable: {
    identifier: string | null;
    background: string;
  };
  setPickedTable: React.Dispatch<
    React.SetStateAction<{ identifier: string | null; background: string }>
  >;
}

export const Library = ({ library, pickedTable, setPickedTable }: LibProps) => {
  const name = library.name;

  const libraryData = useQuery(getLibrary, {
    variables: {
      name: name,
    },
  });
  if (libraryData.loading)
    return (
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={[purple100, peach100]}
        style={bodyContainerStyle.wrap}
      >
        <View
          style={[
            bodyContainerStyle.container,
            {
              borderWidth: 0,
              width: '100%',
              marginBottom: 0,
              maxHeight: 456,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          <ManropeText bold={true}>
            Lädt... Bitte warten Sie einen Moment.
          </ManropeText>
        </View>
      </LinearGradient>
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
      borderRadius: 5,
      borderStyle: 'solid',
      borderWidth: 2,
      fontSize: textThree,
      marginBottom: 5,
      marginRight: 5,
    },
  });

  return (
    <LinearGradient
      start={[1, 0]}
      end={[0, 1]}
      colors={[purple100, peach100]}
      style={bodyContainerStyle.wrap}
    >
      {!libraryData.loading && libraryData.data && (
        <View
          style={[
            bodyContainerStyle.container,
            { width: '100%', marginBottom: 0, maxHeight: 456 },
          ]}
        >
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
                .map((table: TableProps, index: number) => (
                  <View key={index}>
                    {table.floor === 'EG' && (
                      <Pressable
                        onPress={() => {
                          if (!table.booked) {
                            setPickedTable({
                              identifier: table.identifier,
                              background: emerald80,
                            });
                          }
                        }}
                        style={[
                          styles.table,
                          {
                            borderColor: table.booked ? crimson100 : emerald80,
                            backgroundColor: table.booked
                              ? peach60
                              : pickedTable.identifier === table.identifier
                              ? pickedTable.background
                              : gray80,
                          },
                        ]}
                      >
                        <ManropeText>{table.identifier}</ManropeText>
                      </Pressable>
                    )}
                  </View>
                ))}
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
                        <Pressable
                          onPress={() => {
                            if (!table.booked) {
                              setPickedTable({
                                identifier: table.identifier,
                                background: emerald80,
                              });
                            }
                          }}
                          style={[
                            styles.table,
                            {
                              borderColor: table.booked
                                ? crimson100
                                : emerald80,
                              backgroundColor: table.booked
                                ? peach60
                                : pickedTable.identifier === table.identifier
                                ? pickedTable.background
                                : gray80,
                            },
                          ]}
                        >
                          <ManropeText>{table.identifier}</ManropeText>
                        </Pressable>
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
                    <View key={index + 200}>
                      {table.floor === '2.OG' && (
                        <Pressable
                          onPress={() => {
                            if (!table.booked) {
                              setPickedTable({
                                identifier: table.identifier,
                                background: emerald80,
                              });
                            }
                          }}
                          style={[
                            styles.table,
                            {
                              borderColor: table.booked
                                ? crimson100
                                : emerald80,
                              backgroundColor: table.booked
                                ? peach60
                                : pickedTable.identifier === table.identifier
                                ? pickedTable.background
                                : gray80,
                            },
                          ]}
                        >
                          <ManropeText>{table.identifier}</ManropeText>
                        </Pressable>
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
                    <View key={index + 300}>
                      {table.floor === '3.OG' && (
                        <Pressable
                          onPress={() => {
                            if (!table.booked) {
                              setPickedTable({
                                identifier: table.identifier,
                                background: emerald80,
                              });
                            }
                          }}
                          style={[
                            styles.table,
                            {
                              borderColor: table.booked
                                ? crimson100
                                : emerald80,
                              backgroundColor: table.booked
                                ? peach60
                                : pickedTable.identifier === table.identifier
                                ? pickedTable.background
                                : gray80,
                            },
                          ]}
                        >
                          <ManropeText>{table.identifier}</ManropeText>
                        </Pressable>
                      )}
                    </View>
                  )
                )}
            </View>
          </ScrollView>
        </View>
      )}
    </LinearGradient>
  );
};
