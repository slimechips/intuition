"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var os_1 = __importDefault(require("os"));
var base64url_1 = __importDefault(require("base64url"));
var moment_1 = __importDefault(require("moment"));
exports.reqLogger = function (req, res, next) {
    var trackHdr = setTracking(req);
    req.headers.net_track = trackHdr;
    res.on('finish', function () {
        var newTrackHdr = req.headers.net_track;
        var newTrack = JSON.parse(base64url_1["default"].decode(newTrackHdr));
        var t2 = Date.now();
        var stringTime = moment_1["default"]().format();
        console.info(stringTime + " uuid: " + newTrack.uuid + " | " + newTrack.url + " |"
            + (" tt: " + (t2 - newTrack.t1) + " | status: " + res.statusCode + " | "));
    });
    next();
};
function setTracking(req) {
    var track = {
        host: os_1["default"].hostname(),
        url: req.method.toLowerCase() + ": " + req.path,
        t1: Date.now(),
        uuid: _genUuid()
    };
    var curTime = moment_1["default"]().format();
    // Log every request
    if (req.method === 'POST') {
        console.info(curTime + " (Inc " + track.uuid + ") " + req.method.toUpperCase() + ":"
            + (" " + req.url), JSON.stringify(req.body));
    }
    else {
        console.info(curTime + " (Inc " + track.uuid + ") " + req.method.toUpperCase() + ":"
            + (" " + req.url), JSON.stringify(req.params));
    }
    return base64url_1["default"].encode(JSON.stringify(track));
}
function _genUuid() {
    return Math.round(Math.random() * Math.pow(10, 6));
}
