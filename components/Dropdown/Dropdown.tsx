import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  black80,
  gray100,
  gray80,
  purple100,
  purple60,
  purple80,
  white,
} from '../../constants/Colors';
import { textTwo, textWeight } from '../../constants/Fonts';
import { setLibrary } from '../../utils/valueStore';
import { ManropeText } from '../StyledText';
import { Text, View } from '../Themed';

type DropdownProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: any[] | undefined;
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

      backgroundColor: purple60,
      borderRadius: 5,
      borderStyle: 'solid',
      borderColor: purple100,
      borderWidth: 2,

      paddingHorizontal: Platform.OS == 'ios' ? 2 : 6,
      paddingVertical: 8,
      // marginTop: Platform.OS == 'android' ? 10 : 0,
    },
    itemWrap: {
      width: '100%',
      paddingLeft: 6,
      paddingRight: 12,
    },
    item: {
      color: white,
      fontSize: textTwo,
      fontWeight: textWeight,
      width: '100%',
      backgroundColor: purple80,
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
            {props.items!.map((item, index: number) => (
              <Pressable
                key={index}
                style={{ width: '100%' }}
                onPress={() => {
                  setLibrary(item);
                  props.setOpen(false);
                }}
              >
                <ManropeText style={styles.item}>{item.name}</ManropeText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </>
  );
};
