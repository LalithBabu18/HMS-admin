/* eslint-disable prettier/prettier */
import Vue from "vue";
import localforage from "localforage";

export default class User {
    constructor() {
        setTimeout(() => {
            this.baseUri = Vue.prototype.$API_BASE_URI;
        }, 100);
    }

    async getAllUsers() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(`${this.baseUri}users`, postBody);

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getFacilities() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `${this.baseUri}users/me/facilities`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async getAllFacilities() {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `${this.baseUri}facilities`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
    async reportGraph() {
        let data = [];
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `${this.baseUri}reports`,
            postBody
        );
        console.log(response, "respsed");

        data = await response.json();
        console.log(data, "totalreportHistory");
        return data;
    }
    async getFacilitiesById(id) {
        const auth_token = await localforage.getItem("my_access_token");
        const postBody = {
            method: "GET",
            headers: {
                Authorization: auth_token,
            },
        };
        const response = await fetch(
            `${this.baseUri}users/${id}/facilities`,
            postBody
        );

        const data = await response.json();
        console.log(data, "response History");
        return data;
    }
}