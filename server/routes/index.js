// routes/index.js and users.js
import express from 'express';
import rt from '../utils';

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json(rt());
});

export default router;
