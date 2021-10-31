import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  black80,
  crimson80,
  emerald100,
  peach100,
  purple100,
  white,
} from '../../constants/Colors';
import {
  bodyContainerStyle,
  bodyTitleStyle,
  containerStyle,
  headerTitleStyle,
} from '../../utils/styles';
import { View } from '../Themed';
import { ManropeText } from '../StyledText';
import Input from '../Input/Input';
import { Pressable, StyleSheet } from 'react-native';
import Button from '../Button/Button';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import {
  gql,
  OperationVariables,
  QueryResult,
  useMutation,
} from '@apollo/client';
import deviceStorage from '../../providers/deviceStorage';
import { useNavigation } from '@react-navigation/core';
import { UserProps } from '../../screens/TabFiveScreen';

const signOut = gql`
  mutation signOut {
    signOut
  }
`;

interface UserProfileProps {
  userData: QueryResult<any, OperationVariables>;
}

export const UserProfile = ({ userData }: UserProfileProps) => {
  const navigation = useNavigation();
  const [edit, setEdit] = useState<boolean>(false);

  const [logout, _] = useMutation(signOut, {
    async onCompleted() {
      await deviceStorage.delete('session');
      navigation.reset({ routes: [{ name: 'SignIn' }] });
    },
  });

  if (userData.loading) {
    return (
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
          <ManropeText bold={true}>
            Lädt... Bitte warten Sie einen Moment.
          </ManropeText>
        </View>
      </LinearGradient>
    );
  }

  const user: UserProps = userData.data.getCurrentUser;

  return (
    <LinearGradient
      start={[1, 0]}
      end={[0, 1]}
      colors={[purple100, peach100]}
      style={[bodyContainerStyle.wrap, { maxHeight: edit ? 297.5 : 494 }]}
    >
      <View
        style={[
          bodyContainerStyle.container,
          {
            borderWidth: 0,
            height: '100%',
            maxHeight: 'auto',
            width: '100%',
            marginBottom: 0,
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
            <Input spellCheck={false} />
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
                Reservationen: <ManropeText>{user.reservations}</ManropeText>
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
            <Button onPress={() => setEdit(false)} backgroundColor={emerald100}>
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
  );
};

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
