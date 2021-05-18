
import React, {
  useEffect } from 'react';
import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
import Page from '../../../components/Page'
import Toolbar from './Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import { companySelector, getCompanies } from '../../../features/companies/companySlice';
import DataGrid from './DataGrid';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getAddressTypes } from '../../../features/addressTypes/adrressTypesSlice';
import { getContactTypes } from '../../../features/contactTypes/contactTypesSlice';
import { getActivityTypes } from '../../../features/activityTypes/activityTypesSlice';
import { getSectorTypes } from '../../../features/sectorTypes/sectorTypesSlice';
import { getDimensionTypes } from '../../../features/dimensionTypes/dimensionTypesSlice';
import { filtersSelector } from '../../../features/filters/filtersSlice';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));

const CompanyListView = () => {

  const dispatch = useDispatch();

  let { list, loading} = useSelector(companySelector);

  const { global } = useSelector(filtersSelector)

  if (!loading && global){
     list = list.filter((company) => (
       company.name.toLowerCase().includes(global.toLowerCase()) || 
       company.fiscalCode.toLowerCase().includes(global.toLowerCase()) || 
       company.city.toLowerCase().includes(global.toLowerCase()) || 
       company.province.toLowerCase().includes(global.toLowerCase()) || 
       company.subScriptionType.toLowerCase().includes(global.toLowerCase()) ));
  }

  useEffect(() => {

    async function GetTypes(){

      Promise.all(
      [
        dispatch(getAddressTypes()),
        dispatch(getContactTypes()),
        dispatch(getActivityTypes()),
        dispatch(getSectorTypes()),
        dispatch(getSectorTypes()),
        dispatch(getDimensionTypes())
      ]);
    }

    async function GetCompanies(){
      dispatch(getCompanies());
    }

    // refactor using a loop on types
    GetTypes();

    GetCompanies();
 
  }, [dispatch]);

  const classes = useStyles();

  return (

      <Page title="Customers" className={classes.root}> 
          <Container maxWidth={false}>
              <Toolbar />
              <ToastContainer autoClose={2000} />
              <Box mt={3}>
                  <DataGrid companies={list} loading={loading}></DataGrid>
              </Box>
          </Container>
      </Page>
  )   
}

export default CompanyListView;