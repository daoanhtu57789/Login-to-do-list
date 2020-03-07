import {combineReducers} from 'redux';
import usersReducer from './users';
import uiReducer from './ui';
import modalReducer from './modal';
import taskReducer from './tasks';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
    users : usersReducer,
    ui : uiReducer,
    modal : modalReducer,
    tasks : taskReducer,
    //Mặc định là form
    //nếu ko có form thì sẽ không nhập vào textField được
    form : formReducer,
});

export default rootReducer;
