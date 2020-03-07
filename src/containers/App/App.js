import React, { Component } from "react";
import styles from "./styles.js";
import { withStyles } from "@material-ui/core";
//import Provider để kết nối với store
import { Provider } from "react-redux";
//lấy theme để truyền
import theme from "../../commons/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import configureStore from "./../../redux/configureStore";
//import để hiển thị thông báo
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import hiển thị loading
import GlobalLoading from "../../component/GlobalLoading/index";
import CommonModal from "../../component/Modal/index";

//import để xử dụng được route
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "../../contans/index.js";

import AdminLayoutRoute from "./../../commons/Layout/AdminLayoutRoute";
import DefaultLayoutRoute from "./../../commons/Layout/DefaultLayoutRoute";

//import để reset css
import CssBaseline from "@material-ui/core/CssBaseline";
//chaỵ configureStore() để lấy được store
const store = configureStore();

class App extends Component {
    renderAdminRoutes = () => {
        let xhtml = null;

        xhtml = ADMIN_ROUTES.map(route => {
            return (
                <AdminLayoutRoute
                    key={route.path}
                    component={route.component}
                    exact={route.exact}
                    path={route.path}
                    name={route.name}
                />
            );
            // có thể thay route thành component = {route.component} // exact = {route.exact}// path = {route.path} route = {route}
        });
        return xhtml;
    };

    renderDefaultRoutes = () => {
        let xhtml = null;
        xhtml = ROUTES.map(route => {
            return (
                <DefaultLayoutRoute
                    key={route.path}
                    component={route.component}
                    path={route.path}
                    name={route.name}
                />
            );
            // có thể thay route thành component = {route.component} // exact = {route.exact}// path = {route.path} route = {route}
        });
        return xhtml;
    };
    render() {

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalLoading />
                        <ToastContainer autoClose={1000} />
                        <CommonModal />
                        <Switch>
                            {this.renderAdminRoutes()}
                            {this.renderDefaultRoutes()}
                            {/* phải load được các component rồi mới chuyển trang login */}
                            <Redirect to="/login" />
                        </Switch>
                    </ThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}


export default withStyles(styles)(App);
