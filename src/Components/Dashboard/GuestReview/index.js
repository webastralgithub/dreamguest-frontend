import React, { useEffect, useRef, useState } from "react";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Wrapper from "../Wrapper/Wrapper";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiResponseModal from "../../httpResponseModal/ApiResponseModal";
import { Rating } from "react-simple-star-rating";
import './index.css'
function MyVerticallyCenteredModal(props) {
  const [cleanRating, setCleanlessRating] = useState(0);
  const [ruleAdherenceRating, setrRuleAdherence] = useState(0);
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const addRating = (e) => {
    e.preventDefault();
    props.setModalShow(false);
    toast.success("Rating Added Successfully");
  };
  const cleanlessRating = (rate) => {
    setCleanlessRating(rate);
  };
  const ruleAdherence = (rate) => {
    setrRuleAdherence(rate);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="model-custom-dsg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rate Guest Behaviour
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addRating}>
          <div className="pop-up-step-one">
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Input Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Property Name</Form.Label>
              <Form.Control type="text" placeholder="Input Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridCheckIn">
              <Form.Label>Check-In</Form.Label>
              <Form.Control
                type="datetime-local"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                name="checkIn"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridCheckOut">
              <Form.Label>Check-Out</Form.Label>
              <Form.Control
                type="datetime-local"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                name="checkOut"
              />
            </Form.Group>
            <div className="clenLess-star-rating-sec">
            ClenLess <Rating onClick={cleanlessRating} />
            </div>
            <div className="adherence-star-rating-sec">
            Rule Adherence <Rating onClick={ruleAdherence} />
            </div>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Input Address"
                name="message"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCheckbox">
              <Form.Check
                type="checkbox"
                label="Nominate for reward"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const GuestReview = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { jwtToken } = useSelector((state) => state.userAuth);
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [guest, setGuest] = useState();
  const [guestList, setGuestList] = useState([]);

  const handleShowModal = (response) => {
    setShowModal(true);
    setResponseData(response);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
const getGuestList= async()=>{
  try {
    let response = await axios({
      method: "get",
      url: process.env.REACT_APP_API_GET_All_GUEST,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (response.status === 200) {
      setGuestList(response.data.user);
      inputRef.current.value = "";
    }
  } catch (error) {
    handleShowModal(error.response.data.message);
    console.error("Error logging in:", error);
  }
}


  useEffect(() => {
    getGuestList()
   
}, []);


  const inputRef = useRef(null);
    
  const handleGuest = async () => {
    if(inputRef.current.value ==""){
      handleShowModal("Search Feild is empty");
    return false;
    }
    try {
      let response = await axios({
        method: "get",
        url: process.env.REACT_APP_API_GET_GUEST + inputRef.current.value,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        setGuest(response.data.user);
        inputRef.current.value = "";
      }
    } catch (error) {
      handleShowModal(error.response.data.message);
      // console.error("Error logging in:", error);
    }
  };

  return (
    <Wrapper>
      <ToastContainer />
      <div className="table-page-main-wrapper">
        <div className="table-page-top">
          <h2>Guest Review Page</h2>

          <MyVerticallyCenteredModal
            show={modalShow}
            setModalShow={setModalShow}
            onHide={() => setModalShow(false)}
          />
        </div>

        <div className="table-wrapper">
          <div className="wrap-search">
          <InputGroup className="mb-3 serach-ontable">
            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
            <Form.Control
              placeholder="Guest Unique Id"
              aria-label="Search"
              aria-describedby="basic-addon1"
              ref={inputRef}
            />
           
          </InputGroup>
          <div style={{"padding-right":"14px"}}>
            <Button onClick={handleGuest}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </Button>
            </div>
            {guest &&<div>
          <Button onClick={()=> setGuest("")}>Clear Filter</Button>
          </div>}

          </div>
          
          <Table responsive="lg">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Property Name </th>
                <th>Check In </th>
                <th>Check Out </th>
                <th>Action</th>
              </tr>
            </thead>
            {guest ? (
              <tbody>
                <tr>
                  <td>{guest.id}</td>
                  <td>
                    {guest.firstName} {guest.lastName}
                  </td>
                  <td>{guest.email}</td>
                  <td>{guest.email}</td>
                  <td>{guest.email}</td>
                  <td>
                    <button
                      className="button-primary"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Rate
                    </button>
                  </td>
                </tr>
              </tbody>
            ):
            <tbody>
           
              {guestList.length>0 && guestList.map((guest,index)=>(
                 <tr>
                <td>{guest.id}</td>
              <td>
                {guest.firstName} {guest.lastName}
              </td>
              <td>{guest.email}</td>
              <td>{guest.email}</td>
              <td>{guest.email}</td>
              <td>
                <button style={{"padding-top":8,"padding-bottom":8}}
                  className="button-primary"
                  variant="primary"
                  onClick={() => setModalShow(true)}
                >
                  Rate
                </button>
              </td>
              </tr>
              ))}
              
       
          </tbody>
            }
          </Table>
        </div>
      </div>
      <ApiResponseModal
        show={showModal}
        onHide={handleCloseModal}
        responseData={responseData}
      />
    </Wrapper>
  );
};

export default GuestReview;
