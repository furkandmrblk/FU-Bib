import * as SecureStorage from 'expo-secure-store';

const deviceStorage = {
  async set(key: string, value: string) {
    try {
      await SecureStorage.setItemAsync(key, value);
    } catch (error) {
      console.log('Secure Storage Error: ' + error);
    }
  },
  async get(key: string) {
    try {
      return await SecureStorage.getItemAsync(key);
    } catch (error) {
      console.log('Secure Storage Error: ' + error);
    }
  },
  async delete(key: string) {
    try {
      return await SecureStorage.deleteItemAsync(key);
    } catch (error) {
      console.log('Secure Storage Error: ' + error);
    }
  },
};

export default deviceStorage;
