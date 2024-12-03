import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import './style.css'
import axios from '../../api'
import LoadingPage from '../LoadingPage'
import { toast } from 'react-toastify'

export default function ApplyJobModal({ onClick }) {
  const [resumes, setResumes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const jobId = window.location.search.split('=')[1]

  const handleApply = (resumeId) => {
    const token = Cookies.get('token')

    axios.patch(
        `/api/v1/apply/${jobId}/${resumeId}`,
        jobId,
        {
            headers: {
                'authorization': `token ${token}`
            },
        }
    ).then(res => {
        if(res.data.code === 200) {
            onClick()
            console.log(res)
            toast.success('Ứng tuyển thành công!')
        }
        else {
            toast.error('Có lỗi! Vui lòng thử lại sau')
        }
    }).catch(err => {
        console.log(err)
    })
  }


  useEffect(() => {
    const token = Cookies.get('token')
    setIsLoading(true)
    axios.get(
        `/api/v1/apply/pick/${jobId}`,
        {
            headers: {
                'authorization': `token ${token}`
            },
        }
    ).then(res => {
        console.log(res)
        setIsLoading(false)
        setResumes(res.data.resumes)
    }).catch(err => console.log(err))
  }, [])

  return (
    
    isLoading ? 
        <LoadingPage/ > 
        :
        <div className='apply_job_modal d-flex justify-content-center align-items-center' onClick={onClick}>
            <div className='container apply_job_container rounded' onClick={e =>e.stopPropagation()}>
                <p className='fs-2 text-center'>Chose suitable resume</p>
                <ul className='resumes_list p-0 m-0 rounded'>
                    {
                        resumes.map((resume, index) => (
                            <li key={index} className='text-center resumes_list_item' onClick={e => handleApply(resume._id)}>{resume.degree}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    
    
  )
}
