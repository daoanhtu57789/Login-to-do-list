import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";

import propTypes from "prop-types";

import Drawer from "@material-ui/core/Drawer";
//
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ADMIN_ROUTES } from "./../../../contans/index";

import { NavLink } from "react-router-dom";
class SideBar extends Component {
    // onToggleSidebar = () => {
    //     const {onToggleSidebar} = this.props;
    //     if(onToggleSidebar){
    //         onToggleSidebar();
    //     }
    // };

    renderListSidebar = () => {
        const { classes } = this.props;
        let xhtml = null;
        xhtml = (
            <div className={classes.list}>
                <List component="div">
                    {ADMIN_ROUTES.map(route => (
                        <NavLink
                            key={route.path}
                            to={route.path}
                            exact={route.exact}
                            className={classes.menuLink}
                            activeClassName={classes.menuLinkActive}
                        >
                            <ListItem
                                button
                                key={route.path}
                                className={classes.menuItem}
                            >
                                <ListItemText primary={route.name} />
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </div>
        );
        return xhtml;
    };
    render() {
        const { classes, showSidebar } = this.props;
        return (
            <Drawer
                variant="persistent"
                open={showSidebar}
                classes={{
                    paper: classes.drawerPaper
                }}
                // onClose={() => this.onToggleSidebar(false)}
            >
                {this.renderListSidebar()}
            </Drawer>
        );
    }
}

SideBar.propTypes = {
    classes: propTypes.object,
    showSidebar: propTypes.bool,
    onToggleSidebar: propTypes.func
};

export default withStyles(styles)(SideBar);
