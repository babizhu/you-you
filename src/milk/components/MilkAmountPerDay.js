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

export default class MilkAmountPerDay extends Component {

    render() {


        return (
            <div>
                <ReactHighcharts config={ buildConfigForMilkAmountPerDay("2016","1") }/>
                <ReactHighcharts config={ buildConfigForMilkAmountPerDay("2016","2") }/>
                <ReactHighcharts config={ buildConfigForMilkAmountPerDay("2016","3") }/>
                <ReactHighcharts config={ buildConfigForMilkAmountPerDay("2016","4") }/>
                <ReactHighcharts config={ buildConfigForMilkAmountPerDay("2016","5") }/>
            </div>
        );
    }
}

MilkAmountPerDay.propTypes = {};
MilkAmountPerDay.defaultProps = {};

