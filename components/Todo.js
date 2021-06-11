import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckIcon from '@material-ui/icons/Check';

const Todo =({text,setTodos, todo,todos}) =>{
//Add Events
    const deleteHandler =() =>{
    setTodos (todos.filter(el => el.id !== todo.id));
    //console log the element 
};
 
  const completeHandler = () => {
      setTodos(todos.map(item =>{
          if (item.id === todo.id){
              return{
                  ...item,completed: !item.completed
              };
          }
          return item;
      })
      );
  };
 


    return (
        <div className="todo">
            <li className=
            {`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
            <button onClick={completeHandler}className="complete-btn"><CheckIcon className="check"/></button>
            <button onClick={deleteHandler} className="trash-btn"><DeleteOutlineIcon className="trash"/></button>
        </div>

    );
}
export default Todo;
