import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/available/tasks")
      .then((res) => {
        if (res.data.success) {
          setTasks(res.data.tasks);
        }
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
      });
  }, [axiosSecure]);

  return (
    <div>
      <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-3">Explore Available Tasks</h1>
      <p className="sm:w-[550px] w-11/12 mx-auto text-center sm:text-xl mb-10">Browse a curated list of open tasks, including payout details, deadlines, and assignment requirements.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border border-gray-200 bg-gradient-to-tr from-blue-50 to-yellow-50  rounded-2xl p-4 shadow hover:shadow-[_0_0_20px_#fca61b4b] transition"
          >
            <h2 className="text-xl font-bold text-indigo-600">{task.title}</h2>
            <p>Buyer: {task.buyerName}</p>
            <p>Pay: {task.payable_amount} coin</p>
            <p>Workers Needed: {task.required_workers}</p>
            <p>Deadline: {task.completion_date}</p>
            <a href={task.task_image_url} target="_blank">
              <img src={task.task_image_url} alt="task photo" />
            </a>
            <Link
              className="btn btn-outline mt-4 px-5 py-2 text-[#fca61b] hover:text-white rounded-lg hover:bg-[#fca61b] hover:shadow-[_0_0_15px_#fca61b] hover:border-none"
             to={`/dashboard/taskDetails/${task._id}`}
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
