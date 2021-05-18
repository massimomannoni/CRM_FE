import React from 'react';
import { Box,  Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CompanyAddress } from '../../../../../../app/ITypes';
import DataGrid from './DataGrid';
import Toolbar from './Toolbar';
import { companySelector } from '../../../../../../features/companies/companySlice';

type AddressCompanyFormProps = {
    addresses? : [CompanyAddress]
}

const AddressCompanyView = (props : AddressCompanyFormProps) => {

    const {loading, loadingAddress} = useSelector(companySelector);

    return (
      
        /* HEADER */
        <Box width="100%">

            <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                    Addresses
                </Typography>
            </Box>

            {/* ADD NEW ADDRESS */}
            <Box mb={3}>
                <Toolbar></Toolbar>
            </Box>

            {/* EDIT & REMOVE */}
            <Box mb={3}>
                <DataGrid addresses={props.addresses} loading={loading} loadingAddress={loadingAddress}></DataGrid>   
            </Box>

        </Box>
    )
}

export default AddressCompanyView