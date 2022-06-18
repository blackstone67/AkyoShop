import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../Components/Footer/Footer';
import Hero from './Hero/Hero';
import About from './About/About';
import ListProduct from './ListProduct/ListProduct';
import { useSelector } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button, Typography } from '@material-ui/core';
import Category from '../../Components/UI/Category/Category';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(8, 0, 6),
    color: 'white',
    height: '400px',

    '& h1': {
      backgroundColor: 'rgba(0,0,0, 0.3)',
    },
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
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
  loadMore: {
    marginTop: '1rem',
  },
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const productHome = useSelector((state) => state.home.productHome);
  const [loading, setLoading] = useState(false);
  const valueCategory = useSelector((state) => state.category.valueCategory);

  let filtered = productHome;

  if (valueCategory !== '') {
    filtered = productHome.filter((item) => item.category === +valueCategory);
  }

  useEffect(() => {
    if (valueCategory !== '') {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [valueCategory]);

  const handlerShowMore = () => {
    history.push('/all-product');
  };

  return (
    <React.Fragment>
      <main>
        <Hero classes={classes} />
        <Container className={classes.cardGrid} maxWidth="md">
          <About classes={classes} />
          <Category />
          {(filtered.length === 0 || loading) && (
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
          {!loading && (
            <>
              <ListProduct dataProduct={filtered} classes={classes} />
              <div className={classes.loadMore}>
                <Button
                  onClick={handlerShowMore}
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                >
                  {t('btnShowMore')}
                </Button>
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}
