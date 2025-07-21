import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";

const ManageTask = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks/for/admin");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  // console.log(tasks);

  const handleDeleteTask = (id)=>{
    Swal.fire({
          title: "Are you sure?",
          text: "This user will be permanently deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#f44336",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/task/delete/${id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                Swal.fire("Deleted!", "User has been deleted.", "success");
                refetch(); // update UI
              }
            });
          }
        });
  }

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-10">ManageTask</h1>
      {tasks.length > 0 ? (
        <div className="overflow-x-auto bg-gradient-to-bl from-blue-100 to-green-100 rounded-xl shadow-md">
          <div className="overflow-x-auto max-h-[450px]">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th>#</th>
                  <th>Title</th>
                  <th>Email</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, _id) => (
                  <tr key={task._id}>
                    <td>{_id + 1}</td>
                    <td>{task.title}</td>
                    <td className="underline text-blue-500">
                      <a href="https://mail.google.com/" target="_blank">
                        {task.email}
                      </a>
                    </td>
                    <td>{task.payable_amount}🪙</td>
                    <td>{task.buyerName}</td>
                    <td>{task.createdAt}</td>
                    <td>
                      <button
                      onClick={() => handleDeleteTask(task._id)}
                      
                      >
                        <MdDeleteOutline
                        className="inline-block mr-2 text-red-600 size-6 cursor-pointer"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManageTask;
