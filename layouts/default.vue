<template>
  <v-app dark>
    <v-content class="layout-container">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Trump says'
    };
  }
};
</script>

<style type="scss">
.layout-container {
  background-size: cover;
  background: url('https://images.unsplash.com/photo-1589059214154-e8edfcc09e4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2036&q=80')
    no-repeat fixed center center;
  align-items: center;
}
</style>
