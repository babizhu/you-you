/**
 * Created by liu_k on 2016/1/30.
 * 呦呦喝奶的数据文件
 */

const drinkmilkArray = [
    {
        date: '2016-01-27',
        values: [{
            time: '03:00:00',
            amount: 70
        }, {
            time: '06:30:00',
            amount: 90
        }, {
            time: '09:00:00',
            amount: 80
        }, {
            time: '13:45:00',
            amount: 80
        }, {
            time: '15:50:00',
            amount: 20
        }, {
            time: '16:40:00',
            amount: 50
        }, {
            time: '19:15:00',
            amount: 50
        }, {
            time: '20:05:00',
            amount: 40
        }, {
            time: '20:50:00',
            amount: 40
        }, {
            time: '21:35:00',
            amount: 60
        }

        ]
    }, {
        date: '2016-01-28',
        values: [{
            time: '00:30:00',
            amount: 70
        }, {
            time: '04:15:00',
            amount: 90
        }, {
            time: '07:45:00',
            amount: 80
        }, {
            time: '10:50:00',
            amount: 40
        }, {
            time: '12:00:00',
            amount: 110
        }, {
            time: '15:30:00',
            amount: 90
        }, {
            time: '18:40:00',
            amount: 80
        }, {
            time: '21:10:00',
            amount: 90
        }]
    }, {
        date: '2016-01-29',
        values: [{
            time: '00:30:00',
            amount: 110
        }, {
            time: '05:30:00',
            amount: 80
        }, {
            time: '10:00:00',
            amount: 120
        }, {
            time: '13:40:00',
            amount: 110
        }, {
            time: '16:40:00',
            amount: 140
        }, {
            time: '21:00:00',
            amount: 140
        }]
    }, {
        date: '2016-01-30',
        values: [{
            time: '02:44:00',
            amount: 100
        }, {
            time: '06:00:00',
            amount: 60
        }, {
            time: '09:30:00',
            amount: 140
        }, {
            time: '13:14:00',
            amount: 130
        }, {
            time: '17:05:00',
            amount: 130
        }, {
            time: '19:30:00',
            amount: 100
        }]
    }

];
const drinkMilkMap = new Map();


//{
//    label: 'chinaideliang',
//        values: [{x: '0', y: 0}, {x: '1', y: 0}, {x: '2', y: 0},{x: '3', y: 70}, {x: '4', y: 0}, {x: '5', y: 0},{x: '6', y: 90}, {x: '7', y: 0}, {x: '8', y: 0},
//    {x: '9', y: 80}, {x: '10', y:0}, {x: '11', y: 0},{x: '12', y: 0}, {x: '13', y: 80}, {x: '14', y: 0},
//    {x: '15', y: 20}, {x: '16', y: 50}, {x: '17', y: 0},{x: '18', y: 0}, {x: '19', y: 50}, {x: '20', y: 80},
//    {x: '21', y: 60}, {x: '22', y: 0}, {x: '23', y: 0}]
//
//}
/**
 * 生成方便charts图表使用的数据格式
 *
 */
export function buildChartsData() {
    let allChartsData = [];
    for (const data of drinkmilkArray) {

        let oneDayData = {};
        let drinkAmount = 0, totalTimes = 0;
        let chartsData = {
            label: 'test',
            values: []
        };
        for (const value of data.values) {
            totalTimes++;
            drinkAmount += value.amount;
            chartsData.values.push({x: getHour(value.time), y: value.amount});
        }
        oneDayData.totalTimes = totalTimes;
        oneDayData.drinkAmount = drinkAmount;
        oneDayData.chartsData = chartsData;
        oneDayData.date = data.date;
        //console.log(data.date + ":" + oneDayData.totalTimes + "," + oneDayData.drinkAmount + "," + JSON.stringify(oneDayData.charsData));
        allChartsData.push(oneDayData)

    }
    return allChartsData;
}

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
                text: data.date,
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
                //formatter: function () {
                //    var point = this.point,
                //        s = "<b>数量" + ':' + this.y + 'ml</b>' + this.series.extData + this.series.name;
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
                data: oneDayData.chartsData,
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
    let chartsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let totalTimes = 0;
    let drinkAmount = 0;
    for (const value of data.values) {
        chartsData[parseInt(getHour(value.time))] = value.amount;
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
        alert('getHour传入的参数长度不为8:' + time)
        return 0;
    }
    return time.substring(0, 2);
}