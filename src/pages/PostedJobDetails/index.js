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
export default function PostedJobDetails() {
  const jobId = window.location.search.split('=')[1]
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState({})

  const [jobSeekers, setJobSeekers] = useState([])

  const [login, role] = useContext(context)
  const [isLogin, setIsLogin] = login
  const [userRole, setUserRole] = role

  const navigate = useNavigate()

  const counter = useRef(0)

  useEffect( () => {
      if(!isLogin) {
        toast.warn('Vui lòng đăng nhập')
        navigate('/')
      }

      if(userRole !== 'recruiter') {
        navigate('/')
      }

    async function getJob() {
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
    if(counter.current)
        getJob()
    else counter.current = 1
  }, [])


  const handleReviewResume = (id) => {
    setIsLoading(true)
    const token = Cookies.get('token');
    axios.patch(`/api/v1/jobs/review/${id}`, 
    id,
    {
        headers: {
            'authorization': `token ${token}`
        },
    }).then(res => {
        if(res.data.code === 400) {
            toast.error(res.data.message)
        }
        else {
            toast.success(res.data.message)
            setIsLoading(false)
        }
        console.log(res.data)
    }).catch(err => console.log('err', err))
  }

  const handleDelteJob = (jobId) => {
    setIsLoading(true)
    const token = Cookies.get('token');
    axios.delete(
        `/api/v1/jobs/delete/${jobId}`,
        {
            headers: {
                'authorization': `token ${token}`
            },
        }
    ).then(res => {

        setIsLoading(false)
        toast.success(res.data.message)
        navigate('/posted-job')

    }).catch(err => console.log(err))
  }

  console.log('job', job)

  return (
    <div className='job_details py-5'>
        {/* <ToastContainer /> */}
        {isLoading && <LoadingPage />}
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
                    <div className='job_infor d-flex justify-content-between align-items-center gap-2'>
                        <div>
                            <FaLocationDot />
                            <span className='job_location ms-2'>{job.location}</span>
                        </div>
                        <div>
                            <MdUpdate />
                            <span className='job_date ms-2'>{job.createdAt}</span>            
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

            <div className='job_content p-4 border border-black rounded mb-4'>
                <div className='job_description'>
                    <p className='job_description--header fs-3 fw-bold'>Applicants list</p>
                    {
                        job?.resumes && job.resumes.map((resume, index) => (
                            <div className=' p-4 rounded border-bottom d-flex' key={index}>
                                <div className='flex-grow-1 flex-shrink-1'>
                                    <p>{resume.degree}</p>
                                    <div>
                                        <ul>
                                            {
                                                resume?.skills.split(',').map((skill, index) => (
                                                    <li key={index}>{skill}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className='d-flex gap-2 align-self-end' style={{maxHeight: '50px'}}>
                                    <button className='btn btn-success' onClick={e => handleReviewResume(resume._id)}>Accept</button>
                                    <button className='btn btn-danger'>Deny</button>
                                </div>
                            </div>
                        ) )
                    }
                </div>
            </div>

            <div className='text-center'>
                <button className='btn btn-danger' onClick={e => handleDelteJob(jobId)}>Delte this job</button>
            </div>
        </div>
    </div>
  )
}
