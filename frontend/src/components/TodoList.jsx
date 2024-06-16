// components/TodoList.js
import React, { useEffect, useState } from "react";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/action/taskActions";
import { removeTask } from "../redux/action/taskActions";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasksRes = useSelector((state) => state.tasks.data.taskList);



  const [tasks, setTasks] = useState(tasksRes);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    setTasks(tasksRes);
    // dispatch(getAllTask());
  }, [tasksRes]);
  const handleRemove = (id) => {
    dispatch(removeTask(id))  
    setTasks(tasks.filter(task => task.id !== id));
  }
  const handleStatusChange = (taskId, newStatus) => {
    // dispatch(updateTask({ id: taskId, taskStatus: newStatus }));
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === taskId ? { ...task, taskStatus: newStatus } : task
    //   )
    // );
    let updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, taskStatus: newStatus } : task
    );

    // If a task is set to "Ongoing", pause all other tasks
    if (newStatus === "Ongoing" || newStatus === "Start") {
      updatedTasks = updatedTasks.map((task) =>
        task.id !== taskId && task.taskStatus === "Ongoing"
          ? { ...task, taskStatus: "Pending" }
          : task
      );
    }
    setTasks(updatedTasks);
    updatedTasks.forEach((task) => {
      if (task.id === taskId || task.taskStatus === "Pending") {
        dispatch(updateTask({ id: task.id, taskStatus: task.taskStatus }));
      }
    });
  
   
  };
  

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((task) => task.taskStatus === filter);

  return (
    <div className="m-2 p-4 bg-white rounded-lg  border shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todo List</h2>
        <div>
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700 mr-2"
          >
            Filter:
          </label>
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md focus:outline-purple-500"
          >
            <option value="all">All</option>
            <option value="Ongoing">Resume</option>
            <option value="Pending">Pause</option>
            <option value="Completed">End</option>
          </select>
        </div>
      </div>
      <div>
        {filteredTasks?.length ? (
          filteredTasks.map((task, i) => (
            <Task task={task} handleStatusChange={handleStatusChange} handleRemove={handleRemove} index={i} />
          ))
        ) : (
          <p className="text-gray-600">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
