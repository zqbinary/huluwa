/* eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/


var $protobuf = require('protobufjs/light');

var $root = ($protobuf.roots.default || ($protobuf.roots['default'] = new $protobuf.Root()))
  .addJSON({
    dp: {
      nested: {
        Response: {
          fields: {
            rtn: {
              type: 'sint32',
              id: 1
            },
            msg: {
              type: 'string',
              id: 2
            },
            mode: {
              type: 'sint32',
              id: 3
            }
          }
        },
        DaoRes: {
          fields: {
            rtn: {
              type: 'sint32',
              id: 1
            },
            msg: {
              type: 'string',
              id: 2
            },
            hit: {
              type: 'bool',
              id: 3
            }
          }
        },
        Partition: {
          fields: {
            path: {
              type: 'string',
              id: 1
            },
            uuid: {
              type: 'string',
              id: 2
            },
            leftSpace: {
              type: 'uint64',
              id: 3
            },
            totalSpace: {
              type: 'uint64',
              id: 4
            }
          }
        },
        BoxSettings: {
          fields: {
            downloadSpeedLimit: {
              type: 'sint32',
              id: 1
            },
            uploadSpeedLimit: {
              type: 'sint32',
              id: 2
            },
            maxRunTaskNumber: {
              type: 'uint32',
              id: 3
            },
            slStartTime: {
              type: 'sint32',
              id: 4
            },
            slEndTime: {
              type: 'sint32',
              id: 5
            }
          }
        },
        UsrInfo: {
          fields: {
            vip: {
              type: 'uint32',
              id: 1
            },
            userid: {
              type: 'string',
              id: 2
            },
            xluid: {
              type: 'string',
              id: 3
            }
          }
        },
        BoxInfo: {
          fields: {
            pid: {
              type: 'string',
              id: 1
            },
            name: {
              type: 'string',
              id: 2
            },
            status: {
              type: 'string',
              id: 3
            },
            partitions: {
              rule: 'repeated',
              type: 'Partition',
              id: 4
            },
            flag: {
              type: 'sint32',
              id: 5
            },
            waddr: {
              type: 'string',
              id: 6
            }
          }
        },
        MQHead: {
          fields: {
            timestamp: {
              type: 'sint64',
              id: 1
            },
            event: {
              type: 'string',
              id: 2
            },
            connid: {
              type: 'string',
              id: 3
            },
            mgrAddr: {
              type: 'string',
              id: 4
            },
            csAddr: {
              type: 'string',
              id: 5
            },
            boxAddr: {
              type: 'string',
              id: 6
            },
            pid: {
              type: 'string',
              id: 7
            }
          }
        },
        TaskidList: {
          fields: {
            taskid: {
              type: 'uint64',
              id: 1
            },
            state: {
              type: 'uint32',
              id: 2
            }
          }
        },
        TaskURL: {
          fields: {
            taskid: {
              type: 'uint64',
              id: 1
            },
            url: {
              type: 'string',
              id: 2
            }
          }
        },
        TaskVipDyn: {
          fields: {
            dlSize: {
              type: 'uint64',
              id: 1
            },
            dlSpeed: {
              type: 'uint32',
              id: 2
            }
          }
        },
        TaskDyn: {
          fields: {
            taskid: {
              type: 'uint64',
              id: 1
            },
            type: {
              type: 'uint32',
              id: 2
            },
            state: {
              type: 'uint32',
              id: 3
            },
            name: {
              type: 'string',
              id: 4
            },
            dlSize: {
              type: 'uint64',
              id: 5
            },
            size: {
              type: 'uint64',
              id: 6
            },
            dlSpeed: {
              type: 'uint32',
              id: 7
            },
            vipDyn: {
              type: 'TaskVipDyn',
              id: 8
            },
            failCode: {
              type: 'sint32',
              id: 9
            },
            completeTime: {
              type: 'uint64',
              id: 10
            },
            downTime: {
              type: 'uint32',
              id: 11
            },
            uuid: {
              type: 'string',
              id: 12
            }
          }
        },
        TaskSubDyn: {
          fields: {
            id: {
              type: 'uint32',
              id: 1
            },
            dlSize: {
              type: 'uint64',
              id: 2
            },
            state: {
              type: 'uint32',
              id: 3
            },
            failCode: {
              type: 'sint32',
              id: 4
            }
          }
        },
        TaskSubInfo: {
          fields: {
            id: {
              type: 'uint32',
              id: 1
            },
            name: {
              type: 'string',
              id: 2
            },
            size: {
              type: 'uint64',
              id: 3
            },
            dlSize: {
              type: 'uint64',
              id: 4
            },
            state: {
              type: 'uint32',
              id: 5
            },
            failCode: {
              type: 'sint32',
              id: 6
            },
            selected: {
              type: 'uint32',
              id: 7
            },
            createNew: {
              type: 'bool',
              id: 8
            }
          }
        },
        TaskInfo: {
          fields: {
            taskid: {
              type: 'uint64',
              id: 1
            },
            type: {
              type: 'uint32',
              id: 2
            },
            state: {
              type: 'uint32',
              id: 3
            },
            name: {
              type: 'string',
              id: 4
            },
            size: {
              type: 'uint64',
              id: 5
            },
            dlSize: {
              type: 'uint64',
              id: 6
            },
            url: {
              type: 'string',
              id: 7
            },
            uuid: {
              type: 'string',
              id: 8
            },
            path: {
              type: 'string',
              id: 9
            },
            createTime: {
              type: 'uint64',
              id: 10
            },
            downTime: {
              type: 'uint32',
              id: 11
            },
            completeTime: {
              type: 'uint64',
              id: 12
            },
            failCode: {
              type: 'sint32',
              id: 13
            },
            utime: {
              type: 'sint64',
              id: 14
            },
            createNew: {
              type: 'bool',
              id: 15
            },
            sub: {
              rule: 'repeated',
              type: 'TaskSubInfo',
              id: 16
            }
          }
        },
        TaskDelParam: {
          fields: {
            uuid: {
              type: 'string',
              id: 1
            },
            taskid: {
              type: 'uint64',
              id: 2
            },
            recycled: {
              type: 'bool',
              id: 3
            },
            delFile: {
              type: 'bool',
              id: 4
            }
          }
        },
        TaskCreateParam: {
          fields: {
            uuid: {
              type: 'string',
              id: 1
            },
            url: {
              type: 'string',
              id: 2
            },
            name: {
              type: 'string',
              id: 3
            },
            path: {
              type: 'string',
              id: 4
            },
            seed: {
              type: 'string',
              id: 5
            }
          }
        },
        TaskResult: {
          fields: {
            rtn: {
              type: 'sint32',
              id: 1
            },
            msg: {
              type: 'string',
              id: 2
            },
            taskid: {
              type: 'uint64',
              id: 3
            },
            state: {
              type: 'uint32',
              id: 4
            }
          }
        },
        TaskSubResult: {
          fields: {
            id: {
              type: 'uint32',
              id: 1
            },
            state: {
              type: 'uint32',
              id: 2
            }
          }
        },
        TaskNewReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            tasks: {
              rule: 'repeated',
              type: 'TaskCreateParam',
              id: 6
            }
          }
        },
        TaskNewResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 3
            }
          }
        },
        TaskSubNewReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            task: {
              type: 'TaskCreateParam',
              id: 6
            },
            selected: {
              type: 'uint32',
              id: 7
            },
            fileIndex: {
              rule: 'repeated',
              type: 'uint32',
              id: 8
            }
          }
        },
        TaskSubNewResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            }
          }
        },
        TaskDelReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            taskDel: {
              rule: 'repeated',
              type: 'TaskDelParam',
              id: 6
            }
          }
        },
        TaskDelResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 3
            }
          }
        },
        TaskStartReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskStartResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 3
            }
          }
        },
        TaskPauseReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskPauseResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 3
            }
          }
        },
        TaskRestoreReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskRestoreResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 3
            }
          }
        },
        BoxBindReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            pid: {
              type: 'string',
              id: 3
            },
            userid: {
              type: 'string',
              id: 4
            }
          }
        },
        BoxBindResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            }
          }
        },
        BoxUnbindReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            pid: {
              type: 'string',
              id: 3
            },
            userid: {
              type: 'string',
              id: 4
            }
          }
        },
        BoxUnbindResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            }
          }
        },
        VipUserInfo: {
          fields: {
            resp: {
              type: 'Response',
              id: 1
            },
            Expire: {
              type: 'string',
              id: 2
            },
            Isyear: {
              type: 'sint32',
              id: 3
            },
            Level: {
              type: 'sint32',
              id: 4
            },
            Grow: {
              type: 'sint32',
              id: 5
            },
            Daily: {
              type: 'sint32',
              id: 6
            },
            IsVip: {
              type: 'bool',
              id: 7
            }
          }
        },
        BoxListReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            }
          }
        },
        BoxListResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            info: {
              rule: 'repeated',
              type: 'BoxInfo',
              id: 3
            }
          }
        },
        BoxSettingsGetReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            pid: {
              type: 'string',
              id: 3
            },
            userid: {
              type: 'string',
              id: 4
            }
          }
        },
        TaskidListReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            uuid: {
              type: 'string',
              id: 5
            },
            type: {
              type: 'sint32',
              id: 6
            },
            pos: {
              type: 'uint32',
              id: 7
            },
            num: {
              type: 'uint32',
              id: 8
            },
            last: {
              type: 'TaskidList',
              id: 9
            }
          }
        },
        TaskidListResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskidList: {
              rule: 'repeated',
              type: 'TaskidList',
              id: 3
            },
            len: {
              type: 'uint32',
              id: 4
            }
          }
        },
        TaskURLReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            uuid: {
              type: 'string',
              id: 5
            },
            taskid: {
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskURLResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            url: {
              type: 'string',
              id: 3
            }
          }
        },
        TaskInfoReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            uuid: {
              type: 'string',
              id: 5
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskInfoResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskInfo: {
              rule: 'repeated',
              type: 'TaskInfo',
              id: 3
            }
          }
        },
        TaskSubInfoReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            uuid: {
              type: 'string',
              id: 5
            },
            taskid: {
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskSubInfoResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            sub: {
              rule: 'repeated',
              type: 'TaskSubInfo',
              id: 3
            }
          }
        },
        TaskSubResolveReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            infoHash: {
              type: 'string',
              id: 5
            }
          }
        },
        TaskSubResolveResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            sub: {
              rule: 'repeated',
              type: 'TaskSubInfo',
              id: 3
            }
          }
        },
        TaskMainProgressReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            uuid: {
              type: 'string',
              id: 5
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskMainProgressResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskDyn: {
              rule: 'repeated',
              type: 'TaskDyn',
              id: 3
            }
          }
        },
        TaskSubProgressReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            uuid: {
              type: 'string',
              id: 5
            },
            taskid: {
              type: 'uint64',
              id: 6
            }
          }
        },
        TaskSubProgressResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            subDyn: {
              rule: 'repeated',
              type: 'TaskSubDyn',
              id: 3
            }
          }
        },
        URLResolveReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            url: {
              type: 'string',
              id: 5
            }
          }
        },
        URLResolveResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            info: {
              type: 'TaskInfo',
              id: 3
            }
          }
        },
        SubResolveReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            }
          }
        },
        SubResolveResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            info: {
              type: 'TaskInfo',
              id: 3
            }
          }
        },
        RemoteCtlReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            ver: {
              type: 'string',
              id: 3
            },
            userid: {
              type: 'string',
              id: 4
            },
            dlPaths: {
              rule: 'repeated',
              type: 'Partition',
              id: 5
            },
            setting: {
              type: 'BoxSettings',
              id: 6
            }
          }
        },
        RemoteCtlResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            next: {
              type: 'uint32',
              id: 3
            },
            now: {
              type: 'uint32',
              id: 4
            },
            fbi: {
              type: 'uint32',
              id: 5
            },
            usr: {
              type: 'UsrInfo',
              id: 6
            },
            akey: {
              type: 'string',
              id: 7
            }
          }
        },
        BoxSettingReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            token: {
              type: 'string',
              id: 2
            },
            userid: {
              type: 'string',
              id: 3
            },
            pid: {
              type: 'string',
              id: 4
            },
            mode: {
              type: 'sint32',
              id: 5
            },
            setting: {
              type: 'BoxSettings',
              id: 6
            }
          }
        },
        BoxSettingResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            setting: {
              type: 'BoxSettings',
              id: 3
            }
          }
        },
        BoxKeepAliveReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            extra: {
              type: 'sint32',
              id: 2
            },
            dlPaths: {
              rule: 'repeated',
              type: 'Partition',
              id: 3
            }
          }
        },
        BoxKeepAliveResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            next: {
              type: 'uint32',
              id: 2
            }
          }
        },
        BoxOperateReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            mode: {
              type: 'sint32',
              id: 2
            },
            next: {
              type: 'uint32',
              id: 3
            },
            opt: {
              type: 'uint32',
              id: 4
            }
          }
        },
        BoxOperateResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            }
          }
        },
        BoxUsrLoginReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            usr: {
              type: 'UsrInfo',
              id: 2
            }
          }
        },
        BoxUsrLoginResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            }
          }
        },
        TaskMainProgressRptReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            tasks: {
              rule: 'repeated',
              type: 'TaskDyn',
              id: 4
            }
          }
        },
        TaskMainProgressRptResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 3
            },
            next: {
              type: 'uint32',
              id: 4
            }
          }
        },
        TaskMainInfoRptReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            tasks: {
              rule: 'repeated',
              type: 'TaskInfo',
              id: 4
            }
          }
        },
        TaskMainInfoRptResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            taskRes: {
              rule: 'repeated',
              type: 'TaskResult',
              id: 2
            }
          }
        },
        TaskSubInfoRptReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            taskid: {
              type: 'uint64',
              id: 4
            },
            sub: {
              rule: 'repeated',
              type: 'TaskSubInfo',
              id: 5
            }
          }
        },
        TaskSubInfoRptResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            },
            subRes: {
              rule: 'repeated',
              type: 'TaskSubResult',
              id: 3
            }
          }
        },
        TaskResetReq: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            uuid: {
              type: 'string',
              id: 2
            },
            next: {
              type: 'uint32',
              id: 3
            },
            taskid: {
              type: 'uint64',
              id: 4
            },
            pid: {
              type: 'string',
              id: 5
            }
          }
        },
        TaskResetResp: {
          fields: {
            rid: {
              type: 'uint64',
              id: 1
            },
            resp: {
              type: 'Response',
              id: 2
            }
          }
        },
        BoxSettingsDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            }
          }
        },
        BoxSettingsDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            },
            settings: {
              type: 'BoxSettings',
              id: 3
            }
          }
        },
        BoxSettingsDaoSetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            settings: {
              type: 'BoxSettings',
              id: 3
            }
          }
        },
        BoxSettingsDaoSetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        BoxStateDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            }
          }
        },
        BoxStateDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            },
            pid: {
              type: 'string',
              id: 3
            },
            connid: {
              type: 'string',
              id: 4
            },
            mgrAddr: {
              type: 'string',
              id: 5
            },
            csAddr: {
              type: 'string',
              id: 6
            },
            boxAddr: {
              type: 'string',
              id: 7
            },
            laston: {
              type: 'sint64',
              id: 8
            },
            lastoff: {
              type: 'sint64',
              id: 9
            },
            lastkatime: {
              type: 'sint64',
              id: 10
            },
            akey: {
              type: 'string',
              id: 11
            }
          }
        },
        BoxStateDaoSetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            ver: {
              type: 'string',
              id: 3
            },
            userid: {
              type: 'string',
              id: 4
            },
            akey: {
              type: 'string',
              id: 5
            }
          }
        },
        BoxStateDaoSetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        BoxPartitionDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            }
          }
        },
        BoxPartitionDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            },
            partitions: {
              rule: 'repeated',
              type: 'Partition',
              id: 3
            }
          }
        },
        BoxPartitionDaoSetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            partitions: {
              rule: 'repeated',
              type: 'Partition',
              id: 3
            }
          }
        },
        BoxPartitionDaoSetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        BoxRemotectlMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            rmt: {
              type: 'RemoteCtlReq',
              id: 3
            },
            akey: {
              type: 'string',
              id: 4
            }
          }
        },
        BoxDisconnMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            }
          }
        },
        BoxSettingsMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            setting: {
              type: 'BoxSettings',
              id: 3
            }
          }
        },
        BoxKeepAliveMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            live: {
              type: 'BoxKeepAliveReq',
              id: 3
            }
          }
        },
        BoxPartitionMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            parts: {
              rule: 'repeated',
              type: 'Partition',
              id: 3
            }
          }
        },
        CtlRsp: {
          fields: {
            rtn: {
              type: 'sint32',
              id: 1
            },
            msg: {
              type: 'string',
              id: 2
            },
            body: {
              type: 'string',
              id: 3
            }
          }
        },
        TaskMainProgressDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 4
            }
          }
        },
        TaskMainProgressDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            },
            taskDyn: {
              rule: 'repeated',
              type: 'TaskDyn',
              id: 3
            }
          }
        },
        TaskMainProgressDaoSetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            task: {
              rule: 'repeated',
              type: 'TaskDyn',
              id: 4
            }
          }
        },
        TaskMainProgressDaoSetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        TaskURLDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 4
            }
          }
        },
        TaskURLDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            },
            taskUrl: {
              rule: 'repeated',
              type: 'TaskURL',
              id: 3
            }
          }
        },
        TaskMainInfoDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            taskid: {
              rule: 'repeated',
              type: 'uint64',
              id: 4
            }
          }
        },
        TaskMainInfoDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            },
            taskInfo: {
              rule: 'repeated',
              type: 'TaskInfo',
              id: 3
            }
          }
        },
        TaskMainInfoDaoSetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            utime: {
              type: 'sint64',
              id: 4
            },
            taskInfo: {
              rule: 'repeated',
              type: 'TaskInfo',
              id: 5
            }
          }
        },
        TaskMainInfoDaoSetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        TaskSubInfoDaoGetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            taskid: {
              type: 'uint64',
              id: 4
            }
          }
        },
        TaskSubInfoDaoGetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            taskid: {
              type: 'uint64',
              id: 4
            },
            res: {
              type: 'DaoRes',
              id: 5
            },
            sub: {
              rule: 'repeated',
              type: 'TaskSubInfo',
              id: 6
            }
          }
        },
        TaskSubInfoDaoSetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            },
            utime: {
              type: 'uint64',
              id: 4
            },
            taskid: {
              type: 'uint64',
              id: 5
            },
            sub: {
              rule: 'repeated',
              type: 'TaskSubInfo',
              id: 6
            }
          }
        },
        TaskSubInfoDaoSetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        TaskidListResetReq: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            pid: {
              type: 'string',
              id: 2
            },
            uuid: {
              type: 'string',
              id: 3
            }
          }
        },
        TaskidListResetResp: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            res: {
              type: 'DaoRes',
              id: 2
            }
          }
        },
        TaskMainProgressMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            progress: {
              type: 'TaskMainProgressRptReq',
              id: 3
            }
          }
        },
        TaskMainInfoMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            info: {
              type: 'TaskMainInfoRptReq',
              id: 3
            }
          }
        },
        TaskSubInfoMQ: {
          fields: {
            rid: {
              type: 'string',
              id: 1
            },
            head: {
              type: 'MQHead',
              id: 2
            },
            info: {
              type: 'TaskSubInfoRptReq',
              id: 3
            }
          }
        }
      }
    }
  });

module.exports = $root;
