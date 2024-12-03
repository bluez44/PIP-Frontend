import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import './style.css'
import { context } from '../../App'
import axios from '../../api'
import { toast } from 'react-toastify'
export default function AddJob() {
    const [login, role] = useContext(context)
    const [isLogin, setIslogin] = login 
    const [userRole, setUserRole] = role

    const [jsonJob, setJsonJob] = useState('')

    const [newJob, setNewJob] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        if(!login) {
            navigate('/')
        }
    }, [])

    const handleInputChange = (e) => {
        const {id, value} = e.target

        setNewJob({...newJob, [id]: value})
    }

    console.log(newJob)

    const handleAddJob = () => {
        const token = Cookies.get('token')
        axios.post('/api/v1/jobs/create',
            newJob,
            {
                headers: {
                    'authorization': `token ${token}`
                },
            }    
        ).then(res => {
            console.log(res)
            toast.success(res.data.message)
        }).catch(err => console.log(err))
    }

    const handleAddJsonJob = () => {
        const token = Cookies.get('token')
        axios.post('/api/v1/jobs/create',
            JSON.stringify(jsonJob),
            {
                headers: {
                    'authorization': `token ${token}`
                },
            }    
        ).then(res => {
            console.log(res)
            toast.success(res.data.message)
        }).catch(err => console.log(err))
    }

  return (
    <div className='container py-5'>
        <div className='row p-5 pt-0 rounded add_job__container'>
            <div className='col-12'>
                <p className='fs-2 text-uppercase text-center'>add new job</p>
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>Title</p>
                <input id='title' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter title' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>description</p>
                <input id='description' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter description' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>job type</p>
                <input id='jobType' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter job type' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>location</p>
                <input id='location' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter location' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>requirements</p>
                <input id='requirements' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter requirements' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>salary</p>
                <input id='salary' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter salary' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>status</p>
                <input id='status' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Enter status' />
            </div>
            <div className='col-12 text-end'>
                <button className="btn btn-success mb-5" onClick={e => handleAddJob()}>Add job</button>
            </div>
        </div>
    </div>
  )
}
