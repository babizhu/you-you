/**
 * Created by liu_k on 2016/1/30.
 */
/**
 * 呦呦喝奶的图表展示
 * Created by liu_k on 2016/1/30.
 */


import React, { Component } from 'react';

import ReactHighcharts  from 'react-highcharts/dist/bundle/highcharts';
export default class MilkChartsNew extends Component {

    render() {



        return (
            <ReactHighcharts config={ this.props.config } />
        );
    }
}

MilkChartsNew.propTypes = {};
MilkChartsNew.defaultProps = {};

