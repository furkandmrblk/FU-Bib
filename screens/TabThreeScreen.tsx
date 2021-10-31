import { useIsFocused } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { crimson80, emerald100, emerald80, white } from '../constants/Colors';
import { getLibrary } from '../utils/valueStore';
import QRCodeIcon from '../assets/images/QRCodeIcon';
import { RootTabScreenProps } from '../types';
import { gql, useMutation, useQuery } from '@apollo/client';
import { QRContainer } from '../components/QR/QRContainer';
import { Formik } from 'formik';
import { QRScanner } from '../components/QR/QRScanner';
import { QRSettingsTop } from '../components/QR/QRSettingsTop';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import deviceStorage from '../providers/deviceStorage';
import { containerStyle, headerTitleStyle } from '../utils/styles';
import { endBooking } from './TabTwoScreen';
import { subtractMinutes } from '../utils/timer';
import { getTable } from './TabOneScreen';
import { refresh } from '../utils/refresh';

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser {
      id
      name
      email
      admin
      major
      booked
      tableIdentifier
      mostUsedLibrary
      mostUsedTable
      reservations
      extensions
      strikes
    }
  }
`;

export const cancelBooking = gql`
  mutation cancelBooking($identifier: String!) {
    cancelBooking(identifier: $identifier) {
      identifier
      userId
      booked
      time
    }
  }
`;

export const extendBooking = gql`
  mutation extendTable {
    extendTable {
      __typename
      ... on Error {
        message
      }
      ... on MutationExtendTableSuccess {
        data {
          identifier
          time
        }
      }
    }
  }
`;

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<'TabThree'>) {
  const { onRefresh, refreshing } = refresh('TabThree');

  const [toggleQR, setToggleQR] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // QR Code Generator Stuff
  const isFocused = useIsFocused();
  const [hasQR, setHasQR] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<string | number | null>(null);
  const [tableIdentifier, setTableIdentifier] = useState<
    string | null | undefined
  >(null);

  const [cancel] = useMutation(cancelBooking, {
    async onCompleted() {
      await deviceStorage.delete('tableIdentifier');
      navigation.reset({ routes: [{ name: 'Root' }] });
    },
  });

  const [extend] = useMutation(extendBooking, {
    onCompleted() {
      navigation.reset({ routes: [{ name: 'TabThree' }] });
    },
  });

  const [leave] = useMutation(endBooking);

  async function userHasQR() {
    const identifier = await deviceStorage.get('tableIdentifier');

    if (identifier) {
      setTableIdentifier(identifier);
      setHasQR(true);
    } else {
      setHasQR(false);
    }
  }

  useEffect(() => {
    if (!toggleQR) {
      getLibrary();
      userHasQR();
    }
  }, [userHasQR, isFocused]);

  // User & Table Data
  const userData = useQuery(getCurrentUser);

  const tableData = useQuery(getTable, {
    variables: {
      identifier: tableIdentifier,
    },
  });

  if (userData.loading || tableData.loading) {
    return (
      <>
        <Header />
        <View
          style={[
            containerStyle.container,
            { justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <ManropeText bold={true}>
            Lädt... Bitte warten Sie einen Moment.
          </ManropeText>
        </View>
      </>
    );
  }

  const user = userData.data.getCurrentUser;

  const userId = user.id;
  const isAdmin = user.admin;
  const isLoading = userData.loading;

  return (
    <>
      <Header />
      {toggleQR && userData.data ? (
        <>
          {isAdmin && (
            <View style={{ flex: 1 }}>
              {/* {hasPermission === null && (
            <ManropeText>FU-Bib Zugriff auf Ihre Kamera erlauben.</ManropeText>
          )}
          {hasPermission === false && (
            <ManropeText>Zugriff auf Kamera abgelehnt.</ManropeText>
          )} */}
              <QRScanner
                toggleQR={toggleQR}
                setToggleQR={setToggleQR}
                hasPermission={hasPermission}
                setHasPermission={setHasPermission}
                isAdmin={isAdmin}
                isLoading={isLoading}
              />
            </View>
          )}
        </>
      ) : (
        <ScrollView
          style={{ backgroundColor: white }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!userData.loading && userData.data && (
            <View style={containerStyle.container}>
              <UpperBody>
                {isAdmin ? (
                  <QRSettingsTop
                    toggleQR={toggleQR}
                    setToggleQR={setToggleQR}
                    setHasPermission={setHasPermission}
                    style={styles.qrTop}
                  />
                ) : null}
                {hasQR && (
                  <ManropeText bold={false} style={headerTitleStyle.title}>
                    Die Platzreservierung war erfolgreich!
                  </ManropeText>
                )}
                {!hasQR && (
                  <ManropeText bold={false} style={headerTitleStyle.title}>
                    Reservieren Sie sich zuerst einen Tisch in einer Bibliothek.
                  </ManropeText>
                )}
              </UpperBody>
              {hasQR ? (
                <QRContainer
                  timerCount={timerCount}
                  setTimerCount={setTimerCount}
                  table={tableData.data.getTable}
                  userId={userId}
                  tableId={tableIdentifier}
                />
              ) : (
                <QRCodeIcon height={500} width={300} />
              )}
              {hasQR && timerCount !== 'Zeit abgelaufen' && (
                <>
                  {tableData.data.getTable.userId ? (
                    <>
                      {new Date().getTime() >=
                      subtractMinutes(tableData!.data.getTable.time, 10) ? (
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Formik
                            initialValues={{}}
                            onSubmit={() => {
                              try {
                                extend();
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            {({ handleSubmit }) => (
                              <Button
                                width="49.5%"
                                onPress={() => handleSubmit()}
                                backgroundColor={emerald80}
                              >
                                <ManropeText
                                  bold={true}
                                  style={{ color: white }}
                                >
                                  Verlängern
                                </ManropeText>
                              </Button>
                            )}
                          </Formik>
                          <Formik
                            initialValues={{}}
                            onSubmit={async () => {
                              try {
                                leave();
                                await deviceStorage.delete('tableIdentifier');
                                navigation.reset({
                                  routes: [{ name: 'Root' }],
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            {({ handleSubmit }) => (
                              <Button
                                width="49.5%"
                                onPress={() => handleSubmit()}
                                backgroundColor={crimson80}
                              >
                                <ManropeText
                                  bold={true}
                                  style={{ color: white }}
                                >
                                  Beenden
                                </ManropeText>
                              </Button>
                            )}
                          </Formik>
                        </View>
                      ) : (
                        <Formik
                          initialValues={{}}
                          onSubmit={async () => {
                            try {
                              leave();
                              await deviceStorage.delete('tableIdentifier');
                              navigation.reset({ routes: [{ name: 'Root' }] });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          {({ handleSubmit }) => (
                            <Button
                              onPress={() => handleSubmit()}
                              backgroundColor={crimson80}
                            >
                              <ManropeText bold={true} style={{ color: white }}>
                                Reservierung Beenden
                              </ManropeText>
                            </Button>
                          )}
                        </Formik>
                      )}
                    </>
                  ) : (
                    <Formik
                      initialValues={{}}
                      onSubmit={() => {
                        try {
                          cancel({
                            variables: {
                              identifier: tableIdentifier,
                            },
                          });
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      {({ handleSubmit }) => (
                        <Button
                          onPress={() => handleSubmit()}
                          backgroundColor={crimson80}
                        >
                          <ManropeText bold={true} style={{ color: white }}>
                            Reservierung Stornieren
                          </ManropeText>
                        </Button>
                      )}
                    </Formik>
                  )}
                </>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  qrTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
  },
});
