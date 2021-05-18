import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CompanyEmployee } from '../../../../../../app/ITypes';
import DataGrid from './DataGrid';
import Toolbar from './Toolbar';
import { companySelector } from '../../../../../../features/companies/companySlice';
import { useParams } from 'react-router-dom';

type EmployeeCompanyFormProps = {
    employees? : [CompanyEmployee]
}

const EmployeeCompanyView = (props : EmployeeCompanyFormProps) => {

    const {loading, loadingEmployee,loadingEmployeeContact} = useSelector(companySelector);

    return (
      
        /* HEADER */
        <Box width="100%">

            <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                    Employees Contact
                </Typography>
            </Box>

            {/* ADD NEW CONTACT */}
            <Box mb={3}>
                <Toolbar></Toolbar>
            </Box>

            {/* EDIT & REMOVE */}
            <Box mb={3}>
                <DataGrid employees={props.employees} loading={loading} loadingEmployee={loadingEmployee} loadingEmployeeContact={loadingEmployeeContact}></DataGrid>   
            </Box>

        </Box>
    )
}

export default EmployeeCompanyView