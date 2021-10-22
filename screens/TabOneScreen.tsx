import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { View } from '../components/Themed';
import { ManropeText } from '../components/StyledText';
import { UpperBody } from '../components/Body/UpperBody';
import { subtitleThree, textThree, textTwo } from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input/Input';
import {
  black100,
  black80,
  gray80,
  purple100,
  peach100,
} from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { getLibrary } from '../utils/valueStore';
import LibIcon from '../assets/images/LibIcon';
import { gql, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';

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
            Wählen Sie eine Bibliothek aus:
          </ManropeText>
          <Pressable onPress={() => setOpenLibraries(!openLibraries)}>
            <LinearGradient
              start={[1, 0]}
              end={[0, 1]}
              colors={[purple100, peach100]}
              style={styles.inputWrap}
            >
              <View style={styles.input}>
                <Input
                  value={getLibrary()?.name}
                  placeholder="Bibliothek auswählen"
                  pointerEvents="none"
                  dropDown={true}
                  editable={false}
                />

                <Ionicons name="chevron-down" size={22} color={black80} />
              </View>
            </LinearGradient>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 54 : 59,
    width: 350,
    borderRadius: 7,
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 50 : 55,
    width: '98.95%',
    backgroundColor: gray80,
    borderRadius: 5,

    paddingLeft: 10,
    paddingRight: 30,
    paddingVertical: 10,
  },
});
