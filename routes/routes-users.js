var express = require('express');
var router = express.Router();
var user = require('../models/users');


router.get('/', async function (req, res) {
    try {
        const result = await user.getUsers();
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.get('/:id', async function (req, res) {
    try {
        const result = await user.getUser(req.params.id);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.post('/', async function (req, res) {
    try {
        const userFormData = req.body;
        const result = await user.createUser(userFormData.username, userFormData.password);
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
        const result = await user.deleteUser(id);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


router.put('/:id', async function (req, res) {
    try {
        const userFormData = req.body;
        const result = await user.updateUser(req.params.id, userFormData.username, userFormData.password);
        res.status(200).send(result);
        res.end();
    } catch (error) {
        res.status(500).send(error);
        res.end();
    }
});


module.exports = router;