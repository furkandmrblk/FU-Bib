import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import {
  black100,
  crimson100,
  grayTransparent,
  purple100,
  white,
} from '../constants/Colors';
import { subtitleThree, textThree } from '../constants/Fonts';
import { Formik } from 'formik';
import Input from '../components/Input/Input';
import { RootStackScreenProps } from '../types';
import { useAuth } from '../providers/Auth';

const signIn = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      __typename
      ... on Error {
        message
      }
      ... on ZodError {
        fieldErrors {
          message
          path
        }
      }
      ... on MutationSignInSuccess {
        data {
          id
          email
        }
      }
    }
  }
`;

export const SignInScreen = ({
  navigation,
}: RootStackScreenProps<'SignIn'>) => {
  const client = useApolloClient();
  const { setAuthenticated } = useAuth();
  const [error, setError] = useState<string | string[] | null>(null);

  const [login, _] = useMutation(signIn, {
    async onCompleted(res) {
      await client.resetStore();
      if (
        res.signIn.__typename !== 'ZodError' &&
        res.signIn.__typename !== 'BaseError'
      ) {
        setAuthenticated(true);
      } else if (res.signIn.__typename == 'ZodError') {
        setError(res.signIn.fieldErrors![0].message);
      } else {
        setError(res.signIn.message!);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText style={styles.title}>
          Melde dich an und reserviere dir einen Platz in eine der vielen
          Bibliotheken der Freien Universität Berlins.
        </ManropeText>
        <PatternLeft />
      </UpperBody>

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            login({
              variables: { email: values.email, password: values.password },
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.modal}>
            <ManropeText style={styles.modalTitle} bold={true}>
              Login
            </ManropeText>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
            />
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Passwort"
            />
            {error && (
              <ManropeText
                style={{
                  textAlign: 'center',
                  fontSize: textThree,
                  color: crimson100,
                  marginBottom: 10,
                }}
              >
                {error}
              </ManropeText>
            )}

            <Button backgroundColor={purple100} onPress={() => handleSubmit()}>
              <ManropeText style={{ color: white }} bold={true}>
                Login
              </ManropeText>
            </Button>
            <View
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0)',
                marginTop: 7.5,
              }}
            >
              <ManropeText style={styles.text}>
                Kein Account?{' '}
                <ManropeText
                  bold={true}
                  style={{ textDecorationLine: 'underline' }}
                  onPress={() => navigation.navigate('SignUp')}
                >
                  Hier registrieren.
                </ManropeText>
              </ManropeText>
            </View>
          </View>
        )}
      </Formik>
      <PatternLeft left={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'relative',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS == 'ios' ? 40 : 25,
    // overflow: 'visible',
  },
  title: {
    color: black100,
    fontSize: subtitleThree,
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '85%',
    borderRadius: 5,
    backgroundColor: grayTransparent,
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 16,
    borderStyle: 'solid',
    borderColor: purple100,
    borderWidth: 2,
  },
  modalTitle: {
    color: black100,
    fontSize: subtitleThree,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  text: {
    color: black100,
    fontSize: textThree,
  },
});
