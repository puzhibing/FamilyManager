


$(function () {
    init();

    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;

    $('.selected').css({
        'left' : (width - 502) / 2
    });

    $('.select').click(function () {
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



//点击关闭按钮关闭弹窗
function closePopup(){}