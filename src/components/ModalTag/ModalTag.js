import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalTag = props => 
<Modal isOpen={props.isOpen} toggle={props.toggle}>
  <ModalHeader toggle={props.toggle}>Tags</ModalHeader>
  <ModalBody>
    <div className="row">
        {props.Tags.map((tag, index) => (
            <div className="col-md-3 col-xs-3 col-lg-3">
                <span key={'tagsAudio-' + index} className="tags-collapse-border-dark"> {tag}</span>
            </div>
        ))}
    </div>

  </ModalBody>
  <ModalFooter>
    <Button color="danger" onClick={props.toggle}>Cerrar</Button>
  </ModalFooter>
</Modal>;

export default ModalTag; 