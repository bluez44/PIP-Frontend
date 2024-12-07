import React, { useContext, useEffect, useState, useMemo } from 'react'
import Cookies from 'js-cookie';
import { context, userInfo } from '../../App';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import logo from '../../img/logo.png'
import './style.css'
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import MyButton from '../MyButton';
import axios from '../../api'

export default function Navigator() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalState('chose_account');
  }
  const handleShowModal = () => setShowModal(true);

  const [modalState, setModalState] = useState('chose_account');
  const modalStates = ['sigup','chose_account', 'login', 'forgot_password'];

  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [OTP, setOTP] = useState('')
  const [isOTPSuccess, setIsOTPSuccess] = useState(false)

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [login, role] = useContext(context);
  const [isLogin, setIsLogin] = login;
  const [userRole, setUserRole] = role;

  const [passwordType, setPasswordType] = useState('password')

  // !-----------------------------------------------------------------
  const [newUser, setNewUser] = useState({
    gender: 'male'
  })

  const [provinces, setProvinces] = useState([])
  const [filtedProvinces, setFiltedProvinces] = useState([])
  const [companyFiltedProvinces, setCompanyFiltedProvinces] = useState([])
  const [isShowProvinceList, setIsShowProvinceList] = useState(false)

  const handleNewUserData = (e) => {
    const {id, value} = e.target
    setNewUser({...newUser, [id]: value})
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isResetPassword, setIsResetPassword] = useState(false)

  const [userInfor, setUserInfor] = useContext(userInfo)

  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove('token')
    window.localStorage.clear()
    setIsLogin(false);
    setUserRole('');
    setUserInfor('')
    toast.info('Đăng xuất thành công')
    navigate('/')
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post(
      `/api/v1/${userRole}/register`,
      newUser
    ).then(res => {
      console.log(res)
      if(res.data.code === 400) {
        toast.error(res.data.message)
      }
      else {
        toast.success(res.data.message)
        setNewUser({})
        setModalState('chose_account')
      }
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
      setIsLoading(false)
      // toast.error(err.response.data.message)
    })
  }

  
  const handleAddressChange = (addr) => {
    const value  = addr;
    setNewUser({...newUser, address: value });
  }
  
  const handleCompanyAddressChange = (addr) => {
    // setIsShowProvinceList(false)
    const value  = addr;
    setNewUser({...newUser, addressOfCompany: value });
  }
  
  console.log('provinces', provinces)
  
  useEffect(() => {
    if(isShowProvinceList) {
      async function getProvinces() {
        await fetch('https://provinces.open-api.vn/api')
        .then(response => response.json())
        .then(json => setProvinces(json))
        .catch(err => console.log(err))
      }
      getProvinces()
    }
  }, [isShowProvinceList])

  useMemo(() => {
    const newCompanyProvinces = provinces.filter((province) => province.name.toLowerCase().includes(newUser?.addressOfCompany?.toLowerCase() || ''))

    setCompanyFiltedProvinces(newCompanyProvinces)
}, [provinces, newUser.addressOfCompany])

  useMemo(() => {

    const newProvinces = provinces.filter((province) => province.name.toLowerCase().includes(newUser?.address?.toLowerCase() || ''))

    setFiltedProvinces(newProvinces)

}, [provinces, newUser.address])

  // !----------------------------------------------------------------

  const handleLogin = async (e) => {
    if(userName && password) {
      setIsLoading(true)
      await axios.post(
        `/api/v1/${userRole}/login`,
        {
          email: userName,
          password
        }
      ).then(res => {
        // console.log('res.data', res.data);
        if(res.data.code === 400) {
          toast.error(res.data.message);
        }
        else {
          toast.success('Thông tin đăng nhập hợp lệ');
          const token = res.data.token;
          Cookies.set('token', token, { expires: 7, secure: true });
          window.localStorage.setItem('userRole', JSON.stringify(userRole))

        }

      }).catch(err => {
        console.log(err);
        toast.error(err.message);
        setIsLoading(false)
      })

      const token = Cookies.get('token');
      await axios.get(
        `api/v1/${userRole}/detail`,
        {
          headers: {
            'authorization': `token ${token}`
          },
        }
      ).then(res => {
        // console.log('res.data', res.data);
        if(res.data.code === 400) {
          toast.error(res.data.message);
        }
        else {
          const {jobSeeker, recruiter} = res.data
  
          setUserInfor(jobSeeker? jobSeeker : recruiter)
          window.localStorage.setItem('userInfor', JSON.stringify(jobSeeker? jobSeeker : recruiter))
          handleCloseModal();
          toast.success('Đăng nhập thành công');
          setIsLogin(true)
  
          setUserName('');
          setPassword('');
        }

      }).catch(err => {
        console.log(err)
        toast.error(err.message);
      })
      setIsLoading(false)
      
      e.preventDefault();
    }
  }


  // !----------------------------------------------------------------
  
  const handleSendOTP = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post(
      `/api/v1/${userRole}/password/forgot`,
      {
        email: forgotEmail
      }
    ).then(res => {
      console.log(res)
      if(res.data.code === 400) {
        toast.error(res.data.message)
      }
      else {
        toast.success(res.data.message)
        setOTP(res.data.otp)
      }
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
      toast.error(err.message)
      setIsLoading(false)
    })

    await axios.post(
      `/api/v1/${userRole}/password/otp`,
      {
        email: forgotEmail,
        otp: OTP
      }
    ).then(res => {
      console.log(res)
      if(res.data.code === 400) {
        toast.error(res.data.message)
      }
      else {
        toast.success(res.data.message)
        setIsOTPSuccess(true)
        Cookies.set('token', res.data.token, { expires: 7, secure: true })
      }
      setIsLoading(false)
    }).catch(err => {
      console.log(err)
      toast.error(err.message)
    })
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsResetPassword(true)
    await axios.post(
      `/api/v1/${userRole}/password/reset`,
      {
        password: newPassword,
        token: Cookies.get('token')
      }
    ).then(res => {
      console.log(res)
      if(res.data.code === 400) {
        toast.error(res.data.message)
      }
      else {
        toast.success(res.data.message)
        setIsOTPSuccess(false)
      }
      setIsResetPassword(false)
    }).catch(err => {
      console.log(err)
      toast.error(err.message)
    })
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <ToastContainer/>
      <Container className=''>
        <div className='d-flex justify-content-between align-items-center w-100 flex-lg-row flex-column'>
          <Navbar.Collapse id="basic-navbar-nav" className='flex-grow-1 flex-shrink-1'>
            <Nav className="me-auto flex-md-row flex-row flex-wrap flex-md-nowrap align-items-center justify-content-center">
              <Link className='navbar__logo' to="/">
                <img src={logo} alt='Logo' style={{width: 50, height: 50}}/>
              </Link>
              <Link className='navbar__button' to="/">Trang chủ</Link>
              <Link className='navbar__button' to="/jobs">Công việc hiện có</Link>
              {userRole === 'recruiter' && isLogin && <Link className='navbar__button' to="/posted-job">Tin tuyển dụng đã đăng</Link>}
              {userRole === 'recruiter' && isLogin && <Link className='navbar__button' to="/add-job">Đăng tin mới</Link>}
              {isLogin && <Link className='navbar__button' to="/user-infor">Trang cá nhân</Link>}
            </Nav>
          </Navbar.Collapse>

          <Dropdown className='align-self-end d-lg-none position-absolute top-50 end-0 translate-middle-y z-3' drop='start'>
            <Dropdown.Toggle variant="" id="dropdown-basic" className='fs-1 d-flex justify-content-center align-items-center'>
              <FaList />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom' to="/">Trang chủ</Link>
              <Link className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom' to="/jobs">Công việc hiện có</Link>
              {userRole === 'recruiter' && isLogin && <Link className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom' to="/posted-job">Tin tuyển dụng đã đăng</Link>}
              {userRole === 'recruiter' && isLogin && <Link className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom' to="/add-job">Đăng tin mới</Link>}
              {isLogin && <Link className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom' to="/user-infor">Trang cá nhân</Link>}
              {
                isLogin? 
                    <div className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom' onClick={handleLogout}>Đăng xuất</div>
                  : 
                    <div onClick={handleShowModal} className='h-auto lh-1 navbar__button py-3  w-100 d-inline-block border-bottom'>Đăng nhập</div>
              }
            </Dropdown.Menu>
          </Dropdown>
          {
            isLogin? 
                <div className='position-relative logout__container text-center py-3'>
                  <h4 className='logout__text'>Xin chào, {userInfor?.fullName}</h4>
                  <div className='action_container rounded bg-light'>
                    <div onClick={handleLogout} className='navbar__button action__button'>Đăng xuất</div> 
                    <div className='navbar__button action__button' onClick={() => navigate('/user-infor')}>Thông tin cá nhân</div>
                  </div>
                </div>
              : 
                <div onClick={handleShowModal} className='navbar__button'>Đăng nhập</div>
          }
        </div>

        

        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header className='justify-content-center position-relative'>
              <img src={logo} alt='Logo' style={{width: 200, height: 200}}/>
              {modalState !== 'chose_account' &&
                <div 
                  className='position-absolute top-0 start-0 return_button rounded'
                  onClick={() => {
                    if(modalState === 'signup') setModalState('chose_account');
                    else {
                      setModalState(prevState => modalStates[modalStates.indexOf(prevState) - 1])
                    }
                  }}
                >
                  <IoReturnUpBack />
                </div>
              }
          </Modal.Header>
          <Modal.Body className=''>
              {modalState === 'signup' &&
              <div id='signup' className='row'>
                <p className='fs-5 fw-semibold text-center col-12'>Đăng ký tài khoản mới</p>
                <Form className='text-end col-12'>
                  <div className='row'>
                    <Form.Group className="mb-3 form_input text-start" controlId="fullName">
                      <Form.Group className="mb-3 form_input text-start" controlId="role">
                        <Form.Label>Loại tài khoản</Form.Label>
                        <select id='role' className="form-select" aria-label="Default select example" required
                          onChange={(e) => setUserRole(e.target.value)}
                          onInvalid={(e) => e.target.setCustomValidity('Vui lòng chọn loại tài khoản')}
                          onInput={(e) => e.target.setCustomValidity('')}
                          value={userRole? userRole : ''}
                        >
                          <option value='recruiter'>Nhà tuyển dụng</option>
                          <option value="job-seeker">Người tìm việc</option>
                        </select>
                      </Form.Group>
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập họ và tên"
                        autoFocus
                        required
                        value={newUser?.fullName? newUser.fullName : ''}
                        onChange={(e) => handleNewUserData(e)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập đầy đủ họ và tên')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form_input text-start" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Nhập email đăng ký"
                        required
                        value={newUser?.email? newUser.email : ''}
                        onChange={(e) => handleNewUserData(e)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập email của bạn')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form_input text-start col-6" controlId="age">
                      <Form.Label>Tuổi</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nhập tuổi của bạn"
                        required
                        value={newUser?.age? newUser.age : ''}
                        onChange={(e) => handleNewUserData(e)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập tuổi của bạn')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 form_input text-start  col-6" controlId="gender">
                      <Form.Label>Giới tính</Form.Label>
                      <select id='gender' className="form-select" aria-label="Default select example" required
                        // onChange={(e) => handleNewUserData(e)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng chọn giới tính')}
                        onInput={(e) => {e.target.setCustomValidity('')
                          handleNewUserData(e)
                        }}
                        value={newUser?.gender? newUser.gender : ''}
                      >
                        <option value='male'>Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </Form.Group>
                    <Form.Group className="mb-3 form_input text-start" controlId="phone">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        required
                        value={newUser?.phone? newUser.phone : ''}
                        onChange={(e) => handleNewUserData(e)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập số điện thoại')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </Form.Group>
                    { userRole === 'recruiter' &&
                      <Form.Group className="mb-3 form_input text-start" controlId="company">
                        <Form.Label>Tên công ty</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên công ty"
                          required
                          value={newUser?.company? newUser.company : ''}
                          onChange={(e) => handleNewUserData(e)}
                          onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập tên công ty')}
                          onInput={(e) => e.target.setCustomValidity('')}
                        />
                      </Form.Group>
                    }
                    {userRole === 'job-seeker' && 
                    <Form.Group className="mb-3 form_input text-start position-relative" controlId="address">
                      <Form.Label>Địa chỉ nhà</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ của bạn"
                        required
                        value={newUser?.address? newUser.address : ''}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập địa chỉ cá nhân')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        onFocus={() => setIsShowProvinceList(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                console.log('blur')
                                setIsShowProvinceList(false)
                            }, 100)
                        }}
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
                    </Form.Group>
                    }
                    {userRole === 'recruiter' && 
                    <Form.Group className="mb-3 form_input text-start position-relative" controlId="addressOfCompany">
                      <Form.Label>Địa chỉ công ty</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập địa chỉ công ty"
                        required
                        value={newUser?.addressOfCompany? newUser.addressOfCompany : ''}
                        onChange={(e) => handleCompanyAddressChange(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity("Vui lòng nhập địa chỉ công ty")}
                        onInput={(e) => e.target.setCustomValidity('')}
                        onFocus={() => setIsShowProvinceList(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                console.log('blur')
                                setIsShowProvinceList(false)
                            }, 100)
                        }}
                      />
                      {isShowProvinceList && 
                          <ul className='provinces_list position-absolute w-100'>
                              {
                                  companyFiltedProvinces.map(province => (
                                      <li className='provinces_item' 
                                          key={province.code} 
                                          onClick={e => handleCompanyAddressChange(province.name)}
                                      >
                                          {province.name}
                                      </li>
                                  ))
                              }
                          </ul>
                      }
                    </Form.Group>
                    }
                    <Form.Group className="mb-3 form_input text-start" controlId="password">
                      <Form.Label>Mật khẩu</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu"
                        required
                        value={newUser?.password? newUser.password : ''}
                        onChange={(e) => handleNewUserData(e)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập mật khẩu')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </Form.Group>
                    <MyButton text='Đăng ký' type='submit' onClick={e => handleSignup(e)} disable={isLoading}/>
                    {
                      isLoading && 
                      <div className='text-center loading-icon'>
                        <AiOutlineLoading3Quarters />
                      </div>
                    }
                  </div>
                </Form>
              </div>
              }

              {modalState === 'chose_account' &&
              <div id='chose_account' className='text-center'>
                <p className='fs-5 fw-semibold'>Đăng nhập sử dụng tài khoản</p>
                <MyButton text='Nhà tuyển dụng' onClick={() => {setUserRole('recruiter'); setModalState('login')}}/>
                <MyButton text='Người tìm việc' onClick={() => {setUserRole('job-seeker'); setModalState('login')}}/>
                <Button className='mb-3' variant='link' onClick={() => setModalState('signup')} >Đăng ký tài khoản mới</Button>
              </div>
              }

              {modalState === 'login' &&
              <div id='login' className='fadeIn position-relative'>
                <p className='fs-5 fw-semibold text-center'>Đăng nhập sử dụng tài khoản {userRole === 'recruiter' ? 'nhà tuyển dụng' : 'người tìm việc'}</p>
                <Form className='text-end'>
                  <Form.Group className="mb-3 form_input text-start" controlId="loginForm.Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập username"
                      autoFocus
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập tài khoản')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form_input text-start"
                    controlId="loginForm.Password"
                  >
                    <Form.Label>Mật khẩu</Form.Label>
                    <div className='position-relative'>
                      <Form.Control 
                        type={passwordType}
                        placeholder='Nhập mật khẩu'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onInvalid={(e) => e.target.setCustomValidity('Vui lòng nhập mật khẩu')}
                        onInput={(e) => e.target.setCustomValidity('')}
                        autoComplete='off'
                      />
                      {passwordType === 'password'? 
                        <div className='position-absolute end-0 pe-2 top-50 translate-middle-y password-toggle'>
                          <FaRegEye className='' onClick={e => setPasswordType('text')}/>
                        </div> 
                        : 
                        <div className='position-absolute end-0 pe-2 top-50 translate-middle-y password-toggle'>
                          <FaRegEyeSlash onClick={e => setPasswordType('password')}/>
                        </div>
                      }
                    </div>
                  </Form.Group>
                  <Button className='mb-3' variant='link' onClick={() => setModalState('forgot_password')} >Quên mật khẩu</Button>
                  <MyButton text='Đăng nhập' type='submit' onClick={e => handleLogin(e)} disable={isLoading}/>
                  {
                    isLoading && 
                    <div className='text-center loading-icon'>
                      <AiOutlineLoading3Quarters />
                    </div>
                  }
                </Form>
              </div>
              }

              {modalState === 'forgot_password' &&
              <div id='forgot_password' className='fadeIn'>
                <p className='fs-5 fw-semibold text-center'>Quên mật khẩu</p>
                <Form className='text-end'>
                  <Form.Group className="mb-3 form_input text-start" controlId="forgotForm.Username">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      autoFocus
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form_input text-start"
                    controlId="forgotForm.OTP"
                  >
                    <Form.Label>OTP</Form.Label>
                    <Form.Control 
                      type='text'
                      placeholder='Nhập mã OTP'
                      value={OTP}
                      readOnly
                    />
                  </Form.Group>
                  {/* <p className='text-success text-center'>Đã gửi OTP đến gmail của bạn</p> */}
                  {
                  isLoading ? 
                  <div className='text-center loading-icon'>
                    <AiOutlineLoading3Quarters />
                  </div> :                                          
                  <MyButton 
                    disable={forgotEmail === ''} 
                    text='Nhận mã OTP' 
                    type='submit' 
                    onClick={(e) => {
                      handleSendOTP(e)
                    }}
                  />
                  }
                  <Button variant='link'>Gửi lại OTP</Button>
                  {isOTPSuccess && <p className='text-success text-center'>Xác thực OTP thành công</p>}
                  {isOTPSuccess && 
                  <Form.Group
                    className="mb-3 form_input text-start"
                    controlId="forgotForm.ResetPassword"
                  >
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control 
                      type='password'
                      placeholder='Nhập mật khẩu mới'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>}
                  {isOTPSuccess && 
                  !isResetPassword &&
                  <MyButton onClick={e => handleResetPassword(e)} text='Sử dụng mật khẩu mới'/>
                  }
                  {
                    isResetPassword && 
                    <div className='text-center loading-icon'>
                      <AiOutlineLoading3Quarters />
                    </div>
                  }
                </Form>
              </div>
              }
          </Modal.Body>
        </Modal>

        
      </Container>
    </Navbar>
  )
}
