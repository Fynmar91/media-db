<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/" tag="button" class="btn btn-primary">Menü</router-link>
        <router-link :to="{ name: 'Add', params: { type: type } }" tag="button" class="btn btn-secondary">Hinzufügen</router-link>
      </div>
    </div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="col-12">
        <div class="row justify-content-center">
          <select class="custom-select col-2 mx-2" v-model="filterStatus" style="min-width: 150px; max-width: 150px;">
            <option v-for="item in statuses" :key="item" :value="item" :selected="item == null">{{ item }}</option>
          </select>
        </div>
        <table class="table table-hover w-auto mx-auto">
          <thead>
            <th @click="sort('name')">Name</th>
            <th @click="sort('addition')" v-if="setRenderAddition">Staffel</th>
            <th @click="sort('year')">Jahr</th>
            <th @click="sort('status')">Status</th>
          </thead>
          <tbody>
            <tr v-for="item in sortedMedia" @click="onRowClick(item.media_id)" :key="item.media_id">
              <td class="align-middle">{{ item.name }}</td>
              <td class="align-middle" v-if="setRenderAddition">{{ item.addition }}</td>
              <td class="align-middle">{{ item.year }}</td>
              <td class="align-middle">{{ item.status }}</td>
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
  name: "List",
  props: {
    type: null,
  },
  data() {
    return {
      list: JSON,
      currentSort: "name",
      currentSortDir: "asc",
      statuses: [],
      loaded: false,
      filterStatus: "",
    };
  },
  computed: {
    setRenderAddition: function() {
      switch (this.type) {
        case "1":
          return true;
        case "2":
        case "3":
          return false;
        default:
          return false;
      }
    },
    sortedMedia: function() {
      if (this.loaded && this.statuses.length != 0) {
        return this.list
          .sort((a, b) => {
            let modifier = 1;
            if (this.currentSortDir === "desc") modifier = -1;
            if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          })
          .filter((row) => {
            const media = row.status ? row.status.toString().toLowerCase() : "";
            const searchTerm = this.filterStatus ? this.filterStatus.toLowerCase() : "";
            if (searchTerm == "") return 1;
            return media.includes(searchTerm);
          });
      }
    },
  },
  methods: {
    onRowClick(id) {
      this.$router.push({ path: "/media/" + id });
    },
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
  },
  mounted() {
    axios
      .get("http://" + process.env.VUE_APP_APIURL + "/api/media/type/" + this.type)
      .then((response) => {
        this.list = response.data;
        axios
          .get("http://" + process.env.VUE_APP_APIURL + "/api/status/")
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
