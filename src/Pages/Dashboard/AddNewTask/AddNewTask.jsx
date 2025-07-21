import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useUserInfo from "../../../Hooks/useUserInfo";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddNewTask = () => {
  const { user } = useAuth();
  // console.log(user)
  const { userInfo, userInfoLoading } = useUserInfo();
  // console.log(userInfo?.email);

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [owrkProf, setWorkProf] = useState("");

  const onSubmit = async (data) => {
    const requiredWorkers = Number(data.required_workers);
    data.required_workers = requiredWorkers;
    const payableAmount = Number(data.payable_amount);
    data.payable_amount = payableAmount;
    const totalPayable = requiredWorkers * payableAmount;

    if (userInfoLoading) {
      return <LoadingSpinner />;
    }

    if (totalPayable > userInfo.coins) {
      Swal.fire({
        icon: "warning",
        title: "Not enough coin",
        text: "Please purchase more coin to add this task.",
      });
      navigate("/dashboard/purchaseCoin");
      return;
    }

    //create task
    const taskData = {
      ...data,
      buyerName: user.displayName,
      task_image_url: owrkProf,
      email: user?.email,
      total_cost: totalPayable,
      status: "pending",
      createdAt: new Date().toLocaleString(),
    };

    try {
      //save to db
      const res = await axiosSecure.post("/tasks", taskData);

      if (res.data.insertedId) {
        //update user coins
        const newCoins = userInfo.coins - totalPayable;

        await axiosSecure.patch(`/users/coins/${user?.email}`, {
          coins: newCoins,
        });
        Swal.fire({
          icon: "success",
          title: "Task Created",
          text: "Your task has been added successfully!",
        });
        navigate("/dashboard/myTasks");
      }
    } catch (error) {
      console.error("Error adding task", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Failed to create task. Try again later.",
      });
    }
  };

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image, "image uploaded");
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_api_key
    }`;

    const res = await axios.post(imageUploadUrl, formData);
    setWorkProf(res.data.data.url);
  };
  return (
    <div className="p-2">
      <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-3">
        Create a New Task for Workers
      </h1>
      <p className="sm:w-[550px] w-11/12 mx-auto text-center sm:text-xl mb-10">
        Define your task, set rewards, and let workers complete it to grow your
        reach.
      </p>
      <div>
        <form
          className="rounded-lg shadow-[_0_0_10px_#fca61b71] p-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 w-full">
            {/* task title */}
            <fieldset className="fieldset">
              <label className="label">Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Title"
                {...register("title")}
              />
            </fieldset>

            {/* required_workers */}
            <fieldset className="fieldset">
              <label className="label">Required Workers</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Required Workers"
                {...register("required_workers")}
              />
            </fieldset>

            {/* payable_amount  */}
            <fieldset className="fieldset">
              <label className="label">Payable Amount</label>
              <input
                type="number"
                className="input w-full"
                placeholder="Payable Amount"
                {...register("payable_amount")}
              />
            </fieldset>

            {/* completion_date  */}
            <fieldset className="fieldset">
              <label className="label">Completion Date </label>
              <input
                type="date"
                className="input w-full"
                placeholder="Completion Date"
                {...register("completion_date")}
              />
            </fieldset>

            {/* submission_info  */}
            <fieldset className="fieldset">
              <label className="label">Submission Info </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Submission Info"
                {...register("submission_info")}
              />
            </fieldset>

            {/* task_image_url  */}
            <fieldset className="fieldset">
              <label className="label">Task Image</label>
              <input
                onChange={handleImgUpload}
                type="file"
                className="input w-full"
              />
            </fieldset>

            {/* Description */}
            <fieldset className="fieldset sm:col-span-2">
              <label className="label">Description </label>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Description"
                {...register("description")}
              />
            </fieldset>

            <button
              type="submit"
              className="btn bg-[#fca61b] hover:bg-[#f7a20a] border-none hover:border-none text-white mt-4 sm:col-span-2 hover:shadow-[_0_0_15px_#fca61b] w-full"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
