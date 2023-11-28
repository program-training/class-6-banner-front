import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle"; import React from "react";
import { useState } from "react"
import { validatePassword, validateEmail } from "../log-in/functions";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_MY_SERVER;


export default function ForgetPassword() {

  const Navigate = useNavigate()
  const ls = localStorage.getItem("email")
  const [status ,setStatus] = useState()
  const [obj, setObg] = useState({
    email: ls ? JSON.parse(ls) : "",
    newPassword: ''
  })

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  

  const changePassword = async () => {
    setEmailError("");
    setPasswordError("");

    if (!obj.email) {
      setEmailError("Email is required");
      return;
    }

    if (!obj.newPassword) {
      setPasswordError("Password is required");
      return;
    }

    if (!validateEmail(obj.email)) {
      setEmailError("Invalid email");
    }

    if (!validatePassword(obj.newPassword)) {
      setPasswordError("Invalid password format");
      return;
    }

    try {
      const response = await axios.put(
        `${api}/api/users/changepassword`,
        obj
      );
      if (response.data.message == "Verification email sent. Please check your email to confirm password change.") {
        setStatus(response.data.message)
      }

      else {
        window.alert('try again');
      }
    } catch (error:unknown) {
      if(error instanceof AxiosError)
      if (error.response?.data.message == "User not found") {
        window.alert("משתמש לא קיים");
      } else {
        window.alert("משהו השתבש נסה שוב מאוחר יותר");
        console.error("Error during Change password:", error);
      }
    }
  }

  return (
    <React.Fragment >
      <Dialog sx={{
        backgroundImage: 'url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)',
        backgroundSize: 'cover'
      }} open={true} >
        <DialogTitle>forget password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            enter new password
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setObg((prevData) => ({
                ...prevData,
                email: e.target.value,
              }));
              setEmailError("");
            }}
            value={obj.email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            required
            error={Boolean(emailError)}
            helperText={emailError}
          />
          <TextField
            onChange={(e) => {
              setObg((prevData) => ({
                ...prevData,
                newPassword: e.target.value,
              }));
              setPasswordError("");
            }}
            value={obj.newPassword}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            required
            error={Boolean(passwordError)}
            helperText={passwordError}
          />
        </DialogContent>
        {status &&
        <DialogContentText sx={{ color: "green" }}>
               {status}
             </DialogContentText>}
        <DialogActions>
        <Button onClick={()=>Navigate('/')}> back </Button>
          <Button onClick={changePassword}>Change password</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}