import Config from 'aws-sdk/clients/configservice';
import { CognitoIdentityCredentials } from 'aws-sdk/global';

import actions from './actions';

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
      authenticating: false,
      authenticated: null
    },
    mutations: {
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
    },
    actions
  };
}
