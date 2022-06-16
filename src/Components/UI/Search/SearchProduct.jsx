/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { actionsSearch } from '../../../store/searchSlice';

export default function Search({ title }) {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.search.searchQuery);

  const onSearchChange = (e) => {
    dispatch(actionsSearch.valueSearchChanged(e.target.value));
  };

  return (
    <TextField
      label={'Tìm kiếm sản phẩm'}
      placeholder={'Tìm kiếm sản phẩm theo tên . . .'}
      fullWidth={true}
      style={{
        width: '300px',
      }}
      color="primary"
      type="text"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      multiline
      variant="outlined"
      value={searchQuery}
      onChange={(e) => onSearchChange(e)}
    />
  );
}
