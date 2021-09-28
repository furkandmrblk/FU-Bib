import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from '../components/Header/Header';
import { Text, View } from '../components/Themed';
import { UpperBody } from '../components/Body/UpperBody';
import { textOne, textTwo, textWeight } from '../constants/Fonts';
import { RootTabScreenProps } from '../types';
import Input from '../components/Input/Input';
import { black80, gray80 } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Header />
      <UpperBody>
        <Text style={styles.subtext}>Wählen Sie eine Bibliothek aus</Text>
        <View style={styles.inputWrap}>
          <Input
            placeholder="Bibliothek auswählen"
            pointerEvents="none"
            dropDown={true}
            width={300}
          />
          <View style={styles.inputIcon}>
            <Ionicons name="chevron-down" size={25} color={black80} />
          </View>
        </View>
      </UpperBody>
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
  inputIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gray80,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
});
