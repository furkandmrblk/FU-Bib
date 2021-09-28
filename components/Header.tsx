import * as React from 'react';
import { StyleSheet } from 'react-native';
import { peach100, peach80 } from '../constants/Colors';
import { Logo } from './Logo';
import { View, Text } from './Themed';

type HeaderProps = {
    logoColor?: string,
    upperColor?: string,
    lowerColor?: string,
}

export const Header = (props: HeaderProps) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          },
        patternWrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        upperPattern: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: 23,
            width: 163,
            backgroundColor: props.upperColor || peach100,
            borderBottomLeftRadius: 5,
        },
        lowerPattern: {
            position: 'absolute',
            top: 0,
            right: 0,
            height: 30,
            width: 143,
            backgroundColor: props.lowerColor || peach80,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            marginTop: 5,
        }
    });

    return (
        <View style={styles.container}>
            <Logo color={props.logoColor} />
            <View style={styles.patternWrapper}>
             <View style={styles.upperPattern} />
             <View style={styles.lowerPattern} />
            </View>
        </View>
    )
}