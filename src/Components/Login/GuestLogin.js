import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../features/user/userAuth';

import './GuestLogin.css';
import { Container, Row, Col, Image, Form, Button, Spinner } from 'react-bootstrap';

import ApiResponseModal from '../httpResponseModal/ApiResponseModal';
import { setRememberMe } from '../../features/user/userAuth';
import Cookies from 'js-cookie';

function GuestLogin() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSpinnerActive, setisSpinnerActive] = useState(false);
  const [password, setPassword] = useState('');
  const [rememberMe, setrememberMe] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleShowModal = (response) => {
    setShowModal(true);
    setResponseData(response);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setisSpinnerActive(true);
      let response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_LOGIN,
        data: {
          'email': email,
          'password': password,
          'rememberMe': rememberMe
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      if (response.status === 200) {
        if (rememberMe) dispatch(setRememberMe());
        dispatch(setAuth({ jwtToken: response.data.token, user: { email: email } }));
        Cookies.set('loyalty_user_jwtToken', response.data.token);
        Cookies.set('loyalty_user_rememberMe', rememberMe);
        Cookies.set('loyalty_user_userDetails', JSON.stringify({ email: email }));
        navigate('/verify-otp');
      } else {
        handleShowModal('Login failed:' + response.data.message);
      }
    } catch (error) {
      handleShowModal(error.response.data.message);
      console.error('Error logging in:', error);
    }
    setisSpinnerActive(false);
  };

  return (
    <Container fluid className='login-screen'>
      <Row>
        <Col md={6} className='animation-wrapper'>
          <div className='login-left'>
            <Image className='sun' src={process.env.PUBLIC_URL + '/sun.png'} fluid />
            <Image className='building' src={process.env.PUBLIC_URL + "/login-home.png"} fluid />
          </div>
        </Col>

        <Col md={6}>
          <div className='Login-right'>
            <Image className='logo' src={process.env.PUBLIC_URL + "/logo.png"} fluid />

            <div className='sign-up-form'>
              <h2>Sign-in</h2>
              <p>Please fill your detail to access your account.</p>

              <div className='sign-in-form-wrp'>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" value={rememberMe} onChange={(e) => setrememberMe(e.target.checked)} label="Remember me" />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isSpinnerActive} >
                    {isSpinnerActive ? <Spinner animation="border" size="sm" /> : null}
                    &nbsp;
                    Sign-in
                  </Button>
                </Form>
              </div>
              <p className='have-an-account'>Don’t have an account? <Link to="/guest-register">Sign up</Link></p>
              <p className='account-or-forgot'>OR</p>
              <p className='forgot-password'><Link to="/forgot-password">Forgot Password?</Link></p>
            </div>
          </div>
        </Col>
      </Row>
      <ApiResponseModal show={showModal} onHide={handleCloseModal} responseData={responseData} />
    </Container>
  )
}

export default GuestLogin;
