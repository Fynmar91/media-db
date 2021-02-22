<template>
  <div class="row justify-content-center mb-3 mx-4">
    <div class="card h-100" style="width: 600px;">
      <div class="card-body w-100">
        <button type="button" @click="addHistory()" class="btn btn-outline-success" style="float: right;">Speichern</button>
        <input class="form-control form-control-lg w-50" type="text" placeholder="Description" id="inputLarge" v-model="input_description" />
        <datepicker v-model="input_date" class="w-50" inputFormat="dd.MM.yyyy" />
      </div>
    </div>
  </div>
</template>

<script setup>
import datepicker from "vue3-datepicker";
import { ref } from "vue";
const input_date = ref(new Date());
</script>

<script>
import axios from "axios";

export default {
  name: "AddHistory",
  props: { id: null },
  data() {
    return {
      input_description: null,
      input_date: null,
    };
  },
  methods: {
    addHistory: function() {
      axios
        .post("http://localhost:8181/api/history/insert/", {
          media_id: this.id,
          description: this.input_description,
          date: this.input_date
            .toISOString()
            .slice(0, 19)
            .replace("T", " "),
        })
        .then((response) => {
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
