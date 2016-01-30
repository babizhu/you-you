/**
 * Created by liu_k on 2016/1/30.
 */
import React, { Component } from 'react';
import {buildChartsData} from '../data/MilkData';
import MilkCharts from './MilkCharts';
const chartsData = buildChartsData();
//for( let y of chartsData){
//    console.log(y.date + ":" + y.totalTimes + "," + y.drinkAmount + "," + JSON.stringify(y.chartsData));
//}
export default class MilkChartses extends Component {

    render() {


        //const chartsData = buildChartsData();
        return (
            <div>
                {
                    chartsData.map((item, index) =><MilkCharts data={item} key={index} />)
                }
            </div>
        )

    }
}

MilkChartses.propTypes = {};
MilkChartses.defaultProps = {};