/**
 * 把原始数据转换为各种图表使用的数据
 * Created by liu_k on 2016/1/30.
 */

import {drinkmilkArray} from './MilkData';

export function buildConfigForHighCharts() {
    let allChartsData = [];
    for (const data of drinkmilkArray) {

        let oneDayData = buildOneDayData(data);

        oneDayData = {
            exporting:{
                enabled:true
            },
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },
            title: {
                text: data.date
                //x: -20 //center
            },
            subtitle: {
                text: '<h1>总量 : ' + oneDayData.drinkAmount + 'ml | 总次数 : ' + oneDayData.totalTimes + '次 | 平均 : ' + parseInt(oneDayData.drinkAmount / oneDayData.totalTimes) + 'ml</h1>'
                //x: -20
            },
            xAxis: {
                categories: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
                    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
            },
            yAxis: {
                title: {
                    text: '毫升 (ml)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'ml',
                useHTML: true,
                headerFormat: '<table>',
                pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                '<td style="text-align: right"><b>{point.y}</b></td></tr>'+
                '<tr><td style="color: {series.color}">时间: </td>' +
                '<td style="text-align: right"><b>{point.options.time}</b></td></tr>',
                footerFormat: '</table>'
                //formatter: function () {
                //    var point = this.point,
                //        s = "<b>数量" + ':' + this.y + 'ml</b>' + point.options.time;
                //    console.log(this)
                //
                //    return s;
                //}
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: '母乳',
                data: oneDayData.chartsData
                //extData:333,
                //dataLabels: {
                //    enabled: true,
                //    //rotation: -90,
                //    color: '#FFFFFF',
                //    align: 'right',
                //    x: 4,
                //    y: 10,
                //    style: {
                //        fontSize: '13px',
                //        fontFamily: 'Verdana, sans-serif',
                //        textShadow: '0 0 3px black'
                //    }
                //}
            }]
        };


        allChartsData.push(oneDayData);

    }
    return allChartsData;
}

/**
 * 用于格式化highCharts控件的数据
 * @param data
 * @returns {{}}
 */
function buildOneDayData(data) {
    let charts = {};
    //let chartsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let chartsData = [{time: '',y: 0},{time: '',y: 0},{time: '',y: 0},{time: '',y: 0},
        {time: '',y: 0},{time: '',y: 0},{time: '',y: 0},{time: '',y: 0},
        {time: '',y: 0},{time: '',y: 0},{time: '',y: 0},{time: '',y: 0},
        {time: '',y: 0},{time: '',y: 0},{time: '',y: 0},{time: '',y: 0},
        {time: '',y: 0},{time: '',y: 0},{time: '',y: 0},{time: '',y: 0},
        {time: '',y: 0},{time: '',y: 0},{time: '',y: 0},{time: '',y: 0}];
    let totalTimes = 0;
    let drinkAmount = 0;
    for (const value of data.values) {
        chartsData[parseInt(getHour(value.time))].y = value.amount;
        chartsData[parseInt(getHour(value.time))].time = value.time;
        totalTimes++;
        drinkAmount += value.amount;
    }
    charts.totalTimes = totalTimes;
    charts.chartsData = chartsData;
    charts.drinkAmount = drinkAmount;

    return charts;
}

/**
 * 为了图表显示需要，把时间中的hour单独取出来
 * @param time
 */
function getHour(time) {
    if (time.length !== 8) {
        alert('getHour传入的参数长度不为8:' + time);
        return 0;
    }
    return time.substring(0, 2);
}