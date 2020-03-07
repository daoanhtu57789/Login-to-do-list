import axios from 'axios';

class axiosService {
    //hàm khởi tạo chạy khi gọi toán tử new
    constructor(){
        const instance = axios.create();
        instance.interceptors.response.use(this.handleSuccess,this.handleError);
        this.instance = instance;
    }

    handleSuccess(resp){
        return resp;
    }

    handleError(error){
        return Promise.reject(error);
    }

    get(url){
        return this.instance.get(url);
    }

    post(url,body){
        return this.instance.post(url,body);
    }

    // delete(url,id){
    //     return this.instance.delete(url,id);
    // }

    put(url , body){
        return this.instance.put(url,body);
    }
}

export default new axiosService();
