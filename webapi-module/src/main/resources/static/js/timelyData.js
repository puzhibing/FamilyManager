$(function () {

    $('.menu nav:first').css({
        'color': '#880015',
        'background-color': '#FFFFFF',
        'border-top-color': '#dddddd',
        'border-right-color': '#dddddd',
        'border-left-color': '#dddddd',
        'border-bottom-color': '#FFFFFF',
    });


    $('.menu nav').click(function () {
        switchPage($(this));
        switch ($(this).attr('class')) {
            case 'assetsAndLiabilities_panel':
                getClassification();
                break;
        }
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
                var list = res.result;
                var str = '';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<div><div><span>' +  + '</span></div></div>'
                }
            }
        }
    });
}


