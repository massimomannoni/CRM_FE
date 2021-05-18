import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import {  ReferenceBaseTypeState, SectorType} from '../../app/ITypes';
import { AppThunk } from '../../app/store';
import { config } from '../../services/configs/config';
import { ENDPOINTS } from '../../services/constants/appEndpoints';

export interface SectorTypeState extends ReferenceBaseTypeState {
    types: SectorType[];
 }

const initialState: SectorTypeState = {
    types: [],
    loading: false,
    errors:'',  
}

const SectorTypesSlice = createSlice({
    name : "sectorTypes",
    initialState,
    reducers: {
        setLoading : (state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload
        },

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setSectorTypes :(state, {payload} : PayloadAction<SectorType[]>) => {
          state.types = payload;
        },   

        updSectorType :(state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload;
        }, 

        delSectorType :(state, {payload} : PayloadAction<string>) => {
          state.types = state.types.filter(x => x.id !== payload)
        }, 
    }
});

export const { setLoading, setErrors, setSectorTypes, updSectorType, delSectorType } = SectorTypesSlice.actions;

export default SectorTypesSlice.reducer;

export const sectorTypesSelector = (state: {sectorTypes : SectorTypeState} ) => state.sectorTypes;

export const getSectorTypes = (): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api  + ENDPOINTS.sectorTypes.base)

        dispatch(setSectorTypes(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
    }
  };
};

export const changeSectorType = (id : string, Sector: SectorType): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.put(config.baseUrl.api  + ENDPOINTS.sectorTypes.base + `/${id}`, Sector )

      dispatch(updSectorType(true));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};

export const removeSectorType = (id : string): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.sectorTypes.base + `/${id}`)

      dispatch(delSectorType(id));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};