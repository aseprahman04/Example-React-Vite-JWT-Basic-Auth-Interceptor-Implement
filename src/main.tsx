import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  const credential = JSON.parse(localStorage.getItem('credentials') as string);
  if (token && credential) {
    var basicAuth = 'Basic ' + btoa(`${credential.username}:${credential.password}`);
    config.headers.Authorization = basicAuth;
  }
  return config;
});

axios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    console.log(error)
    if (401 === error.response) {
      console.log(error);
      window.location.href = '/login'
    } else {
      return Promise.reject(error);
    }
  },
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
