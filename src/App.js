import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css'

import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';

import Navigator from './components/Navigator/Index';
import Footer from './components/Footer'
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';

// Thang
import UserInfo from './pages/UserInfo';

import UserInfoPage from './pages/UserInfo/UserInfoPage';
import FormComponent from './pages/ApplyJob';


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
        {/* <Navigator/> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/job-details" element={<JobDetails/>} />

//            Thang 
          <Route path="/user-info" element={<UserInfo />} />

          <Route path='/user-infor' element={<UserInfoPage/>} />
          <Route path='/apply' element={<FormComponent />} />

        </Routes>
        {/* <Footer/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
