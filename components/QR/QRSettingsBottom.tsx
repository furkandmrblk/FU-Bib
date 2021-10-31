import React from 'react';
import { purple100, white } from '../../constants/Colors';
import { qrScannerStyles } from '../../utils/styles';
import Button from '../Button/Button';
import { ManropeText } from '../StyledText';
import { View } from '../Themed';

type QRSettingsBottomProps = {
  setScanned: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QRSettingsBottom = ({ setScanned }: QRSettingsBottomProps) => {
  return (
    <View style={qrScannerStyles.bottomContainer}>
      <Button
        scanButton={true}
        backgroundColor={purple100}
        onPress={() => {
          setScanned(false);
        }}
      >
        <ManropeText bold={true} style={{ color: white }}>
          Scannen
        </ManropeText>
      </Button>
    </View>
  );
};
