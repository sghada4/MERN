import React from "react";
import "./TodoList.css";
import { useState, useEffect } from "react";
import uuid from "react-uuid";

const TodoList = () => {
  const [listTasks, setListTasks] = useState([]);
  const [content, setContent] = useState("");
  const [isDone, setIsDone] = useState(false);
  //   const [newTask, setNewTask] = useState({ content, isDone: false });
  const addTasks = (e) => {
    e.preventDefault();
    // setNewTask({content,isDone:false})
    setListTasks([...listTasks, { content, isDone, id: uuid() }]);
    e.target.reset();
  };
  const deleteItem = (id) => {
    setListTasks(listTasks.filter((item) => item.id !== id));
  };
  useEffect(() => {}, []);
  return (
    <div className="main">
      <div className="form">
        <form onSubmit={addTasks}>
          <input
            type="text"
            placeholder="Enter your new Task"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
      <div className="tasks">
        {listTasks.map((task) => {
          return (
            <div className="task" key={task.id}>
              <p
                style={{
                  textDecoration: task.isDone ? "line-through" : "none"
                }}
              >
                {JSON.parse(JSON.stringify(task.content))}
              </p>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => {
                  setIsDone((task.isDone = !task.isDone));
                }}
              />
              <button onClick={() => deleteItem(task.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
