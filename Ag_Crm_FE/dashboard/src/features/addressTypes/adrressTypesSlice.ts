import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AddressType, ReferenceBaseTypeState} from '../../app/ITypes';
import { AppThunk } from '../../app/store';
import { config } from '../../services/configs/config';
import { ENDPOINTS } from '../../services/constants/appEndpoints';

export interface AddressTypeState extends ReferenceBaseTypeState {
    types: AddressType[];
 }

const initialState: AddressTypeState = {
    types: [],
    loading: false,
    errors:'',  
}

const AddressTypesSlice = createSlice({
    name : "addressTypes",
    initialState,
    reducers: {
        setLoading : (state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload
        },

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setAddressTypes :(state, {payload} : PayloadAction<AddressType[]>) => {
          state.types = payload;
        },   

        updAddressType :(state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload;
        }, 

        delAddressType :(state, {payload} : PayloadAction<string>) => {
          state.types = state.types.filter(x => x.id !== payload)
        }, 
    }
});

export const { setLoading, setErrors, setAddressTypes, updAddressType, delAddressType } = AddressTypesSlice.actions;

export default AddressTypesSlice.reducer;

export const addressTypesSelector = (state: {addressTypes : AddressTypeState} ) => state.addressTypes;

export const getAddressTypes = (): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api  + ENDPOINTS.addressTypes.base)

        dispatch(setAddressTypes(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
    }
  };
};

export const changeAddressType = (id : string, address: AddressType): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.put(config.baseUrl.api  + ENDPOINTS.addressTypes.base + `/${id}`, address )

      dispatch(updAddressType(true));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};

export const removeAddressType = (id : string): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.addressTypes.base + `/${id}`)

      dispatch(delAddressType(id));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};