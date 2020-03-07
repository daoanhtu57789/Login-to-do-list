import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from '../SearchBox/styles';
import propTypes from 'prop-types';


class SearchBox extends Component {
    render() {
        const  {classes,handleChange} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    autoComplete = "off"
                    className={classes.textField}
                    onChange = {handleChange}
                    margin = "normal"
                    placeholder = "Nhập Từ Khóa"
                />
            </form>
        );
    }
}

SearchBox.propTypes = {
    classes : propTypes.object,
    handleChange : propTypes.func,
}

export default withStyles(styles)(SearchBox);
