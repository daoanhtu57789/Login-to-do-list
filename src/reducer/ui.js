import * as uiContans from './../contans/ui';

const initialStore = {
    showLoading : false,
    showSidebar : true
};

const reducer  = (state = initialStore,action) =>{
    switch(action.type){
        case uiContans.SHOW_LOADING : {
            return {
                ...state,
                showLoading : true
            }
        }

        case uiContans.HIDE_LOADING : {
            return {
                ...state,
                showLoading : false
            }
        }

        case uiContans.SHOW_SIDEBAR : {
            return {
                ...state,
                showSidebar : true
            }
        }

        case uiContans.HIDE_SIDEBAR : {
            return {
                ...state,
                showSidebar : false
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default reducer;
