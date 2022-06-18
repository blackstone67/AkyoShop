import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { DATA_CATEGORY } from '../../../Data/category';
import { Skeleton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { actionsCategory } from '../../../store/categorySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,

    '&:hover': {
      boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;',
      cursor: 'pointer',
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  paperFocus: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#F50157',
    color: '#fff',

    '&:hover': {
      boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem;',
      cursor: 'pointer',
    },
  },
}));

export default function Category() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(DATA_CATEGORY);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, []);

  const clickCategoryHandler = (id) => {
    dispatch(actionsCategory.categoryChanged(id));
    const copyCategory = [...DATA_CATEGORY].map((item) => ({
      ...item,
      isFocused: false,
    }));
    const indexItem = copyCategory.findIndex((item) => item.id === id);
    copyCategory[indexItem].isFocused = true;
    setCategory(copyCategory);
  };

  return (
    <Grid container spacing={4}>
      {category.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Grid item xs={12} style={{ marginBottom: '16px' }}>
            {!loading && <Skeleton variant="rect" width={282} height={118} />}
            {loading && (
              <Paper
                className={`${
                  item.isFocused ? classes.paperFocus : classes.paper
                }`}
                onClick={() => clickCategoryHandler(item.id)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={item.url}
                    className={classes.large}
                  />
                </div>
                {item.name}
              </Paper>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
