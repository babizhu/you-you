/**
 * 呦呦喝奶的图表展示
 * Created by liu_k on 2016/1/30.
 */


import React, { Component } from 'react';
import ChartsTitle from './ChartsTitle';
import { BarChart } from 'react-d3-components';

export default class MilkCharts extends Component {

    render() {

        const { data } = this.props;

        return (
            <div>
                <ChartsTitle data = {data} />
                <BarChart data={data.chartsData}
                          width={1000}
                          height={400}
                          yAxis={{label: "毫升"}}

                          margin={{top: 10, bottom: 50, left: 50, right: 10}}/>



            </div>
        );
    }
}

MilkCharts.propTypes = {};
MilkCharts.defaultProps = {};

