
var kindId = 'ils5hnlfbysciwppvvpk';
var type = '1';//数据类型
var nature = '1';//用于判断动态定义弹窗表单
var title = '支出分类管理';//标题
var classificationId = '';
var valueId = '';
var v = '';
var notdel = '';//是否运行对此项进行操作

$(function () {

    //初始化页面样式
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    $('.content nav:first').css({
        'background-color':'#FFFFFF',
        'border-bottom':'2px solid #880015'
    });

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
        //初始化变量值
        classificationId = '';
        valueId = '';
        v = '';

        $(this).css({//设置基础样式
            'background-color':'#FFFFFF',
            'border-bottom':'2px solid #880015'
        });
        $(this).siblings().removeAttr('style');

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
        valueId = '';//初始化值
        v = '';
        $('.classificationValue .value table tr').removeAttr('style');

        if(classificationId == ''){
            alert('请选择对应的分类');
            return;
        }
        addData();
    });

    //修改按钮
    $('.updateButton').click(function () {
        if(notdel == '-1'){
            alert('系统默认项，不允许修改！');
            return;
        }
        if(valueId == '' || v == ''){
            alert('请选择需要修改的项');
            return;
        }
        updateValues();
    });

    //删除值
    $('.deleteButton').click(function () {
        if(notdel == '-1'){
            alert('系统默认项，不允许删除！');
            return;
        }
        if(valueId == ''){
            alert('请选择需要删除的项');
            return;
        }
        deleteValue();
    });

    //添加分类按钮
    $('.addClassification').click(function () {
        addClassification();
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
                    str += '<li value="' + list[i].id + '" notdel="' + list[i].notdel + '" onclick="getClassificationVal(this)"><div><span>' + list[i].name + '</span></div><i class="fa fa-trash-o" onclick="deleteClassification(this)"></i></li>'
                }
                str += '</ul>';
                $('.pages .classification .ul').html(str);
            }
        }
    });
}


//点击分类获取分类对相应的值
function getClassificationVal(e){
    //初始化变量值
    valueId = '';
    v = '';

    //点击实现样式效果
    classificationId = $(e).attr('value');
    $(e).css({
        'background-color':'#DF5353',
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
                        str +=
                            '<tr value="' + list[i].id + '" notdel="' + list[i].notdel + '" onclick="chooseValue(this)" v="' + list[i].name + ';' + list[i].sort + '">' +
                                '<td>' + (i + 1) + '</td><td>' + list[i].name + '</td>' +
                            '</tr>';
                    }
                }else if(type == '2'){
                    str += '<tr><th>序号</th><th>名称</th><th style="width: 200px;">余额</th></tr>';
                    for(var i = 0 ; i < list.length ; i++){
                        str +=
                            '<tr value="' + list[i].id + '" notdel="' + list[i].notdel + '" onclick="chooseValue(this)"  v="' + list[i].name + ';' + list[i].agency + ';' + list[i].accountNumber + ';' + list[i].balance + ';' + list[i].sort + '">' +
                                '<td>' + (i + 1) + '</td><td>' + list[i].name + '</td><td>' + list[i].balance + '</td>' +
                            '</tr>';
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
            '   <button class="saveData" onclick="saveClassificationValue()">保存</button>' +
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
            '   <label for="ptzh">普通账户</label>' +
            '   <input value="1" type="radio" name="accountType" id="ptzh" checked="checked">' +
            '   <label for="xyzh">信用账户</label>' +
            '   <input value="-1" type="radio" name="accountType" id="xyzh">' +
            '</div>' +
            '<div>' +
            '   <button class="saveData" onclick="saveContactsAccountValue()">保存</button>' +
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
            '   <button class="saveData" onclick="saveContactsAccountValue()">保存</button>' +
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


//点击添加分类按钮实现添加分类数据
function addClassification(){
    var value = $('.classificationInput').val();
    if(value == ''){
        alert('请填写有效数据');
        return;
    }
    
    $.ajax({
        url: '/Classification/insertData',
        type: 'POST',
        data: {
            name: value,
            kind: kindId,
            token: 1
        },
        success: function (res) {
            if(res.b){
                getClassification();
                $('.classificationInput').val('');
                alert('添加成功');
            }
        }
    });
}


//点击分类上的删除按钮实现分类数据的删除
function deleteClassification(e){
    var id = $(e).parent('li').attr('value');
    var notdel = $(e).parent('li').attr('notdel');
    if(notdel == '-1'){
        alert('系统默认项，不允许删除！');
        return;
    }
    $.ajax({
        url: '/Classification/deleteData',
        type: 'POST',
        data: {
            id: id,
            token: 1
        },
        success: function (res) {
            if(res.b){
                getClassification();
                alert('删除成功');
            }
        }
    });
}


//保存分类值的处理
function saveClassificationValue(){
    var name = $('#name').val();
    var sort = $('#sort').val();
    if(name == '' || sort == ''){
        alert('请填写有效数据');
        return;
    }

    var url = '';
    var formData = new FormData();
    if(valueId == ''){
        url = '/ClassificationValue/insertData';
    }else{
        url = '/ClassificationValue/updateData';
        formData.append('id',valueId);
    }
    formData.append('classification',classificationId);
    formData.append('name',name);
    formData.append('notdel','1');
    formData.append('sort',sort);
    formData.append('token','1');
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if(res.b){
                $('.Pop-ups').hide();
                var e = $('.classification .ul li[value = "' + classificationId + '"]');//获取value值为classificationId的对象
                e.click();//触发对象上的点击事件
                alert('保存成功');
            }
        }
    });
}

