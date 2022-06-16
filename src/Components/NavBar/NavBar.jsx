import {
  AppBar,
  Avatar,
  Badge,
  CssBaseline,
  makeStyles,
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

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  nameShop: {
    flexGrow: 1,
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
  const dispatch = useDispatch();
  const productCart = useSelector((state) => state.cart.productCart);
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
          <Avatar
            className={classes.icon}
            alt="user"
            src="https://images.unsplash.com/photo-1650662721083-867715246fbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3MXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
          />
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.icon}
          >
            Phuong Nam
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
