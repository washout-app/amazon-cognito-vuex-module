import Config from 'aws-sdk/clients/configservice';

import mutations from './mutations';
import actions from './actions';

import { CognitoUserPool } from 'amazon-cognito-identity-js';

export default function AmazonCognitoVuexModule(configuration) {
  Config.region = configuration.region;
  return {
    state: {
      pool: new CognitoUserPool({
        UserPoolId: configuration.userPoolId,
        ClientId: configuration.clientId
      }),
      authenticating: false,
      authenticated: null
    },
    mutations,
    actions
  };
}
