export default {
  setAuthenticating(state, authenticating) {
    state.authenticating = authenticating;
  },
  setAuthenticated(state, payload) {
    state.authenticated = payload;
  },
  setAttributes(state, attributes) {
    state.authenticated = {
      ...state.authenticated,
      attributes
    };
  }
};
