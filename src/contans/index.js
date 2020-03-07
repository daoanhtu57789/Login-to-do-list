import AdminHomePage from './../containers/AdminHomePage';
import TaskBoard from './../containers/TaskBoard';

import LoginPage from './../containers/LoginPage/index';
import SignupPage from './../containers/SignupPage/index';

export const API_ENDPOINT = "http://localhost:3000";

export const STATUSES = [
    {
        value : 0,
        label : 'READY'
    },
    {
        value : 1,
        label : 'IN PROGRESS'
    },
    {
        value : 2,
        label : 'COMPLETED'
    }
];

export const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    UPDATED: 202
};

export const ADMIN_ROUTES = [
    {
        path : "/admin",
        exact : true,
        component : AdminHomePage,
        name : "Trang quản trị"
    },
    {
        path : "/admin/task-board",
        component : TaskBoard,
        name : "Quản Lý Công Việc"
    },


];

export const ROUTES = [
    {
        path : "/login",
        component : LoginPage,
        name : "Trang Đăng Nhập"
    },
    {
        path : "/signup",
        component : SignupPage,
        name : "Trang Đăng Kí"
    },
];
