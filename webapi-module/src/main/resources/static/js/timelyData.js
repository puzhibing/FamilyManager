$(function () {

    $('.menu nav:first').css({
        'color': '#880015',
        'background-color': '#FFFFFF',
        'border-top-color': '#dddddd',
        'border-right-color': '#dddddd',
        'border-left-color': '#dddddd',
        'border-bottom-color': '#FFFFFF',
    });

    getClassification();
    $('.accountingFlow_panel').hide();

    $('.menu nav').click(function () {
        switchPage($(this));
        var clazz = $(this).attr('class');
        switch (clazz + '_panel') {
            case 'assetsAndLiabilities_panel':
                getClassification();
                break;
            case 'accountingFlow_panel':
                getBusinessOrders(1);
                break;
            default:
                break;
        }
    });

    $('.accountingFlow_panel div div button').click(function () {
        pageTurning(this);
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


//获取所有
function getAllMember(list) {
    $.ajax({
        url: '/ContactsAccount/selectAllData',
        type: 'POST',
        success: function (res) {
            if(res.b){
                var arr = [];
                var ls = [];
                var l = res.result;
                for (var i = 0 ; i < l.length ; i++){
                    if('1' == l[i].type){
                        ls.push(l[i]);
                    }
                }
                var obj = {};
                obj.name = '普通借款';
                arr.push(obj);
                arr.push(ls);

                list.splice(2 , 0 , arr);//将成员相关数据添加到数据集合中

                $('.assetsAndLiabilities_panel .item').html('');
                $('.assetsAndLiabilities_panel .sun span').text('');
                var all = 0;
                for (var i = 0 ; i < list.length ; i++){
                    var str = '<table><tr><th colspan="2">' + list[i][0].name + '</th>';
                    var sun = 0;
                    var st = ''
                    for (var j = 0 ; j < list[i][1].length ; j++){
                        st += '<tr><td>' + (j + 1) + '</td><td>' + list[i][1][j].name + '</td><td>' + list[i][1][j].balance + '</td></tr>';
                        sun = parseFloat(sun) + parseFloat(list[i][1][j].balance);
                    }
                    str += '<th>' + parseFloat(sun).toFixed(2) + '</th></tr>' + st + '</table>';
                    $('.assetsAndLiabilities_panel .item').append(str);

                    all = parseFloat(all) + parseFloat(sun);

                }
                $('.assetsAndLiabilities_panel .sun span').text('资产合计：' + parseFloat(all).toFixed(2));
            }
        }
    });
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
                getAllMember(list);
            }
        }
    });
}



//查询所有业务数据（分页）
function getBusinessOrders(page){
    $.ajax({
        url: '/BusinessOrder/selectAll',
        type: 'POST',
        data: {
            page: page,
            size: 20
        },
        success: function (res) {
            if(res.b){
                var nowPage = $('.nowPage').text();
                $('.accountingFlow_panel div table').html('');
                var list = eval(res.result);
                var str = '<tr><th>序号</th><th>单据日期</th><th>收入方</th><th>支出方</th><th>发生金额</th><th>业务类型</th><th>相关人员</th><th>备注</th><th>操作</th></tr>';
                for (var i = 0; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '"><td>' + (((parseInt(nowPage) - 1) * 20) + (i + 1)) + '</td><td>' + getDateString(list[i].documentDate) + '</td>';

                    if(list[i].income == null){
                        str += '<td></td>';
                    }else{
                        str += '<td>' + list[i].income.name + '</td>';
                    }

                    if(list[i].expenditure == null){
                        str += '<td></td>';
                    }else{
                        str += '<td>' + list[i].expenditure.name + '</td>';
                    }

                    str += '<td>' + list[i].amount + '</td>';

                    if(list[i].classificationValue == null){
                        str += '<td></td>';
                    }else{
                        str += '<td>' + list[i].classificationValue.name + '</td>';
                    }

                    if(list[i].contacts == null){
                        str += '<td></td>';
                    }else{
                        str += '<td>' + list[i].contacts.name + '</td>';
                    }

                    str += '<td class="remark" title="' + list[i].remark + '"><div>' + list[i].remark + '</div></td><td><button class="deleteDocument">删除</button></td></tr>';
                }
                $('.accountingFlow_panel div table').html(str);
                $('.sunPage').text(res.totalPage);
                $('.nowPage').text(page);

                if(page == 1){
                    $('.previousPage').css({
                        'opacity': '0.6',
                        'cursor': 'not-allowed',
                        'disabled':'disabled'
                    });
                    $('.previousPage').attr('disabled','disabled');
                }else {
                    $('.previousPage').removeAttr('style');
                    $('.previousPage').removeAttr('disabled');
                }
                if(res.totalPage < 1 || page == res.totalPage){
                    $('.nextPage').css({
                        'opacity': '0.6',
                        'cursor': 'not-allowed'
                    });
                    $('.nextPage').attr('disabled','disabled');
                }else{
                    $('.nextPage').removeAttr('style');
                    $('.nextPage').removeAttr('disabled');
                }

                //添加删除按钮的点击事件
                $('.deleteDocument').bind('click',function (ev) {
                    var current = $(this);
                    var id = current.parent('td').parent('tr').attr('id');
                    if(confirm('确定删除数据？')){
                        deleteDocuments(id);
                    }
                })
            }
        }
    });
}


//点击翻页按钮实现翻页查询数据
function pageTurning(a){
    var clazz = $(a).attr('class');
    var nowPage = $('.nowPage').text();
    var sunPage = $('.sunPage').text();
    if(clazz == 'previousPage'){
        nowPage = parseInt(nowPage) - 1;
    }else if(clazz == 'nextPage'){
        nowPage = parseInt(nowPage) + 1;
    }
    $('.nowPage').text(nowPage);
    getBusinessOrders(nowPage);
}



//删除单据
function deleteDocuments(id){
    $.ajax({
        url: '/BusinessOrder/deleteData',
        type: 'POST',
        data: {
            id: id,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                alert(res.msg);
                getBusinessOrders(1);
            }
        }
    });
}