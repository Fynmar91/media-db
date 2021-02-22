<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/list" tag="button" class="btn btn-primary" style="width: 100%; max-width: 600px;">Liste</router-link>
      </div>
    </div>
    <div class="row justify-content-center w-100 my-3">
      <div class="card mb-3 mx-4 h-100" style="width: 100%; max-width: 600px;">
        <div class="row mx-0" style="width: 100%; max-width: 600px;">
          <div class="col-6 card-header" style="clear: both" @dblclick="click_type">
            <div>
              <select v-if="edit_type" @change="change_type($event)" class="custom-select col-8">
                <option v-for="item in types" :key="item.type_id" :value="item.type_id" :selected="item.type_id == media.type"> {{ item.name }}</option>
              </select>
              <h3 v-else style="float: left;">{{ type || "Leer" }}</h3>
            </div>
          </div>
          <div class="col-6 card-header" style="clear: both" @dblclick="click_status">
            <div>
              <select v-if="edit_status" @change="change_status($event)" class="custom-select col-8" style="float: right;">
                <option v-for="item in statuses" :key="item.status_id" :value="item.status_id" :selected="item.status_id == media.status">
                  {{ item.name }}</option
                >
              </select>
              <h5 v-else class="text-danger" style="float: right;">{{ status || "Leer" }}</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <button type="button" @click="deleteMedia()" class="btn btn-outline-danger" style="float: right;">🗑</button>
          <h5 class="card-title">{{ media.name }} S{{ media.addition }}</h5>
          <h6 class="card-subtitle text-muted">{{ media.altname }}</h6>
        </div>
        <img :src="media.image" />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ media.year }}</li>
        </ul>
        <div class="card-body">
          <a href="#" @click="toggleHistAdd" class="card-link">Eintrag</a>
        </div>
        <div class="card-footer text-muted">
          {{ date }}
        </div>
      </div>
      <div class="w-100">
        <addHistory v-if="add_history" @update="update" v-bind:id="id" :key="id"> </addHistory>
      </div>
      <div class="w-100">
        <history v-if="render_history" @update="update" v-for="item in history" v-bind:history="item" :key="id + '-' + item.history_id"></history>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddHistory from "@/components/AddHistory.vue";
import History from "@/components/History.vue";

export default {
  components: { AddHistory, History },
  name: "Media",
  props: {
    id: null,
  },
  data() {
    return {
      media: JSON,
      history: JSON,
      date: "",
      type_id: null,
      status_id: null,
      type: "",
      types: JSON,
      status: "",
      statuses: JSON,
      edit_status: false,
      edit_type: false,
      add_history: false,
      render_history: false,
    };
  },
  methods: {
    click_status: function() {
      this.edit_status = !this.edit_status;
    },
    click_type: function() {
      this.edit_type = !this.edit_type;
    },
    toggleHistAdd: function() {
      this.add_history = !this.add_history;
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
      this.add_history = false;
      axios
        .get("http://localhost:8181/api/media/" + this.id)
        .then((response) => {
          this.media = response.data;
          this.name = this.media.name;
          this.type_id = this.media.type;
          this.status_id = this.media.status;
          this.date = this.media.created.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, "$3.$2.$1");
          axios
            .get("http://localhost:8181/api/history/" + this.media.media_id)
            .then((response) => {
              this.history = response.data;
              this.render_history = true;
            })
            .catch((error) => {
              console.log(error);
            });
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
    deleteMedia: function() {
      var result = confirm("Wirklich löschen?");
      if (result) {
        axios
          .delete("http://localhost:8181/api/media/delete/" + this.media.media_id)
          .then((response) => {
            this.$router.push({ path: "/list" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    resetWindow: function() {
      Object.assign(this.$data, initialState());
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
