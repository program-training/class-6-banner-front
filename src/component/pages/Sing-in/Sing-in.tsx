import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function SignIn() {

  const Navigate = useNavigate()
  const [passwordVerification,setPasswordVerification] = React.useState('')
  const [user,setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    isAdmin:true
  })

  const handleRegistration = async () => {
    localStorage.setItem('email',JSON.stringify(user.email))

    if (
      user.password === passwordVerification &&
      user.password.length > 0 &&
      user.email.length > 0 &&
      user.username.length > 0
    ) {
      try {
        console.log(user);
        const response = await axios.post(
          "http://localhost:8008/api/users/register",
          user
        );
        if(response){
          Navigate("/")
        }
        }
      catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog  open={true}  >
        <DialogTitle>sing in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register please enter email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setUser((prevData) => ({
                ...prevData,
                username: e.target.value,
              }));
            }}
            value={user.username}
            autoFocus
            margin="dense"
            id="name"
            label="user name"
            type="name"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setUser((prevData) => ({
                ...prevData,
                email: e.target.value,
              }));
            }}
            value={user.email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setUser((prevData) => ({
                ...prevData,
                password: e.target.value,
              }));
            }}
            value={user.password}
            autoFocus
            margin="dense"
            id="password"
            label="Enter a password"
            type="password"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            onChange={(e) => {
              setPasswordVerification(e.target.value);
            }}
            value={passwordVerification}
            autoFocus
            margin="dense"
            id="password"
            label="Please confirm the password"
            type="password"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>console.log('goo')}>sing with google</Button>
          <Button onClick={handleRegistration}>Sign in</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
