import React, { Component } from 'react';
import { BarChart } from 'react-d3-components';

import { DatePicker } from 'antd';
import { NICE, SUPER_NICE } from './colors';
//import 'antd/style/index.less';  // import less for modifyVars
import 'antd/lib/index.css';

//import {buildChartsData} from './milk/data/MilkData'
//const x = buildChartsData();
//for( let y of x){
//    console.log(y.date + ":" + y.totalTimes + "," + y.drinkAmount + "," + JSON.stringify(y.chartsData));
//}

import MilkChartses from './milk/components/MilkChartses';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0};
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            counter: this.state.counter + this.props.increment
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
     * 计算吃奶的总量
     * @param data
     * @returns {number}
     */
    calcTotalMl( data ){
        //console.log(JSON.stringify(data));
        //console.log("data.label - " + (data.label));
        //console.log("data.value count = " + (data.values.length));
        let total = 0;
        for( let i = 0; i < data.values.length; i++ ){
            //console.log( data.values[i] );
            total += data.values[i].y;
        }
        return total;
    }

    /**
     * 计算吃奶的总次数
     * @param data
     * @returns {number}
     */
    calcTotalTimes( data ){
        //console.log(JSON.stringify(data));
        //console.log("data.label - " + (data.label));
        //console.log("data.value count = " + (data.values.length));
        let total = 0;
        for( let i = 0; i < data.values.length; i++ ){
            if( data.values[i].y !== 0 ){
                total++;
            }
        }
        return total;
    }
    render() {

        //var BarChart = ReactD3.BarChart;

        const data1 = {
            label: 'chinaideliang',
            values: [{x: '0', y: 0}, {x: '1', y: 0}, {x: '2', y: 0},{x: '3', y: 70}, {x: '4', y: 0}, {x: '5', y: 0},{x: '6', y: 90}, {x: '7', y: 0}, {x: '8', y: 0},
                {x: '9', y: 80}, {x: '10', y:0}, {x: '11', y: 0},{x: '12', y: 0}, {x: '13', y: 80}, {x: '14', y: 0},
                {x: '15', y: 20}, {x: '16', y: 50}, {x: '17', y: 0},{x: '18', y: 0}, {x: '19', y: 50}, {x: '20', y: 80},
                {x: '21', y: 60}, {x: '22', y: 0}, {x: '23', y: 0}]

        };

        const data2 = {
            label: 'chinaideliang',
            values: [{x: '0', y: 70}, {x: '1', y: 0}, {x: '2', y: 0},{x: '3', y: 0}, {x: '4', y: 90}, {x: '5', y: 0},{x: '6', y: 0}, {x: '7', y: 80}, {x: '8', y: 0},
                {x: '9', y: 0}, {x: '10', y: 40}, {x: '11', y: 0},{x: '12', y: 110}, {x: '13', y: 0}, {x: '14', y: 0},
                {x: '15', y: 90}, {x: '16', y: 0}, {x: '17', y: 0},{x: '18', y: 80}, {x: '19', y: 0}, {x: '20', y: 0},
                {x: '21', y: 90}, {x: '22', y: 0}, {x: '23', y: 0}]

        };

        return (
            <div>
                <h2 style={{margin:'30px'}}>2016-01-27( 总量 :<span style={{color:'red'}}> {this.calcTotalMl(data1)}</span>毫升
                    | 总次数 :<span style={{color:'red'}}> {this.calcTotalTimes(data1)}</span>次)</h2>
                <BarChart data={data1}
                          width={1000}
                          height={400}
                          yAxis={{label: "毫升"}}

                          margin={{top: 10, bottom: 50, left: 50, right: 10}}/>

                <h2 style={{margin:'30px'}}>2016-01-28( 总量 :<span style={{color:'red'}}> {this.calcTotalMl(data2)}</span>毫升
                    | 总次数 :<span style={{color:'red'}}> {this.calcTotalTimes(data2)}</span>次)</h2>
                <BarChart data={data2}
                          width={1000}
                          height={400}
                          yAxis={{label: "毫升"}}
                          margin={{top: 10, bottom: 50, left: 50, right: 10}}/>

            </div>
        );
    }
}
//<Counter increment={1} color={NICE}/>
export class App extends Component {
    render() {
        return (
            <div>

                <MilkChartses />
            </div>
        );
    }
}