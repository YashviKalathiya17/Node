const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');

router.get('/all-tasks', verifyToken, adminOnly, taskCtrl.listAllTasks);

module.exports = router;
