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
        case 'basicSettings':
            window.location.href="classification.html";
            break;
        default:
            break;
    }
}




//解析曲线图需要的数据
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
                var dates = [];
                for(var i = 0 ; i < list.length ; i++){
                    var d = new Date(list[i].documentDate);
                    var data = d.getFullYear() + '-' + (d.getMonth() + 1);
                    if(!dates.includes(data)){
                        dates.push(data);
                    }
                }

                var da = [];
                var old = '';
                var sun = 0;
                var expenditure = {
                    name: '支出',
                    data: []
                };
                for (var j = 0 ; j < list.length ; j++){

                    var d = new Date(list[j].documentDate);
                    var date = d.getFullYear() + '-' + (d.getMonth() + 1);
                    if(j == 0){
                        old = date;
                    }

                    if(old == date){
                        sun = parseFloat(sun) + parseFloat(list[j].amount);
                    }else{
                        expenditure.data.push(parseFloat(parseFloat(sun).toFixed(2)));
                        old = date;
                        sun = parseFloat(list[j].amount);
                    }

                    if(j == list.length - 1){
                        expenditure.data.push(parseFloat(parseFloat(sun).toFixed(2)));
                    }

                }
                da.push(expenditure);
                getMonthlyExpenditureCurve(dates , da);
            }
        }
    });



}



//构建曲线图数据表
function getMonthlyExpenditureCurve(dates , d){
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
        categories: dates
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

    var series = d;

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


//解析饼状图需要的数据
function monthlyExpenditurePieChart(){
    var start = $('.monthlyExpenditurePieChart .date').val();
    var nowDate = new Date();
    var end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    if(start == ''){
        start = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-01';
    }else {
        start = start + '-01';
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



//解析饼状图需要的数据
function monthlyIncomePieChart(){
    var start = $('.monthlyIncomePieChart .date').val();
    var nowDate = new Date();
    var end = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + getMonthDays(nowDate.getFullYear() , nowDate.getMonth() + 1);
    if(start == ''){
        start = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-01';
    }else {
        start = start + '-01';
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