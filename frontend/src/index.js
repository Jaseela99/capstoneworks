//browser doesnt understand react ,it gets only html css and js 
//so as to convert jsx in to js we need babel..which is already a boilerplate icluded when we create-react-app
import React from 'react';
//provides client specfic methods for initializing app on client
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//create root is a method used in client environment
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


