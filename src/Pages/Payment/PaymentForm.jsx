import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm() {
  const [shipCod, setShipCod] = useState(false);
  const [checkboxCod, setCheckboxCod] = useState(false);

  useEffect(() => {
    if (checkboxCod) {
      setShipCod(true);
    } else {
      setShipCod(false);
    }
  }, [checkboxCod]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Phương thức thanh toán
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Tên trên thẻ"
            fullWidth
            autoComplete="cc-name"
            disabled={shipCod}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Số thẻ"
            fullWidth
            autoComplete="cc-number"
            disabled={shipCod}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="expDate"
            label="Ngày hết hạn"
            fullWidth
            autoComplete="cc-exp"
            disabled={shipCod}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveCard"
                checked={checkboxCod}
                onChange={(e) => setCheckboxCod(e.currentTarget.checked)}
              />
            }
            label="Thanh toán khi nhận hàng"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
