import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { grayTransparent, purple100 } from '../../constants/Colors';
import { LibraryProps } from '../../utils/valueStore';
import { ManropeText } from '../StyledText';

const getLibrary = gql`
  query getLibrary($name: String!) {
    getLibrary(name: $name) {
      id
      section
      name
      adress
      email
      website
      table {
        id
        identifier
        floor
        booked
        time
      }
    }
  }
`;

export const Library = (library: LibraryProps | any) => {
  const name = library.library.name;

  const libraryData = useQuery(getLibrary, {
    variables: {
      name: name,
    },
  });
  if (libraryData.loading) return <ManropeText>Loading...</ManropeText>;
  const currentLibrary = libraryData.data.getLibrary;
  console.log('currLib:', currentLibrary);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '90%',
      height: '100%',
      backgroundColor: grayTransparent,
      borderRadius: 5,
      borderColor: purple100,
      borderStyle: 'solid',
      borderWidth: 2,
      padding: 10,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.container}>
      <ManropeText>{currentLibrary.name}</ManropeText>
    </View>
  );
};
