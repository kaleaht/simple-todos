import React, {Component, PropTypes} from 'react';
import FontAwesome  from 'react-fontawesome';

export default class Check extends Component {

    render() {
        let check = "square-o";
        if (this.props.checked) {
            check='check-square-o';
        }
        return (
            <FontAwesome
                name={check}
                size='2x'
                onClick={this.props.click}
                style={styles}/>
        );
    }
}

const styles = {
    width: '16px',
    color: '#797979',
    fontSize: '1.5em'
};

Check.propTypes = {
    click: PropTypes.func.isRequired
};
