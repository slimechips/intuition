"use strict";
// axios.ts
// Axios Middleware
// Credits: https://stackoverflow.com/questions/53256914/axios-middleware-to-use-in-all-instances-of-axios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var axios_1 = __importDefault(require("axios")); // eslint-disable-line
var moment_1 = __importDefault(require("moment"));
axios_1["default"].interceptors.request.use(function (config) {
    // Do something before request is sent
    var method = config.method ? config.method.toUpperCase() : '';
    console.log(moment_1["default"]().format() + " (Out) " + method + ": " + config.url);
    if (method === 'POST') {
        console.log('Body', JSON.stringify(config.data));
    }
    return config;
}, function (error) { return Promise.reject(error); });
// Add a response interceptor
axios_1["default"].interceptors.response.use(function (response) {
    // Do something with response data
    console.log(moment_1["default"]().format() + " Response | " + response.status + " |", JSON.stringify(response.data));
    return response;
}, function (error) { return Promise.reject(error); });
exports["default"] = axios_1["default"];
