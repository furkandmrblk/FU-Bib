// Library Utilities

import deviceStorage from '../providers/deviceStorage';
import { LibraryProps } from './types';

let library: LibraryProps | undefined = undefined;

export const setLibrary = (lib: LibraryProps) => {
  library = lib;

  return library;
};

export const getLibrary = () => {
  return library;
};

let floor: string | undefined = undefined;

export const setFloor = (val: string) => {
  floor = val;

  return floor;
};

export const getFloor = () => {
  return floor;
};

// QRCode Utilities

export const getIdentifier = async () => {
  return await deviceStorage.get('tableIdentifier');
};
