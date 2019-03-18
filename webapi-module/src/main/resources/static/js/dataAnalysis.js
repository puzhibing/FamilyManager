$(function () {
    $('.head div ul li').mouseenter(function () {
        $('.smallMenu').show();
        var clazz = $(this).attr('class');
        $('.' + clazz).css({
            'background-color': 'rgba(136,0,21,0.5)'
        });
    });

    $('.head div ul li').mouseleave(function () {
        $('.smallMenu').hide();
        var clazz = $(this).attr('class');
        $('.' + clazz).removeAttr('style');
    });

    $('.smallMenu').mouseenter(function () {
        $(this).show();
    });

    $('.smallMenu').mouseleave(function () {
        $(this).hide();
    });


    $('.smallMenu div div').mouseenter(function () {
        var clazz = $(this).attr('class');
        $('.' + clazz).css({
            'background-color': 'rgba(136,0,21,0.5)'
        });
    });

    $('.smallMenu div div').mouseleave(function () {
        var clazz = $(this).attr('class');
        $('.' + clazz).removeAttr('style');
    });

    $('.smallMenu div div ul li').click(function () {
        getPageHtml(this);
        $('.smallMenu').hide();
    });
});


//点击菜单获取对应页面中的节点
function getPageHtml(a) {
    var node = $(a).attr('node');
    $.ajax({
        url: 'reportTemplate.html',
        type: 'GET',
        success: function (res) {
            var doms = $.parseHTML(res);//解析Html串
            var imgs = $(doms).find('div').length;//children()方法：查找元素
        }
    });
}