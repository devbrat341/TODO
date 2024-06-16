import React, { useState, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";


const Task = ({ task, handleStatusChange, handleRemove, index }) => {
  const ind = index;

  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  useEffect(() => {
    let interval;

    if (task.taskStatus === "Start" || task.taskStatus === "Ongoing") {
      const startTime = task.startTime ? new Date(task.startTime).getTime() : Date.now();

      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        setSeconds(elapsedTime);
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [task.taskStatus]);

  return (
    <div key={task.id} className="border-b py-2">
      <h3 className="font-semibold">{ind + 1 + ". " + task.title}</h3>
      <p className="text-sm text-gray-600 overflow-wrap break-words">
        {task.description}
      </p>
      {task.taskStatus === "Completed" ? (
        <>
          {show ? (
            <>
              <p className="text-sm text-gray-600 overflow-wrap break-words">
                Start : {convertToHHMMSS(task.start[0])}
              </p>
              <p className="text-sm text-gray-600 overflow-wrap break-words">
                End : {convertToHHMMSS(task.end[task.end.length - 1])}
              </p>
              <p className="text-sm text-gray-600 overflow-wrap break-words">
                Duration : {convertSecondsToHHMMSS(task.duration)}
              </p>


            </>
          ) : (
            ""
          )}
          <div className="flex justify-between">
            <button
              onClick={handleShow}
              className="bg-gray-600 text-white px-4 py-1 rounded-md"
            >
              {show ? "Hide" : "Details"}
            </button>
            <div className="px-5 p-2 bg-red-400 text-black py-1 rounded-md">
              <MdOutlineDelete
                onClick={() => handleRemove(task.id)}
                color="black"
                size={20}
              />
            </div>
          </div>
        </>
      ) : (
        <>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mt-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <span
              className={`ml-2 px-2 py-1 rounded-md ${
                task.taskStatus === "Start"
                ? "bg-green-500 text-white"
                : task.taskStatus === "Ongoing"
                ? "bg-green-500 text-white"
                : task.taskStatus === "Pending"
                ? "bg-pink-500 text-white"
                : "bg-green-500 text-white"
                }`}
                >
              {task.taskStatus === "Start"
                ? "Ongoing"
                : task.taskStatus === "Resume"
                ? "Ongoing"
                : task.taskStatus}
            </span>
            {(task.taskStatus === "Start" || task.taskStatus === "Ongoing") && (
                <div className="pt-2 flex flex-row items-center">
                  <label className="text-sm font-medium text-gray-700 pr-3">
                    Duration:
                  </label>
                  <button className="flex px-4 py-1 rounded-md">
                    {formatTime(seconds)}
                  </button>
                </div>
              )}
          </div>
          <div className="flex flex-row">
            <div>
              <label
                htmlFor={`status-${task.id}`}
                className="text-sm font-medium text-gray-700"
                >
                Change:
              </label>
              <select
                id={`status-${task.id}`}
                name={`status-${task.id}`}
                value={task.taskStatus}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                className="ml-2 p-1 border rounded-md focus:outline-purple-500"
                >
                <option value="Start">Start</option>
                <option value="Ongoing">Resume</option>
                <option value="Pending">Pause</option>
                <option value="Completed">End</option>
              </select>
            </div>
            <div className="px-5 p-2 bg-red-400 text-black py-1 rounded-md">
              <MdOutlineDelete
                onClick={() => handleRemove(task.id)}
                color="black"
                size={20}
                />
            </div>
          </div>
        </div>
        
        
        </>
      )}
    </div>
  );
};

function convertToHHMMSS(isoString) {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function convertSecondsToHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
export default Task;
