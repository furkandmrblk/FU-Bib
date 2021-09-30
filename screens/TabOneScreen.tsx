import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { Text, View } from '../components/Themed';
import { ManropeText } from '../components/StyledText';
import { UpperBody } from '../components/Body/UpperBody';
import { Lib10 } from '../components/Libraries/Lib10';
import {
  subtitleThree,
  subtitleWeight,
  textOne,
  textTwo,
  textWeight,
} from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input/Input';
import {
  black100,
  black80,
  emerald100,
  gray80,
  peach100,
  white,
} from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { getLibrary, libraries } from '../utils/valueStore';
import { MiddleBody } from '../components/Body/MiddleBody';
import LibIcon from '../utils/LibIcon';
import Button from '../components/Button/Button';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [openLibraries, setOpenLibraries] = useState<boolean>(false);
  const [openFloor, setOpenFloor] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText style={styles.title}>
          Wählen Sie eine Bibliothek aus
        </ManropeText>
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
            <ManropeText bold={true} style={styles.bodyTitle}>
              {getLibrary()?.name}
            </ManropeText>
            <ManropeText style={styles.bodySubtitle}>
              {getLibrary()?.address}
            </ManropeText>
            {getLibrary()?.secondAddress && (
              <ManropeText style={styles.bodySubtitle}>
                {getLibrary()?.secondAddress}
              </ManropeText>
            )}
            {getLibrary()?.id == '1.0' && <Lib10 />}
            {getLibrary() !== undefined ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  borderRadius: 5,
                  backgroundColor: peach100,
                }}
              >
                <Pressable
                  style={{ borderRadius: 5, overflow: 'hidden' }}
                  onPress={() => setOpenLibraries(!openLibraries)}
                >
                  <View style={styles.inputWrap}>
                    <Input
                      value="EG"
                      pointerEvents="none"
                      dropDown={true}
                      width={50}
                      editable={false}
                    />
                    {Platform.OS == 'android' && (
                      <View style={styles.inputIconAndroid}>
                        <Ionicons
                          name="chevron-down"
                          size={25}
                          color={black80}
                        />
                      </View>
                    )}
                    {Platform.OS == 'ios' && (
                      <View style={styles.inputIconIOS}>
                        <Ionicons
                          name="chevron-down"
                          size={25}
                          color={black80}
                        />
                      </View>
                    )}
                  </View>
                  <Dropdown
                    open={openFloor}
                    setOpen={setOpenFloor}
                    width={50}
                    items={getLibrary()?.floor}
                  />
                </Pressable>
                <Button width={150} backgroundColor={emerald100}>
                  <ManropeText
                    bold={true}
                    style={{
                      color: white,
                      fontSize: textTwo,
                      fontWeight: 'bold',
                    }}
                  >
                    Reservieren
                  </ManropeText>
                </Button>
              </View>
            ) : null}
          </>
        ) : (
          <>
            <ManropeText bold={true} style={styles.bodyTitle}>
              Bitte wählen Sie eine Bibliothek aus 📖
            </ManropeText>
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
    color: black100,
    fontSize: subtitleThree,
    fontWeight: subtitleWeight,
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
    paddingVertical: 7.2,
  },
  bodyTitle: {
    color: white,
    fontSize: subtitleThree,
    fontWeight: subtitleWeight,
    textAlign: 'center',
    marginBottom: getLibrary() !== undefined ? 2 : 50,
  },
  bodySubtitle: {
    color: white,
    fontSize: textTwo,
    fontWeight: textWeight,
    textAlign: 'center',
    marginBottom: 5,
  },
});
