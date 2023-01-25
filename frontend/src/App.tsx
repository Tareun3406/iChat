import React from 'react';
import './App.css';
import Home from './component/home/Home';
import { Routes, Route } from "react-router";
import RanChat from "./component/ranChat/RanChat";
import JoinForm from "./component/joinForm/JoinForm";
import LoginForm from "./component/login/LoginForm";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/RanChat" element={<RanChat />}/>
          <Route path="/JoinForm" element={<JoinForm />}/>
          <Route path="/LoginForm" element={<LoginForm />}/>
        </Routes>
    </div>
  );
}

export default App;
