const express = require('express');
const { 
    handleCreateTask,
    handleGetTaskDetails,
    handleGetUserAllTasks,
    handleUpdateTask,
    handleDeleteTask,
    handleGetTasksByStatus
} = require('../controllers/task_controller');
const Router = express.Router();

Router.route('/:id')
.get(handleGetTaskDetails)

Router.route('/create')
.post(handleCreateTask)

Router.route('/user/:id')
.get(handleGetUserAllTasks)

Router.route('/update/:id')
.put(handleUpdateTask)

Router.route('/delete/:id')
.delete(handleDeleteTask)

Router.route('/status/:status')
.get(handleGetTasksByStatus)

module.exports = Router;