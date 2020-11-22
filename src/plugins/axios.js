"use strict";

import Vue from 'vue';
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.withCredentials = true

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(error) {
        if (!error.status) {
            // Unhandled exception
            console.error(error)
            window.location = process.env.VUE_APP_ERROR_PAGE
            return Promise.reject(error.response);
        }

        // Do something with response error
        // In case of 401, redirect to login page
        // If the error come from the login page, display the error
        const errCode = error.response.data.error;
        if(error.response.status === 401 && errCode === 'authNotAuthenticated') {
            window.location = process.env.VUE_APP_LOGIN_PAGE
        } else {
            Vue.prototype.$toaster.error(error.response.data.error)
        }

        return Promise.reject(error.response);
    }
);

Plugin.install = function(Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;
