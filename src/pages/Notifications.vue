<template>
  <div>
    <!-- <h1>{{  }}</h1> -->
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
      <b-button @click="update">Update</b-button>
    </div>
    <!-- <span>{{ facilitiesAccess }}</span> -->
    <br />
    <br />

    <div class="grid">
      <b-form-checkbox-group
        id="checkbox-group-2"
        name="flavour-2"
        v-for="f in filteredFacility"
        :key="f.id"
      >
        <!-- <h1>{{ f.id }}</h1> -->

        <!-- <b-form-checkbox :value="f.id">{{ f.name }}</b-form-checkbox> -->
        <div>
          <div class="form-check">
            <input
              class="form-check-input form-control-label-lg"
              type="checkbox"
              :checked="f.isChecked"
              :value="f.id"
              @click="inp(f.id)"
            />
            <label class="form-check-label" :for="f.id">{{ f.name }}</label>
          </div>
        </div>
        <!-- <b-form-checkbox value="facilityuser" styf.ide="padding-left:13%">Facility User</b-form-checkbox> -->
      </b-form-checkbox-group>
    </div>
  </div>
</template>

<script>
import localforage from "localforage";
import _ from "lodash";
import router from "@/router/routes";
import Vue from "vue";

import User from "@/api/user.js";
const userReports = new User();
export default {
  data() {
    return {
      allFacilities: [],
      facilitiesAccess: [],
      search: "",
      myReports: [],
      isChecked: false
    };
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
  },
  async beforeCreate() {
    console.log(this.$route.params.id, "params");
    // this.id = this.$route.params.id;
    userReports.getAllFacilities().then(resp => {
      // console.log(resp, "Users List");

      if (!resp.error) {
        resp.map(item => {
          // return(isChecked:false, ...item)
          return (item.isChecked = false);
          // console.log(item, "item");
        });
        this.allFacilities = resp;
        console.log("all faciliyies", this.allFacilities);
      } else {
        // console.log("error in getting Users");
      }
    });
    console.log(this.$route.params.id, "lal");
    const auth_token = await localforage.getItem("my_access_token");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token
      }
    };
    const response = await fetch(
      `${this.baseUri}users/${this.$route.params.id}/facilities`,
      postBody
    );
    // console.log(response);

    const data = await response.json();
    console.log(data, "reportHistory");

    if (data) {
      this.myReports = data;
      console.log(this.myReports, "myreports");
    } else {
      console.log("error in getting latest reports");
    }
    this.allFacilities.filter(facility => {
      console.log(facility, "fac");
      this.myReports.map(report => {
        if (facility.id == report.id) {
          return (facility.isChecked = true);
        }
      });
    });
  },
  updated() {
    console.log(
      _.intersectionBy(this.allFacilities, this.myReports, "id"),
      "uday"
    );
  },
  computed: {
    filteredFacility: function() {
      // console.log(this.facilities, "hem");

      return this.allFacilities.filter(todo => {
        return todo.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  methods: {
    inp(id) {
      this.allFacilities.filter(fun => {
        console.log(fun.isChecked);
        if (fun.id === id) {
          return (fun.isChecked = !fun.isChecked);
        }
      });

      console.log(id, "test");
    },
    async update() {
      // console.log(id, "updateid");
      let lalithArray = [];
      this.allFacilities.map(item => {
        if (item.isChecked === true) {
          lalithArray.push(item.id);
        }
      });
      console.log(lalithArray, "lalithArray");
      let newForm = {
        facilitiesAccess: lalithArray
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

      // console.log(postBody);
      const response = await fetch(
        `${this.baseUri}users/${this.$route.params.id}/modifyUserFacilitiesAccess`,
        postBody
      );
      console.log(response);
      if (!response.error) {
        alert("updated");
        router.push("/userslist");
      } else {
        // console.log("error in updated");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style
>>
