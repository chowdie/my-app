import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinkUi from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import fire from './Firebase/fire';
import Login from './Login/Login';
import Homepage from './Homepage/Homepage';
import PlacedOrders from './PlacedOrders/PlacedOrders'
import AcceptedOrders from './AcceptedOrders/AcceptedOrders'
import FinishedOrders from './FinishedOrders/FinishedOrders'
import NewOrder from './NewOrder/NewOrder'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"



export default function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);



  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setEmailError('');
  };



  return (
  //  <div className='App'>
    //   {user ? (
    //     <Hero handleLogout={handleLogout} />
    //   ) : (
    //   <Login
    //     email = {email}
    //     setEmail = {setEmail}
    //     password = {password}
    //     setPassword = {setPassword}
    //     handleLogin = {handleLogin}
    //     handleSignUp = {handleSignUp}
    //     hasAccount = {hasAccount}
    //     setHasAccount = {setHasAccount}
    //     emailError = {emailError}
    //     passwordError = {passwordError}
    //   />
    // )}
    <Router>
            <Switch>
              <Route path="/PlacedOrders"> <PlacedOrders/>  </Route>
              <Route path="/AcceptedOrders"> <AcceptedOrders/> </Route>
              <Route path="/FinishedOrders"> <FinishedOrders/> </Route>
              <Route path="/homepage"> <Homepage/> </Route>
              <Route path="/Login"> <Login/> </Route>
              <Route path="/"> <NewOrder/> </Route>

            </Switch>
    </Router>

  //   </div>


  );
}
