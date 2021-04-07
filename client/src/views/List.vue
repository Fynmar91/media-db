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
          <div class="form-group mr-2">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" value="Fertig" v-model="checkbox_status" id="customCheck1" />
              <label class="custom-control-label" for="customCheck1">Fertig</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" value="Warteschlange" v-model="checkbox_status" id="customCheck2" />
              <label class="custom-control-label" for="customCheck2">Warteschlange</label>
            </div>
          </div>
          <div class="form-group">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" value="Angefangen" v-model="checkbox_status" id="customCheck3" />
              <label class="custom-control-label" for="customCheck3">Angefangen</label>
            </div>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" value="Abgebrochen" v-model="checkbox_status" id="customCheck4" />
              <label class="custom-control-label" for="customCheck4">Abgebrochen</label>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="form-group" style="width: 100%; max-width: 600px;">
            <input class="form-control form-control-sm" @keyup.enter="searchM" v-model="search" type="text" placeholder="Suche" id="inputSmall" />
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="form-group" style="width: 100%; max-width: 600px;">
            <button type="button" class="btn btn-primary btn-sm" @click="sort('created')">Aktivität</button>
            <button type="button" class="btn btn-primary btn-sm" style="float: right;">
              {{ currentSortDir == "desc" ? "▼" : "▲" }}
            </button>
          </div>
        </div>
        <table class="table table-hover w-auto mx-auto" style="width: 100%; max-width: 600px;">
          <thead>
            <th class="rating-header"></th>
            <th @click="sort('name')">Name</th>
            <th @click="sort('addition')" v-if="setRenderAddition">Staffel</th>
            <th @click="sort('year')">Jahr</th>
            <th @click="sort('status')">Status</th>
            <th class="rating-header"></th>
          </thead>
          <tbody>
            <tr v-for="item in sortedMedia" @click="onRowClick(item.media_id)" :key="item.media_id">
              <td :class="ratingClass(item.rating)"></td>
              <td class="align-middle">{{ item.name }}</td>
              <td class="align-middle" v-if="setRenderAddition">{{ item.addition }}</td>
              <td class="align-middle">{{ item.year }}</td>
              <td class="align-middle">{{ item.status }}</td>
              <td :class="ratingClass(item.rating)"></td>
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
      currentSort: "created",
      currentSortDir: "desc",
      statuses: [],
      loaded: false,
      filterStatus: "Angefangen",
      checkbox_status: [],
      search: "",
      searchCommit: "",
    };
  },
  computed: {
    setRenderAddition: function() {
      switch (this.type) {
        case "0":
        case "1":
        case "3":
        case "5":
          return true;
        case "2":
        case "4":
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
            if (this.checkbox_status.length == 0) return 1;
            return this.checkbox_status.some((substring) => media.includes(substring.toLowerCase()));
          })
          .filter((row) => {
            const searchTerm = this.searchCommit.toLowerCase();
            console.log(searchTerm);
            if (searchTerm == "") return 1;
            const media = JSON.stringify(Object.values(row)).toLowerCase();
            console.log(media);
            return media.includes(searchTerm);
          });
      }
    },
  },
  methods: {
    ratingClass(rating) {
      switch (rating) {
        case 100:
          return "rating-green";
        case 50:
        case 75:
          return "rating-yellow";
        case 0:
        case 25:
          return "rating-red";
        default:
          return "rating-null";
      }
    },
    onRowClick(id) {
      this.$router.push({ name: "Media", params: { source_type: this.type, id: id } });
    },
    sort: function(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    searchM: function(s) {
      this.searchCommit = this.search;
    },
  },
  mounted() {
    let target = "/api/media/";
    if (this.type != 0) target += "type/" + this.type;
    axios
      .get("http://" + process.env.VUE_APP_APIURL + target)
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
<style scoped>
.rating-green {
  width: 3px;
  padding: 0;
  background-color: rgb(78, 211, 52);
}
.rating-yellow {
  width: 3px;
  padding: 0;
  background-color: rgb(200, 211, 52);
}
.rating-red {
  width: 3px;
  padding: 0;
  background-color: rgb(211, 52, 52);
}
.rating-null {
  width: 3px;
  padding: 0;
  background-color: rgba(211, 52, 52, 0);
}
.rating-header {
  padding: 0;
}
</style>
