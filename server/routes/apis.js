import express from 'express';
import {rt, dd} from '../utils';
import storeX from "../index";
import Action from "../action";

var router = express.Router();

router.get('/task/create', async (req, res, next) => {
    const url = 'magnet:?xt=urn:btih:04051B54ED1343686CBABD256045906274B94A62'
    let data = await Action.postTaskNew(url)
    res.json(data);
})

router.get('/task/list', async (req, res, next) => {
    console.log('start req')
    let data = await Action.getTaskList(1, 0, 20);
    res.json(data);
});

router.get('/task/info', async (req, res, next) => {
    let ids = ['1598871782001']
    let data = await Action.getTaskInfo(ids);
    res.json(data);
});

export default router;
