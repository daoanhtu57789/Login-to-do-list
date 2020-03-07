import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
//import Model để tạo form nhập
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Clear";
import propTypes from "prop-types";
//import để kết nối đến store
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
//import để lấy các actions
import * as modalActions from "./../../actions/modal";
class CommonModal extends Component {
    render() {
        const { classes, open, modalActionsCreator, title ,component} = this.props;
        const { hideModal } = modalActionsCreator;
        return (
            //open là true thì mới hiện form nhập
            //onClose laf khi di chuột ra ngoài thì sẽ gọi hideModal
            <Modal open={open} onClose={hideModal}>
                <div className={classes.modal}>
                    {/* phần header của form */}
                    <div className={classes.header}>
                        {/* phần title của form */}
                        <span className={classes.title}>{title}</span>
                        {/* Icon X ở bên phải */}
                        <CloseIcon
                            className={classes.icon}
                            onClick={hideModal}
                        />
                    </div>
                    {/* phần content nhập */}
                    <div className={classes.content}>
                        {/* component ở đây là TaskForm hoặc được truyền vào thông qua changeModalContent*/}
                        {component}
                    </div>
                </div>
            </Modal>
        );
    }
}

Modal.propTypes = {
    classes: propTypes.object,
    open: propTypes.bool,
    modalActionsCreator: propTypes.shape({
        hideModal: propTypes.func
    }),
    title: propTypes.string,
    component : propTypes.object
};

const mapStateToProps = state => {
    return {
        open: state.modal.showModal,
        title: state.modal.title,
        component : state.modal.component
    };
};

const mapDispatchToProps = dispatch => {
    return {
        modalActionsCreator: bindActionCreators(modalActions, dispatch)
    };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(CommonModal);
