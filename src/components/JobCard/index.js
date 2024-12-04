import React, {useContext} from 'react'
import MyButton from '../MyButton'
import { useNavigate } from 'react-router-dom'
import { context, userInfo } from '../../App'

import './style.css'
import { toast } from 'react-toastify'

export default function JobCard( {imgUrl, job, recruiterId} ) {
  const navigate = useNavigate()

  function handleOnClick() {
    console.log(job.recruiterId, recruiterId)
    if(recruiterId === job.recruiterId) {
      navigate(`/posted-job-details/?jobId=${job._id}`)
    } 
    else navigate(`/job-details/?jobId=${job._id}`)
  }


  return (
    <div className='job__card'>
        <div className='job__card__infor'>
            <img className='job__card__infor--img' src={imgUrl} alt='job-img'/>
            <div className='job__card__infor--location'>{job.location}</div>
        </div>

        <div className='job__card__description'>
            <p className='job__card__description--title fs-3'>{job.title}</p>
            <p className='job__card__description--salary'>{job.salary}</p>
            <p className='job__card__description--role text-uppercase'>{job.jobType} - <span className={`${job.status === 'open' ? 'text-success' : 'text-danger'}`}>{job.status}</span></p>
        </div>

        <hr/>

        <div className='job__card__button'>
            <MyButton onClick={handleOnClick} text='Xem chi tiết'/>
        </div>
    </div>
  )
}
