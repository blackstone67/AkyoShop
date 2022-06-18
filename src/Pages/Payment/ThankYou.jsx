import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const ThankYou = () => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        {t('thanksOrder')}
      </Typography>
      <Typography variant="subtitle1">{t('checkOrder')}</Typography>
      <Button
        fullWidth={true}
        variant="outlined"
        color="primary"
        style={{
          marginTop: '12px',
        }}
        onClick={() => history.push('/all-product')}
      >
        Tiếp tục mua hàng
      </Button>
    </React.Fragment>
  );
};

export default ThankYou;
