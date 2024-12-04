import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './UserInfoPage.css';
import { context } from '../../App';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from '../../api';
import LoadingPage from '../../components/LoadingPage';
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import ResumeModal from '../../components/ResumeModal';

const UserInfoPage = () => {
    // const [userInfor, setUserInfor] = useContext(userInfo)
    const [login, role] = useContext(context)
    const [isLogin, setIsLogin] = login
    const [resumes, setResumes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [provinces, setProvinces] = useState([])
    const [filtedProvinces, setFiltedProvinces] = useState([])
    const [isShowProvinceList, setIsShowProvinceList] = useState(false)

    const [userInfor, setUserInfor] = useState(JSON.parse(window.localStorage.getItem('userInfor')));
    const userRole = JSON.parse(window.localStorage.getItem('userRole'));

    const [modalShow, setModalShow] = useState(false)
    const [resumeToShow, setResumeToShow] = useState({})
    const [resumeModalType, setResumeModalType] = useState('normal')

    const [isEditing, setIsEditing] = useState(false);

    const address_input = useRef()

    useMemo(() => {

        const newProvinces = provinces.filter((province) => province.name.toLowerCase().includes(userInfor.address?.toLowerCase()))

        setFiltedProvinces(newProvinces)

        // console.log(newProvinces)
        // console.log(userInfor.address)
    }, [provinces, userInfor.address])

    const navigate = useNavigate()

    useEffect(() => {
        async function getResumes() {
            const token = Cookies.get('token');
            console.log('get resumes')
            await axios.get('/api/v1/resumes', 
            {
                headers: {
                    'authorization': `token ${token}`
                },
            }
            ).then(res => {
                console.log('res.data.resumes', res.data.resumes)
                setResumes(res.data.resumes)
                setIsLoading(false)
            }).catch(err => console.log(err))

        }

        async function getProvinces() {
            await fetch('https://provinces.open-api.vn/api')
            .then(response => response.json())
            .then(json => setProvinces(json))
            .catch(err => console.log(err))
        }

        
        if(isLogin && userRole === 'job-seeker') {
            setIsLoading(true)

            getResumes()

            getProvinces()

        }

    }, [isLogin, userRole])

    // console.log(provinces)

    useEffect(() => {
        const token = Cookies.get('token');
        if(!token) {
            // toast.warn('Vui lòng đăng nhập')
            navigate('/')
        }
    })

    const handleDeleteResume = (id, index) => {
        const token = Cookies.get('token')
        axios.delete(
            `/api/v1/resumes/delete/${id}`,
            {
                headers: {
                    'authorization': `token ${token}`
                },
            }
        ).then(res => {
            console.log(res)
            
            const newResume = resumes
            newResume.splice(index, 1)

            setResumes([...newResume])

            toast.success('Xóa hồ sơ thành công')

        }).catch(err => console.log(err))                                                                                                          
    }

    const handleCancel = () => {
        setIsEditing(false);
        setUserInfor(JSON.parse(window.localStorage.getItem('userInfor')));
    }

    const handleAddressChange = (addr) => {
        // address_input.current.focus()
        setIsShowProvinceList(false)
        const value  = addr;
        setUserInfor({ ...userInfor, address: value });
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInfor({ ...userInfor, [id]: value });
    };

    // console.log(userInfor)
    console.log(resumeToShow)

    return (
        <div className="user-info-page">
            {isLoading && <LoadingPage />}
            <div className="group-container">
                {/* User Card */}
                <div className="user-card">
                    <div className="user-avatar"></div>
                    <div className="user-details">
                        <h2>{userInfor?.fullName}</h2>
                        <p 
                            className="email"
                        >
                            {userInfor?.email}
                        </p>
                        <button className="edit-email-link">✏️</button>
                    </div>
                    {
                        isEditing ? (
                            <div>
                                <button 
                                    className="btn btn-success me-2"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Lưu
                                </button>
                                <button 
                                    className="btn btn-danger"
                                    onClick={handleCancel}
                                >
                                    Hủy
                                </button>
                            </div>
                            
                        ) : (
                            <button 
                                className="btn btn-warning"
                                onClick={() => setIsEditing(true)}
                            >
                                Chỉnh sửa thông tin
                            </button>
                        )
                    }
                </div>

                {/* Info Groups */}
                <div className="info-groups">
                    <div className="info-group">
                        <label htmlFor="fullName">Họ và tên</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Họ và tên của bạn"
                            value={userInfor ? userInfor.fullName : ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    {userRole !== 'recruiter' &&
                        <div className={`info-group position-relative address_group`}
                        >
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                ref={address_input}
                                type="text"
                                id="address"
                                placeholder=""
                                value={userInfor ? userInfor.address : ''}
                                onChange={handleInputChange}
                                onFocus={() => setIsShowProvinceList(true)}
                                onBlur={() => {
                                    
                                    setTimeout(() => {
                                        console.log('blur')
                                        setIsShowProvinceList(false)
                                    }, 50)
                                }}
                                disabled={!isEditing}
                            />
                            {isShowProvinceList && 
                                <ul className='provinces_list position-absolute w-100'>
                                    {
                                        filtedProvinces.map(province => (
                                            <li className='provinces_item' 
                                                key={province.code} 
                                                onClick={e => handleAddressChange(province.name)}
                                            >
                                                {province.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            }
                        </div>
                    }
                    <div className="info-group">
                        <label htmlFor="age">Tuổi</label>
                        <input
                            type="number"
                            id="age"
                            value={userInfor ? userInfor.age : 0}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="info-group">
                        <label htmlFor="gender">Giới tính</label>
                        <select id="gender" value={userInfor ? userInfor.gender : ""} disabled={!isEditing} onChange={handleInputChange}>
                            <option value="female">Nữ</option>
                            <option value="male">Nam</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    {userRole === 'recruiter' &&
                        <div className="info-group">
                            <label htmlFor="company">Tên công ty</label>
                            <input
                                type="text"
                                id="company"
                                placeholder="Tên công ty"
                                value={userInfor? userInfor.company : ""}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                    }

                    <div className="info-group">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Số điện thoại của bạn"
                            value={userInfor ? userInfor.phone : ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                    </div>

                    {userRole !== 'recruiter' &&
                        <div className="info-group">
                            <label htmlFor="status">Trạng thái</label>
                            <select id="status" value={userInfor ? userInfor.status : ""} disabled={!isEditing} onChange={handleInputChange}>
                                <option value="finding">Tìm kiếm việc làm</option>
                                <option value="accepted">Đã có việc làm</option>
                            </select>
                        </div>
                    }

                    {userRole !== 'recruiter' &&
                        <div className="info-group">
                            <p>Hồ sơ của tôi</p>
                            <ul className='resume_list'>
                                {
                                    resumes.map((resume, index) => (
                                        <li key={index} className='resume_item position-relative d-flex justify-content-between'>
                                            <span 
                                                className='resume_item--name' 
                                                onClick={() => {
                                                    setModalShow(true)
                                                    setResumeToShow(resume)
                                                    setResumeModalType('normal')
                                            }}
                                            >
                                                {resume.degree}
                                            </span>
                                            {
                                                isEditing && 
                                                <div className='resume_item--icon' onClick={e => handleDeleteResume(resume._id, index)}>
                                                    <MdDeleteForever className='' size={20}/>
                                                </div>
                                            }
                                        </li>
                                    ))
                                }
                            </ul>
                            {modalShow && 
                                <ResumeModal 
                                    type={resumeModalType} 
                                    resume={resumeToShow} 
                                    show={modalShow} 
                                    handleClose={() => setModalShow(false)}
                                    setResumes={setResumes}
                                    resumeIndex={resumes.indexOf(resumeToShow)}
                                />}
                            {isEditing &&
                                <div 
                                    className='d-flex justify-content-center align-items-center gap-2 add_resume'
                                    onClick={e => {
                                        setModalShow(true)
                                        setResumeModalType('add')
                                    }}
                                >
                                    <span>Thêm hồ sơ</span>
                                    <IoAddCircleOutline className='mt-1'/>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserInfoPage;
