import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Tasks} from '../api/tasks.js';
import Task from './Task.jsx';
import Check from './Check.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome  from 'react-fontawesome';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }

    renderTask() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (<Task key={task._id} task={task}/>));
    }

    handleSubmit(event) {
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(),
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }


    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="asdf"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <div className="container" style={styles.container}>
                    <header style={styles.header}>
                        <h1>Työlista</h1>

                        <label className="hide-completed">
                            Piilota tehdyt työt&ensp;
                            <Check
                                style={styles.check}
                                checked={this.state.hideCompleted}
                                click={this.toggleHideCompleted.bind(this)}
                                />
                        </label>
                        <form
                            className="new-task"
                            onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Lisää uusi työ!"
                                />
                        </form>
                    </header>

                    <ul>
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>
                            {this.renderTask()}
                         </ReactCSSTransitionGroup>
                    </ul>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

const styles = {
    check: {
        marginRight: '5px'
    },
    header: {
        background: '#FAFAFA',
        padding: '20px 15px 15px 15px',
        marginTop: '20px',
        position: 'relative',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)'
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: '100%',
    }
};

App.propTypes = {
    tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, App);
