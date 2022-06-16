import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { actionsSize } from '../../../store/sizeSlice';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectSize() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const size = useSelector((state) => state.size.value);
  const { t } = useTranslation();

  const handleChange = (e) => {
    dispatch(actionsSize.sizeChanged(e.target.value));
  };

  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      fullWidth={true}
    >
      <InputLabel>{t('size')}</InputLabel>
      <Select value={size} onChange={handleChange} label="Age">
        <MenuItem value="S">S</MenuItem>
        <MenuItem value="M">M</MenuItem>
        {/* <MenuItem value="L">L</MenuItem> */}
      </Select>
    </FormControl>
  );
}
