import React, { useState } from 'react';
import clsx from 'clsx';
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
  makeStyles,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { EmployeeContact } from '../../../../../../../app/ITypes';
import ConfirmDialog from '../../../../../../../features/alert/dialog';
import { green } from '@material-ui/core/colors';
import { delEmployeeContact } from '../../../../../../../features/companies/companySlice';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {},
  actions : {
    maxWidth:'200px',
    width:'20%',
  },
  wrapper: {
     
    position: "relative"
  },
  buttonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
          backgroundColor: green[700]
      }
  },
  fabProgress: {
      color: green[500],
      position: "absolute",
      top: -6,
      left: 1,
      zIndex: 1
  },
  buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
  } 
}));

interface DataGridProps  {
  employeeId : string
  className? : string,
  contacts? : EmployeeContact[],
  loadingEmployee : boolean
  loadingEmployeeContact : boolean
}

type DialogInfoType = {
  id : string,
  open: boolean,
  type: string,
  value:string
}

const DataGrid = ({ className, contacts, employeeId, loadingEmployee, loadingEmployeeContact, ...rest } : DataGridProps) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(0);
  let { id } = useParams();
  const dispatch = useDispatch();

  // store selected item values to display id to delete
  const [dialogInfo, setConfirmOpen] = useState<DialogInfoType>({open:false, id: '', type : '', value: ''});

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const OnDelEmployeeContact = () => {

    const contactId = dialogInfo.id;
    setTimeout(() => {

        dispatch(delEmployeeContact(id, employeeId, contactId ));

    }, 400);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
      <ConfirmDialog
          title="Delete Address?"
          open={dialogInfo.open}
          setDialogOpen={setConfirmOpen}
          onConfirm= {OnDelEmployeeContact}
        >
          Are you sure you want to delete this address? 
          <p>{dialogInfo.type} : {dialogInfo.value}</p> 
        
        </ConfirmDialog>
        <Box >
          <Table>
            <TableHead >
              <TableRow>
                <TableCell width="20%">
                  Type
                </TableCell>
                <TableCell width="60%">
                  Value
                </TableCell>
                <TableCell width="20%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {loadingEmployeeContact ?
                (
                <TableRow >
                   <TableCell colSpan={6}>
                      <CircularProgress color="secondary" />
                    </TableCell>
                </TableRow> ) :
                (
                 contacts && contacts.length > 0 && contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((address, index) => (
                  <TableRow hover key={index}>
                    <TableCell width="20%">
                       {address.addressType}
                    </TableCell>
                    <TableCell width="60%">
                      {address.value}
                    </TableCell>
                    <TableCell className={classes.actions}>
                      <IconButton key={index} aria-label="delete" color="secondary" onClick={() => setConfirmOpen({open:true, id:address.id, type:address.addressType, value: address.value})}>
                        <DeleteIcon />
                      </IconButton>
                     
                    </TableCell>
                  </TableRow>))
              )}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={contacts ? contacts.length : 0}
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
