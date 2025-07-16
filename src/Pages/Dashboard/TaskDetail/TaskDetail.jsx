import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const TaskDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/tasks/${id}`).then((res) => {
      if (res.data.success) {
        setTask(res.data.task);
      }
    });
  }, [id,axiosSecure]);
  if(!task){
    return <LoadingSpinner/>
  }
  return (
     <div>
      <h1 className="text-2xl font-bold">{task?.title}</h1>
      <p>{task?.description}</p>
      <p>Payable: {task?.payable_amount}</p>
      {/* Submission form here */}
    </div>
  );
};

export default TaskDetail;
