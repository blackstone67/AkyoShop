import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
// import Paper from '@material-ui/core/Paper';
import TableProductHead from './TableProductHead/TableProductHead';
import TableProductBody from './TableProductBody/TableProductBody';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },

  tableContainer: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: 'rgb(43 52 69 / 10%) 0px 4px 16px',
    minWidth: '250px',

    '@media screen and (max-width: 800px)': {
      display: 'none',
    },
  },
});

export default function TableProduct({ dataTable }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableContainer className={classes.tableContainer}>
      <Table className={classes.table} aria-label="customized table">
        <TableProductHead />
        <TableProductBody dataTable={dataTable} />
        {dataTable.length === 0 && (
          <tbody>
            <tr>
              <td>
                <div
                  style={{
                    width: 'max-content',
                    padding: '1rem',
                    verticalAlign: 'middle',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <p style={{ marginRight: '0.5rem' }}>{t('titleEmpty')}</p>{' '}
                  <SentimentVeryDissatisfiedIcon />
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </TableContainer>
  );
}
