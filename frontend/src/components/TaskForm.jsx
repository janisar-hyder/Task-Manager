import { useState } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const TaskForm = ({ onTaskAdded, isSubmitting }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const MAX_TITLE_LENGTH = 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        if (title.length > MAX_TITLE_LENGTH) {
            setError(`Title must be less than ${MAX_TITLE_LENGTH} characters`);
            return;
        }

        try {
            await onTaskAdded({ title: title.trim(), description: description.trim() });
            setTitle('');
            setDescription('');
            setError('');
        } catch (err) {
            setError('Failed to add task');
            toast.error('Failed to create task');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 sm:p-8"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                    <input
                        id="title"
                        type="text"
                        className={`input-field text-lg font-medium peer ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
                        placeholder="What needs to be done today?"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError('');
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={isSubmitting}
                        maxLength={MAX_TITLE_LENGTH}
                    />

                    <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center gap-2 pointer-events-none transition-opacity duration-300">
                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${title.length > MAX_TITLE_LENGTH * 0.9
                                ? 'bg-amber-100 text-amber-700'
                                : title.length > 0 ? 'bg-indigo-50 text-indigo-500' : 'text-slate-300'
                            }`}>
                            {title.length}/{MAX_TITLE_LENGTH}
                        </span>
                    </div>

                    {error && (
                        <p className="absolute -bottom-6 left-1 text-sm font-medium text-rose-500 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-rose-500" />
                            {error}
                        </p>
                    )}
                </div>

                <motion.div
                    initial={false}
                    animate={{
                        height: (isFocused || description || title) ? 'auto' : 0,
                        opacity: (isFocused || description || title) ? 1 : 0,
                        marginTop: (isFocused || description || title) ? 20 : 0
                    }}
                    className="overflow-hidden relative"
                >
                    <textarea
                        id="description"
                        rows="2"
                        className="input-field resize-none text-base"
                        placeholder="Add some notes, steps, or context... (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isSubmitting}
                    />
                </motion.div>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${title ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                        <span>{title ? 'Ready to add' : 'Start typing...'}</span>
                    </div>
                    <button
                        type="submit"
                        className="btn-primary flex items-center gap-2 shadow-indigo-200"
                        disabled={isSubmitting || !title.trim() || title.length > MAX_TITLE_LENGTH}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Plus size={20} strokeWidth={2.5} />
                        )}
                        <span className="hidden sm:inline">Add Task</span>
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default TaskForm;
