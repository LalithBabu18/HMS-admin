/* eslint-disable prettier/prettier */
import localforage from 'localforage';
import router from "@/router/routes";
import Vue from 'vue';

// import  from "dotenv";

export default class Account {
    constructor() {
        // it loads Vue.prototype.$API_BASE_URI bit late, had to setTimeout for it, possible fix
        setTimeout(() => {
            this.baseUri = Vue.prototype.$API_BASE_URI;
            console.log(this.baseUri);
        }, 1000);
    }

    async login(payload) {
        console.log("about to fetch...");
        const postBody = {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(
            `${this.baseUri}users/login`,
            postBody
        );
        const data = await response.json();
        console.log(data);
        return data;
    }
    async logout(authToken) {
        localforage.removeItem('my_access_token');
        localforage.removeItem('tokenExpiryDate');
        localforage.removeItem('myDetails');
        localforage.removeItem('newUserId');
        localforage.removeItem('newUserEmail');
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken
            }
        };
        const response = await fetch(`${this.baseUri}users/logout`, request);
        const data = await response.json();
        router.push('/login');
        return data;
    }
}