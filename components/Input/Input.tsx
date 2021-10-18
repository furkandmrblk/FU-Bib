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
      minWidth: props.width ? props.width : '100%',
      maxWidth: props.width ? props.width : '100%',
      backgroundColor: gray80,
      paddingHorizontal: props.dropDown ? 0 : 10,
      paddingVertical: props.dropDown ? 0 : 12,
      borderBottomRightRadius: props.dropDown ? 0 : 5,
      borderTopRightRadius: props.dropDown ? 0 : 5,
      borderBottomLeftRadius: props.dropDown ? 0 : 5,
      borderTopLeftRadius: props.dropDown ? 0 : 5,

      color: black80,
      fontSize: textTwo,

      marginBottom: props.dropDown ? 0 : 10,
    },
  });

  return <DefaultInput style={[styles.container]} {...props} />;
};

export default Input;
