import express from 'express';
import rt from '../utils';
import storeX from "../index";

var router = express.Router();
router.get('/', function (req, res, next) {
    console.log('start req')
    storeX.actions.getTaskList(storeX, [0, 0, 20]);
    res.json(rt('', '', storeX));
});

export default router;
