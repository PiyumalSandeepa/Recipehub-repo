// src/utils/auth.js
export const getCurrentUser = () => {
  const stored = localStorage.getItem('user');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

export const setCurrentUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem('user');
};