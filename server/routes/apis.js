import express from 'express';
import Action from "../action";
import {dd, rt} from '../utils'

var router = express.Router();

router.get('/task/create', async (req, res, next) => {
    const url = 'magnet:?xt=urn:btih:04051B54ED1343686CBABD256045906274B94A62'
    let data = await Action.postTaskNew(url)
    res.json(data);
})

router.get('/task/list', async (req, res, next) => {
    let data = await Action.getTaskList(0, 0, 20);
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
