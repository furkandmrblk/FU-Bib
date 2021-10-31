import React, { useCallback, useState } from 'react';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { Formik } from 'formik';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { crimson100, purple100, peach100, white } from '../constants/Colors';
import { textThree } from '../constants/Fonts';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { useAuth } from '../providers/Auth';
import { LinearGradient } from 'expo-linear-gradient';
import {
  containerStyle,
  gradientStyle,
  headerTitleStyle,
  modalStyles,
} from '../utils/styles';
import { RefreshControl, ScrollView } from 'react-native';
import { refresh } from '../utils/refresh';

const signUp = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      input: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
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
      ... on MutationSignUpSuccess {
        data {
          id
          email
        }
      }
    }
  }
`;

export const SignUpScreen = ({
  navigation,
}: RootStackScreenProps<'SignUp'>) => {
  const client = useApolloClient();
  const { setAuthenticated } = useAuth();
  const [error, setError] = useState<string | string[] | null>(null);

  const { onRefresh, refreshing } = refresh('SignUp');

  const [register, _] = useMutation(signUp, {
    async onCompleted(res) {
      await client.resetStore();
      if (
        res.signUp.__typename !== 'ZodError' &&
        res.signUp.__typename !== 'BaseError'
      ) {
        setAuthenticated(true);
        navigation.navigate('Root', { screen: 'TabOne' });
      } else if (res.signUp.__typename == 'ZodError') {
        setError(res.signUp.fieldErrors![0].message);
      } else {
        setError(res.signUp.message!);
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
              Registriere dich und reserviere dir einen Platz in eine der vielen
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
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              onSubmit={async (values) => {
                try {
                  register({
                    variables: {
                      email: values.email,
                      password: values.password,
                      confirmPassword: values.confirmPassword,
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
                    Registration
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
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    placeholder="Passwort bestätigen"
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

                  <Button
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <ManropeText style={{ color: white }} bold={true}>
                      Registrieren
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
                      Account vorhanden?{' '}
                      <ManropeText
                        bold={true}
                        style={{ textDecorationLine: 'underline' }}
                        onPress={() => navigation.navigate('SignIn')}
                      >
                        Hier einloggen.
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
