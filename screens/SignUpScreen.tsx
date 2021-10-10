import React from 'react';
import { MiddleBody } from '../components/Body/MiddleBody';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { Formik } from 'formik';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {
  black100,
  grayTransparent,
  peach100,
  purple100,
  white,
  whiteTransparent,
} from '../constants/Colors';
import { Platform, StyleSheet } from 'react-native';
import { subtitleThree, textThree } from '../constants/Fonts';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import deviceStorage from '../utils/deviceStorage';

export const SignUpScreen = ({
  navigation,
}: RootStackScreenProps<'SignUp'>) => {
  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText style={styles.title}>
          Registriere dich und reserviere dir einen Platz in eine der vielen
          Bibliotheken der Freien Universität Berlins.
        </ManropeText>
        <PatternLeft />
      </UpperBody>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.modal}>
            <ManropeText style={styles.modalTitle} bold={true}>
              Registration
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
            <Input
              secureTextEntry={true}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Passwort wiederholen"
            />
            <Button
              backgroundColor={purple100}
              onPress={() => {
                handleSubmit;
                deviceStorage.set('authenticated', 'true');
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
              <ManropeText style={styles.text}>
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
      <PatternLeft left={true} />
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
    marginBottom: 10,
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
    marginBottom: 5,
  },
  text: {
    color: black100,
    fontSize: textThree,
  },
});
