import { useMutation, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { Formik } from 'formik';
import { Feather } from '@expo/vector-icons';
import {
  crimson80,
  emerald100,
  peach100,
  purple100,
  purple80,
  white,
} from '../constants/Colors';
import { getCurrentUser } from './TabThreeScreen';
import { gql } from '@apollo/client';
import deviceStorage from '../providers/deviceStorage';
import { RootTabScreenProps } from '../types';
import { Pressable } from 'react-native';
import Input from '../components/Input/Input';
import { useNavigation } from '@react-navigation/core';
import { useIsAuthenticated } from '../providers/Auth';
import {
  bodyContainerStyle,
  bodyTitleStyle,
  containerStyle,
  headerTitleStyle,
} from '../utils/styles';

const signOut = gql`
  mutation signOut {
    signOut
  }
`;

export default function TabFiveScreen() {
  const navigation = useNavigation();
  const [edit, setEdit] = useState<boolean>(false);

  const [logout, _] = useMutation(signOut, {
    async onCompleted() {
      await deviceStorage.delete('session');
      navigation.reset({ routes: [{ name: 'SignIn' }] });
    },
  });

  const userData = useQuery(getCurrentUser);
  if (userData.loading) {
    return (
      <ManropeText>Lädt... Bitte gedulden Sie sich einen Moment.</ManropeText>
    );
  }

  const user = userData.data.getCurrentUser;

  const styles = StyleSheet.create({
    background: {
      alignItems: 'center',
      width: '98%',
      backgroundColor: 'rgba(255,255,255, 0.5)',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 30,
      marginBottom: 5,
    },
    lowerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '98%',
      backgroundColor: 'transparent',
    },
  });

  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          <ManropeText bold={true} style={headerTitleStyle.title}>
            {user.email}
          </ManropeText>
          <PatternLeft one={true} />
        </UpperBody>
        <LinearGradient
          start={[1, 0]}
          end={[0, 1]}
          colors={[purple100, peach100]}
          style={[bodyContainerStyle.wrap, { height: 494 }]}
        >
          <View
            style={[
              bodyContainerStyle.container,
              {
                borderWidth: 0,
                width: '100%',
                marginBottom: 0,
                maxHeight: 490,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 4,
              },
            ]}
          >
            <View style={styles.background}>
              <ManropeText
                style={[headerTitleStyle.title, { marginBottom: 0 }]}
                bold={true}
              >
                Informationen & Statistiken
              </ManropeText>
            </View>
            <View style={[styles.background, { alignItems: 'flex-start' }]}>
              <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                Name
              </ManropeText>
              {edit ? (
                <Input />
              ) : (
                <ManropeText style={{ marginBottom: 10 }}>
                  {user.name ? user.name : 'Nicht angegeben'}
                </ManropeText>
              )}
              <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                Studiengang
              </ManropeText>
              {edit ? (
                <Input />
              ) : (
                <ManropeText style={{ marginBottom: 10 }}>
                  {user.major ? user.major : 'Nicht angegeben'}
                </ManropeText>
              )}
              {!edit && (
                <>
                  <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                    Meist besuchte Bibliothek
                  </ManropeText>
                  <ManropeText style={{ marginBottom: 10 }}>
                    {user.mostUserLibrary
                      ? user.mostUserLibrary
                      : 'Keine Daten verfügbar'}
                  </ManropeText>
                  <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                    Meist genutzter Tisch
                  </ManropeText>
                  <ManropeText style={{ marginBottom: 10 }}>
                    {user.mostUsedTable
                      ? user.mostUsedTable
                      : 'Keine Daten verfügbar'}
                  </ManropeText>
                  <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                    Reservationen:{' '}
                    <ManropeText>{user.reservations}</ManropeText>
                  </ManropeText>
                  <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                    Verlängerungen: <ManropeText>{user.extensions}</ManropeText>
                  </ManropeText>
                  <ManropeText style={bodyTitleStyle.bodyTitle} bold={true}>
                    Strikes: <ManropeText>{user.strikes}</ManropeText>
                  </ManropeText>
                </>
              )}
            </View>
            <View style={styles.lowerContainer}>
              {edit && (
                <Button
                  onPress={() => setEdit(false)}
                  backgroundColor={emerald100}
                >
                  <ManropeText bold={true} style={{ color: white }}>
                    Speichern
                  </ManropeText>
                </Button>
              )}
              {!edit && (
                <>
                  <Pressable
                    onPress={() => setEdit(true)}
                    style={[
                      styles.background,
                      {
                        width: '39.5%',
                        paddingVertical: 14.5,
                        backgroundColor: purple100,
                        marginBottom: 0,
                      },
                    ]}
                  >
                    <Feather name="edit-3" color="#fff" size={20} />
                  </Pressable>
                  <Formik
                    initialValues={{}}
                    onSubmit={() => {
                      try {
                        logout();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Button
                        onPress={() => {
                          handleSubmit();
                        }}
                        backgroundColor={crimson80}
                        width="59.5%"
                      >
                        <ManropeText bold={true} style={{ color: white }}>
                          Logout
                        </ManropeText>
                      </Button>
                    )}
                  </Formik>
                </>
              )}
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}
