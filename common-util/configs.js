"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/**
 * Sets the App path of the project
 * @param appPath (optional) Declare a custom app path for the project
 */
exports.setAppDir = function (appPath) {
    if (appPath === void 0) { appPath = ''; }
    var finalPath;
    if (appPath === '') {
        console.log(__dirname);
        finalPath = path_1["default"].join(__dirname, '..', '..');
    }
    else {
        finalPath = path_1["default"].join(__dirname, '..', appPath);
    }
    return finalPath;
};
exports.appDir = exports.setAppDir(process.env.SVC);
/**
 * Gets the config file
 * @param environment the node env
 */
var getConfig = function (environment) {
    if (environment === void 0) { environment = 'development'; }
    var configPath = path_1["default"].join(exports.appDir, 'config', environment + ".json");
    var cfg = JSON.parse(fs_1["default"].readFileSync(configPath).toString());
    console.info(cfg.service + " Config File: " + configPath);
    return cfg;
};
exports.cfg = getConfig(process.env.NODE_ENV);
/**
 * Gets the endponts from endpoint config file
 * @param endpCfgPath Custom endpoint config path
 */
var getEndpoints = function (endpCfgPath) {
    if (endpCfgPath === void 0) { endpCfgPath = ''; }
    var finalPath;
    if (endpCfgPath === '') {
        finalPath = path_1["default"].join(exports.appDir, exports.cfg.endpoints_file);
    }
    else {
        finalPath = path_1["default"].join(exports.appDir, endpCfgPath);
    }
    console.info("Endpoints configuration file: " + finalPath);
    var endpoints = JSON.parse(fs_1["default"].readFileSync(finalPath).toString());
    Object.keys(endpoints).forEach(function (service) {
        if (process.env.NODE_ENV === 'development') {
            endpoints[service].host = endpoints[service].local_host;
        }
        endpoints[service].full_url = "http://" + endpoints[service].host
            + (":" + endpoints[service].http_port + endpoints[service].path);
    });
    return endpoints;
};
exports.endpoints = getEndpoints();
