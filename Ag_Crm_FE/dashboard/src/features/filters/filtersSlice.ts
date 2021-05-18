import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../app/store';

export interface FilterState  {
    global: string;
    loading: boolean,
    errors: string
 }

const initialState: FilterState = {
    global: '',
    loading: false,
    errors:'',    
}

const FilterssSlice = createSlice({
    name : "filters",
    initialState,
    reducers: {

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setFilters :(state, {payload} : PayloadAction<string>) => {
          state.global = (payload);
        }
    }
});

export const { setErrors, setFilters} = FilterssSlice.actions;

export default FilterssSlice.reducer;

export const filtersSelector = (state: { filters: FilterState }) => state.filters

export const addFilter = (filters: string): AppThunk => {
    return async (dispatch) => {

        
      try {
      
         dispatch(setFilters(filters));

      } catch (error) {

        dispatch(setErrors(error.message));

      }
    };
  };