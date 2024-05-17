import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ForgotPassword.css';
import { Container, Row, Col, Image, Form, Button, Spinner } from 'react-bootstrap';

import axios from 'axios';
import ApiResponseModal from '../httpResponseModal/ApiResponseModal';

function ForgotPassword() {

  const [email, setEmail] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [isSpinnerActive, setisSpinnerActive] = useState(false);

  const handleShowModal = (response) => {
    setShowModal(true);
    setResponseData(response);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      setisSpinnerActive(true);
      let response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_FORGOT_PASSWORD,
        data: {
          'email': email,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });

      setEmail('');
      handleShowModal(response.data.message);
    } catch (error) {
      handleShowModal(error.response.data.message);
      console.error('Error logging in:', error);
    }
    setisSpinnerActive(false);
  };

  return (
    <Container fluid className='forgot-password-screen'>
      <Row>
        <Col md={6} className='animation-wrapper'>
          <div className='forgot-password-left'>
            <Image className='sun' src={process.env.PUBLIC_URL + '/sun.png'} fluid />
            <Image className='building' src={process.env.PUBLIC_URL + "/login-home.png"} fluid />
          </div>
        </Col>

        <Col md={6}>
          <div className='forgot-password-right'>
            <Image className='logo' src={process.env.PUBLIC_URL + "/logo.png"} fluid />

            <div className='forgot-password-form'>
              <h2>Forgot Your Password</h2>
              <p className='forgot-password-form__description'>Enter the email associated with your account and click 'Request Reset Link' to receive and email contaning a link to reset the account password.</p>

              <div className='forgot-password-form-wrp'>
                <Form onSubmit={handleForgot}>
                  <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isSpinnerActive}>
                    {isSpinnerActive ? <Spinner animation="border" size="sm" /> : null}
                    &nbsp;
                    Request Reset Link
                  </Button>
                </Form>
              </div>
            </div>
            <p className='have-an-account'>Already have an account? <Link to="/">Login</Link></p>
            <p className='account-or-forgot'>OR</p>
            <p className='have-an-account'>Don’t have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </Col>
      </Row>
      <ApiResponseModal show={showModal} onHide={handleCloseModal} responseData={responseData} />
    </Container>
  )
}

export default ForgotPassword;