


$(function () {
    init();

    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;

    $('.selected').css({
        'left' : (width - 502) / 2
    });

    $('.select').click(function () {
        var clazz = $(this).attr('clazz');
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
        case '':
            break;
        default:
            break;
    }
}




//获取支出类数据
function getTypeOfExpenditure() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: 'ils5hnlfbysciwppvvpk'
        },
        success: function (res) {
            if(res.b){
                $('.selected .title span').text('支出类型');
            }
        }
    });
}