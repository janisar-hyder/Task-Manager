import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import LoadingSpinner from './components/LoadingSpinner';
import { LayoutList, Sparkles } from 'lucide-react';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');

    // Track operations on specific tasks
    const [processingIds, setProcessingIds] = useState(new Set());
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadTasks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tasks. Please ensure the backend is running.');
            toast.error('Failed to load tasks', {
                style: {
                    borderRadius: '12px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const handleAddTask = async (taskData) => {
        try {
            setIsSubmitting(true);
            const newTask = await createTask(taskData);
            setTasks(prev => [newTask, ...prev]);
            toast.success('Task created successfully', {
                icon: '🚀',
                style: {
                    borderRadius: '12px',
                    background: '#10B981',
                    color: '#fff',
                },
            });
        } catch (err) {
            console.error(err);
            throw err; // Let the form component handle the error display
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const processKey = `update-${id}`;
            setProcessingIds(prev => new Set(prev).add(processKey));

            const updatedTask = await updateTask(id, updates);
            setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));

            if (updates.status === 'completed') {
                toast.success('Task completed! Great job!', {
                    icon: '🎉',
                });
            }
        } catch (err) {
            toast.error('Failed to update task');
            console.error(err);
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(`update-${id}`);
                return newSet;
            });
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const processKey = `delete-${id}`;
            setProcessingIds(prev => new Set(prev).add(processKey));

            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
            toast.success('Task removed');
        } catch (err) {
            toast.error('Failed to delete task');
            console.error(err);
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(`delete-${id}`);
                return newSet;
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-300/30 rounded-full blur-[120px] pointer-events-none" />

            <Toaster
                position="top-center"
                toastOptions={{
                    className: 'font-medium',
                    duration: 3000,
                }}
            />

            <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 flex flex-col gap-8">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center space-y-4 mb-4"
                >
                    <div className="p-4 bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-slate-100 mb-2 inline-flex items-center justify-center">
                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-2xl text-white">
                            <LayoutList size={32} strokeWidth={2.5} />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3 justify-center">
                        Task<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Master</span>
                        <Sparkles className="text-amber-400 flex-shrink-0" size={28} />
                    </h1>
                    <p className="text-lg text-slate-500 max-w-md mx-auto">
                        Elevate your productivity. Organize your day with elegance and clarity.
                    </p>
                </motion.header>

                <TaskForm onTaskAdded={handleAddTask} isSubmitting={isSubmitting} />

                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-5 rounded-2xl shadow-sm flex flex-col items-center text-center"
                        >
                            <p className="font-medium">{error}</p>
                            <button
                                onClick={loadTasks}
                                className="mt-3 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg text-sm font-semibold transition-colors"
                            >
                                Try again
                            </button>
                        </motion.div>
                    ) : loading ? (
                        <motion.div key="loading" exit={{ opacity: 0 }}>
                            <LoadingSpinner />
                        </motion.div>
                    ) : (
                        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <TaskList
                                tasks={tasks}
                                filter={filter}
                                setFilter={setFilter}
                                onUpdate={handleUpdateTask}
                                onDelete={handleDeleteTask}
                                processingIds={processingIds}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
