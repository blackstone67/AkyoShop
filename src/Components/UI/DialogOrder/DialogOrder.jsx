import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

export default function DialogOrder({ open, onClose, data }) {
  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Chi tiết đơn hàng
        </DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography gutterBottom>TÊN SẢN PHẨM</Typography>
            <Typography gutterBottom>TỔNG TIỀN</Typography>
          </div>
          {data.products &&
            data.products.map((item) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
                key={item.id}
              >
                <div>
                  <Typography
                    gutterBottom
                    style={{
                      marginRight: '64px',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <div>
                    <span>{item.price / 1000}.000đ x 1</span>
                  </div>
                </div>

                <Typography>{item.price / 1000}.000đ</Typography>
              </div>
            ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={onClose}>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
