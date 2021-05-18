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
import { CompanyActivity } from '../../../../../../app/ITypes';
import ConfirmDialog from '../../../../../../features/alert/dialog';
import { green, red } from '@material-ui/core/colors';
import { delCompanyActivity } from '../../../../../../features/companies/companySlice';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

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

type DataGridProps = {
  className? : string,
  activities? : CompanyActivity[],
  loading : boolean,
  loadingActivity : boolean
}

type DialogInfoType = {
  id : string,
  open: boolean,
  type: string,
  value:string
}

const ActivityDataGrid = ({ className, activities, loading, loadingActivity, ...rest } : DataGridProps) => {
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
 
  const OnDelActivity = () => {

    const activityId = dialogInfo.id;
    setTimeout(() => {

        dispatch(delCompanyActivity(id, activityId));

    }, 400);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
      <ConfirmDialog
          title="Delete Activity?"
          open={dialogInfo.open}
          setDialogOpen={setConfirmOpen}
          onConfirm= {OnDelActivity}
        >
          Are you sure you want to delete this activity? 
          <p>{dialogInfo.type} : {dialogInfo.value}</p> 
        
        </ConfirmDialog>
        <Box >
          <Table>
            <TableHead >
              <TableRow>
                <TableCell width="40%">
                  Activity
                </TableCell>
                <TableCell width="40%">
                  Sector
                </TableCell>
                <TableCell width="10%">
                  Status
                </TableCell>
                <TableCell width="10%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {loadingActivity ?
                (
                <TableRow >
                   <TableCell colSpan={6}>
                      <CircularProgress color="secondary" />
                    </TableCell>
                </TableRow> ) :
                (
                  activities && activities.length > 0 && activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity, index) => (
                  <TableRow hover key={index}>
                    <TableCell width="40%">
                       {activity.activityType}
                    </TableCell>
                    <TableCell width="40%">
                       {activity.sectorType}
                    </TableCell>
                    <TableCell width="10%">
                     { activity.value ? (
                      <DoneIcon style={{ color: green[500] }}></DoneIcon>
                     ) : (
                      <ClearIcon style={{ color: red[500] }}></ClearIcon>
                     )}
                      
                    </TableCell>
                    <TableCell className={classes.actions}>
                      <IconButton key={index} aria-label="delete" color="secondary" onClick={() => setConfirmOpen({open:true, id:activity.id, type:activity.activityType, value: activity.sectorType})}>
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
        count={activities ? activities.length : 0}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default ActivityDataGrid;
