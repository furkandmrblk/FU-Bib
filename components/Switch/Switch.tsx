import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { peach100, purple100, white } from '../../constants/Colors';

type ToggleProps = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Toggle = ({ toggle, setToggle }: ToggleProps) => {
  const toggleSwitch = () => setToggle((prevState) => !prevState);

  return (
    <Switch
      trackColor={{ false: `${peach100}`, true: `${purple100}` }}
      thumbColor={toggle ? `${white}` : `${white}`}
      ios_backgroundColor="#999"
      onValueChange={toggleSwitch}
      value={toggle}
    />
  );
};
