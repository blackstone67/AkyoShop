import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClearIcon from '@material-ui/icons/Clear';
import { useTranslation } from 'react-i18next';

export default function DialogBuy(props) {
  const { t } = useTranslation();

  return (
    <div>
      <Dialog open={true} maxWidth="lg">
        <DialogTitle>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#0E4861',
            }}
          >
            <span>{t('delivery')}</span>
            <ClearIcon
              style={{ cursor: 'pointer' }}
              onClick={() => props.setDialogBuy(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{t('titleDelivery1')}</DialogContentText>
          <DialogContentText>{t('titleDelivery2')}</DialogContentText>
          <DialogContentText>{t('titleDelivery3')}</DialogContentText>
          <DialogContentText>{t('titleDelivery4')}</DialogContentText>
          <div
            style={{
              fontSize: '1.25em',
              marginBottom: '24px',
              color: '#0E4861',
            }}
          >
            <span>{t('lie')}</span>
          </div>

          <DialogContentText>{t('titleLie1')}</DialogContentText>
          <DialogContentText>{t('titleLie2')}</DialogContentText>
          <div
            style={{
              fontSize: '1.25em',
              marginBottom: '24px',
              color: '#0E4861',
            }}
          >
            <span>{t('mutual')}</span>
          </div>
          <DialogContentText>{t('titleMutual')}</DialogContentText>
          <DialogContentText>
            Email: akyoShop.shop2717@gmail.com
          </DialogContentText>
          <DialogContentText>
            {t('telephone')}: 01285460817 - 0866804578
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
