<template>
  <div class="row justify-content-center mb-3 mx-4">
    <div class="card h-100" style="width: 600px;">
      <div class="card-body">
        <button type="button" @click="deleteHistory()" class="btn btn-outline-danger" style="float: right;">🗑</button>
        <h4 class="card-title">{{ history.description }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ history.date }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  props: {
    history: JSON,
    parent: null,
  },
  methods: {
    deleteHistory: function() {
      axios
        .delete("http://localhost:8181/api/media/history/delete/" + this.history.history_id)
        .then((response) => {
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mounted() {
      console.log("Parent:");
      console.log(parent);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
