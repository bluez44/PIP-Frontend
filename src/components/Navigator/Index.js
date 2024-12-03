import React, { useContext, useState } from 'react'
import Cookies from 'js-cookie';
import { context, userInfo } from '../../App';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import logo from '../../img/logo.png'
import './style.css'
import { Modal, Button, Form } from 'react-bootstrap';
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
  const modalStates = ['chose_account', 'login', 'forgot_password'];

  const [forgotEmail, setForgotEmail] = useState('');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [login, role] = useContext(context);
  const [isLogin, setIsLogin] = login;
  const [userRole, setUserRole] = role;

  const [passwordType, setPasswordType] = useState('password')

  const [isLoading, setIsLoading] = useState(false)

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


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <ToastContainer/>
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='navbar__logo' to="/">
              <img src={logo} alt='Logo' style={{width: 50, height: 50}}/>
            </Link>
            <Link className='navbar__button' to="/">Home</Link>
            <Link className='navbar__button' to="/jobs">Jobs</Link>
            {userRole === 'recruiter' && isLogin && <Link className='navbar__button' to="/posted-job">Posted jobs</Link>}
            {userRole === 'recruiter' && isLogin && <Link className='navbar__button' to="/add-job">Add new job</Link>}
            {isLogin && <Link className='navbar__button' to="/user-infor">My page</Link>}
          </Nav>
        </Navbar.Collapse>

        {
          isLogin? 
              <div className='position-relative logout__container'>
                <h4 className='logout__text'>Xin chào, {userInfor?.fullName}</h4>
                <div className='action_container rounded'>
                  <div onClick={handleLogout} className='navbar__button action__button'>Logout</div> 
                  <div className='navbar__button action__button' onClick={() => navigate('/user-infor')}>Thông tin cá nhân</div>
                </div>
              </div>
            : 
              <div onClick={handleShowModal} className='navbar__button'>Login</div>
        }

        

        <Modal centered show={showModal} onHide={handleCloseModal}>
          <Modal.Header className='justify-content-center position-relative'>
              <img src={logo} alt='Logo' style={{width: 200, height: 200}}/>
              {modalState !== 'chose_account' &&
                <div 
                  className='position-absolute top-0 start-0 return_button rounded'
                  onClick={() => setModalState(prevState => modalStates[modalStates.indexOf(prevState) - 1])}
                >
                  <IoReturnUpBack />
                </div>
              }
          </Modal.Header>
          <Modal.Body className='overflow-hidden'>
              {modalState === 'chose_account' &&
              <div id='chose_account' className='text-center'>
                <p className='fs-5 fw-semibold'>Đăng nhập sử dụng tài khoản</p>
                <MyButton text='Nhà tuyển dụng' onClick={() => {setUserRole('recruiter'); setModalState('login')}}/>
                <MyButton text='Người tìm việc' onClick={() => {setUserRole('job-seeker'); setModalState('login')}}/>
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
                    />
                  </Form.Group>
                  <p className='text-success text-center'>Đã gửi OTP đến gmail của bạn</p>
                  <MyButton text='Nhận mã OTP' type='submit' onClick={() => toast.success(`Đã gửi mã OTP đến ${forgotEmail}`)}/>
                  <Button variant='link'>Gửi lại OTP</Button>
                  <p className='text-success text-center'>Xác thực OTP thành công</p>
                  <Form.Group
                    className="mb-3 form_input text-start"
                    controlId="forgotForm.ResetPassword"
                  >
                    <Form.Label>OTP</Form.Label>
                    <Form.Control 
                      type='password'
                      placeholder='Nhập mật khẩu mới'
                    />
                  </Form.Group>
                  <MyButton text='Sử dụng mật khẩu mới'/>
                </Form>
              </div>
              }
          </Modal.Body>
        </Modal>

        
      </Container>
    </Navbar>
  )
}
