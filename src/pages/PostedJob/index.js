import React, {useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import './style.css'
import JobCard from '../../components/JobCard'
import p1 from '../../img/product-1-720x480.jpg'
import api from '../../api'
import { context, userInfo } from '../../App'
import { redirect, useNavigate } from 'react-router-dom'
import LoadingPage from '../../components/LoadingPage'
import { toast } from 'react-toastify'
export default function PostedJob() {
  const [jobs, setJobs] = useState([])
  const [login, role] = useContext(context);
  const [isLogin, setIsLogin] = login
  const [isLoading, setIsLoading] = useState(false)
  const [userInfor, setUserInfor] = useContext(userInfo)

  const navigate = useNavigate();

  useEffect( () => {
    if(!isLogin) {
      // toast.warn('Vui lòng đăng nhập')
      navigate('/')
    }
    async function getJobs() {
      setIsLoading(true)
      const token = Cookies.get('token');
      await api.get('/api/v1/jobs', 
        {
          headers: {
            'authorization': `token ${token}`
          },
        }
      ).then(res => {
        console.log(res.data.jobs)
        setJobs(res.data.jobs)
        setIsLoading(false)
      }).catch(err => console.log(err))
    }
    if(isLogin)
        getJobs()
  }, [isLogin])

  return (
    <div className='job__wrapper'>
        {isLoading && <LoadingPage />}
        <div className='container'>
          <div className='row'>
            <div className='col-12 job__container--list'>
              <div className='row'>
              {
                jobs.length ? jobs.map((job, index) => (
                  <div key={index} className='col-12 col-lg-6'>
                    <JobCard 
                      imgUrl={p1} 
                      job={job}
                      recruiterId={userInfor._id}
                    />
                  </div>
                )) : (
                  <div className='col-12'>
                    <h3 className='text-center'>User have not posted any job</h3>
                  </div>
                )
              }
              </div>           
            </div>
          </div>
        </div>
    </div>
  )
}
