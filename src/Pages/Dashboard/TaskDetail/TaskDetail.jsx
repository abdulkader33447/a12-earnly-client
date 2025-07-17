import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const TaskDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState(null);
  const [submissionDetails, setSubmissionDetails] = useState("");
  // console.log(submissionDetails);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.get(`/tasks/${id}`).then((res) => {
      if (res.data.success) {
        setTask(res.data.task);
      }
    });
  }, [id, axiosSecure]);
  if (!task) {
    return <LoadingSpinner />;
  }
  console.log(task._id);
  console.log(user.displayName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      task_id: task._id,
      title: task.title,
      payable_amount: task.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      buyer_name: task.buyerName,
      buyer_email: task.email,
      submission_details: submissionDetails,
      submission_date: new Date().toLocaleString(),
      status: "pending",
    };
    console.log(submitData);

    try {
      const res = await axiosSecure.post("/submissions", submitData);

      if (res.data.insertedId) {
        await axiosSecure.patch(`/tasks/${task._id}/delivered`, {
          delivered: true,
        });
        Swal.fire("Success!", "Task submitted successfully!", "success");
        setSubmissionDetails("");
        navigate("/dashboard/taskList");
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong while submitting.", "error");
    }
  };
  return (
    <div>
      <div className="space-y-2">
        {task?.delivered ? (
          <div className="badge badge-outline p-5 badge-warning my-3 font-bold text-2xl">Delivered</div>
        ) : (
          <></>
        )}
        <h1 className="text-2xl font-bold">{task?.title}</h1>

        <p>{task?.description}</p>
        <p>
          Payable: <span className="text-gray-400">{task?.payable_amount}</span>
        </p>
        <p>
          Needed Worker:{" "}
          <span className="text-gray-400">{task?.required_workers}</span>
        </p>
        <p>
          Complition Data:{" "}
          <span className="text-gray-400">{task?.completion_date}</span>
        </p>
        <p>
          Submission Info:{" "}
          <span className="text-gray-400">{task?.submission_info}</span>
        </p>
        <p>
          Buyer Name: <span className="text-gray-400">{task?.buyerName}</span>
        </p>
        <p>
          Buyer Email: <span className="text-gray-400">{task?.email}</span>
        </p>
        <p>
          Status: <span className="text-gray-400">{task?.status}</span>
        </p>
        <img
          src={task?.task_image_url}
          alt="task photo"
          className="rounded-lg"
        />
      </div>
      {/* Submission form here */}
      <div className="card bg-base-100 w-full shrink-0 shadow-[_0_0_10px_#fca61b71] my-10">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label className="label">Submission Detail</label>
            <textarea
              className="textarea w-full"
              placeholder="Enter your work details, links, etc."
              value={submissionDetails}
              onChange={(e) => setSubmissionDetails(e.target.value)}
              required
            />
            <button
              className="btn bg-[#fca61b] hover:bg-[#f7a20a] border-none text-white mt-4 hover:shadow-[_0_0_15px_#fca61b] w-full"
              type="submit"
            >
              Subimt Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
