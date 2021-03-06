<template>
  <div>
    <div class="row justify-content-center w-100 mt-3">
      <div class="btn-group-vertical mx-4" style="width: 100%; max-width: 600px;">
        <router-link to="/" tag="button" class="btn btn-primary">Menü</router-link>
        <router-link :to="{ name: 'List', params: { type: type_id } }" tag="button" class="btn btn-secondary" style="width: 100%; max-width: 600px;"
          >Liste</router-link
        >
      </div>
    </div>
    <div class="row justify-content-center w-100 my-3">
      <div class="card mb-3 mx-4 h-100" style="width: 100%; max-width: 600px;">
        <div class="row mx-0" style="width: 100%; max-width: 600px;">
          <div class="col-6 card-header" style="clear: both" @dblclick="click_type">
            <div>
              <select v-if="edit_type" @change="change_type($event)" class="custom-select col-8">
                <option v-for="item in types" :key="item.type_id" :value="item.type_id" :selected="item.type_id == media.type_id"> {{ item.name }}</option>
              </select>
              <h3 v-else style="float: left;">{{ type || "Leer" }}</h3>
            </div>
          </div>
          <div class="col-6 card-header" style="clear: both" @dblclick="click_status">
            <div>
              <select v-if="edit_status" @change="change_status($event)" class="custom-select col-8" style="float: right;">
                <option key="null" :value="null" selected></option>
                <option v-for="item in statuses" :key="item.status_id" :value="item.status_id" :selected="item.status_id == media.status_id">
                  {{ item.name }}</option
                >
              </select>
              <h5 v-else :class="statusClass(status_id)" style="float: right;">{{ status || "Leer" }}</h5>
            </div>
          </div>
        </div>
        <div class="card-body pr-0">
          <div class="btn-group" style="width: 100%; max-width: 600px;">
            <div class="card-body p-0 col-11">
              <h5 class="card-title">{{ media.name }}&emsp;{{ media.addition ? prefix + media.addition : "" }}</h5>
              <h6 class="card-subtitle text-muted">{{ media.altname }}</h6>
            </div>
            <button type="button" @click="deleteMedia()" class="btn btn-outline-primary">🗑</button>
          </div>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Erscheinungsjahr:&emsp;{{ media.year }}</li>
          <div class="btn-group" v-for="prop in props" :key="prop.prop_id" style="width: 100%; max-width: 600px;">
            <li class="list-group-item col-11">{{ prop.name }}:&emsp; {{ prop.value }}</li>
            <button type="button" @click="deleteProp(prop.prop_id)" class="btn btn-outline-primary">🗑</button>
          </div>
        </ul>
        <div class="card-body">
          <a href="#" @click="toggleHistAdd" class="card-link">Neuer Eintrag</a>
          <a href="#" @click="togglePropAdd" class="card-link">Neues Datenfeld</a>
          <a :href="infoLink(type_id)" target="_blank" class="card-link">Info</a>
        </div>
        <div class="card-footer text-muted">
          {{ date }}
        </div>
      </div>
      <div class="w-100">
        <addHistory v-if="add_history" @update="update" v-bind:id="id" :key="id"> </addHistory>
        <addProp v-if="add_prop" @update="update" v-bind:id="id" :key="id"> </addProp>
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
import AddProp from "@/components/AddProp.vue";
import History from "@/components/History.vue";

export default {
  components: { AddHistory, AddProp, History },
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
      props: JSON,
      edit_status: false,
      edit_type: false,
      add_history: false,
      add_prop: false,
      render_history: false,
    };
  },
  computed: {
    prefix: function() {
      switch (this.type_id) {
        case 1:
        case 5:
          return "Staffel ";
        case 3:
          return "Band ";
        default:
          return "";
      }
    },
  },
  methods: {
    infoLink: function(type) {
      switch (type) {
        case 1:
        case 2:
          return "https://www.themoviedb.org/search?query=" + this.media.name;
        case 3:
          return "https://openlibrary.org/search?q=title%3A+%22" + this.media.name + "%22&mode=everything";
        default:
          return "text";
      }
    },
    click_status: function() {
      this.edit_status = !this.edit_status;
    },
    click_type: function() {
      this.edit_type = !this.edit_type;
    },
    toggleHistAdd: function() {
      this.add_history = !this.add_history;
    },
    togglePropAdd: function() {
      this.add_prop = !this.add_prop;
    },
    statusClass: function(status) {
      switch (status) {
        case 1:
          return "text-success";
        case 2:
          return "text-info";
        case 3:
          return "text-danger";
        case 4:
          return "text-muted";
        default:
          return "text";
      }
    },
    change_status(event) {
      if (event.target.value != null && event.target.value != this.media.status) {
        axios
          .put("http://" + process.env.VUE_APP_APIURL + "/api/media/update/status/" + this.media.media_id + "/" + event.target.value)
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
          .put("http://" + process.env.VUE_APP_APIURL + "/api/media/update/type/" + this.media.media_id + "/" + event.target.value)
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
      this.add_prop = false;
      axios
        .get("http://" + process.env.VUE_APP_APIURL + "/api/media/" + this.id)
        .then((response) => {
          this.media = response.data;
          this.name = this.media.name;
          this.type_id = this.media.type_id;
          this.status_id = this.media.status_id;
          this.date = this.media.created.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, "$3.$2.$1");
          this.type = response.data.type;
          this.status = response.data.status;
          axios
            .get("http://" + process.env.VUE_APP_APIURL + "/api/history/" + this.media.media_id)
            .then((response) => {
              this.history = response.data;
              this.render_history = true;
            })
            .catch((error) => {
              console.log(error);
            });
          axios
            .get("http://" + process.env.VUE_APP_APIURL + "/api/type/")
            .then((response) => {
              this.types = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
          axios
            .get("http://" + process.env.VUE_APP_APIURL + "/api/status/")
            .then((response) => {
              this.statuses = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
          axios
            .get("http://" + process.env.VUE_APP_APIURL + "/api/prop/" + this.id)
            .then((response) => {
              this.props = response.data;
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
          .delete("http://" + process.env.VUE_APP_APIURL + "/api/media/delete/" + this.media.media_id)
          .then((response) => {
            this.$router.push({ path: "/list/" + this.type_id });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteProp: function(id) {
      var result = confirm("Wirklich löschen?");
      if (result) {
        axios
          .delete("http://" + process.env.VUE_APP_APIURL + "/api/prop/delete/" + id)
          .then((response) => {
            this.update();
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
