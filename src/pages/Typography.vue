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
    <div>
      <b-button
        style="
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    float:right"
        @click="addFacility"
      >Add Facility</b-button>
    </div>
    <br />
    <br />
    <br />

    <md-table>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Name</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Phone</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Active</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Total Beds</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Edit Facility</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Delete Facility</md-table-cell>

      <md-table-row slot="md-table-row" slot-scope v-for="item in filteredFacility" :key="item.id">
        <!-- <md-table-cell md-label="Name">{{ item.username }}</md-table-cell> -->
        <!-- <md-table-cell md-label="Name" v-for="f in facilities" :key="f.id">{{ f.name }}</md-table-cell> -->

        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>

        <!-- <md-table-cell md-label="Role" v-if="item.roles.length === 1">{{ item.roles[0] }}</md-table-cell> -->
        <!-- <md-table-cell md-label="Role">{{ item.roles[0] }</md-table-cell> -->
        <md-table-cell md-label="Email">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="Active">{{ item.isActive }}</md-table-cell>
        <md-table-cell md-label="Active">{{ item.totalBeds }}</md-table-cell>

        <!-- <b-button @click="updateTodo(del.id)">Edit Role</b-button> -->
        <md-table-cell>
          <b-button :value="item.id" @click="edit(item.id)">Edit</b-button>
        </md-table-cell>
        <!-- <b-button :id="item.id" @click="$bvModal.show(item.id)">Edit Facilities</b-button> -->

        <!-- <md-table-cell v-if="facilities.length === 2"> -->
        <!-- <b-button :id="item.id" @click="$bvModal.show(item.id)">Edit Role</b-button> -->
        <!-- <h2>{{item.id}}</h2> -->

        <!-- <b-modal :id="item.id" hide-footer> -->
        <!-- <template v-slot:modal-title> -->
        <!-- <code>Edit Roles</code> -->
        <!-- </template> -->
        <!-- <div class="d-block text-center"> -->
        <!-- <b-form-checkbox-group id="checkbox-group-2" v-model="roles" name="flavour-2"> -->
        <!-- <b-form-checkbox value="admin">Admin</b-form-checkbox> -->
        <!-- <b-form-checkbox value="facilityuser" style="padding-left:13%">Facility User</b-form-checkbox> -->
        <!-- </b-form-checkbox-group> -->
        <!-- </div> -->
        <!-- <b-button class="mt-3" block @click="submitForm(item.id)">Update</b-button> -->
        <!-- </b-modal> -->
        <!-- </md-table-cell> -->
        <md-table-cell>
          <a href="javascript:;" @click="deleteTodo(item.id)">
            <i class="fas fa-trash-alt"></i>
          </a>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import localforage from "localforage";
import Vue from "vue";
import router from "@/router/routes";

import User from "@/api/user.js";
const userReports = new User();
export default {
  data() {
    return {
      facilities: [],
      search: "",
      modalShow: false,
      value: ""
    };
  },
  beforeMount() {
    window.addEventListener("beforeunload", event => {
      if (!this.isEditing) return;
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = "";
    });
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
  },
  mounted() {
    userReports.getAllFacilities().then(resp => {
      console.log(resp, "Users List");

      if (!resp.error) {
        this.facilities = resp;
      } else {
        console.log("error in getting Users");
      }
    });
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
    edit(value) {
      // console.log(this.myFacilities.id);
      this.value = value;
      console.log(value, "value");

      router.push("/Modifyfacility/" + value);
    },
    addFacility() {
      router.push("addFacility");
    },
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
          userReports.getAllFacilities().then(resp => {
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
  /* position: absolute; */
  bottom: 100%;
  /* right: 10px; */
  color: red;
  float: right;
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
  .add {
  }
}
</style>
