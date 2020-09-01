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
            /**
             * 612? 表示重复 还是已经下载
             * return {"resp":{"rtn":612},"taskRes":[{"rtn":612,"taskid":"1598871782005"}]}
             */
                //store.statedispatch('sendUserLog', ['postTaskNew', JSON.stringify(req) + JSON.stringify(data)]);

                // if (data && data.taskRes && data.taskRes.length == tasks.length) {
            let lists = [];
            let item = {};
            for (let index = 0; index < tasks.length; index++) {
                let task = tasks[index];
                let resTask = data.taskRes[index];
                item.rtn = resTask.rtn
                item.msg = Action.showMsg('postTaskNew.' + resTask.rtn)
                item.taskid = resTask.taskid.toString();
                item.url = task.url;
                //说明 这个链接服务器返回错误
                if (!resTask.rtn) {
                    dd('hi task', resTask)
                    // store.statedispatch('addTaskInfoItem', [resTask.taskid, name, 0]);
                    // store.statedispatch('addTaskidListItem', [store.state.downloadTaskidList, resTask.taskid, 0]);
                }
                lists.push(item)
            }
            // store.statedispatch('updateTaskLists');
            // }

            // let res = JSON.parse(JSON.stringify(data));
            dd('res', data.taskRes)
            return rt('200', '', {origin: data, lists});
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
        dd('res', data)
        return rt('', '', data)
        let lists = [];
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
            lists.push(newItem)
        }
        return rt(200, '', {lists, origin: data})
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

            return rt('', '', data)
            if (!data || !data.taskidList || !data.taskidList.length) {
                return rt(200, '任务列表是空的')
            }

            for (let index = 0; index < data.taskidList.length; index++) {
                let taskidItem = data.taskidList[index];
                // 更新任务信息列表状态
                for (let j = 0; j < store.state.taskInfoList.length; j++) {
                    let taskInfo = store.state.taskInfoList[j];
                    if (taskidItem.taskid == taskInfo.taskid) {
                        taskInfo.state = taskidItem.state;

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
        } catch (e) {
            dd('post err', e)
            return rt('500', '', e);
        }

    }
}

export default Action;
