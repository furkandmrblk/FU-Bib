import React, { ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { peach100, peach60, peach80 } from '../../constants/Colors';
import { textOne, textThree, textTwo } from '../../constants/Fonts';
import { View } from '../Themed';

type MiddleBodyProps = {
  firstLayerColor?: string;
  secondLayerColor?: string;
  thirdLayerColor?: string;
};

export const MiddleBody = (
  { children }: { children: ReactNode },
  props: MiddleBodyProps
) => {
  const styles = StyleSheet.create({
    firstLayer: {
      zIndex: -1,
      height: 15,
      width: '100%',
      backgroundColor: props.firstLayerColor ? props.firstLayerColor : peach60,
    },
    secondLayer: {
      zIndex: -1,
      height: 15,
      width: '100%',
      backgroundColor: props.secondLayerColor
        ? props.secondLayerColor
        : peach80,
    },
    thirdLayer: {
      zIndex: -1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: Platform.OS == 'ios' ? '75.5%' : '70.5%',
      width: '100%',
      backgroundColor: props.thirdLayerColor ? props.thirdLayerColor : peach100,

      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

  return (
    <>
      <View style={styles.firstLayer} />
      <View style={styles.secondLayer} />
      <View style={styles.thirdLayer}>{children}</View>
    </>
  );
};
