# Amazon Cognito Vuex Module
> Vuex module for Amazon Cognito

## Installation

```
npm install amazon-cognito-vuex-module --save
```

```
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import { AmazonCognitoVuexModule } from 'amazon-cognito-vuex-module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cognito: new AmazonCognitoVuexModule({
      region: '<region>',
      userPoolId: '<user pool id>',
      clientId: '<client id>'
    })
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  store
});

```
