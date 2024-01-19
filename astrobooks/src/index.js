import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderize o aplicativo dentro de root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se você deseja medir o desempenho em seu aplicativo, pode usar a função reportWebVitals.
reportWebVitals();
