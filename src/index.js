import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // optional if you want styling
import MemeMaker from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MemeMaker />
  </React.StrictMode>
);
