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
import { validateEmail, validatePassword } from "./functions";

export default function LogIn() {
  const ls = localStorage.getItem("email")
  const Navigate = useNavigate()
  const [userData, setUserData] = React.useState({
    email: ls ? JSON.parse(ls) : "",
    password:'',
  });
 
  const handleLogIn = async () => {
    if (validateEmail(userData.email) && validatePassword(userData.password)) {
      console.log(userData);
      try {
        const response = await axios.post(
          "http://localhost:8008/api/users/login",
          userData
        );
        if (response.data) {        
          localStorage.setItem('username',JSON.stringify(response.data.message))
          Navigate('/userBanners')
        }
        
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else if (validateEmail(userData.email) && !validatePassword(userData.password)) {
      window.alert("סיסמא לא תקינה");
    } else if (!validateEmail(userData.email) && validatePassword(userData.password)) {
      window.alert("מייל לא תקין");
    } else window.alert("מייל וסיסמא לא תקינים");
  };

  const handleRegistration = () => {
    Navigate("/singIn")
  };

  const forgetPassword = () => {
    localStorage.setItem('email',JSON.stringify(userData.email))
    Navigate("/forgetPassword")
  };

  return (
    <React.Fragment >
      <Dialog sx={{backgroundImage: 'url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)',
          backgroundSize: 'cover'}} open={true} >
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To log in, please enter your email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setUserData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }));
            }}
            value={userData.email}
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
              setUserData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }));
            }}
            value={userData.password}
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={forgetPassword}>forget password</Button>
          <Button onClick={handleRegistration}>Sign up</Button>
          <Button onClick={handleLogIn}>log-in</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
