import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-slideshow-image/dist/styles.css'

import { createContext, useEffect, useState, useRef } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Cookies from 'js-cookie'

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navigator from './components/Navigator/Index';
import Footer from './components/Footer'
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import UserInfoPage from './pages/UserInfo/UserInfoPage';
import PostedJob from './pages/PostedJob';

import axios from './api'
import LoadingPage from './components/LoadingPage';
import PostedJobDetails from './pages/PostedJobDetails';
import AddJob from './pages/AddJob';

export const context = createContext();

export const userInfo = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(window.localStorage.getItem('userRole')? JSON.parse(window.localStorage.getItem('userRole')) : 'job-seeker');
  const [userInfor, setUserInfor] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const count = useRef(0)
  
  useEffect(() => {
    // window.localStorage.clear();
    // Cookies.remove('token');
    if(count.current) {
      const token = Cookies.get('token');
      if(token) {
        setIsLoading(true)
        setIsLogin(true);
        axios.get(
          `api/v1/${role}/detail`,
          {
            headers: {
              'authorization': `token ${token}`
            },
          }
        ).then(res => {
          // console.log('res.data', res.data);

          const {jobSeeker, recruiter} = res.data

          setUserInfor(jobSeeker? jobSeeker : recruiter)
          window.localStorage.setItem('userInfor', JSON.stringify(jobSeeker? jobSeeker : recruiter))
          toast.success('Đăng nhập thành công');
          setIsLoading(false)
          
        }).catch(err => {
          console.log(err)
          toast.error(err.message);
        })
      }
    }
    else count.current = 1
  }, [])

  return (
    <BrowserRouter 
      future={{
        v7_startTransition: true,
      }}
    >
      <context.Provider value={[[isLogin, setIsLogin], [role, setRole]]}>
        <userInfo.Provider value={[userInfor, setUserInfor]}>
          <div className="App">
            {isLoading && <LoadingPage />}
            <Navigator/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/jobs" element={<Jobs/>} />
              <Route path="/job-details" element={<JobDetails/>} />
              <Route path='/user-infor' element={<UserInfoPage/>} />
              <Route path='/posted-job' element={<PostedJob/>} />
              <Route path='/posted-job-details' element={<PostedJobDetails />} />
              <Route path='/add-job' element={<AddJob />} />
            </Routes>
            <Footer/>
          </div>
        </userInfo.Provider>
      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
