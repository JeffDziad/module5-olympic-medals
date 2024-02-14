import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PlusCircleFill } from 'react-bootstrap-icons';

function NewCountry(props) {
  const [showModal, setShowModal] = useState(false);
  const [newCountryName, setNewCountryName] = useState("");

  const handleModalClose = () => setShowModal(false);
  const handleModalKeyPress = (e) => (e.keyCode ? e.keyCode : e.which) === 13 && handleAdd();
  const handleAdd = () => {
    newCountryName.length > 0 && props.onAdd(newCountryName);
    handleModalClose();
  }

  const handleShow = () => {
    setShowModal(true);
    setNewCountryName("");
  }

  return (
      <React.Fragment>
        <Button variant="outline-success" onClick={handleShow}>
          <PlusCircleFill />
        </Button>
        <Modal onKeyPress={ handleModalKeyPress } show={ showModal } onHide={ handleModalClose }>
          <Modal.Header closeButton>
            <Modal.Title>New Country</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="modalForm1">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                  type="text"
                  name="newCountryName"
                  onChange={ (e) => setNewCountryName(e.target.value) }
                  value={ newCountryName }
                  placeholder="enter name"
                  autoFocus
                  autoComplete='off'
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ handleModalClose }>
              Close
            </Button>
            <Button variant="primary" onClick={ handleAdd }>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
  );
}

export default NewCountry;
