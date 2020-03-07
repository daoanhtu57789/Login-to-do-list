import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import propTypes from "prop-types";
//
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import * as usersActions from "../../../actions/users";

//khai báo các biến global
const menuId = "primary-search-account-menu";
// const mobileMenuId = "primary-search-account-menu-mobile";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            isMenuOpen: false
        };
    }
    handleProfileMenuOpen = event => {
        this.setState({
            anchorEl: event.currentTarget,
            isMenuOpen: true
        });
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
            isMenuOpen: false
        });
    };

    //chuyển đổi hiện sidebar hay không
    onToggleSidebar = () => {
        const { showSidebar, onToggleSidebar } = this.props;
        if (onToggleSidebar) {
            onToggleSidebar(!showSidebar);
        }
    };

    //Đăng Xuất
    handleLogout = () => {
        const { usersActionsCreators, history } = this.props;
        const { usersAccessFailed } = usersActionsCreators;
        usersAccessFailed();
        if (history) {
            history.push("/login");
        }
    };
    render() {
        const { anchorEl, isMenuOpen } = this.state;
        //cách ko lấy isMenuOpen ở state
        //khi click vào thì có thằng anchorEl => có isMenuOpen
        // const isMenuOpen = Boolean(anchorEl);
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );

        // Dành cho cả điện thoại
        // const renderMobileMenu = (
        //     <Menu
        //         anchorEl={null}
        //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
        //         id={mobileMenuId}
        //         keepMounted
        //         transformOrigin={{ vertical: "top", horizontal: "right" }}
        //         open={isMobileMenuOpen}
        //         onClose={handleMobileMenuClose}
        //     >
        //         <MenuItem>
        //             <IconButton aria-label="show 4 new mails" color="inherit">
        //                 <Badge badgeContent={4} color="secondary">
        //                     <MailIcon />
        //                 </Badge>
        //             </IconButton>
        //             <p>Messages</p>
        //         </MenuItem>
        //         <MenuItem>
        //             <IconButton
        //                 aria-label="show 11 new notifications"
        //                 color="inherit"
        //             >
        //                 <Badge badgeContent={11} color="secondary">
        //                     <NotificationsIcon />
        //                 </Badge>
        //             </IconButton>
        //             <p>Notifications</p>
        //         </MenuItem>
        //         <MenuItem onClick={handleProfileMenuOpen}>
        //             <IconButton
        //                 aria-label="account of current user"
        //                 aria-controls="primary-search-account-menu"
        //                 aria-haspopup="true"
        //                 color="inherit"
        //             >
        //                 <AccountCircle />
        //             </IconButton>
        //             <p>Profile</p>
        //         </MenuItem>
        //     </Menu>
        // );

        const { classes, name } = this.props;
        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.onToggleSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            {name}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        {/* dành cho điện thoại */}
                        {/* <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div> */}
                    </Toolbar>
                </AppBar>
                {/* {renderMobileMenu} */}
                {renderMenu}
            </div>
        );
    }
}

Header.propTypes = {
    classes: propTypes.object,
    name: propTypes.string,
    showSidebar: propTypes.bool,
    onToggleSidebar: propTypes.func,
    history: propTypes.object,
    usersActionsCreators : propTypes.shape({
        usersAccessFailed :propTypes.func
    }),

};

const mapDispatchToProps = dispatch => {
    return {
        usersActionsCreators: bindActionCreators(usersActions, dispatch)
    };
};

const withConnect = connect(null, mapDispatchToProps);

//withRouter truyền các props cho thằng Header
export default compose(withStyles(styles), withConnect)(withRouter(Header));
