import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Notification } from '../../app/ITypes';
import { AppThunk } from '../../app/store';

export interface ToastrState  {
    list: Notification[];
    loading: boolean,
    errors: string
 }

const initialState: ToastrState = {
    list: [],
    loading: false,
    errors:'',    
}

const ToastersSlice = createSlice({
    name : "toasters",
    initialState,
    reducers: {

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setToasters :(state, {payload} : PayloadAction<Notification>) => {
          state.list.push(payload);
        }
    }
});

export const { setErrors, setToasters} = ToastersSlice.actions;

export default ToastersSlice.reducer;

export const toastrSelector = (state: { toaasters: ToastrState }) => state.toaasters

export const addNotification = (notification: Notification): AppThunk => {
    return async (dispatch) => {

      try {
      
         dispatch(setToasters(notification));

      } catch (error) {

        dispatch(setErrors(error.message));

      }
    };
  };