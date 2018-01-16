import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import { AmazonCognitoVuexModule } from 'amazon-cognito-vuex-module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cognito: new AmazonCognitoVuexModule({
      region: 'eu-west-2',
      userPoolId: 'eu-west-2_QaRiPYsjl',
      clientId: '2dslq6qn4dmdiqbm95fsvtuc0s'
    })
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  store
});
