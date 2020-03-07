import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import propTypes from "prop-types";
import Header from "./Header/index";
import SideBar from "./Sidebar/index";
//cn để gộp nhiều class
import cn from "classnames";

import { bindActionCreators } from "redux";
import * as uiActions from "./../../actions/ui";
import { connect } from "react-redux";
class DashBoard extends Component {
    onToggleSidebar = value => {
        const { uiActionsCreator } = this.props;
        const { hideSidebar, showSidebar } = uiActionsCreator;
        if (value) {
            showSidebar();
        } else {
            hideSidebar();
        }
    };
    render() {
        const {
            classes,
            children, //lấy theme để truyền
            name,
            showSidebar
        } = this.props;

        return (
            <div>
                <Header
                    name={name}
                    //data trong {} là đc truyền hoặc nhận từ Header
                    showSidebar={showSidebar}
                    onToggleSidebar={this.onToggleSidebar}
                />
                <div className={classes.wrapper}>
                    <SideBar
                        showSidebar={showSidebar}
                        // onToggleSidebar={this.onToggleSidebar}
                    />
                    <div
                        className={cn(classes.wrapperContent, {
                            //tạo class mới với điều kiện
                            [classes.shirtLeft]: showSidebar === false
                        })}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
DashBoard.propTypes = {
    classes: propTypes.object,
    children: propTypes.object,
    name: propTypes.string,
    showSidebar: propTypes.bool,
    uiActionsCreator: propTypes.shape({
        showSidebar: propTypes.func,
        hideSidebar: propTypes.func
    })
};

const mapStateToProps = state => {
    return {
        showSidebar: state.ui.showSidebar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        uiActionsCreator: bindActionCreators(uiActions, dispatch)
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(DashBoard)
);
