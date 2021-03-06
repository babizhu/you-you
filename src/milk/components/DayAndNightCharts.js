/**
 * Created by liu_k on 2016/1/30.
 */
import React, { Component } from 'react';
import {buildConfigForHighCharts} from '../data/TransformData';
import MilkChartsNew from './MilkChartsNew';
import MilkAmountPerDay from './MilkAmountPerDay';
import DayAndNight from './DayAndNight';
const chartsData = buildConfigForHighCharts("2016","2");
//for( let y of chartsData){
//    console.log(y.date + ":" + y.totalTimes + "," + y.drinkAmount + "," + JSON.stringify(y.chartsData));
//}
export default class MilkChartses extends Component {

    render() {

        //<div style={{width:'50%'}}>
        //    {
        //        chartsData.map((item, index) =><MilkChartsNew config={item} key={index} />)
        //    }
        //</div>
        //const chartsData = buildChartsData();
        //let view;
        //for( let i = 0; i < chartsData.length;i++){
            //view += <MilkChartsNew config={chartsData[i]} key={i} />
            //view += MilkChartsNew config={chartsData[i+1]} key={i+1} /></div>
        //}
        return (


<div   style={{width:'99%'}}>
    <div><DayAndNight /></div>
    <div><MilkAmountPerDay /></div>

                <div>
                    {

                        chartsData.map((item, index) =><div style={{marginTop:'50px',width:'50%',float:'left'}} key={index}><MilkChartsNew config={item} /></div>)
                    }
                </div>
</div>

        )

    }
}

MilkChartses.propTypes = {};
MilkChartses.defaultProps = {};