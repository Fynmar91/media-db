<template>
  <div class="row justify-content-center w-100">
    <div class="col-8">
      <div class="row justify-content-center w mt-3">
        <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
          <router-link to="/" tag="button" class="btn btn-primary">Home</router-link>
          <router-link to="/add" tag="button" class="btn btn-secondary">Hinzufügen</router-link>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <select class="custom-select mw-100 col-2">
          <option v-for="item in types" :key="item" value="{{item}}" :selected="item == null">{{ item }}</option>
        </select>
        <select class="custom-select mw-100 col-2">
          <option v-for="item in statuses" :key="item" value="{{item}}" :selected="item == null">{{ item }}</option>
        </select>
        <select class="custom-select mw-100 col-2">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <select class="custom-select mw-100 col-2">
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <table class="table table-hover w-auto mx-auto">
        <thead>
          <th>Typ</th>
          <th>Name</th>
          <th>Jahr</th>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.media_id">
            <td>
              <router-link
                :to="{ name: 'Media', params: { id: item.media_id } }"
                tag="button"
                class="btn btn-outline-primary"
                :class="typeClass(item.type)"
                >{{ types[item.type] || "Leer" }}</router-link
              >
            </td>
            <td class="align-middle">{{ item.name }}</td>
            <td class="align-middle">{{ item.year }}</td>
          </tr>
        </tbody>
      </table>
      <div>{{ types }}</div>
      <div>{{ statuses }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  data() {
    return {
      list: JSON,
      types: [],
      statuses: [],
    };
  },
  methods: {
    typeClass: function(type) {
      switch (type) {
        case 1:
          return "btn-outline-primary";
        case 2:
          return "btn-outline-success";
        default:
          return "btn-outline-secondary";
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:8181/api/media/")
      .then((response) => {
        this.list = response.data;
        axios
          .get("http://localhost:8181/api/types/")
          .then((response) => {
            response.data.forEach((element) => {
              this.types[element.type_id] = element.name;
            });
          })
          .catch((error) => {
            console.log(error);
          });
        axios
          .get("http://localhost:8181/api/status/")
          .then((response) => {
            response.data.forEach((element) => {
              this.statuses[element.status_id] = element.name;
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
