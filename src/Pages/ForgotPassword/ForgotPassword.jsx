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
        axios.post(
          `https://backendfashionstore.azurewebsites.net/api/Users/ForgotPassword?userEmail=${value}`
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
              Qu??n M???t Kh???u
            </Typography>
          )}
          {!forgot && (
            <Typography component="h1" variant="h5">
              G???i M???t Kh???u Th??nh C??ng
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
                      label="Nh???p ?????a ch??? Email"
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
                        (errorEmptyEmail && 'B???n ch??a nh???p Email') ||
                        (errorEmail && 'Email kh??ng h???p l??? !!!')
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
                  ?????i m???t kh???u
                </Button>
              </>
              <Grid container justifyContent="flex-end">
                <Grid
                  item
                  style={{ marginRight: '16px', cursor: 'pointer' }}
                  onClick={() => history.push('/register')}
                >
                  ????ng k??
                </Grid>
                <Grid
                  item
                  onClick={() => history.push('/login')}
                  style={{ cursor: 'pointer' }}
                >
                  ????ng nh???p
                </Grid>
              </Grid>
            </form>
          )}
          {!forgot && (
            <Typography variant="subtitle1" style={{ marginTop: '16px' }}>
              Ch??ng t??i ???? g???i email x??c nh???n m???t kh???u c???a b???n. Vui l??ng ki???m
              tra t??i kho???ng email c???a b???n ????? nh???n th??ng b??o c???a ch??ng t??i
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
                ????ng Nh???p Ngay
              </Button>
              <Button fullWidth="true" color="secondary" variant="outlined">
                ????ng k??
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
