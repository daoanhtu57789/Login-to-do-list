import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import propTypes from 'prop-types';
import TaskItem from './../TaskItem/index';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';
;
class TaskList extends Component {
  render() {
    const { status, taskFiltered,classes,onClickDelete,onClickEdit } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <Box mt={1} mb={1}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wapperListTask}>
          {taskFiltered.map((task, index) => {
            const { title } = task;
            return (
              <TaskItem
                title={title}
                key={index}
                task={task}
                status={status}
                onClickEdit={() => onClickEdit(task)}
                onClickDelete={() => onClickDelete(task)}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}
//check prop types
TaskList.propTypes = {
    status :propTypes.object,
    taskFiltered:propTypes.array,
    classes : propTypes.object,
    onClickDelete : propTypes.func,
    onClickEdit : propTypes.func
}

export default withStyles(styles)(TaskList);
