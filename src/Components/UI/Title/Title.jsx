import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography
      variant="h5"
      gutterBottom
      style={{
        minWidth: 'max-content',
        marginBottom: '8px',
        color: '#000',
      }}
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
