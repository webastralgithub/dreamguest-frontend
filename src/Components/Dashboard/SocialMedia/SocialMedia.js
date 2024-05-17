import React from 'react'



import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import Wrapper from '../Wrapper/Wrapper';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='model-custom-dsg'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Social Media Check
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {/* <div className='pop-up-step-one'>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Input Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Input Address" />
                    </Form.Group>

                    <Button variant="primary">
                        Submit
                    </Button>
                </div> */}

                {/* <div className='pop-up-step pop-up-step-two'>

                    <Image src='./dollar-icon-pay.svg'/>
                    <div className='pop-step-cntnt'>
                        <h5>Payment Confirmation</h5>
                        <p>This is going to be 1 credit ($1.00).</p> 
                        <p>Please confirm to continue</p>
                    </div>
                    <Button variant="primary">
                        Pay Now
                    </Button>
                </div> */}

                {/* <div className='pop-up-step pop-up-step-three'>

                    <Image src='./checklist.svg'/>
                    <div className='pop-step-cntnt'>
                        <h5>Successful payment</h5>
                        <p>You have successfully paid, click OK to continue</p>
                    </div>
                    <Button variant="primary">
                        OK
                    </Button>
                </div> */}

                <div className='pop-up-step pop-up-step-three'>

                <Image className="checklist-img-dul" src='./checklist-sm.svg'/>
                <div className='pop-step-tabelcntnt'>
                  <h6 className='tittle'>Result of Social Media Check</h6>
                    <Table responsive="lg" className='popup-table'>
                        <tr>
                            <th>Name</th>
                            <td>Andreas</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>andreas@gmail.com</td>
                        </tr>
                        <tr>
                            <th>Facebook</th>
                            <td><a href='/'>https://www.facebook.com/andreasff</a></td>
                        </tr>
                        <tr>
                            <th>Twitter</th>
                            <td><a href='/'>https://www.twitter.com/andreasff</a></td>
                        </tr>
                        <tr>
                            <th>Instagram</th>
                            <td><a href='/'>https://www.instagram.com/andreasff</a></td>
                        </tr>
                        <tr>
                            <th>LinkedIn</th>
                            <td><a href='/'>https://www.linkedin.com/andreasff</a></td>
                        </tr>
                    </Table>
                </div>
                </div>
            </Form>
        </Modal.Body>
      </Modal>
    );
}

const SocialMedia = () => {
    const [modalShow, setModalShow] = React.useState(false);
  return (
    <Wrapper>
        <div className='table-page-main-wrapper'>
            <div className='table-page-top'>
                <h2>Social Media Check</h2>

                <button className='button-primary' variant="primary" onClick={() => setModalShow(true)}>New Check</button>
                
                <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
            </div>

            <div className='table-wrapper'>
                <InputGroup className="mb-3 serach-ontable">
                    <InputGroup.Text id="basic-addon1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </InputGroup.Text>
                    <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    /> 
                </InputGroup>

                <Table responsive="lg">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Twitter</th>
                        <th>Instagram</th>
                        <th>LinkedIn</th>
                        <th>Facebook</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Alexander G</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Nguyen, Shane</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Black, Marvin</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Cooper, Kristin</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>Flores, Juanita</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>

                    <tr>
                        <td>6</td>
                        <td>Cooper, Kristin</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Cooper, Kristin</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    <tr>
                        <td>8</td>
                        <td>Henry, Arthur</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>

                    <tr>
                        <td>9</td>
                        <td>Black, Marvin</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    <tr>
                        <td>10</td>
                        <td>Miles, Esther</td>
                        <td>Bad really chat in here</td>
                        <td>Bad really chat in here</td>
                        <td>-</td>
                        <td>Bad really chat in here</td>
                    </tr>
                    </tbody>
                </Table>

            </div>
        </div>
    </Wrapper>
  )
}

export default SocialMedia