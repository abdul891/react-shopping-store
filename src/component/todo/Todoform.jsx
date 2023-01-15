import React, {ReactDOM,useState}from "react";
import { useReducer } from "react";
import { useEffect } from "react";

export default function Todoform({task, createTodo})
{  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),{
        task: ""
    }
);
const handlechange = evt => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = { id: new Date().getTime(), task: userInput.task, completed: false };
    createTodo(newTodo);
    setUserInput({ task: "" });
  };
    return(
        <>
     <form className="NewTodoForm" onSubmit={handleSubmit}>
      
      <input
        onChange={handlechange}
        id="task"
        type="text"
        name="task"
        value={userInput.task}
        placeholder="New Todo"
        required
      />
      <button>Add Todo</button>
    </form>
        </>
    )
}