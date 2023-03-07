export const getTokenFromStorage = () => {
  // return import.meta.env.VITE_GITHUB_TOKEN;
  return localStorage.getItem("token") || null;
};

export const getGithubAuthHeader = () => `Bearer ${getTokenFromStorage()}`;
