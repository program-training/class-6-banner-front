import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { ModalInterface } from "../interface/interface";

const Modal: React.FC<ModalInterface> = ({ open, message, onClose }) => {
    return (
    <Dialog open={open} onClose={onClose}>
        <DialogContent>
                <DialogContentText color="green">{message}</DialogContentText>
            </DialogContent>
        <DialogActions>
        <Button onClick={onClose}>Close</Button>
        </DialogActions>
    </Dialog>
    );
};

export default Modal;
