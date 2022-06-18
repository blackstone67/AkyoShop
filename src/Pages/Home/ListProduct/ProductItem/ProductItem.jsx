import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionsCart } from '../../../../store/cartSlice';
import { useTranslation } from 'react-i18next';

const ProductItem = ({ classes, card }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const addToCartHandler = () => {
    dispatch(actionsCart.openCart());
    dispatch(
      actionsCart.addCart({
        id: card.id,
        sizeM: 'M',
        name: card.name,
        price: card.price,
        image: card.images[0].url,
      })
    );
  };

  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        {card.images[0].url.indexOf('image') !== -1 ? (
          <CardMedia
            className={classes.cardMedia}
            image={`https://backendfashionstore.azurewebsites.net/api/ImageUploads/${card.images[0].url}`}
            title="Image title"
            onClick={() => {
              history.push(`/product/${card.id}`);
            }}
          />
        ) : (
          <CardMedia
            className={classes.cardMedia}
            image={`https:${card.images[0].url}`}
            title="Image title"
            onClick={() => {
              history.push(`/product/${card.id}`);
            }}
          />
        )}

        <CardContent className={classes.cardContent}>
          <Typography
            onClick={() => {
              history.push(`/product/${card.id}`);
            }}
          >
            {card.name}
          </Typography>
          <div className={classes.textPrice}>
            <Typography>{card.price / 1000}.000đ</Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            fullWidth={true}
            onClick={addToCartHandler}
          >
            {t('addButtonCart')}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;
