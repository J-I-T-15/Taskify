import { useState, useEffect } from "react";
import dayjs from "dayjs";

const TaskEditModal = ({ isVisible, onClose, task }) => {
  const [progress, setProgress] = useState(task?.status || "Open");
  const [comment, setComment] = useState(task?.description || "");
  const [isLoading, setIsLoading] = useState(false);

  const progressSteps = ["Open", "In Progress", "Review", "Hold", "Closed"];
  const stepColors = {
    Open: "bg-gray-400",
    "In Progress": "bg-blue-500",
    Review: "bg-purple-500",
    Hold: "bg-orange-500",
    Closed: "bg-green-500",
  };

  useEffect(() => {
    if (task) {
      setProgress(task.status);
      setComment(task.description);
    }
  }, [task]);

  const handleStepClick = (step) => {
    setProgress(step);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!task) return;
  
    setIsLoading(true);
  
    // Create updated task object with all necessary fields
    const updatedTask = {
      id: task.id,  // Include the task ID
      title: task.title,  // Keep the existing title
      description: comment,  // Updated comment
      deadline: task.deadline,  // Keep the existing deadline (you can add logic if you want to edit it)
      priority: task.priority,  // Keep the existing priority (you can add logic if you want to edit it)
      assignedTo: task.assignedTo,  // Keep the existing assignedTo (you can add logic if you want to edit it)
      status: progress,  // Updated status
      projectId: task.projectId,  // Keep the existing projectId
    };
  
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (response.ok) {
        onClose();  // Close the modal on success
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };  

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[34rem] space-y-6">
        {/* Header */}
        <div className="text-lg font-semibold p-4 bg-blue-100 text-blue-600 rounded-lg">
          {task.title}
        </div>

        {/* Task Details */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-800">Deadline:</span>{" "}
            {dayjs(task.deadline).format("MMM DD, YYYY")}
          </p>
          <p className="inline-block rounded-md px-3 py-1 text-sm bg-yellow-100 text-yellow-600">
            Priority: {task.priority}
          </p>
        </div>

        {/* Step Progress */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Progress
          </label>
          <div className="relative flex items-center justify-between">
            {progressSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                {/* Circle for each step */}
                <div
                  onClick={() => handleStepClick(step)}
                  className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                    progress === step
                      ? stepColors[step]
                      : "bg-gray-200"
                  }`}
                  title={step}
                >
                  <span
                    className={`text-xs font-bold ${
                      progress === step ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Line connecting steps */}
                {index < progressSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 transition-all ${
                      progressSteps.indexOf(progress) > index
                        ? stepColors[progressSteps[index + 1]]
                        : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Labels below steps */}
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            {progressSteps.map((step) => (
              <span
                key={step}
                className={`${
                  progress === step ? "font-semibold text-gray-800" : ""
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            className="mt-2 w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Add your comment"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
