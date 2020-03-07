import React, { Component } from "react";
import styles from "./styles";
import propTypes from "prop-types";
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    Button
} from "@material-ui/core";
import { Link, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "../../actions/users";

import { reduxForm, Field } from "redux-form";
import { compose } from "redux";

//Field bắt buộc phải có component để render ra
import renderTextField from "../../component/FormHelper/TextField";

import { toastError, toastSuccess } from "./../../helpers/toastHelpers";
class LoginPage extends Component {
    handleSubmitForm = data => {
        const { listUsers, usersActionsCreators } = this.props;
        const { usersAccessSuccess, usersAccessFailed } = usersActionsCreators;
        if (listUsers.length === 0) {
            toastError("Đăng Nhập Thất Bại");
        } else {
            let itemUser = listUsers.filter(
                user =>
                    user.name === data.users && user.password === data.password
            );

            if (itemUser.length > 0) {
                usersAccessSuccess(itemUser[0]);
                toastSuccess("Đăng Nhập Thành Công");
            } else {
                usersAccessFailed(itemUser[0]);
                toastError("Đăng Nhập Thất Bại");
            }
        }
    };
    componentDidMount() {
        const { usersActionsCreators } = this.props;
        const { fetchListUsers } = usersActionsCreators;
        fetchListUsers();
    }
    render() {
        const { classes, handleSubmit, usersAccess } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <div className={classes.background}>
                    <div className={classes.login}>
                        <Card className={classes.root}>
                            <CardContent>
                                <div className="text-xs-center pb-xs">
                                    <Typography variant="caption">
                                        Đăng nhập để tiếp tục
                                    </Typography>
                                </div>
                                <Field
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    margin="normal"
                                    name="users"
                                    fullWidth
                                    component={renderTextField}
                                ></Field>

                                <Field
                                    id="password"
                                    label="Password"
                                    type="password"
                                    className={classes.textField}
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    component={renderTextField}
                                ></Field>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Login
                                </Button>
                                <Switch>
                                    {usersAccess ? (
                                        <Redirect to="/admin/task-board" />
                                    ) : (
                                        <Redirect to="/login" />
                                    )}
                                </Switch>

                                <div className="pt-1 text-md-center">
                                    <Link to="/signup">
                                        <Button>Đăng Kí Tài Khoản.</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        );
    }
}

LoginPage.propTypes = {
    classes: propTypes.object,
    listUsers: propTypes.array,
    usersAccess: propTypes.bool,
    usersActionsCreators: propTypes.shape({
        usersAccessSuccess: propTypes.func,
        usersAccessFailed: propTypes.func
    })
};

const mapStateToProps = state => {
    return {
        listUsers: state.users.listUsers,
        usersAccess: state.users.usersAccess
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usersActionsCreators: bindActionCreators(usersActions, dispatch)
    };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "TASK_MANAGEMENT";
const withReduxForm = reduxForm({
    form: FORM_NAME
});
export default compose(
    withStyles(styles),
    withConnect,
    withReduxForm
)(LoginPage);
