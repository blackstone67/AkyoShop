import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsSelect } from '../../../store/selectSlice';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const SelectProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const valueSelect = useSelector((state) => state.select.valueSelect);

  const handleChange = (e) => {
    dispatch(ActionsSelect.onChange(e.target.value));
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">
        {t('order')}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={valueSelect}
        onChange={handleChange}
        label="Thứ tự"
      >
        <MenuItem value="nameDecrease">Tên A - Z</MenuItem>
        <MenuItem value="nameIncrease">Tên Z - A</MenuItem>
        <MenuItem value="priceDecrease">Giá Tăng Dần</MenuItem>
        <MenuItem value="priceIncrease">Giá Giảm Dần</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectProduct;
