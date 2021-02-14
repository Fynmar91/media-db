<template>
  <div>
    <div class="row justify-content-center w-100 mt-5">
      <router-link to="/">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h1>MediaDB</h1>
      </router-link>
    </div>
    <div class="row justify-content-center w-100">
      <div class="btn-group-vertical mt-5 mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/" tag="button" class="btn btn-primary">Home</router-link>
        <router-link to="/list" tag="button" class="btn btn-secondary">Liste</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
