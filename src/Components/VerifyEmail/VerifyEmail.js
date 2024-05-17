import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../Login/Login.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../features/user/userAuth';
import ApiResponseModal from '../httpResponseModal/ApiResponseModal';
import useAxiosWithAuthErrorHandling from '../AxiosErrorHandling/AxiosErrorHandling';

const VerifyEmail = () => {
  const axios = useAxiosWithAuthErrorHandling();
  const dispatch = useDispatch();
  const { jwtToken, user: { email: USER_EMAIL }, rememberMe } = useSelector(state => state.userAuth);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [count, setCount] = useState(59);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleShowModal = (response) => {
    setShowModal(true);
    setResponseData(response);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (otp.every(input => input !== '')) {
        try {
          let response = await axios({
            method: 'post',
            url: process.env.REACT_APP_API_VERIFY_OTP,
            data: {
              'email': USER_EMAIL,
              'otp': otp.join(''),
              'rememberMe': rememberMe
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${jwtToken}`
            },
          });

          if (response.status === 200) {
            dispatch(setAuth({ jwtToken: response.data.token, user: response.data.user, isOTPAuthenticated: true }))
            Cookies.set('loyalty_user_jwtToken', response.data.token);
            Cookies.set('loyalty_user_userDetails', JSON.stringify({ user: response.data.user }));
            navigate('/dashboard');
          } else {
            console.error('Login failed:', response.data.message);
            handleShowModal(response.data.message);
          }
        } catch (error) {
          handleShowModal(error.response.data.message);
          console.error('Error:', error);
        }
        setOtp(['', '', '', '']);
      }
    };

    fetchData();
  }, [otp]);

  useEffect(() => {
    if (!isActive) {
      var timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    }

    if (count === 0) setIsActive(true);

    return () => clearInterval(timer);
  }, [count]);


  const handleResendOtp = async () => {
    try {
      let response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_RESEND_OTP,
        data: {
          'email': USER_EMAIL,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${jwtToken}`
        },
      });
      handleShowModal(response.data.message);
    } catch (error) {
      console.error('Error :', error);
    }

    setIsActive(false);
    setCount(59);
  };

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      if (value.length > 1) {
        value = value.slice(0, 1);
      }
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
    }
  }

  return (
    <Container fluid className='login-screen'>
      <Row>
        <Col md={6}>
          <div className='Login-right verify-left'>
            <Image className='logo' src={process.env.PUBLIC_URL + "/logo.png"} fluid />

            <div className='sign-up-fotm otp-form'>
              <h2><Link to="/">←</Link>Verify OTP sent to your email and phone.</h2>
              <p>Input the OTP code sent to: {USER_EMAIL}</p>

              <div className='varify-otp-form-wrp'>
                <Form>
                  <Form.Group className="" controlId="formGridAddress1">
                    <Form.Control type="text" placeholder="" maxLength="1" pattern="[0-9]*" value={otp[0]} onChange={(e) => handleChange(0, e.target.value)} />
                  </Form.Group>

                  <Form.Group className="" controlId="formGridAddress2">
                    <Form.Control type="text" placeholder="" maxLength="1" pattern="[0-9]*" value={otp[1]} onChange={(e) => handleChange(1, e.target.value)} />
                  </Form.Group>

                  <Form.Group className="" controlId="formGridAddress3">
                    <Form.Control type="text" placeholder="" maxLength="1" pattern="[0-9]*" value={otp[2]} onChange={(e) => handleChange(2, e.target.value)} />
                  </Form.Group>

                  <Form.Group className="" controlId="formGridAddress4">
                    <Form.Control type="text" placeholder="" maxLength="1" pattern="[0-9]*" value={otp[3]} onChange={(e) => handleChange(3, e.target.value)} />
                  </Form.Group>

                </Form>
              </div>
              <p className={`have-an-account have-an-account-otp ${isActive ? 'active-resend-otp-btn' : ''}`} onClick={isActive ? handleResendOtp : null}>Send a new OTP code {!isActive && <span className='otp-time'>({count})</span>}</p>
            </div>
          </div>
        </Col>

        <Col md={6} className='animation-wrapper'>
          <div className='login-left'>

            <Image className='lock' src={process.env.PUBLIC_URL + "/lock.png"} fluid />

            <Image className='key' src={process.env.PUBLIC_URL + "/key.png"} fluid />
          </div>
        </Col>
      </Row>
      <ApiResponseModal show={showModal} onHide={handleCloseModal} responseData={responseData} />
    </Container>
  )
}

export default VerifyEmail;
