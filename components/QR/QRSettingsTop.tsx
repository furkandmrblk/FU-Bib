import React from 'react';
import { View, ViewProps } from '../Themed';
import { MaterialIcons } from '@expo/vector-icons';
import { Toggle } from '../Switch/Switch';
import { TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { purple100 } from '../../constants/Colors';
import { qrScannerStyles } from '../../utils/styles';

type QRProps = {
  toggleQR: boolean;
  setToggleQR: React.Dispatch<React.SetStateAction<boolean>>;
  setHasPermission: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type QRSettingsTopProps = QRProps & ViewProps;

export const QRSettingsTop = ({
  toggleQR,
  setToggleQR,
  setHasPermission,
  ...props
}: QRSettingsTopProps) => {
  return (
    <View style={[qrScannerStyles.upperContainer]} {...props}>
      <Toggle toggle={toggleQR} setToggle={setToggleQR} />
      <TouchableOpacity
        style={[
          qrScannerStyles.iconBackground,
          {
            marginLeft: 10,
          },
        ]}
        onPress={async () => {
          // isn't working rn
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        }}
      >
        <MaterialIcons
          name="admin-panel-settings"
          size={25}
          color={purple100}
        />
      </TouchableOpacity>
    </View>
  );
};
