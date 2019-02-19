$(document).ready(function() {
    monthlyExpenditureCurve();
    monthlyExpenditurePieChart();
    monthlyIncomePieChart();

    $('.head .nav nav:first').css({
        'border-bottom': '3px solid #FFFFFF',
        'color': '#FFFFFF'
    });

    $('.head .nav nav').click(function () {
        chooseNav(this);
    });

    $('.monthlyExpenditureCurve button').click(function () {
        monthlyExpenditureCurve();
    });
    $('.monthlyExpenditurePieChart button').click(function () {
        monthlyExpenditurePieChart();
    });
    $('.monthlyIncomePieChart button').click(function () {
        monthlyIncomePieChart();
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
        case 'dataAnalysis':
            window.location.href="dataAnalysis.html";
            break;
        case 'basicSettings':
            window.location.href="classification.html";
            break;
        default:
            break;
    }
}




//获取曲线图需要的数据
function monthlyExpenditureCurve(){
    var start = $('.monthlyExpenditureCurve .start').val();
    var end = $('.monthlyExpenditureCurve .end').val();
    var nowDate = new Date();
    if(start == '' || end == ''){
        start = '2018-01-01';
        end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    }else {
        start = start + '-01';
        var date = new Date(end);
        end = end + '-' + getMonthDays(date.getFullYear() , date.getMonth() + 1);
    }

    $.ajax({
        url: '/BusinessOrder/selectExpenditure',
        type: 'POST',
        data: {
            startDate: start,
            endDate: end
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var sd = new Date(start);
                var ed = new Date(end);
                var X = getXData(sd , ed);

                var date = getCurve(X , list , '支出');
                var arr = [date];
                monthlyIncomeCurve(X , arr)
            }
        }
    });
}

function monthlyIncomeCurve(X , arr){
    var start = $('.monthlyExpenditureCurve .start').val();
    var end = $('.monthlyExpenditureCurve .end').val();
    var nowDate = new Date();
    if(start == '' || end == ''){
        start = '2018-01-01';
        end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    }else {
        start = start + '-01';
        var date = new Date(end);
        end = end + '-' + getMonthDays(date.getFullYear() , date.getMonth() + 1);
    }

    $.ajax({
        url: '/BusinessOrder/selectIncome',
        type: 'POST',
        data: {
            startDate: start,
            endDate: end
        },
        success: function (res) {
            if (res.b) {
                var list = res.result;
                var date = getCurve(X , list , '收入');
                arr.push(date)
                getMonthlyExpenditureCurve(X , arr);
            }
        }
    });
}



//构建曲线图数据表
function getMonthlyExpenditureCurve(X , arr){
    var title = {
        text: '月收入/支出曲线',
        style:{
            fontSize: '16px',
            color: '#880015'
        }
    };
    var credits = {
        enabled: false
    };
    var xAxis = {
        categories: X
    };
    var yAxis = {
        title: {
            text: '金额 (元)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: ' 元'
    }

    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    var series = arr;

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


/**
 * 根据传入的开始日期和结束日期封装每月的时间间隔数据
 * @param sd
 * @param ed
 */
function getXData(startDate , endDate) {
    var m = getIntervalMonth(startDate , endDate) + 1;
    var arr = [];
    var j = startDate.getMonth();
    for (var i = 0 ; i < m ; i++){
        var s = new Date(startDate.getTime());
        s.setMonth(j++);
        arr.push(s.getFullYear() + '-' + (s.getMonth() + 1));
    }
    return arr;
}


/**
 * 解析数据，构建曲线图需要的数据结构
 * @param list
 * @returns {Array[]}
 */
function getCurve(X , list , name) {
    var expenditure = {};
    var arr = [];
    for (var i = 0 ; i < X.length ; i++){
        var sun = 0;
        for (var j = 0 ; j < list.length ; j++){
            var d = new Date(list[j].documentDate);
            var date = d.getFullYear() + '-' + (d.getMonth() + 1);
            if(X[i] == date){
                sun = parseFloat(sun) + parseFloat(list[j].amount);
            }
        }
        arr.push(parseFloat(parseFloat(sun).toFixed(2)));
    }
    expenditure.name = name;
    expenditure.data = arr;
    return expenditure;
}




//获取饼状图需要的数据
function monthlyExpenditurePieChart(){
    var start = $('.monthlyExpenditurePieChart .date').val();
    var nowDate = '';
    var end = '';
    if(start == ''){
        nowDate = new Date();
        start = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-01';
        end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    }else {
        nowDate = new Date(start);
        start = start + '-01';
        end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    }

    $.ajax({
        url: '/BusinessOrder/selectExpenditure',
        type: 'POST',
        data: {
            startDate: start,
            endDate: end
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                // var sun = 0;
                // for(var i = 0 ; i < list.length ; i++){
                //     sun = parseFloat(sun) + parseFloat(list[i].amount);
                // }
                //
                // var arr = [];
                // for (var j = 0 ; j < list.length ; j++){
                //     var classificationValue = list[j].classificationValue;
                //     if(arr.length == 0){
                //         var a = [classificationValue.name , parseFloat(list[j].amount)];
                //         arr.push(a);
                //     }else{
                //         var b = false;
                //         for (var l = 0 ; l < arr.length ; l++){
                //             if(arr[l].includes(classificationValue.name)){//当有一个包含，则修改状态
                //                 b = true;
                //                 arr[l][1] = parseFloat(arr[l][1]) + parseFloat(list[j].amount);
                //             }
                //         }
                //
                //         if(!b){
                //             var a = [classificationValue.name , parseFloat(list[j].amount)];
                //             arr.push(a);
                //         }
                //     }
                // }
                //
                // //解析最终数据
                // for (var i = 0 ; i < arr.length ; i++){
                //     arr[i][1] = (parseFloat(arr[i][1]) / parseFloat(sun)) * 100;
                // }
                var arr = getPieChartData(list);

                getMonthlyExpenditurePieChart(arr);
            }
        }
    });
}



//构建饼状图
function getMonthlyExpenditurePieChart(arr){
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
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 50,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.2f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series= [{
        type: 'pie',
        name: '支出类型占比',
        data: arr
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



//获取饼状图需要的数据
function monthlyIncomePieChart(){
    var start = $('.monthlyIncomePieChart .date').val();
    var nowDate = '';
    var end = '';
    if(start == ''){
        nowDate = new Date();
        start = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-01';
        end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    }else {
        nowDate = new Date(start);
        start = start + '-01';
        end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    }

    $.ajax({
        url: '/BusinessOrder/selectIncome',
        type: 'POST',
        data: {
            startDate: start,
            endDate: end
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                // var sun = 0;
                // for(var i = 0 ; i < list.length ; i++){
                //     sun = parseFloat(sun) + parseFloat(list[i].amount);
                // }
                //
                // var arr = [];
                // for (var j = 0 ; j < list.length ; j++){
                //     var classificationValue = list[j].classificationValue;
                //     if(arr.length == 0){
                //         var a = [classificationValue.name , parseFloat(list[j].amount)];
                //         arr.push(a);
                //     }else{
                //         var b = false;
                //         for (var l = 0 ; l < arr.length ; l++){
                //             if(arr[l].includes(classificationValue.name)){//当有一个包含，则修改状态
                //                 b = true;
                //                 arr[l][1] = parseFloat(arr[l][1]) + parseFloat(list[j].amount);
                //             }
                //         }
                //
                //         if(!b){
                //             var a = [classificationValue.name , parseFloat(list[j].amount)];
                //             arr.push(a);
                //         }
                //     }
                // }
                //
                // //解析最终数据
                // for (var i = 0 ; i < arr.length ; i++){
                //     arr[i][1] = (parseFloat(arr[i][1]) / parseFloat(sun)) * 100;
                // }

                var arr = getPieChartData(list);

                getMonthlyIncomePieChart(arr);
            }
        }
    });
}

//构建饼状图
function getMonthlyIncomePieChart(arr){
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
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            innerSize: 50,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.2f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };
    var series= [{
        type: 'pie',
        name: '收入类型占比',
        data: arr
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



/**
 * 解析数据，构建饼状图需要的数据结构
 * @param list
 * @returns {Array}
 */
function getPieChartData(list) {
    var sun = 0;
    for(var i = 0 ; i < list.length ; i++){
        sun = parseFloat(sun) + parseFloat(list[i].amount);
    }

    var arr = [];
    for (var j = 0 ; j < list.length ; j++){
        var classificationValue = list[j].classificationValue;
        if(arr.length == 0){
            var a = [classificationValue.name , parseFloat(list[j].amount)];
            arr.push(a);
        }else{
            var b = false;
            for (var l = 0 ; l < arr.length ; l++){
                if(arr[l].includes(classificationValue.name)){//当有一个包含，则修改状态
                    b = true;
                    arr[l][1] = parseFloat(arr[l][1]) + parseFloat(list[j].amount);
                }
            }

            if(!b){
                var a = [classificationValue.name , parseFloat(list[j].amount)];
                arr.push(a);
            }
        }
    }

    //解析最终数据
    for (var i = 0 ; i < arr.length ; i++){
        arr[i][1] = (parseFloat(arr[i][1]) / parseFloat(sun)) * 100;
    }

    return arr;
}