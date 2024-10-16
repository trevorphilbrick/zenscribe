import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom Async Storage to be used with Zustand
export const zustandAsyncStorage = {
  getItem: async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error("Failed to get item from AsyncStorage", e);
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      console.error("Failed to set item in AsyncStorage", e);
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.error("Failed to remove item from AsyncStorage", e);
    }
  },
};
