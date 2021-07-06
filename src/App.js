
//used Material UI for basic structure as normal html css was unresponsive 
//developedByEd (2020. 8. 28.).Build A Todo App With REACT | React Project For Beginners (FULL). : https://www.youtube.com/watch?v=pCA4qpQDZD8&list=WL&index=20
//Emojipedia for small icons https://emojipedia.org/memo/
//html & css taken from tutorial 
//Pomodoro Timer doesn't transition to break 
//Landon Schlangen.2020. 10. 21.Build a 25 + 5 clock | FreeCodeCamp. https://www.youtube.com/watch?v=8khA0nJzh8A&t=372s
//React Kanban board tutorials
//techtutorialalsx.2020.10.25.React Kanban Board https://techtutorialsx.com/2020/10/25/react-kanban-board/
//Referenced lourenci's demo.29.10.2020. https://github.com/lourenci/react-kanban#-shape-of-a-board
//Sign Up sheet demo
//Chad Murobayashi.(12/06/21).Create a Signup Page with React and Material-UI.https://levelup.gitconnected.com/create-a-signup-page-with-react-and-material-ui-9b203d18cf3f
import './App.css';
import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grid from '@material-ui/core/Grid';
//signup board
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';



import { createMuiTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AutorenewIcon from '@material-ui/icons/Autorenew';
//import components
import Form from './components/Form';
import TodoList from './components/TodoList';
//kanban board
import ReactDOM from "react-dom";
import Board, {  addCard,moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
//declare theme


const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#0a71b6',
      },
      secondary: {
        main: '#f50057',
      }
    },
  }
);

theme.spacing(2) // = 8 * 2
//start tabbar functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',

    alignItems: 'center',
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
 
  container: {
    backgroundColor: "primary",
  },
  paper: {
    borderRadius: "15px",
    height: "800px"
  }
}));
//kanban
const board = {
  columns: [
    {
      id: 1,
      title: "To-Do",
      cards: [
        {
          id: 1,
          title: "Write post",
          description: "Write a new post for blog."
        },
        {
          id: 2,
          title: "Cook dinner",
          description: "Cook an awesome dinner."
        }
      ]
    },
    {
      id: 2,
      title: "In progress",
      cards: [
        {
          id: 3,
          title: "Finish Assignment",
          description: "Finish Assignment"
        }
      ]
    },
    {
      id: 3,
      title: "Done",
      cards: [
        {
          id: 3,
          title: "Sign up for 10 jobs",
          description: "Resumes sent in this week"
        }
      ]
    },
    {
      id: 4,
      title: "Fixed",
      cards: [
        {
          id: 5,
          title: "Fix car",
          description: "Fix my car problem"
        }
      ]
    },
  ]
}
function MyBoard(){
  const [board, setBoard] = useState(board);
  const addCard = (e) => {
    const newBoard = addCard(board, { id: 1 },  { 
      id: 2,
      title: "dfdfdfdff",
      description: "SDfsfsf"
    });
    setBoard({...newBoard});
  };
}
function onCardNew (newCard) {
  
  return newCard
}

function App() {
//Align stuff
const [alignment, setAlignment] = useState("");

  //stating everything
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [value, setValue] = React.useState(0);
  const [status,setStatus] = useState ('all');
  const [filteredTodos,setFilteredTodos] = useState([]);
  //time use state
  const [displayTime,setDisplayTime] = React.useState (25*60); //25 minutes
  const [breakTime,setBreakTime] = React.useState (5*60); //5 min
  const [sessionTime,setSessionTime] = React.useState (25*60); //25 min
  const [timerOn,setTimerOn] = React.useState(false);
  const [onBreak,setOnBreak] = React.useState(false);
  //break get audio file- doesn't work
  const [breakAudio,setBreakAudio] =React.useState(
    new Audio("./components/breakTime.mp3")
    );
   //handleClose function didn't apply
      const classes = useStyles();
    //declare sign up sheet
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  

    const handleSubmit = e => {
      e.preventDefault();
      console.log(firstName, lastName, email, password);
      
    };
  
//use effect run only once 
useEffect (() => {
  getLocalTodos();
}, []);
//filter todos
useEffect (() => {
  const filterHandler =() =>{
    switch (status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true ));
        break; 
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break; 
      default:
        setFilteredTodos(todos);
        break;  
    }
  };
  filterHandler();
  }, [todos,status]);



