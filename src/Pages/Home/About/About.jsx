import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const About = ({ classes }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.infoShop}>
        <Typography>{t('info1')}</Typography>
        <Typography>{t('info2')}</Typography>
        <Typography style={{ height: 'auto', width: '200px' }}>
          {t('info3')}
        </Typography>
      </div>

      <div className={classes.titleProduct}>
        <Typography component="h1" variant="h2" align="center" noWrap>
          {t('newFashion')}
        </Typography>
      </div>
    </>
  );
};

export default About;
