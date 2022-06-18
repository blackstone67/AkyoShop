import { Avatar, TableBody, TableCell, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import React from 'react';

const useStyles = makeStyles({
  imgSize: {
    width: '100px',
    height: '100px',
  },
  name: {
    minWidth: '140px',
  },
  amount: {
    minWidth: '105px',
  },
  category: {
    minWidth: '120px',
  },
  status: {
    minWidth: '115px',
  },
  backdrop: {
    zIndex: '2000',
    color: '#fff',
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: '#F7F8F8',
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TableProductBody = ({ dataTable }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <TableBody>
        {dataTable.map((item) => (
          <StyledTableRow key={item.id}>
            <StyledTableCell align="left">{item.stt}</StyledTableCell>
            <StyledTableCell
              align="left"
              component="th"
              scope="row"
              className={classes.name}
            >
              {item.name}
            </StyledTableCell>
            <StyledTableCell align="center">
              <Avatar
                variant="square"
                src={item.image}
                className={classes.imgSize}
              />
            </StyledTableCell>
            <StyledTableCell align="right" className={classes.amount}>
              {item.amount}
            </StyledTableCell>
            <StyledTableCell align="left" className={classes.category}>
              {item.category}
            </StyledTableCell>
            <StyledTableCell align="left" className={classes.status}>
              {item.status}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableProductBody;
