import { createContext } from 'react';

export const initialState: any = false;

export interface AppContextInterface {
  authState: boolean;
  authDispatch: (value: string) => void;
}

const AuthReducer = (state: boolean, action: string) => {
  switch (action) {
    case 'login':
      return true;
    case 'logout':
      return false;
    default:
      return state;
  }
};

export default AuthReducer;

export const Context = createContext<AppContextInterface | null>(null);
