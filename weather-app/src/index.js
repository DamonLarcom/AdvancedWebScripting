import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const API_KEY = process.env.REACT_APP_API_KEY

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App apiKey={API_KEY}/>
  </React.StrictMode>
);
