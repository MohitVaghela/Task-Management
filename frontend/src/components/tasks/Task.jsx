import { useTasks } from '../../context/TaskContext.jsx';

export default function Task({ onEdit }) {
    const { tasks, loading, updateTask, deleteTask } = useTasks();

    const toggleStatus = (task) => {
        const next = task.status === 'completed' ? 'pending' : 'completed';
        updateTask(task._id, { status: next });
    };

    const formatDate = (str) =>
        new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (loading) {
        return <p className="text-center text-gray-400 py-10">Loading tasks...</p>;
    }

    if (!tasks.length) {
        return <p className="text-center text-gray-400 py-10">No tasks found.</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-medium">
                    <tr>
                        <th className="px-6 py-4">Task Title</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Created</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <tr key={task._id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                            <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{task.description || '—'}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => toggleStatus(task)}
                                    className={`px-2 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                                        task.status === 'completed'
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                    }`}
                                >
                                    {task.status}
                                </button>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{formatDate(task.createdAt)}</td>
                            <td className="px-6 py-4 text-right flex justify-end gap-3">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
