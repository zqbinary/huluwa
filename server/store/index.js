import Vue from 'vue';
import Vuex from 'vuex';
import Req from '../req';
import Common from '../common';

Vue.use(Vuex);

export default new Vuex.Store({
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
    loginUrl: 'https://open.weixin.qq.com/connect/qrconnect?appid=wxa64ad1d6cb625050&redirect_uri=http://www.ionewu.com/wx_login.html?url=' + encodeURIComponent(window.location.href.split('?')[0]) + '&response_type=code&scope=snsapi_login&state=#wechat_redirect',
    user: {
      uid: '',
      name: '',
      avatar: '',
      openid: '',
      owcode: '',
      rkey: '',
      pid: '',
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
  },
  mutations: {},
  actions: {
    getInfoFromPid: function (store, [pid]) {
      let data = {
        cid: null,
        did: null
      };
      if (pid.length > 6) {
        data.cid = parseInt(pid.substr(-6, 2), 16);
        data.did = parseInt(pid.substr(-4, 2), 16);
      }
      return data;
    },
    cleanList: function (store) {
      store.state.downloadTaskidList = [];
      store.state.downloadTaskInfoList = [];
      store.state.downloadTaskCount = 0;
      store.state.doneTaskidList = [];
      store.state.doneTaskInfoList = [];
      store.state.doneTaskCount = 0;
      store.state.delTaskidList = [];
      store.state.delTaskInfoList = [];
      store.state.delTaskCount = 0;
    },
    updateLocalApiHost: function (store, [host]) {
      store.state.localApiHost = host;
      Req.setLocalApiHost(host);
    },
    updateFrom: function (store, [from]) {
      store.state.user.from = from;
      Req.setAppid(store.state.user.from);
    },
    showLoading: function (store) {
      store.state.isShowLoading = true;
    },
    hideLoading: function (store) {
      store.state.isShowLoading = false;
    },
    logout: function (store) {
      store.dispatch('sendUserLog', ['logout', '']);
      localStorage.setItem('owdl-uid', '');
      localStorage.setItem('owdl-openid', '');
      localStorage.setItem('owdl-name', '');
      localStorage.setItem('owdl-avatar', '');
      localStorage.setItem('owdl-rkey', '');
      localStorage.setItem('owdl-owcode', '');
      store.state.isLogin = false;
      window.location.reload();
    },
    checkLogin: function (store, [cb]) {
      let uid = localStorage.getItem('owdl-uid');
      let openid = localStorage.getItem('owdl-openid');
      let name = localStorage.getItem('owdl-name');
      let avatar = localStorage.getItem('owdl-avatar');
      let rkey = localStorage.getItem('owdl-rkey');
      let owcode = localStorage.getItem('owdl-owcode');
      if (uid && avatar && owcode && rkey) {
        store.state.user.uid = uid;
        store.state.user.openid = openid;
        store.state.user.name = name;
        store.state.user.avatar = avatar;
        store.state.user.owcode = owcode;
        store.state.user.rkey = rkey;
        store.state.isLogin = true;
      }
      cb ? cb() : null;
    },
    checkBind: function (store) {
      // store.dispatch("getUserDevices", [function (err, data) {
      // 	if (data.rtn == 0 && data.pids && data.pids.length > 0) {}
      // }]);
    },
    getLogin: function (store, [code, tuid, buid, appid, chanid, refuid, cb]) {
      let req = {
        code: code,
        tuid: tuid,
        buid: buid,
        appid: appid,
        chanid: chanid,
        ref_uid: refuid,
        from: 'dpd'
      };
      Req.getLogin(req, function (err, data) {
        store.dispatch('sendUserLog', ['getLogin', JSON.stringify(req) + JSON.stringify(data)]);
        if (data.rtn == 0) {
          let uid = data.data.uid;
          let openid = data.data.openid;
          let nickname = data.data.nick;
          let headimg = data.data.headimgurl;
          let owcode = data.data.owcode;
          let rkey = data.data.rkey;
          localStorage.setItem('owdl-uid', uid);
          localStorage.setItem('owdl-openid', openid);
          localStorage.setItem('owdl-name', nickname);
          localStorage.setItem('owdl-avatar', headimg);
          localStorage.setItem('owdl-owcode', owcode);
          localStorage.setItem('owdl-rkey', rkey);
          store.state.user.uid = uid;
          store.state.user.openid = openid;
          store.state.user.name = nickname;
          store.state.user.avatar = headimg;
          store.state.user.owcode = owcode;
          store.state.user.rkey = rkey;
          store.state.isLogin = true;
        }
        cb ? cb(err, data) : null;
      });
    },
    getUserDevices: function (store, [cb]) {
      let req = {
        uid: store.state.user.uid,
        owcode: store.state.user.owcode
      };
      Req.getUserDevices(req, store.state.user.rkey, function (err, data) {
        if (!err && data.rtn == 0 && data.pids && data.pids.length > 0) {
          store.state.user.pid = data.pids[0];
        }
      });
    },
    postUserDevices: function (store, [pid, cb]) {
      let req = {
        uid: store.state.user.uid,
        pid: pid,
        flag: 1,
        owcode: store.state.user.owcode
      };
      Req.postUserDevices(req, store.state.user.rkey, function (err, data) {
        store.dispatch('sendUserLog', ['postUserDevices', JSON.stringify(req) + JSON.stringify(data)]);
        cb ? cb(err, data) : null;
      });
    },
    uploadTorrent: function (store, [formData, cb]) {
      let req = {
        token: 'Iloveionewu',
        pid: store.state.user.pid,
        userid: store.state.user.uid
      };
      Req.uploadTorrent(req, formData, cb);
    },
    getTaskList: function (store, [type, pos, num, cb]) {
      if (!store.state.user.pid) {
        cb ? cb(null, null) : null;
        return;
      }
      let req = {
        token: store.state.user.owcode,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        userid: store.state.user.uid,
        type: type,
        pos: pos,
        num: num
      };
      Req.getTaskList(req, function (err, data) {
        if (data.resp && data.resp.rtn == 10109) {
          store.dispatch('logout');
        }

        if (!err && data.taskidList.length > 0) {

          // 更新列表任务数量
          if (type == 0) {
            store.state.downloadTaskCount = data.len ? data.len : 0;
          } else if (type == 1) {
            store.state.doneTaskCount = data.len ? data.len : 0;
          } else if (type == 2) {
            store.state.delTaskCount = data.len ? data.len : 0;
          }

          // console.log(store.state)

          // if (pos <= 0) {
          // 	if (type == 0) {
          // 		store.state.downloadTaskidList = [];
          // 	} else if (type == 1) {
          // 		store.state.doneTaskidList = [];
          // 	} else if (type == 2) {
          // 		store.state.delTaskidList = [];
          // 	}
          // }

          for (let index = 0; index < data.taskidList.length; index++) {
            let taskidItem = data.taskidList[index];
            // 更新任务信息列表状态
            for (let j = 0; j < store.state.taskInfoList.length; j++) {
              let taskInfo = store.state.taskInfoList[j];
              if (taskidItem.taskid == taskInfo.taskid) {
                taskInfo.state = taskidItem.state;
                break;
              }
            }
            if (taskidItem.state == 3) {
              for (let j = 0; j < store.state.downloadTaskidList.length; j++) {
                let downloadTaskidInfo = store.state.downloadTaskidList[j];
                if (taskidItem.taskid == downloadTaskidInfo.taskid) {
                  store.state.downloadTaskidList.splice(j, 1);
                  store.state.downloadTaskCount--;
                  store.dispatch('getTaskInfo', [
                    [taskidItem.taskid]
                  ]);
                  break;
                }
              }
            }
          }

          // 拉到新任务添加到列表
          for (let index = 0; index < data.taskidList.length; index++) {
            const element = data.taskidList[index];
            if (type == 0) {
              let isHas = false;
              for (let j = 0; j < store.state.downloadTaskidList.length; j++) {
                const taskidItem = store.state.downloadTaskidList[j];
                if (taskidItem.taskid == element.taskid) {
                  isHas = true;
                  break;
                }
              }
              if (!isHas) {
                store.state.downloadTaskidList.push(element);
              }
            } else if (type == 1) {
              let isHas = false;
              for (let j = 0; j < store.state.doneTaskidList.length; j++) {
                const taskidItem = store.state.doneTaskidList[j];
                if (taskidItem.taskid == element.taskid) {
                  isHas = true;
                  break;
                }
              }
              if (!isHas) {
                store.state.doneTaskidList.push(element);
              }
            } else if (type == 2) {
              let isHas = false;
              for (let j = 0; j < store.state.delTaskidList.length; j++) {
                const taskidItem = store.state.delTaskidList[j];
                if (taskidItem.taskid == element.taskid) {
                  isHas = true;
                  break;
                }
              }
              if (!isHas) {
                store.state.delTaskidList.push(element);
              }
            }
          }

          // 更新任务信息
          let ids = [];
          for (let index = 0; index < data.taskidList.length; index++) {
            const element = data.taskidList[index];
            ids.push(element.taskid);
          }

          if (ids.length > 0) {
            store.dispatch('checkTaskInfo', [ids]);
            if (type == 0) {
              // store.dispatch("postTaskMainProgress", [ids]);
            }
          } else {
            store.dispatch('updateTaskLists');
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    checkTaskInfo: function (store, [ids]) {
      for (let index = 0; index < store.state.taskInfoList.length; index++) {
        let taskInfo = store.state.taskInfoList[index];
        for (let j = 0; j < ids.length; j++) {
          let taskid = ids[j];
          if (taskInfo.taskid == taskid) {
            ids.splice(j, 1);
            break;
          }
        }
      }
      if (ids.length > 0) {
        store.dispatch('getTaskInfo', [ids]);
      } else {
        store.dispatch('updateTaskLists');
      }
    },
    getTaskInfo: function (store, [ids]) {
      let req = {
        rid: new Date().getTime(),
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: ids
      };
      Req.postTaskInfo(req, function (err, data) {
        // store.state.downloadTaskInfoList = data.taskInfo;
        for (let index = 0; index < data.taskInfo.length; index++) {
          let newItem = data.taskInfo[index];
          newItem = {
            completeTime: newItem.completeTime ? newItem.completeTime : 0,
            createTime: newItem.createTime ? newItem.createTime : 0,
            downTime: newItem.downTime ? newItem.downTime : 0,
            failCode: newItem.failCode ? newItem.failCode : 0,
            name: newItem.name ? newItem.name : '',
            path: newItem.path ? newItem.path : '',
            dlSize: newItem.dlSize ? newItem.dlSize : 0,
            size: newItem.size ? newItem.size : 0,
            state: newItem.state ? newItem.state : 0,
            sub: newItem.sub ? newItem.sub : [],
            taskid: newItem.taskid ? newItem.taskid : '',
            type: newItem.type ? newItem.type : 0,
            url: newItem.url ? newItem.url : ''
          };
          // console.log(newItem);
          let isHas = false;
          for (let j = 0; j < store.state.taskInfoList.length; j++) {
            let oldItem = store.state.taskInfoList[j];
            if (newItem.taskid == oldItem.taskid) {
              store.state.taskInfoList[j] = newItem;
              isHas = true;
              break;
            }
          }
          if (!isHas) {
            store.state.taskInfoList.push(newItem);
          }
        }
        // console.log(store.state.taskInfoList)
        // console.log("store.state.taskInfoList", store.state.taskInfoList);
        store.dispatch('updateTaskLists');
        // if (store.state.taskInfoList.length > 0) {
        // 	setTimeout(function () {
        // 		store.dispatch("syncTaskProgress");
        // 	}, 2000);
        // }
      });
    },
    syncTaskProgress: function (store) {
      let ids = [];
      for (
        let index = 0; index < store.state.downloadTaskInfoList.length; index++
      ) {
        let element = store.state.downloadTaskInfoList[index];

        if (element.state == 1 || !element.state) {
          // console.log(element.name, element.state);
          ids.push(element.taskid);
        }
      }
      if (ids.length > 0) {
        store.dispatch('postTaskMainProgress', [ids]);
      } else {
        store.state.allSpeed = Common.formatSize(0);
      }
    },
    updateTaskLists: function (store) {
      store.state.downloadTaskInfoList = [];
      for (let index = 0; index < store.state.downloadTaskidList.length; index++) {
        let taskidItem = store.state.downloadTaskidList[index];
        for (let j = 0; j < store.state.taskInfoList.length; j++) {
          const element = store.state.taskInfoList[j];
          if (element.taskid == taskidItem.taskid) {
            store.state.downloadTaskInfoList.push(element);
            break;
          }
        }
      }
      // console.log("store.state.downloadTaskidList", store.state.downloadTaskidList)
      // console.log("store.state.downloadTaskInfoList", store.state.downloadTaskInfoList)

      store.state.doneTaskInfoList = [];
      for (let index = 0; index < store.state.doneTaskidList.length; index++) {
        let taskidItem = store.state.doneTaskidList[index];
        for (let j = 0; j < store.state.taskInfoList.length; j++) {
          const element = store.state.taskInfoList[j];
          if (element.taskid == taskidItem.taskid) {
            store.state.doneTaskInfoList.push(element);
            break;
          }
        }
      }
      // console.log("store.state.doneTaskidList", store.state.doneTaskidList)
      // console.log("store.state.doneTaskInfoList", store.state.doneTaskInfoList)

      store.state.delTaskInfoList = [];
      for (let index = 0; index < store.state.delTaskidList.length; index++) {
        let taskidItem = store.state.delTaskidList[index];
        for (let j = 0; j < store.state.taskInfoList.length; j++) {
          const element = store.state.taskInfoList[j];
          if (element.taskid == taskidItem.taskid) {
            store.state.delTaskInfoList.push(element);
            break;
          }
        }
      }
      // console.log("store.state.delTaskidList", store.state.delTaskidList)
      // console.log("store.state.delTaskInfoList", store.state.delTaskInfoList)
    },
    removeTaskidListItem: function (store, [taskidList, taskid]) {
      for (let j = 0; j < taskidList.length; j++) {
        let element = taskidList[j];
        if (element.taskid == taskid) {
          taskidList.splice(j, 1);
          break;
        }
      }
    },
    addTaskidListItem: function (store, [taskidList, taskid, state]) {
      taskidList.push({
        taskid: taskid,
        state: state
      });
    },
    addTaskInfoItem: function (store, [taskid, name, state]) {
      store.state.taskInfoList.push({
        taskid: taskid,
        name: name,
        state: state,
        completeTime: 0,
        createTime: 0,
        downTime: 0,
        failCode: 0,
        path: '',
        dlSize: 0,
        size: 0,
        sub: [],
        type: 0,
        url: ''
      });
    },
    updateTaskState: function (store, [taskid, state]) {
      for (let j = 0; j < store.state.taskInfoList.length; j++) {
        const element = store.state.taskInfoList[j];
        if (element.taskid == taskid) {
          element.state = state;
          break;
        }
      }
      store.dispatch('updateTaskLists');
    },
    postTaskMainProgress: function (store, [ids]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: ids
      };
      Req.postTaskMainProgress(req, function (err, data) {
        let allSpeed = 0;
        let isRefreshDone = false;
        for (let index = store.state.downloadTaskInfoList.length - 1; index >= 0; index--) {
          let info = store.state.downloadTaskInfoList[index];
          for (let j = 0; j < data.taskDyn.length; j++) {
            let progress = data.taskDyn[j];
            progress.dlSpeed = progress.dlSpeed ? progress.dlSpeed : 0;
            if (progress.state == 3) {
              isRefreshDone = true;
            }
            if (progress.taskid == info.taskid) {
              if (info.state == 1) {
                allSpeed += progress.dlSpeed;
              }

              if (progress.state == 3) {
                store.dispatch('removeTaskidListItem', [store.state.downloadTaskidList, progress.taskid]);
                store.dispatch('removeTaskidListItem', [store.state.downloadTaskInfoList, progress.taskid]);
                store.dispatch('addTaskidListItem', [store.state.doneTaskidList, progress.taskid, progress.state]);
              }
              delete progress.state;
              info = Object.assign(info, progress);
              break;
            }
          }
        }

        // for (let index = 0; index < store.state.taskInfoList.length; index++) {
        // 	let info = store.state.taskInfoList[index];
        // 	for (let j = 0; j < data.taskDyn.length; j++) {
        // 		let progress = data.taskDyn[j];
        // 		if (progress.taskid == info.taskid) {
        // 			info = Object.assign(info, progress)
        // 			break;
        // 		}
        // 	}
        // }

        // if(isRefreshDone) {
        // 	store.dispatch("");
        // }

        store.state.allSpeed = Common.formatSize(allSpeed);
      });
    },
    postTaskDel: function (store, [listType, uuid, id, state, isRecycled, isDelFile, cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        mode: 1,
        taskDel: [{
          uuid: uuid,
          taskid: id,
          recycled: isRecycled,
          delFile: isDelFile
        }]
      };
      Req.postTaskDel(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskDel', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn || data.resp.rtn == 603) {
            if (listType == 'done') {
              store.dispatch('removeTaskidListItem', [store.state.doneTaskidList, id]);
              store.state.doneTaskCount--;
            } else if (listType == 'download') {
              store.dispatch('removeTaskidListItem', [store.state.downloadTaskidList, id]);
              store.state.downloadTaskCount--;
            } else if (listType == 'del') {
              store.dispatch('removeTaskidListItem', [store.state.delTaskidList, id]);
            }
            if (isRecycled) {
              store.dispatch('addTaskidListItem', [store.state.delTaskidList, id, state + 64]);
              store.state.delTaskCount++;
            }
            store.dispatch('updateTaskState', [id, state + 64]);
          } else {
            store.state.alertToast.type = 'error';
            store.state.alertToast.text = '任务删除失败';
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    postTaskClean: function (store, [isRecycled, isDelFile, cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        mode: 1,
        taskDel: []
      };
      let tasks = [];
      for (let index = 0; index < store.state.delTaskInfoList.length; index++) {
        let element = store.state.delTaskInfoList[index];
        tasks.push({
          uuid: store.state.user.uuid,
          taskid: element.taskid,
          recycled: isRecycled,
          delFile: isDelFile
        });
      }
      req.taskDel = tasks;
      Req.postTaskDel(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskClean', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn) {
            store.state.delTaskidList = [];
            store.dispatch('updateTaskLists');
            store.state.delTaskCount = 0;
          }
        }
        cb ? cb(err, data) : null;
      });
    },

    postTaskPauseAll: function (store, [cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: []
      };
      for (let index = 0; index < store.state.downloadTaskInfoList.length; index++) {
        let element = store.state.downloadTaskInfoList[index];
        if (element.state == 1 || element.state === 0) {
          req.taskid.push(element.taskid);
        }
      }
      Req.postTaskPause(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskPauseAll', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn) {
            for (let index = 0; index < req.taskid.length; index++) {
              let id = req.taskid[index];
              store.dispatch('updateTaskState', [id, 2]);
            }
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    postTaskPause: function (store, [id, cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: [id]
      };
      Req.postTaskPause(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskPause', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn) {
            store.dispatch('updateTaskState', [id, 2]);
          } else {
            store.state.alertToast.type = 'error';
            store.state.alertToast.text = '任务暂停失败';
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    postTaskStart: function (store, [id, cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: [id]
      };
      Req.postTaskStart(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskStart', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn) {
            store.dispatch('updateTaskState', [id, 1]);
          } else {
            store.state.alertToast.type = 'error';
            store.state.alertToast.text = '任务开启失败';
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    postTaskStartAll: function (store, [cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: []
      };
      for (let index = 0; index < store.state.downloadTaskInfoList.length; index++) {
        let element = store.state.downloadTaskInfoList[index];
        if (element.state == 0 || element.state == 2) {
          req.taskid.push(element.taskid);
        }
      }
      Req.postTaskStart(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskStartAll', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn) {
            let count = 0;
            for (let index = 0; index < req.taskid.length; index++) {
              let id = req.taskid[index];
              store.dispatch('updateTaskState', [id, 1]);
              count++;
              if (count >= 3) {
                break;
              }
            }
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    postTaskRestore: function (store, [id, state, cb]) {
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        taskid: [id]
      };
      Req.postTaskRestore(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskRestore', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err) {
          if (!data.resp.rtn) {
            if (state == (3 + 64)) {
              store.dispatch('addTaskidListItem', [store.state.doneTaskidList, id, state - 64]);
              store.state.doneTaskCount++;
            } else {
              store.dispatch('addTaskidListItem', [store.state.downloadTaskidList, id, state - 64]);
              store.state.downloadTaskCount++;
            }
            store.dispatch('removeTaskidListItem', [store.state.delTaskidList, id]);
            store.dispatch('updateTaskState', [id, state - 64]);
            store.state.delTaskCount--;
          } else {
            store.state.alertToast.type = 'error';
            store.state.alertToast.text = '任务还原失败';
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    postTaskNew: function (store, [urls, cb]) {
      let tasks = [];
      for (let index = 0; index < urls.length; index++) {
        const element = urls[index];
        let path = '';
        if ((store.state.user.cid == 101 && store.state.user.did == 104) || store.state.user.cid == 114) {
          path = 'incomplete';
        }
        tasks.push({
          url: element,
          path: path
        });
      }
      let req = {
        token: store.state.user.owcode,
        userid: store.state.user.uid,
        pid: store.state.user.pid,
        uuid: store.state.user.uuid,
        mode: 1,
        tasks: tasks
      };
      Req.postTaskNew(req, function (err, data) {
        store.dispatch('sendUserLog', ['postTaskNew', JSON.stringify(req) + JSON.stringify(data)]);
        if (!err && data && data.taskRes && data.taskRes.length == tasks.length) {
          for (let index = 0; index < tasks.length; index++) {
            let task = tasks[index];
            let resTask = data.taskRes[index];
            let name = task.url;
            if (!resTask.rtn) {
              store.dispatch('addTaskInfoItem', [resTask.taskid, name, 0]);
              store.dispatch('addTaskidListItem', [store.state.downloadTaskidList, resTask.taskid, 0]);
            }
          }
          store.dispatch('updateTaskLists');
        }
        cb ? cb(err, data) : null;
      });
    },
    getLanDevices: function (store, [cb]) {
      let req = {
        uid: store.state.user.uid,
        openid: store.state.user.openid
      };
      Req.getLanDevices(req, cb);
    },
    getBoxList: function (store, [cb]) {
      let req = {
        userid: store.state.user.uid,
        token: store.state.user.owcode
      };
      // req.userid = 463;
      Req.getBoxList(req, function (err, data) {
        store.dispatch('sendUserLog', ['getBoxList', JSON.stringify(req) + JSON.stringify(data)]);
        if (data.resp && data.resp.rtn == 10109) {
          store.dispatch('logout');
        }
        cb ? cb(err, data) : null;
      });
    },
    postBoxBind: function (store, [pid, cb]) {
      let req = {
        userid: store.state.user.uid,
        toke: store.state.user.owcode,
        pid: pid
      };
      Req.postBoxBind(req, cb);
    },
    getXyappStatus: function (store, [cb]) {
      let req = {};
      Req.getXyappStatus(req, cb);
    },
    setXyappAgree: function (store, [cb]) {
      let req = {};
      Req.setXyappAgree(req, cb);
    },
    getSysUserStatus: function (store, [cb]) {
      let req = {};
      Req.getSysUserStatus(req, function (err, data) {
        cb ? cb(err, data) : null;
      });
    },
    setSysUserAgree: function (store, [cb]) {
      let req = {};
      Req.setSysUserAgree(req, function (err, data) {
        store.dispatch('sendUserLog', ['setSysUserAgree', JSON.stringify(req) + JSON.stringify(data)]);
        cb ? cb(err, data) : null;
      });
    },
    getRptAgreeWithPid: function (store, [pid, cb]) {
      let req = {
        pid: pid
      };
      Req.getRptAgree(req, cb);
    },
    getRptAgree: function (store, [cb]) {
      let req = {
        pid: store.state.user.pid
      };
      Req.getRptAgree(req, cb);
    },
    setRptAgree: function (store, [cb]) {
      let req = {
        pid: store.state.user.localPid ? store.state.user.localPid : store.state.user.pid
      };
      store.dispatch('setSysUserAgree', []);
      Req.setRptAgree(req, function (err, data) {
        store.dispatch('sendUserLog', ['setRptAgree', JSON.stringify(req) + JSON.stringify(data)]);
        cb ? cb(err, data) : null;
      });
    },
    getXyappSlimit: function (store, [cb]) {
      let req = {};
      Req.getXyappSlimit(req, cb);
    },
    setXyappSlimit: function (store, [cb]) {
      let req = {};
      Req.setXyappSlimit(req, cb);
    },
    getXyappSpace: function (store, [cb]) {
      let req = {};
      Req.getXyappSpace(req, cb);
    },
    setXyappSpace: function (store, [cb]) {
      let req = {};
      Req.setXyappSpace(req, cb);
    },
    getSysInfo: function (store, [cb]) {
      let req = {};
      Req.getSysInfo(req, function (err, data) {
        if (!err) {
          store.state.user.pid = data.pid;
          store.state.user.localPid = data.pid;
        }
        cb ? cb(err, data) : null;
      });
    },
    getJdbConfig: function (store, [cb]) {
      let req = {
        pid: store.state.user.pid
      };
      Req.getJdbConfig(req, function (err, data) {
        if (!err && data) {
          if (data.data.isShow) {
            store.state.isShowJdb = true;
            store.state.user.sn = data.data.sn;
          }
        }
        cb ? cb(err, data) : null;
      });
    },
    sendUserLog: function (store, [type, msg, cb]) {
      let req = {
        uid: store.state.user.uid,
        pid: store.state.user.pid,
        type: type,
        msg: msg,
        from: store.state.from
      };
      Req.postUserLog(req, cb);
    },
    cleanUserBind: function (store, [cb]) {
      let req = {
        uid: store.state.user.uid,
        token: store.state.user.owcode,
        flag: 1
      };
      Req.cleanUserBind(req, cb);
    },
    getDevStatus: function (store, [pid, cb]) {
      let req = {
        uid: store.state.user.uid,
        pid: pid,
        token: store.state.user.owcode
      };
      Req.getDevStatus(req, cb);
    },
    getDevLimit: function (store, [cb]) {
      let req = {
        uid: store.state.user.uid,
        pid: store.state.user.pid,
        token: store.state.user.owcode
      };
      Req.getDevLimit(req, cb);
    },
    setDevLimit: function (store, [uploadspeed, diskcache, cb]) {
      let req = {
        uid: store.state.user.uid,
        pid: store.state.user.pid,
        token: store.state.user.owcode,
        uploadspeed: uploadspeed,
        diskcache: diskcache
      };
      Req.setDevLimit(req, cb);
    },
    getDevPid: function (store, [sn, mac, cb]) {
      let req = {
        appid: store.state.user.from,
        sn: sn,
        mac: mac
      };
      Req.getDevPid(req, cb);
    },
    getActiveCode: function (store, [pid, cb]) {
      let req = {
        appid: store.state.user.from,
        pid: pid
      };
      Req.getActiveCode(req, function (err, data) {
        store.dispatch('sendUserLog', ['getActiveCode', JSON.stringify(req) + JSON.stringify(data)]);
        cb ? cb(err, data) : null;
      });
    },
    postActiveCode: function (store, [code, cb]) {
      let req = {
        uid: store.state.user.uid,
        activecode: code,
        flag: 1,
        owcode: store.state.user.owcode
      };
      Req.postUserDevices(req, store.state.user.rkey, function (err, data) {
        store.dispatch('sendUserLog', ['postActiveCode', JSON.stringify(req) + JSON.stringify(data)]);
        cb ? cb(err, data) : null;
      });
    },
  },
  modules: {}
});
