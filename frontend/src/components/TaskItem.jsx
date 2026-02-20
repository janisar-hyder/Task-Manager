import { Trash2, Clock, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onUpdate, onDelete, isUpdating, isDeleting }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    color: 'text-emerald-500 hover:text-emerald-600 bg-emerald-50 border-emerald-200',
                    icon: CheckCircle2,
                    next: 'pending',
                    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200'
                };
            case 'in-progress':
                return {
                    color: 'text-indigo-500 hover:text-indigo-600 bg-indigo-50 border-indigo-200',
                    icon: Clock,
                    next: 'completed',
                    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200'
                };
            default:
                return {
                    color: 'text-amber-500 hover:text-amber-600 bg-amber-50 border-amber-200',
                    icon: Circle,
                    next: 'in-progress',
                    badge: 'bg-amber-100 text-amber-700 border-amber-200'
                };
        }
    };

    const statusConfig = getStatusConfig(task.status);
    const StatusIcon = statusConfig.icon;

    const handleStatusCycle = () => {
        if (isUpdating) return;
        onUpdate(task.id, { status: statusConfig.next });
    };

    const handleDelete = () => {
        if (isDeleting) return;
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(task.id);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const isToday = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        if (isToday) {
            return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
        }

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            whileHover={{ y: -2 }}
            className={`p-5 rounded-2xl border transition-all duration-300 ${task.status === 'completed'
                    ? 'bg-slate-50/80 border-slate-200/60 opacity-80 backdrop-blur-sm'
                    : 'bg-white border-slate-100 shadow-xl shadow-slate-200/20'
                }`}
        >
            <div className="flex items-start gap-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleStatusCycle}
                    disabled={isUpdating}
                    className={`flex-shrink-0 mt-1 p-0.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${statusConfig.color.split(' ')[0]} ${statusConfig.color.split(' ')[2]}`}
                    title="Click to cycle status"
                >
                    {isUpdating ? (
                        <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${statusConfig.color.split(' ')[0].replace('text-', 'border-')}`} />
                    ) : (
                        <StatusIcon size={24} strokeWidth={2.5} />
                    )}
                </motion.button>

                <div className="flex-grow min-w-0">
                    <h3 className={`text-[1.05rem] font-semibold leading-tight mb-1 transition-colors duration-300 ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}>
                        {task.title}
                    </h3>

                    {task.description && (
                        <p className={`mt-1.5 text-sm whitespace-pre-wrap break-words leading-relaxed ${task.status === 'completed' ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                            {task.description}
                        </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border tracking-wider uppercase ${statusConfig.badge}`}>
                            {task.status.replace('-', ' ')}
                        </span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                            <Clock size={12} />
                            {formatDate(task.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="flex-shrink-0 ml-2">
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete task"
                    >
                        {isDeleting ? (
                            <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Trash2 size={20} strokeWidth={2} />
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default TaskItem;
