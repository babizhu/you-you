/**
 * Created by liu_k on 2016/1/30.
 *
 */
/**
 * 奶量按天统计的折线图
 * Created by liu_k on 2016/1/30.
 */


import React, { Component } from 'react';

import ReactHighcharts  from 'react-highcharts/dist/bundle/highcharts';
import {buildConfigForMilkAmountPerDay} from '../data/TransformData';
const chartsData = buildConfigForMilkAmountPerDay();


export default class MilkAmountPerDay extends Component {

    render() {



        return (
            <ReactHighcharts config={ chartsData } />
        );
    }
}

MilkAmountPerDay.propTypes = {};
MilkAmountPerDay.defaultProps = {};

