import React, { useCallback, useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { RefreshControl, KeyboardAvoidingView } from 'react-native';
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
  peach100,
} from '../constants/Colors';
import { subtitleThree, textThree } from '../constants/Fonts';
import { Formik } from 'formik';
import Input from '../components/Input/Input';
import { RootStackScreenProps } from '../types';
import { useAuth } from '../providers/Auth';
import { LinearGradient } from 'expo-linear-gradient';
import {
  containerStyle,
  gradientStyle,
  headerTitleStyle,
  modalStyles,
} from '../utils/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { refresh } from '../utils/refresh';

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

  const { onRefresh, refreshing } = refresh('SignIn');

  const [login, _] = useMutation(signIn, {
    async onCompleted(res) {
      await client.resetStore();
      if (
        res.signIn.__typename !== 'ZodError' &&
        res.signIn.__typename !== 'BaseError'
      ) {
        setAuthenticated(true);
        navigation.navigate('Root', { screen: 'TabOne' });
      } else if (res.signIn.__typename == 'ZodError') {
        setError(res.signIn.fieldErrors![0].message);
      } else {
        setError(res.signIn.message!);
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
            <ManropeText style={headerTitleStyle.title}>
              Melde dich an und reserviere dir einen Platz in eine der vielen
              Bibliotheken der Freien Universität Berlins.
            </ManropeText>
            <PatternLeft one={true} />
          </UpperBody>
          <LinearGradient
            start={[1, 0]}
            end={[0, 1]}
            colors={[purple100, peach100]}
            style={gradientStyle.wrap}
          >
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => {
                try {
                  login({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={modalStyles.modal}>
                  <ManropeText style={modalStyles.modalTitle} bold={true}>
                    Login
                  </ManropeText>
                  <Input
                    keyboardType="email-address"
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

                  <Button onPress={() => handleSubmit()}>
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
                    <ManropeText style={modalStyles.text}>
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
          </LinearGradient>
          <PatternLeft left={true} />
        </View>
      </ScrollView>
    </>
  );
};
