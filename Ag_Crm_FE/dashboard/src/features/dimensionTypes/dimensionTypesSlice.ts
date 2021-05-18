import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { DimensionType, ReferenceBaseTypeState} from '../../app/ITypes';
import { AppThunk } from '../../app/store';
import { config } from '../../services/configs/config';
import { ENDPOINTS } from '../../services/constants/appEndpoints';

export interface DimensionTypeState extends ReferenceBaseTypeState {
    types: DimensionType[];
 }

const initialState: DimensionTypeState = {
    types: [],
    loading: false,
    errors:'',  
}

const DimensionTypesSlice = createSlice({
    name : "dimensionTypes",
    initialState,
    reducers: {
        setLoading : (state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload
        },

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setDimensionTypes :(state, {payload} : PayloadAction<DimensionType[]>) => {
          state.types = payload;
        },   

        updDimensionType :(state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload;
        }, 

        delDimensionType :(state, {payload} : PayloadAction<string>) => {
          state.types = state.types.filter(x => x.id !== payload)
        }, 
    }
});

export const { setLoading, setErrors, setDimensionTypes, updDimensionType, delDimensionType } = DimensionTypesSlice.actions;

export default DimensionTypesSlice.reducer;

export const dimensionTypesSelector = (state: {dimensionTypes : DimensionTypeState} ) => state.dimensionTypes;

export const getDimensionTypes = (): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api  + ENDPOINTS.dimensionTypes.base)

        dispatch(setDimensionTypes(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
    }
  };
};

export const changeDimensionType = (id : string, activity: DimensionType): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.put(config.baseUrl.api  + ENDPOINTS.dimensionTypes.base + `/${id}`, activity )

      dispatch(updDimensionType(true));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};

export const removeDimensionType = (id : string): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.dimensionTypes.base + `/${id}`)

      dispatch(delDimensionType(id));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};