const Task = require("../models/task_model");
const User = require("../models/user_model");

async function handleCreateTask(req, res){
    try{
        const { title, description, status, priority, dueDate } = req.body;
        const createdBy = req.user.id;        

        await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            createdBy
        });

        return res.json({ message: 'Task created successfully', task_id: '1234' });
    }catch(err){
        return res.json({message: err.message})
    }
}

async function handleGetTaskDetails(req, res){
    try{
        const id = req.params.id;
        const task = await Task.findById(id);        

        return res.json(task);
    }catch(err){
        return res.json({ message : err.message});
    }
}

async function handleGetUserAllTasks(req, res){
    try{
        const userId = req.params.id;

        const tasks = await Task.find({createdBy: userId});

        return res.json(tasks);
    }catch(err){
        return res.json({message: err.message});
    }
}

async function handleUpdateTask(req, res){
    try{
        const taskId = req.params.id;
        const { title, description, status, priority, dueDate} = req.body;

        await Task.findByIdAndUpdate(taskId, {
            title,
            description,
            status,
            priority,
            dueDate
        });

        return res.json({message: 'Task update successfully'});
    }catch(err){
        return res.json({message: err.message});
    }
}

async function handleDeleteTask(req, res){
    try{
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);

        return res.json({ message: 'Task deleted successfully'});
    }catch(err){
        return res.json({message: err.message});
    }
}

async function handleGetTasksByStatus(req, res){
    try{
        const status = req.params.status;

        const tasks = await Task.find({status});

        return res.json(tasks);
    }catch(err){
        return res.json({message: err.message});
    }
}

module.exports = {
    handleCreateTask,
    handleGetTaskDetails,
    handleGetUserAllTasks,
    handleUpdateTask,
    handleDeleteTask,
    handleGetTasksByStatus
}