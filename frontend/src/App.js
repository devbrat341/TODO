
import React, { useEffect } from "react";
import './App.css';
import {Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Layout from "./components/Layout"
import  TodoList from "./components/TodoList"
import { useSelector, useDispatch } from "react-redux";
import { getAllTask } from "./redux/action/taskActions";
import { getUser } from "./redux/action/userAction";
// import 


function App() {
  const userResponse = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getUser());
      dispatch(getAllTask());
    }
  }, [dispatch, token]);

  return (
    <>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={!(token && userResponse.user) ? <Login /> : <Layout />}
      >
      <Route index element={<TodoList />} />
      </Route>
      </Routes>
      
      </>
  );
}

export default App;
