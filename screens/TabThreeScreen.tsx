import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import {
  crimson80,
  grayTransparent,
  purple100,
  white,
} from '../constants/Colors';
import { getIdentifier, getLibrary } from '../utils/valueStore';
import { containerStyle, headerTitleStyle } from './TabOneScreen';
import QRCodeIcon from '../assets/images/QRCodeIcon';
import { RootTabScreenProps } from '../types';
import { gql, useMutation, useQuery } from '@apollo/client';
import { QRContainer } from '../components/QR/QRContainer';
import { Formik } from 'formik';
import deviceStorage from '../providers/deviceStorage';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BarcodeMask from 'react-native-barcode-mask';
import { MaterialIcons } from '@expo/vector-icons';
import { Toggle } from '../components/Switch/Switch';

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

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<'TabThree'>) {
  const [toggleQR, setToggleQR] = useState<boolean>(true);

  // QR Code Scanner Stuff
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);

  const finderWidth: number = 280;
  const finderHeight: number = 280;

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  // QR Code Generator Stuff
  const isFocused = useIsFocused();
  const [hasQR, setHasQR] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<string | number | null>(null);
  const [tableIdentifier, setTableIdentifier] = useState<
    string | null | undefined
  >(null);

  const [cancel, _] = useMutation(cancelBooking, {
    async onCompleted(res) {
      await deviceStorage.delete('tableIdentifier');
      navigation.reset({ routes: [{ name: 'TabThree' }] });
    },
  });

  async function userHasQR() {
    const identifier = await getIdentifier();

    if (identifier !== null) {
      setTableIdentifier(identifier);
      setHasQR(true);
    } else setHasQR(false);

    return hasQR;
  }

  // User & Table Data
  const tableData = useQuery(getTable, {
    variables: {
      identifier: tableIdentifier,
    },
  });
  const userData = useQuery(getCurrentUser);

  // QR Code Scanner & State Management Stuff
  useEffect(() => {
    if (!toggleQR) {
      getLibrary;
      userHasQR();
    }
    if (toggleQR) {
      (async () => {
        if (!userData.loading && userData.data.getCurrentUser.admin === true) {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
      })();
    }
  }, [isFocused, userHasQR, getLibrary]);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      const { x, y }: any = origin;
      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);
        console.log(
          `Bar code with type: '${type}' and data: '${data}' has been scanned.`
        );
      }
    }
  };

  // Loader
  if (tableData.loading || userData.loading) {
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

  const userId = userData.data.getCurrentUser.id;
  const isAdmin = userData.data.getCurrentUser.admin;

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
              <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                type={type}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={[
                  StyleSheet.absoluteFillObject,
                  qrScannerStyles.scanContainer,
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 25,
                    paddingTop: 5,
                    paddingBottom: 10,
                  }}
                >
                  <View style={[qrScannerStyles.settings]}>
                    <Toggle toggle={toggleQR} setToggle={setToggleQR} />
                    <TouchableOpacity
                      style={[
                        qrScannerStyles.iconBackground,
                        {
                          marginLeft: 10,
                        },
                      ]}
                      onPress={async () => {
                        // isn't working rn
                        const { status } =
                          await BarCodeScanner.requestPermissionsAsync();
                        setHasPermission(status === 'granted');
                      }}
                    >
                      <MaterialIcons
                        name="admin-panel-settings"
                        size={25}
                        color={white}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[
                      qrScannerStyles.iconBackground,
                      { height: 47, width: 47, borderRadius: 47 / 2 },
                    ]}
                    onPress={() => {
                      setType(
                        type === BarCodeScanner.Constants.Type.back
                          ? BarCodeScanner.Constants.Type.front
                          : BarCodeScanner.Constants.Type.back
                      );
                    }}
                  >
                    <MaterialIcons
                      name="flip-camera-android"
                      size={25}
                      color={white}
                    />
                  </TouchableOpacity>
                </View>
                <BarcodeMask
                  edgeColor={purple100}
                  showAnimatedLine
                  animatedLineColor={purple100}
                />

                <Button
                  scanButton={true}
                  backgroundColor={purple100}
                  onPress={() => setScanned(false)}
                >
                  <ManropeText bold={true} style={{ color: white }}>
                    Erneut Scannen
                  </ManropeText>
                </Button>
              </BarCodeScanner>
            </View>
          )}
        </>
      ) : (
        <View style={containerStyle.container}>
          <UpperBody>
            {hasQR ? (
              <ManropeText style={headerTitleStyle.title}>
                Erfolgreich einen Platz im
                <ManropeText bold={true} style={headerTitleStyle.title}>
                  {getLibrary()?.name}
                </ManropeText>
                gebucht!
              </ManropeText>
            ) : (
              <>
                {isAdmin && (
                  <View
                    style={[
                      qrScannerStyles.settings,
                      {
                        marginTop: -12.5,
                      },
                    ]}
                  >
                    <Toggle toggle={toggleQR} setToggle={setToggleQR} />
                    <TouchableOpacity
                      style={[
                        qrScannerStyles.iconBackground,
                        {
                          marginLeft: 10,
                        },
                      ]}
                      onPress={() => {}}
                    >
                      <MaterialIcons
                        name="admin-panel-settings"
                        size={25}
                        color={white}
                      />
                    </TouchableOpacity>
                  </View>
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
        </View>
      )}
    </>
  );
}

const qrScannerStyles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settings: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  iconBackground: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: grayTransparent,
  },
});
