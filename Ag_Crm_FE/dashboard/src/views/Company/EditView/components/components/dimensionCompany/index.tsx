import React from 'react';
import { Box,  Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CompanyDimension } from '../../../../../../app/ITypes';
import DataGrid from './DataGrid';
import Toolbar from './Toolbar';
import { companySelector } from '../../../../../../features/companies/companySlice';

type DimensionCompanyFormProps = {
    subScriptionType: string,
    dimensions? : [CompanyDimension]
}

const DimensionCompanyView = (props : DimensionCompanyFormProps) => {

    const {loading, loadingDimension} = useSelector(companySelector);

    return (
      
        /* HEADER */
        <Box width="100%">

            <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                    Revenues Dimensions
                </Typography>
            </Box>

            {/* ADD NEW ADDRESS */}
            <Box mb={3}>
                <Toolbar subScriptionType={props.subScriptionType} loading={loading} loadingDimension={loadingDimension}></Toolbar>
            </Box>

            {/* EDIT & REMOVE */}
            <Box mb={3}>
                <DataGrid dimensions={props.dimensions} loading={loading} loadingDimension={loadingDimension}></DataGrid>   
            </Box>

        </Box>
    )
}

export default DimensionCompanyView