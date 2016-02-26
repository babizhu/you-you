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
import {buildData} from '../data/DayAndNight';
const chartsDataInDay = buildData();
const chartsDataInNight = buildData(false);

/**
 * 分别显示白天的夜晚的喝奶的统计数据
 */
export default class DayAndNightCharts extends Component {

    render() {



        return (
            <div>
            <ReactHighcharts config={ chartsDataInDay } />
            <ReactHighcharts config={ chartsDataInNight } />
                </div>
        );
    }
}

DayAndNightCharts.propTypes = {};
DayAndNightCharts.defaultProps = {};

