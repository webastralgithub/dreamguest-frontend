import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ApiResponseModal({ show, onHide, responseData }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className='model-custom-dsg'>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <p>{responseData}</p>
      </Modal.Body>
    </Modal>
  );
}
