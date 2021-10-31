import React from 'react';
import { StyleSheet } from 'react-native';
import {
  black100,
  emerald100,
  emerald80,
  grayTransparent,
  greenTransparent,
} from '../constants/Colors';
import { subtitleThree, textThree, textTwo } from '../constants/Fonts';

// Gradient

export const gradientStyle = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 2,
    borderRadius: 7,
  },
});

// Headers

export const headerTitleStyle = StyleSheet.create({
  title: {
    color: black100,
    fontSize: subtitleThree,
    marginBottom: 10,
  },
});

// Body

export const bodyTitleStyle = StyleSheet.create({
  bodyTitle: {
    fontSize: textTwo,
    marginBottom: 10,
  },
});

export const bodySubtitleStyle = StyleSheet.create({
  bodySubtitle: {
    fontSize: textThree,
    marginBottom: 10,
  },
});

// Containers & Wraps

export const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
});

export const bodyContainerStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',

    maxHeight: 470,
    backgroundColor: grayTransparent,
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 12.5,
    overflow: 'hidden',
  },
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 460,
    padding: 2,

    borderRadius: 7,
    marginBottom: 10,
  },
});

export const validatedContainerStyle = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: greenTransparent,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: emerald100,
    padding: 15,
  },
});

// Modals

export const modalStyles = StyleSheet.create({
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
    backgroundColor: grayTransparent,
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 16,
  },
  modalTitle: {
    color: black100,
    fontSize: subtitleThree,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  text: {
    color: black100,
    fontSize: textThree,
  },
});

// QR

export const qrScannerStyles = StyleSheet.create({
  scanContainer: {
    height: '82.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperContainer: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  bottomContainer: {
    height: '7.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconBackground: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: grayTransparent,
  },
});

// QR-PopUp

export const qrPopUpStyles = StyleSheet.create({
  popUp: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: emerald80,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 80,
  },
});
