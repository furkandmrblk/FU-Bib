import React, { useEffect, useState } from 'react';
import { View } from '../Themed';
import { LinearGradient } from 'expo-linear-gradient';
import {
  black80,
  crimson100,
  emerald100,
  emerald80,
  peach100,
  purple100,
} from '../../constants/Colors';
import { ManropeText } from '../StyledText';
import { TableProps } from '../../utils/types';
import { textOne, textThree } from '../../constants/Fonts';
import QRCode from 'react-native-qrcode-svg';
import { useTimer } from '../../utils/timer';
import {
  bodyContainerStyle,
  validatedContainerStyle,
} from '../../utils/styles';
import { gql, useMutation } from '@apollo/client';
import deviceStorage from '../../providers/deviceStorage';
import { useNavigation } from '@react-navigation/core';
import { endBooking } from '../../screens/TabTwoScreen';
import ValidatedIcon from '../../assets/images/ValidatedIcon';

interface QRProps {
  tableId: string | null | undefined;
  userId: string | null;
  table: TableProps | null;
  timerCount: string | number | null;
  setTimerCount: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const strikeUser = gql`
  mutation strikeUser {
    strikeUser {
      id
      strikes
    }
  }
`;

export const QRContainer = ({
  table,
  tableId,
  userId,
  timerCount,
  setTimerCount,
}: QRProps) => {
  const navigation = useNavigation();
  const [warnUser, setWarnUser] = useState<string | null>(null);
  const [strike] = useMutation(strikeUser);
  const [leave] = useMutation(endBooking);

  const now = new Date().getTime();

  useTimer(table!.time, setTimerCount);

  useEffect(() => {
    // BESSERES STATE MANAGEMENT
    if (now >= table!.time && table!.extendedTime === false) {
      setWarnUser(
        'Sie haben einen Strike erhalten, da Sie nicht zur Bibliothek erschienen sind. Bei insgesamt 3 Strikes wird Ihr Account gesperrt.'
      );

      setTimeout(async () => {
        strike();
        await deviceStorage.delete('tableIdentifier');
      }, 5000);
    }
    if (now >= table!.time && table!.extendedTime === true) {
      setTimeout(async () => {
        leave();
        await deviceStorage.delete('tableIdentifier');
      }, 5000);
    }
  }, [now]);

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
        {table!.extendedTime && table!.userId !== null ? (
          <View style={validatedContainerStyle.container}>
            <ManropeText
              style={{
                color: emerald100,
                textAlign: 'center',
                marginBottom: 30,
              }}
              bold={true}
            >
              Deine Reservierung wurde erfolgreich validiert. Viel Erfolg beim
              lernen!
            </ManropeText>
            <ValidatedIcon height={100} width={160} />
          </View>
        ) : (
          <>
            {userId !== null || tableId !== null ? (
              <QRCode
                value={`${userId};${tableId}`}
                backgroundColor="transparent"
                size={225}
              />
            ) : null}
          </>
        )}

        {timerCount === 'Zeit abgelaufen' ? (
          <>
            <ManropeText
              style={{ marginTop: 10, fontSize: textOne, color: crimson100 }}
              bold={true}
            >
              {timerCount}
            </ManropeText>
            {warnUser && (
              <ManropeText
                style={{
                  marginTop: 5,
                  fontSize: textThree,
                  textAlign: 'center',
                  color: crimson100,
                  maxWidth: 275,
                }}
                bold={true}
              >
                {warnUser}
              </ManropeText>
            )}
          </>
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
