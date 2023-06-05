
import './App.css';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Page from './components/Page';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="details" element={<Page/>}/>
    </Routes>
   </Router>
  );
}

export default App;
