import React from 'react';
import { Select, FormControl, InputLabel ,FormHelperText, withStyles} from '@material-ui/core';
import propTypes from 'prop-types';
import styles from './styles';
//có 2 cách viết component là function component và class component
//đây là viết function component,cách này ko sử dụng được lifecricle hoặc các state local

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return null;
    }
    return <FormHelperText>{touched && error}</FormHelperText>;
};


renderFromHelper.propTypes = {
    touched: propTypes.bool,
    error: propTypes.bool,
};


const renderSelectField = ({
    classes,
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
    <FormControl className = {classes.formControl} error={touched && error}>
        <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
        <Select
            {...input}
            {...custom}
            inputProps={{
                name: 'age',
                id: 'age-native-simple',
            }}
            value = {input.value}
        >
            {/*Danh sách đổ vào giữa children*/}
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
);

renderSelectField.propTypes = {
    label: propTypes.string,
    input: propTypes.object,
    meta: propTypes.object,
    children: propTypes.array,
    classes: propTypes.object,
};

export default withStyles(styles)(renderSelectField);
