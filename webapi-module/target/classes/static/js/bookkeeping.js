


$(function () {
    init();

    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;

    $('.selected').css({
        'left' : (width - 502) / 2
    });

    $('.select').click(function () {
        var clazz = $(this).attr('clazz');
        var id = $(this).attr('id');
        $('.inputId').val(id);
        dynamicContent(clazz);
        selectPopup('show');
    });


    $('.menu nav').click(function () {
        q(this);
    });
    
    
    //关闭按钮关闭弹窗
    $('.selected .title i').click(function () {
        selectPopup('hide');
    });
});



//初始化页面样式
function init() {
    $('.menu nav:first').css({
        'background-color':'#FFFFFF',
        'border-bottom':'2px solid #880015'
    });
    let c = $('.menu nav:first').attr('class') + '_text';
    $('.' + c).show();
    $('.' + c).siblings().hide();
}


//点击菜单切换页面
function q(e) {
    $(e).css({//设置基础样式
        'background-color':'#FFFFFF',
        'border-bottom':'2px solid #880015'
    });
    $(e).siblings().removeAttr('style');

    //实现页面显示隐藏功能
    let c = $(e).attr('class') + '_text';
    $('.' + c).show();
    $('.' + c).siblings().hide();
}




//处理选择弹窗效果
function selectPopup(show){
    if('show' == show){
        $('.mask').show();
        $('.selected').show();
    }else{
        $('.mask').hide();
        $('.selected').hide();
    }
}



//根据点击的类型不同，定义选择面板的不同数据
function dynamicContent(clazz){
    switch (clazz) {
        case 'typeOfExpenditure'://支出类型
            getTypeOfExpenditure();
            break;
        case 'typeOfIncome':
            getTypeOfIncome();
            break;
        case 'contactsAccount':
            getContactsAccount();
            break;
        default:
            break;
    }
}




//获取支出类型数据
function getTypeOfExpenditure() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: 'ils5hnlfbysciwppvvpk'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('支出类型');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
                $('.seletedType').val('1');
            }
        }
    });
}



//获取收入类型数据
function getTypeOfIncome() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: 'wvrr4ax8uimvmtlo0p5p'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('收入类型');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
                $('.seletedType').val('1');
            }
        }
    });
}



//获取账户及往来数据
function getContactsAccount() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('账户及往来');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="selectLi(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
                $('.seletedType').val('2');
            }
        }
    });
}




//点击分类选项处理的相关逻辑
function selectLi(e){
    $(e).siblings().removeAttr('style');
    $(e).css({
        'border-left':'3px solid #880015',
        'color':'#880015',
        'background-color':'#FFFFFF'
    });
    var type = $('.seletedType').val();
    var id = $(e).attr('id');
    getValues(type , id);
}



//点击分类获取数据
function getValues(type , id){
    var url = '';
    if('1' == type){
        url = '/ClassificationValue/selectDataByClassification';
    }else if('2' == type){
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
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="selectValue(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .option').html(str);
            }
        }
    });
}




//点击选择值处理的函数
function selectValue(e){
    var inputId = $('.inputId').val();
    var value = $(e).text();
    var valueId = $(e).attr('id');
    $('#' + inputId).val(value);
    $('#' + inputId).attr('valueId',valueId);
    selectPopup('hide');
}