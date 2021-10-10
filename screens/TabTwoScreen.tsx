import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { Platform, StyleSheet } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import { Header } from '../components/Header/Header';
import { Lib10 } from '../components/Libraries/Lib10';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { black100, gray80, purple100 } from '../constants/Colors';
import { subtitleThree } from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import { getLibrary } from '../utils/valueStore';
import LibIcon from '../utils/LibIcon';
import ChooseLibIcon from '../utils/ChooseLibIcon';
import ChooseLibIcon2 from '../utils/ChooseLibIcon2';

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  const isFocused = useIsFocused();

  useEffect(() => {
    getLibrary;
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        {getLibrary() !== undefined ? (
          <ManropeText style={styles.title}>
            Wählen Sie sich einen Tisch im{' '}
            <ManropeText bold={true}>{getLibrary()?.name}</ManropeText> aus.
          </ManropeText>
        ) : (
          <ManropeText style={styles.title}>
            Bitte wählen Sie{' '}
            <ManropeText
              onPress={() => navigation.navigate('TabOne')}
              style={{ textDecorationLine: 'underline' }}
              bold={true}
            >
              hier
            </ManropeText>{' '}
            zunächst eine Bibliothek aus.
          </ManropeText>
        )}
      </UpperBody>
      {getLibrary()?.id === '1.0' && <Lib10 />}
      {!getLibrary() && <ChooseLibIcon2 height={500} width={250} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS == 'ios' ? 40 : 25,
  },
  title: {
    color: black100,
    fontSize: subtitleThree,
    marginBottom: 10,
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inputIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gray80,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderStyle: 'solid',
    borderColor: purple100,
    borderWidth: 2,
    borderLeftWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: Platform.OS == 'ios' ? 8.7 : 13.9,
  },
});
