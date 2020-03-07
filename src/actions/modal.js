import * as modalContans from './../contans/modal';

export const showModal = () =>{
    return {
        type : modalContans.SHOW_MODAL
    };
};

export const hideModal = () =>{
    return {
        type : modalContans.HIDE_MODAL
    };
};

export const changeModalContent = (component) =>{
    return {
        type : modalContans.CHANGE_MODAL_CONTENT,
        payload : {
            component
        }
    };
};

export const changeModalTitle = title =>{
    return {
        type : modalContans.CHANGE_MODAL_TITLE,
        payload : {
            title
        }
    };
};
