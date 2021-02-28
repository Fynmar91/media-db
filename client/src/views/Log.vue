<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/" tag="button" class="btn btn-primary">Menü</router-link>
      </div>
    </div>
    <div class="row justify-content-center w-100 mt-3">
      <table class="table table-hover w-auto mx-auto">
        <thead>
          <th>Log-ID</th>
          <th>Datum</th>
          <th>Nachricht</th>
        </thead>
        <tbody>
          <tr v-for="item in logs" :key="item.log_id">
            <td class="align-middle">{{ item.log_id }}</td>
            <td class="align-middle">{{ formatDate(item.created) }}</td>
            <td class="align-middle">{{ item.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Log",
  props: {
    type: null,
  },
  data() {
    return {
      logs: JSON,
    };
  },
  methods: {
    formatDate: function(date) {
      console.log(date);
      if (date)
        return date
          .toString()
          .slice(0, 19)
          .replace("T", " ");
    },
  },
  mounted() {
    axios
      .get("http://" + process.env.VUE_APP_APIURL + "/api/log/")
      .then((response) => {
        this.logs = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
