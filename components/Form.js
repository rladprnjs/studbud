import React,{useState} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


// Form submit and create a data

const Form = ({setInputText,todos,setTodos,inputText,setStatus})=>{
//write more hava that links the functions here
const inputTextHandler =(e) =>{
  
  setInputText(e.target.value);
};
const submitTodoHandler =(e) =>{
  e.preventDefault();
  setTodos([
    ...todos, 
    {text: inputText, completed: false, id:(Math.random()*1000)+1} 
  ]);
  setInputText("");

};

const [alignment, setAlignment] = useState("");
//state that updates the all, completed, incomplete categories

const statusHandler =(e) =>{
  setStatus(e.target.value);

}
  return (
      <form>
      
    
      <TextField id="outlined-basic" label="Add" variant="outlined" input value={inputText} input onChange={inputTextHandler} type="text" className="todo-input"/>
        <Button onClick={submitTodoHandler} className="todo-button" variant="outlined" color="primary" type="submit">
       Submit
      </Button>
      <div className="select">
          <select onChange={statusHandler} name="todos" className="filter_todo" align={alignment}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>

    </form>
);
  };
 
export default Form;
