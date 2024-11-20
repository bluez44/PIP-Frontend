import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css'

import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Navigator from './components/Navigator/Index';
import Footer from './components/Footer'
import Home from './pages/Home';
import Jobs from './pages/Jobs';


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isJobSeeker, setIsJobSeeker] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);

  return (
    <BrowserRouter 
      future={{
        v7_startTransition: true,
      }}
    >
      <div className="App">
        <Navigator/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
        </Routes>
        <h1>THIS IS A TEXT FOR VERCEL TEST</h1>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
