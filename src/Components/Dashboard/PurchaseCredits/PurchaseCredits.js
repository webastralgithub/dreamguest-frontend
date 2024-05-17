import React, { useEffect, useState } from 'react'

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { loadStripe } from '@stripe/stripe-js';
import Wrapper from '../Wrapper/Wrapper';
import { useSelector } from 'react-redux';
import useAxiosWithAuthErrorHandling from '../../AxiosErrorHandling/AxiosErrorHandling';

function MyVerticallyCenteredModal({ show, onHide, setAmount, buyCredits }) {
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
                    Sex Offender Check
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className='pop-up-step-one'>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Credits</Form.Label>
                        </Form.Group>

                        <Form.Select name='credits-plan' onChange={(e) => setAmount(parseInt(e.target.value))} aria-label="Default select example" className="mb-3">
                            <option>Select Amount</option>
                            <option value="100">$100</option>
                            <option value="200">$200</option>
                            <option value="300">$300</option>
                        </Form.Select>

                        <Button onClick={() => buyCredits('pop-up')} variant="primary">Buy</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const PurchaseCredits = () => {
    const axios = useAxiosWithAuthErrorHandling();
    const { jwtToken } = useSelector(state => state.userAuth);
    const [modalShow, setModalShow] = React.useState(false);

    const [amount, setAmount] = useState(0);
    const [packAmount, setpackAmount] = useState(0);

    const handlePackageBuy = (amountPack) => {
        setpackAmount(amountPack);
    }

    useEffect(() => {
        if (packAmount === 0) return;
        buyCredits('packAmount');
    }, [packAmount]);

    const buyCredits = async (type) => {
        try {
            const stripe = loadStripe('pk_test_51OvxzWSFFtxFGoDYosJgLK33mwpkKsY9xuaIn69LjmHAY95Ri7QO16bkyNc54j6yuFo5oxT1VtPfA9SSgdom3a7000IN9TkMyG');

            const data = {
                amount: type === 'packAmount' ? packAmount : amount,
                success_url: 'http://localhost:3000/successful-purchase',
                cancel_url: 'http://localhost:3000/failed-purchase',
            }

            const response = await axios.post(process.env.REACT_APP_API_PURCHASE_CREDITS, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            console.log(response);
            window.location = response.data.url;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrapper>
            <div className='table-page-main-wrapper'>
                <div className='table-page-top'>
                    <h2>Purchase Credits</h2>

                    <button className='button-primary' variant="primary" onClick={() => setModalShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                        Buy Prepaid Credits
                    </button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        setAmount={setAmount}
                        buyCredits={buyCredits}
                    />
                </div>


                <div className='table-wrapper'>
                    <h4 className='content-top-heading'>List of Packages</h4>
                    <div className='packg-list-wrapper'>

                        <div className='package-cr'>
                            <div className='package-left-ico'>
                                <Image src={process.env.PUBLIC_URL + "/package-dollar.svg"} fluid />
                            </div>

                            <div className='package-right-cnt'>
                                <span>
                                    <p>Package 1</p>
                                    <h5>100 Credit - 10$</h5>
                                </span>

                                <button onClick={(e) => { handlePackageBuy(100) }}>Buy</button>
                            </div>
                        </div>

                    </div>

                    <h4 className='content-top-heading'>Credit Purchase History</h4>
                    <Table responsive="lg">
                        <thead>
                            <tr>
                                <th>Credit</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>+100</td>
                                <td>22/Dec/23 12:00 PM</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </Wrapper>
    )
}

export default PurchaseCredits