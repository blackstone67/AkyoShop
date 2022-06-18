import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ChangePass({ openDialog, onClose }) {
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.login.token);

  const changedPasswordHandler = async () => {
    const response = await axios.post(
      `https://backendfashionstore.azurewebsites.net/api/Users/ChangePassword?userPassword=${password}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      onClose();
    }
  };

  return (
    <>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        onClose={onClose}
      >
        <DialogTitle id="customized-dialog-title">Đổi mật khẩu</DialogTitle>
        <DialogContent dividers>
          <TextField
            id="outlined-basic"
            label="Mật khẩu mới"
            variant="outlined"
            fullWidth={true}
            style={{
              marginBottom: '16px',
              width: '500px',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            onClick={() => changedPasswordHandler()}
          >
            Thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
