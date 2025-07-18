import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [submissionStatuses, setSubmissionStatuses] = useState({});
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingStatuses, setLoadingStatuses] = useState(false);

  // Get tasks
  useEffect(() => {
    setLoadingTasks(true);
    axiosSecure
      .get("/available/tasks")
      .then((res) => {
        if (res.data.success) {
          setTasks(res.data.tasks);
        }
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
      })
      .finally(() => {
        setLoadingTasks(false);
      });
  }, [axiosSecure]);

  // Get submission statuses
  useEffect(() => {
    const fetchStatuses = async () => {
      setLoadingStatuses(true);
      const statuses = {};

      await Promise.all(
        tasks.map(async (task) => {
          try {
            const res = await axiosSecure.get(
              `/submissions/status/${task._id}`
            );
            statuses[task._id] = res.data.status;
          } catch (error) {
            statuses[task._id] = "Not Submitted";
          }
        })
      );

      setSubmissionStatuses(statuses);
      setLoadingStatuses(false);
    };

    if (tasks.length > 0) {
      fetchStatuses();
    }
  }, [tasks, axiosSecure]);

  // Loading spinner simple example
  if (loadingTasks) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-3">
        Explore Available Tasks
      </h1>
      <p className="sm:w-[550px] w-11/12 mx-auto text-center sm:text-xl mb-10">
        Browse a curated list of open tasks, including payout details,
        deadlines, and assignment requirements.
      </p>

      {loadingStatuses && (
        <div className="flex justify-center mb-4">
          <div className="loading loading-spinner loading-md"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task?._id}
            className="border border-gray-200 bg-gradient-to-br from-yellow-50 to-blue-50 rounded-2xl p-4 shadow hover:shadow-[_0_0_20px_#fca61b4b] transition"
          >
            {task?.delivered && (
              <div className="flex justify-between">
                <div className="badge badge-soft badge-success my-3 sm:p-5 p-3">
                  Delivered
                </div>
                {submissionStatuses[task._id] && (
                  <div
                    className={`badge badge-soft my-3 sm:p-5 p-3 ${
                      submissionStatuses[task._id] === "rejected"
                        ? "badge-error"
                        : "badge-info"
                    }`}
                  >
                    Status: {submissionStatuses[task._id]}
                  </div>
                )}
              </div>
            )}
            <h2 className="text-xl font-bold text-indigo-600">{task?.title}</h2>
            <p>
              Buyer: <span className="text-gray-400">{task?.buyerName}</span>
            </p>
            <p>
              Pay:{" "}
              <span className="text-gray-400">{task?.payable_amount} coin</span>
            </p>
            <p>
              Workers Needed:{" "}
              <span className="text-gray-400">{task?.required_workers}</span>
            </p>
            <p>
              Deadline:{" "}
              <span className="text-gray-400">{task?.completion_date}</span>
            </p>
            <a href={task?.task_image_url} target="_blank" rel="noreferrer">
              <img
                src={task?.task_image_url}
                alt="task photo"
                className="rounded-lg"
              />
            </a>
            <Link
              className="btn btn-outline mt-4 px-5 py-2 text-[#fca61b] hover:text-white rounded-lg hover:bg-[#fca61b] hover:shadow-[_0_0_15px_#fca61b] hover:border-none"
              to={`/dashboard/taskDetails/${task?._id}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
