import React from 'react';
import { Box,  Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CompanyEmployeesOverView } from '../../../../../../app/ITypes';
import DataGrid from './DataGrid';
import Toolbar from './Toolbar';
import { companySelector } from '../../../../../../features/companies/companySlice';

type EmployeeOverViewCompanyFormProps = {
    employeesOverViews? : [CompanyEmployeesOverView]
}

const EmployeeOverViewCompanyView = (props : EmployeeOverViewCompanyFormProps) => {

    const {loading, loadingEmployeesOverView} = useSelector(companySelector);

    return (
      
        /* HEADER */
        <Box width="100%">

            <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                    OverView
                </Typography>
            </Box>

            {/* ADD NEW ADDRESS */}
            <Box mb={3}>
                <Toolbar></Toolbar>
            </Box>

            {/* EDIT & REMOVE */}
            <Box mb={3}>
                <DataGrid employeesOverViews={props.employeesOverViews} loading={loading} loadingEmployeesOverView={loadingEmployeesOverView}></DataGrid>   
            </Box>

        </Box>
    )
}

export default EmployeeOverViewCompanyView