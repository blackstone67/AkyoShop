import { Button, TableBody, TableCell, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DialogOrder from '../../../DialogOrder/DialogOrder';

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
  const classes = useStyles();
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState([]);

  const openHandler = (id) => {
    setOpenDialog(true);
    const dataTemp = dataTable.findIndex((item) => item.id === id);
    setDataDialog(dataTable[dataTemp]);
  };

  const closeHandler = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <DialogOrder open={openDialog} onClose={closeHandler} data={dataDialog} />
      <TableBody>
        {dataTable.map((item, index) => (
          <StyledTableRow key={item.id}>
            <StyledTableCell align="left" className={classes.amount}>
              {t('nameOrder')} {index + 1}
            </StyledTableCell>
            <StyledTableCell align="left" className={classes.amount}>
              {item.products.length}
            </StyledTableCell>
            <StyledTableCell align="left" className={classes.category}>
              {item.products.reduce((acc, item) => acc + item.price, 0)}
            </StyledTableCell>
            <StyledTableCell align="center" className={classes.status}>
              <Button onClick={() => openHandler(item.id)}>
                <VisibilityIcon />
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TableProductBody;
