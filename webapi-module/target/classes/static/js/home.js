$(document).ready(function() {
    getMonthlyExpenditureCurve();
    getMonthlyExpenditurePieChart();
    getMonthlyIncomePieChart();

    $('.head .nav nav:first').css({
        'border-bottom': '3px solid #FFFFFF',
        'color': '#FFFFFF'
    });

    $('.head .nav nav').click(function () {
        chooseNav(this);
    });
});


//点击菜单进行页面切换
function chooseNav(t){
    $(t).siblings().removeAttr('style');
    $(t).css({
        'border-bottom': '3px solid #FFFFFF',
        'color': '#FFFFFF'
    });
    var clazz = $(t).attr('class');
    switch (clazz) {
        case 'homePage':
            window.location.href="home.html";
            break;
        case 'bookkeeping':
            window.location.href="bookkeeping.html";
            break;
        case 'accountingData':
            window.location.href="timelyData.html";
            break;
        case 'basicSettings':
            window.location.href="classification.html";
            break;
        default:
            break;
    }
}




//构建曲线图数据表
function getMonthlyExpenditureCurve(){
    var title = {
        text: '月支出曲线',
        style:{
            fontSize: '16px',
            color: '#880015'
        }
    };
    var credits = {
        enabled: false
    };
    var xAxis = {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
    var yAxis = {
        title: {
            text: 'Temperature (\xB0C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: '\xB0C'
    }

    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    var series =  [
        {
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
                26.5, 23.3, 18.3, 13.9, 9.6]
        },
        {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
                24.1, 20.1, 14.1, 8.6, 2.5]
        },
        {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0,
                16.6, 14.2, 10.3, 6.6, 4.8]
        }
    ];

    var json = {};

    json.title = title;
    json.credits = credits;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;

    $('.monthlyExpenditureCurve .container').highcharts(json);
}



//构建饼状图
function getMonthlyExpenditurePieChart(){
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: '月支出结构类型占比',
        style:{
            fontSize: '16px',
            color: '#880015'
        }
    };
    var credits = {
        enabled: false
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 100,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series= [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',   0.7]
        ]
    }];

    var json = {};
    json.chart = chart;
    json.credits = credits;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('.monthlyExpenditurePieChart .container').highcharts(json);
}



//构建饼状图
function getMonthlyIncomePieChart(){
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };
    var title = {
        text: '月收入结构类型占比',
        style:{
            fontSize: '16px',
            color: '#880015'
        }
    };
    var credits = {
        enabled: false
    };
    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 100,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series= [{
        type: 'pie',
        name: 'Browser share',
        data: [
            ['Firefox',   45.0],
            ['IE',       26.8],
            {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true
            },
            ['Safari',    8.5],
            ['Opera',     6.2],
            ['Others',   0.7]
        ]
    }];

    var json = {};
    json.chart = chart;
    json.credits = credits;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
    $('.monthlyIncomePieChart .container').highcharts(json);
}