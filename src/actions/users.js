import * as usersContants from "../contans/users";

//lấy danh sách users
export const fetchListUsers = (params = {}) => {
    return {
        type: usersContants.FETCH_USERS,
        payload:{
            params
        }
    };
};

export const fetchListUsersSuccess = data => {
    return {
        type: usersContants.FETCH_USERS_SUCCESS,
        payload: {
            data
        }
    };
};

export const fetchListUsersFailed = error => {
    return {
        type: usersContants.FETCH_USERS_FALSE,
        payload: {
            error
        }
    };
};

//kiểm tra đăng nhập users
export const usersAccessSuccess = (data) => {
    return {
        type: usersContants.USERS_ACCESS_SUCCESS,
        payload : {
            data
        }
    };
};

export const usersAccessFailed = (error) => {
    return {
        type: usersContants.USERS_ACCESS_FALSE,
        payload : {
            error
        }
    };
};

//đăng ký users

export const addUsers = (name,password,data = []) => {
    return {
        type: usersContants.ADD_USERS,
        payload:{
            name,
            password,
            data
        }
    };
};

export const addUsersSuccess = data => {
    return {
        type: usersContants.ADD_USERS_SUCCESS,
        payload: {
            data
        }
    };
};

export const addUsersFailed = error => {
    return {
        type: usersContants.ADD_USERS_FALSE,
        payload: {
            error
        }
    };
};


// //lấy dữ liệu users
// export const fetchDataUsers = (params = {}) => {
//     return {
//         type: usersContants.FETCH_DATA_USERS,
//         payload:{
//             params
//         }
//     };
// };

// export const fetchDataUsersSuccess = data => {
//     return {
//         type: usersContants.FETCH_DATA_USERS_SUCCESS,
//         payload: {
//             data
//         }
//     };
// };

// export const fetchDataUsersFailed = error => {
//     return {
//         type: usersContants.FETCH_DATA_USERS_FALSE,
//         payload: {
//             error
//         }
//     };
// };
