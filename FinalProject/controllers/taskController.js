const Task = require('../models/Task');
const User = require('../models/User');
const Category = require('../models/Category');

exports.listMyTasks = async (req, res) => {
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).populate({ path: 'tasks', populate: { path: 'category' } });
    const tasks = user ? user.tasks : [];
    const categories = await Category.find();
    res.render('taskList', { user: req.user, tasks, categories });
  }catch(err){
    console.error(err);
    res.redirect('/');
  }
}

exports.listAllTasks = async (req, res) => {
  try{
    const tasks = await Task.find().populate('user').populate('category');
    res.render('taskList', { user: req.user, tasks, categories: await Category.find() });
  }catch(err){
    console.error(err);
    res.redirect('/');
  }
}

exports.showAddForm = async (req, res) => {
  const categories = await Category.find();
  res.render('taskForm', { user: req.user, task: null, categories });
}

exports.createTask = async (req, res) => {
  try{
    const { title, description, category } = req.body;
    const task = new Task({ title, description, category: category || null, user: req.user.id });
    await task.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { tasks: task._id } });
    res.redirect('/tasks');
  }catch(err){
    console.error(err);
    res.redirect('/tasks');
  }
}

exports.showEditForm = async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
    const categories = await Category.find();
    if(!task) return res.redirect('/tasks');

    if(req.user.role !== 'admin' && task.user.toString() !== req.user.id) return res.redirect('/tasks');

    res.render('taskForm', { user: req.user, task, categories });
  }catch(err){
    console.error(err);
    res.redirect('/tasks');
  }
}

exports.updateTask = async (req, res) => {
  try{
    const { title, description, completed, category } = req.body;
    const task = await Task.findById(req.params.id);
    if(!task) return res.redirect('/tasks');
    if(req.user.role !== 'admin' && task.user.toString() !== req.user.id) return res.redirect('/tasks');

    task.title = title;
    task.description = description;
    task.category = category || null;
    task.completed = completed === 'on';
    await task.save();
    res.redirect('/tasks');
  }catch(err){
    console.error(err);
    res.redirect('/tasks');
  }
}

exports.deleteTask = async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
    if(!task) return res.redirect('/tasks');
    if(req.user.role !== 'admin' && task.user.toString() !== req.user.id) return res.redirect('/tasks');

    await Task.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(task.user, { $pull: { tasks: task._id } });
    res.redirect('/tasks');
  }catch(err){
    console.error(err);
    res.redirect('/tasks');
  }
}
