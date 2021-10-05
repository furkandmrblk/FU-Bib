import React from 'react';
import { StyleSheet, TextInput as DefaultInput } from 'react-native';
import { black80, gray80 } from '../../constants/Colors';
import { textTwo, textWeight, titleWeight } from '../../constants/Fonts';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ExtraProps = {
  dropDown?: boolean;
  width?: number;
};

type InputProps = ThemeProps & DefaultInput['props'] & ExtraProps;

const Input = ({ ...props }: InputProps) => {
  const styles = StyleSheet.create({
    container: {
      width: props.width ? props.width : '100%',
      backgroundColor: gray80,
      paddingHorizontal: 10,
      paddingVertical: 12,
      borderBottomRightRadius: props.dropDown ? 0 : 5,
      borderTopRightRadius: props.dropDown ? 0 : 5,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      borderStyle: 'solid',
      borderColor: black80,
      borderWidth: props.dropDown ? 1 : 0,
      borderRightWidth: 0,

      color: black80,
      fontSize: textTwo,
      fontWeight: textWeight,

      marginBottom: 10,
    },
  });

  return <DefaultInput style={[styles.container]} {...props} />;
};

export default Input;
