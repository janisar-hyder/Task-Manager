import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import { Layers } from 'lucide-react';

const TaskList = ({ tasks, filter, setFilter, onUpdate, onDelete, processingIds }) => {
    const tabs = ['All', 'pending', 'in-progress', 'completed'];

    const filteredTasks = filter === 'All'
        ? tasks
        : tasks.filter(t => t.status === filter);

    const getStatusCount = (status) => {
        if (status === 'All') return tasks.length;
        return tasks.filter(t => t.status === status).length;
    };

    return (
        <section className="w-full">
            <div className="flex justify-center sm:justify-start mb-8">
                <nav className="flex p-1.5 glass-card bg-white/40 rounded-2xl overflow-x-auto hide-scrollbar max-w-full">
                    {tabs.map((tab) => {
                        const isActive = filter === tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap z-10 ${isActive ? 'text-indigo-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBadge"
                                        className="absolute inset-0 bg-white shadow-sm shadow-slate-200/50 border border-slate-100 rounded-xl -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="capitalize tracking-wide">{tab.replace('-', ' ')}</span>
                                <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors duration-300 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200/60 text-slate-500'
                                    }`}>
                                    {getStatusCount(tab)}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <motion.div
                layout
                className="space-y-4"
            >
                <AnimatePresence mode="popLayout">
                    {filteredTasks.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="glass-card flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                                <Layers size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-1">No tasks found</h3>
                            <p className="text-slate-500">
                                {filter === 'All'
                                    ? "You're all caught up! Enjoy your day."
                                    : `You don't have any ${filter.replace('-', ' ')} tasks.`}
                            </p>
                        </motion.div>
                    ) : (
                        filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                isUpdating={processingIds.has(`update-${task.id}`)}
                                isDeleting={processingIds.has(`delete-${task.id}`)}
                            />
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default TaskList;
