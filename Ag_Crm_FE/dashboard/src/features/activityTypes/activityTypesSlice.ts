import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ActivityType, ReferenceBaseTypeState} from '../../app/ITypes';
import { AppThunk } from '../../app/store';
import { config } from '../../services/configs/config';
import { ENDPOINTS } from '../../services/constants/appEndpoints';

export interface ActivityTypeState extends ReferenceBaseTypeState {
    types: ActivityType[];
 }

const initialState: ActivityTypeState = {
    types: [],
    loading: false,
    errors:'',  
}

const ActivityTypesSlice = createSlice({
    name : "activityTypes",
    initialState,
    reducers: {
        setLoading : (state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload
        },

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setActivityTypes :(state, {payload} : PayloadAction<ActivityType[]>) => {
          state.types = payload;
        },   

        updActivityType :(state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload;
        }, 

        delActivityType :(state, {payload} : PayloadAction<string>) => {
          state.types = state.types.filter(x => x.id !== payload)
        }, 
    }
});

export const { setLoading, setErrors, setActivityTypes, updActivityType, delActivityType } = ActivityTypesSlice.actions;

export default ActivityTypesSlice.reducer;

export const activityTypesSelector = (state: {activityTypes : ActivityTypeState} ) => state.activityTypes;

export const getActivityTypes = (): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api + ENDPOINTS.activityTypes.base)

        dispatch(setActivityTypes(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
    }
  };
};

export const changeActivityType = (id : string, activity: ActivityType): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.put(config.baseUrl.api  + ENDPOINTS.activityTypes.base + `/${id}`, activity )

      dispatch(updActivityType(true));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};

export const removeActivityType = (id : string): AppThunk => {

  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.delete(config.baseUrl.api + ENDPOINTS.activityTypes.base + `/${id}`)

      dispatch(delActivityType(id));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};