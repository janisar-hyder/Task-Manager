const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/tasks.json');

// Ensure the directory and file exist
const initStorage = async () => {
    try {
        await fs.access(path.dirname(DATA_FILE));
    } catch {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    }
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, '[]');
    }
};

// Initialize on require
initStorage();

const readData = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await initStorage();
            return [];
        }
        throw error;
    }
};

const writeData = async (data) => {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

module.exports = {
    readData,
    writeData
};
