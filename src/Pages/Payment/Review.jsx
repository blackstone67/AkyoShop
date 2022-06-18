import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import BackDrop from '../../Components/UI/BackDrop/BackDrop';
import { useState } from 'react';
import axios from 'axios';
import { addressOrderActions } from '../../store/addressOrderSlice';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
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

export default function Review(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const productCart = useSelector((state) => state.cart.productCart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const email = useSelector((state) => state.addressOrder.email);
  const number = useSelector((state) => state.addressOrder.number);
  const address = useSelector((state) => state.addressOrder.address);
  const city = useSelector((state) => state.addressOrder.city);
  const name = useSelector((state) => state.addressOrder.name);

  const nextHandler = () => {
    setOpenBackDrop(true);

    setTimeout(() => {
      let objProduct = {};
      for (let i = 0; i < productCart.length; i++) {
        objProduct[productCart[i].id] = productCart[i].quality;
      }

      axios.post(`https://backendfashionstore.azurewebsites.net/api/Orders`, {
        productWithQuantityData: objProduct,
        phoneNumberData: number,
        addressData: address,
        emailData: email,
      });
      setOpenBackDrop(false);
      dispatch(addressOrderActions.clearAddressOrder());

      props.onNext();
    }, 1500);
  };

  return (
    <>
      <BackDrop classes={classes} openBackDrop={openBackDrop} />
      <form>
        <Typography variant="h6" gutterBottom>
          Tóm tắt theo thứ tự
        </Typography>
        <List disablePadding>
          {productCart.map((product) => (
            <ListItem className={classes.listItem} key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`Giá gốc: ${product.price / 1000}.000đ, số lượng: ${
                  product.quality
                }`}
              />
              <Typography variant="body2">{`${
                (product.price / 1000) * product.quality
              }.000đ`}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Tổng" />
            <Typography variant="subtitle1" className={classes.total}>
              {totalAmount / 1000}.000đ
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Địa chỉ giao hàng
            </Typography>
            <Typography gutterBottom>{name}</Typography>
            <Typography gutterBottom>Địa chỉ : {address}</Typography>
            <Typography gutterBottom>Thành phố : {city}</Typography>
            <Typography gutterBottom>Số điện thoại : {number}</Typography>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button className={classes.button} onClick={() => props.onBack()}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={nextHandler}
          >
            Place order
          </Button>
        </div>
      </form>
    </>
  );
}
