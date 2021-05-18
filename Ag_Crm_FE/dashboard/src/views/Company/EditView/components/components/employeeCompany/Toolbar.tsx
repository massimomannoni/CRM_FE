import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { CircularProgress, Fab, FormControl, Grid,  InputLabel, Select, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addCompanyEmployee } from '../../../../../../features/companies/companySlice';
import { useParams } from 'react-router-dom';
import { CompanyEmployee } from '../../../../../../app/ITypes';
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { contactTypesSelector, getContactTypes } from '../../../../../../features/contactTypes/contactTypesSlice';

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

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success
    });

    useEffect(() => {
  
       dispatch(getContactTypes());
   
    }, [dispatch]);
        
    const contactsTypes = useSelector(contactTypesSelector);

    const onAddEmployee = (values: CompanyEmployee ) => {

        setSuccess(false);
        setSaveLoading(true);

        const companyEmployee : CompanyEmployee = {
          id :'',
          name : values.name,
          surname : values.surname,
          contactType : values.contactType,
          isRemoved : values.isRemoved
        }

        setTimeout(() => {

            dispatch(addCompanyEmployee(id, companyEmployee));

            setSuccess(true);
            setSaveLoading(false);

            setTimeout(() => {
                setSuccess(false)
            }, 1000);

        }, 1000);
    }

    return (
        <Grid container spacing={3}>
            
              <Grid item xs={12}>
                <Formik
                    initialValues={{
                        id : '',
                        name : '',
                        surname : '',
                        contactType : '',
                        isRemoved : false
                    }}
         
                     onSubmit={(values, actions) => {
                        
                        setTimeout(() => {

                            actions.setSubmitting(false);

                            onAddEmployee(values)

                            actions.resetForm({values : {
                                id : '',
                                name : '',
                                surname : '',
                                contactType : '',
                                isRemoved : false
                            }})
        
                        }, );    
                    }}
                    >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values
                    }) => (
                    <form onSubmit={handleSubmit} name="companyContact">
                        <Grid container spacing={3}>
                            <Grid item md={3} xs={12}>
                                <FormControl variant="outlined" className={classes.formControl} style={{minWidth: 220}}>
                                 <InputLabel htmlFor="contactType">ContactTypes</InputLabel>
                                 <Select
                                        fullWidth
                                        required
                                        native
                                        value={touched.contactType}
                                        onChange={handleChange}
                                        label="Contact Type"
                                        inputProps={{
                                            name: "contactType",
                                            id: "contactType"
                                        }}>
                                        <option value=''></option>
                                    {(contactsTypes.types && contactsTypes.types.length) > 0 ? (
                                        contactsTypes.types.map((type, index) => (
                                            <option key={index} value={type.name}>{type.name}</option>
                                        ))) : (                                       
                                            <option value='No Data'>No Data</option>
                                    )};
                                
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                    label="Name"
                                    name="name"
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={4} xs={12} className={classes.formControl} style={{minWidth: 220}}>
                                <TextField
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                    label="Surname"
                                    name="surname"
                                    inputProps={{
                                        maxLength: 80
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.surname}
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