
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Company, CompanyAddress, EmployeeContact as EmployeeContact, CompanyEmployee, CompanyActivity, CompanyDimension, CompanyEmployeesOverView } from '../../app/ITypes';
import { AppThunk } from '../../app/store';
import { config } from '../../services/configs/config';
import { ENDPOINTS } from '../../services/constants/appEndpoints';

export interface CompanyState  {
    list: Company[];
    loading: boolean,
    errors: string,
    listWithDetails : Company[]
    loadingAddress: boolean, 
    loadingActivity: boolean, 
    loadingEmployeeContact: boolean,
    loadingEmployee: boolean,
    loadingDimension : boolean
    loadingEmployeesOverView : boolean
 }

const initialState: CompanyState = {
    list: [],
    loading: false,
    errors:'',
    listWithDetails:[],
    loadingAddress: false,
    loadingActivity: false,
    loadingEmployeeContact: false,
    loadingEmployee: false,
    loadingDimension: false,
    loadingEmployeesOverView: false
}

interface CompanyAddressResponse {
  companyId : string;
  addresses? : [CompanyAddress]
}

interface CompanyActivityResponse {
  companyId : string;
  activities? : [CompanyActivity]
}

interface CompanyDimensionResponse {
  companyId : string;
  dimensions? : [CompanyDimension]
}

interface CompanyEmployeeResponse {
  companyId : string;
  employees? : [CompanyEmployee]
}

interface CompanyEmployeesOverViewResponse {
  companyId : string;
  employeesOverViews? : [CompanyEmployeesOverView]
}


const CompaniesSlice = createSlice({
    name : "companies",
    initialState,
    reducers: {
        setLoading : (state, {payload} : PayloadAction<boolean>) => {
          state.loading = payload
        },

        setLoadingAddress : (state, {payload} : PayloadAction<boolean>) => {
          state.loadingAddress = payload
        },

        setLoadingActivity : (state, {payload} : PayloadAction<boolean>) => {
          state.loadingActivity = payload
        },

        setLoadingDimension : (state, {payload} : PayloadAction<boolean>) => {
          state.loadingDimension = payload
        },

        setLoadingEmployeesOverView : (state, {payload} : PayloadAction<boolean>) => {
          state.loadingEmployeesOverView = payload
        },

        setLoadingEmployeeContact : (state, {payload} : PayloadAction<boolean>) => {
          state.loadingEmployeeContact = payload
        },

        setLoadingEmployee : (state, {payload} : PayloadAction<boolean>) => {
          state.loadingEmployee = payload
        },

        setErrors :(state, {payload} : PayloadAction<string>) => {
          state.errors = payload;
        },

        setCompanies :(state, {payload} : PayloadAction<Company[]>) => {
          state.list = payload;
        },   

        setCompananiesDetails :(state, {payload} : PayloadAction<Company>) => {

          const listWithDetails = companiesDetailsSelector(state);

          const companyIndex = listWithDetails.findIndex(x => x.id == payload.id);
          
          if (companyIndex !== undefined)
            listWithDetails.splice(companyIndex, 1);

          let companiesDetails = listWithDetails;
          companiesDetails.push(payload);

          state.listWithDetails= companiesDetails;
        },   

        delCompany :(state, {payload} : PayloadAction<string>) => {
          state.list = state.list.filter(x => x.id != payload)
        }, 

        setCompanyAddresses : (state, {payload} : PayloadAction<CompanyAddressResponse>) => {

          const listWithDetails = companiesDetailsSelector(state);
          
          let companyDetails = listWithDetails.find(x => x.id == payload.companyId);
          if (companyDetails != undefined)
          {
            companyDetails.addresses = payload.addresses;

            // delete company details
            const companyIndex = listWithDetails.findIndex(x => x.id == payload.companyId);

            if (companyIndex !== undefined)
              listWithDetails.splice(companyIndex, 1);
            
            listWithDetails.push(companyDetails)
          }  

          state.listWithDetails = listWithDetails
          state.loadingAddress = false
        },

        setCompanyActivities : (state, {payload} : PayloadAction<CompanyActivityResponse>) => {

          const listWithDetails = companiesDetailsSelector(state);
          
          let companyDetails = listWithDetails.find(x => x.id == payload.companyId);
          if (companyDetails != undefined)
          {
            companyDetails.activities = payload.activities;

            // delete company details
            const companyIndex = listWithDetails.findIndex(x => x.id == payload.companyId);

            if (companyIndex !== undefined)
              listWithDetails.splice(companyIndex, 1);
            
            listWithDetails.push(companyDetails)
          }  

          state.listWithDetails = listWithDetails
          state.loadingActivity = false
        },

        setCompanyEmployees : (state, {payload} : PayloadAction<CompanyEmployeeResponse>) => {

          const listWithDetails = companiesDetailsSelector(state);
          
          let companyDetails = listWithDetails.find(x => x.id == payload.companyId);
          if (companyDetails != undefined)
          {
            companyDetails.employees = payload.employees;

            // delete company details
            const companyIndex = listWithDetails.findIndex(x => x.id == payload.companyId);

            if (companyIndex !== undefined)
              listWithDetails.splice(companyIndex, 1);
            
            listWithDetails.push(companyDetails)
          }  

          state.listWithDetails = listWithDetails
          state.loadingEmployee = false
        },

        setCompanyDimensions : (state, {payload} : PayloadAction<CompanyDimensionResponse>) => {

          const listWithDetails = companiesDetailsSelector(state);
          
          let companyDetails = listWithDetails.find(x => x.id == payload.companyId);
          if (companyDetails != undefined)
          {
            companyDetails.dimensions = payload.dimensions;

            // delete company details
            const companyIndex = listWithDetails.findIndex(x => x.id == payload.companyId);

            if (companyIndex !== undefined)
              listWithDetails.splice(companyIndex, 1);
            
            listWithDetails.push(companyDetails)
          }  

          state.listWithDetails = listWithDetails
          state.loadingDimension = false
        },

        setCompanyEmployeesOverViews : (state, {payload} : PayloadAction<CompanyEmployeesOverViewResponse>) => {

          const listWithDetails = companiesDetailsSelector(state);
          
          let companyDetails = listWithDetails.find(x => x.id == payload.companyId);
          if (companyDetails != undefined)
          {
            companyDetails.employeesOverViews = payload.employeesOverViews;

            // delete company details
            const companyIndex = listWithDetails.findIndex(x => x.id == payload.companyId);

            if (companyIndex !== undefined)
              listWithDetails.splice(companyIndex, 1);
            
            listWithDetails.push(companyDetails)
          }  

          state.listWithDetails = listWithDetails
          state.loadingDimension = false
        },
    }
});

