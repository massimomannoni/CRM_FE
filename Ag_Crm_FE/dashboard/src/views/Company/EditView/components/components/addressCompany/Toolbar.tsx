import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CircularProgress, Fab, FormControl, Grid,  InputLabel, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addCompanyAddress } from '../../../../../../features/companies/companySlice';
import { useParams } from 'react-router-dom';
import { CompanyAddress } from '../../../../../../app/ITypes';
import { addressTypesSelector, getAddressTypes } from '../../../../../../features/addressTypes/adrressTypesSlice';
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120
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
        left: -34.5,
        zIndex: 1,
        marginLeft:"50%"
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


const Toolbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    let { id } = useParams();

    const [saveLoading, setSaveLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const addressTypes = useSelector(addressTypesSelector);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
    });

    const onAddAddress = (values: CompanyAddress ) => {

        setSuccess(false);
        setSaveLoading(true);

        const companyAddress : CompanyAddress = {
          id :'',
          addressType : values.addressType,
          value : values.value,
          isRemoved : values.isRemoved
        }

        setTimeout(() => {

            dispatch(addCompanyAddress(id, companyAddress));

            setSuccess(true);
            setSaveLoading(false);

            setTimeout(() => {
                setSuccess(false)
            }, 1000);

        }, 400);
    }
    

    return (
        <Grid container spacing={3}>
            
              <Grid item xs={12}>
                <Formik 
                    initialValues={{
                        id : '',
                        addressType : '',
                        value : '',
                        isRemoved : false
                    }}
                    validationSchema={
                        Yup.object().shape({
                            addressType: Yup.string().max(80).required('is required'),
                            value : Yup.string().max(80).required('is required')   
                        })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {

                            actions.setSubmitting(false);

                            onAddAddress(values)

                            actions.resetForm({values : {
                                id : '',
                                addressType : '',
                                value : '',
                                isRemoved : false
                            }})
        
                        }, 1000);
                        
                    }}>
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values
                    }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item md={3} xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="addressType">Types</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={touched.addressType}
                                        onChange={handleChange}
                                        label="Tipo"
                                        inputProps={{
                                            name: "addressType",
                                            id: "addressType"
                                        }}>
                                        <option value=''></option> 
                                      {(addressTypes && addressTypes.types && addressTypes.types.length) > 0 ? (
                                        addressTypes.types.map((type , index) => (
                                            <option key={index} value={type.name}>{type.name}</option>
                                        ))) : (                                       
                                            <option value='No Data'>No Data</option>
                                    )};
                                
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={7} xs={12} className={classes.formControl}>
                                <TextField
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                    label="Indirizzo"
                                    name="value"
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.value}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <div className={classes.wrapper}>
                                    <Fab
                                        aria-label="save"
                                        color="primary"
                                        className={buttonClassname}
                                        type="submit">
                                        {success ? <CheckIcon /> : <SaveIcon />}
                                    </Fab>
                                    {(
                                       saveLoading && <CircularProgress size={68} className={classes.fabProgress} />
                                    )}
                                </div>
                            </Grid>
                        </Grid>

                    </form>
                    )}
                </Formik>
              </Grid>
        </Grid>
      )
}

export default Toolbar