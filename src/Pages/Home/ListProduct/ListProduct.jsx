import { Grid } from '@material-ui/core';
import React from 'react';
import ProductItem from './ProductItem/ProductItem';

const ListProduct = ({ dataProduct, classes }) => {
  return (
    <Grid container spacing={4}>
      {dataProduct.length > 0 &&
        dataProduct.map((card) => (
          <ProductItem classes={classes} card={card} key={card.id} />
        ))}
    </Grid>
  );
};

export default ListProduct;
