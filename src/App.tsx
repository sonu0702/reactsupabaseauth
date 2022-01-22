import React, { Component } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import SignIn from './views/signin';
import SignUp from './views/signup';
import Profile from './views/profile';
import Home from './views/home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"sign-in"} element={<SignIn />} />
        <Route path={"sign-up"} element={<SignUp />} />
        <Route path={"profile/*"} element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
