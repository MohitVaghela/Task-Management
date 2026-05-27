import { useState } from 'react';
import Header from './Header';
import Card from '../tasks/Card';
import Task from '../tasks/Task';
import TaskModal from '../tasks/TaskModal';
import { useTasks } from '../../context/TaskContext.jsx';

export default function Dashboard() {
    const { counts, filter, setFilter } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setEditingTask(null);
    };

    const filters = ['all', 'pending', 'completed'];

    return (
        <div className="min-h-screen bg-gray-700">
            <Header />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                                    filter === f
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 active:scale-95 transition-all duration-200"
                    >
                        + Add Task
                    </button>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    <Card
                        label="All Tasks"
                        count={counts.all}
                        color="blue"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        }
                    />
                    <Card
                        label="Pending"
                        count={counts.pending}
                        color="orange"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />
                    <Card
                        label="Completed"
                        count={counts.completed}
                        color="green"
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />
                </div>

                <Task onEdit={handleEdit} />
            </main>

            {showModal && <TaskModal task={editingTask} onClose={handleClose} />}
        </div>
    );
}
