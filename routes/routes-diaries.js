var express = require('express');
var router = express.Router();
var diary = require('../models/diaries');


router.get('/', async function (req, res) {
    try {
        const result = await diary.getDiaries();
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.get('/:id', async function (req, res) {
    try {
        const result = await diary.getDiary(req.params.id);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.post('/', async function (req, res) {
    try {
        const diaryFormData = req.body;
        const result = await diary.createDiary(diaryFormData.name, diaryFormData.userId);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const result = await diary.deleteDiary(id);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.put('/:id', async function (req, res) {
    try {
        const diaryFormData = req.body;
        const result = await diary.updateDiary(req.params.id, diaryFormData.name);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


module.exports = router;