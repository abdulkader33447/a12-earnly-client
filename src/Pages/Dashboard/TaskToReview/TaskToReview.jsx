import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const TaskToReview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: submissions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyer-pending-tasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/buyer-pending-tasks?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/submissions/approve/${id}`);
      if (res.data.result?.modifiedCount > 0) {
        Swal.fire(" Approved!", "Submission has been approved.", "success");
        refetch();
      } else {
        Swal.fire(" Failed", "Could not approve submission.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(" Error", "Something went wrong while approving.", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/submissions/reject/${id}`);
      if (
        res.data.submissionUpdate?.modifiedCount > 0 &&
        res.data.taskUpdate?.modifiedCount > 0
      ) {
        Swal.fire(" Rejected", "Submission has been rejected.", "success");
        refetch();
      } else {
        Swal.fire(" Failed", "Could not reject submission.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(" Error", "Something went wrong while rejecting.", "error");
    }
  };

  const handleView = (sub) => {
    Swal.fire({
      title: "Submission Info",
      text: sub.submission_details || "No additional info",
      imageUrl: sub.submission_image_url,
      imageWidth: 400,
      imageAlt: "Submitted Image",
    });
  };

  return (
    <div>
      <h2 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-10">Pending Submissions</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Payable</th>
              <th>Submission</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((sub) => (
              <tr key={sub._id}>
                <td>{sub.worker_name}</td>
                <td>{sub.title}</td>
                <td>{sub.payable_amount}</td>
                <td>
                  <button onClick={() => handleView(sub)}>
                    <FaEye className="size-6 cursor-pointer" />
                  </button>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(sub._id)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleReject(sub._id)}
                  >
                    <FaTimes className="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <LoadingSpinner/>}
        {!isLoading && submissions.length === 0 && (
          <p className="text-center py-4 text-gray-500">
            No pending submissions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskToReview;
