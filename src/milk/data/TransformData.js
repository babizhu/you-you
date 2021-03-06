/**
 * 把原始数据转换为各种图表使用的数据
 * Created by liu_k on 2016/1/30.
 */

import {drinkmilkArray} from './MilkData';

export function buildConfigForHighCharts(year, month) {
    let allChartsData = [];

    if( month.length ===1 ){

        month ="0" + month;

    }
    if (year.length !== 4 || month.length !== 2) {
        alert("年月格式有误，年必须为4位数字，月份必须为两位数字，不足两位前面补0")
    }
    const yearAndMonthStr = year + "-" + month;
    for (const data of drinkmilkArray) {

        console.log(data.date)
        if (data.date.substr(0, 7) != yearAndMonthStr) {
            console.log( data.date.substr(0, 7)+"," + yearAndMonthStr)
            continue;
        }
        let oneDayData = buildOneDayData(data);

        oneDayData = {
            exporting: {
                enabled: true
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
                '<td style="text-align: right"><b>{point.y}</b></td></tr>' +
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
    let chartsData = [{time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}];
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

/**
 * 按天统计吃奶的总量
 */
export function buildConfigForMilkAmountPerDay(year, month) {
    let allChartsData = [];

    if( month.length ===1 ){

        month ="0" + month;

    }
    if (year.length !== 4 || month.length !== 2) {
        alert("年月格式有误，年必须为4位数字，月份必须为两位数字，不足两位前面补0")
    }
    const yearAndMonthStr = year + "-" + month;
    let categories = [];
    let chartsDatas = [];

    for (const data of drinkmilkArray) {
        if (data.date.substr(0, 7) != yearAndMonthStr) {
            console.log( data.date.substr(0, 7)+"," + yearAndMonthStr)
            continue;
        }
        //categories.push(data.date.substring( 2, data.date.length));
        categories.push(data.date);

        //let chartsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //let chartsData = [{time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        //    {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        //    {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        //    {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        //    {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0},
        //    {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}, {time: '', y: 0}];
        //let totalTimes = 0;
        //let drinkAmount = 0;
        let oneDayData = {totalTimes: 0, y: 0, desc: ''};
        for (const value of data.values) {
            oneDayData.totalTimes++;
            oneDayData.y += value.amount;

        }
        oneDayData.avg = parseInt(oneDayData.y / oneDayData.totalTimes);
        oneDayData.desc = data.desc;
        chartsDatas.push(oneDayData);


    }
    //console.log(JSON.stringify(chartsDatas));
    return {
        exporting: {
            enabled: true
        },
        credits: {
            enabled: false
        },
        title: {
            text: yearAndMonthStr,
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: categories
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
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><td style="color: {series.color}">日期: </td>' +
            '<td style="text-align: right"><b>{point.category}</b></td></tr>' +
            '<tr><td style="color: {series.color}">母乳: </td>' +
            '<td style="text-align: right"><b>{point.y}ml</b></td></tr>' +
            '<tr><td style="color: {series.color}">次数: </td>' +
            '<td style="text-align: right"><b>{point.options.totalTimes}</b></td></tr>' +
            '<tr><td style="color: {series.color}">平均: </td>' +
            '<td style="text-align: right"><b>{point.options.avg}ml</b></td></tr>' +
            '<tr><td style="color: {series.color}">备注: </td>' +
            '<td style="text-align: right"><b>{point.options.desc}</b></td></tr>',
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
            data: chartsDatas
        }]
    }
}