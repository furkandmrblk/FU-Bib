import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { black80, gray100, gray80 } from '../../constants/Colors';
import { textTwo, textWeight } from '../../constants/Fonts';
import { setLibrary } from '../../utils/valueStore';
import { Text, View } from '../Themed';

type DropdownProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: {
    id: string;
    name: string;
    address: string;
    secondAddress?: string;
    email: string;
    secondEmail?: string;
  }[];
  width?: number;
};

export const Dropdown = (props: DropdownProps) => {
  const styles = StyleSheet.create({
    container: {
      zIndex: 1000,
      position: 'relative',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',

      minHeight: 290,
      maxHeight: 290,
      width: props.width ? props.width : '100%',

      backgroundColor: gray80,
      borderRadius: 5,
      borderStyle: 'solid',
      borderColor: black80,
      borderWidth: 1,

      paddingHorizontal: Platform.OS == 'ios' ? 2 : 6,
      paddingVertical: 8,
      // marginTop: Platform.OS == 'android' ? 60 : 50,
      marginTop: 5,
    },
    itemWrap: {
      width: '100%',
      backgroundColor: gray80,
      paddingLeft: 6,
      paddingRight: 12,
    },
    item: {
      fontSize: textTwo,
      fontWeight: textWeight,
      width: '100%',
      backgroundColor: gray100,
      borderRadius: 5,
      overflow: 'hidden',

      paddingVertical: 7,
      paddingHorizontal: 10,
      marginBottom: 6,
    },
  });

  return (
    <>
      {props.open ? (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
            removeClippedSubviews={true}
            nestedScrollEnabled={true}
            style={styles.itemWrap}
          >
            {props.items.map((item, index: number) => (
              <Pressable
                key={index}
                style={{ width: '100%' }}
                onPress={() => {
                  setLibrary(item);
                  props.setOpen(false);
                }}
              >
                <Text style={styles.item}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
};
