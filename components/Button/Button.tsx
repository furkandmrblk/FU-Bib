import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import {
  RectButton as DefaultButton,
  RectButtonProps,
} from 'react-native-gesture-handler';
import { peach100, purple100 } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ExtraProps = {
  width?: number | string;
  backgroundColor?: string;
  scanButton?: boolean;
  children: ReactNode;
};

type ButtonProps = ThemeProps & RectButtonProps & ExtraProps;

const Button = ({
  children,
  width,
  backgroundColor,
  scanButton,
  ...props
}: ButtonProps) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width ? width : '100%',
      paddingHorizontal: 7,
      paddingVertical: 15,
    },
  });

  return (
    <>
      {backgroundColor ? (
        <DefaultButton
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor,
              borderRadius: scanButton ? 0 : 5,
              width: width ? width : '100%',
            },
          ]}
          {...props}
        >
          {children}
        </DefaultButton>
      ) : (
        <LinearGradient
          style={{ width: '100%', borderRadius: 5 }}
          start={[1, 0]}
          end={[0, 1]}
          colors={[purple100, peach100]}
        >
          <DefaultButton style={[styles.container]} {...props}>
            {children}
          </DefaultButton>
        </LinearGradient>
      )}
    </>
  );
};

export default Button;
