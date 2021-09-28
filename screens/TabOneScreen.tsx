import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Header />
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
    paddingVertical: 48,
    // paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
