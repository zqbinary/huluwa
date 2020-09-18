import storeX from "./index";
import Req from "./req";
import {dd, rt, dot_get} from './utils'

let store = storeX;

class Action {
    static showMsg(code) {
        const dict = {
            postTaskNew: {
                601: "无效的操作",
                602: "请检查下载链接",
                604: "请检查下载链接",
                311: "任务创建失败",
                609: "任务创建失败",
                610: "下载任务已满",
                612: "任务重复",
            },
            getTaskList: {
                type: {
                    0: '正在下载',
                    1: '已完成',
                    2: '已删除'
                },
                state: {
                    0: '等待下载',
                    // 1: _that.$common.formatSize(speed) + '/s',
                    1: '正在下载',
                    2: '已暂停',
                    3: '已完成',
                    // if (failCode == 4225) { 是版权问题啥的
                    4: '下载失败',
                    5: '已删除'
                }

            }
        }
        return dot_get(dict, code) || '未知编码';
    }

    static async postTaskPause(ids) {
        let req = {
            token: store.state.user.owcode,
            userid: store.state.user.uid,
            pid: store.state.user.pid,
            uuid: store.state.user.uuid,
            taskid: ids//array
        };
        try {
            let data = await Req.postTaskPause(req);
            if (!data.resp.rtn) {
                return rt(200, '暂停成功', data)
                // store.dispatch('updateTaskState', [id, 2]);
            } else {
                return rt(400, '暂停失败', data)
            }
        } catch (err) {
            return rt(500, '暂停错误', e)
        }
    }

    static async postTaskStart(ids) {
        let req = {
            token: store.state.user.owcode,
            userid: store.state.user.uid,
            pid: store.state.user.pid,
            uuid: store.state.user.uuid,
            taskid: ids
        };
        try {
            let data = await Req.postTaskStart(req);
            // store.dispatch('sendUserLog', ['postTaskStart', JSON.stringify(req) + JSON.stringify(data)]);
            if (!data.resp.rtn) {
                return rt(200, '开始成功', data)
                // store.dispatch('updateTaskState', [id, 1]);
            } else {
                return rt(400, '开始失败', data)
            }
        } catch (e) {
            return rt(500, '任务开始错误', e)
        }

    }

    //支持多个
    static async postTaskNew(urlsString) {
        let urls = urlsString.split("\n");
        for (let index = urls.length - 1; index >= 0; index--) {
            let element = urls[index];
            // console.log(element);
            if (!element || element == " ") {
                urls.splice(index, 1);
            }
        }
        if (urls.length <= 0) {
            return rt(422, "请输入下载链接")
        }

        let tasks = [];
        for (let index = 0; index < urls.length; index++) {
            const element = urls[index];
            let path = '';
            if ((store.state.user.cid == 101 && store.state.user.did == 104) || store.state.user.cid == 114) {
                path = 'incomplete';
                return;
            }
            tasks.push({
                url: element,
                path: path
            });
        }
        //构造所有任务以后 扔进去
        let req = {
            token: store.state.user.owcode,
            userid: store.state.user.uid,
            pid: store.state.user.pid,
            uuid: store.state.user.uuid,
            mode: 1,
            tasks: tasks
        };
        try {
            let data = await Req.postTaskNew(req);
            return rt('200', '', data);
        } catch (e) {
            dd('post err', e)
            return rt('500', '', e);
        }
    }

    static async getTaskInfo(ids) {
        let req = {
            rid: new Date().getTime(),
            token: store.state.user.owcode,
            userid: store.state.user.uid,
            pid: store.state.user.pid,
            uuid: store.state.user.uuid,
            taskid: ids
        };
        let data = await Req.postTaskInfo(req)
        return rt(200, 'ok', data)
    }

    static async getDownloadTaskIds() {
        let tasks = await Action.getTaskList(0, 0, 50);
        let ids = [];
        if (tasks.code < 400) {
            ids = tasks.data.taskidList.map((item) => item.taskid.toString())
        } else {
            return tasks;
        }
        if (!ids.length) {
            return rt(422, '没有任务');
        }
        return rt(200, 'ok', ids);
    }

    static async getTaskList(type, pos, num) {
        if (!store.state.user.pid) {
            return rt(401, 'no pid');
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
        try {
            let data = await Req.getTaskList(req)
            if (data.resp && data.resp.rtn == 10109) {
                return rt(401, 'logout next');
                // store.dispatch('logout');
            }

            //todo think more
            //后面应该不用 只是为了写入本地
            return rt('200', 'ok', data)
        } catch (e) {
            dd('post err', e)
            return rt('500', '', e);
        }
    }

    static async postTaskMainProgress(ids) {
        let req = {
            token: store.state.user.owcode,
            userid: store.state.user.uid,
            pid: store.state.user.pid,
            uuid: store.state.user.uuid,
            taskid: ids
        };
        let data = await Req.postTaskMainProgress(req)
        let allSpeed = 0;
        let isRefreshDone = false;
        return rt('200', 'ok', data)
      }

}

export default Action;
