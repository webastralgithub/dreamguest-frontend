import React,{ useContext, useState } from 'react'

import { Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import Siderbar from '../Sidebar/Siderbar';
import DashboardContext from '../../../context/Dashboard/DashboardContext';
import ApiResponseModal from '../../httpResponseModal/ApiResponseModal';
import MyVerticallyCenteredModal from './WrapperModal';

function Wrapper({ children }) {
  const [modalShow, setModalShow] = useState(false);
  const {isActive,handleClick} = useContext(DashboardContext);
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleShowModal = (response) => {
    setShowModal(true);
    setResponseData(response);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <Container className="p-0" style={{ maxWidth: '100%' }}>
        <Row className="m-0">
            { <Siderbar isActive={isActive}/> }
            <Col md={10} className={isActive ? 'p-0 toggle-transition dashboardwidthinactive' : 'p-0 toggle-transition dashboardwidthactive'}>
                <div className='dashboard-content-wrapper'>
                  <div className='top-bar-fix'>
                    <div className='burgur-menu-wrap' onClick={handleClick}>
                      <Image src={ process.env.PUBLIC_URL + "/menu-hamburger.svg"} fluid/>
                    </div>

                    <div className='top-bar-content-wrp'>
                        <button variant="primary" onClick={() => setModalShow(true)}>
                          <Image src={ process.env.PUBLIC_URL + "/setting.svg"} fluid/>
                        </button>
                        <MyVerticallyCenteredModal handleShowModal = { handleShowModal } show={modalShow} onHide={() => setModalShow(false)}/>
                        <span> <Image src={ process.env.PUBLIC_URL + "/avatar.png"} fluid/> </span>
                    </div>
                  </div>
                  <div className='dash-content-wrapper'>
                  { children }
                  </div>
                </div>
            </Col>
        </Row>
        <ApiResponseModal show={showModal} onHide={handleCloseModal} responseData={responseData} />
    </Container>
    </>
  )
}

export default Wrapper;