/**
 * 把原始数据按照白天和晚上分开统计
 * Created by liu_k on 2016/1/30.
 */

import {drinkmilkArray} from './MilkData';

/**
 * 构建白天的统计数据
 * @returns {Array}
 */
/**
 * 定义白天的开始小时
 */
const MIN_HOUR = 8;
/**
 * 定义白天的结束小时
 */
const MAX_HOUR = 18;

/**
 * 通过日期获取相应的小时的值
 * @param value
 */
function getHour(value) {
    //console.log((value.time.substr(0, 2)))
    console.log(value)
    return parseInt(value.time.substr(0, 2));
}
/**
 *
 * @param isDay
 *      true:统计白天的数据
 *      false:统计晚上的数据
 * @returns 适合highCharts使用的数据
 */
export function buildData(isDay = true) {
    let categories = [];
    let chartsDatas = [];

    for (const data of drinkmilkArray) {
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
            let hour = getHour(value);
            if (isDay) {
                if (hour <= MAX_HOUR && hour >= MIN_HOUR) {
                    oneDayData.totalTimes++;
                    oneDayData.y += value.amount;
                }
            } else {
                if (hour > MAX_HOUR || hour < MIN_HOUR) {
                    oneDayData.totalTimes++;
                    oneDayData.y += value.amount;
                }
            }

        }
        oneDayData.avg = parseInt(oneDayData.y / oneDayData.totalTimes);
        oneDayData.desc = data.desc;
        chartsDatas.push(oneDayData);


    }
    //console.log(JSON.stringify(chartsDatas));
    let title = isDay?"每日白天奶量":"每日夜间奶量";
    return {
        exporting: {
            enabled: true
        },
        credits: {
            enabled: false
        },
        title: {
            text: title,
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