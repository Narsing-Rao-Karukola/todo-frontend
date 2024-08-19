'use client';

import { Storage } from 'redux-persist';

function getLocalValue(key: string): string | null {
  const value = localStorage.getItem(key);
  return value ? value : null;
}

function setLocalValue(key: string, value: string) {
  localStorage.setItem(key, value);
}

function removeLocalItem(key: string) {
  localStorage.removeItem(key);
}

const reduxStorage: Storage = {
  setItem: (key: string, value: string): Promise<boolean> => {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string): string | null => {
    const value = localStorage.getItem(key);
    return value;
  },
  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const LOCAL_KEYS = {
  ACCESS_TOKEN: 'accessToken',
};

export { LOCAL_KEYS, reduxStorage, getLocalValue, setLocalValue, removeLocalItem };
