import React, {ReactDOM,useState}from "react";
import { useEffect } from "react";
import Todoform from "./Todoform";
import Todo from "./Todo";


export default function Todolist()
{ const [todos, setTodos] = useState([
    { id: new Date().getTime()+1, task: "task 1", completed: false },
    { id: new Date().getTime()+2, task: "task 2", completed: true }
]);
  const create = (newtodo)=>{
    console.log(newtodo);
    setTodos([...todos,newtodo]);
    
  }
  const remove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const toggleComplete = id=>{
    const complete = todos.map((todo)=>{
        if(todo.id === id)
        {
            return {...todo, completed:!todo.completed}
        }
    });
    setTodos(complete);

  }
  const update = (id,updateTask)=>{
    
    const updatedTodos = todos.map((todo)=>{
        if(todo.id === id)
        {
            return {...todo,task:updateTask};
        }
        return todo;
    });
    setTodos(updatedTodos);
  }
  let Todolists = todos.map((todo)=>{
    return <Todo todo={todo}  removeTodo={remove} complete={toggleComplete} updateTodo={update} />;
  })
    return(
<div className="TodoList">
    {/* <ul>{<Todo allTodo={todos} removeTodo={remove} complete={toggleComplete} updateTodo={update} />}</ul> */}
      
      <h1>
        Todo List <span>A simple React Todo List App</span>
        
      </h1>
      <Todoform createTodo={create}/>
      <ul>{Todolists}</ul>
    </div>
    )
}