//原 store/index.js
import Req from './req';
import Common from './common';
import dotenv from 'dotenv'

const fromEnvUser = (dotenv.config()).parsed

const storeX = {
    state: {
        from: 'web',
        mode: 'local',
        localApiHost: '',
        allSpeed: '0 B',
        isLogin: false,
        isNoticeAgree: false,
        isShowUnbind: false,
        isShowMenu: false,
        isShowLogin: false,
        isShowAdd: false,
        isShowNotice: false,
        isShowSupportNotice: false,
        isShowNoticeOnly: false,
        isShowSetting: false,
        settingType: '',
        isShowLoading: true,
        isShowJdb: false,
        isShowJdbAlert: false,
        isShowOffline: false,
        isShowActive: false,
        isShowActiveCode: false,
        isOffline: false,
        alertToast: {
            time: 3000,
            type: 'success',
            text: ''
        },
        alertError: {
            text: ''
        },
        //这个暂时不做
        // loginUrl: 'https://open.weixin.qq.com/connect/qrconnect?appid=wxa64ad1d6cb625050&redirect_uri=http://www.ionewu.com/wx_login.html?url=' + encodeURIComponent(window.location.href.split('?')[0]) + '&response_type=code&scope=snsapi_login&state=#wechat_redirect',
        loginUrl: '',
        user: {
            uid: fromEnvUser.VUE_APP_OWDL_UID,
            name: fromEnvUser.VUE_APP_OWDL_NAME,
            avatar: fromEnvUser.VUE_APP_OWDL_AVATAR,
            openid: fromEnvUser.VUE_APP_OWDL_OPENID,
            owcode: fromEnvUser.VUE_APP_OWDL_OWCODE,
            rkey: fromEnvUser.VUE_APP_OWDL_RKEY,
            pid: fromEnvUser.VUE_APP_OWDL_PID,
            cid: '',
            did: '',
            localPid: '',
            sn: '',
            uuid: '',
            devStatus: '',
            devName: '',
            devAddr: '',
            localDevName: '',
            localDevAddr: '',
            owappStatus: '',
            from: '',
            mac: ''
        },
        taskInfoList: [],
        downloadTaskidList: [],
        downloadTaskInfoList: [],
        downloadTaskCount: 0,
        doneTaskidList: [],
        doneTaskInfoList: [],
        doneTaskCount: 0,
        delTaskidList: [],
        delTaskInfoList: [],
        delTaskCount: 0
    }
};

export default storeX;
