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

} from '@material-ui/core';
import {  CompanyDimension } from '../../../../../../app/ITypes';
import ConfirmDialog from '../../../../../../features/alert/dialog';
import { green, red } from '@material-ui/core/colors';
import {  delCompanyDimension } from '../../../../../../features/companies/companySlice';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
  dimensions? : CompanyDimension[],
  loading : boolean,
  loadingDimension : boolean
}

type DialogInfoType = {
  id : string,
  open: boolean,
  type: string,
  value?:number
}

const DimensionDataGrid = ({ className, dimensions, loading, loadingDimension, ...rest } : DataGridProps) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(0);
  let { id } = useParams();
  const dispatch = useDispatch();

  // store selected item values to display id to delete
  const [dialogInfo, setConfirmOpen] = useState<DialogInfoType>({open:false, id: '', type : '', value: 0});

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const OnDelDimension = () => {

    const dimensionId = dialogInfo.id;
    setTimeout(() => {

        dispatch(delCompanyDimension(id, dimensionId));

    }, 400);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
      <ConfirmDialog
          title="Delete Dimension?"
          open={dialogInfo.open}
          setDialogOpen={setConfirmOpen}
          onConfirm= {OnDelDimension}
        >
          Are you sure you want to delete this activity? 
          <p>{dialogInfo.type} : {dialogInfo.value}</p> 
        
        </ConfirmDialog>
        <Box >
          <Table>
            <TableHead >
              <TableRow>
                <TableCell width="60%">
                  DImension
                </TableCell>
                <TableCell width="30%">
                  Fee
                </TableCell>
                <TableCell width="10%" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {loadingDimension ?
                (
                <TableRow >
                   <TableCell colSpan={6}>
                      <CircularProgress color="secondary" />
                    </TableCell>
                </TableRow> ) :
                (
                  dimensions && dimensions.length > 0 && dimensions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dimension, index) => (
                  <TableRow hover key={index}>
                    <TableCell width="60%">
                       {dimension.dimensionType}
                    </TableCell>
                    <TableCell width="40%">
                       {dimension.fee}
                    </TableCell>
                    <TableCell className={classes.actions}>
                      <IconButton key={index} aria-label="delete" color="secondary" onClick={() => setConfirmOpen({open:true, id:dimension.id, type:dimension.dimensionType, value: dimension.fee})}>
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
        count={dimensions ? dimensions.length : 0}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default DimensionDataGrid;
