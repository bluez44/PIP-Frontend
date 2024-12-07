import React, { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import './style.css'
import { context } from '../../App'
import axios from '../../api'
import { toast } from 'react-toastify'
import ProvinceList from '../../components/ProvinceList'
import LoadingPage from '../../components/LoadingPage'
export default function AddJob() {
    const [login, role] = useContext(context)
    const [isLogin, setIslogin] = login 
    const [userRole, setUserRole] = role

    const [jsonJob, setJsonJob] = useState('')

    const [newJob, setNewJob] = useState({})

    const [isShowProvinceList, setIsShowProvinceList] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        if(!isLogin) {
            navigate('/')
        }
    }, [])

    const handleInputChange = (e) => {
        const {id, value} = e.target

        setNewJob({...newJob, [id]: value})
    }

    console.log(newJob)

    const handleAddJob = () => {
        setIsLoading(true)
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
            setIsLoading(false)
            setNewJob({})
        }).catch(err => {
            console.log(err)
            toast.error(err.response.data.message)
            setIsLoading(false)
        })

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
        {isLoading && <LoadingPage />}
        <div className='row p-5 pt-0 rounded add_job__container'>
            <div className='col-12'>
                <p className='fs-2 text-uppercase text-center pt-4'>thêm tin tuyển dụng mới</p>
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>Tiêu đề</p>
                <input id='title' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Nhập tiêu đề' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>Mô tả công việc</p>
                <input id='description' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Nhập mô tả' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>Loại công việc</p>
                <select id='jobType' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Nhập loại công việc'>
                    <option value=''>Chọn loại công việc</option>
                    <option value='full-time'>Toàn thời gian</option>
                    <option value='part-time'>Bán thời gian</option>
                    <option value='contract'>Theo hợp đồng</option>
                </select>
            </div>
            <div className='col-6 position-relative'>
                <p className='text-uppercase m-0'>địa điểm làm việc</p>
                <input 
                    id='location' 
                    type='text' 
                    className='w-100 add_job__input mb-4 rounded' 
                    onChange={e => handleInputChange(e)} 
                    placeholder='Nhập địa chỉ làm việc' 
                    onFocus={() => setIsShowProvinceList(true)}
                    onBlur={() => {
                        setTimeout(() => {
                            setIsShowProvinceList(false)
                        }, 100)
                    }}
                    value={newJob?.location? newJob.location : ''}
                />
                {  isShowProvinceList && <ProvinceList isShowProvinceList={isShowProvinceList} location={newJob.location} setNewJob={setNewJob}/>}
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>yêu cầu</p>
                <input id='requirements' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Nhập yêu cầu công việc' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>lương</p>
                <input id='salary' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Nhập lương' />
            </div>
            <div className='col-6'>
                <p className='text-uppercase m-0'>trạng thái công việc</p>
                <select id='status' type='text' className='w-100 add_job__input mb-4 rounded' onChange={e => handleInputChange(e)} placeholder='Chọn trạng thái công việc'>
                    <option value=''>Chọn trạng thái</option>
                    <option value='open'>Mở</option>
                    <option value='closed'>Đóng</option>
                </select>
            </div>
            <div className='col-12 text-end'>
                <button className="btn btn-success mb-5" onClick={e => handleAddJob()}>Thêm tin tuyển dụng</button>
            </div>
        </div>
    </div>
  )
}
