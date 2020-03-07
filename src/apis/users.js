import axiosService from '../commons/axiosService';
//thư viện query-string chuyển thành query pram
import qs from 'query-string';
import {API_ENDPOINT} from '../contans/index';

//http:loaclhost:3000

const url = '/users';

export const getListUsers = (params={}) =>{
    let queryParams = '';
    if(Object.keys(params).length > 0){
        queryParams = `?${qs.stringify(params)}`;
        //qs.stringify(params) chạy ra được key=value vì params là object hoặc vào trang https://www.npmjs.com/package/query-string để biết thêm
    }
    return axiosService.get(`${API_ENDPOINT}${url}${queryParams}`);
};

//http://localhost:3000/users METHOD : POST
export const addUsers= (data) => {
    return axiosService.post(`${API_ENDPOINT}${url}`,data);
}

//http://localhost:3000/tasks/id METHOD : PUT
export const addTask = (data,usersId) => {
    return axiosService.put(`${API_ENDPOINT}${url}/${usersId}`,data);
}

//lấy dữ liệu người dùng hiện tại
export const getList = (params = {}) => {
    return axiosService.get(`${API_ENDPOINT}${url}/${params}`);
}
//xóa dữ liệu người dùng hiện tại bằng cách update dữ liệu
export const deleteTask = (data,usersId) => {
    return axiosService.put(`${API_ENDPOINT}${url}/${usersId}`,data);
}

//xóa dữ liệu người dùng hiện tại bằng cách update dữ liệu
export const updateTask = (data,usersId) => {
    return axiosService.put(`${API_ENDPOINT}${url}/${usersId}`,data);
}


