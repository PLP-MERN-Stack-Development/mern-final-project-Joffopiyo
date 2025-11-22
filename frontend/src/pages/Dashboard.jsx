import { useState, useEffect } from 'react';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import { io } from 'socket.io-client';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get('/tasks');
                setTasks(res.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('taskCreated', (newTask) => {
            setTasks((prev) => [newTask, ...prev]);
        });

        socket.on('taskUpdated', (updatedTask) => {
            setTasks((prev) => prev.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        });

        socket.on('taskDeleted', (taskId) => {
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        });

        return () => {
            socket.off('taskCreated');
            socket.off('taskUpdated');
            socket.off('taskDeleted');
        };
    }, [socket]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    };

    const handleStatusChange = async (task, newStatus) => {
        try {
            await api.put(`/tasks/${task._id}`, { status: newStatus });
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

            <TaskForm />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <div key={task._id} className="bg-white overflow-hidden shadow rounded-lg p-6 relative">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                        <div className="mt-4 flex flex-col space-y-2">
                            <div className="flex justify-between items-center">
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task, e.target.value)}
                                    className={`text-xs font-semibold rounded-full px-2 py-1 border-none focus:ring-0 cursor-pointer ${task.status === 'done' ? 'bg-green-100 text-green-800' :
                                            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="done">Done</option>
                                </select>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                        task.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                    }`}>
                                    {task.priority}
                                </span>
                            </div>
                            {task.dueDate && (
                                <div className="text-xs text-gray-500">
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                </div>
                            )}
                            <div className="text-xs text-gray-400 pt-2 border-t">
                                Assigned to: {task.assignedTo ? task.assignedTo.username : 'Unassigned'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
