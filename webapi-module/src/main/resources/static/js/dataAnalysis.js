$(function () {
    $('.nav ul li').click(function () {
        clickLi(this);
    });

    $('.nav ul li').mouseenter(function () {
        var parentLi = $(this).parent('ul').parent('li');
        if(parentLi.length != 0){
            parentLi.children('div').css({
                'cursor':'pointer',
               'background-color':'#DF5353',
               'color':'#FFFFFF'
            });

            $(this).siblings('li').removeAttr('style');

            $(this).css({
                'cursor':'pointer',
                'background-color':'#E18282',
                'color':'#FFFFFF'
            });
            return;
        }

        $(this).siblings('li').children('div').removeAttr('style');

        $(this).children('div').css({
            'cursor':'pointer',
            'background-color':'#DF5353',
            'color':'#FFFFFF'
        });
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
            $(li).children('i').attr('class' , 'fa fa-angle-up');

        }else{
            ul.hide();
            $(li).children('i').attr('class' , 'fa fa-angle-down');

        }
    }

    //设置同胞统一设置子级隐藏
    var siblingLiUl =  $(li).siblings('li').children('ul');
    if(!siblingLiUl.is(':hidden')){
        siblingLiUl.hide();
        $(li).siblings('li').children('i').attr('class' , 'fa fa-angle-down');
    }




}