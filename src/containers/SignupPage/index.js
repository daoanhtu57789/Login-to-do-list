import React, { Component } from "react";
import styles from "./styles";
import propTypes from "prop-types";
import {
    withStyles,
    Card,
    CardContent,
    Typography,
    Button,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { Link, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "./../../actions/users";

import { reduxForm, Field } from "redux-form";
import { compose } from "redux";

import { toastError, toastSuccess } from "./../../helpers/toastHelpers";

//Field bắt buộc phải có component để render ra
import renderTextField from "../../component/FormHelper/TextField";

class SignupPage extends Component {
    handleSubmitForm = data => {
        const { usersActionsCreators, listUsers } = this.props;
        const { addUsers } = usersActionsCreators;
        const { users: newUsers, password, confirmpassword } = data;
        if (listUsers.length === 0) {
            if (password === confirmpassword) {
                addUsers(newUsers, password);
            } else {
                toastError("Mật khẩu không giống nhau");
            }
        } else {
            let itemUser = listUsers.filter(user => user.name !== newUsers);
            //nee
            if (itemUser.length !== listUsers.length) {
                toastError("Tài Khoản Đã Tồn Tại");
            } else {
                if (password === confirmpassword) {
                    addUsers(newUsers, password);
                    toastSuccess("Đăng Ký Thành Công");
                } else {
                    toastError("Mật khẩu không giống nhau");
                }
            }
        }
    };

    render() {
        const { classes, handleSubmit, checkSingup } = this.props;
        return (
            //onSubmit sẽ truyền value của Field có name là title và description vào hàm handleSubmitForm
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <div className={classes.background}>
                    <div className={classes.signup}>
                        <Card className={classes.root}>
                            <CardContent>
                                <div className="text-xs-center pb-xs">
                                    <Typography variant="caption">
                                        Đăng Kí để tiếp tục
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

                                <Field
                                    id="comfirmpassword"
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmpassword"
                                    className={classes.textField}
                                    fullWidth
                                    margin="normal"
                                    component={renderTextField}
                                ></Field>

                                <FormControlLabel
                                    control={<Checkbox value="agree" />}
                                    label="Tôi Đã Đọc Và Đồng Ý  Điều Khoản."
                                    className={classes.fullWidth}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                >
                                    Singup
                                </Button>
                                <Switch>
                                    {checkSingup ? (
                                        <Redirect to="/login" />
                                    ) : (
                                        ""
                                    )}
                                </Switch>

                                <div className="pt-1 text-md-center">
                                    <Link to="/login">
                                        <Button>Đã Có Tài Khoản?</Button>
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

SignupPage.propTypes = {
    classes: propTypes.object,
    usersActionsCreators: propTypes.shape({
        addUsers: propTypes.func
    }),
    listUsers: propTypes.array,
    usersAccess: propTypes.bool,
    checkSingup: propTypes.bool
};

const mapStateToProps = state => {
    return {
        listUsers: state.users.listUsers,
        usersAccess: state.users.usersAccess,
        checkSingup: state.users.checkSingup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usersActionsCreators: bindActionCreators(usersActions, dispatch)
    };
};

//kết nối
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "TASK_MANAGEMENT";
const withReduxForm = reduxForm({
    form: FORM_NAME
});
export default compose(
    withStyles(styles),
    //phải để withConnect trước để được ưu tiên hơn vì reduxForm cần state của withConnect
    withConnect,
    withReduxForm
)(SignupPage);
