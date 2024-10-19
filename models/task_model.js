const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN-PROGRESS', 'COMPLETED'],
        default: 'PENDING'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });

const Task = new mongoose.model('tasks', taskSchema);

module.exports = Task;