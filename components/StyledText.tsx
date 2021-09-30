import * as React from 'react';

import { Text, TextProps } from './Themed';

type ManropeProps = {
  bold?: boolean;
};

type StyledTextProps = TextProps & ManropeProps;

export function ManropeText(props: StyledTextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: props.bold ? 'manropeBold' : 'manrope' },
      ]}
    />
  );
}
