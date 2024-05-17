import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button, Spinner } from 'react-bootstrap';

import './ResetPassword.css';
import ApiResponseModal from '../httpResponseModal/ApiResponseModal';

function ResetPassword() {

  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  });

  const { token } = useParams();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name.trim()]: value.trim() });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setisSpinnerActive(true);
      const { confirm_password, password } = formData;

      if (confirm_password !== password) {
        handleShowModal('Passwords does not match');
        setisSpinnerActive(false);
        return;
      }

      const response = await axios.post(process.env.REACT_APP_API_RESET_PASSWORD + token, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);

      setFormData({
        password: '',
        confirm_password: '',
      });
      handleShowModal(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setFormData({
        password: '',
        confirm_password: '',
      });
      handleShowModal(error.response.data.message);
    }
  };

  return (
    <Container fluid className='register-screen'>
      <Row>
        <Col md={6} className='animation-wrapper'>
          <div className='register-left'>
            <Image className='sun' src={process.env.PUBLIC_URL + '/sun.png'} fluid />
            <Image className='building' src={process.env.PUBLIC_URL + "/login-home.png"} fluid />
          </div>
        </Col>

        <Col md={6}>
          <div className='register-right'>
            <Image className='logo' src={process.env.PUBLIC_URL + "/logo.png"} fluid />

            <div className='sign-up-form'>
              <h2>Reset Your Password</h2>

              <div className='reset-password-form-wrp'>
                <Form onSubmit={handleRegister}>

                  <Form.Group className="mb-3" controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} />

                    <Form.Text className="form-text text-muted from-input-description">
                      Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.
                    </Form.Text>

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password Again" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isSpinnerActive}>
                    {isSpinnerActive ? <Spinner animation="border" size="sm" /> : null}
                    &nbsp;
                    Reset Password
                  </Button>
                </Form>
              </div>
              <p className='have-an-account'>Already have an account? <Link to="/">Login</Link></p>
            </div>
          </div>
        </Col>
      </Row>
      <ApiResponseModal show={showModal} onHide={handleCloseModal} responseData={responseData} />
    </Container>
  )
}

export default ResetPassword;