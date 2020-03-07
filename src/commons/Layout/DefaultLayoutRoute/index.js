import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import { Route } from "react-router-dom";
//kiểm tra lỗi
import propTypes from "prop-types";

class DefaultLayoutRoute extends Component {
    render() {
        //cách 1
        // const {path,component,name,exact} = this.props;
        //cách 2
        //this.props bao gồm path :,name :, exact :,component :,
        //lấy name ra thì gán 2 biến còn lại vào remainProps
        const { component: YourComponent, ...remainProps } = this.props;
        return (
            <Route
                {...remainProps}
                render={routeProps => {
                    return <YourComponent {...routeProps} />;
                }}
            >
            </Route>
        );
    }
}

DefaultLayoutRoute.propTypes = {
    path: propTypes.string,
    exact: propTypes.bool,
    component: propTypes.oneOfType([propTypes.object, propTypes.func]),
    name: propTypes.string
};

export default withStyles(styles)(DefaultLayoutRoute);
