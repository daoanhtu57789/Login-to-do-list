import { createStore, compose,applyMiddleware } from "redux";
//lấy tất cả các reducer
import rootReducer from "./../reducer/index";
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './../saga/index';

//process biến của node js để kiểm tra môi trường
//môi trường dev mới dùng dev tool nếu up lên host rồi thì ko cần
const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    //biến global window có phải object hay ko thì mới xài extension dev tool
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              shouldHotReload: false
          })
        : compose;

//

const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
    //middlewares chứa danh sách các middlewares
    const middlewares = [thunk,sagaMiddleware]; //thunk ưu tiên hơn

    //sử dụng lần lượt các middlewares truyền vào theo kiểu es6
    const enhancers = [
        applyMiddleware(...middlewares)
    ];
    const store = createStore(rootReducer,composeEnhancers(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
