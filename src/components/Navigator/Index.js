import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { IoReturnUpBack } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';

import logo from '../../img/logo.png'
import './style.css'
import { Modal, Button, Form } from 'react-bootstrap';
import MyButton from '../MyButton';

console.log(logo)


export default function Navigator({ isLogin, isJobSeeker, isRecruiter }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setModalState('chose_account');
  }
  const handleShowModal = () => setShowModal(true);

  const [modalState, setModalState] = useState('chose_account');
  const modalStates = ['chose_account', 'login', 'forgot_password'];
  const [userType, setUserType] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');



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
            {isLogin && <Nav.Link className='navbar__button' href="#link">My page</Nav.Link>}
            {isRecruiter && <Nav.Link className='navbar__button' href="#link">Posted jobs</Nav.Link>}
          </Nav>
        </Navbar.Collapse>

        <div onClick={handleShowModal} className='navbar__button'>Login</div>

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
                <MyButton text='Nhà tuyển dụng' onClick={() => {setUserType('recruiter'); setModalState('login')}}/>
                <MyButton text='Người tìm việc' onClick={() => {setUserType('jobseeker'); setModalState('login')}}/>
              </div>
              }

              {modalState === 'login' &&
              <div id='login' className='fadeIn position-relative'>
                <p className='fs-5 fw-semibold text-center'>Đăng nhập sử dụng tài khoản {userType === 'recruiter' ? 'nhà tuyển dụng' : 'người tìm việc'}</p>
                <Form className='text-end'>
                  <Form.Group className="mb-3 form_input text-start" controlId="loginForm.Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập username"
                      autoFocus
                      required
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 form_input text-start"
                    controlId="loginForm.Password"
                  >
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control 
                      type='password'
                      placeholder='Nhập mật khẩu'
                      required
                    />
                  </Form.Group>
                  <Button className='mb-3' variant='link' onClick={() => setModalState('forgot_password')} >Quên mật khẩu</Button>
                  <MyButton text='Đăng nhập' type='submit' onClick={() => toast.success('Đăng nhập thành công')}/>
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