//starting the functions and events
//local storage - stay after refresh which doesn't work..
  const saveLocalTodos =() =>{
      localStorage.setItem("todos",JSON.stringify(todos));
    
  };
  const getLocalTodos =() =>{
    if (localStorage.getItem("todos") ===null){
      localStorage.setItem("todos",JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal);
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  

 
  //set time
  const formatTime = (time) =>{
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return ( 
      (minutes <10 ? "0" + minutes:minutes) + 
    ":" +
    (seconds <10 ? "0" + seconds:seconds) 
    );
  };
  const changeTime = (amount,type) =>{
    
    if(type == 'break'){
      if (breakTime<=60 && amount <0){
        return;
      }
      setBreakTime((prev) =>prev + amount);
    }
    else{
      if (sessionTime<=60 && amount <0){
        return;
      }
      setSessionTime((prev)=>prev +amount);
      if (!timerOn){
        setDisplayTime(sessionTime + amount);
      }

    }
  }
  //start the timer
  const controlTime =() =>{
    let second = 1000; 
    let date = new Date().getTime();
    let nextDate = new Date ().getTime() + second;
    let onBreakVariable = onBreak;

  if (!timerOn){
    let interval = setInterval(()=>{
        date = new Date().getTime();
          if (date > nextDate){
            setDisplayTime((prev)=>{
              if (prev <= 0 && !onBreakVariable){
                onBreakVariable= true;
                setOnBreak(true);
                return breakTime;
              }else if (prev<= 0 && onBreakVariable){
                onBreakVariable= false;
                setOnBreak(false);
                return sessionTime;
              }
              return prev -1;
            
            });
            nextDate += second;
          }
    },30);
    localStorage.clear();
    localStorage.setItem("interval-id",interval);
  };
  //pause timer
  if (timerOn){
    clearInterval(localStorage.getItem("interval-id"));
  }
  setTimerOn(!timerOn);
  };
  const resetTime =() =>{
    setDisplayTime(25*60);
    setBreakTime(5*60);
    setSessionTime(25*60);
  };
  //sign up template from material ui
  return (
    <Container className={classes.container} maxWidth>
      <Paper className={classes.paper}>
      <AppBar position="static">
 
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Typography variant="h2" gutterBottom>
       StudBud
      </Typography>

          <Tab label="Task List" {...a11yProps(0)} />
          <Tab label="Library"  {...a11yProps(1)} />
         
          
      <Tab label="Music" {...a11yProps(2)} />
        
          
        </Tabs>
      
      </AppBar>

      <TabPanel value={value} index={0}>
       <h3> Create an Account </h3>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
           
          </Grid>
          <div>
          <Button variant="contained">
      Cancel
    </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >

            Sign Up
          </Button>
         
         
          </div>
        </form>
     
      </div>
      </Container>

      </TabPanel>
      <TabPanel value={value} index={1}>
      <h3>📝 Todo List</h3>
      
      <Board 
      allowRemoveCard
      allowAddCard={{ on: 'top' }}
      onNewCardConfirm={onCardNew}
      addCardOn={{on:"bottom"}}
      onCardNew={console.log}
      initialBoard={board}
      onCardRemove={console.log}
      allowRemoveCard
      disableColumnDrag/>
     
      
    
     
    
      </TabPanel>
      <TabPanel value={value} index={2}>
      <h3>📚 Reading List </h3>  
     <h4>Title- Author</h4>
      <Form 
      inputText={inputText}
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText}
      setStatus={setStatus}
        filteredTodos={filteredTodos}/>
      
      <TodoList setTodos={setTodos} todos={todos}
      filteredTodos={filteredTodos}/>

  
    
      </TabPanel>
      <TabPanel value={value} index={3}>
      
   <h3>🎵 Player</h3>   
   <Grid container justify="space-around">
    <div className={classes.root}>
   
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Spring 🌱</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div class="music"> <script src="https://sdk.scdn.co/spotify-player.js"></script>
  <iframe src="https://open.spotify.com/embed/playlist/2aRmaIGNx2dAHDMRgCl1MC" 
  width="280" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Classical Chill House 🎻</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <iframe src="https://open.spotify.com/embed/playlist/1rdwRP70e6f3eyeTdOgJsJ" 
  width="280" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Morning Acoustics 🌅</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <iframe src="https://open.spotify.com/embed/playlist/061M9fvS9sznXEt8Zrdn54" width="280" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    
  
    




  <div className="dual-container">
  <h3>⏳ Pomodoro Timer </h3>
     <Length 
     title={"Break"} 
     changeTime={changeTime} 
     type={"break"} 
     time={breakTime} 
     formatTime={formatTime}/>
    <Length 
     title={"Session"} 
     changeTime={changeTime} 
     type={"session"} 
     time={sessionTime} 
     formatTime={formatTime}/>
    
   </div>
   <h3>{onBreak ? "Break" :"Session"}</h3>
   <h1>{formatTime(displayTime)}</h1>
   <button className="btn-large" onClick={controlTime}>
     {timerOn ?(
       <PauseCircleFilledIcon/>
     ):(
      <PlayCircleFilledIcon/>
     )
     }
   </button>
   <button className="btn-large" onClick={resetTime}>
<AutorenewIcon/>
   </button>
   
   </Grid>
      </TabPanel>      
      </Paper>
    </Container>
  );
}


//timer function
function Length({title,changeTime,type,time,formatTime}) {
return (
  <div>
    <h3>{title}</h3>
    <div className="time-sets">
      <button className="btn-small"
      onClick={()=> changeTime(-60, type)}>
     <ArrowDownwardIcon style={{ color: "primary" }}/>

      </button>
      <h3>{formatTime(time)}</h3>
      <button className="btn-small blue"
      onClick={()=> changeTime(60, type)}>
     <ArrowUpwardIcon style={{ color: "primary" }}/>
      </button>
    </div>
    </div>

);
}
 


export default App;
