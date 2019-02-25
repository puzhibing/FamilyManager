
var kindId = 'ils5hnlfbysciwppvvpk';
var type = '1';//数据类型
var nature = '1';//用于判断动态定义弹窗表单
var title = '支出分类管理';//标题

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
        'height': height - 70
    });

    $('.content .pages .classificationValue').css({
        'width': (width * 0.7) - 251
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
        title = $(this).text();
        switch (clazz) {
            case 'expenditureClassification':
                kindId = 'ils5hnlfbysciwppvvpk';
                type = '1';
                nature = '1';
                formatClassificationValue();
                break;
            case 'incomeClassification':
                kindId = 'wvrr4ax8uimvmtlo0p5p';
                type = '1';
                nature = '1';
                formatClassificationValue();
                break;
            case 'accountManagement':
                kindId = '4wvbwptevrnwq9m2qd7e';
                type = '2';
                nature = '2';
                formatClassificationValue();
                break;
            case 'memberManagement':
                kindId = 'wvrr4ax8uimvmtlo0p50';
                type = '2';
                nature = '3';
                formatClassificationValue();
                break;
            default:
                break;
        }
        getClassification();
    });
    
    //点击弹窗款按钮关闭弹窗
    $('.fa-stack').click(function () {
        $('.Pop-ups').hide();
    });

    //添加按钮
    $('.addButton').click(function () {
        addData();
    });

    //修改按钮
    $('.updateButton').click(function () {
        updateData();
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
    //点击实现样式效果
    $(e).css({
        'background-color':'#880015',
        'color':'#FFFFFF'
    });
    $(e).siblings('li').removeAttr('style');

    //查询数据
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
                    str += '<tr><th>序号</th><th>名称</th><th style="width: 200px;">余额</th></tr>';
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

//点击添加按钮弹出添加弹窗
function addData(){
    var str = '';
    if(nature == '1'){
        str +=
            '<div>' +
            '   <label for="name">分类名称</label>' +
            '   <input id="name" type="text" class="name">' +
            '</div>' +
            '<div>' +
            '   <label for="sort">分类排序</label>' +
            '   <input id="sort" type="text" class="sort">' +
            '</div>' +
            '<div>' +
            '   <button class="saveData">保存</button>' +
            '</div>';
    }else if(nature == '2'){
        str +=
            '<div>' +
            '   <label for="name">账户名称</label>' +
            '   <input id="name" type="text" class="name">' +
            '</div>' +
            '<div>' +
            '   <label for="agency">开户机构</label>' +
            '   <input id="agency" type="text" class="agency">' +
            '</div>' +
            '<div>' +
            '   <label for="accountNumber">账户编号</label>' +
            '   <input id="accountNumber" type="text" class="accountNumber">' +
            '</div>' +
            '<div>' +
            '   <label for="balance">账户余额</label>' +
            '   <input id="balance" type="text" class="balance">' +
            '</div>' +
            '<div>' +
            '   <label for="sort">账户排序</label>' +
            '   <input id="sort" type="text" class="sort">' +
            '</div>' +
            '<div>' +
            '   <button class="saveData">保存</button>' +
            '</div>';

    }else if(nature == '3') {
        str +=
            '<div>' +
            '   <label for="name">成员名称</label>' +
            '   <input id="name" type="text" class="name">' +
            '</div>' +
            '<div>' +
            '   <label for="balance">欠款金额</label>' +
            '   <input id="balance" type="text" class="balance">' +
            '</div>' +
            '<div>' +
            '   <label for="sort">成员排序</label>' +
            '   <input id="sort" type="text" class="sort">' +
            '</div>' +
            '<div>' +
            '   <button class="saveData">保存</button>' +
            '</div>';
    }
    $('.Pop-ups .panel .inputs').html(str);
    $('.Pop-ups .panel .head div:first span').text(title);
    $('.Pop-ups').show();
}


//点击修改按钮弹出修改页面
function updateData(){
    $('.Pop-ups').show();
}