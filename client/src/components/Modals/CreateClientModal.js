import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import ClientForm from "../../Forms/ClientForm/ClientForm";
import {
  toggleCreateClientModal,
  submitClient,
  fetchClients,
  submitForm
} from "../../../actions";

class CreateClientModal extends Component {
  onSubmit = async formValues => {
    const { history } = this.props;
    await this.props.submitClient(formValues, history);
    await this.props.fetchClients();
    await this.props.toggleCreateClientModal(!this.props.modals.createClient);
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Modal
          isOpen={this.props.modals.createClient}
          toggle={() => {
            this.props.toggleCreateClientModal(!this.props.modals.createClient);
          }}
          className={"modal-info " + this.props.className}
        >
          <ModalHeader toggle={this.onToggle}>
            <strong>Client</strong> Create
          </ModalHeader>
          <ModalBody>
            {" "}
            <ClientForm
              onSubmit={this.onSubmit}
              onToggle={() => {
                this.props.toggleCreateClientModal(
                  !this.props.modals.createClient
                );
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color="secondary"
              onClick={() => {
                this.props.toggleCreateClientModal(
                  !this.props.modals.createClient
                );
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={this.props.validate}
              type="submit"
              color="primary"
              onClick={() => {
                this.props.submitForm("ClientForm");
              }}
            >
              <i className="fa fa-dot-circle-o" /> Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ contact, modals }) {
  return { contact, modals };
}

export default connect(
  mapStateToProps,
  { toggleCreateClientModal, submitClient, fetchClients, submitForm }
)(withRouter(CreateClientModal));
