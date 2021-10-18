import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { View } from '../components/Themed';
import { ManropeText } from '../components/StyledText';
import { UpperBody } from '../components/Body/UpperBody';
import { subtitleThree, textOne, textThree, textTwo } from '../constants/Fonts';
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
import { getLibrary } from '../utils/valueStore';
import LibIcon from '../assets/images/LibIcon';
import { gql, useQuery } from '@apollo/client';

const getLibraries = gql`
  query getLibraries {
    getLibraries {
      id
      section
      name
      adress
      email
      website
    }
  }
`;

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [openLibraries, setOpenLibraries] = useState<boolean>(false);
  const libraryData = useQuery(getLibraries);

  return (
    <>
      <Header />
      <View style={containerStyle.container}>
        <UpperBody>
          <ManropeText style={headerTitleStyle.title}>
            Wählen Sie sich eine Bibliothek aus:
          </ManropeText>
          <Pressable onPress={() => setOpenLibraries(!openLibraries)}>
            <View style={styles.inputWrap}>
              <Input
                value={getLibrary()?.name}
                placeholder="Bibliothek auswählen"
                pointerEvents="none"
                dropDown={true}
                editable={false}
              />
              <View style={styles.inputIcon}>
                <Ionicons name="chevron-down" size={22} color={black80} />
              </View>
            </View>
            {!libraryData.loading && (
              <Dropdown
                open={openLibraries}
                setOpen={setOpenLibraries}
                items={libraryData.data.getLibraries}
                chooseLibrary={true}
              />
            )}
          </Pressable>
        </UpperBody>
        {!openLibraries && (
          <LibIcon dropdown={openLibraries} height={400} width={300} />
        )}
      </View>
    </>
  );
}

export const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
});

export const headerTitleStyle = StyleSheet.create({
  title: {
    color: black100,
    fontSize: subtitleThree,
    marginBottom: 10,
  },
});

export const bodyTitleStyle = StyleSheet.create({
  bodyTitle: {
    fontSize: textTwo,
    marginBottom: 10,
  },
});

export const bodySubtitleStyle = StyleSheet.create({
  bodySubtitle: {
    fontSize: textThree,
    marginBottom: 10,
  },
});

const styles = StyleSheet.create({
  inputWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    minWidth: '100%',
    maxWidth: '100%',
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
    paddingHorizontal: 7,
    paddingVertical: Platform.OS == 'ios' ? 8.7 : 13.9,
  },
});
