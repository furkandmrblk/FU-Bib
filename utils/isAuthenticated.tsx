import create from 'zustand';
import * as SecureStore from 'expo-secure-store';

type AuthStore = {
  authenticated: string;
  loginUser(): void;
  logoutUser(): void;
};

export const useStore = create<AuthStore>((set) => ({
  authenticated: 'false',
  loginUser: () => set({ authenticated: 'true' }),
  logoutUser: () => set({ authenticated: 'false' }),
}));

export const authenticateUser = async () => {
  const isAuth: string = useStore((state) => state.authenticated);
  return await SecureStore.setItemAsync('authenticated', isAuth);
};

export const userIsAuthenticated = async () => {
  const auth: string | null = await SecureStore.getItemAsync('authenticated');
  const isAuth: boolean = JSON.parse(auth!);

  return isAuth;
};
