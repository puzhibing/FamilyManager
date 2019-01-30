$(function () {

    $('.menu nav:first').css({
        'color': '#880015',
        'background-color': '#FFFFFF',
        'border-top-color': '#dddddd',
        'border-right-color': '#dddddd',
        'border-left-color': '#dddddd',
        'border-bottom-color': '#FFFFFF',
    });

    getClassification();
    $('.accountingFlow_panel').hide();

    $('.menu nav').click(function () {
        switchPage($(this));
        var clazz = $(this).attr('class');
        switch (clazz + '_panel') {
            case 'assetsAndLiabilities_panel':
                getClassification();
                break;
            case 'accountingFlow_panel':
                getBusinessOrders(1);
                break;
            default:
                break;
        }
    });

    $('.accountingFlow_panel div div button').click(function () {
        pageTurning(this);
    });
});


//选择标签进行页面切换
function switchPage(e) {
    $(e).siblings().removeAttr('style');
    $(e).css({
        'color': '#880015',
        'background-color': '#FFFFFF',
        'border-top-color': '#dddddd',
        'border-right-color': '#dddddd',
        'border-left-color': '#dddddd',
        'border-bottom-color': '#FFFFFF',
    });
    var classValue = $(e).attr('class');
    var divs = $('.content>div');
    for(var i = 0 ; i < divs.length ; i++){
        var div = $(divs[i]);
        if(div.attr('class') != 'menu'){
            div.hide();
        }
    }
    $('.' + classValue + '_panel').show();
}



//获取分类及分类值的数据集合
function getClassification(){
    $.ajax({
        url: '/Classification/selectDatasByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.assetsAndLiabilities_panel .item').html('');
                $('.assetsAndLiabilities_panel .sun span').text('');
                var list = res.result;
                var all = 0;
                for (var i = 0 ; i < list.length ; i++){
                    var str = '<table><tr><th colspan="2">' + list[i][0].name + '</th>';
                    var sun = 0;
                    var st = ''
                    for (var j = 0 ; j < list[i][1].length ; j++){
                        st += '<tr><td>' + (j + 1) + '</td><td>' + list[i][1][j].name + '</td><td>' + list[i][1][j].balance + '</td></tr>';
                        sun = parseFloat(sun) + parseFloat(list[i][1][j].balance);
                    }
                    str += '<th>' + sun + '</th></tr>' + st + '</table>';
                    $('.assetsAndLiabilities_panel .item').append(str.toLocaleString());

                    all = parseFloat(all) + parseFloat(sun);
                    $('.assetsAndLiabilities_panel .sun span').text(all.toLocaleString());
                }
            }
        }
    });
}



//查询所有业务数据（分页）
function getBusinessOrders(page){
    $.ajax({
        url: '/BusinessOrder/selectAll',
        type: 'POST',
        data: {
            page: page,
            size: 10
        },
        success: function (res) {
            if(res.b){
                var nowPage = $('.nowPage').text();
                $('.accountingFlow_panel div table').html('');
                var list = res.result;
                var str = '<tr><th>序号</th><th>单据日期</th><th></th><th></th><th>业务金额</th><th>业务类型</th></tr>';
                for (var i = 0; i < list.length ; i++){
                    str += '<tr><td>' + (((parseInt(nowPage) - 1) * 10) + (i + 1)) + '</td><td>' + list[i].documentDate + '</td><td>' + list[i].income.name + '</td>' +
                        '<td>' + list[i].expenditure.name + '</td><td>' + list[i].amount + '</td><td>' + list[i].classificationValue.name + '</td></tr>'
                }
                $('.accountingFlow_panel div table').html(str);
                $('.sunPage').text(res.totalPage);
                $('.nowPage').text(page);

                if(page == 1){
                    $('.previousPage').attr('disabled','disabled');

                }else {
                    $('.previousPage').removeAttr('disabled');
                }
                if(res.totalPage < 1 || page == res.totalPage){
                    $('.nextPage').attr('disabled','disabled');
                }else{
                    $('.nextPage').removeAttr('disabled');
                }

            }
        }
    });
}


//点击翻页按钮实现翻页查询数据
function pageTurning(a){
    var clazz = $(a).attr('class');
    var nowPage = $('.nowPage').text();
    var sunPage = $('.sunPage').text();
    if(clazz == 'previousPage'){
        nowPage = parseInt(nowPage) - 1;
    }else if(clazz == 'nextPage'){
        nowPage = parseInt(nowPage) + 1;
    }
    getBusinessOrders(nowPage);
}