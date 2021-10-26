import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { crimson80, white } from '../constants/Colors';
import { getLibrary } from '../utils/valueStore';
import QRCodeIcon from '../assets/images/QRCodeIcon';
import { RootTabScreenProps } from '../types';
import { gql, useMutation, useQuery } from '@apollo/client';
import { QRContainer } from '../components/QR/QRContainer';
import { Formik } from 'formik';
import { QRScanner } from '../components/QR/QRScanner';
import { QRSettingsTop } from '../components/QR/QRSettingsTop';
import { StyleSheet } from 'react-native';
import deviceStorage from '../providers/deviceStorage';
import { containerStyle, headerTitleStyle } from '../utils/styles';

const getTable = gql`
  query getTable($identifier: String!) {
    getTable(identifier: $identifier) {
      id
      identifier
      library {
        name
        adress
        email
        website
      }
      floor
      userId
      time
    }
  }
`;

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

export const endBooking = gql`
  mutation endBooking {
    endBooking {
      id
      identifier
      userId
      booked
      time
    }
  }
`;

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<'TabThree'>) {
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
    async onCompleted(res) {
      await deviceStorage.delete('tableIdentifier');
      navigation.reset({ routes: [{ name: 'TabThree' }] });
    },
  });

  const [leave] = useMutation(endBooking, {
    async onCompleted(res) {
      await deviceStorage.delete('tableIdentifier');
      navigation.reset({ routes: [{ name: 'TabThree' }] });
    },
  });

  async function userHasQR() {
    const identifier = await deviceStorage.get('tableIdentifier');

    if (identifier !== null) {
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
  }, [userHasQR, getLibrary]);

  // User & Table Data
  const userData = useQuery(getCurrentUser);
  const tableData = useQuery(getTable, {
    variables: {
      identifier: tableIdentifier,
    },
  });

  if (userData.loading || tableData.loading) {
    return (
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
    );
  }

  const user = userData.data.getCurrentUser;

  const userId = user.id;
  const isAdmin = user.admin;
  const isLoading = userData.loading;

  return (
    <>
      <Header />
      {toggleQR ? (
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
        <View style={containerStyle.container}>
          <UpperBody>
            {hasQR && isAdmin ? (
              <QRSettingsTop
                toggleQR={toggleQR}
                setToggleQR={setToggleQR}
                setHasPermission={setHasPermission}
                style={styles.qrTop}
              />
            ) : (
              <>
                {isAdmin && (
                  <QRSettingsTop
                    toggleQR={toggleQR}
                    setToggleQR={setToggleQR}
                    setHasPermission={setHasPermission}
                    style={styles.qrTop}
                  />
                )}
                <ManropeText bold={false} style={headerTitleStyle.title}>
                  Reservieren Sie sich zuerst einen Tisch in einer Bibliothek.
                </ManropeText>
              </>
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
              {tableData.data.getTable.userId !== null ? (
                <Formik
                  initialValues={{}}
                  onSubmit={() => {
                    try {
                      leave();
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
