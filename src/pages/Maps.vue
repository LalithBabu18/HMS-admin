<template>
  <div>
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">
        <span class="fa fa-search"></span>
      </span>
      <input
        type="text"
        v-model="search"
        placeholder="SEARCH FACILITY"
        class="form-control"
        autocomplete="off"
        name="search"
        style="width:80%"
      />
    </div>
    <div class="legend"></div>
    <div class="todos">
      <div v-for="todo in filteredFacility" :key="todo.id" class="todo">
        <button class="bt" :id="todo.id">{{ todo.name }}</button>
        <b-tooltip variant="light" :target="todo.id" triggers="hover">
          Name:{{ todo.name }}
          <br />
          IsActive: {{ todo.isActive }}
          <br />
          Type: {{ todo.type }}
          <br />
          <br />
          Total Beds: {{ todo.totalBeds }}
          <br />
          <br />
          Total ICU Beds: {{ todo.totalIcuBeds }}
          <br />
          <br />
          Total Ventilators: {{ todo.totalVentillators }}
          <br />
          <br />
          Region: {{ todo.region }}
          <br />
          <br />
          Address: {{ todo.address }}
          <br />
          <br />
          Phone: {{ todo.phone }}
          <br />
          <br />
          Contact Person: {{ todo.contactPerson }}
          <br />
          <br />
          Email: {{ todo.email }}
          <br />
        </b-tooltip>
        <a href="javascript:;" @click="deleteTodo(todo.id)">
          <i class="fas fa-trash-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import localforage from "localforage";
import Vue from "vue";

import User from "@/api/user.js";
const userReports = new User();
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      facilities: [],
      search: "",
      modalShow: false
    };
  },
  mounted() {
    userReports.getFacilities().then(resp => {
      console.log(resp, "Users List");

      if (!resp.error) {
        this.facilities = resp;
      } else {
        console.log("error in getting Users");
      }
    });
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
  },
  computed: {
    filteredFacility: function() {
      // console.log(this.facilities, "hem");

      return this.facilities.filter(todo => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    async deleteTodo(id) {
      console.log(id, "id");
      if (confirm("are you sure?")) {
        const auth_token = await localforage.getItem("my_access_token");
        let token = String(auth_token);
        const postBody = {
          method: "DELETE",
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        };

        await fetch(
          `${this.baseUri}facilities/${id}/deleteFacility`,
          postBody
        ).then(() => {
          userReports.getFacilities().then(resp => {
            console.log(resp, "Users List");

            if (!resp.error) {
              this.facilities = resp;
            } else {
              console.log("error in getting Users");
            }
          });
        });
      }
    }
  }
};
</script>

<style scoped>
.bt {
  border: none;
  background: none;
  color: #fff;
}
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #bb2cd9;
  padding: 1rem;
  color: aliceblue;
  font-size: 15px;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>
