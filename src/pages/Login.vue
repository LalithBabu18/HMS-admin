<template>
  <div class="body">
    <div class="row mt-1 mb-0">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <div class="class-form">
            <h1 class="text-center mb-3" style="color:rgb(37, 209, 254);">Login</h1>
            <!-- <h2>{{errors}}</h2> -->
            <form action>
              <div class="form-group">
                <!-- <label>User Name</label> -->
                <md-field>
                  <label>Phone Number</label>
                  <md-input
                    typeof="User Name"
                    id="email"
                    type="number"
                    placeholder="Enter Phone Number"
                    v-model="email"
                    ref="User Name"
                    required
                    class="form-control"
                  ></md-input>
                </md-field>
                <!-- <input
                typeof="User Name"
                id="email"
                type="text"
                placeholder="username"
                v-model="email"
                ref="User Name"
                required
                class="form-control"
                />-->
                <label
                  data-v-44cc07f6
                  padding-left
                  class="err-lbl"
                  style="color: rgb(240, 65, 65);"
                >{{ errors[0] }}</label>
              </div>
              <div class="form-group">
                <!-- <label>Password</label> -->
                <md-field>
                  <label>Password</label>
                  <md-input
                    type="password"
                    id="password"
                    ref="password"
                    v-model="password"
                    required
                    class="form-control"
                    placeholder="Enter Password"
                  ></md-input>
                </md-field>
                <!-- <input
                type="password"
                id="password"
                ref="password"
                v-model="password"
                required
                class="form-control"
                placeholder="Enter Password"
                />-->
                <label
                  data-v-44cc07f6
                  padding-left
                  class="err-lbl"
                  style="color: rgb(240, 65, 65);"
                >{{ errors1[0] }}</label>
              </div>
              <!-- <button
            @click="login"
            class="btn btn-primary btn-block"
          >
            Login
              </button>-->
            </form>
            <button
              color="primary"
              expand="full"
              @click="login"
              class="btn btn-primary btn-block"
            >Log In</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import account from "@/store/module-account"; // just for explaining

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      errors1: []
    };
  },
  // created() {
  //   this.$store.dispatch();
  // },
  computed: {
    /* accountFlag() {
      return account.state.accountFlag;
    } */
    // ...mapState("account", {
    //   accountFlag: state => state.accountFlag,
    //   loginFlag: state => state.loginFlag
    // })
  },
  methods: {
    ...mapActions("account", ["login"]),
    login() {
      if (!this.email) {
        this.errors.push("User Name is required.");
      }
      if (!this.password) {
        this.errors1.push("Password is required.");
      }
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("account/login", payload);
    }
  }
};
</script>

<style scoped>
.body {
  background-color: #ffff;
}
.btn {
  background-color: rgb(37, 209, 254);
  border: none;
  width: 3cm;
  height: 1cm;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10cm;
  margin-left: 30%;
}
.col-md-6 {
  height: 100vh;
}
.class-form {
  margin-top: 25%;
}
.card {
  height: 100vh;
}
@media only screen and (min-width: 768px) {
  .col-md-6 .card {
    width: 50%;
  }
}

[class*="col-"] {
  width: 100%;
}
</style>
