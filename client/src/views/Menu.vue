<template>
  <div>
    <div class="row justify-content-center w-100 mt-5">
      <router-link to="/">
        <h1 class="text-center">MediaDB</h1>
      </router-link>
    </div>
    <div class="row justify-content-center w-100">
      <div class="btn-group-vertical mt-5 mx-4" style="width: 100%; max-width: 600px;">
        <router-link :to="{ name: 'List', params: { type: 0 } }" tag="button" class="btn btn-primary">Alle</router-link>
        <router-link :to="{ name: 'List', params: { type: 1 } }" tag="button" class="btn btn-secondary">Serien</router-link>
        <router-link :to="{ name: 'List', params: { type: 2 } }" tag="button" class="btn btn-secondary">Filme</router-link>
        <router-link :to="{ name: 'List', params: { type: 3 } }" tag="button" class="btn btn-secondary">Bücher</router-link>
        <router-link :to="{ name: 'List', params: { type: 4 } }" tag="button" class="btn btn-secondary">Webnovels</router-link>
        <router-link :to="{ name: 'List', params: { type: 5 } }" tag="button" class="btn btn-secondary">Anime</router-link>
        <router-link :to="{ name: 'List', params: { type: 6 } }" tag="button" class="btn btn-secondary">Anime-Filme</router-link>
        <router-link to="/log" tag="button" class="btn btn-secondary mt-3">Logs</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
