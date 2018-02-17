<template>
  <div id="app">
    <h1>Amazon Cognito Vuex Module Example</h1>
    <div>
      <div>Authenticating: {{ authenticating }}</div>
      <div>Authenticated: {{ authenticated ? authenticated.username : 'false' }}</div>
      <button v-if="authenticated" @click="signOut">Sign out</button>
    </div>
    <hr>
    <form @submit.prevent>
      <input v-model="email" type="email" placeholder="email">
      <input v-model="password" type="password" placeholder="password">
      <button @click="authenticateUser">Authenticate</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  created() {
    this.$store
      .dispatch('checkAuthentication')
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  },
  computed: {
    authenticating() {
      return this.$store.state.cognito.authenticating;
    },
    authenticated() {
      return this.$store.state.cognito.authenticated;
    }
  },
  methods: {
    authenticateUser() {
      this.$store
        .dispatch('authenticateUser', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          alert('authenticated');
        })
        .catch(error => alert(error));
    },
    signOut() {
      this.$store.dispatch('signOut');
    }
  }
};
</script>
