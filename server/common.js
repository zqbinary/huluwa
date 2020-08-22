import moment from "moment"

export default {
    formatSize: function(value) {
        if (!value || null == value || value == "") {
            return "0 B";
        }
        var unitArr = new Array(
            "B",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB",
            "EB",
            "ZB",
            "YB"
        );
        var index = 0,
            srcsize = parseFloat(value);
        index = Math.floor(Math.log(srcsize) / Math.log(1024));
        var size = srcsize / Math.pow(1024, index);
        //  保留的小数位数
        size = size.toFixed(2);
        return size + " " + unitArr[index];
    },
    formatTime: function(time) {
        if (!time) {
            return "00:00:00";
        }
        let min = Math.floor(time % 3600);
        let val =
            this.formatTimeBit(Math.floor(time / 3600)) +
            ":" +
            this.formatTimeBit(Math.floor(min / 60)) +
            ":" +
            this.formatTimeBit(time % 60);
        return val;
    },
    formatTimeBit: function(val) {
        val = +val;
        return val > 9 ? val : "0" + val;
    },
    formatDate: function(value) {
        return moment(value).format("YYYY-MM-DD HH:mm:ss");
    },
    getInfoFromPid: function(pid) {
        let data = {
            cid: null,
            did: null
        }
        if (pid.length > 6) {
            data.cid = parseInt(pid.substr(-6, 2), 16);
            data.did = parseInt(pid.substr(-4, 2), 16);
        }
        return data
    }
}