import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../log-in/functions";
const api = import.meta.env.VITE_MY_SERVER;

export default function SignIn() {
  const Navigate = useNavigate();
  const [passwordVerification, setPasswordVerification] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    isAdmin: true,
  });
  const [errorMessages, setErrorMessages] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordVerification: "",
  });

  const handleRegistration = async () => {
    localStorage.setItem("email", JSON.stringify(user.email));

    const usernameError =
      user.username.length === 0 ? "Username is required" : "";
    const emailError = validateEmail(user.email) ? "" : "Invalid email format";
    const passwordError = validatePassword(user.password)
      ? ""
      : "Password must be at least 7 characters long, contain at least one lowercase letter, one uppercase letter, and one digit";
    const passwordVerificationError =
      user.password === passwordVerification
        ? ""
        : "Password verification does not match the password";

    setErrorMessages({
      username: usernameError,
      email: emailError,
      password: passwordError,
      passwordVerification: passwordVerificationError,
    });

    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !passwordVerificationError
    ) {
      try {
        const response = await axios.post(` ${api}/api/users/register`, user);
        if (response) {
          setSuccessMessage("Sign-up successful!");
          setIsSuccess(true);
          setTimeout(() => {
            Navigate("/");
          }, 2000);
        }
      } catch (error: any) {
        window.alert(error.response.data.message);
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{
          backgroundImage:
            "url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)",
          backgroundSize: "cover",
        }}
        open={true}
      >
        <DialogTitle>sign up</DialogTitle>
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
            error={Boolean(errorMessages.username)}
            helperText={errorMessages.username}
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
            error={Boolean(errorMessages.email)}
            helperText={errorMessages.email}
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
            error={Boolean(errorMessages.password)}
            helperText={errorMessages.password}
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
            error={Boolean(errorMessages.passwordVerification)}
            helperText={errorMessages.passwordVerification}
          />
          {isSuccess && (
             <div style={{ display: "flex", alignItems: "center" }}>
             <FontAwesomeIcon icon={faCheckCircle} style={{ color: "green", marginRight: "10px" }} />
             <DialogContentText sx={{ color: "green" }}>
               {successMessage}
             </DialogContentText>
           </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => Navigate("/")}> back </Button>
          <Button onClick={handleRegistration}>Sign in</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
