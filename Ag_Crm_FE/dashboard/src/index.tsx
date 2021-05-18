import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import store from './app/store'

ReactDOM.render(
    <Provider store={store} >
      <ToastProvider placement='top-center'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </Provider> ,
  document.getElementById('root')
);