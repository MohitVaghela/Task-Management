import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        const { data } = await api.post('/tasks', taskData);
        setTasks((prev) => [data, ...prev]);
    };

    const updateTask = async (id, updates) => {
        const { data } = await api.put(`/tasks/${id}`, updates);
        setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    };

    const deleteTask = async (id) => {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((t) => t._id !== id));
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === 'all') return true;
        if (filter === 'pending') return t.status === 'pending';
        return t.status === 'completed';
    });

    const counts = {
        all: tasks.length,
        pending: tasks.filter((t) => t.status === 'pending').length,
        completed: tasks.filter((t) => t.status === 'completed').length,
    };

    return (
        <TaskContext.Provider value={{ tasks: filteredTasks, counts, filter, setFilter, loading, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => useContext(TaskContext);
