import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabFourScreen from '../screens/TabFourScreen';
import TabFiveScreen from '../screens/TabFiveScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { MaterialIcons } from '@expo/vector-icons';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '../utils/apollo';
import { useIsAuthenticated } from '../providers/Auth';

export default function Navigation() {
  let initialState: any = false;
  const client = createApolloClient(initialState);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useIsAuthenticated();
  const navigation = useNavigation();

  useEffect(() => {
    auth && navigation.navigate('Root', { screen: 'TabOne' });
  }, [auth]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />

      {auth && (
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Home',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={32} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="book-online" size={32} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: 'Tab Three',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="qr-code-2" size={32} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourScreen}
        options={{
          title: 'Tab Four',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info-outline" size={32} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFive"
        component={TabFiveScreen}
        options={{
          title: 'Tab Four',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={32} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
