import React from 'react';
import './App.css';
import Home from './component/home/Home';
import { Routes, Route } from "react-router";
import RanChat from "./component/ranChat/RanChat";
import JoinForm from "./component/joinForm/JoinForm";
import LoginForm from "./component/login/LoginForm";
import SearchPw from "./component/SearchPW/SearchPw";
import EmailCertify from "./component/Certify/EmailCertify";
import ChangePw from "./component/SearchPW/ChangePw";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/RanChat" element={<RanChat />}/>
          <Route path="/JoinForm" element={<JoinForm />}/>
          <Route path="/LoginForm" element={<LoginForm />}/>
          <Route path="/SearchPW" element={<SearchPw />}/>
          <Route path="/ChangePw" element={<ChangePw />}/>
          <Route path="/EmailCertify" element={<EmailCertify />}/>
        </Routes>
    </div>
  );
}

export default App;
