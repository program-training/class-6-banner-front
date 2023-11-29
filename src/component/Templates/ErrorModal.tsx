import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ErrorModalProps } from "../interface/interface";

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, errorMessage }) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle color="red">Error!</DialogTitle>
            <DialogContent>
                <DialogContentText color="red">{errorMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorModal;