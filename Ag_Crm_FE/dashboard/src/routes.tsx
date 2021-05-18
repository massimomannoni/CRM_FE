import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from  '../src/layouts/DashBoardLayout';
import MainLayout from '../src/layouts/MainLayout';
import DashBoardView from './views/Report/DashboardView';
import CompanyListView from './views/Company/ListView';
import CompanyCreateView from './views/Company/CreateView';
import CompanyEditView from './views/Company/EditView';

const routes = [
  {
    path: '/crm',
    element: <DashboardLayout />,
    children: [
        { path: '/', element: <DashBoardView /> },
        { path: 'companies', element: <CompanyListView/>},
        { path: 'dashboard', element: <DashBoardView /> }
    ]
  },
  {
    path: '/crm/company',
    element: <DashboardLayout />,
    children: [
        { path: '/', element: <CompanyCreateView /> },
        { path: '/:id', element: <CompanyEditView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
        { path: '*', element: <Navigate to="/crm/dashboard" /> }
    ]
  }
]

export default routes;
