

var width = document.body.offsetWidth;
var height = document.body.offsetHeight;

$(function () {
    $('.selected').css({
        'left' : (width - 502) / 2
    });

    $('.fa-plus').click(function () {
        selectPopup('show');
    });

});


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