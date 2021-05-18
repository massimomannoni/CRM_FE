import React, {  useEffect, useState } from 'react';
import * as Yup from 'yup';
import {  CircularProgress, Fab, FormControl, Grid,  InputLabel, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addCompanyDimension } from '../../../../../../features/companies/companySlice';
import { useParams } from 'react-router-dom';
import { CompanyDimension, DimensionType } from '../../../../../../app/ITypes';
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { dimensionTypesSelector, DimensionTypeState } from '../../../../../../features/dimensionTypes/dimensionTypesSlice';


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


interface ToolBarProps {
    loading : boolean,
    loadingDimension : boolean,
    subScriptionType : string
}
  
const Toolbar = (props : ToolBarProps) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    let { id } = useParams();

    const [saveLoading, setSaveLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const dimensionTypes = useSelector(dimensionTypesSelector);
    const dimensionTypeForContractType : DimensionType[] = dimensionTypes.types.filter(x => x.contractType === props.subScriptionType);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
    });

    const onAddADimension = (values: CompanyDimension) => {

        setSuccess(false);
        setSaveLoading(true);

        const companyDimension : CompanyDimension = {
          id :'',
          dimensionType : values.dimensionType,
          fee : values.fee,
          isRemoved : values.isRemoved
        }

        setTimeout(() => {

            dispatch(addCompanyDimension(id, companyDimension));

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
                        dimensionType : '',
                        fee : 0,
                        isRemoved : false
                    }}
                    validationSchema={
                        Yup.object().shape({
                            dimensionType: Yup.string().max(80).required('is required'),
                            fee : Yup.number().min(50,'min fee is 50').required('is required')
                        })}
                        
                    onSubmit={(values, actions) => {
                        setTimeout(() => {

                            actions.setSubmitting(false);

                            console.log(values)

                            onAddADimension(values)

                            actions.resetForm({values : {
                                id : '',
                                dimensionType : '',
                                fee : 0,
                                isRemoved : false
                            }})
        
                        }, 1000);
                    }} 
                    >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        touched,
                        values
                    }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item md={7} xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="dimensionType">Dimension</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={values.dimensionType}
                                        onChange={async e => {
                                            const dimension = dimensionTypes.types.find(({name}) => name === e.target.value);
                                        // check why lose the selection
                                            if (dimension !== undefined){
                                                setFieldValue("dimensionType", dimension.name);
                                                setFieldValue("fee", dimension.fee);
                                            }
                                          }}
                                        label="Tipo"
                                        inputProps={{
                                            name: "dimensionType",
                                            id: "dimensionType"
                                        }}>
                                        <option value=''></option> 
                                        {(dimensionTypeForContractType && dimensionTypeForContractType.length > 0) ? (dimensionTypeForContractType.map((type , index) => (
                                            <option key={index} value={type.name}>{type.name}</option>
                                        ))) : (                                       
                                            <option value='No Data'>No Data</option>
                                        )};                             
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12} className={classes.formControl}>
                                <TextField
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                    label="Fee"
                                    name="fee"
                                    type="number"
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fee}
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


