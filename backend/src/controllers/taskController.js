const TaskModel = require('../models/taskModel');

exports.getTasks = async (req, res, next) => {
    try {
        const { status } = req.query;
        if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status filter provided' });
        }
        const tasks = await TaskModel.getAll(status);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        if (!title || typeof title !== 'string' || title.length > 100) {
            return res.status(400).json({ error: 'Title is required and must be a string up to 100 characters' });
        }
        if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const newTask = await TaskModel.create(title, description, status);
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (title !== undefined && (typeof title !== 'string' || title.length > 100 || title.length === 0)) {
            return res.status(400).json({ error: 'Title must be a non-empty string up to 100 characters' });
        }
        if (status !== undefined && !['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status enum' });
        }

        const updates = {};
        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;

        const updatedTask = await TaskModel.update(id, updates);
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await TaskModel.delete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};
