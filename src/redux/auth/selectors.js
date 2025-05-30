export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectAuthenticated = (state) =>
  state.auth.token !== null && state.auth.isLoggedIn;
