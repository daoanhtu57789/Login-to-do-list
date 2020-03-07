import * as tasksContants from "../contans/tasks";


export const fetchListTask = (params = {}) => {
    return {
        type: tasksContants.FETCH_TASK,
        payload:{
            params
        }
    };
};

export const fetchListTaskSuccess = data => {
    return {
        type: tasksContants.FETCH_TASK_SUCCESS,
        payload: {
            data
        }
    };
};

export const fetchListTaskFailed = error => {
    return {
        type: tasksContants.FETCH_TASK_FALSE,
        payload: {
            error
        }
    };
};

//Thêm dữ liệu
export const addTask = (name,password,data) => {
    return {
        type: tasksContants.ADD_TASK,
        payload:{
            name,
            password,
            data
        }
    }
};

export const addTaskSuccess = data => {
    return {
        type: tasksContants.ADD_TASK_SUCCESS,
        payload: {
            data
        }
    };
};

export const addTaskFailed = error => {
    return {
        type: tasksContants.ADD_TASK_FALSE,
        payload: {
            error
        }
    };
};

//xóa dữ liệu
export const deleteTask = (name,password,data) => {
    return {
        type: tasksContants.DELETE_TASK,
        payload:{
            name,
            password,
            data
        }
    }
};

export const deleteTaskSuccess = data => {
    return {
        type: tasksContants.DELETE_TASK_SUCCESS,
        payload: {
            data
        }
    };
};

export const deleteTaskFailed = error => {
    return {
        type: tasksContants.DELETE_TASK_FALSE,
        payload: {
            error
        }
    };
};

//settaskediting
export const setTaskEditing = data => {
    return {
        type: tasksContants.SET_TASK_EDITING,
        payload: {
            data
        }
    };
};

//xóa dữ liệu
export const updateTask = (name,password,data) => {
    return {
        type: tasksContants.UPDATE_TASK,
        payload:{
            name,
            password,
            data
        }
    }
};

export const updateTaskSuccess = data => {
    return {
        type: tasksContants.UPDATE_TASK_SUCCESS,
        payload: {
            data
        }
    };
};

export const updateTaskFailed = error => {
    return {
        type: tasksContants.UPDATE_TASK_FALSE,
        payload: {
            error
        }
    };
};

export const filterTask = (keyword = {},data) => {
    return {
        type: tasksContants.FILTER_TASK,
        payload:{
            keyword,
            data
        }
    }
};
