const taskModel = require("../models/task.model.js");

const addTask = async (request, response) => {
  const { title, description, taskStatus } = request.body;
  console.log(title, description, taskStatus);
  const userId = request?.user?.id || "";

  try {
    if (!title || !description) {
      return response.status(400).json({ message: "All fields are required" });
    }
    const task = new taskModel({
      title,
      description,
      userId,
      taskStatus,
    });

    const newTask = await task.save();
    response.status(200).json({
      message: "Task added successfully",
      title,
      description,
      taskStatus,
      createdAt: newTask.createdAt,
      taskid: newTask.id,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (request, response) => {
  const { id, taskStatus } = request.body;
  console.log(taskStatus)
  const userId = request?.user?.id || "";

  try {
    const task = await taskModel.findOne({ _id: id, userId });

    if (!task) {
      return response.status(400).json({ message: "Task not found" });
    }
    if(taskStatus === "Start" ){
      task.taskStartTime.push(Date.now()+5.5 * 60 * 60 * 1000),
      task.taskStatus = "Ongoing"
    }
    else if (taskStatus === "Pause" ){
      task.taskEndTime.push(Date.now()+5.5 * 60 * 60 * 1000);
      task.taskStatus = 'Paused';
    }
    else if(taskStatus === "Resume"){
      task.taskStartTime.push(Date.now()+5.5 * 60 * 60 * 1000);
      task.taskStatus = 'Ongoing';
    }
    else{
      task.taskEndTime.push(Date.now()+5.5 * 60 * 60 * 1000);
      task.taskStatus = 'Completed';
      task.taskDuration = task.calculateDuration(); 
    }
    await task.save()

    response.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const removeTask = async (request, response) => {
  const { id } = request.body;
  const userId = request?.user?.id || "";
  try {
    const task = await taskModel.findOne({ _id: id, userId });
    if (!task) {
      return response.status(400).json({ message: "Task not found" });
    }
    await taskModel.deleteOne({ _id: id, userId });
    response.status(200).json({ message: "Task removed successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (request, response) => {
  const userId = request?.user?.id || "";

  try {
    const tasks = await taskModel.find({ userId });

    const taskList = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      start:task.taskStartTime,
      end:task.taskEndTime,
      duration: task.taskDuration,
      taskStatus: task.taskStatus,
    }));

    response.status(200).json({ taskList });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Error while fetching all tasks." });
  }
};

module.exports = {
  addTask,
  updateTask,
  removeTask,
  getTasks,
};
