import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../features/user/userAuth';
import useAxiosWithAuthErrorHandling from '../../AxiosErrorHandling/AxiosErrorHandling';

export default function MyVerticallyCenteredModal({ handleShowModal, show, onHide }) {
  const axios = useAxiosWithAuthErrorHandling();
  const dispatch = useDispatch();
  const { jwtToken, user: getUser } = useSelector(state => state.userAuth);
  const [key, setKey] = useState('general');
  const [avatar, setAvatar] = useState(getUser.avatar);
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  });

  const [updateformData, setupdateFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    avatarFile: null
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name.trim()]: value.trim() });
  };

  const handleDashpasswordChange = async (e) => {
    e.preventDefault();
    try {
      const { confirm_password, password } = formData;

      if (confirm_password !== password || !confirm_password || !password) {
        handleShowModal('Passwords does not match');
        return;
      }

      const response = await axios.post(process.env.REACT_APP_API_RESET_PASSWORD + 'dummyToken', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${jwtToken}`
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
  }

  const handleupdateFormSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();
      data.append('username', updateformData.userName);
      data.append('firstName', updateformData.firstName);
      data.append('lastName', updateformData.lastName);
      data.append('gender', updateformData.gender);
      if (updateformData.avatar) {
        data.append('avatar', updateformData.avatar);
      }

      let response = await axios({
        method: 'post',
        url: process.env.REACT_APP_API_UPDATE_PROFILE,
        data: updateformData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${jwtToken}`
        },
      });
      dispatch(setAuth({ user: response.data.user }))

      handleShowModal(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      handleShowModal(error.response.data.message);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value, files } = e.target;
    setupdateFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));

    if (name === 'avatarFile' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='model-custom-dsg'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Settings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="general" title="General Info">
            <Form onSubmit={handleupdateFormSubmit}>
              <div className='pop-tabs-form'>

                <div className='change-avatar-sec'>
                  <Image src={avatar ? avatar : process.env.PUBLIC_URL + "/avatar.png"} fluid="true" />
                  <input type="file" accept="image/*" name='avatarFile' onChange={handleUpdateInputChange} style={{ display: 'none' }} />
                  <span onClick={() => document.querySelector('input[type="file"]').click()}>Change Avatar</span>
                </div>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Input Name" name="userName" value={updateformData.username} onChange={handleUpdateInputChange} />
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter here" name="firstName" value={updateformData.firstname} onChange={handleUpdateInputChange} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter here" name="lastName" value={updateformData.lastname} onChange={handleUpdateInputChange} />
                  </Form.Group>
                </Row>

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Gender</Form.Label>
                </Form.Group>

                <Form.Select aria-label="Default select example" name="gender" className="mb-3" value={updateformData.gender} onChange={handleUpdateInputChange}>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </Form.Select>

                <Button variant="primary" type='submit'> Save </Button>
              </div>
            </Form>
          </Tab>
          <Tab eventKey="payment" title="Payment">
            <div className='payment-addstripe-erapper'>
              <div className='payment-addstripe-wrapper'>
                <Image src={process.env.PUBLIC_URL + "/stripe.png"} fluid />
                <button>Connect</button>
              </div>
            </div>
          </Tab>
          <Tab eventKey="subscription" title="Subscription">
            <Form>
              <div className='pop-tabs-form'>
                <p className='tabs-form-top-heading-line'>Subscription</p>

                <Form.Group className="mb-3" id="formGridCheckbox">
                  <Form.Check type="checkbox" label="Newsletters or updates" />
                </Form.Group>
                <Button variant="primary">
                  Save
                </Button>
              </div>
            </Form>
          </Tab>
          <Tab eventKey="security" title="Security">
            <Form onSubmit={handleDashpasswordChange}>
              <div className='pop-tabs-form'>
                <p className='tabs-form-top-heading-line'>Change Password</p>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="Password" placeholder="type your new password" value={formData.password} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Re-type your new password</Form.Label>
                  <Form.Control name="confirm_password" type="Password" placeholder="Re-type your new password" value={formData.confirm_password} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type='submit'> Save </Button>
              </div>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}