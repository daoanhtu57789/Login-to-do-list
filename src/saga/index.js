import { STATUS_CODE } from "./../contans/index";
import { getListUsers } from "./../apis/users";
//import các sự kiện của loading
import { showLoading, hideLoading } from "../actions/ui";
//import các sự kiện của tải dữ liệu
import {
    fetchListUsersSuccess,
    fetchListUsersFailed,
    addUsersSuccess,
    addUsersFailed
} from "./../actions/users";
import {
    fetchListTaskSuccess,
    fetchListTaskFailed,
    deleteTaskSuccess,
    deleteTaskFailed,
    updateTaskSuccess,
    updateTaskFailed
} from "./../actions/tasks";
import { addTaskSuccess, addTaskFailed } from "./../actions/tasks";
import { hideModal } from "./../actions/modal";

import {
    fork,
    take,
    call,
    put,
    delay,
    takeLatest,
    select,
    takeEvery
} from "redux-saga/effects";

import * as usersTypes from "../contans/users";
import * as tasksTypes from "../contans/tasks";

import { addUsers, addTask, getList,updateTask } from "./../apis/users";
//lấy dữ liệu users
function* watchListUsersActions() {
    while (true) {
        //lắng nghe sự kiện FETCH_USERS
        const action = yield take(usersTypes.FETCH_USERS);
        //nếu sự kiện xảy ra hiển thị loading trong lúc chờ lấy dữ liệu
        // yield put(showLoading());
        //lấy prams từ payload của action
        let { params } = action.payload;
        //goị hàm api getList và lấy giá trị trả về
        const resp = yield call(getListUsers, params);
        const { status, data } = resp;
        if (status === STATUS_CODE.SUCCESS) {
            //thực hiện hàm lấy dữ liệu thành công
            yield put(fetchListUsersSuccess(data));
        } else {
            //thực hiện hàm lấy dữ liệu thất bại
            yield put(fetchListUsersFailed(data));
        }
        // //chờ 1000ms
        // yield delay(1000);

        // //đóng showLoading
        // yield put(hideLoading());
    }
}
//lấy dữ liệu users hiện tại
function* watchListTaskAction() {
    while (true) {
        const action = yield take(tasksTypes.FETCH_TASK); //lắng nghe và theo dõi action
        //khi fetch đc bắt thì code dưới mới đc chạy
        yield put(showLoading());
        let { params } = action.payload;
        //===từ đây sẽ bị block===//
        //truyền params vào hàm getlist
        const resp = yield call(getList, params);
        const { status, data } = resp;
        if (STATUS_CODE.SUCCESS === status) {
            //dispatch action fetchListTaskSuccess
            yield put(fetchListTaskSuccess(data.data));
        } else {
            //dispatch action fetchListTaskFalse
            yield put(fetchListTaskFailed(data.data));
        }
        //trì hoãn đóng loading 1s để tăng trải nghiệm người dùng
        yield delay(500);
        //đóng loading
        yield put(hideLoading());
    }
}
//đăng ký users
function* addUsersSaga({ payload }) {
    const { name, password, data } = payload;
    yield put(showLoading());
    const resp = yield call(addUsers, {
        name,
        password,
        data
    });

    const { data: dataRepon, status } = resp;
    if (status === STATUS_CODE.CREATED) {
        yield put(addUsersSuccess(dataRepon));
    } else {
        yield put(addUsersFailed(dataRepon));
    }
    //ẩn loadding
    yield delay(1000);
    yield put(hideLoading());
}

//Thêm mới công việc vào users hiện tại
function* addTaskSaga({ payload }) {
    const { name, password, data } = payload;
    //hiển thị nền loading
    yield put(showLoading());
    //lấy ra danh sách
    const taskEditing = yield select(state => state.users.currentUsers);

    const resp = yield call(addTask, { name, password, data }, taskEditing.id);
    const { data: respData, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
        yield put(addTaskSuccess(respData));
        //Khi thêm mới thành công thì ẩn form nhập liệu đi
        yield put(hideModal());
    } else {
        yield put(addTaskFailed(respData));
    }
    //ẩn loadding sau 1s
    yield delay(1000);
    yield put(hideLoading());
}

//xóa công việc của users hiện tại
function* deleteTaskSaga({ payload }) {
    const { name, password, data } = payload;
    //hiển thị nền loading
    yield put(showLoading());
    //lấy ra danh sách
    const taskEditing = yield select(state => state.users.currentUsers);

    const resp = yield call(addTask, { name, password, data }, taskEditing.id);
    const { data: respData, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
        yield put(deleteTaskSuccess(respData));
        //Khi thêm mới thành công thì ẩn form nhập liệu đi
        yield put(hideModal());
    } else {
        yield put(deleteTaskFailed(respData));
    }
    //ẩn loadding sau 1s
    yield delay(1000);
    yield put(hideLoading());
}

//sửa công việc của users hiện tại
function* updateTaskSaga({ payload }) {
    const { name, password, data } = payload;
    //hiển thị nền loading
    yield put(showLoading());
    //lấy ra danh sách
    const taskEditing = yield select(state => state.users.currentUsers);

    const resp = yield call(
        updateTask,
        { name, password, data },
        taskEditing.id
    );
    const { data: respData, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
        yield put(updateTaskSuccess(respData));
        //Khi thêm mới thành công thì ẩn form nhập liệu đi
        yield put(hideModal());
    } else {
        yield put(updateTaskFailed(respData));
    }
    //ẩn loadding sau 1s
    yield delay(1000);
    yield put(hideLoading());
}

function* rootSaga() {
    //lấy danh sách users
    yield fork(watchListUsersActions);
    //lấy dữ liệu người dùng hiện tại
    yield fork(watchListTaskAction);
    //Thêm users
    yield takeEvery(usersTypes.ADD_USERS, addUsersSaga);
    //Thêm mới công việc
    yield takeEvery(tasksTypes.ADD_TASK, addTaskSaga);
    //Xóa công việc
    yield takeLatest(tasksTypes.DELETE_TASK, deleteTaskSaga);
    //Xóa công việc
    yield takeLatest(tasksTypes.UPDATE_TASK, updateTaskSaga);
}

export default rootSaga;
