import React from 'react';
import './App.css';
import Home from './Home';
import { Routes, Route } from "react-router";
import RanChat from "./RanChat";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/RanChat" element={<RanChat />}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
