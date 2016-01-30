/**
 * Created by liu_k on 2016/1/30.
 */
/**
 * 呦呦喝奶的图表的title部分
 * Created by liu_k on 2016/1/30.
 */


import React, { Component } from 'react';

export default class ChartsTitle extends Component {

    render() {

        const { date, data } = this.props;

        return (
            <h2 style={{margin:'30px'}}>
                {data.date}( 总量 :<span style={{color:'red'}}> {data.drinkAmount}</span>毫升
                | 总次数 :<span style={{color:'red'}}> {data.totalTimes}</span>次)
            </h2>
        );
    }
}

ChartsTitle.propTypes = {};
ChartsTitle.defaultProps = {};

