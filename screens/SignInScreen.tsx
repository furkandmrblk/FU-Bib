import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { MiddleBody } from '../components/Body/MiddleBody';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { black100, peach100, peach60, peach80 } from '../constants/Colors';
import { subtitleWeight, titleThree } from '../constants/Fonts';
import { authenticateUser, useStore } from '../utils/isAuthenticated';

export const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText bold={true} style={styles.title}>
          SignIn
        </ManropeText>
        <PatternLeft
          upperColor={peach100}
          middleColor={peach80}
          lowerColor={peach60}
        />
      </UpperBody>
      <MiddleBody infoPage={true}>
        <Button>
          <ManropeText
            bold={true}
            onPress={async () => {
              useStore((state) => state.loginUser);
              await authenticateUser();
            }}
          >
            Login
          </ManropeText>
        </Button>
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
    fontSize: titleThree,
    fontWeight: subtitleWeight,
    marginBottom: 5,
  },
});