//保存账户及成员的处理
function saveContactsAccountValue(){
    var name = $('#name').val();
    var agency = $('#agency').val();
    var accountNumber = $('#accountNumber').val();
    var balance = $('#balance').val();
    var sort = $('#sort').val();
    var accountType = '';
    var t = '';
    if(name == '' || balance == '' || sort == ''){
        alert('请填写有效数据');
        return;
    }

    if(nature == '2'){//账户
        t = '0';
        var radio = $('.Pop-ups .panel .inputs input[type="radio"]:checked');
        accountType = radio.val();
    }else if(nature == '3'){//成员
        agency = '';
        accountNumber = '';
        t = '1';
    }

    var url = '';
    var formData = new FormData();
    if(valueId == ''){
        url = '/ContactsAccount/insertData';
    }else{
        url = '/ContactsAccount/updateData';
        formData.append('id',valueId);
    }
    formData.append('classification',classificationId);
    formData.append('type',t);
    formData.append('name',name);
    formData.append('agency',agency);
    formData.append('accountNumber',accountNumber);
    formData.append('balance',balance);
    formData.append('notdel','1');
    formData.append('sort',sort);
    formData.append('accountType',accountType);
    formData.append('token','1');

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if(res.b){
                $('.Pop-ups').hide();
                var e = $('.classification .ul li[value = "' + classificationId + '"]');//获取value值为classificationId的对象
                e.click();//触发对象上的点击事件
                alert('保存成功');
            }
        }
    });
}


//选中分类值表格中的数据的处理
function chooseValue(e) {
    $(e).css({
        'background-color':'#DF5353',
        'color':'#FFFFFF'
    });
    $(e).siblings('tr').removeAttr('style');
    valueId = $(e).attr('value');
    notdel = $(e).attr('notdel');
    v = $(e).attr('v');
}


//点击修改按钮执行修改的处理
function updateValues(){
    var arr = v.split(';');
    addData();
    if(nature == '1'){
        $('.inputs #name').val(arr[0]);
        $('.inputs #sort').val(arr[1]);
    }else if(nature == '2'){
        $('.inputs #name').val(arr[0]);
        $('.inputs #agency').val(arr[1]);
        $('.inputs #accountNumber').val(arr[2]);
        $('.inputs #balance').val(arr[3]);
        $('.inputs #sort').val(arr[4]);
    }else if(nature == '3'){
        $('.inputs #name').val(arr[0]);
        $('.inputs #balance').val(arr[3]);
        $('.inputs #sort').val(arr[4]);
    }
}


//点击删除按钮删除分类值
function deleteValue(){
    var url = '';
    if(type == '1'){
        url = '/ClassificationValue/deleteData';
    }else if(type == '2'){
        url = '/ContactsAccount/deleteData';
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: valueId,
            token: 1
        },
        success: function (res) {
            if(res.b){
                var e = $('.classification .ul li[value = "' + classificationId + '"]');//获取value值为classificationId的对象
                e.click();//触发对象上的点击事件
                alert(res.msg);
                return;
            }
        }
    })
}