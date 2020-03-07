import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import {
    CardContent,
    CardActions,
    Grid,
    Fab,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import propTypes from "prop-types";

class TaskItem extends Component {
    render() {
        const {
            title,
            task,
            status,
            classes,
            onClickDelete,
            onClickEdit
        } = this.props;
        return (
            <Card key={task.id} className={classes.cart}>
                <CardContent>
                    {/* grid ngoài cùng phải có container ko thì sẽ ko chạy */}
                    <Grid container justify="space-between">
                        <Grid item md={8}>
                            <Typography component="h2">{title}</Typography>
                        </Grid>
                        <Grid item md={4}>
                            {status.label}
                        </Grid>
                    </Grid>
                    <p>{task.description}</p>
                </CardContent>

                <CardActions className={classes.cardActions}>
                    <Fab
                        color="primary"
                        aria-label="edit"
                        size="small"
                        className={classes.fab}
                        onClick={() => onClickEdit(task)}
                    >
                        <EditIcon fontSize="small" />
                    </Fab>
                    <Fab
                        color="secondary"
                        aria-label="delete"
                        size="small"
                        className={classes.fab}
                    >
                        <DeleteIcon
                            fontSize="small"
                            //khi click vào button thì sẽ gọi hàm onClickDelete mà ở TaskList truyền vào
                            onClick={() => onClickDelete(task)}
                        />
                    </Fab>
                </CardActions>
            </Card>
        );
    }
}

TaskItem.propTypes = {
    title: propTypes.string,
    task: propTypes.object,
    status: propTypes.object,
    classes: propTypes.object,
    onClickDelete : propTypes.func,
    onClickEdit : propTypes.func
};

export default withStyles(styles)(TaskItem);
