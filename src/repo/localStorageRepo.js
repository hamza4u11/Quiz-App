// src/repo/localStorageRepo.js

const LocalStorageRepo = {
  // Save data (stringify before storing)
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  // Get data (parse when retrieving)
  get: (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  // Update existing data
  update: (key, newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  },

  // Remove specific key
  remove: (key) => {
    localStorage.removeItem(key);
  },

  // Clear all localStorage
  clearAll: () => {
    localStorage.clear();
  }
};

export default LocalStorageRepo;
