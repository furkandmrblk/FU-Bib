import React, { ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { peach100, peach60, peach80 } from '../../constants/Colors';
import { textOne, textThree, textTwo } from '../../constants/Fonts';
import { View } from '../Themed';

type BodyProps = {
  firstLayerColor?: string;
  secondLayerColor?: string;
  thirdLayerColor?: string;
  infoPage?: boolean;
  children: ReactNode;
};

export const MiddleBody = ({
  children,
  infoPage,
  firstLayerColor,
  secondLayerColor,
  thirdLayerColor,
}: BodyProps) => {
  const styles = StyleSheet.create({
    firstLayer: {
      zIndex: -1,
      height: 15,
      width: '100%',
      backgroundColor: firstLayerColor ? firstLayerColor : peach60,
    },
    secondLayer: {
      zIndex: -1,
      height: 15,
      width: '100%',
      backgroundColor: secondLayerColor ? secondLayerColor : peach80,
    },
    thirdLayer: {
      zIndex: -1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: Platform.OS == 'ios' ? '76.25%' : '71.5%',
      width: '100%',
      backgroundColor: thirdLayerColor ? thirdLayerColor : peach100,

      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    infoLayer: {
      zIndex: -1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: Platform.OS == 'ios' ? '66.25%' : '61.5%',
      width: '100%',
      backgroundColor: thirdLayerColor ? thirdLayerColor : peach100,

      paddingVertical: 36,
      paddingHorizontal: 32,
    },
  });

  return (
    <>
      <View style={styles.firstLayer} />
      <View style={styles.secondLayer} />
      {!infoPage && <View style={styles.thirdLayer}>{children}</View>}
      {infoPage && <View style={styles.infoLayer}>{children}</View>}
    </>
  );
};
