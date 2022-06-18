import {
  AppBar,
  Avatar,
  Badge,
  Button,
  CssBaseline,
  Grid,
  makeStyles,
  withStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { useDispatch, useSelector } from 'react-redux';
import { actionsCart } from '../../store/cartSlice';
import { useHistory } from 'react-router-dom';
import SelectLanguage from '../UI/Select/SelectLanguage';
import { useTranslation } from 'react-i18next';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  iconAvatar: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  nameShop: {
    cursor: 'pointer',
    marginTop: '10px',
  },
  cart: {
    cursor: 'pointer',
  },
  appBar: {
    position: 'sticky',
    top: '0',
    zIndex: '100',

    '& svg': {
      cursor: 'pointer',
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.cart.productCart);
  const isUserLogin = useSelector((state) => state.login.isUserLogin);
  const userName = useSelector((state) => state.login.userName);
  let history = useHistory();

  const qualityProduct = productCart.reduce((acc, item) => {
    return acc + item.quality;
  }, 0);

  return (
    <div className={classes.appBar}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LocalMallIcon
            className={classes.icon}
            onClick={() => history.push('/home')}
          />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.nameShop}
            onClick={() => history.push('/home')}
          >
            Akyo Shop
          </Typography>
          <div style={{ flex: 1 }}></div>
          {!isUserLogin && (
            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              alignItem="center"
              style={{ width: 'auto' }}
            >
              <Grid item>
                <Button variant="contained" color="secondary" href="/login">
                  {t('login')}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" href="/register">
                  {t('logout')}
                </Button>
              </Grid>
            </Grid>
          )}

          <FavoriteIcon fontSize="large" className={classes.icon} />
          <Badge
            badgeContent={qualityProduct}
            color="secondary"
            overlap="rectangular"
            onClick={() => dispatch(actionsCart.openCart())}
          >
            <ShoppingCartIcon fontSize="large" className={classes.cart} />
          </Badge>
          <SelectLanguage />
          {isUserLogin && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
              >
                <Avatar
                  className={classes.iconAvatar}
                  alt="user"
                  src="https://images.unsplash.com/photo-1650662721083-867715246fbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                  onClick={() => history.push('/user')}
                />
              </StyledBadge>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                className={classes.iconv2}
              >
                {userName}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
