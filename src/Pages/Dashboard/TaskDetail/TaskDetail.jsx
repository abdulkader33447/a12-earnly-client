import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [submissionDetails, setSubmissionDetails] = useState("");

  // ✅ Fetch task using React Query
  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${id}`);
      return res.data.task;
    },
    enabled: !!id,
  });

  // ✅ Handle submission using useMutation
  const taskSubmitMutation = useMutation({
    mutationFn: async (submissionData) => {
      const res = await axiosSecure.post("/submissions", submissionData);
      if (res.data.insertedId) {
        await axiosSecure.patch(`/tasks/${submissionData.task_id}/delivered`, {
          delivered: true,
        });
      }
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Task submitted successfully!", "success");
      queryClient.invalidateQueries(["task", id]); // refetch task
      setSubmissionDetails("");
      navigate("/dashboard/taskList");
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong while submitting.", "error");
    },
  });

  const handleSubmit = (e) => {
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

    taskSubmitMutation.mutate(submitData);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load task.</p>;

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <div className="space-y-2">
        {task?.delivered && (
          <div className="badge badge-outline p-5 badge-warning my-3 font-bold text-2xl">
            Delivered
          </div>
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
          Completion Date:{" "}
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
          alt="task"
          className="rounded-lg max-w-md w-full"
        />
      </div>

      {/* Submission form */}
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
              className="btn w-full mt-4 text-white border-none bg-[#fca61b] hover:bg-[#f7a20a] hover:shadow-[_0_0_15px_#fca61b]"
              type="submit"
              disabled={task?.delivered || taskSubmitMutation.isPending}
            >
              {task?.delivered
                ? "Task Already Submitted"
                : taskSubmitMutation.isPending
                ? "Submitting..."
                : "Submit Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
