import React from 'react'

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./index.css"
import Wrapper from "../Wrapper/Wrapper";

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
             Sex Offender Check
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className='pop-up-step-one'>
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
                </div>

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

                {/* <div className='pop-up-step pop-up-step-three'>

                <Image className="checklist-img-dul" src='./checklist-sm.svg'/>
                <div className='pop-step-tabelcntnt'>
                  <h6 className='tittle'>Result of Sex Offender Check</h6>
                    <Table responsive="lg" className='popup-table'>
                        <tr>
                            <th>Name</th>
                            <td>Andreas</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>Street 12 USA</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>Passed ✅</td>
                        </tr>
                    </Table>
                </div>
                </div> */}
            </Form>
        </Modal.Body>
      </Modal>
    );
}


const MyReward = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const data = [
        {
            id: 1,
            name: "Voucher $10",
            type: "Discount",
            points: 100,
            description: "Discount $10 for medium room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 2,
            name: "Voucher $20",
            type: "Discount",
            points: 200,
            description: "Discount $20 for large room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 3,
            name: "Voucher $30",
            type: "Discount",
            points: 300,
            description: "Discount $30 for suite room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 4,
            name: "Voucher $40",
            type: "Discount",
            points: 400,
            description: "Discount $40 for deluxe room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 5,
            name: "Voucher $50",
            type: "Discount",
            points: 500,
            description: "Discount $50 for luxury room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 6,
            name: "Voucher $60",
            type: "Discount",
            points: 600,
            description: "Discount $60 for premium room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 7,
            name: "Voucher $70",
            type: "Discount",
            points: 700,
            description: "Discount $70 for executive room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 8,
            name: "Voucher $80",
            type: "Discount",
            points: 800,
            description: "Discount $80 for presidential room type",
            terms: "This voucher discount is applicable for one-time use only."
        },
        {
            id: 9,
            name: "Voucher $90",
            type: "Discount",
            points: 900,
            description: "Discount $90 for royal suite room type",
            terms: "This voucher discount is applicable for one-time use only."
        }
    ]
  return (
    <Wrapper>
        <div className='table-page-main-wrapper'>
            <div className='table-page-top'>
                <h2>My Rewards</h2>

            
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
                <div className="tabs">
                <button className="tab active">Available</button>
                <button className="tab">Redeemed</button>
            </div>
                <Table responsive="lg">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Points</th>
                        <th>Description</th>
                        <th>Terms and Condition</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.points}</td>
                            <td>{item.description}</td>
                            <td>{item.terms}</td>
                            <td><button className="view-button">View</button></td>
                        </tr>
                    ))}
                </tbody>
                </Table>

            </div>
        </div>
    </Wrapper>
  )
}

export default MyReward