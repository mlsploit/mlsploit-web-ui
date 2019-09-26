import { tokenStore } from '../store.js';

export const TOKEN_KEY = 'token';
export const NO_TOKEN = null;

let storageEventListenerForTokenCreated = false;

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  tokenStore.set(token);
};

export const purgeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  tokenStore.set(NO_TOKEN);
};

export const loadTokenFromStorage = () => {
  const token = localStorage.getItem(TOKEN_KEY) || NO_TOKEN;
  tokenStore.set(token);
  return token;
};

export const createStorageEventListenerForToken = () => {
  if (!storageEventListenerForTokenCreated) {
    window.addEventListener('storage', (e) => {
      const newToken = e.storageArea.token || NO_TOKEN;
      tokenStore.set(newToken);
    });

    storageEventListenerForTokenCreated = true;
  }
};
