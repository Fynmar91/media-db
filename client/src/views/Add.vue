<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/list" tag="button" class="btn btn-primary">Liste</router-link>
        <button tag="button" @click="addMedia()" class="btn btn-secondary">
          Speichern
        </button>
      </div>
    </div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="card mb-3 mx-4" style="width: 600px;">
        <div class="card-header" style="clear: both">
          <select class="custom-select col-4" v-model="input_type" style="float: left;">
            <option v-for="item in types" :key="item.type_id" :value="item.type_id" :selected="item.type_id == 1"> {{ item.name }}</option>
          </select>
          <div>
            <select class="custom-select col-4" v-model="input_status" style="float: right;">
              <option v-for="item in statuses" :key="item.status_id" :value="item.status_id" :selected="item.status_id == 4"> {{ item.name }}</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group">
            <input class="form-control form-control-lg w-25" type="text" placeholder="Staffel" id="inputLarge" style="float: right;" v-model="input_addition" />
            <input class="form-control form-control-lg w-75" type="text" placeholder="Name" id="inputLarge" v-model="input_name" />
            <input type="text" class="form-control" placeholder="Alternativer Name" id="inputDefault" v-model="input_altname" />
          </div>
        </div>
        <div class="form-group">
          <input class="form-control form-control-lg" type="text" placeholder="Bild URL" id="inputLarge" v-model="input_image" />
        </div>
        <ul class="list-group list-group-flush">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Jahr" id="inputDefault" v-model="input_year" />
          </div>
        </ul>
        <datepicker inputFormat="dd.MM.yyyy" v-model="picked" />
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
  data() {
    return {
      input_name: null,
      input_altname: null,
      input_addition: null,
      input_type: null,
      input_year: null,
      input_status: null,
      input_image: null,
      statuses: JSON,
      types: JSON,
    };
  },
  methods: {
    update: function() {
      axios
        .get("http://localhost:8181/api/status/")
        .then((response) => {
          this.statuses = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("http://localhost:8181/api/type/")
        .then((response) => {
          this.types = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("http://localhost:8181/api/media/" + this.id)
        .then((response) => {
          this.media = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addMedia: function() {
      axios
        .post("http://localhost:8181/api/media/insert/", {
          name: this.input_name,
          altname: this.input_altname,
          addition: this.input_addition,
          year: this.input_year,
          type: this.input_type,
          status: this.input_status,
          image: this.input_image,
        })
        .then((response) => {
          this.$router.push({ path: "/list" });
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
