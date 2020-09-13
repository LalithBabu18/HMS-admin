<template>
  <form>
    <md-card>
      <md-card-header :table-header-color="tableHeaderColor">
        <h4 class="title">Enter Facility Details</h4>
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
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Name</label>
              <md-input v-model="name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Region</label>
              <md-input v-model="region" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Type</label>
              <md-input v-model="type" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Total Beds</label>
              <md-input v-model="totalBeds" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Total ICU Beds</label>
              <md-input v-model="totalIcuBeds" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Total Ventilators</label>
              <md-input v-model="totalVentilators" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Phone</label>
              <md-input v-model="phone" type="number"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Contact Person</label>
              <md-input v-model="contactPerson" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Address</label>
              <md-input v-model="address" type="text"></md-input>
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
            <md-button class="md-raised md-success" @click="submitForm">Add Facility</md-button>
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

export default {
  name: "edit-profile-form",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
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
      error: []
    };
  },
  created() {
    this.baseUri = Vue.prototype.$API_BASE_URI;
    console.log(this.baseUri, "icons");
  },
  methods: {
    fbutton(value) {
      this.isActive = value;
      console.log(value);
    },
    async submitForm() {
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
        // critical: this.Submit.critical,
        // nonCritical: this.Submit.nonCritical,
        // otherResponses: this.Submit.otherResponses,
        // noComplaints: this.Submit.noComplaints,
        // remarks: this.Submit.remarks,
        // isAntigenTestingDone: this.isAntigenTestingDone,

        // reportDate: moment(this.Submit.date).format("YYYY-MM-DDThh:mm:ss.SSSZ")
      };
      //   let date=  moment(this.Submit.date).format("YYYY-MM-DD hh:mm");
      // this.date = moment(this.Submit.date).format("YYYY-MM-DD");
      // console.log(newDate);
      if (
        newForm.name != "" &&
        newForm.region != "" &&
        newForm.address != "" &&
        newForm.totalVentilators != "" &&
        newForm.contactPerson != "" &&
        newForm.email != "" &&
        newForm.phone != "" &&
        newForm.totalBeds != "" &&
        newForm.totalIcuBeds != "" &&
        newForm.type != ""
      ) {
        const auth_token = await localforage.getItem("my_access_token");
        let token = String(auth_token);
        const id = await localforage.getItem("id");

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
          `${this.baseUri}facilities/createFacility`,
          postBody
        );
        console.log(response, "updated");

        // const data = await response.json();
        // console.log(data);
        if (response) {
          alert("Facility added");
          // this.newForm.region = "";
          router.push("/allFacilities");
        }
      } else {
        this.error.push("please enter all details");
      }
    }
  }
};
</script>
<style></style>
