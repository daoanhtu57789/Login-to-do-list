import React, { Component } from "react";
import styles from "./styles";
import { withStyles, Grid, Box, MenuItem, Button } from "@material-ui/core";
//1 field tương ứng với 1 ô input hoặc là 1 select ....
import { reduxForm, Field } from "redux-form";
import validate from "./validate";
import propTypes from "prop-types";
import { compose } from "redux";
//Field bắt buộc phải có component để render ra
import renderTextField from "../../component/FormHelper/TextField";
import renderSelectField from "../../component/FormHelper/Select";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActions from "../../actions/modal";
import * as tasksActions from "../../actions/tasks";

import { STATUSES } from "../../contans/index";

class TaskForm extends Component {
    handleSubmitForm = data => {
        const {
            tasksActionsCreator,
            listTask,
            currentUsers,
            taskEditing
        } = this.props;
        const { addTask, updateTask } = tasksActionsCreator;
        const { title, description, status } = data;
        //do listTask thay đổi nên nó sẽ tự fetchListTask
        //console.log(listTask)
        if (taskEditing && taskEditing.id) {
            const newList = [
                { title, description, status, id: taskEditing.id }
            ].concat(listTask.filter(task => task.id !== taskEditing.id));

            updateTask(currentUsers.name, currentUsers.password, newList);
        } else {
            for (let i = 0; i < listTask.length; i++) {
                //phải đánh id theo cách này nếu không thì trùng id sẽ phải xóa cả 2 id giống nhau
                //vd: id : 1 2 3 xóa 2 nếu thêm mới theo cách listTask.length + 1 thì sẽ có 2 id là 3
                //ta phải set id về theo thứ tự
                listTask[i].id = i + 1;
            }

            listTask.push({
                title: data.title,
                description: data.description,
                status: STATUSES[0].value,
                id: listTask.length + 1
            });
            addTask(currentUsers.name, currentUsers.password, listTask);
        }
    };

    renderStatusSelection() {
        let xhtml = null;
        const { taskEditing, classes } = this.props;
        if (taskEditing && taskEditing.id) {
            console.log(taskEditing);
            xhtml = (
                <Field
                    id="status"
                    label="Trạng Thái"
                    className={classes.select}
                    name="status"
                    component={renderSelectField}
                >
                    <MenuItem value={0}>Ready</MenuItem>
                    <MenuItem value={1}>In Progress</MenuItem>
                    <MenuItem value={2}>Completed</MenuItem>
                </Field>
            );
        }
        return xhtml;
    }
    render() {
        //handleSubmit là hàm mà redux-form nó cung cấp cho
        const {
            classes,
            invalid,
            submitting,
            modalActionsCreator,
            handleSubmit
        } = this.props;
        const { hideModal } = modalActionsCreator;
        return (
            //onSubmit sẽ truyền value của Field có name là title và description vào hàm handleSubmitForm
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <Grid container>
                    <Grid item md={12}>
                        <Field
                            id="title"
                            label="Tiêu Đề"
                            className={classes.textField}
                            margin="normal"
                            name="title"
                            component={renderTextField}
                        ></Field>
                    </Grid>

                    <Grid item md={12}>
                        <Field
                            id="description"
                            label="Mô Tả"
                            className={classes.textField}
                            multiline
                            rowmax="4"
                            margin="normal"
                            name="description"
                            component={renderTextField}
                        ></Field>
                    </Grid>

                    {this.renderStatusSelection()}

                    {/* phần button */}
                    <Grid item md={12}>
                        {/* flexDirection="row-reverse" Đảo ngược vị trí button ở trong */}
                        <Box display="flex" flexDirection="row-reverse" mt={2}>
                            <Box ml={1}>
                                <Button variant="contained" onClick={hideModal}>
                                    Hủy Bỏ
                                </Button>
                            </Box>

                            <Button
                                // Nếu nhập đúng theo validate thì sẽ bấm được còn ko thì ẩn nút Lưu Lại
                                disabled={invalid || submitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Lưu Lại
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

TaskForm.propTypes = {
    classes: propTypes.object,
    invalid: propTypes.bool,
    submitting: propTypes.bool,
    modalActionsCreator: propTypes.shape({
        hideModal: propTypes.func
    }),
    listTask: propTypes.array,
    currentUsers: propTypes.object
};
const mapStateToProps = state => {
    return {
        listTask: state.tasks.listTask,
        currentUsers: state.users.currentUsers,
        taskEditing: state.tasks.taskEditing,
        //Có initialValues thì mới chuyền được dữ liệu ở taskEditing
        initialValues: {
            //title thì truyền vào trường có name là là title tương tự như cái khác
            title: state.tasks.taskEditing
                ? state.tasks.taskEditing.title
                : null,
            description: state.tasks.taskEditing
                ? state.tasks.taskEditing.description
                : null,
            status: state.tasks.taskEditing
                ? state.tasks.taskEditing.status
                : null
        }
    };
};
const mapDispatchToProps = dispatch => {
    return {
        modalActionsCreator: bindActionCreators(modalActions, dispatch),
        tasksActionsCreator: bindActionCreators(tasksActions, dispatch)
    };
};

//kế nối
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "TASK_MANAGEMENT";
const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate
});
export default compose(
    withStyles(styles),
    //phải để withConnect trước để được ưu tiên hơn vì reduxForm cần state của withConnect
    withConnect,
    withReduxForm
)(TaskForm);
