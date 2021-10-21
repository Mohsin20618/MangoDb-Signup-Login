import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import {

  Switch,
  Route,

} from "react-router-dom";
import { useHistory } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


function App() {
  let history = useHistory();
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color='secondary'>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
         
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Database
        </Typography>
        <Button color="inherit" onClick={()=>{history.push("/")}}>Dashboard</Button>
        <Button color="inherit" onClick={()=>{history.push("/Sign")}}>Signup</Button>
        <Button color="inherit" onClick={()=>{history.push("/Log")}}>Login</Button>
       
      </Toolbar>
    </AppBar>
  </Box>
  <Switch>
        <Route path="/Log">
          <Login/>
        </Route>

        <Route path="/Sign">
          <Signup/>
        </Route>

        <Route exact path="/">
          <Dashboard />
        </Route>

      </Switch>
  </>
  );
}

export default App;
