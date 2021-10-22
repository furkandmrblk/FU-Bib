import { useIsFocused } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { white } from '../constants/Colors';
import { getIdentifier, getLibrary } from '../utils/valueStore';
import { containerStyle, headerTitleStyle } from './TabOneScreen';
import QRCodeIcon from '../assets/images/QRCodeIcon';
import { RootTabScreenProps } from '../types';
import { gql, useQuery } from '@apollo/client';
import { QRContainer } from '../components/QR/QRContainer';

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

export default function TabThreeScreen({
  navigation,
}: RootTabScreenProps<'TabThree'>) {
  const isFocused = useIsFocused();
  const [hasQR, setHasQR] = useState<boolean>(false);
  const [tableIdentifier, setTableIdentifier] = useState<
    string | null | undefined
  >(null);

  async function userHasQR() {
    const identifier = await getIdentifier();

    if (identifier !== null) {
      setTableIdentifier(identifier);
      setHasQR(true);
    } else setHasQR(false);

    return hasQR;
  }

  useEffect(() => {
    getLibrary;
    userHasQR();
  }, [isFocused, hasQR]);

  const tableData = useQuery(getTable, {
    variables: {
      identifier: tableIdentifier,
    },
  });
  const userData = useQuery(getCurrentUser);

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

  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          {hasQR ? (
            <ManropeText style={headerTitleStyle.title}>
              Erfolgreich einen Platz im{' '}
              <ManropeText bold={true} style={headerTitleStyle.title}>
                {getLibrary()?.name}
              </ManropeText>{' '}
              gebucht!
            </ManropeText>
          ) : (
            <ManropeText bold={false} style={headerTitleStyle.title}>
              Reservieren Sie sich zuerst einen Tisch in einer Bibliothek.
            </ManropeText>
          )}
        </UpperBody>
        {hasQR ? (
          <QRContainer
            table={tableData.data.getTable}
            userId={userId}
            tableId={tableIdentifier}
          />
        ) : (
          <QRCodeIcon height={500} width={300} />
        )}
        {hasQR && (
          <Button>
            <ManropeText bold={true} style={{ color: white }}>
              Verlängern
            </ManropeText>
          </Button>
        )}
      </View>
    </>
  );
}
