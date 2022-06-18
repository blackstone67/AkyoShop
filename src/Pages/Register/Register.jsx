import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../Components/UI/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { actionsLogout } from '../../store/logoutSlice';
import { useHistory } from 'react-router-dom';
import BackDrop from '../../Components/UI/BackDrop/BackDrop';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Register() {
  const classes = useStyles();
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const fullName = useSelector((state) => state.logout.fullName);
  const email = useSelector((state) => state.logout.email);
  const password = useSelector((state) => state.logout.password);
  const errorEmptyFullName = useSelector(
    (state) => state.logout.errorEmptyFullName
  );
  const errorEmptyEmail = useSelector((state) => state.logout.errorEmptyEmail);
  const errorEmptyPassword = useSelector(
    (state) => state.logout.errorEmptyPassword
  );
  const errorFullName = useSelector((state) => state.logout.errorFullName);
  const errorEmail = useSelector((state) => state.logout.errorEmail);
  const errorPassword = useSelector((state) => state.logout.errorPassword);

  const dispatch = useDispatch();
  let history = useHistory();

  const fullNameChangeHandler = (item) => {
    dispatch(actionsLogout.fullNameChanged(item));
  };

  const emailChangeHandler = (item) => {
    dispatch(actionsLogout.emailChanged(item));
  };

  const passwordChangeHandler = (item) => {
    dispatch(actionsLogout.passwordChanged(item));
  };

  const handleOpen = () => {
    setOpenBackDrop(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const validateFullName = fullName.length > 6;

    const validateEmail = (email) => {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    };

    const validatePassword = password.length > 6;

    if (fullName === '') {
      dispatch(actionsLogout.setErrorEmptyFullName());
    } else if (!validateFullName) dispatch(actionsLogout.setErrorFullName());

    if (email === '') {
      dispatch(actionsLogout.setErrorEmptyEmail());
    } else if (!validateEmail(email)) dispatch(actionsLogout.setErrorEmail());

    if (password === '') {
      dispatch(actionsLogout.setErrorEmptyPassword());
    } else if (!validatePassword) {
      dispatch(actionsLogout.setErrorPassword());
    }

    if (
      validateFullName &&
      validateEmail(email) &&
      validatePassword &&
      fullName !== '' &&
      password !== '' &&
      email !== ''
    ) {
      handleOpen();
      setTimeout(() => {
        axios.post(
          `https://huuhieu.site/api/Users/Register?userName=${fullName}&userEmail=${email}&userPassword=${password}`,
          {
            userEmail: email,
            userName: fullName,
            userPassword: password,
          }
        );
        history.push('/login');
        dispatch(actionsLogout.clearLogout());
      }, 1500);
    }
  };

  return (
    <>
      <BackDrop classes={classes} openBackDrop={openBackDrop} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={errorFullName || errorEmptyFullName}
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và Tên"
                  name="fullName"
                  autoComplete="fname"
                  value={fullName}
                  onChange={(e) => fullNameChangeHandler(e.target.value)}
                  helperText={
                    (errorEmptyFullName && 'Bạn chưa nhập Họ và Tên') ||
                    (errorFullName && 'Họ và tên phải lớn hơn 6 kí tự')
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorEmptyEmail || errorEmail}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => emailChangeHandler(e.target.value)}
                  helperText={
                    (errorEmptyEmail && 'Bạn chưa nhập Email') ||
                    (errorEmail && 'Email không hợp lệ !!!')
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorPassword || errorEmptyPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => passwordChangeHandler(e.target.value)}
                  helperText={
                    (errorEmptyPassword && 'Bạn chưa nhập Mật khẩu') ||
                    (errorPassword && 'Mật khẩu phải lớn hơn 6 kí tự !!!')
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Tôi muốn nhận được thông tin các chương trình khuyến mãi và cập nhật trực tiếp qua email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Đăng ký
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
