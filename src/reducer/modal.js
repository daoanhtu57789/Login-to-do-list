import * as modalContans from './../contans/modal';

const intialState = {
    showModal : false,
    component : null
}

const reducer = (state = intialState,action) =>{
    switch(action.type){
        case modalContans.SHOW_MODAL :{
            return{
                ...state,
                showModal : true
            }
        }

        case modalContans.HIDE_MODAL :{
            return{
                ...state,
                showModal:false,
                title:'',
                component:null
            }
        }

        case modalContans.CHANGE_MODAL_CONTENT :{
            const {component} = action.payload;
            return{
                ...state,
                component
            }
        }

        case modalContans.CHANGE_MODAL_TITLE :{
            const {title} = action.payload;
            return{
                ...state,
                title
            }
        }

        default :
            return {
                ...state
            }
    }
}

export default reducer;
