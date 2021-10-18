import React from 'react';
import { StyleSheet, TextInput as DefaultInput } from 'react-native';
import { black80, gray80, purple100 } from '../../constants/Colors';
import { textTwo } from '../../constants/Fonts';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ExtraProps = {
  dropDown?: boolean;
  width?: number | string;
};

type InputProps = ThemeProps & DefaultInput['props'] & ExtraProps;

const Input = ({ ...props }: InputProps) => {
  const styles = StyleSheet.create({
    container: {
      minWidth: props.width ? props.width : 312,
      maxWidth: props.width ? props.width : 312,
      backgroundColor: gray80,
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderBottomRightRadius: props.dropDown ? 0 : 5,
      borderTopRightRadius: props.dropDown ? 0 : 5,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      borderStyle: 'solid',
      borderColor: purple100,
      borderWidth: props.dropDown ? 2 : 0,
      borderRightWidth: 0,

      color: black80,
      fontSize: textTwo,

      marginBottom: 10,
    },
  });

  return <DefaultInput style={[styles.container]} {...props} />;
};

export default Input;
