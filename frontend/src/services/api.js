import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasks = async (status) => {
    const url = status && status !== 'All' ? `${API_URL}?status=${status.toLowerCase()}` : API_URL;
    const response = await axios.get(url);
    return response.data;
};

export const createTask = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updateTask = async (id, updates) => {
    const response = await axios.patch(`${API_URL}/${id}`, updates);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
