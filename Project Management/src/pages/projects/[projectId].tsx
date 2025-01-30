import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import TaskModal from "~/components/TaskModal";
import dayjs from "dayjs";
import TaskEditModal from "~/components/TaskEditModal";
import { Calendar, CheckCircle } from "lucide-react";
import { withAuth } from "~/utils/auth";
import { GetServerSidePropsContext } from "next";

const ProjectTasks = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const { data: session } = useSession();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [month, setMonth] = useState(dayjs().month());
  const [year, setYear] = useState(dayjs().year());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (!session) router.push("/");
    if (projectId) fetchTasks();
  }, [session, projectId]);

  const fetchTasks = async () => {
    const response = await fetch(`/api/tasks?projectId=${projectId}`);
    const data = await response.json();
    setTasks(data);
    setFilteredTasks(data);
  };

  const handleAddTask = async (task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          projectId,
          assignedTo: session.user.id,
        }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
        setFilteredTasks((prev) => [...prev, newTask]);
        setIsModalVisible(false); // Close modal after submission
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const generateCalendar = () => {
    const daysInMonth = dayjs().month(month).year(year).daysInMonth();
    const firstDayOfMonth = dayjs()
      .month(month)
      .year(year)
      .startOf("month")
      .day();

    const calendarGrid = Array(firstDayOfMonth).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      calendarGrid.push(i);
    }

    return calendarGrid;
  };

  const getTasksForDate = (date) => {
    return tasks.filter(
      (task) =>
        dayjs(task.deadline).date() === date &&
        dayjs(task.deadline).month() === month &&
        dayjs(task.deadline).year() === year,
    );
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalVisible(true);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (!session) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-100 p-6">
        <div className="mx-auto max-w-7xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Project Tasks
          </h1>

          <div className="mb-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                className="btn rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
              >
                Previous
              </button>
              <div className="flex items-center">
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="input mt-1 w-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  {months.map((monthName, index) => (
                    <option key={index} value={index}>
                      {monthName}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="input mt-1 w-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  {Array.from({ length: 10 }, (_, i) => 2023 + i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <button
                onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                className="btn rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
              >
                Next
              </button>
            </div>
            <button
              onClick={() => setIsModalVisible(true)}
              className="btn rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          {/* Calendar with day names */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-700">
            {daysOfWeek.map((day) => (
              <div key={day} className="rounded-lg bg-gray-200 p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid mt-2 grid grid-cols-7 gap-2">
            {generateCalendar().map((date, index) => (
              <div
                key={index}
                className={`calendar-cell relative rounded-lg border p-4 ${
                  !date ? "bg-gray-100" : "bg-white"
                } flex flex-col justify-between`}
              >
                {date && (
                  <>
                    {/* Date in the top-right corner */}
                    <div className="self-end text-xs font-bold text-gray-500">
                      {date}
                    </div>

                    {/* Tasks in the bottom section */}
                    <div className="task-list mt-2 flex flex-col space-y-1">
                      {getTasksForDate(date).map((task) => (
                        <div
                          key={task.id}
                          className="task-card flex items-center space-x-2 truncate text-sm text-blue-600 cursor-pointer"
                          onClick={() => handleTaskClick(task)}
                        >
                          <CheckCircle className="h-4 w-4 shrink-0" />
                          <span className="truncate">{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <TaskModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddTask}
      />
      <TaskEditModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        task={selectedTask}
      />
    </div>
  );
};

export const getServerSideProps = withAuth(
  async (context: GetServerSidePropsContext, session) => {
    return {
      props: {
        session,
      },
    };
  }
);

export default ProjectTasks;
