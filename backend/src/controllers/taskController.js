import Task from '../models/Task.js';

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user_id: req.userId });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({ ...req.body, user_id: req.userId });
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user_id: req.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.userId });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        next(err);
    }
};