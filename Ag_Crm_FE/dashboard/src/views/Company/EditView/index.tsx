import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  makeStyles,
  Grid,
  Paper,
  CircularProgress,
  Tabs,
  Tab,
  AppBar
} from '@material-ui/core';
import Page from '../../../components/Page';
import { useDispatch, useSelector } from 'react-redux';
import { companySelector, getCompanyDetails, getCompanyEmployeesOverView } from '../../../features/companies/companySlice';
import BaseCompanyForm from './components/baseCompanyform';
import AddressCompanyView from './components/components/addressCompany';
import EmployeeCompanyView from './components/components/employeeCompany';
import ActivityCompanyView from './components/components/activityCompany';
import { Company } from '../../../app/ITypes';
import DimensionCompanyView from './components/components/dimensionCompany/index';
import { ToastContainer } from 'react-toastify';
import EmployeeOverViewCompanyView from './components/components/employeeOverViewCompany';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
}));


function TabPanel(props : any) {
  const { children, value, index, ...other } = props;
  return (
    <div {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const CompanyEdidView = () => {

  const classes = useStyles();
  const dispatch = useDispatch()
  let { id } = useParams();
  const { listWithDetails, loading} = useSelector(companySelector);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect( () => {

    async function GetCompanyDetails(id : string) {
      dispatch(getCompanyDetails(id));
    }

    GetCompanyDetails(id)

  }, [dispatch]);

  let company : Company = {
    id: '',
    pIva : '',
    province : '',
    address : '',
    cap : '',
    city : '',
    contractType : '',
    subScriptionType : '',
    fiscalCode : '',
    name : '',
    subScriptionDate : new Date(),
  }

  if (!loading) {
    var details = listWithDetails.find(x => x.id === id)
    if (details !== undefined)
      company = details;
  }
  
  return (
    <Page className={classes.root} title="Register">
      
      <ToastContainer autoClose={2000} />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Paper className={classes.paper}>
                {loading ? (
                    <CircularProgress />
                    ) : (
                      <BaseCompanyForm company={company}></BaseCompanyForm>
                    )} 
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                  <Tab label="Addresses" />
                  <Tab label="Activities" />
                  <Tab label="Dimensions" />
                  <Tab label="Employees" />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Paper className={classes.paper}>
                {loading ? (
                    <CircularProgress />
                    ) : (
                      <AddressCompanyView addresses={company?.addresses}></AddressCompanyView>
                    )} 
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Paper className={classes.paper}>
                {loading ? (
                    <CircularProgress />
                    ) : (
                      <ActivityCompanyView activities={company?.activities}></ActivityCompanyView>
                    )} 
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Paper className={classes.paper}>
                {loading ? (
                  <CircularProgress />
                    ) : (
                      <DimensionCompanyView dimensions={company?.dimensions} subScriptionType={company?.subScriptionType}></DimensionCompanyView>
                    )} 
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Paper className={classes.paper}>
                {loading ? (
                  <CircularProgress />
                    ) : (
                      <EmployeeOverViewCompanyView employeesOverViews={company?.employeesOverViews}></EmployeeOverViewCompanyView>
                    )} 
                </Paper>
              </TabPanel>

            </Grid>
            <Grid item xs={12} sm={12}>
                <Paper className={classes.paper}>
                {loading ? (
                    <CircularProgress />
                    ) : (
                      <EmployeeCompanyView employees={company?.employees}></EmployeeCompanyView>
                    )} 
                </Paper>
            </Grid>
          </Grid>
      </Box>
    </Page>
  );
};

export default CompanyEdidView;
