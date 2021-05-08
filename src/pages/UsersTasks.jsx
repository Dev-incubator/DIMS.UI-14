import React from 'react';
import Button from '../components/Button/Button';
import noop from '../shared/noop';
import classes from './Users-tasks.module.css';

export default class UsersTasks extends React.Component {
    render() {
        return (
            <div>
            <div className={classes.header}>
                <h2 className={classes.title}></h2>
                <Button onClick={noop}>Back to users</Button>
            </div>
            <div className={classes.content}>
                <div className={classes.subheader}>
                    <div>№</div>
                    <div>Task Name</div>
                    <div>Start Date</div>
                    <div>Deadline</div>
                    <div>Status</div>
                    <div>Update Status</div>
                </div>
                {/* tasks */}
            </div>
        </div>
        )
    }
}