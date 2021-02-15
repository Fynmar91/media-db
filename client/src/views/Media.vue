<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <router-link to="/list" tag="button" class="btn btn-primary" style="width: 100%; max-width: 600px;"
        >Liste</router-link
      >
    </div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="card mb-3 mx-3" style="width: 600px;">
        <div class="row mx-0" style="width: 600px;">
          <div class="col-6 card-header" style="clear: both" @dblclick="click_type">
            <div>
              <select v-if="edit_type" @change="change_type($event)" class="custom-select col-8">
                <option
                  v-for="item in types"
                  :key="item.type_id"
                  :value="item.type_id"
                  :selected="item.type_id == media.type"
                >
                  {{ item.name }}</option
                >
              </select>
              <h3 v-else style="float: left;">{{ type || "Leer" }}</h3>
            </div>
          </div>
          <div class="col-6 card-header" style="clear: both" @dblclick="click_status">
            <div>
              <select
                v-if="edit_status"
                @change="change_status($event)"
                class="custom-select col-8"
                style="float: right;"
              >
                <option
                  v-for="item in statuses"
                  :key="item.status_id"
                  :value="item.status_id"
                  :selected="item.status_id == media.status"
                >
                  {{ item.name }}</option
                >
              </select>
              <h5 v-else class="text-danger" style="float: right;">{{ status || "Leer" }}</h5>
            </div>
          </div>
        </div>

        <div class="card-body">
          <h5 class="card-title">{{ media.name }}</h5>
          <h6 class="card-subtitle text-muted">{{ media.altname }}</h6>
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
          <li class="list-group-item">{{ media.year }}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Eintrag</a>
        </div>
        <div class="card-footer text-muted">
          {{ media.created }}
        </div>
      </div>

      <div class="card h-100" style="width: 600px;">
        <div class="card-body">
          <h4 class="card-title">Card title</h4>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <a href="#" class="card-link">Öffnen</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  props: {
    id: null,
  },
  data() {
    return {
      media: JSON,
      type_id: null,
      status_id: null,
      type: "",
      status: "",
      statuses: JSON,
      types: JSON,
      edit_status: false,
      edit_type: false,
    };
  },
  methods: {
    click_status: function() {
      this.edit_status = !this.edit_status;
    },
    click_type: function() {
      this.edit_type = !this.edit_type;
    },
    change_status(event) {
      if (event.target.value != this.media.status) {
        axios
          .put("http://localhost:8181/api/media/update/status/" + this.media.media_id + "/" + event.target.value)
          .then((response) => {
            if (response.status == 200) {
              this.update();
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.click_status();
    },
    change_type(event) {
      if (event.target.value != this.media.type) {
        axios
          .put("http://localhost:8181/api/media/update/type/" + this.media.media_id + "/" + event.target.value)
          .then((response) => {
            if (response.status == 200) {
              this.update();
            } else {
              console.log(response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.click_type();
    },
    update: function() {
      axios
        .get("http://localhost:8181/api/media/" + this.id)
        .then((response) => {
          this.media = response.data;
          this.name = this.media.name;
          this.type_id = this.media.type;
          this.status_id = this.media.status;
          axios
            .get("http://localhost:8181/api/type/" + this.type_id)
            .then((response) => {
              this.type = response.data.name;
            })
            .catch((error) => {
              console.log(error);
            });
          axios
            .get("http://localhost:8181/api/status/" + this.status_id)
            .then((response) => {
              this.status = response.data.name;
            })
            .catch((error) => {
              console.log(error);
            });
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
