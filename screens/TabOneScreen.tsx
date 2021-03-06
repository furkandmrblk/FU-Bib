import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
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
  white,
} from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from '../components/Dropdown/Dropdown';
import { getLibrary } from '../utils/valueStore';
import LibIcon from '../assets/images/LibIcon';
import { gql, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import { containerStyle, headerTitleStyle } from '../utils/styles';
import { refresh } from '../utils/refresh';

export const getTable = gql`
  query getTable($identifier: String!) {
    getTable(identifier: $identifier) {
      id
      identifier
      library {
        name
        adress
        email
        website
      }
      floor
      userId
      time
      extendedTime
    }
  }
`;

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
  const { onRefresh, refreshing } = refresh('TabOne');

  const [openLibraries, setOpenLibraries] = useState<boolean>(false);
  const libraryData = useQuery(getLibraries);

  return (
    <>
      <Header />
      <ScrollView
        style={{ backgroundColor: white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!libraryData.loading && libraryData.data && (
          <View style={[containerStyle.container, { minHeight: '100%' }]}>
            <UpperBody>
              <ManropeText style={headerTitleStyle.title}>
                W??hlen Sie eine Bibliothek aus:
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
                      placeholder="Bibliothek ausw??hlen"
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
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 54 : 59,
    maxWidth: '100%',
    padding: 2,
    borderRadius: 7,
    marginBottom: 5,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? 50 : 55,
    width: '100%',
    backgroundColor: gray80,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30,
    paddingVertical: 10,
  },
});
