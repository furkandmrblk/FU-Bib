/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
// import TabTwoScreen from '../screens/TabTwoScreen';
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
import * as SecureStore from 'expo-secure-store';
import AuthReducer, { Context, initialState } from '../utils/reducer';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const client = createApolloClient(initialState);
  let localState: boolean | undefined = undefined;

  if (typeof window !== 'undefined') {
    const authPromise = SecureStore.getItemAsync('authenticated');
    if (typeof authPromise == 'string') {
      localState = JSON.parse(authPromise);
    }
  }

  const [authenticated, dispatch] = useReducer(
    AuthReducer,
    localState || initialState
  );

  useEffect(() => {
    SecureStore.setItemAsync('authenticated', JSON.stringify(authenticated));
  }, [authenticated]);

  return (
    <ApolloProvider client={client}>
      <Context.Provider
        value={{
          authState: authenticated,
          authDispatch: dispatch,
        }}
      >
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <RootNavigator />
        </NavigationContainer>
      </Context.Provider>
    </ApolloProvider>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const authContext = useContext(Context);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(authContext!.authState);
  });

  return (
    <Stack.Navigator>
      {!auth && (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
      )}
      {!auth && (
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
      )}
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
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <FontAwesome
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabThreeScreen}
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
