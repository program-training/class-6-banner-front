import * as React from "react";
// import{GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const api = import.meta.env.VITE_MY_SERVER;


export default function SignIn() {

  const Navigate = useNavigate()
  const [passwordVerification,setPasswordVerification] = React.useState('')
  const [user,setUser] = React.useState({
    username: "",
    email: "",
    password: "",
    isAdmin:true
  })

  // const handleGoogleSignInSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   console.log("Google Sign-In Success:", response);
  // };

  // const handleGoogleSignInFailure = (error:any) => {
  //   console.error("Google Sign-In Failure:", error);
  // };

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
        ` ${api}/api/users/register`,
          user
        );
        if(response){
          Navigate("/")
        }
        }
      catch (error:any) {
        window.alert(error.response.data.message)
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog sx={{backgroundImage: 'url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)',
          backgroundSize: 'cover'}} open={true}  >
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
        {/* <GoogleLogin
  clientId="83361752716-l79sdsffgft1hpf7pfsiqrr5pki7d4de.apps.googleusercontent.com"
  buttonText="Sign in with Google"
  onSuccess={handleGoogleSignInSuccess}
  onFailure={handleGoogleSignInFailure}
  cookiePolicy={'single_host_origin'} */}
{/* /> */}
          <Button onClick={handleRegistration}>Sign in</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
