import { combineReducers } from '@reduxjs/toolkit'
import CompaniesSliceReducer from '../features/companies/companySlice'
import AddressesSliceReducer from '../features/addressTypes/adrressTypesSlice'
import ContactTypesSliceReducer from '../features/contactTypes/contactTypesSlice'
import ActivityTypesSliceReducer from '../features/activityTypes/activityTypesSlice'
import SectorTypesSliceReducer from '../features/sectorTypes/sectorTypesSlice'
import DimensionTypesSliceReducer from '../features/dimensionTypes/dimensionTypesSlice'
import ToastersSliceReducer from '../features/toasters/toastersSlice'
import FiltersSliceReducer from '../features/filters/filtersSlice'

const rootReducer = combineReducers({
    companies: CompaniesSliceReducer,
    addressTypes: AddressesSliceReducer,
    contactTypes: ContactTypesSliceReducer,
    activityTypes: ActivityTypesSliceReducer,
    dimensionTypes : DimensionTypesSliceReducer,
    sectorTypes: SectorTypesSliceReducer,
    toasters : ToastersSliceReducer,
    filters : FiltersSliceReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer