export type LibraryProps = {
  id: string;
  section: string;
  name: string;
  adress: string;
  email: string;
  floor?: string[];
  website?: string;
};

// Library Utilities

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
