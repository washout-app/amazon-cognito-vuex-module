import Config  from 'aws-sdk/clients/configservice';
import { CognitoIdentityCredentials } from 'aws-sdk/global';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';

export function AmazonCognitoVuexModule(configuration) {
  Config.region = configuration.region;
  const pool = new CognitoUserPool({
    UserPoolId: configuration.userPoolId,
    ClientId: configuration.clientId
  });
  return {
    state: {
      authenticated: null
    },
    mutations: {
      setAuthenticated(state, payload) {
        state.authenticated = payload;
      },
      setAttributes(state, attributes) {
        state.authenticated = {
          ...state.authenticated,
          attributes
        };
      }
    },
    actions: {
      /* Check whether user is authenticated */
      checkAuthentication({ commit }) {
        return new Promise((resolve, reject) => {
          const user = pool.getCurrentUser();
          if (user == null) {
            commit('setAuthenticated', null);
            reject('Unauthenticated');
          } else {
            user.getSession((error, session) => {
              if (error) {
                commit('setAuthenticated', null);
                reject('Session error');
              } else {
                commit('setAuthenticated', user);
                resolve('Authenticated');
              }
            });
          }
        });
      },
      /* Authenticate user and establish session */
      authenticateUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
          const email = payload.email;
          const password = payload.password;
          const user = new CognitoUser({
            Username: email,
            Pool: pool
          });
          user.authenticateUser(
            new AuthenticationDetails({
              Username: email,
              Password: password
            }),
            {
              onFailure: error => {
                reject(error);
              },
              onSuccess: session => {
                commit('setAuthenticated', user);
                resolve('Authenticated');
              }
            }
          );
        });
      },
      /* Get attributes for the authenticated user */
      getUserAttributes({ commit }) {
        return new Promise((resolve, reject) => {
          const user = pool.getCurrentUser();
          if (user == null) {
            reject('Unauthenticated');
          } else {
            user.getSession((error, session) => {
              if (error) {
                reject(error);
              } else {
                user.getUserAttributes((error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    const attributes = {};
                    result.forEach(attribute => {
                      attributes[attribute.getName()] = attribute.getValue();
                    });
                    commit('setAttributes', attributes);
                    resolve('Attributes fetched');
                  }
                });
              }
            });
          }
        });
      },
      /* Change password of the currently authenticated user (given the old and new passwords) */
      changePassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
          const currentPassword = payload.currentPassword;
          const newPassword = payload.newPassword;
          const user = pool.getCurrentUser();
          if (user == null) {
            reject('Unauthenticated');
          } else {
            user.getSession((error, session) => {
              if (error) {
                reject(error);
              } else {
                user.changePassword(
                  currentPassword,
                  newPassword,
                  (error, result) => {
                    if (error) {
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  }
                );
              }
            });
          }
        });
      },
      /* Initiate lost password procedure (send verification code to user) */
      forgotPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
          const email = payload.email;
          const user = new CognitoUser({
            Username: email,
            Pool: pool
          });
          user.forgotPassword({
            onSuccess: result => {
              resolve(result);
            },
            onFailure: function(error) {
              reject(error);
            }
          });
        });
      },
      /* Confirm a new password for a given email, verification code (from lost password) and new password triplet */
      confirmPassword({ commit }, payload) {
        return new Promise((resolve, reject) => {
          const email = payload.email;
          const verificationCode = payload.verificationCode;
          const newPassword = payload.newPassword;
          const user = new CognitoUser({
            Username: email,
            Pool: pool
          });
          user.confirmPassword(verificationCode, newPassword, {
            onSuccess: result => {
              resolve(result);
            },
            onFailure: function(error) {
              reject(error);
            }
          });
        });
      },
      /* Sign up a new user for a given email and password (then sends registration verification code) */
      signUp({ commit }, payload) {
        const email = payload.email;
        const password = payload.password;
        return new Promise((resolve, reject) => {
          const attributes = [
            new CognitoUserAttribute({
              Name: 'email',
              Value: email
            })
          ];
          pool.signUp(email, password, attributes, null, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const user = result.user;
              resolve(user);
            }
          });
        });
      },
      /* Confirm a registration for a given email and registration verification code */
      confirmRegistration({ commit }, payload) {
        return new Promise((resolve, reject) => {
          const email = payload.email;
          const verificationCode = payload.verificationCode;
          const user = new CognitoUser({
            Username: email,
            Pool: pool
          });
          user.confirmRegistration(verificationCode, true, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      },
      /* Re-send the registration verification code */
      resendConfirmationCode({ commit }, payload) {
        return new Promise((resolve, reject) => {
          const email = payload.email;
          const user = new CognitoUser({
            Username: email,
            Pool: pool
          });
          user.resendConfirmationCode((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      },
      /* Sign out user */
      signOut({ commit }) {
        const user = pool.getCurrentUser();
        if (user != null) {
          user.signOut();
          commit('setAuthenticated', null);
        }
      }
    }
  };
}
