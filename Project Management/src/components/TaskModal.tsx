import { useState } from "react";

const TaskModal = ({ isVisible, onClose, onSubmit }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Medium",
    status: "open",
  });

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newTask); // Pass task data to the parent
    setNewTask({
      title: "",
      description: "",
      deadline: "",
      priority: "Medium",
      status: "open",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Enter task title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Enter task description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Hold">Hold</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-6 rounded-md shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
