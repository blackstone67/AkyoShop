import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Components/Footer/Footer';
import Search from '../../Components/UI/Search/SearchProduct';
import SelectProduct from '../../Components/UI/Select/SelectProduct';
import ListProduct from '../Home/ListProduct/ListProduct';
import _ from 'lodash';
import { Skeleton } from '@material-ui/lab';
import { actionsHome } from '../../store/homeSlice';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const productHome = useSelector((state) => state.home.productHome);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const valueSelect = useSelector((state) => state.select.valueSelect);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(actionsHome.setIsLogin());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery || valueSelect) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [searchQuery, valueSelect]);

  let filtered = productHome;

  if (searchQuery) {
    filtered = [...filtered].filter((item) =>
      item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  if (valueSelect === 'nameIncrease')
    filtered = _.orderBy(filtered, ['name'], ['desc']);
  else if (valueSelect === 'nameDecrease')
    filtered = _.orderBy(filtered, ['name'], ['asc']);
  else if (valueSelect === 'priceIncrease')
    filtered = _.orderBy(filtered, ['price'], ['desc']);
  else if (valueSelect === 'priceDecrease')
    filtered = _.orderBy(filtered, ['price'], ['asc']);

  return (
    <>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <section className={classes.NavHero}>
            <h1>{t('allProduct')}</h1>
            <div className={classes.select}>
              <p>{t('PrioritizeBy')} </p>
              <div className={classes.select}>
                <SelectProduct />
                <Search />
              </div>
            </div>
          </section>
          {(productHome.length === 0 || loading) && (
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
          {!loading && <ListProduct dataProduct={filtered} classes={classes} />}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default AllProduct;
