export const StorageService = {
  saveToStorage(key, value) {
    if (process.client && value) {
      localStorage.setItem(key, value);
    }
  },

  deleteFromStorage(key) {
    if (process.client) {
      localStorage.removeItem(key);
    }
  },

  getFromStorage(key) {
    if (process.client) {
      return localStorage.getItem(key);
    }
  },
};
