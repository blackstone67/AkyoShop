import { Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import LayoutContainer from '../../Components/Layout/LayoutContainer';
import SearchAdmin from '../../Components/UI/SearchAdmin/SearchAdmin';
import TableProduct from '../../Components/UI/Table/TableProduct/TableProduct';
import HeaderCategoryContainer from '../../Components/UI/Title/HeaderContainer';
import { DUMMY_PRODUCT } from '../../Data/DataTableProduct';
import Title from '../../Components/UI/Title/Title';
import ChangePass from '../../Components/UI/DiaLog/ChangePass';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    backgroundImage:
      'url(https://images.unsplash.com/photo-1648492694364-26cf4b39806b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

const Admin = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const userName = useSelector((state) => state.login.userName);
  const [openDialog, setOpenDialog] = useState(false);

  const changePassHandler = () => {
    setOpenDialog(true);
  };

  const closeHandler = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ChangePass openDialog={openDialog} onClose={closeHandler} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth={false} className={classes.container}>
          <HeaderCategoryContainer
            changePass={changePassHandler}
            title={userName}
            buttonTitle={t('changePass')}
          />
        </Container>
        <LayoutContainer classes={classes}>
          <Title>{t('listOrder')}</Title>
        </LayoutContainer>
        <LayoutContainer classes={classes}>
          <SearchAdmin title={t('titleSearchProduct')} />
        </LayoutContainer>
        <LayoutContainer classes={classes}>
          <TableProduct dataTable={DUMMY_PRODUCT} />
        </LayoutContainer>
      </main>
    </>
  );
};

export default Admin;
