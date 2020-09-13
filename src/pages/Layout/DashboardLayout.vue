<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <!-- <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>-->
      <!-- <sidebar-link to="/addFacility" v-if="facilities.length === 2">
        <md-icon>person</md-icon>
        <p>Add Facility</p>
      </sidebar-link>-->
      <sidebar-link to="/userslist">
        <md-icon>person</md-icon>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link to="/allFacilities">
        <md-icon>library_books</md-icon>
        <p>Facilities</p>
      </sidebar-link>
      <!-- <sidebar-link to="/addUser" v-if="facilities.length === 2">
        <md-icon>bubble_chart</md-icon>
        <p>Add User</p>
      </sidebar-link>-->

      <!-- <sidebar-link to="/yourFacilities">
        <md-icon>content_paste</md-icon>
        <p>Your Facilities</p>
      </sidebar-link>-->
      <div @click="compLogout">
        <sidebar-link to="/login">
          <md-icon>notifications</md-icon>
          <p>Logout</p>
        </sidebar-link>
      </div>

      <!-- <sidebar-link to="/upgrade" class="active-pro">
        <md-icon>unarchive</md-icon>
        <p>Upgrade to PRO</p>
      </sidebar-link>-->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin :color.sync="sidebarBackground" :image.sync="sidebarBackgroundImage"></fixed-plugin>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import { mapState, mapActions } from "vuex";
import localforage from "localforage";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    FixedPlugin
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      facilities: ""
    };
  },
  async mounted() {
    const login = await localforage.getItem("roles");
    console.log(login);
    this.facilities = login;
  },
  computed: {
    /* accountFlag() {
      return account.state.accountFlag;
    } */
    ...mapState("account", {
      accountFlag: state => state.accountFlag,
      loginFlag: state => state.loginFlag
    })
  },
  methods: {
    ...mapActions("account", ["logout"]),
    compLogout() {
      console.log("starting log out process");
      this.logout();
      // this.removeUserDetails();
    }
  }
};
</script>
