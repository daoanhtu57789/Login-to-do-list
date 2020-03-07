import * as uiContans from './../contans/ui';

export const showLoading = () =>({
    type : uiContans.SHOW_LOADING,
});

export const hideLoading = () =>({
    type : uiContans.HIDE_LOADING,
});

export const showSidebar = () =>({
    type : uiContans.SHOW_SIDEBAR,
});

export const hideSidebar = () =>({
    type : uiContans.HIDE_SIDEBAR,
});
