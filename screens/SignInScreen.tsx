import React, { useContext } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { MiddleBody } from '../components/Body/MiddleBody';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import {
  black100,
  peach100,
  peach60,
  peach80,
  purple100,
  white,
  whiteTransparent,
} from '../constants/Colors';
import {
  subtitleThree,
  subtitleTwo,
  subtitleWeight,
  textThree,
  textWeight,
  titleThree,
} from '../constants/Fonts';
import { Context } from '../utils/reducer';
import { Formik } from 'formik';
import Input from '../components/Input/Input';
import Navigation from '../navigation';
import { RootStackScreenProps } from '../types';

export const SignInScreen = ({
  navigation,
}: RootStackScreenProps<'SignIn'>) => {
  const authContext = useContext(Context);

  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText bold={true} style={styles.title}>
          Melde dich an und reserviere dir einen Platz in eine der vielen
          Bibliotheken der Freien Universität Berlins.
        </ManropeText>
        {/* <PatternLeft
          upperColor={peach100}
          middleColor={peach80}
          lowerColor={peach60}
        /> */}
      </UpperBody>
      <MiddleBody infoPage={true}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.modal}>
              <ManropeText style={styles.title} bold={true}>
                Login
              </ManropeText>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
              />
              <Input
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Passwort"
              />
              <Button
                backgroundColor={peach100}
                onPress={() => {
                  handleSubmit;
                  authContext!.authDispatch('login');
                }}
              >
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
      </MiddleBody>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS == 'ios' ? 40 : 25,
    overflow: 'visible',
  },
  title: {
    color: black100,
    fontSize: subtitleThree,
    fontWeight: subtitleWeight,
    marginBottom: 10,
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    backgroundColor: whiteTransparent,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  input: {
    marginBottom: 5,
  },
  text: {
    color: black100,
    fontSize: textThree,
  },
});
