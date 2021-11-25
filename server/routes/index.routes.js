// Utilizar Express
const express = require('express');
const router = express.Router()
const controller = require('../controllers/index.controller');
const path = require('path')

// GET
router.get('/', controller.index)

// POST
router.post("/user",controller.addPublic)
// router.post("/add-user",controller.addUser)
router.put("/update-user/:_id",controller.updateUser)

// DELETE
// router.delete("/delete-user/:userId",controller.deleteUser)

module.exports = router