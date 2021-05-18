import { string } from "yup"

export interface IBaseState {
  loading: boolean,
  errors: string
}

export type Company = { 
  id: string,
  name: string, 
  fiscalCode: string, 
  pIva : string,
  province : string,
  city: string,
  address: string,
  cap: string,
  contractType: string,
  subScriptionType: string,
  subScriptionDate: Date,
  addresses? : [CompanyAddress],
  employees? : [CompanyEmployee],
  activities? : [CompanyActivity],
  dimensions? : [CompanyDimension],
  employeesOverViews? : [CompanyEmployeesOverView]
}

export type BaseAppConfig = {
  baseUrl : {
      api : string,
      app: string
  }
}

type BaseAddress = {
  id: string,
  addressType: string, 
  value : string,
  isRemoved : boolean
}

export type ReferenceBaseTypeState  = {
  loading: boolean,
  errors: string
}

export type ReferenceBaseType = { 
  id: string,
  name: string, 
}

export interface AddressType extends ReferenceBaseType { }

export interface ContactType extends ReferenceBaseType { }

export interface ActivityType extends ReferenceBaseType { }

export interface SectorType extends ReferenceBaseType { }

export interface DimensionType extends ReferenceBaseType {
  contractType : string,
  fee : number
}

export interface CompanyAddress extends BaseAddress { }

export interface EmployeeContact extends BaseAddress { }

export type CompanyActivity = {
  id : string,
  sectorType : string,
  activityType : string,
  value : boolean,
  isRemoved : boolean
}

export type CompanyEmployee= { 
  id: string,
  name :string,
  surname: string, 
  contactType : string,
  contacts? : [EmployeeContact]
  isRemoved : boolean
}

export type CompanyEmployeesOverView = { 
  id: string,
  contractLevelType : string,
  employees : number,
  isRemoved : boolean
}

export type CompanyDimension = {
  id : string,
  dimensionType : string,
  fee : number,
  isRemoved : boolean
}

export interface Notification {
  id: number,
  type : string,
  message : string,
  read : boolean
}