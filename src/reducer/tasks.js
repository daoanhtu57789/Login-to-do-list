import * as tasksConstants from "./../contans/tasks";
import { toastError, toastSuccess } from "./../helpers/toastHelpers";
const initialState = {
    listTask: [],
    taskEditing: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case tasksConstants.FETCH_TASK: {
            return {
                ...state,
                listTask: []
            };
        }

        case tasksConstants.FETCH_TASK_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listTask: data
            };
        }
        case tasksConstants.FETCH_TASK_FALSE: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                listTask: []
            };
        }

        case tasksConstants.ADD_TASK: {
            return {
                ...state
            };
        }

        case tasksConstants.ADD_TASK_SUCCESS: {
            const { data } = action.payload.data;
            toastSuccess("Thêm Mới Công Việc Thành Công");
            return {
                ...state,
                listTask: data
            };
        }

        case tasksConstants.ADD_TASK_FALSE: {
            toastError("Thêm Mới Công Việc Thất Bại");
            const { error } = action.payload;
            toastError(error);
            return {
                ...state
            };
        }

        //xóa công việc

        case tasksConstants.DELETE_TASK: {
            return {
                ...state
            };
        }

        case tasksConstants.DELETE_TASK_SUCCESS: {
            const { data } = action.payload.data;
            toastSuccess("Xóa Công Việc Thành Công");
            return {
                ...state,
                listTask: data
            };
        }

        case tasksConstants.DELETE_TASK_FALSE: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state
            };
        }

        //setTaskEditing
        case tasksConstants.SET_TASK_EDITING: {
            const { data } = action.payload;
            return {
                ...state,
                taskEditing: data
            };
        }

        //sửa công việc

        case tasksConstants.UPDATE_TASK: {
            return {
                ...state
            };
        }

        case tasksConstants.UPDATE_TASK_SUCCESS: {
            const { data } = action.payload.data;

            toastSuccess("Sửa Công Việc Thành Công");
            return {
                ...state,
                listTask: data
            };
        }

        case tasksConstants.UPDATE_TASK_FALSE: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state
            };
        }

        case tasksConstants.FILTER_TASK: {
            const { keyword, data } = action.payload;
            const filteredTask = data.filter(task =>
                task.title
                    .trim()
                    .toLowerCase()
                    .includes(keyword.trim().toLowerCase()),
            );

            return {
                ...state,
                listTask : filteredTask
            };
        }

        default:
            return state;
    }
};

export default reducer;
