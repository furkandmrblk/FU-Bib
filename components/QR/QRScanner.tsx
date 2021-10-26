import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../Themed';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';
import BarcodeMask from 'react-native-barcode-mask';
import { QRSettingsTop } from './QRSettingsTop';
import { gql, useMutation } from '@apollo/client';
import { QRSettingsBottom } from './QRSettingsBottom';
import { qrScannerStyles } from '../../utils/styles';
import { purple100, white } from '../../constants/Colors';

const validateBooking = gql`
  mutation validateBooking($userId: String!, $tableIdentifier: String!) {
    validateBooking(
      input: { userId: $userId, tableIdentifier: $tableIdentifier }
    ) {
      __typename
      ... on BaseError {
        message
      }
      ... on MutationValidateBookingSuccess {
        data {
          id
          identifier
          booked
          userId
          time
        }
      }
    }
  }
`;

type QRScannerProps = {
  isAdmin: boolean;
  isLoading: boolean;
  toggleQR: boolean;
  setToggleQR: React.Dispatch<React.SetStateAction<boolean>>;
  hasPermission: boolean | null;
  setHasPermission: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export const QRScanner = ({
  isAdmin,
  isLoading,
  toggleQR,
  setToggleQR,
  hasPermission,
  setHasPermission,
}: QRScannerProps) => {
  const [scanned, setScanned] = useState<boolean>(false);
  const [type, setType] = useState<any>(BarCodeScanner.Constants.Type.back);
  const [userId, setUserId] = useState<string | null>(null);
  const [tableIdentifier, setTableIdentifier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [validate, _] = useMutation(validateBooking, {
    onCompleted(res) {
      if (res.validateBooking.__typename !== 'BaseError') {
        setError(null);
      } else {
        setError(res.validateBooking.message!);
      }
    },
  });

  const finderWidth: number = 280;
  const finderHeight: number = 230;

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  useEffect(() => {
    if (toggleQR) {
      (async () => {
        if (!isLoading && isAdmin === true) {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }
      })();
    }
  }, []);

  const handleBarCodeScanned = async (scanningResult: BarCodeScannerResult) => {
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
        const qrValue: string[] = data.split(';');
        setUserId(qrValue[0]);
        setTableIdentifier(qrValue[1]);

        if (userId && tableIdentifier !== null) {
          console.log(
            `Bar code with type: '${type}' and data: '${data}' has been scanned.`
          );

          try {
            await validate({
              variables: {
                userId: userId,
                tableIdentifier: tableIdentifier,
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  return (
    <>
      <QRSettingsTop
        toggleQR={toggleQR}
        setToggleQR={setToggleQR}
        setHasPermission={setHasPermission}
      />
      <View style={[qrScannerStyles.scanContainer]}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          type={type}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={[
            StyleSheet.absoluteFillObject,
            { alignItems: 'center', justifyContent: 'flex-end' },
          ]}
        >
          <BarcodeMask
            edgeColor={purple100}
            showAnimatedLine
            animatedLineColor={purple100}
          />
          <TouchableOpacity
            style={[
              qrScannerStyles.iconBackground,
              { height: 47, width: 47, borderRadius: 47 / 2, marginBottom: 15 },
            ]}
            onPress={() => {
              setType(
                type === BarCodeScanner.Constants.Type.back
                  ? BarCodeScanner.Constants.Type.front
                  : BarCodeScanner.Constants.Type.back
              );
            }}
          >
            <MaterialIcons name="flip-camera-android" size={25} color={white} />
          </TouchableOpacity>
        </BarCodeScanner>
      </View>
      <QRSettingsBottom setScanned={setScanned} />
    </>
  );
};
