import React,{Suspense,lazy} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Driverlist from './components/Pages/Driverlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router>
  <Routes>
    <Route path="/" element={<Suspense fallback={<Driverlist />}><App /></Suspense>} />
  </Routes>
</Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
