import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
import propTypes from 'prop-types';
import LoadingIcon from './../../assets/images/loading.gif';
//
import {connect} from 'react-redux';
import {compose} from 'redux';
class GlobalLoading extends Component {
    render() {
        const {classes,showLoading} = this.props;
        let xhtml = null;
        if(showLoading){
            xhtml = (
                <div className={classes.globalLoading}>
                    <img src = {LoadingIcon} alt = "loading" className={classes.icon}></img>
                </div>
            );
        };
        return xhtml;
    }
}

GlobalLoading.propTypes = {
    classes : propTypes.object,
    showLoading : propTypes.bool
}

const mapStateToProps = state => {
    return{
        showLoading : state.ui.showLoading,
    };
};

const withConnect = connect(
    mapStateToProps,
    null
);
//cách 1
export default compose(withStyles(styles),withConnect)(GlobalLoading);
//cách 2
//export default withStyles(styles)(connect(mapStateToProps,null)(GlobalLoading));

