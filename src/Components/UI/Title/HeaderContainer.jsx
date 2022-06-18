import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Title from './Title';
import CachedTwoToneIcon from '@material-ui/icons/CachedTwoTone';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '@media screen and (max-width: 500px)': {
      flexDirection: 'column',
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(4),
  },
}));

export default function HeaderCategoryContainer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.tableHeader}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1598719830738-32b91fa649be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNleHklMjBncmlsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            className={classes.large}
          />
          <Title>{props.title}</Title>
        </div>
        <Button
          variant="contained"
          onClick={props.changePass}
          style={{
            boxShadow: 'none',
          }}
          color="primary"
        >
          <span style={{ height: '24px', paddingRight: '0.5rem' }}>
            <CachedTwoToneIcon />
          </span>
          <span style={{ height: '20px' }}>{props.buttonTitle}</span>
        </Button>
      </div>
    </React.Fragment>
  );
}
