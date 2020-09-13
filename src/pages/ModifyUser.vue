<template>
  <div class="content">
    <form>
      <md-card>
        <md-card-header>
          <h4 class="title">Enter User Details</h4>
          <!-- <p>{{this.userdata.name}}</p> -->
          <!-- <p class="category">Complete your profile</p> -->
        </md-card-header>
        <br />
        <br />
        <label
          data-v-44cc07f6
          padding-left
          class="err-lbl"
          style="color: rgb(240, 65, 65); padding-left:40%; font-size:large"
        >
          <strong>{{ error[0] }}</strong>
        </label>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Name</label>
                <md-input v-model="name" type="text">{{this.name}}</md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Phone</label>
                <md-input v-model="username" type="text">{{this.username}}</md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Email</label>
                <md-input v-model="email" type="text">{{this.email}}</md-input>
              </md-field>
            </div>
            <!-- <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Password</label>
                <md-input v-model="password" type="password">{{this.password}}</md-input>
              </md-field>
            </div>-->
            <div class="md-layout-item md-small-size-100 md-size-100">
              <div>
                <label class="typo__label">
                  <strong>Assign Facility to user</strong>
                </label>
                <multiselect
                  v-model="facilitiesAccess"
                  placeholder="Search or add a tag"
                  label="name"
                  track-by="id"
                  :options="options"
                  :multiple="true"
                ></multiselect>
                <!-- <pre class="language-json"><code>{{ facilitiesAccess  }}</code></pre> -->
              </div>
              <!-- <span>Selected: {{ facilitiesAccess }}</span> -->
            </div>
            <br />
            <br />
            <div class="md-layout-item md-small-size-100 md-size-100">
              <br />
              <br />
              <b-form-group label="Select Roles:">
                <b-form-checkbox-group id="checkbox-group-2" v-model="roles" name="flavour-2">
                  <!-- <h2>{{ roles }}</h2> -->
                  <b-form-checkbox value="admin">Admin</b-form-checkbox>
                  <b-form-checkbox value="facilityUser">FacilityUser</b-form-checkbox>
                  <!-- <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
                  <b-form-checkbox value="grape">Grape</b-form-checkbox>-->
                </b-form-checkbox-group>
              </b-form-group>
              <div class="md:w-2/3">
                <span class="block text-gray-700 text-sm font-bold mb-2">Is Active:</span>
                <br />
                <br />

                <label class="radio-inline">
                  <input type="radio" name="optradio" @click="fbutton(true)" checked />True
                </label>
                <label class="radio-inline" style="margin-left:30px">
                  <input type="radio" name="optradio" @click="fbutton(false)" />False
                </label>
              </div>

              <b-button @click="submitForm" style="float:right">Confirm Submit</b-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import localforage from "localforage";
import router from "@/router/routes";
// import Multiselect from "vue-multiselect";
import User from "@/api/user.js";
const userReports = new User();
import Vue from "vue";

// Vue.component("multiselect", Multiselect);
export default {
  // components: { Multiselect },
  data() {
    return {
      facilitiesAccess: [],
      options: [],
      roles: [],
      name: "",
      email: "",
      username: "",
      password: "",
      isActive: true,
      error: [],
      userdata: "",
      valArray: []
    };
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
    console.log(this.$route.params.id, "params");
  },
  async mounted() {
    console.log(this.$route.params.id, "params");
    const auth_token = await localforage.getItem("my_access_token");
    const postBody = {
      method: "GET",
      headers: {
        Authorization: auth_token
      }
    };
    const response = await fetch(
      `${this.baseUri}users/${this.$route.params.id}/userdata`,
      postBody
    );
    // console.log(response);

    const data = await response.json();
    console.log(data, "reportHistory");

    if (data) {
      this.userdata = data;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      this.username = data.username;
      this.roles = data.roles;
      this.isActive = data.isActive;

      console.log(this.userdata, "userdata");
      this.valArray = data.facilitiesAccess;
      //   console.log(this.valArray);
      //   this.facilitiesAccess.push(...valArray);
      console.log(this.facilitiesAccess, " this.facilitiesAccess");
    } else {
      console.log("error in getting userdata reports");
    }

    userReports.getAllFacilities().then(resp => {
      console.log(resp, "Users facilities");

      if (!resp.error) {
        this.options = resp;
        this.options.filter(item => {
          this.valArray.map(item1 => {
            if (item.id === item1) {
              return this.facilitiesAccess.push(item);
            }
          });
        });
        console.log(this.facilitiesAccess, "test123");
      } else {
        console.log("error in getting facilities");
      }
    });
  },
  methods: {
    fbutton(value) {
      this.isActive = value;
      console.log(value);
    },
    async submitForm() {
      let newForm = {
        email: this.email,
        username: this.username,
        password: this.password,
        roles: this.roles,
        isActive: this.isActive,
        name: this.name,
        facilitiesAccess: this.facilitiesAccess.map(item => {
          return item.id;
        })
      };
      console.log(this.facilitiesAccess, "hasdasjh");

      if (
        newForm.username != "" &&
        newForm.password != "" &&
        newForm.selected != "" &&
        newForm.name != ""
        // newForm.value != ""
      ) {
        const auth_token = await localforage.getItem("my_access_token");
        let token = String(auth_token);

        const postBody = {
          method: "POST",
          body: JSON.stringify(newForm),
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        };

        console.log(postBody);
        const response = await fetch(
          `${this.baseUri}users/${this.$route.params.id}/modifyUserDetails`,
          postBody
        );
        console.log(response, "updated");

        // const data = await response.json();
        if (response) {
          alert("User updated");
          router.push("/userslist");
        }
      } else {
        this.error.push("please enter all details");
      }
    }
  }
};
</script>
