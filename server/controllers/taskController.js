const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
const upload = require('../middleware/multer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

exports.upload = upload.single('file');
 

// create task
exports.createTask = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRef = decoded._id;
  
      const task = new Task({
        ...req.body,
        owner: userRef,
      });
  
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(400).send(e);
    }   
  }

exports.getAllTasks = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        const tasks = await Task.find({ owner: userId });
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
}
// get tasks by id
exports.getTaskById = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await  Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    }
    catch (e) {
        res.status(500).send();
    }
}

// update task by id


exports.updateTask = async (req, res) => {  
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
}

// delete task by id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
}   

