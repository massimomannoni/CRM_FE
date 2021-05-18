import React, {  useState } from 'react';
import * as Yup from 'yup';
import { CircularProgress, Fab, FormControl, Grid,  InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import {  addCompanyEmployeesOverView } from '../../../../../../features/companies/companySlice';
import { useParams } from 'react-router-dom';
import { CompanyEmployeesOverView } from '../../../../../../app/ITypes';
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import { CONTRACT_LEVEL_TYPE} from '../../../../../../services/constants/global';

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

    const onAddEmployeesOverView = (values: CompanyEmployeesOverView ) => {

        setSuccess(false);
        setSaveLoading(true);

        const companyEmployeesOverView : CompanyEmployeesOverView = {
          id :'',
          contractLevelType : values.contractLevelType,
          employees : values.employees,
          isRemoved : values.isRemoved
        }

        setTimeout(() => {

            dispatch(addCompanyEmployeesOverView(id, companyEmployeesOverView));

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
                        contractLevelType : '',
                        employees : 0,
                        isRemoved : false
                    }}
                    validationSchema={
                        Yup.object().shape({
                            contractLevelType: Yup.string().max(80).required('is required'),
                            employees : Yup.number().required('is required')   
                        })}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {

                            actions.setSubmitting(false);

                            onAddEmployeesOverView(values)

                            actions.resetForm({values : {
                                id : '',
                                contractLevelType : '',
                                employees : 0,
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
                                <InputLabel htmlFor="contractLevelType">Livello</InputLabel>
                                <Select
                                    required
                                    value={values.contractLevelType}
                                    onChange={handleChange}
                                    defaultValue={values.contractLevelType}
                                    label="Contratto"
                                    inputProps={{
                                        name: "contractLevelType",
                                        id: "contractLevelType"
                                    }}>
                                    <MenuItem value={CONTRACT_LEVEL_TYPE.DIRIGENTI} >{CONTRACT_LEVEL_TYPE.DIRIGENTI}</MenuItem >
                                    <MenuItem value={CONTRACT_LEVEL_TYPE.QUADRI} >{CONTRACT_LEVEL_TYPE.QUADRI}</MenuItem >
                                    <MenuItem value={CONTRACT_LEVEL_TYPE.IMPIEGATI} >{CONTRACT_LEVEL_TYPE.IMPIEGATI}</MenuItem >
                                    <MenuItem value={CONTRACT_LEVEL_TYPE.OPERAI} >{CONTRACT_LEVEL_TYPE.OPERAI}</MenuItem >
                                    <MenuItem value={CONTRACT_LEVEL_TYPE.APPRENDISTI} >{CONTRACT_LEVEL_TYPE.APPRENDISTI}</MenuItem >
                                    <MenuItem value={CONTRACT_LEVEL_TYPE.ALTRO} >{CONTRACT_LEVEL_TYPE.ALTRO}</MenuItem >
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={7} xs={12} className={classes.formControl}>
                                <TextField
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                    label="Occupati"
                                    name="employees"
                                    type="number"
                                    inputProps={{
                                        maxLength: 5
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.employees}
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