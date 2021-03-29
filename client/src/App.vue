<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
@font-face {
  font-family: "Lato";
  src: local("Lato"), url(./fonts/Lato/Lato-Regular.ttf) format("truetype");
}

body {
  font-family: "Lato", Helvetica, Arial;
  background-color: #202326;
}
.card {
  background-color: #282828;
}
.list-group-item {
  background-color: #393939;
}
.row {
  margin-right: auto;
  margin-left: auto;
}
</style>
