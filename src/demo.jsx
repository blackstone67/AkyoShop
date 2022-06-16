import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Cart from './Components/Cart/Cart';

export default function TemporaryDrawer(props) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>{'right'}</Button>
      <Drawer anchor={'right'} open={open} onClose={() => setOpen(false)}>
        <Cart />
      </Drawer>
    </React.Fragment>
  );
}
