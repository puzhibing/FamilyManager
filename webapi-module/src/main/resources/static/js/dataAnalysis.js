$(function () {
    $('.nav > ul > li').click(function () {
        clickLi(this);
    });
});


function shrinkOrExpand() {

}


//点击最外层分层处理函数
function clickLi(li){
    var ul = $(li).children('ul');
    if(ul.length != 0){
        if(ul.is(':hidden')){
            ul.show();
            $(li).children('div').children('i').attr('class' , 'fa fa-angle-up');

        }else{
            ul.hide();
            $(li).children('div').children('i').attr('class' , 'fa fa-angle-down');
            $(li).children('div').removeAttr('style');
        }
    }

    //设置同胞统一设置子级隐藏
    var siblingLiUl =  $(li).siblings('li').children('ul');
    if(!siblingLiUl.is(':hidden')){
        siblingLiUl.hide();
        $(li).siblings('li').children('i').attr('class' , 'fa fa-angle-down');
    }

}