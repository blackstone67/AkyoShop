import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';

const BackDrop = (props) => {
  return (
    <Backdrop className={props.classes.backdrop} open={props.openBackDrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
