
var kindId = 'ils5hnlfbysciwppvvpk';
var type = '1';//数据类型

$(function () {

    //初始化页面样式
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    $('.content nav:first').css({
        'background-color':'#FFFFFF',
        'border-bottom':'2px solid #880015'
    });
    var c = $('.content nav:first').attr('class') + '_text';
    $('.' + c).show();
    $('.' + c).siblings().hide();

    $('.content .pages').css({
        'height': height - 50
    });

    $('.content .pages .classificationValue').css({
        'width': (width * 0.8) - 251
    });


    //初始化加载数据
    getClassification();

    //绑定菜单点击事件
    $('.content nav').click(function () {
        $(this).css({//设置基础样式
            'background-color':'#FFFFFF',
            'border-bottom':'2px solid #880015'
        });
        $(this).siblings().removeAttr('style');

        //实现页面显示隐藏功能
        var c = $(this).attr('class') + '_text';
        $('.' + c).show();
        $('.' + c).siblings().hide();

        //切换页面初始化获取分类数据
        var clazz = $(this).attr('class');
        switch (clazz) {
            case 'expenditureClassification':
                kindId = 'ils5hnlfbysciwppvvpk';
                type = '1';
                formatClassificationValue();
                break;
            case 'incomeClassification':
                kindId = 'wvrr4ax8uimvmtlo0p5p';
                type = '1';
                formatClassificationValue();
                break;
            case 'accountManagement':
                kindId = '4wvbwptevrnwq9m2qd7e';
                type = '2';
                break;
                formatClassificationValue();
            case 'memberManagement':
                kindId = 'wvrr4ax8uimvmtlo0p50';
                type = '2';
                break;
                formatClassificationValue();
            default:
                break;
        }
        getClassification();
    });


});


//根据类型id获取分类数据
function getClassification(){
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: kindId
        },
        success: function(res){
            if(res.b){
                var str = '<ul>';
                var list = res.result;
                for(var i = 0 ; i < list.length ; i++){
                    str += '<li value="' + list[i].id + '" onclick="getClassificationVal(this)"><span>' + list[i].name + '</span></li>'
                }
                str += '</ul>';
                $('.pages .classification .ul').html(str);
            }
        }
    });
}


//点击分类获取分类对相应的值
function getClassificationVal(e){
    var id = $(e).attr('value');
    var url = '';
    if(type == '1'){
        url = '/ClassificationValue/selectDataByClassification';
    }else if(type == '2'){
        url = '/ContactsAccount/selectDataByClassification';
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            classification: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<table>';
                if(type == '1'){
                    str += '<tr><th>序号</th><th>名称</th></tr>';
                    for(var i = 0 ; i < list.length ; i++){
                        str += '<tr><td>' + (i + 1) + '</td><td>' + list[i].name + '</td></tr>';
                    }
                }else if(type == '2'){
                    str += '<tr><th>序号</th><th>名称</th><th>余额</th></tr>';
                    for(var i = 0 ; i < list.length ; i++){
                        str += '<tr><td>' + (i + 1) + '</td><td>' + list[i].name + '</td><td>' + list[i].balance + '</td></tr>';
                    }
                }
                str += '</table>';
                $('.pages .classificationValue .value').html(str);
            }
        }
    });
}

//格式化分类值面板
function formatClassificationValue(){
    $('.pages .classificationValue .value').html('');
}