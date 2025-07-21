import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserr, setSelectedUserr] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/for/manage/users");
      return res.data;
    },
  });
  const users = data?.users;
  if (isLoading) return <LoadingSpinner />;
  // console.log(users);

  const handleUpdateUserRole = (userr) => {
    setSelectedUserr(userr);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id) => {
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
        axiosSecure.delete(`/user/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            refetch(); // update UI
          }
        });
      }
    });
  };
  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-10">ManageUsers</h1>

      {/* modal */}
      {isModalOpen && selectedUserr && (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md border border-gray-200 bg-gradient-to-tl from-blue-50 to-green-50">
            <h2 className="text-xl font-bold mb-4">Update User Category</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const updatedData = {
                  category: e.target.category.value,
                };
                try {
                  const res = await axiosSecure.patch(
                    `/user/update/${selectedUserr._id}`,
                    updatedData
                  );
                  if (res.data.modifiedCount > 0) {
                    Swal.fire(
                      "Updated!",
                      "Task updated successfully",
                      "success"
                    );
                    refetch();
                    setIsModalOpen(false);
                    setSelectedUserr(null);
                  }
                } catch (error) {
                  Swal.fire("Error", "Failed to update task", "error");
                }
              }}
            >
              <select
              name="category"
                defaultValue={selectedUserr.category}
                className="p-[10px] border border-gray-300 rounded-sm"
              >
                <option disabled>Select</option>
                <option value="buyer">buyer</option>
                <option value="worker">worker</option>
                <option value="admin">admin</option>
              </select>
              {/* <input
                type="text"
                name="title"
                
                className="input input-bordered w-full mb-3 focus:outline-none"
                required
              /> */}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedUserr(null);
                  }}
                  className="btn btn-outline hover:bg-red-500 hover:text-white text-red-500 hover:border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#1ebcecbe] hover:bg-[#1ebcec] border-none"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {users.length > 0 ? (
        <div className="overflow-x-auto bg-gradient-to-bl from-blue-100 to-green-100 rounded-xl shadow-md">
          <div className="overflow-x-auto max-h-[450px]">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>PhotoURL</th>
                  <th>User Role</th>
                  <th>User Coins</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userr, _id) => (
                  <tr key={userr._id}>
                    <td>{_id + 1}</td>
                    <td>{userr.displayName}</td>
                    <td className="underline text-blue-500">
                      <a href="https://mail.google.com/" target="_blank">
                        {userr.email}
                      </a>
                    </td>
                    <td>
                      <img
                        src={userr.photoURL}
                        alt="photoURL"
                        className="size-10 rounded-xl"
                      />
                    </td>
                    <td>{userr.category}</td>
                    <td>{userr.coins}</td>
                    <td>
                      <button onClick={() => handleUpdateUserRole(userr)} disabled={userr?.email === user?.email || userr?.category ==="admin"}>
                        <FiEdit className={`${userr.email === user.email || userr?.category ==="admin"?"cursor-not-allowed inline-block size-5 mr-2 text-blue-600":"cursor-pointer inline-block size-5 mr-2 text-blue-600"}`} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(userr._id)}
                        disabled={userr.email === user?.email || userr?.category ==="admin"}
                      >
                        <MdDeleteOutline
                          className={`${
                            userr.email === user?.email || userr?.category ==="admin"
                              ? "cursor-not-allowed inline-block mr-2 text-red-600 size-6"
                              : "inline-block mr-2 text-red-600 size-6 cursor-pointer"
                          }`}
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
        <>
          <h1 className="text-center text-xl font-bold text-[#fca61b]">
            No user here
          </h1>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
