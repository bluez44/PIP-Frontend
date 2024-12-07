import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'
import MyButton from '../../components/MyButton'
import axios from '../../api'
import Cookies from 'js-cookie'
import { FaLocationDot } from "react-icons/fa6";
import { MdUpdate } from "react-icons/md";
import { FaLockOpen } from "react-icons/fa";

import job_img from '../../img/product-1-720x480.jpg'
import LoadingPage from '../../components/LoadingPage'
import { toast, ToastContainer } from 'react-toastify'
import { context } from '../../App'
import ApplyJobModal from '../../components/ApplyJobModal'
export default function JobDetails() {
    const [isLoading, setIsLoading] = useState(false)
    const [job, setJob] = useState({})
    
    const [login, role] = useContext(context)
    const [isLogin, setIsLogin] = login
    const [userRole, setUserRole] = role

    const [isShowApplyModal, setIsShowApplyModal] = useState(false)
    
    const navigate = useNavigate()
    
    const counter = useRef(0)
    
    useEffect( () => {
        //   if(!isLogin) {
            //       navigate('/')
            //   }
            
    async function getJob() {
        const jobId = window.location.search.split('=')[1]
        setIsLoading(true)
        const token = Cookies.get('token');
        await axios.get(`/api/v1/apply/getJob/${jobId}`, {
        headers: {
            'authorization': `token PkREaAQVGQAehSpcNQ63`
        },
        }).then(res => {
            if(res.data.code === 400) {
                toast.error('Không tìm thấy công việc')
            }
            setIsLoading(false)
            console.log(res.data)
            setJob(res.data.job)
        }).catch(err => console.log('err', err))
    }
    // if(isLogin)
    // if(counter.current)
        getJob()
    // else counter.current = 1
  }, [])

  const handleOnClick = () => {
    if(!isLogin) {
        toast.info('Vui lòng đăng nhập')
    }
    else {
        setIsShowApplyModal(true)
    }
  }

  return (
    <div className='job_details py-5'>
        {/* <ToastContainer /> */}
        {isLoading && <LoadingPage />}
        {isShowApplyModal && <ApplyJobModal onClick={() => setIsShowApplyModal(false)}/>}
        {
            job && 
            <div className='container shadow p-4 rounded'>
                <div className='d-flex flex-wrap gap-4 mb-5'>
                    <img 
                        className='job_img'
                        src={job_img}
                        alt='job-img'
                        height={175}
                    />
                    <div className='job_wrapper align-content-center'>
                        <h2 className='job_title'>{job.title}</h2>
                        <p className='job_salary fs-5'><span className='job_salary--number'>{job.salary}</span></p>
                        <div className='job_infor d-flex justify-content-between align-items-center gap-4'>
                            <div>
                                <FaLocationDot />
                                <span className='job_location ms-2'>{job.location}</span>
                            </div>
                            <div>
                                <MdUpdate />
                                <span className='job_date ms-2'>{job.createdAt?.split('T')[0].split('-').reverse().join('-')}</span>            
                            </div>
                            <div>
                                <FaLockOpen />
                                <span className='job_role ms-2'>{job.status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='job_content p-4 border border-black rounded mb-4'>
                    <div className='job_description'>
                        <p className='job_description--header fs-3 fw-bold'>Job Description</p>
                        <p className='job_description--content'>{job.description}</p>
                    </div>

                    <div className='job_qualifications'>
                        <p className='job_qualifications--header fs-3 fw-bold'>Requirements</p>
                        <ul className='job_qualifications--content'>
                            {
                                job?.requirements?.split('. ').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))
                            }
                            <li>Job type: {job.jobType}</li>    
                        </ul>
                    </div>
                </div>

                {job.status === 'open' && userRole == 'job-seeker' &&
                    <div className='w-25 w-md-50'>
                        <MyButton text='Ứng tuyển' rounded='pill' onClick={handleOnClick}/>
                    </div>
                }
            </div>

        }
    </div>
  )
}
