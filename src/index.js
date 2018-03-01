import Config from 'aws-sdk/clients/configservice';
import { CognitoIdentityCredentials } from 'aws-sdk/global';

import mutations from './mutations';
import actions from './actions';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';

export default function AmazonCognitoVuexModule(configuration) {
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
    mutations,
    actions
  };
}
