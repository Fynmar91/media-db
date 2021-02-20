<template>
  <div class="row justify-content-center mb-3 mx-4">
    <div class="card h-100" style="width: 600px;">
      <div class="card-body w-50">
        <input class="form-control form-control-lg" type="text" placeholder="Description" id="inputLarge" v-model="input_description" />
        <datepicker v-model="picked" inputFormat="dd.MM.yyyy" />
      </div>
    </div>
  </div>
</template>

<script setup>
import datepicker from "vue3-datepicker";
import { ref } from "vue";
const picked = ref(new Date());
</script>

<script>
import axios from "axios";

export default {
  name: "AddHistory",
  props: {},
  data() {
    return {
      input_description: null,
      input_date: null,
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
