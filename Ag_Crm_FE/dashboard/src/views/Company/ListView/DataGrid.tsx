import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  LinearProgress,
  makeStyles,
  Button
} from '@material-ui/core';
import { Company } from '../../../app/ITypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCompany } from '../../../features/companies/companySlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  actions : {
    maxWidth:'200px',
    width:'12%'
  }
}));

interface IDataGridProps {
  className? : string,
  companies : Company[],
  loading : boolean
}

const DataGrid = ({ className, companies, loading, ...rest } : IDataGridProps) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box >
          <Table>
            <TableHead >
              <TableRow>
                <TableCell width="33%">
                  Name
                </TableCell>
                <TableCell width="10%">
                  P.Iva
                </TableCell>
                <TableCell width="28%">
                  Indirizzo
                </TableCell>
                <TableCell width="5%">
                  Tipo
                </TableCell>
                <TableCell width="10%">
                  Iscrizione
                </TableCell>
                <TableCell width="4%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {loading ?
                (
                <TableRow >
                   <TableCell colSpan={6}>
                      <LinearProgress color="secondary" />
                    </TableCell>
                </TableRow> ) :
                (
                 companies.length > 0 && companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
                  <TableRow hover key={company.id}>
                    <TableCell width="35%">
                       {company.name}
                    </TableCell>
                    <TableCell width="10%">
                      {company.fiscalCode}
                    </TableCell>
                    <TableCell width="20%">
                      {`${company.city}, ${company.address}, ${company.cap}`}
                    </TableCell>
                    <TableCell width="5%">
                      {company.subScriptionType}
                    </TableCell>
                    <TableCell  width="10%">
                      {moment(company.subScriptionDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell className={classes.actions}>
                      <Button color="primary" onClick={() => navigate(`../company/${company.id}`, { replace: true })}>Edit</Button>
                      <Button color="secondary" onClick={() => dispatch(removeCompany(company.id))} >Delete</Button>
                    </TableCell>
                  </TableRow>))
              )}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={companies.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default DataGrid;
