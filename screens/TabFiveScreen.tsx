import { useMutation, useQuery } from '@apollo/client';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { UpperBody } from '../components/Body/UpperBody';
import Button from '../components/Button/Button';
import { Header } from '../components/Header/Header';
import { PatternLeft } from '../components/Patterns/PatternLeft';
import { ManropeText } from '../components/StyledText';
import { View } from '../components/Themed';
import { Formik } from 'formik';
import { Feather } from '@expo/vector-icons';
import {
  crimson80,
  emerald100,
  grayTransparent,
  peach100,
  purple100,
  purple80,
  white,
} from '../constants/Colors';
import { getCurrentUser } from './TabThreeScreen';
import { gql } from '@apollo/client';
import deviceStorage from '../providers/deviceStorage';
import { RootTabScreenProps } from '../types';
import { Pressable } from 'react-native';
import Input from '../components/Input/Input';
import { useNavigation } from '@react-navigation/core';
import { useIsAuthenticated } from '../providers/Auth';
import {
  bodyContainerStyle,
  bodyTitleStyle,
  containerStyle,
  headerTitleStyle,
} from '../utils/styles';
import { UserProfile } from '../components/Statistics & Information/UserProfile';
import { refresh } from '../utils/refresh';

export type UserProps = {
  id?: string;
  email: string;
  password?: string;
  admin?: boolean;
  name: string;
  major: string;
  booked?: boolean;
  tableIdentifier?: string | null;
  mostUserLibrary: string | null;
  mostUsedTable: string | null;
  reservations: number | null;
  extensions: number | null;
  strikes: number | null;
  softban?: boolean;
};

export default function TabFiveScreen() {
  const { onRefresh, refreshing } = refresh('TabFive');

  const userData = useQuery(getCurrentUser);

  return (
    <>
      <Header />
      <ScrollView
        style={{ backgroundColor: white }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={containerStyle.container}>
          <UpperBody>
            {!userData.loading && userData.data && (
              <ManropeText bold={true} style={headerTitleStyle.title}>
                {userData.data.getCurrentUser.email}
              </ManropeText>
            )}
            <PatternLeft one={true} />
          </UpperBody>
          <UserProfile userData={userData} />
        </View>
      </ScrollView>
    </>
  );
}
