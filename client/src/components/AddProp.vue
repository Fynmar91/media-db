<template>
  <div class="row justify-content-center mb-3 mx-4">
    <div class="card h-100" style="width: 600px;">
      <div class="card-body w-100">
        <button type="button" @click="addProp()" class="btn btn-outline-success" style="float: right;">Speichern</button>
        <select class="custom-select w-50" v-model="input_proptype">
          <option v-for="item in prop_types" :key="item.proptype_id" :value="item.proptype_id"> {{ item.name }}</option>
        </select>
        <input class="form-control form-control-lg w-50" type="text" placeholder="Description" id="inputLarge" v-model="input_value" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddProp",
  props: { id: null },
  data() {
    return {
      prop_types: JSON,
      input_proptype: null,
      input_value: null,
    };
  },
  methods: {
    addProp: function() {
      axios
        .post("http://" + process.env.VUE_APP_APIURL + "/api/prop/insert/", {
          media_id: this.id,
          proptype_id: this.input_proptype,
          value: this.input_value,
        })
        .then((response) => {
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    axios
      .get("http://" + process.env.VUE_APP_APIURL + "/api/proptype/")
      .then((response) => {
        this.prop_types = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
