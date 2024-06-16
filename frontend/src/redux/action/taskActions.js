import { callApi } from "../../config/axios";
import { BASE_URL } from "../../config/axios";

export const getAllTask = () => {
  return async (dispatch) => {
    dispatch({type:"GET_TASKS_PENDING"})
    try{
      const response = await callApi("get", `${BASE_URL}/task/all`);
      dispatch({
        type: "GET_TASKS_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "GET_TASKS_REJECTED",
        payload: error.message || '',
      });
    }
  };
};

export const addTask = ({ title, description, taskStatus }) => {
  return async (dispatch) => {
    dispatch({type:"ADD_TASK_PENDING"})
    try{
      const response = await callApi("post", `${BASE_URL}/task/add`, {
          title,
          description,
          taskStatus,
        });
      dispatch({
        type: "ADD_TASK_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "ADD_TASK_REJECTED",
        payload: error.message || 'failed to create',
      });
    }
  };
};

export const updateTask = ({ id, taskStatus }) => {
  return async (dispatch) => {
    // dispatch({
    //   type: "UPDATE_TASK",
    //   payload: callApi("put", `${BASE_URL}/task/update`, {
    //     id,
    //     taskStatus,
    //   }),
    // });
    dispatch({type:"UPDATE_TASK_PENDING"})
    try{
      const response = await callApi("put", `${BASE_URL}/task/update`, {
        id,
        taskStatus,
      });
      dispatch({
        type: "UPDATE_TASK_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "UPDATE_TASK_REJECTED",
        payload: error.message || 'failed to update',
      });
    }
  };
};

export const removeTask = (id) => {
  return async (dispatch) => {
    dispatch({type:"DELETE_TASK_PENDING"})
    try{
      const response = await callApi("delete", `${BASE_URL}/task/remove`, {
        id,
      });
      dispatch({
        type: "DELETE_TASK_FULFILLED",
        payload: response,
      });
    }catch(error){
      dispatch({
        type: "DELETE_TASK_REJECTED",
        payload: error.message || 'failed to update',
      });
    }
  };
};
