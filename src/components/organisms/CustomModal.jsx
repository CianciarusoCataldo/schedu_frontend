import React from 'react';
import {Modal, ModalBody } from 'reactstrap';

 
class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <button className="custom-button" onClick={this.toggle}>
        <i className={this.props.buttonIcon+" button-icon"}/>
        {this.props.buttonLabel}
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} modalTransition={{ timeout: 0 }} >
          <ModalBody className="custom-modal" >
           {this.props.internalComp}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;