export const { setLoading, setLoadingAddress, setLoadingActivity, setLoadingEmployeeContact, setLoadingEmployeesOverView, setLoadingDimension,setLoadingEmployee, setErrors, setCompanies, setCompananiesDetails, delCompany, setCompanyAddresses, setCompanyDimensions, setCompanyActivities, setCompanyEmployees,setCompanyEmployeesOverViews } = CompaniesSlice.actions;

export default CompaniesSlice.reducer;

export const companySelector = (state: { companies: CompanyState }) => state.companies;
export const companiesDetailsSelector = (state: CompanyState ) => state.listWithDetails;


// COMPANY //
export const getCompanies = (): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.base)

        dispatch(setCompanies(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
      }
    };
  };

export const getCompanyDetails = (companyId : string): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
      
        const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.details.replace("{companyId}", companyId))

        dispatch(setCompananiesDetails(response.data));

        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
      }
    };
};

export const createCompany = (company: Company): AppThunk => {
    return async (dispatch) => {

      dispatch(setLoading(true));

      try {
       
        console.log(company)
        const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.base, company)

        //dispatch(cret(response.data));
        
        toast.success("YOO, YOU ROCKZ");
        
        dispatch(setLoading(false));

      } catch (error) {
        dispatch(setErrors(error.message));

        dispatch(setLoading(false));
      }
    };
};

export const changeCompany = (id : string, company: Company): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.put(config.baseUrl.api  + ENDPOINTS.companies.base + `/${id}`, company )

      //(updCompany(true));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};

export const removeCompany = (id : string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
   
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.base + `/${id}`)

      dispatch(delCompany(id));

      toast.success("YOO, YOU ROCKZ");

      dispatch(setLoading(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoading(false));
    }
  };
};


// COMPANY ADDRESSES //
export const getCompanyAddresses = (companyId : string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingAddress(true));

    try {
    
      const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.addresses.base.replace("{companyId}", companyId))

      const companyAddressResponse : CompanyAddressResponse = {
        companyId : companyId,
        addresses : response.data
      }

      dispatch(setCompanyAddresses(companyAddressResponse));

      dispatch(setLoadingAddress(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingAddress(false));
    }
  };
};

export const addCompanyAddress = (companyId : string, address: CompanyAddress): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingAddress(true));

    try {
     
      const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.addresses.base.replace("{companyId}", companyId), address);
      
      dispatch(getCompanyAddresses(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      
      dispatch(setErrors(error.message));

      dispatch(setLoadingAddress(false));
    }
  };
};

export const delCompanyAddress = (companyId : string, addressId: string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingAddress(true));

    try {
     
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.addresses.address.replace("{companyId}", companyId).replace("{addressId}", addressId));
      
      dispatch(getCompanyAddresses(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingAddress(false));
    }
  };
};


// COMPANY ACTIVITIES //
export const getCompanyActivities = (companyId : string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingActivity(true));

    try {
    
      const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.activities.base.replace("{companyId}", companyId))

      const companyActivityResponse : CompanyActivityResponse = {
        companyId : companyId,
        activities : response.data
      }

      dispatch(setCompanyActivities(companyActivityResponse));

      dispatch(setLoadingActivity(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingActivity(false));
    }
  };
};

export const addCompanyActivity = (companyId : string, activity: CompanyActivity): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingActivity(true));

    try {
     
      const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.activities.base.replace("{companyId}", companyId), activity);
      
      dispatch(getCompanyActivities(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      
      dispatch(setErrors(error.message));

      dispatch(setLoadingActivity(false));
    }
  };
};

