import React, {Component, PropTypes} from 'react';
import fi from 'moment/locale/fi';
import moment from 'moment';
import {Tasks} from '../api/tasks.js';
import FontAwesome  from 'react-fontawesome';
import Check from './Check.jsx';

export default class Task extends Component {
    constructor(props) {
        super(props);

    }

    toggleChecked() {
        Tasks.update(this.props.task._id, {
            $set: {checked: !this.props.task.checked},
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    render() {
        const taskClassName = this.props.task.checked ? 'checked' : '';

        moment.updateLocale('fi', fi);

        return (
            <li className={taskClassName} style={styles.li}>
                <div>
                    <Check
                        checked={this.props.task.checked}
                        click={this.toggleChecked.bind(this)}
                        />
                    <span className="text">{this.props.task.text}</span>
                </div>
                <div>
                    <span
                        className="time"
                        style={styles.time} >
                        {moment(this.props.task.createdAt).fromNow()}
                    </span>
                    <FontAwesome
                        name="times"
                        onClick={this.deleteThisTask.bind(this)}
                        style={styles.times} />
                </div>
            </li>
        );
    }
}

const styles = {
    li: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10px',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)'
    },
    time: {
        marginRight: '5px',
        color: '#797979'
    },
    times: {
        color: '#797979'
    }
};

Task.propTypes = {
        task: PropTypes.object.isRequired,
};
