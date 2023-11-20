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
// import { useAppDispatch } from "../../app/hooks";
// import { setFlag, setName } from "../../app/flagSlice";
// import { fetchCartData } from "../../app/cartSlice";

export default function LogIn() {

  const Navigate = useNavigate()
  
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
//   const dispatch = useAppDispatch();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 7 &&
      password.length >= 7 &&
      (/[A-Z]/.test(password) || /[a-z]/.test(password)) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    Navigate("/singIn")
  };

  const handleLogIn = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const userData = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          // "http://localhost:8181/api/users/login",
          "https://api-store-f2id.onrender.com/api/users/login",
          userData
        );

        if (response.data) {
          const userName = response.data;
          if (userName !== "No user with this email in the database!" && userName !== "The email or password is incorrect!" && response.status < 400) {
            // dispatch(setName(userName));
            // dispatch(fetchCartData({ name: userName }));
          }
        }

      } catch (error) {
        console.error("Error during registration:", error);
        // dispatch(setFlag(true));
      }
      setOpen(false);
    } else if (validateEmail(email) && !validatePassword(password)) {
      window.alert("סיסמא לא תקינה");
    } else if (!validateEmail(email) && validatePassword(password)) {
      window.alert("מייל לא תקין");
    } else window.alert("מייל וסיסמא לא תקינים");
  };

  const handleRegistration = () => {
    // dispatch(setFlag(true));
    setOpen(false);
  };

  return (
    <React.Fragment >
      <Dialog sx={{backgroundImage: 'url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)',
          backgroundSize: 'cover'}} open={true} onClose={handleClose}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To log in, please enter your email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
              setPassword(e.target.value);
            }}
            value={password}
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
          <Button onClick={handleClose}>forget password</Button>
          <Button onClick={handleClose}>Sign up</Button>
          <Button onClick={handleRegistration}>log-in</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
