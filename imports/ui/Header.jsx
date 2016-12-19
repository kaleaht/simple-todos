import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {Tasks} from '../api/tasks.js';
import Task from './Task.jsx';
import Check from './Check.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FontAwesome  from 'react-fontawesome';
import scss from './scss/Header.scss';

export default class Header extends Component {
    constructor() {

    }

    render() {
        return (
            <header style={scss}>
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
        );
    }
}