export const delCompanyActivity = (companyId : string, activityId: string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingActivity(true));

    try {
    
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.activities.activity.replace("{companyId}", companyId).replace("{activityId}", activityId));
      
      dispatch(getCompanyActivities(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingActivity(false));
    }
  };
};


// COMPANY DIMENSION //
export const getCompanyDimension = (companyId : string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingDimension(true));

    try {
    
      const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.dimensions.base.replace("{companyId}", companyId))

      const companyDimensionResponse : CompanyDimensionResponse = {
        companyId : companyId,
        dimensions : response.data
      }

      dispatch(setCompanyDimensions(companyDimensionResponse));

      dispatch(setLoadingDimension(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingDimension(false));
    }
  };
};

export const addCompanyDimension = (companyId : string, dimension: CompanyDimension): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingDimension(true));

    try {
     
      const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.dimensions.base.replace("{companyId}", companyId), dimension);
      
      dispatch(getCompanyDimension(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      
      dispatch(setErrors(error.message));

      dispatch(setLoadingDimension(false));
    }
  };
};

export const delCompanyDimension = (companyId : string, dimensionId: string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingDimension(true));

    try {
    
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.dimensions.dimension.replace("{companyId}", companyId).replace("{dimensionId}", dimensionId));
      
      dispatch(getCompanyDimension(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingDimension(false));
    }
  };
};


// COMPANY EMPLOYEES OVERVIEW //
export const getCompanyEmployeesOverView = (companyId : string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployeesOverView(true));

    try {
    
      const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.employeesOverViews.base.replace("{companyId}", companyId))

      const companyEmployeesOverViewResponse : CompanyEmployeesOverViewResponse = {
        companyId : companyId,
        employeesOverViews : response.data
      }

      dispatch(setCompanyEmployeesOverViews(companyEmployeesOverViewResponse));

      dispatch(setLoadingEmployeesOverView(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployeesOverView(false));
    }
  };
};

export const addCompanyEmployeesOverView = (companyId : string, employeesOverView: CompanyEmployeesOverView): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployeesOverView(true));

    try {
     
      const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.employeesOverViews.base.replace("{companyId}", companyId), employeesOverView);
      
      dispatch(getCompanyEmployeesOverView(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployeesOverView(false));
    }
  };
};

export const delCompanyEmployeesOverView = (companyId : string, employeesOverViewId: string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployeesOverView(true));

    try {
    
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.employeesOverViews.employeesOverView.replace("{companyId}", companyId).replace("{employeesOverViewId}", employeesOverViewId));
      
      dispatch(getCompanyEmployeesOverView(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployeesOverView(false));
    }
  };
};


// COMPANY EMPLOYEES //
export const getCompanyEmployees = (companyId : string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployee(true));

    try {
    
      const response = await axios.get(config.baseUrl.api  + ENDPOINTS.companies.employees.base.replace("{companyId}", companyId))

      const companyEmployeeResponse : CompanyEmployeeResponse = {
        companyId : companyId,
        employees : response.data
      }

      console.log(companyEmployeeResponse);
      dispatch(setCompanyEmployees(companyEmployeeResponse));

      dispatch(setLoadingEmployee(false));

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployee(false));
    }
  };
};

export const addCompanyEmployee = (companyId : string, employee: CompanyEmployee): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployee(true));

    try {
     
      const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.employees.base.replace("{companyId}", companyId), employee);
      
      dispatch(getCompanyEmployees(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployee(false));
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  };
};

export const delCompanyEmployee = (companyId : string, employeeId: string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployee(true));

    try {
     
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.employees.employee.replace("{companyId}", companyId).replace("{employeeId}", employeeId));
      
      dispatch(getCompanyEmployees(companyId))

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployee(false));
    }
  };
};


// EMPLOYEE CONTACTS //
export const addEmployeeContact = (companyId : string, employeeId: string, contact : EmployeeContact): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployeeContact(true));

    try {
     
      const response = await axios.post(config.baseUrl.api  + ENDPOINTS.companies.employees.contacts.replace("{companyId}", companyId).replace("{employeeId}", employeeId), contact);
      
      dispatch(getCompanyEmployees(companyId))

      dispatch(setLoadingEmployeeContact(false));

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployeeContact(false));
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  };
};

export const delEmployeeContact = (companyId : string, employeeId: string, contactId: string): AppThunk => {
  return async (dispatch) => {

    dispatch(setLoadingEmployeeContact(true));

    try {
     
      const response = await axios.delete(config.baseUrl.api  + ENDPOINTS.companies.employees.contact.replace("{companyId}", companyId).replace("{employeeId}", employeeId).replace("{contactId}", contactId));
      
      dispatch(getCompanyEmployees(companyId))

      dispatch(setLoadingEmployeeContact(false));

      toast.success("YOO, YOU ROCKZ");

    } catch (error) {
      dispatch(setErrors(error.message));

      dispatch(setLoadingEmployeeContact(false));
    }
  };
};
