<template>
  <div>
    <br />
    <div>
      <i @click="button" class="fa fa-arrow-left" aria-hidden="true"></i>
    </div>
    <md-toolbar md-elevation="0" class="md-transparent">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <h3 class="md-title">{{ $route.name }}</h3>
        </div>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-just-icon md-simple md-toolbar-toggle"
            :class="{ toggled: $sidebar.showSidebar }"
            @click="toggleSidebar"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </md-button>

          <div class="md-collapse">
            <li class="md-list-item">
              <a
                href="#/notifications"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content"></div>
              </a>
            </li>
          </div>
        </div>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import router from "@/router/routes";

export default {
  methods: {
    button() {
      router.go(-1);
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }
    // logout() {
    //   console.log("logout");
    //   router.push("/login");
    // }
  }
};
</script>

<style lang="css">
.fa {
  font-size: 25px;
  /* color: #fff; */
}
</style>
