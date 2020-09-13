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
        @click="addUser"
      >Add User</b-button>
    </div>
    <br />
    <br />
    <br />

    <md-table>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Name</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Email</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Phone</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Roles</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Active</md-table-cell>

      <md-table-cell md-label="Name" style="color: white; background-color:green">Edit User</md-table-cell>
      <md-table-cell md-label="Name" style="color: white; background-color:green">Delete User</md-table-cell>

      <md-table-row slot="md-table-row" slot-scope v-for="item in filteredFacility" :key="item.id">
        <!-- <md-table-cell md-label="Name">{{ item.username }}</md-table-cell> -->
        <!-- <md-table-cell md-label="Name" v-for="f in facilities" :key="f.id">{{ f.name }}</md-table-cell> -->

        <md-table-cell md-label="Name" v-once>{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Name" v-once>{{ item.email }}</md-table-cell>

        <!-- <md-table-cell md-label="Role" v-if="item.roles.length === 1">{{ item.roles[0] }}</md-table-cell> -->
        <!-- <md-table-cell md-label="Role" v-else>{{ item.roles[0] }</md-table-cell> -->
        <md-table-cell md-label="Email" v-once>{{ item.username }}</md-table-cell>

        <md-table-cell md-label="Role" v-if="item.roles.length === 1" v-once>{{ item.roles[0] }}</md-table-cell>
        <md-table-cell md-label="Role" v-else v-once>{{ item.roles[0] }},{{ item.roles[1] }}</md-table-cell>

        <!-- <md-table-cell md-label="Role" v-else>{{ item.roles[0] }</md-table-cell> -->

        <md-table-cell md-label="Active" v-once>{{ item.isActive }}</md-table-cell>
        <!-- <md-table-cell md-label="Active">{{ item.totalBeds }}</md-table-cell> -->

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
import User from "@/api/user.js";
const userReports = new User();
import localforage from "localforage";
import router from "@/router/routes";
import Vue from "vue";

export default {
  data() {
    return {
      roles: [],
      users: [],
      value: "",
      search: "",

      login: "",
      facilities: ""
    };
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
    console.log(this.$route.params.id, "params");
    this.id = this.$route.params.id;
    userReports.getAllUsers().then(resp => {
      console.log(resp, "Users List");

      if (!resp.error) {
        this.users = resp;
      } else {
        console.log("error in getting Users");
      }
    });
  },
  computed: {
    filteredFacility: function() {
      // console.log(this.facilities, "hem");

      return this.users.filter(todo => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    addUser() {
      router.push("addUser");
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

        await fetch(`${this.baseUri}users/${id}/deleteUser`, postBody).then(
          () => {
            userReports.getAllUsers().then(resp => {
              console.log(resp, "Users List");

              if (!resp.error) {
                this.users = resp;
              } else {
                console.log("error in getting Users");
              }
            });
          }
        );
      }
    },
    async submitForm(id) {
      console.log(id, "updateid");
      let newForm = {
        roles: this.roles
      };
      const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);

      const postBody = {
        method: "PUT",
        body: JSON.stringify(newForm),
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };

      console.log(postBody);
      const response = await fetch(
        `${this.baseUri}users/${id}/modifyUserRoles`,
        postBody
      )
        .then(() => {
          userReports.getAllUsers().then(resp => {
            console.log(resp, "Users List");

            if (!resp.error) {
              this.users = resp;
            } else {
              console.log("error in getting Users");
            }
          });
        })
        .then(() => {
          alert("updated");
          this.$bvModal.hide(1);
        });
      // console.log(response, "updated");
    },
    edit(value) {
      // console.log(this.myFacilities.id);
      this.value = value;
      console.log(value);

      router.push("/modifyUser/" + value);
    }
  }
};
</script>
<style scoped>
i {
  /* position: absolute; */
  bottom: 100%;
  /* right: 10px; */
  color: red;
  float: right;
  cursor: pointer;
}
</style>
