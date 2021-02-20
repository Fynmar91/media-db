<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/" tag="button" class="btn btn-primary">Home</router-link>
        <router-link to="/add" tag="button" class="btn btn-secondary">Hinzufügen</router-link>
      </div>
    </div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="col-12">
        <div class="row justify-content-center">
          <select class="custom-select col-2 mx-2" v-model="filterType" style="min-width: 150px; max-width: 150px;">
            <option v-for="item in types" :key="item" :value="item" :selected="item == null">{{ item }}</option>
          </select>
          <select class="custom-select col-2 mx-2" v-model="filterStatus" style="min-width: 150px; max-width: 150px;">
            <option v-for="item in statuses" :key="item" :value="item" :selected="item == null">{{ item }}</option>
          </select>
        </div>
        <table class="table table-hover w-auto mx-auto">
          <thead>
            <th @click="sort('type')">Typ</th>
            <th @click="sort('name')">Name</th>
            <th @click="sort('year')">Jahr</th>
            <th @click="sort('status')">Status</th>
          </thead>
          <tbody>
            <tr v-for="item in sortedMedia" :key="item.media_id">
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
              <td class="align-middle">{{ statuses[item.status] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      currentSort: "name",
      currentSortDir: "asc",
      types: [],
      statuses: [],
      loaded: false,
      filterType: "",
      filterStatus: "",
    };
  },
  computed: {
    sortedMedia: function() {
      if (this.loaded && this.types.length != 0 && this.statuses.length != 0) {
        return this.list
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === "desc") modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          })
          .filter((row) => {
            const media = row.type ? this.types[row.type].toString().toLowerCase() : "";
            const searchTerm = this.filterType ? this.filterType.toLowerCase() : "";
            if (searchTerm == "") return 1;
            return media.includes(searchTerm);
          })
          .filter((row) => {
            const media = row.status ? this.statuses[row.status].toString().toLowerCase() : "";
            const searchTerm = this.filterStatus ? this.filterStatus.toLowerCase() : "";
            if (searchTerm == "") return 1;
            return media.includes(searchTerm);
          });
      }
    },
  },
  methods: {
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
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
          .get("http://localhost:8181/api/type/")
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
        this.loaded = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
