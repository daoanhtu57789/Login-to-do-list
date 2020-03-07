const drawerWidth = 240;
const styles = theme => ({
    drawerPaper: {
        width: drawerWidth,
        maxWidth: drawerWidth,
        zIndex: 10, //để cho ẩn sau loading
        height: "100%",
        position: "relative"
    },
    menuLink: {
        textDecoration: "none",
        color: theme.color.defaultTextColor
    },
    menuLinkActive: {
        "&>div": {
            backgroundColor: theme.color.hover
        }
    }
});

export default styles;
