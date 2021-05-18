import React from 'react';
import { Box,  Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CompanyActivity } from '../../../../../../app/ITypes';
import DataGrid from './DataGrid';
import Toolbar from './Toolbar';
import { companySelector } from '../../../../../../features/companies/companySlice';

type ActivityCompanyFormProps = {
    activities? : [CompanyActivity]
}

const ActivityCompanyView = (props : ActivityCompanyFormProps) => {

    const {loading, loadingActivity} = useSelector(companySelector);

    return (
      
        /* HEADER */
        <Box width="100%">

            <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                    Activities
                </Typography>
            </Box>

            {/* ADD NEW ADDRESS */}
            <Box mb={3}>
                <Toolbar></Toolbar>
            </Box>

            {/* EDIT & REMOVE */}
            <Box mb={3}>
                <DataGrid activities={props.activities} loading={loading} loadingActivity={loadingActivity}></DataGrid>   
            </Box>

        </Box>
    )
}

export default ActivityCompanyView