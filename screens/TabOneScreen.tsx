import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { Text, View } from '../components/Themed';
import { UpperBody } from '../components/Body/UpperBody';
import {
  subtitleThree,
  subtitleWeight,
  textOne,
  textTwo,
  textWeight,
} from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input/Input';
import { black80, gray80, white } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { getLibrary, libraries } from '../utils/valueStore';
import { MiddleBody } from '../components/Body/MiddleBody';
import LibIcon from '../utils/LibIcon';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [openLibraries, setOpenLibraries] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <Text style={styles.subtext}>Wählen Sie eine Bibliothek aus</Text>
        <Pressable onPress={() => setOpenLibraries(!openLibraries)}>
          <View style={styles.inputWrap}>
            <Input
              value={getLibrary()?.name}
              placeholder="Bibliothek auswählen"
              pointerEvents="none"
              dropDown={true}
              width={310}
              editable={false}
            />
            {Platform.OS == 'android' && (
              <View style={styles.inputIconAndroid}>
                <Ionicons name="chevron-down" size={25} color={black80} />
              </View>
            )}
            {Platform.OS == 'ios' && (
              <View style={styles.inputIconIOS}>
                <Ionicons name="chevron-down" size={25} color={black80} />
              </View>
            )}
          </View>
          <Dropdown
            open={openLibraries}
            setOpen={setOpenLibraries}
            width={346}
            items={libraries}
          />
        </Pressable>
      </UpperBody>
      <MiddleBody>
        {getLibrary() !== undefined ? (
          <>
            <Text style={styles.bodyTitle}>{getLibrary()?.name}</Text>
            <Text style={styles.bodySubtitle}>{getLibrary()?.address}</Text>
            <Text style={styles.bodySubtitle}>
              {getLibrary()?.secondAddress}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.bodyTitle}>
              Bitte wählen Sie eine Bibliothek aus 📖
            </Text>
            <LibIcon height={350} width={200} />
          </>
        )}
      </MiddleBody>
    </View>
  );
}

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
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: textOne,
    fontWeight: textWeight,
    marginBottom: 10,
  },
  inputWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIconAndroid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gray80,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderStyle: 'solid',
    borderColor: black80,
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 12.4,
  },
  inputIconIOS: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gray80,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderStyle: 'solid',
    borderColor: black80,
    borderWidth: 1,
    borderLeftWidth: 0,
    paddingHorizontal: 5,
    paddingVertical: 7.4,
  },
  bodyTitle: {
    color: white,
    fontSize: subtitleThree,
    fontWeight: subtitleWeight,
    textAlign: 'center',
    marginBottom: 2,
  },
  bodySubtitle: {
    color: white,
    fontSize: textTwo,
    fontWeight: textWeight,
    textAlign: 'center',
    marginBottom: 2,
  },
});
