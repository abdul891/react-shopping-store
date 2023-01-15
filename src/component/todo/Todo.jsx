import React, {ReactDOM,useInsertionEffect,useState}from "react";
import { useEffect } from "react";

export default function Todo({allTodo, removeTodo, updateTodo, todo})
{
    const [isEdit, setEdit] = useState(false);
    const [task, setTask] = useState(todo.task)
    const handleclick =(id)=>{
        removeTodo(id);
    }
    const handleEdit = ()=>{
        setEdit(!isEdit);
    }
    const handleupdate = (e)=>{
        e.preventDefault();
        updateTodo(todo.id,task);
        setEdit(!isEdit);
    }
    if(isEdit)
    {
        return(
            <>
            <form onSubmit={handleupdate}>
                <input type="text" value={task} onChange={(e)=>{setTask(e.target.value)}}/>
                <input type="submit" value="save" />
                
            </form>
            </>
        )
    }
    else
    {
        return(
            <>
            
            <li key={todo.id}>{todo.task}
           
            <button onClick={handleEdit}>Edit</button><button onClick={()=> handleclick(todo.id)}>Delete</button>
                    </li>
             
          
            </>
        )
    }
    
}