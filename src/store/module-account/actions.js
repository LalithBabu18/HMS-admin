/* eslint-disable prettier/prettier */
import router from "@/router/routes";

import localforage from "localforage";

// Vue.use(VueRouter);
import Account from "@/api/account.js";

const accountResourceService = new Account();


export function login({
    commit
}, payload) {
    console.log(`%c In Store Login`, "background: lightgreen; color: black");
    //✅ fetch services from backend using api service
    //✅ commit to store
    //✅ store in indexDB
    //✅ route to homepage

    accountResourceService.login(payload).then(async(resp) => {
        // console.log(resp.access_token, resp.error);

        if (resp.access_token && !resp.error) {
            commit("m_loginFlag", true);
            localforage.setItem("my_access_token", resp.access_token);
            localforage.setItem("id", resp.userId);
            localforage.setItem("roles", resp.roles);

            // alert("login");
            await router.push("/userslist");
            // this.$router.push("/dashboard");
        } else {
            commit("m_loginFlag", false);
            router.push("/login");

            throw "Invalid Username or Password"
                // alert("please enter correct Username And password"); router.push("/login");
        }
    });
}
export function logout({
    commit
}) {
    console.log(`%c In Store Logout`, "background: lightgreen; color: black");
    //✅ fetch services from backend using api service
    //✅ commit to store
    //✅ store in indexDB
    //✅ route to homepage

    // temp cleaning state, until endpoint is fixed and not return 401
    commit("m_resetState", {});
    localforage.removeItem("newUserEmail");
    localforage.removeItem("my_access_token");
    localforage.removeItem("newUserId");
    localforage.removeItem("myDetails");
    localforage.removeItem("tokenExpiryDate");

    accountResourceService
        .logout(localforage.getItem("my_access_token"))
        .then((resp) => {
            //console.log(resp);
            if (resp.status == 200) {
                commit("m_flatMutate", {
                    isAuthenticated: false,
                });
                //console.log(`%c Login Flag false`, 'background: lightgreen; color: black');
                localforage.removeItem("newUserEmail"); //TODO: Doesn't seem to remove from IndexedDB
                localforage.removeItem("my_access_token");
                localforage.removeItem("newUserId");
                localforage.removeItem("myDetails");
                localforage.removeItem("tokenExpiryDate");

                //console.log(`%c Token removed`, 'background: lightgreen; color: black');

                // router.push("/login");
            } else {
                //console.log(`%c logout failed`, 'background: red; color: black');
            }
        });
}