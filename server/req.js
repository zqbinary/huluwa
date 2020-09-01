import axios from 'axios'
import protoRoot from "./proto/proto";
import protobuf from 'protobufjs'
import md5 from 'js-md5';
import {dd, promisefy} from "./utils";

axios.defaults.timeout = 30000;

let APIHOST = "http://47.92.133.237:7100";
APIHOST = "https://dpis.ionewu.com";
// APIHOST = "http://192.168.71.206:8283
let OWAPPAPIHOST = "";
let STATAPIHOST = "https://c.ionewu.com";
let UPLOADAPIHOST = "https://dphub.ionewu.com";
let TANAPIHOST = "https://tan.ionewu.com";
let Appid = "";

const sendTanServerGet = function (path, data, cb) {
    axios.get(TANAPIHOST + path, {
        params: data
    }).then((response) => {
        cb ? cb(null, response.data) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const sendTanServerPost = function (path, data, cb) {
    axios.post(TANAPIHOST + path, data).then((response) => {
        cb ? cb(null, response.data) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const sendStatServer = function (path, data, cb) {
    axios.post(STATAPIHOST + path, data).then((response) => {
        cb ? cb(null, response.data) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const sendStatServerGet = function (path, data, cb) {
    axios.get(STATAPIHOST + path, {
        params: data
    }).then((response) => {
        cb ? cb(null, response.data) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const sendOwappServer = function (path, data, cb) {
    axios.get(OWAPPAPIHOST + path, {
        params: data
    }).then((response) => {
        // console.log(path, response.data);
        response.data = parseUrlParams(response.data);
        cb ? cb(null, response.data) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const sendDpisServerGet = function (path, data, cb) {
    axios.get(APIHOST + path, {
        params: data
    }).then((response) => {
        cb ? cb(null, response.data) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const sendUploadServer = function (path, data, cb) {
    let url = UPLOADAPIHOST + path;
    // console.log(url);
    httpService.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((data) => {
        let ProtoResp = protoRoot.lookup("SubResolveResp")
        let buf = protobuf.util.newBuffer(data.data);
        let decodedResponse = ProtoResp.decode(buf)
        // console.log(decodedResponse)
        cb ? cb(null, decodedResponse) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}

const httpService = axios.create({
    timeout: 60000,
    method: "post",
    headers: {
        // 'Content-Type': 'application/octet-stream'
    },
    responseType: 'arraybuffer'
})

let _httpServiceGet = function (url, api, req, cb) {
    // console.log((api + "Req"), req);
    let apiHost = OWAPPAPIHOST ? OWAPPAPIHOST : APIHOST;
    if (url == "/dp/box/list" || url == "/dp/box/bind") {
        apiHost = APIHOST;
    }

    // 强制使用远程
    apiHost = APIHOST;

    let apiUrl = apiHost + url;
    if (Appid) {
        apiUrl = apiUrl + "?appid=" + Appid;
    }

    httpService.get(apiUrl, {
        params: req
    }).then(function (data) {
        // console.log(data)
        let ProtoResp = protoRoot.lookup(api + 'Resp')
        let buf = protobuf.util.newBuffer(data.data);
        let decodedResponse = ProtoResp.decode(buf)
        if (process.env.NODE_ENV != 'production') {
            console.log((api + "Req"), req);
            console.log(decodedResponse)
        }
        cb ? cb(null, decodedResponse) : null;
    }).catch((error) => {
        cb ? cb(error, null) : null;
    });
}
let httpServiceGet = promisefy(_httpServiceGet)

let _httpServicePost = function (url, api, req, cb) {
    let apiHost = OWAPPAPIHOST ? OWAPPAPIHOST : APIHOST;
    if (url == "/dp/box/list" || url == "/dp/box/bind") {
        apiHost = APIHOST;
    }

    // 强制使用远程
    apiHost = APIHOST;

    let ProtoReq = protoRoot.lookup(api + "Req");
    let reqObj = ProtoReq.create(req);
    // console.log(reqObj);

    let apiUrl = apiHost + url;
    if (Appid) {
        apiUrl = apiUrl + "?appid=" + Appid;
    }

    httpService.post(apiUrl, reqObj, {
        transformRequest: function (data) {
            // console.log("============");
            // console.log(data)
            let reqBuf = ProtoReq.encode(data).finish();
            // console.log(reqBuf)
            return reqBuf;
        }
    }).then(function (data) {
        // console.log(api)
        let ProtoResp = protoRoot.lookup(api + 'Resp')
        let buf = protobuf.util.newBuffer(data.data);
        let decodedResponse = ProtoResp.decode(buf)
        if (process.env.NODE_ENV != 'production') {
            console.log(reqObj);
            console.log(decodedResponse)
        }
        cb ? cb(null, decodedResponse) : null;
    }).catch((error) => {
        // console.log(reqObj);
        cb ? cb(error, null) : null;
    });
}

let httpServicePost = promisefy(_httpServicePost)

function getQueryString(text, key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    var r = text.match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function parseUrlParams(url) {
    var params = url.split("?");
    if (params.length > 1) {
        params = params[1];
    } else {
        params = params[0]
    }
    var paramArr = params.split('&');
    var res = {};
    for (var i = 0; i < paramArr.length; i++) {
        var str = paramArr[i].split('=');
        res[str[0]] = str[1];
    }
    return res;
}

function getSign(data, rkey) {
    // console.log(data);
    let res = Object.keys(data).sort();
    let string = ""
    for (let key in res) {
        // console.log("key: " + res[key] + " ,value: " + data[res[key]]);
        let newKey = res[key];
        let value = data[res[key]];
        if (string != "") {
            string += ("&" + newKey + "=" + value);
        } else {
            string += (newKey + "=" + value);
        }
    }
    string += ("&key=" + rkey);
    // console.log(string);
    return md5(string);
    // cb ? cb(null, md5(string)) : null;
}

export default {
    postUserLog: function (req, cb) {
        sendTanServerPost("/api/owdl/log/user", req, cb);
    },
    getJdbConfig: function (req, cb) {
        sendTanServerGet("/api/owdl/setting/jdb", req, cb);
    },
    setLocalApiHost: function (api) {
        OWAPPAPIHOST = api;
    },
    setAppid: function (appid) {
        Appid = appid;
    },
    uploadTorrent: function (data, formData, cb) {
        let api = "/dp/sub/resolve?";
        Object.keys(data).forEach(function (key) {
            api += (key + "=" + data[key] + "&")
        });
        sendUploadServer(api, formData, cb)
    },
    getSysInfo: function (data, cb) {
        sendOwappServer("/sys/info", data, cb)
    },
    setXyappSpace: function (data, cb) {
        sendOwappServer("/xyapp/space/set", data, cb)
    },
    getXyappSpace: function (data, cb) {
        sendOwappServer("/xyapp/space/get", data, cb)
    },
    setXyappSlimit: function (data, cb) {
        sendOwappServer("/xyapp/slimit/set", data, cb)
    },
    getXyappSlimit: function (data, cb) {
        sendOwappServer("/xyapp/slimit/get", data, cb)
    },
    getXyappAgree: function (data, cb) {
        sendOwappServer("/xyapp/agree", data, cb)
    },
    getXyappStatus: function (data, cb) {
        sendOwappServer("/xyapp/status", data, cb)
    },
    setSysUserAgree: function (data, cb) {
        sendOwappServer("/sys/user/agree", data, cb)
    },
    getSysUserStatus: function (data, cb) {
        sendOwappServer("/sys/user/status", data, cb)
    },
    getLogin: function (data, cb) {
        sendStatServer("/wx/account/auth", data, cb);
    },
    getTaskList: function (req, cb) {
        // TS_TASK_WAITING      TaskState = 0
        // TS_TASK_RUNNING                = 1
        // TS_TASK_PAUSED                 = 2
        // TS_TASK_SUCCESS                = 3
        // TS_TASK_FAILED                 = 4
        // TS_TASK_DELETED                = 5
        // TS_TASK_DL_SEED                = 6 // discard
        // TS_TASK_WAIT_DL_SEED           = 7 // discard
        // TS_TASK_RECYCLED               = 8 // server
        // TS_TASK_ERROR                  = 20
        return httpServiceGet("/dp/task/list", "TaskidList", req, cb);
    },
    postUrlResolve: function (url, cb) {
        let req = {
            token: "aatoken",
            userid: "463",
            pid: "00E04B68082E6464OW",
            uuid: "00E04B68082E6464OW",
            url: url
        }
        httpServicePost("/dp/url/resolve", "URLResolve", req, cb);
    },
    postTaskInfo: function (req, cb) {
        return httpServicePost("/dp/task/info", "TaskInfo", req, cb);
    },
    postTaskStart: function (req, cb) {
        httpServicePost("/dp/task/start", "TaskStart", req, cb);
    },
    postTaskPause: function (req, cb) {
        httpServicePost("/dp/task/pause", "TaskPause", req, cb);
    },
    postTaskRestore: function (req, cb) {
        httpServicePost("/dp/task/restore", "TaskRestore", req, cb);
    },
    postTaskDel: function (req, cb) {
        httpServicePost("/dp/task/delete", "TaskDel", req, cb);
    },
    postTaskMainProgress: function (req, cb) {
        httpServicePost("/dp/task/progress", "TaskMainProgress", req, cb);
    },
    /*
    postTaskNew: function(req, cb) {
      httpServicePost("/dp/task/new", "TaskNew", req, cb);
    },
     */
    postTaskNew: function (req, cb) {
        return httpServicePost("/dp/task/new", "TaskNew", req, cb);
    },

    getUserDevices: function (req, key, cb) {
        let sign = getSign(req, key);
        req.sign = sign;
        sendStatServer("/jdb/book/query", req, cb);
    },
    postUserDevices: function (req, key, cb) {
        let sign = getSign(req, key);
        req.sign = sign;
        sendStatServer("/jdb/book/register", req, cb);
    },
    getBoxList: function (req, cb) {
        httpServiceGet("/dp/box/list", "BoxList", req, cb);
    },
    postBoxBind: function (req, cb) {
        httpServicePost("/dp/box/bind", "BoxBind", req, cb);
    },
    getLanDevices: function (req, cb) {
        sendStatServer("/wcjs/lan/find", req, cb)
    },
    getRptAgree: function (req, cb) {
        sendStatServerGet("/rpt/agree/get", req, cb);
    },
    setRptAgree: function (req, cb) {
        console.log(req);
        sendStatServerGet("/rpt/agree/set", req, cb);
    },
    cleanUserBind: function (req, cb) {
        sendStatServerGet("/air/jdb/clean", req, cb);
    },
    getDevStatus: function (req, cb) {
        sendStatServerGet("/dev/status", req, cb);
    },
    getDevLimit: function (req, cb) {
        sendStatServerGet("/dev/limit", req, cb);
    },
    setDevLimit: function (req, cb) {
        sendStatServer("/dev/limit", req, cb);
    },
    getDevPid: function (req, cb) {
        sendStatServerGet("/dev/pid/query", req, cb);
    },
    getActiveCode: function (req, cb) {
        sendDpisServerGet("/dp/box/activecode", req, cb)
    }
}
