import express from 'express';
import Action from "../action";

var router = express.Router();

router.get('/task/create', async (req, res, next) => {
    const url = 'magnet:?xt=urn:btih:04051B54ED1343686CBABD256045906274B94A62'
    let data = await Action.postTaskNew(url)
    res.json(data);
})

router.get('/task/list', async (req, res, next) => {
    console.log('start req')
    let data = await Action.getTaskList(0, 0, 20);
    res.json(data);
});

router.get('/task/info', async (req, res, next) => {
    //test 已经完成
    let ids = ['1598871782001']
    let data = await Action.getTaskInfo(ids);
    res.json(data);
});
router.get('/task/info/all', async (req, res, next) => {
    //test 已经完成
    let tasks = await Action.getTaskList(0, 0, 50);
    let ids = [];
    if (tasks.code < 400) {
        ids = tasks.data.taskidList.map((item) => item.taskid.toString())
    }
    let data = await Action.getTaskInfo(ids);
    res.json(data);
});
router.get('/task/pause', async (req, res, next) => {
    //test 已经完成
    let ids = ['1598871782001']
    let data = await Action.postTaskPause(ids);
    res.json(data);
});

router.get('/task/pause/all', async (req, res, next) => {
    //test 已经完成
    let tasks = await Action.getTaskList(0, 0, 50);
    let ids = [];
    if (tasks.code < 400) {
        ids = tasks.data.taskidList.map((item) => item.taskid.toString())
    }
    let data = await Action.postTaskPause(ids);
    res.json(data);
});

router.get('/task/start', async (req, res, next) => {
    //test 已经完成
    let ids = ['1598871782001']
    let data = await Action.postTaskStart(ids);
    res.json(data);
});
router.get('/task/start/all', async (req, res, next) => {
    //test 已经完成
    let tasks = await Action.getTaskList(0, 0, 50);
    let ids = [];
    if (tasks.code < 400) {
        ids = tasks.data.taskidList.map((item) => item.taskid.toString())
    }
    let data = await Action.postTaskStart(ids);
    res.json(data);
});

export default router;
