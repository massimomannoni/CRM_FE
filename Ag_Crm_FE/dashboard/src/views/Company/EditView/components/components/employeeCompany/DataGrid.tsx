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
  Dialog,
  Collapse,
  Typography,
  Grid,
} from '@material-ui/core';
import { CompanyEmployee } from '../../../../../../app/ITypes';
import ConfirmDialog from '../../../../../../features/alert/dialog';
import { green } from '@material-ui/core/colors';
import { delCompanyEmployee } from '../../../../../../features/companies/companySlice';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EmployeeComtactView from './employeeContacts';

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

interface DataGridProps {
  className? : string,
  employees? : CompanyEmployee[],
  loading : boolean,
  loadingEmployee : boolean
  loadingEmployeeContact:boolean
}

type DialogInfoType = {
  id : string,
  open: boolean,
  type: string,
  value:string
}

type CollapseType = {
  id : string,
  open: boolean
}

const EmployeeDataGrid = ({ className, employees, loading, loadingEmployee, loadingEmployeeContact, ...rest } : DataGridProps) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(0);
  let { id } = useParams();
  const dispatch = useDispatch();

  // store selected item values to display id to delete
  const [dialogInfo, setDialogInfoOpen] = useState<DialogInfoType>({open:false, id: '', type : '', value: ''});
  const [openTableDetailContact, setTableAddContactOpen] = useState<CollapseType>({open:false, id:''});


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const OnDelEmployee = () => {

    const employeeId = dialogInfo.id;
    setTimeout(() => {

        dispatch(delCompanyEmployee(id, employeeId));

    }, 400);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>

      <ConfirmDialog
          title="Delete Contact?"
          open={dialogInfo.open}
          setDialogOpen={setDialogInfoOpen}
          onConfirm= {OnDelEmployee}
        >
          Are you sure you want to delete this contact? 
          <p>{dialogInfo.type} : {dialogInfo.value}</p> 
        
        </ConfirmDialog>
        <Box >
          <Table>
            <TableHead >
              <TableRow>
                <TableCell></TableCell>
                <TableCell width="30%">
                  Contact Type
                </TableCell>
                <TableCell width="30%">
                  Name
                </TableCell>
                <TableCell width="30%">
                  Surname
                </TableCell>
                <TableCell width="10%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {loadingEmployee ?
                (
                <TableRow >
                   <TableCell colSpan={6}>
                      <CircularProgress color="secondary" />
                    </TableCell>
                </TableRow> ) :
                ( employees && employees.length > 0 && employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
                  <React.Fragment key={index}>
                    <TableRow hover key={"Master_" + index}>
                      <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setTableAddContactOpen({open:(openTableDetailContact.id === employee.id) ? !openTableDetailContact.open : true, id:employee.id})}>
                          {openTableDetailContact.id == employee.id && openTableDetailContact.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell width="30%">
                        {employee.contactType}
                      </TableCell>
                      <TableCell width="30%">
                        {employee.name}
                      </TableCell>
                      <TableCell width="30%">
                        {employee.surname}
                      </TableCell>
                      <TableCell className={classes.actions} aria-label="add contact" >
                        <IconButton key={index} aria-label="delete" color="secondary" onClick={() => setDialogInfoOpen({open:true, id:employee.id, type:employee.name, value: employee.surname })}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow hover key={"Detail_" + index}>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={openTableDetailContact.id == employee.id && openTableDetailContact.open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <EmployeeComtactView employeeId={employee.id} contacts={employee.contacts} loadingEmployee={loadingEmployee} loadingEmployeeContact={loadingEmployeeContact}></EmployeeComtactView>
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                  </React.Fragment>))
              )}

            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={employees ? employees.length : 0}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default EmployeeDataGrid;



