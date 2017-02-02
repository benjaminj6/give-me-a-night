import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../actions/index';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import styles from './styles.css'


export  class Card extends Component {
    constructor(props) {
        super(props)
        this.openInfoBox = this.openInfoBox.bind(this)
    }

    openInfoBox () {
        this.props.dispatch(actions.currentClickedBox(this.props.cardNum, this.props.evtType))
        browserHistory.push('/results/details');
    }
    
    
    render () {
    
    const cardStyle = `styles.card${this.props.cardNum} styles.card`;
    console.log(cardStyle);
    return (
    <div styleName={cardStyle}>
        <h3>{this.props.title}</h3>
        <img src={this.props.evtImg} placeholder="Image" onClick={this.openInfoBox}/>
        <span>{this.props.evtName}</span>
        </div>
    )
    }
}

export default connect()(Card)