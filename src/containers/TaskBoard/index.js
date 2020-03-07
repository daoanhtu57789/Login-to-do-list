import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//Thêm icon dấu + vào trước thêm công việc
import AddIcon from "@material-ui/icons/Add";
//truyền styles vào cho TaskBoard
import { withStyles, Box } from "@material-ui/core";

import styles from "./styles";
import SearchBox from "./../../component/SearchBox/index";
import TaskList from "./../../component/TaskList/index";
import { Grid } from "@material-ui/core";
import { STATUSES } from "../../contans/index";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
//kết nối đến store
import { connect } from "react-redux";
//lấy các action từ task

import * as tasksActions from "./../../actions/tasks";
import * as modalActions from "./../../actions/modal";

import TaskForm from "./../TaskForm/index";
class TaskBoard extends Component {
    //Hiển thị search Box
    renderSearchBox = () => {
        let xhtml = null;
        xhtml = <SearchBox handleChange={this.handleFilter} />;
        return xhtml;
    };
    // Hiển thị bảng
    renderBoard = () => {
        let xhtml = null;
        const {listTask} = this.props;
        xhtml = (
            // md là số cột,có 12 cột tất cả
            //xs là thu nhỏ thì sẽ là 12 cột tức là full chiều ngang
            <Grid container spacing={2}>
                {STATUSES.map(status => {
                    // filter sẽ trả về các listTask có status giống với giá trị tương ứng với STATUSES mà đang map
                    // xong rồi render ra filter
                    const taskFiltered = listTask.filter(
                        task => task.status === status.value
                    );
                    return (
                        <TaskList
                            key={status.value}
                            taskFiltered={taskFiltered}
                            status={status}
                            onClickEdit={this.onClickEdit}
                            onClickDelete={this.onClickDelete}
                        />
                    );
                })}
            </Grid>
        );
        return xhtml;
    };

    //load dữ liệu mỗi khi mở trang
    componentDidMount() {
        const { taskActionCreators } = this.props;
        const { fetchListTask } = taskActionCreators;
        const data = JSON.parse(localStorage.getItem("users"));
        fetchListTask(data.id);
    }
    //load dữ liệu
    loadData = () => {
        const { taskActionCreators } = this.props;
        const { fetchListTask } = taskActionCreators;
        const data = JSON.parse(localStorage.getItem("users"));
        fetchListTask(data.id);
    };

    //Mở form nhập liệu
    openForm = () => {
        const { modalActionCreators, taskActionCreators } = this.props;
        const {
            showModal,
            changeModalContent,
            changeModalTitle
        } = modalActionCreators;
        const { setTaskEditing } = taskActionCreators;
        setTaskEditing(null);
        showModal();
        changeModalTitle("Thêm Mới Công Việc");
        changeModalContent(<TaskForm />);
    };

    //sự kiện nhập để tìm kiếm
    handleFilter = e => {
        //lấy từ khóa tìm kiếm
        const { value } = e.target;
        const {data} = JSON.parse(localStorage.getItem("users"));
        const {taskActionCreators } = this.props;
        const { filterTask } = taskActionCreators;
        filterTask(value ,data );

    };

    //sự kiện hiện form xóa task
    onClickDelete = task => {
        const { classes, modalActionCreators } = this.props;
        const {
            showModal,
            changeModalContent,
            changeModalTitle,
            hideModal
        } = modalActionCreators;
        showModal();
        changeModalTitle("Xóa Công Việc");
        changeModalContent(
            <div className={classes.modalDelete}>
                <div className={classes.modalConfirmText}>
                    Bạn Có Chắc Muốn Xóa{" "}
                    <span className={classes.modalConfirmTextBold}>
                        {task.title}
                    </span>
                    ?
                </div>
                <Box display="flex" flexDirection="row-reverse" mt={2}>
                    <Box ml={1}>
                        <Button variant="contained" onClick={hideModal}>
                            Hủy Bỏ
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleDeleteTask(task)}
                        >
                            Đồng Ý
                        </Button>
                    </Box>
                </Box>
            </div>
        );
    };

    //sử lý xóa task
    handleDeleteTask = task => {
        const { modalActionCreators, taskActionCreators } = this.props;
        const { hideModal } = modalActionCreators;
        const { deleteTask } = taskActionCreators;
        const data = JSON.parse(localStorage.getItem("users"));
        hideModal();
        deleteTask(
            data.name,
            data.password,
            data.data.filter(item => item.id !== task.id)
        );
    };

    //sự kiện sửa task thì hiện form
    onClickEdit = task => {
        const { modalActionCreators, taskActionCreators } = this.props;
        const {
            showModal,
            changeModalContent,
            changeModalTitle
        } = modalActionCreators;
        const { setTaskEditing } = taskActionCreators;
        setTaskEditing(task);
        showModal();
        changeModalTitle("Cập Nhật Công Việc");
        changeModalContent(<TaskForm task={task} />);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        marginRight: 20
                    }}
                    className={classes.button}
                    onClick={this.loadData}
                >
                    Load Data
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.openForm}
                >
                    <AddIcon /> Thêm Mới Công Việc
                </Button>

                {this.renderSearchBox()}
                {this.renderBoard()}
            </div>
        );
    }
}

TaskBoard.propTypes = {
    classes: propTypes.object,
    taskActionCreators: propTypes.shape({
        fetchListTask: propTypes.func,
        setTaskEditing: propTypes.func
    }),
    currentUsers: propTypes.oneOfType([propTypes.object, propTypes.array]),
    listTask: propTypes.array,
    modalActionCreators: propTypes.shape({
        showModal: propTypes.func
    })
};

const mapStateToProps = state => {
    return {
        currentUsers: state.users.currentUsers,
        listTask: state.tasks.listTask
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //lấy tất cả các action ở trong taskAtions truyền vào taskActionCreators muốn action nào chạy thì gọi ra
        taskActionCreators: bindActionCreators(tasksActions, dispatch),
        modalActionCreators: bindActionCreators(modalActions, dispatch)
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
