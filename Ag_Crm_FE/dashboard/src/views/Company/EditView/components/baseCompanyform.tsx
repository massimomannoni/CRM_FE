import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
  MenuItem
} from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { Company } from '../../../../app/ITypes';
import moment from 'moment';
import { changeCompany, getCompanyDetails } from '../../../../features/companies/companySlice';
import { SUBSCRIPTION_TYPE } from '../../../../services/constants/global';

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: 10,
      minWidth: 120
    }
  }));

interface BaseCompanyFormProps {
    company : Company
}

interface CompanyUpdate { 
    id : string;
    fiscalcode: string;
    name: string; 
    piva: string; 
    city: string; 
    province: string; 
    cap: string; 
    address: string;
    contract: string; 
    subscription:string;
    year: string;
    month: string; 
    day: string;
}

const BaseCompanyForm = (props : BaseCompanyFormProps) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const company = props.company;

    const onUpdateCompany = async (values: CompanyUpdate) => {

        const companyUpdated : Company = {
          id : values.id,
          name : values.name,
          pIva : values.piva,
          fiscalCode : values.fiscalcode,
          city: values.city, 
          province: values.province,
          cap: values.cap,
          address: values.address,
          contractType: values.contract,
          subScriptionType: values.subscription,
          subScriptionDate : moment.utc(`${values.year}-${values.month}-${values.day}`).toDate()
        }
    
         await dispatch(changeCompany(companyUpdated.id, companyUpdated));

         await dispatch(getCompanyDetails(companyUpdated.id));

    }

      const subscription = (company?.subScriptionDate != null) ? new Date(company.subScriptionDate) : new Date();

      return (

        <Formik
            initialValues={{
                id: company.id,
                fiscalcode: company?.fiscalCode,
                name: company?.name,
                piva: company?.pIva,
                city: company?.city,
                province: company?.province,
                cap: company?.cap,
                address: company?.address,
                contract: company?.contractType,
                subscription: company?.subScriptionType,
                year: (subscription.getFullYear()).toString(),
                month: (subscription.getMonth() + 1).toString(),
                day: (subscription.getDate()).toString()
            }}
            validationSchema={
                Yup.object().shape({
                    name: Yup.string().max(80).required('is required'),
                    fiscalcode: Yup.string().max(20).required('is required'),
                    piva: Yup.string().max(20).required('is required'),
                    city: Yup.string().max(50).required('is required'),
                    province: Yup.string().length(2).required('is required'),
                    cap: Yup.string().max(5).required('is required'),
                    address: Yup.string().max(80).required('is required'),
                    contract: Yup.string().required('is required'),
                    subscription: Yup.string().required('is required'),
                    year: Yup.number().min(1950).required("is requried"),
                    month: Yup.string().min(1).max(12).required("is requried"),
                    day: Yup.string().min(1).max(31).required("is requried"),
                })
            }
            onSubmit={(values : CompanyUpdate, actions) => {
                setTimeout(() => {

                actions.setSubmitting(false);

                if(values && values !== undefined)
                    onUpdateCompany(values);
                
            }, 1000);
        }}
    >
        {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
        }) => (
        <form onSubmit={handleSubmit}>
            <Box mb={3}>
                <Typography color="textPrimary" variant="h3">
                    Company
                </Typography>
            </Box>
            
            <TextField
                required
                error={Boolean(touched.name && errors.name)}
                fullWidth
                helperText={touched.name && errors.name}
                label="Ragione Sociale"
                margin="normal"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                variant="outlined"
            />
            <TextField
                required
                error={Boolean(touched.piva && errors.piva)}
                fullWidth
                helperText={touched.piva && errors.piva}
                label="Partita Iva"
                margin="normal"
                name="piva"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.piva}
                variant="outlined"
            />
            <TextField
                required
                error={Boolean(touched.fiscalcode && errors.fiscalcode)}
                fullWidth
                helperText={touched.fiscalcode && errors.fiscalcode}
                label="Codice Fiscale"
                margin="normal"
                name="fiscalcode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fiscalcode}
                variant="outlined"
            />

            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <TextField
                        required
                        fullWidth
                        className={classes.formControl}
                        label="Città"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.city}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        required
                        fullWidth
                        className={classes.formControl}
                        label="Provincia"
                        name="province"
                        inputProps={{
                            maxLength: 2
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.province}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        required
                        fullWidth
                        className={classes.formControl}
                        label="Cap"
                        name="cap"
                        inputProps={{
                            maxLength: 5
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cap}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            <TextField
                fullWidth
                required
                helperText={touched.address && errors.address}
                label="Indirizzo"
                margin="normal"
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                variant="outlined"
                />
            <TextField
                fullWidth
                required
                helperText={touched.contract && errors.contract}
                label="Tipo Contratto"
                margin="normal"
                name="contract"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contract}
                variant="outlined"
                />
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="subscription">Tipo Adesione</InputLabel>
                        <Select
                            required
                            value={values.subscription}
                            onChange={handleChange}
                            defaultValue={values.subscription}
                            label="Adesione"
                            inputProps={{
                                name: "subscription",
                                id: "subscription"
                            }}>
                            <MenuItem  value={SUBSCRIPTION_TYPE.AZIENDA} >{SUBSCRIPTION_TYPE.AZIENDA}</MenuItem >
                            <MenuItem  value={SUBSCRIPTION_TYPE.AGENTE} >{SUBSCRIPTION_TYPE.AGENTE}</MenuItem >
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formControl}>
                    <TextField
                        required
                        type="number"
                        error={Boolean(touched.year && errors.year)}
                        fullWidth
                        helperText={touched.year && errors.year}
                        label="Anno"
                        margin="none"
                        name="year"
                        inputProps={{
                            maxLength: 4
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.year}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={3} xs={12} className={classes.formControl}>
                    <TextField
                        required
                        type="number"
                        error={Boolean(touched.month && errors.month)}
                        fullWidth
                        helperText={touched.month && errors.month}
                        label="Mese"
                        margin="none"
                        name="month"
                        inputProps={{
                            maxLength: 2
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.month}
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={3} xs={12} className={classes.formControl}>
                    <TextField
                        required
                        type="number"
                        error={Boolean(touched.day && errors.day)}
                        fullWidth
                        helperText={touched.day && errors.day}
                        label="Giorno"
                        margin="none"
                        name="day"
                        inputProps={{
                            maxLength: 2
                        }}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.day}
                        variant="outlined"
                    />
                </Grid>
            </Grid>

            <Box my={2}>
                <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    Save
                </Button>
            </Box>

        </form>
        )}
    </Formik>
      )
}

export default BaseCompanyForm;