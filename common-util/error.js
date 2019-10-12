"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/**
 * Error Handling Middleware for requests
 * @param err Raw error
 * @param status Status code to return
 * @param msg Msg to send. Put false for general message, true to send raw error
 * @param req Place Request here
 * @param res Place Response here
 */
exports.errorHandler = function (options, _req, res, _next) {
    var err = options.err, msg = options.msg, status = options.status, extraParams = options.extraParams;
    if (err === undefined) {
        console.error(options);
    }
    else if (typeof (err) === 'string') {
        console.error(err);
    }
    else if (err instanceof Error) {
        console.error(err.stack || 'Unknown Error');
    }
    var errorMsg;
    if (msg === undefined || msg === true) {
        if (err !== undefined) {
            errorMsg = err.stack || 'Unknown Error';
        }
        else {
            errorMsg = 'Unknown Error 1';
        }
    }
    else if (msg === null) {
        if (status === 500) {
            errorMsg = 'Internal Server Error';
        }
        else {
            errorMsg = 'Invalid Request';
        }
    }
    else {
        errorMsg = msg || 'Unknown Error';
    }
    var errorJson = __assign({ error: errorMsg }, extraParams);
    res.status(status || 400).json(errorJson);
};
