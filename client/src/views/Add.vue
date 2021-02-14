<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <router-link to="/list" tag="button" class="btn btn-primary" style="width: 100%; max-width: 600px;"
        >Liste</router-link
      >
    </div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="card mb-3 mx-3" style="width: 600px;">
        <div class="card-header" style="clear: both">
          <select class="custom-select col-4" style="float: left;">
            <option v-for="item in types" :key="item.type_id" :value="item.type_id" :selected="item.type_id == 1">
              {{ item.name }}</option
            >
          </select>
          <div>
            <select class="custom-select col-4" style="float: right;">
              <option
                v-for="item in statuses"
                :key="item.status_id"
                :value="item.status_id"
                :selected="item.status_id == 4"
              >
                {{ item.name }}</option
              >
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Name" id="inputLarge" />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="d-block user-select-none"
          width="100%"
          height="200"
          aria-label="Placeholder: Image cap"
          focusable="false"
          role="img"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 318 180"
          style="font-size:1.125rem;text-anchor:middle"
        >
          <rect width="100%" height="100%" fill="#868e96"></rect>
          <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
        </svg>
        <ul class="list-group list-group-flush">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Jahr" id="inputDefault" />
          </div>
        </ul>
        <datepicker v-model="picked" />
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
  name: "Add",
  props: {},
  data() {
    return {
      statuses: JSON,
      types: JSON,
    };
  },
  methods: {
    update: function() {
      axios
        .get("http://localhost:8181/api/media/" + this.id)
        .then((response) => {
          this.media = response.data;
          axios
            .get("http://localhost:8181/api/status/")
            .then((response) => {
              this.statuses = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
          axios
            .get("http://localhost:8181/api/types/")
            .then((response) => {
              this.types = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
