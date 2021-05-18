import React from 'react';
import {useRoutes}from 'react-router-dom';
import  routes  from './routes'
import './App.css';

const App = () => {
  const routing = useRoutes(routes);
  

  return (
    <div>
        {routing}
    </div>
  )
};

export default App;
