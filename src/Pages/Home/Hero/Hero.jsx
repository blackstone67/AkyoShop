import { Button, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Hero = ({ classes }) => {
  const { t } = useTranslation();
  const isLogin = useSelector((state) => state.home.isLogin);

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h3" align="center">
          {t('titleSale')}
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justifyContent="center">
            {!isLogin && (
              <>
                <Grid item>
                  <Button variant="contained" color="primary" href="/login">
                    {t('login')}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" href="/register">
                    {t('logout')}
                  </Button>
                </Grid>
              </>
            )}
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                href="/all-product"
                fullWidth={true}
              >
                {t('searchProduct')}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
