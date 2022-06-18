import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../../Components/UI/Copyright';
import BackDrop from '../../Components/UI/BackDrop/BackDrop';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

const ForgotPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const [forgot, setForgot] = useState(true);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [value, setValue] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmptyEmail, setErrorEmptyEmail] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const validateEmail = (email) => {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    };

    if (value === '') {
      setErrorEmptyEmail(true);
    } else if (!validateEmail(value)) setErrorEmail(true);

    if (validateEmail(value) && value !== '') {
      setOpenBackDrop(true);
      setTimeout(() => {
        axios.get(
          `https://huuhieu.site/api/Users/ForgotPassword?userEmail=${value}`
        );
        setErrorEmail(false);
        setErrorEmptyEmail(false);
        setOpenBackDrop(false);
        setValue('');
        setForgot(false);
      }, 1000);
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
          {forgot && (
            <Typography component="h1" variant="h5">
              Quên Mật Khẩu
            </Typography>
          )}
          {!forgot && (
            <Typography component="h1" variant="h5">
              Gởi Mật Khẩu Thành Công
            </Typography>
          )}
          {forgot && (
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Nhập địa chỉ Email"
                      name="email"
                      autoComplete="email"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        setErrorEmail(false);
                        setErrorEmptyEmail(false);
                      }}
                      error={errorEmail || errorEmptyEmail}
                      helperText={
                        (errorEmptyEmail && 'Bạn chưa nhập Email') ||
                        (errorEmail && 'Email không hợp lệ !!!')
                      }
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
                  Đổi mật khẩu
                </Button>
              </>
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  style={{ marginRight: '16px', cursor: 'pointer' }}
                  onClick={() => history.push('/register')}
                >
                  Đăng ký
                </Grid>
                <Grid
                  item
                  onClick={() => history.push('/login')}
                  style={{ cursor: 'pointer' }}
                >
                  Đăng nhập
                </Grid>
              </Grid>
            </form>
          )}
          {!forgot && (
            <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
              Chúng tôi đã gửi email xác nhận mật khẩu của bạn. Vui lòng kiểm
              tra tài khoảng email của bạn để nhận thông báo của chúng tôi
            </Typography>
          )}
          {!forgot && (
            <>
              <Button
                fullWidth="true"
                color="primary"
                variant="contained"
                style={{ margin: '16px 0' }}
              >
                Đăng Nhập Ngay
              </Button>
              <Button fullWidth="true" color="secondary" variant="outlined">
                Đăng ký
              </Button>
            </>
          )}
        </div>
        <Box mt={45}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default ForgotPassword;
