import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { View } from '../components/Themed';
import { ManropeText } from '../components/StyledText';
import { UpperBody } from '../components/Body/UpperBody';
import { subtitleThree, textTwo } from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input/Input';
import {
  black100,
  black80,
  gray80,
  purple100,
  white,
} from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { getLibrary, libraries } from '../utils/valueStore';
import ChooseLibIcon from '../utils/ChooseLibIcon';
import LibIcon from '../utils/LibIcon';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [openLibraries, setOpenLibraries] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <ManropeText style={styles.title}>
          Wählen Sie sich eine Bibliothek aus:
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
            <View style={styles.inputIcon}>
              <Ionicons name="chevron-down" size={22} color={black80} />
            </View>
          </View>
          <Dropdown
            open={openLibraries}
            setOpen={setOpenLibraries}
            width={346}
            items={libraries}
            chooseLibrary={true}
          />
        </Pressable>
      </UpperBody>
      {!getLibrary() && (
        <LibIcon dropdown={openLibraries} height={500} width={300} />
      )}
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

  bodyTitle: {
    color: white,
    fontSize: subtitleThree,
    textAlign: 'center',
    marginBottom: getLibrary() !== undefined ? 2 : 50,
  },
  bodySubtitle: {
    color: white,
    fontSize: textTwo,
    textAlign: 'center',
    marginBottom: 5,
  },
});
