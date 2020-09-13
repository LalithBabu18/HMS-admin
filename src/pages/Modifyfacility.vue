<template>
  <form>
    <md-card>
      <md-card-header>
        <h4 class="title">Update Facility Details</h4>
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
        <!-- <strong>{{ error[0] }}</strong> -->
      </label>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Name</label>
              <md-input v-model="name" type="text">{{this.name}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Region</label>
              <md-input v-model="region" type="text">{{this.region}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Type</label>
              <md-input v-model="type" type="text">{{this.type}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Total Beds</label>
              <md-input v-model="totalBeds" type="number">{{this.totalBeds}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Total ICU Beds</label>
              <md-input v-model="totalIcuBeds" type="number">{{this.totalIcuBeds}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Total Ventilators</label>
              <md-input v-model="totalVentilators" type="number">{{this.totalVentilators}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone</label>
              <md-input v-model="phone" type="number">{{this.phone}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Contact Person</label>
              <md-input v-model="contactPerson" type="text">{{this.contactPerson}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="email" type="email">{{this.email}}</md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Address</label>
              <md-input v-model="address" type="text">{{this.address}}</md-input>
            </md-field>
          </div>
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
          <div class="md-layout-item md-size-100 text-center">
            <b-button @click="update" style="float:right">Confirm Submit</b-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import localforage from "localforage";
import router from "@/router/routes";
import Vue from "vue";

// import Multiselect from "vue-multiselect";
import User from "@/api/user.js";
const userReports = new User();

// Vue.component("multiselect", Multiselect);
export default {
  // components: { Multiselect },
  data() {
    return {
      region: "",
      name: "",
      type: "",
      totalBeds: "",
      totalIcuBeds: "",
      address: "",
      phone: "",
      contactPerson: "",
      email: "",
      totalVentilators: "",
      isActive: true,
      error: [],
      userdata: []
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
      `${this.baseUri}facilities/${this.$route.params.id}`,
      postBody
    );
    console.log(response, "hello");

    const data = await response.json();
    console.log(data, "reportHistory");

    if (data) {
      this.userdata = data;
      this.name = data.name;
      this.type = data.type;
      this.region = data.region;

      this.totalBeds = data.totalBeds;
      this.totalIcuBeds = data.totalIcuBeds;
      this.address = data.address;
      this.contactPerson = data.contactPerson;
      this.phone = data.phone;
      this.totalVentilators = data.totalVentilators;
      this.isActive = data.isActive;
      console.log(this.userdata, "userdata");
      //   this.valArray = data.facilitiesAccess;
      //   console.log(this.valArray);
      //   this.facilitiesAccess.push(...valArray);
      //   console.log(this.facilitiesAccess, " this.facilitiesAccess");
    } else {
      console.log("error in getting userdata reports");
    }
  },
  methods: {
    fbutton(value) {
      this.isActive = value;
      console.log(value);
    },
    async update() {
      console.log("clicked");
      let newForm = {
        region: this.region,
        name: this.name,
        address: this.address,
        totalVentilators: this.totalVentilators,
        type: this.type,
        totalBeds: this.totalBeds,
        totalIcuBeds: this.totalIcuBeds,
        phone: this.phone,
        email: this.email,
        contactPerson: this.contactPerson,
        isActive: this.isActive
      };
      //   console.log(newForm);
      const auth_token = await localforage.getItem("my_access_token");
      let token = String(auth_token);
      // const id = await localforage.getItem("id");

      const postBody = {
        method: "POST",
        body: JSON.stringify(newForm),
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      };

      console.log(postBody, "postbody");
      const response = await fetch(
        `${this.baseUri}facilities/${this.$route.params.id}/modifyFacilityDetails`,
        postBody
      );
      console.log(response, "updated");

      //   const data = await response.json();
      //   console.log(data);
      if (response) {
        alert("Facility added");
        // this.newForm.region = "";
        router.push("/allFacilities");
      }
      //   } else {
      //     this.error.push("please enter all details");
      //   }
    }
  }
};
</script>
