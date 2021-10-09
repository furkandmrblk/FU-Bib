import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';

export const UpperBody = ({ children }: { children: ReactNode }) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      paddingHorizontal: 32,
      paddingTop: 18,
      paddingBottom: 18,
    },
  });

  return <View style={styles.container}>{children}</View>;
};
