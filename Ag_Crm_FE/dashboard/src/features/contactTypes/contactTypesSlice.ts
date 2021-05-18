import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import {  ContactType, ReferenceBaseTypeState} from '../../app/ITypes';
import { AppThunk } from '../../app/store';
import { config  } from '../../services/configs/config';
import { ENDPOINTS } from '../../services/constants/appEndpoints';

export interface ContactTypeState extends ReferenceBaseTypeState {
    types: ContactType[];
 }

const initialState: ContactTypeState = {
  types: [],
    loading: false,
    errors:'',  
}

const ContactTypesSlice = createSlice({
    name : "contactTypes",
    initialState,
    reducers: {
        setLoading : (state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload
        },

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setContactTypes :(state, {payload} : PayloadAction<ContactType[]>) => {
          state.types = payload;
        },   

        updContactType :(state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload;
        }, 

        delContactType :(state, {payload} : PayloadAction<string>) => {
          state.types = state.types.filter(x => x.id !== payload)
        }, 
    }
});

export const { setLoading, setErrors, setContactTypes, updContactType, delContactType } = ContactTypesSlice.actions;

export default ContactTypesSlice.reducer;

export const contactTypesSelector = (state: { contactTypes: ContactTypeState }) => state.contactTypes;

export const getContactTypes = (): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api  + ENDPOINTS.contactTypes.base)

        dispatch(setContactTypes(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
    }
  };
};

export const changeContactType = (id : string, contact: ContactType): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.put(config.baseUrl.api  + ENDPOINTS.contactTypes.base + `/${id}`, contact )

      dispatch(updContactType(true));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};

export const removeContactType = (id : string): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.contactTypes.base + `/${id}`)

      dispatch(delContactType(id));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};