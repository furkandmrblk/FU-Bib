import React, { useContext } from 'react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import deviceStorage from './deviceStorage';
type AuthContext = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  isLoading: false,
  setAuthenticated: () => {},
});

interface Props {
  children: ReactNode;
}
export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  const initializeAuth = async (): Promise<void> => {
    // console.log(await SecureStorage.getItemAsync('session'));
    const res = await fetch('http://localhost:4000/api/checkAuth', {
      credentials: 'include',
      method: 'GET',
      //@ts-ignore
      headers: {
        session: await deviceStorage.get('session'),
      },
    });
    // console.log(res.status);

    setAuthenticated(res.status === 200);
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsAuthenticated(): boolean {
  const context = useAuth();
  return context.isAuthenticated;
}

export function useIsAuthCheckLoading(): boolean {
  const context = useAuth();
  return context.isLoading;
}
