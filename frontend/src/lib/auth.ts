export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('truthlens_token', token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('truthlens_token');
  }
  return null;
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('truthlens_token');
  }
};
