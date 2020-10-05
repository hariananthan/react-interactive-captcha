import React,{useState} from "react";
import ColoredRect from "./ColoredRect";
import {Button,Modal} from "react-bootstrap";
import "../styles/stylesheet.css";

function App(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch Captcha demo
      </Button>

      <Modal show={show} dialogClassName="modal-90w" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Place the colored rectangles in the correct frame without overlap</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <ColoredRect handleClose={handleClose} />  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );

}
export default App;