import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
import BackDrop from '../../../Components/UI/BackDrop/BackDrop';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Hero = ({ classes }) => {
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const classesBackDrop = useStyles();
  const { t } = useTranslation();
  // const isUserLogin = useSelector((state) => state.login.isUserLogin);
  const history = useHistory();

  return (
    <>
      <BackDrop classes={classesBackDrop} openBackDrop={openBackDrop} />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h3" align="center">
            {t('titleSale')}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setOpenBackDrop(true);

                    setTimeout(() => {
                      setOpenBackDrop(false);

                      history.push('/all-product');
                    }, 1000);
                  }}
                  fullWidth={true}
                >
                  {t('searchProduct')}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;
