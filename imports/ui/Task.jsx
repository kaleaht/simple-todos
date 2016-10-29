import React, {Component, PropTypes} from 'react';
import fi from 'moment/locale/fi';
import moment from 'moment';
import {Tasks} from '../api/tasks.js';
import FontAwesome  from 'react-fontawesome';
import Check from './Check.jsx';
import css from './scss/Task.scss';

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
            <li className={taskClassName} style={css}>
                <div>
                    <Check
                        checked={this.props.task.checked}
                        click={this.toggleChecked.bind(this)}
                        />
                    <span className="text">{this.props.task.text}</span>
                </div>
                <div>
                    <span className="moment">
                        {moment(this.props.task.createdAt).fromNow()}
                    </span>
                    <FontAwesome
                        className="times"
                        name="times"
                        onClick={this.deleteThisTask.bind(this)}
                         />
                </div>
            </li>
        );
    }
}

Task.propTypes = {
        task: PropTypes.object.isRequired,
};
