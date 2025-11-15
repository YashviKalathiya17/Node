const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, taskCtrl.listMyTasks);
router.get('/add', verifyToken, taskCtrl.showAddForm);
router.post('/add', verifyToken, taskCtrl.createTask);
router.get('/edit/:id', verifyToken, taskCtrl.showEditForm);
router.put('/edit/:id', verifyToken, taskCtrl.updateTask);
router.delete('/delete/:id', verifyToken, taskCtrl.deleteTask);

module.exports = router;
