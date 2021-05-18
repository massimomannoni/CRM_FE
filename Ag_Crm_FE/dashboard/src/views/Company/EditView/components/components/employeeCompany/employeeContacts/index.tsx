import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Toolbar from './Toolbar';
import DataGrid from './DataGrid';
import { EmployeeContact } from '../../../../../../../app/ITypes';


interface EmployeeContactProps {
    employeeId : string
    contacts? : [EmployeeContact]
    loadingEmployee : boolean
    loadingEmployeeContact : boolean;
}

const EmployeeComtactView = (props: EmployeeContactProps) => {

    return (
      
        /* HEADER */
        <Box width="100%">

            <Box mb={3}>
                <Typography color="textPrimary" variant="h4">
                    Contacts Details
                </Typography>
            </Box>

            {/* ADD NEW CONTACT */}
            <Box mb={3}>
                <Toolbar employeeId={props.employeeId}></Toolbar>
            </Box>

            {/* EDIT & REMOVE */}
            <Box mb={3}> 
                <DataGrid employeeId={props.employeeId} contacts={props.contacts} loadingEmployee={props.loadingEmployee} loadingEmployeeContact={props.loadingEmployeeContact}></DataGrid>   
            </Box>

        </Box>
    )
}

export default EmployeeComtactView