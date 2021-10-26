import React, { useEffect } from 'react';
import { View } from '../Themed';
import { LinearGradient } from 'expo-linear-gradient';
import {
  black80,
  crimson100,
  peach100,
  purple100,
} from '../../constants/Colors';
import { ManropeText } from '../StyledText';
import { TableProps } from '../../utils/types';
import { textOne } from '../../constants/Fonts';
import QRCode from 'react-native-qrcode-svg';
import { reservationTimer } from '../../utils/timer';
import { bodyContainerStyle } from '../../utils/styles';

interface QRProps {
  tableId: string | null | undefined;
  userId: string | null;
  table: TableProps | null;
  timerCount: string | number | null;
  setTimerCount: React.Dispatch<React.SetStateAction<string | number | null>>;
}

async function abc() {
  // await deviceStorage.delete('tableIdentifier');
  // const test = await deviceStorage.get('tableIdentifier');
  // console.log(test);
}

// abc();

export const QRContainer = ({
  table,
  tableId,
  userId,
  timerCount,
  setTimerCount,
}: QRProps) => {
  useEffect(() => {
    reservationTimer(table!.time, setTimerCount);
  }, [reservationTimer]);

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
        <ManropeText bold={true}>{table!.library?.name}</ManropeText>
        <ManropeText>{table!.library?.adress}</ManropeText>
        <ManropeText>{table!.library?.email}</ManropeText>
        <ManropeText>{table!.library?.website}</ManropeText>
        <ManropeText bold={true}>Tisch: {table!.identifier}</ManropeText>
        <ManropeText style={{ marginBottom: 20 }} bold={true}>
          {table!.floor}
        </ManropeText>
        <QRCode
          value={`${userId};${tableId}`}
          backgroundColor="transparent"
          size={225}
        />

        {timerCount === 'Zeit abgelaufen' ? (
          <ManropeText
            style={{ marginTop: 25, fontSize: textOne, color: crimson100 }}
            bold={true}
          >
            {timerCount}
          </ManropeText>
        ) : (
          <ManropeText
            style={{ marginTop: 25, fontSize: textOne, color: black80 }}
            bold={true}
          >
            {timerCount}
          </ManropeText>
        )}
      </View>
    </LinearGradient>
  );
};
