import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";import React from "react";
import { useState } from "react"
import {  validatePassword } from "../log-in/functions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword(){
    
    const Navigate = useNavigate() 
    const ls = localStorage.getItem("email")
    const [obj, setObg] = useState({
        email: ls ? JSON.parse(ls) : "",
        newPassword:''
})


    const changePassword =async ()=>{
        if (validatePassword(obj.newPassword)) {
            try {
              const response = await axios.put(
                "http://localhost:8008/api/users/changepassword",
                obj
              );
              console.log(response.data,'ddd');
              if (response.data.message == "Password changed successfully") { 
                     window.alert("סיסמא שונתה בהצלחה"); 
                     Navigate('/')  }

                else{
                    window.alert('try again');
                }
                      
            
            } catch (error) {
                 if(error.response.data.message == "user not found"){
                    window.alert("מייל לא קיים");
                }
              console.error("Error during Change password:", error);}
  } else window.alert(" סיסמא לא תקינה");
};


    return(
        <React.Fragment >
        <Dialog sx={{backgroundImage: 'url(https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%A9%D7%A7%D7%99%D7%A2%D7%94-%D7%A7%D7%9C%D7%90%D7%A1%D7%99%D7%AA-1.jpg)',
            backgroundSize: 'cover'}} open={true} >
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
            />
            <TextField
              onChange={(e) => {
                setObg((prevData) => ({
                  ...prevData,
                  newPassword: e.target.value,
                }));
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={changePassword}>Change password</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
}