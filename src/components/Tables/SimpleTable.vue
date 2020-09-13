<template>
  <div>
    <!-- <h1>{{}}</h1> -->
    <div>
      <input
        type="text"
        v-model="search"
        placeholder="SEARCH FACILITY"
        class="form-control"
        autocomplete="off"
        name="search"
        style="width:50%"
      />
    </div>
    <br />
    <br />
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <!-- <md-table-cell md-label="Name">{{ item.username }}</md-table-cell> -->
        <!-- <md-table-cell md-label="Name" v-for="f in facilities" :key="f.id">{{ f.name }}</md-table-cell> -->

        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>

        <md-table-cell md-label="Role" v-if="item.roles.length === 1">{{ item.roles[0] }}</md-table-cell>
        <md-table-cell md-label="Role" v-else>{{ item.roles[0] }},{{ item.roles[1] }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Active">{{ item.isActive }}</md-table-cell>
        <!-- <md-table-cell md-label="Active">{{ item.isActive }}</md-table-cell> -->

        <!-- <b-button @click="updateTodo(del.id)">Edit Role</b-button> -->
        <md-table-cell>
          <b-button :value="item.id" @click="edit(item.id)">Edit User Details</b-button>
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
            <i class="fas fa-trash-alt" style v-if="facilities.length === 2"></i>
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
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      roles: [],
      users: [],
      value: "",
      // login:''
      facilities: ""
    };
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
  },
  async mounted() {
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
    const login = await localforage.getItem("roles");
    console.log(login);
    this.facilities = login;
    // userReports.getFacilities().then(resp => {
    //   if (!resp.error) {
    //     this.facilities = resp;
    //   } else {
    //     console.log("error in getting facilities");
    //   }
    // });
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
          this.$bvModal.hide(id);
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
