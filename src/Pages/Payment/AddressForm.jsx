import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addressOrderActions } from '../../store/addressOrderSlice';
import { Button, makeStyles } from '@material-ui/core';
import BackDrop from '../../Components/UI/BackDrop/BackDrop';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function AddressForm(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const name = useSelector((state) => state.addressOrder.name);
  const number = useSelector((state) => state.addressOrder.number);
  const email = useSelector((state) => state.addressOrder.email);
  const address = useSelector((state) => state.addressOrder.address);
  const city = useSelector((state) => state.addressOrder.city);
  const isUserLogin = useSelector((state) => state.login.isUserLogin);

  const nameChangeHandler = (value) => {
    dispatch(addressOrderActions.nameChanged(value));
  };

  const numberChangeHandler = (value) => {
    dispatch(addressOrderActions.numberChanged(value));
  };

  const emailChangeHandler = (value) => {
    dispatch(addressOrderActions.emailChanged(value));
  };

  const addressChangeHandler = (value) => {
    dispatch(addressOrderActions.addressChanged(value));
  };

  const cityChangeHandler = (value) => {
    dispatch(addressOrderActions.cityChanged(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOpenBackDrop(true);

    setTimeout(() => {
      setOpenBackDrop(false);

      props.onNext();
    }, 1000);
  };

  return (
    <>
      <BackDrop classes={classes} openBackDrop={openBackDrop} />
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Địa chỉ giao hàng
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name="firstName"
              label="Họ và Tên"
              fullWidth
              value={name}
              onChange={(e) => nameChangeHandler(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name="telephone"
              label="Số điện thoại"
              value={number}
              onChange={(e) => numberChangeHandler(e.target.value)}
              fullWidth
            />
          </Grid>
          {!isUserLogin && (
            <Grid item xs={12} sm={12}>
              <TextField
                required
                name="gmail"
                label="Gmail"
                fullWidth
                value={email}
                onChange={(e) => emailChangeHandler(e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              required
              name="address1"
              label="Địa chỉ (số nhà tên đường)"
              value={address}
              onChange={(e) => addressChangeHandler(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name="address"
              label="Thành Phố / Quận / Huyện"
              value={city}
              onChange={(e) => cityChangeHandler(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Tiếp theo
          </Button>
        </div>
      </form>
    </>
  );
}
