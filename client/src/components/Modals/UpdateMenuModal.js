import _ from "lodash";
import React, { Component } from "react";
import { Modal, ModalHeader, ModalFooter, Button, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import MenuForm from "../../Forms/MenuForm/MenuForm";
import { toggleUpdateMenuModal, updateMenu, fetchMenus, submitForm } from "../../../actions";


class UpdateMenuModal extends Component {
  onSubmit = async formValues => {
    const { history } = this.props;
    await this.props.updateMenu(
      { ...this.props.menu.selectedMenu, ...formValues },
      history
    );
    await this.props.fetchMenus()
  };
  initialMenuForm = (menu) =>{
    return(_.merge(_.chain(menu).pick(
      "menuName",
      "description",
      "category",
    ).value(),{menuSelection: _.chain(menu)
    .get("menuSelection")
    .map((item) => {return item._id})
    .value()}) 
    )
  }

  render() {
    
    return (
      <div className="animated fadeIn">
        <Modal
          isOpen={this.props.modals.updateMenu}
          toggle={() => {
            this.props.toggleUpdateMenuModal(
              !this.props.modals.updateMenu
            );
          }}
          className={"modal-info " + this.props.className}
        >
        <ModalHeader toggle={this.onToggle}>
          <strong>Menu </strong> Edit
        </ModalHeader>
        <ModalBody> <MenuForm
            initialValues={this.initialMenuForm(this.props.menu.selectedMenu)}
            onSubmit={this.onSubmit}
            onToggle={() => {
              this.props.toggleUpdateMenuModal(
                !this.props.modals.updateMenu
              );
            }}
          /></ModalBody>
         
          <ModalFooter>
          <Button color="secondary" onClick={() => {
            this.props.toggleUpdateMenuModal(
              !this.props.modals.updateMenu
            );
          }}>
            Cancel
          </Button>
          <Button disabled={this.props.validate} type="submit" color="primary" onClick={() => {
            this.props.submitForm('MenuForm').then(()=>
            this.props.toggleUpdateMenuModal(
              !this.props.modals.updateMenu
            ))
          }}>
            <i className="fa fa-dot-circle-o" /> Update
          </Button>
        </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ menu, modals }) {
  return { menu, modals };
}

export default connect(
  mapStateToProps,
  { toggleUpdateMenuModal, updateMenu, fetchMenus, submitForm}
)(UpdateMenuModal);
