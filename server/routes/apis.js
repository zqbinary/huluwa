import express from 'express';
import Action from "../action";
import {dd, rt} from '../utils'

var router = express.Router();

/**
 * @return
 *         /**
 * {
        "code": "200",
        "msg": "",
        "data": {
        "resp": {
        "rtn": 612
        },
        "taskRes": [
        {
        "rtn": 612,
        "taskid": "1599882693002"
        }
        ]
        }
        }

 */

router.get('/hi', (req, res) => {
    res.json['baby']
})
router.post('/task/create', async (req, res, next) => {
    const url = req.body.url
    let data = await Action.postTaskNew(url)
    res.json(data);
})


router.get('/task/list/:status', async (req, res, next) => {
    let perPage = req.query.perPage || 20;
    let data = await Action.getTaskList(req.params.status, 0, perPage);
    res.json(data);
});

router.get('/task/info/:ids', async (req, res, next) => {
    const idsStr = req.params.ids || '';
    const ids = idsStr.split('|');
    if (!ids.length) {
        return res.json(rt(422, '参数错误,缺少 ids'))
    }
    //todo 如果不存在
    let data = await Action.getTaskInfo(ids);
    res.json(data);
});

router.get('/task/process/:ids', async (req, res, next) => {
    const idsStr = req.params.ids || '';
    const ids = idsStr.split('|');
    if (!ids.length) {
        return res.json(rt(422, '参数错误,缺少 ids'))
    }
    let data = await Action.postTaskMainProgress(ids);
    res.json(data);
});

router.get('/task/infos', async (req, res, next) => {
    let ids = await Action.getDownloadTaskIds()
    if (ids.code >= 400) {
        return res.json(ids)
    }
    let data = await Action.getTaskInfo(ids.data);
    res.json(data);
});
router.get('/task/pause/:ids', async (req, res, next) => {
    const idsStr = req.params.ids || '';
    const ids = idsStr.split('|');
    if (!ids.length) {
        return res.json(rt(422, '参数错误,缺少 ids'))
    }
    let data = await Action.postTaskPause(ids);
    res.json(data);
});

router.get('/task/pauses', async (req, res, next) => {
    let ids = await Action.getDownloadTaskIds()
    if (ids.code >= 400) {
        return res.json(ids)
    }
    let data = await Action.postTaskPause(ids.data);
    res.json(data);
});
router.get('/task/start/:ids', async (req, res, next) => {
    //test 已经完成
    const idsStr = req.params.ids || '';
    const ids = idsStr.split('|');
    if (!ids.length) {
        return res.json(rt(422, '参数错误,缺少 ids'))
    }
    let data = await Action.postTaskStart(ids);
    res.json(data);
});
router.get('/task/starts', async (req, res, next) => {
    let ids = await Action.getDownloadTaskIds()
    if (ids.code >= 400) {
        return res.json(ids)
    }
    let data = await Action.postTaskStart(ids.data);
    res.json(data);
});

export default router;
