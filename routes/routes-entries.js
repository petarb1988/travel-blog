var express = require('express');
var router = express.Router();
var entry = require('../models/entries');


router.get('/search', async function (req, res) {
    try {
        const hint = req.query.hint;
        const result = await entry.autocomplete(hint);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});

router.get('/:id', async function (req, res) {
    try {
        const result = await entry.getEntry(req.params.id);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});

router.get('/', async function (req, res) {
    try {
        const pageParams = {
            pageNumber: req.query.pageNumber,
            pageSize: req.query.pageSize,
            diaryId: req.query.diaryId
        };
        const result = await entry.getPaginatedEntries(pageParams);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.post('/', async function (req, res) {
    try {
        const entryFormData = req.body;
        const result = await entry.createEntry(entryFormData.location, entryFormData.description, entryFormData.diaryId);
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
        const result = await entry.deleteEntry(id);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.put('/:id', async function (req, res) {
    try {
        const entryFormData = req.body;
        const result = await entry.updateEntry(req.params.id, entryFormData.location, entryFormData.description);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


module.exports = router;