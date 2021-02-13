<template>
  <div class="center">
    <router-link to="/menu">
      <img alt="Vue logo" src="../assets/logo.png" />
      <h1>MediaDB</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  margin-top: -100px; /* Half the height */
  margin-left: -100px; /* Half the width */
  text-align: center;
}
</style>
