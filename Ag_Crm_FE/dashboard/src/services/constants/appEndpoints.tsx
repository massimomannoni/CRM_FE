export const ENDPOINTS = {
    auth: {
        login: '/accounts/v1.0/auth'
    },
    user: {
        settings: '/accounts/v1.0/user'
    },
    companies: {
        base: '/v1.0/companies',
        details: '/v1.0/companies/{companyId}',
        addresses: 
        {
            base :'/v1.0/companies/{companyId}/addresses',
            address :'/v1.0/companies/{companyId}/addresses/{addressId}'
        },
        activities: 
        {
            base :'/v1.0/companies/{companyId}/activities',
            activity :'/v1.0/companies/{companyId}/activities/{activityId}'
        },
        dimensions: 
        {
            base :'/v1.0/companies/{companyId}/dimensions',
            dimension :'/v1.0/companies/{companyId}/dimensions/{dimensionId}'
        },
        employeesOverViews: 
        {
            base :'/v1.0/companies/{companyId}/employeesOverViews',
            employeesOverView :'/v1.0/companies/{companyId}/employeesOverViews/{employeesOverViewId}'
        },
        employees: 
        {
            base :'/v1.0/companies/{companyId}/employees',
            employee :'/v1.0/companies/{companyId}/employees/{employeeId}',
            contacts : '/v1.0/companies/{companyId}/employees/{employeeId}/contacts',
            contact : '/v1.0/companies/{companyId}/employees/{employeeId}/contacts/{contactId}'
        }
    },
    addressTypes: {
        base: '/v1.0/addressTypes'
    },
    activityTypes: {
        base: '/v1.0/activityTypes'
    },
    sectorTypes: {
        base: '/v1.0/sectorTypes'
    },
    contactTypes: {
        base: '/v1.0/contactTypes'
    },
    dimensionTypes: {
        base: '/v1.0/dimensionTypes'
    }
};