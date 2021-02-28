<template>
  <div class="row justify-content-center mb-3 mx-4">
    <div class="card h-100" style="width: 600px;">
      <div class="card-body pr-0">
        <div class="btn-group" style="width: 100%; max-width: 600px;">
          <div class="card-body p-0 col-11">
            <h4 class="card-title">{{ history.description }}</h4>
            <h6 class="card-subtitle text-muted">{{ date }}</h6>
          </div>
          <button type="button" @click="deleteHistory()" class="btn btn-outline-primary">🗑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "History",
  props: {
    history: JSON,
  },
  data() {
    return {
      date: this.history.date.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, "$3.$2.$1"),
    };
  },
  methods: {
    deleteHistory: function() {
      var result = confirm("Wirklich löschen?");
      if (result) {
        axios
          .delete("http://" + process.env.VUE_APP_APIURL + "/api/history/delete/" + this.history.history_id)
          .then((response) => {
            this.$emit("update");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
