import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Checkbox, CircularProgress, Fab, FormControl, Grid,  InputLabel, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addCompanyActivity, } from '../../../../../../features/companies/companySlice';
import { useParams } from 'react-router-dom';
import { CompanyActivity } from '../../../../../../app/ITypes';
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { activityTypesSelector } from '../../../../../../features/activityTypes/activityTypesSlice';
import { sectorTypesSelector } from '../../../../../../features/sectorTypes/sectorTypesSlice';

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

    const activityTypes = useSelector(activityTypesSelector);
    const sectorTypes = useSelector(sectorTypesSelector);

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
    });

    const onAddActivity = (values: CompanyActivity ) => {

        setSuccess(false);
        setSaveLoading(true);

        const companyActivity : CompanyActivity = {
          id :'',
          activityType : values.activityType,
          sectorType : values.sectorType,
          value : values.value,
          isRemoved : values.isRemoved
        }

        console.log(companyActivity)

        setTimeout(() => {

            dispatch(addCompanyActivity(id, companyActivity));

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
                        activityType : '',
                        sectorType : '',
                        value : false,
                        isRemoved : false
                    }}
                    validationSchema={
                        Yup.object().shape({
                            activityType: Yup.string().max(80).required('is required'),
                            sectorType: Yup.string().max(80).required('is required'),
                            value : Yup.boolean().required('is required')
                           
                        })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {

                            actions.setSubmitting(false);

                            onAddActivity(values)

                            actions.resetForm({values : {
                                id : '',
                                activityType : '',
                                sectorType: '',
                                value : false,
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
                                <InputLabel htmlFor="activityType">Activities</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={touched.activityType}
                                        onChange={handleChange}
                                        label="Tipo"
                                        inputProps={{
                                            name: "activityType",
                                            id: "activityType"
                                        }}>
                                        <option value=''></option> 
                                      {(activityTypes && activityTypes.types && activityTypes.types.length) > 0 ? (
                                        activityTypes.types.map((type , index) => (
                                            <option key={index} value={type.name}>{type.name}</option>
                                        ))) : (                                       
                                            <option value='No Data'>No Data</option>
                                    )};
                                
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="sectorType">Sectors</InputLabel>
                                    <Select
                                        required
                                        native
                                        value={touched.sectorType}
                                        onChange={handleChange}
                                        label="Tipo"
                                        inputProps={{
                                            name: "sectorType",
                                            id: "sectorType"
                                        }}>
                                        <option value=''></option> 
                                      {(sectorTypes && sectorTypes.types && sectorTypes.types.length) > 0 ? (
                                        sectorTypes.types.map((type , index) => (
                                            <option key={index} value={type.name}>{type.name}</option>
                                        ))) : (                                       
                                            <option value='No Data'>No Data</option>
                                    )};
                                
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12} className={classes.formControl}>
                                <InputLabel htmlFor="sectorType">Active</InputLabel>
                                <Checkbox
                                    required
                                    className={classes.formControl}
                                   
                                    name="value"
                                 
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    checked={values.value}
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


