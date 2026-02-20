const { v4: uuidv4 } = require('uuid');
const storage = require('../config/storage');

class TaskModel {
    static async getAll(status) {
        const tasks = await storage.readData();
        if (status) {
            return tasks.filter((task) => task.status === status).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    static async getById(id) {
        const tasks = await storage.readData();
        return tasks.find((t) => t.id === id);
    }

    static async create(title, description, status = 'pending') {
        const tasks = await storage.readData();
        const newTask = {
            id: uuidv4(),
            title,
            description: description || '',
            status,
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        await storage.writeData(tasks);
        return newTask;
    }

    static async update(id, updates) {
        const tasks = await storage.readData();
        const taskIndex = tasks.findIndex((t) => t.id === id);
        if (taskIndex === -1) return null;

        const updatedTask = { ...tasks[taskIndex], ...updates };
        tasks[taskIndex] = updatedTask;
        await storage.writeData(tasks);
        return updatedTask;
    }

    static async delete(id) {
        const tasks = await storage.readData();
        const initialLength = tasks.length;
        const filteredTasks = tasks.filter((t) => t.id !== id);

        if (filteredTasks.length === initialLength) return false;

        await storage.writeData(filteredTasks);
        return true;
    }
}

module.exports = TaskModel;
