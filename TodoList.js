import React from 'react';
//import components
import Todo from './Todo';


const TodoList =({todos,setTodos,filteredTodos}) => {


    //display java hopefully
    return (
    <div className="todo container">
     <ul className="todo-list">

        {filteredTodos.map((todo) => (
            <Todo setTodos={setTodos} 
            todos={todos} 
            todo={todo}
            text={todo.text} 
            key={todo.id}/>
        ))}
     </ul>
  </div>
  );
};

export default TodoList;