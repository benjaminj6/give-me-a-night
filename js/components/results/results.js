import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import Card from '../card/card';
import InfoBox from '../info_box/info_box';
import {browserHistory} from 'react-router';
import styles from './styles.css';
import {Observable} from 'rxjs/Rx'
import immutable from 'object-path-immutable';

export class ResultBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderList: {
                card0: false,
                card1: false,
                card2: false,
                card3: false
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.cascadeRender();
    };

    componenWillMount() {
        this.cascadeRender();
    }
    

    cascadeRender() {
        let cards = [0,1,2,3];
        if (this.props.cardSideState) {cards = cards.reverse()}
        var interval = Observable
            .interval(150)
            .take(4);
        interval.subscribe(x => {
            let card = cards[x];
            this.setState(immutable.set(this.state, `renderList.card${card}`, this.props.cardSideState))
        })
    };

    render() {

        const {zomatoResults, ebResults, bitResults, movieResults} = this.props.results;

        if (!bitResults || !zomatoResults || !ebResults || !movieResults) {
            return <div></div>
        }

        if (zomatoResults.image === '') {
            zomatoResults.image === 'http://freedesignfile.com/upload/2012/10/Restaurant_menu__11-1.jpg';
        }

        const noResultsImage = 'http://topradio.com.ua/static/images/sad-no-results.png'

        const movie = {
            image: `https://image.tmdb.org/t/p/w500${movieResults.image}` || noResultsImage,
            title: movieResults.title
        }

        const concert = {
            image: bitResults.image === undefined
                ? 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQEr_CovLbfaLjHIo6JgUfkfVKm' +
                        '50Y6yHynVdAALkf4OI__HNDwFQ'
                : bitResults.image,
            title: bitResults.title
        }

        const event = {
            image: ebResults.image || 'http://www.e-xinergia.com/xframework/app/frontend/view/imgs//slides/slide_venta_' +
                    'entradas.png',
            title: ebResults.title
        }

        let cardNumInt = Number(this.props.id)

        return (

            <div key={this.props.id} styleName="styles.results-box">
                <h2 styleName="styles.option">
                    Night {cardNumInt}
                </h2>
                <Card
                    resultsBoxNum={this.props.id}
                    title="Restaurant"
                    evtType="zomatoResults"
                    evtImg={zomatoResults.image}
                    evtName={zomatoResults.title}
                    key="0"
                    cardNum="0"
                    flippy={this.state.renderList.card0}/>
                <Card
                    resultsBoxNum={this.props.id}
                    title="Movie"
                    evtType="movieResults"
                    evtImg={movie.image}
                    evtName={movie.title}
                    key="1"
                    cardNum="1"
                    flippy={this.state.renderList.card1}/>
                <Card
                    resultsBoxNum={this.props.id}
                    title="Music Show"
                    evtType="bitResults"
                    evtImg={concert.image}
                    evtName={concert.title}
                    key="2"
                    cardNum="2"
                    flippy={this.state.renderList.card2}/>
                <Card
                    resultsBoxNum={this.props.id}
                    title="Local Event"
                    evtType="ebResults"
                    evtImg={event.image}
                    evtName={event.title}
                    key="3"
                    cardNum="3"
                    flippy={this.state.renderList.card3}/>
            </div>
        )
    }
}


export default connect()(ResultBox);