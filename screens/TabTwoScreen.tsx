import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { Library } from '../components/Libraries/Library';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import {
  crimson100,
  emerald100,
  emerald80,
  gray80,
  purple100,
  white,
} from '../constants/Colors';
import { RootTabScreenProps } from '../types';
import { getLibrary } from '../utils/valueStore';
import ChooseLibIcon2 from '../assets/images/ChooseLibIcon2';
import Button from '../components/Button/Button';
import deviceStorage from '../providers/deviceStorage';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { textThree } from '../constants/Fonts';
import { containerStyle, headerTitleStyle } from '../utils/styles';
import { refresh } from '../utils/refresh';
import { RefreshControl, ScrollView } from 'react-native';

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

const bookTable = gql`
  mutation bookTable($identifier: String!) {
    bookTable(input: { identifier: $identifier }) {
      __typename
      ... on BaseError {
        message
      }
      ... on MutationBookTableSuccess {
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

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const { onRefresh, refreshing } = refresh('TabTwo');

  const isFocused = useIsFocused();

  useEffect(() => {
    getLibrary;
  }, [isFocused]);

  const [pickedTable, setPickedTable] = useState<{
    identifier: string | null;
    background: string;
  }>({
    identifier: null,
    background: gray80,
  });
  const [error, setError] = useState<string | null>(null);

  const [book, _] = useMutation(bookTable, {
    async onCompleted(res) {
      if (res.bookTable.__typename == 'BaseError') {
        setError(res.bookTable.message!);
      } else {
        setError(null);
        await deviceStorage.set('tableIdentifier', pickedTable.identifier!);
        navigation.navigate('TabThree');
      }
    },
  });

  return (
    <>
      <Header />
      <ScrollView
        style={{ backgroundColor: white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={containerStyle.container}>
          <UpperBody>
            {getLibrary() ? (
              <ManropeText style={headerTitleStyle.title}>
                Wählen Sie sich einen Tisch im &nbsp;
                <ManropeText bold={true}>{getLibrary()?.name}</ManropeText> aus.
              </ManropeText>
            ) : (
              <ManropeText style={headerTitleStyle.title}>
                Bitte wählen Sie &nbsp;
                <ManropeText
                  onPress={() => navigation.navigate('TabOne')}
                  style={{ textDecorationLine: 'underline', color: purple100 }}
                  bold={true}
                >
                  hier
                </ManropeText>
                &nbsp; zunächst eine Bibliothek aus.
              </ManropeText>
            )}
          </UpperBody>
          {getLibrary() && (
            <>
              <Library
                pickedTable={pickedTable}
                setPickedTable={setPickedTable}
                library={getLibrary()}
              />
              {error && (
                <ManropeText
                  style={{
                    textAlign: 'center',
                    fontSize: textThree,
                    color: crimson100,
                    marginBottom: 5,
                  }}
                >
                  {error}
                </ManropeText>
              )}
              <Formik
                initialValues={{}}
                onSubmit={() => {
                  try {
                    book({
                      variables: {
                        identifier: pickedTable.identifier,
                      },
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {({ handleSubmit }) => (
                  <Button
                    onPress={async () => {
                      if (pickedTable.identifier == null) {
                        setError('Bitte wählen Sie einen Tisch aus.');
                      }
                      handleSubmit();
                    }}
                  >
                    <ManropeText bold={true} style={{ color: white }}>
                      Reservieren
                    </ManropeText>
                  </Button>
                )}
              </Formik>
            </>
          )}

          {!getLibrary() && <ChooseLibIcon2 height={500} width={250} />}
        </View>
      </ScrollView>
    </>
  );
}
