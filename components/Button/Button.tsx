import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import {
  RectButton as DefaultButton,
  RectButtonProps,
} from 'react-native-gesture-handler';
import { white } from '../../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ExtraProps = {
  width?: number;
  backgroundColor?: string;
  children: ReactNode;
};

type ButtonProps = ThemeProps & RectButtonProps & ExtraProps;

const Button = ({
  children,
  width,
  backgroundColor,
  ...props
}: ButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: width ? width : '100%',
      backgroundColor: backgroundColor ? backgroundColor : white,
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 10,
    },
  });

  return (
    <DefaultButton style={[styles.container]} {...props}>
      {children}
    </DefaultButton>
  );
};

export default Button;
