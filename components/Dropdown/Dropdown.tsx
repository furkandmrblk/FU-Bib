import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { black100, gray100, gray80, purple100 } from '../../constants/Colors';
import { textTwo } from '../../constants/Fonts';
import { setLibrary } from '../../utils/valueStore';
import { ManropeText } from '../StyledText';
import { View } from '../Themed';

type DropdownProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: any[] | undefined;
  width?: number;
  chooseLibrary?: boolean;
};

export const Dropdown = (props: DropdownProps) => {
  const navigation = useNavigation();

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
      color: black100,
      fontSize: textTwo,
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
            {props.items!.map((item, index: number) => (
              <Pressable
                key={index}
                style={{ width: '100%' }}
                onPress={() => {
                  props.setOpen(false);
                  setLibrary(item);
                  props.chooseLibrary &&
                    navigation.navigate('Root', { screen: 'TabTwo' });
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
