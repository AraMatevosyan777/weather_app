import React from 'react'
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap'

const CityModal = ({ error, handleClose }) => {

    return (
        <Modal
            show={!!error}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

CityModal.propTypes = {
    error: PropTypes.string,
    handleClose: PropTypes.func
}

export default CityModal
