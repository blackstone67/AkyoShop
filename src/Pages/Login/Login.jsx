import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import BackDrop from '../../Components/UI/BackDrop/BackDrop';
import { useDispatch, useSelector } from 'react-redux';
import { actionsLogin } from '../../store/loginSlice';
import axios from 'axios';
import { actionsHome } from '../../store/homeSlice';
import { addressOrderActions } from '../../store/addressOrderSlice';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Akyo Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://binbadecor.com.vn/wp-content/uploads/2022/03/thiet-ke-shop-quan-ao-2.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  guest: {
    margin: theme.spacing(3, 0, 2),
    marginTop: 0,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Login = () => {
  const classes = useStyles();
  let history = useHistory();
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const errorEmptyEmail = useSelector((state) => state.login.errorEmptyEmail);
  const errorEmptyPassword = useSelector(
    (state) => state.login.errorEmptyPassword
  );
  const errorEmail = useSelector((state) => state.login.errorEmail);
  const errorPassword = useSelector((state) => state.login.errorPassword);

  const errorLogin = useSelector((state) => state.login.errorLogin);

  const handleOpen = () => {
    setOpenBackDrop(true);
  };

  const handleClose = () => {
    setOpenBackDrop(false);
  };

  const emailChangeHandler = (value) => {
    dispatch(actionsLogin.emailChanged(value));
  };

  const passwordChangeHandler = (value) => {
    dispatch(actionsLogin.passwordChanged(value));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    };

    const validatePassword = password.length > 6;

    if (email === '') {
      dispatch(actionsLogin.setErrorEmptyEmail());
    } else if (!validateEmail(email)) dispatch(actionsLogin.setErrorEmail());

    if (password === '') {
      dispatch(actionsLogin.setErrorEmptyPassword());
    } else if (!validatePassword) {
      dispatch(actionsLogin.setErrorPassword());
    }

    if (
      validateEmail(email) &&
      validatePassword &&
      email !== '' &&
      password !== ''
    ) {
      try {
        const response = await axios.get(
          `https://backendfashionstore.azurewebsites.net/api/Users/Login?email=${email}&password=${password}&rememberme=true`,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (response.status === 200) {
          dispatch(actionsLogin.setToken(response.data.token));

          const responseTest = await axios.get(
            `https://backendfashionstore.azurewebsites.net/api/Users`
          );

          let indexItem = responseTest.data.findIndex(
            (item) => item.email === email
          );

          dispatch(actionsLogin.setUserName(responseTest.data[indexItem].name));

          handleOpen();
          setTimeout(() => {
            if (history.location.pathname !== '/login')
              history.push(history.location.pathname);
            else history.push('/home');
            dispatch(actionsLogin.setIsUserLogin());
            dispatch(actionsLogin.clearLogin());
            dispatch(addressOrderActions.setEmailLogin(email));
            dispatch(actionsHome.setIsLogin());
          }, 500);
        }
      } catch (e) {
        handleOpen();
        setTimeout(() => {
          dispatch(actionsLogin.setErrorLogin());
          handleClose();
        }, 500);
      }
    }
  };

  return (
    <>
      <BackDrop classes={classes} openBackDrop={openBackDrop} />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={submitHandler}>
              <TextField
                error={errorEmail || errorEmptyEmail}
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => emailChangeHandler(e.target.value)}
                helperText={
                  (errorEmptyEmail && 'Bạn chưa nhập Email') ||
                  (errorEmail && 'Email không hợp lệ !!!')
                }
              />
              <TextField
                error={errorEmptyPassword || errorPassword}
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
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
              {errorLogin && (
                <p style={{ marginTop: '8px', color: 'red' }}>
                  Tài khoản không hợp lệ !!!
                </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Đăng nhập
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.guest}
                type="button"
                onClick={() => {
                  handleOpen();
                  setTimeout(() => {
                    if (history.location.pathname !== '/login')
                      history.push(history.location.pathname);
                    else history.push('/home');
                    dispatch(actionsLogin.clearLogin());
                    dispatch(actionsHome.setIsLogin());
                  }, 500);
                }}
              >
                Mua hàng không đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
