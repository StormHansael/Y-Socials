import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './home/Home';
import Nav from './components/nav/nav';
import MyProfile from './myProfile/MyProfile';
import LoginReg from './login/LoginReg';
import Registrer from './components/loginReg/Registrer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/messages" element={<App />} />
        <Route path="/login" element={<LoginReg />} />
        <Route path="/registrer" element={<Registrer />} />
      </Routes>
    </Router>
  </React.StrictMode>
);