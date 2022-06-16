import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../../Components/Footer/Footer';
import Search from '../../Components/UI/Search/SearchProduct';
import SelectProduct from '../../Components/UI/Select/SelectProduct';
import ListProduct from '../Home/ListProduct/ListProduct';
import _ from 'lodash';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
    height: '70vh',
  },
  cardContent: {
    flexGrow: 1,

    '& p': {
      cursor: 'pointer',
    },

    '& div': {
      '& p': {
        cursor: 'default',
      },
    },
  },
  textPrice: {
    textAlign: 'center',
    color: '#808080',
  },
  nameShop: {
    flexGrow: 1,
  },
  titleProduct: {
    textAlign: 'center',

    '& h1': {
      display: 'inline-block',
      borderBottom: '5px solid #3f51b5',
      marginBottom: '2rem',
    },
  },
  infoShop: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem',
  },
  NavHero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    margin: '16px 0',
    borderBottom: '1px solid #ccc',
    borderTop: '1px solid #ccc',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const AllProduct = () => {
  const classes = useStyles();
  const productHome = useSelector((state) => state.home.productHome);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const valueSelect = useSelector((state) => state.select.valueSelect);
  let filtered = productHome;

  if (searchQuery) {
    filtered = [...filtered].filter((item) =>
      item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  if (valueSelect === 'nameIncrease')
    filtered = _.orderBy(filtered, ['name'], ['asc']);
  else if (valueSelect === 'nameDecrease')
    filtered = _.orderBy(filtered, ['name'], ['desc']);
  else if (valueSelect === 'priceIncrease')
    filtered = _.orderBy(filtered, ['price'], ['asc']);
  else if (valueSelect === 'priceDecrease')
    filtered = _.orderBy(filtered, ['price'], ['desc']);

  return (
    <>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <section className={classes.NavHero}>
            <h1>Tất cả Sản phẩm</h1>
            <div className={classes.select}>
              <p>Ưu tiên theo: </p>
              <div className={classes.select}>
                <SelectProduct />
                <Search />
              </div>
            </div>
          </section>
          {productHome.length === 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Skeleton variant="rect" width={282} height={318} />
                <Typography component="div" variant={'h2'}>
                  <Skeleton />
                </Typography>
                <Skeleton />
              </div>
              <div>
                <Skeleton variant="rect" width={282} height={318} />
                <Typography component="div" variant={'h2'}>
                  <Skeleton />
                </Typography>
                <Skeleton />
              </div>
              <div>
                <Skeleton variant="rect" width={282} height={318} />
                <Typography component="div" variant={'h2'}>
                  <Skeleton />
                </Typography>
                <Skeleton />
              </div>
            </div>
          )}
          <ListProduct dataProduct={filtered} classes={classes} />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AllProduct;
