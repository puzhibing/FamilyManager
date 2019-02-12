
$(function () {

    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    $('.selected').css({
        'left' : (width - 420) / 2
    });

    $('#classification').click(function () {
        var kindId = $('.kindId').val();
        if('' == kindId){
            alert('请先选择类型');
            return;
        }
        selectPopup1('show');
    });

    $('#classificationValue').click(function () {
        var classificationId = $('.classificationId').val();
        var kindId = $('.kindId').val();
        if('' == classificationId){
            alert('请先选择分类');
            return;
        }
        var name = $('#' + kindId).attr('atr');
        if(name == '账户类型'){
            selectPopup3('show');
        }else{
            selectPopup2('show');
        }

    });

    $('.fa-close').click(function () {
        selectPopup1('hide');
        selectPopup2('hide');
        selectPopup3('hide');
    })

    $('.classificationPopup .con button').click(function () {
        addClassification();
    });

    $('.classificationValuePopup1 .con button').click(function () {
        addClassificationValue();
    });

    $('.classificationValuePopup2 .con button').click(function () {
        addContactsAccount();
    });

    getKinds();
});


//处理分类编辑弹窗效果
function selectPopup1(show){
    if('show' == show){
        $('.mask').show();
        $('.classificationPopup').show();
    }else{
        $('.mask').hide();
        $('.classificationPopup').hide();
    }
}

//处理分类编辑弹窗效果
function selectPopup2(show){
    if('show' == show){
        $('.mask').show();
        $('.classificationValuePopup1').show();
    }else{
        $('.mask').hide();
        $('.classificationValuePopup1').hide();
    }
}

//处理分类编辑弹窗效果
function selectPopup3(show){
    if('show' == show){
        $('.mask').show();
        $('.classificationValuePopup2').show();
    }else{
        $('.mask').hide();
        $('.classificationValuePopup2').hide();
    }
}



//获取所有类型数据
function getKinds() {
    $.ajax({
        url: '/Kind/selectAll',
        type: 'POST',
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<tr><th>编号</th><th>名称</th></tr>';
                for(var i = 0 ; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '" atr="' + list[i].name + '" onclick="kindSelected(this)"><td>' + (i + 1) + '</td><td>' + list[i].name + '</td></tr>'
                }
                $('.kind>div table').html(str);
            }
        }

    });
}


//点击类型处理函数
function kindSelected(e){
    $(e).siblings().removeAttr('style');
    $(e).css({
        'background-color':'#C23137',
        'color':'#FFFFFF'
    });
    var id = $(e).attr('id');
    getClassification(id);
    $('.kindId').val(id);
}


//根据类型id获取分类数据
function getClassification(id) {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<tr><th>编号</th><th>名称</th></tr>';
                for(var i = 0 ; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '" atr="' + list[i].name + '" onclick="classificationSelected(this)"><td>' + (i + 1) + '</td><td>' + list[i].name + '</td></tr>'
                }
                $('.classification>div table').html(str);
            }
        }
    });
}


//添加分类数据
function addClassification(){
    var kindId = $('.kindId').val();
    var name = $('.classificationName').val();
    var sort = $('.classificationSort').val();
    if('' == name){
        alert('名称不能为空');
        return;
    }
    $.ajax({
        url: '/Classification/insertData',
        type: 'POST',
        data: {
            kind: kindId,
            name: name,
            sort: sort,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                selectPopup1('hide');
                $('.classificationName').val('');
                $('.classificationSort').val('');
                getClassification(kindId);
            }
        }
    });
}


//点击分类处理函数
function classificationSelected(e){
    $(e).siblings().removeAttr('style');
    $(e).css({
        'background-color':'#C23137',
        'color':'#FFFFFF'
    });
    var id = $(e).attr('id');
    var kindId = $('.kindId').val();
    var name = $('#' + kindId).attr('atr');
    if('账户类型' == name){
        getContactsAccount(id);
    }else{
        getClassificationValue(id);
    }


    $('.classificationId').val(id);
}


//获取分类值数据
function getClassificationValue(id){
    $.ajax({
        url: '/ClassificationValue/selectDataByClassification',
        type: 'POST',
        data: {
            classification: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<tr><th>编号</th><th>名称</th></tr>';
                for(var i = 0 ; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '"><td>' + (i + 1) + '</td><td>' + list[i].name + '</td></tr>'
                }
                $('.classificationValue>div table').html(str);
            }
        }
    });
}



//获取账户数据
function getContactsAccount(id){
    $.ajax({
        url: '/ContactsAccount/selectDataByClassification',
        type: 'POST',
        data: {
            classification: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<tr><th>编号</th><th>名称</th><td>余额</td></tr>';
                for(var i = 0 ; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '"><td>' + (i + 1) + '</td><td>' + list[i].name + '</td><td>' + list[i].balance + '</td></tr>'
                }
                $('.classificationValue>div table').html(str);
            }
        }
    });
}



//添加分类数据处理函数
function addClassificationValue(){
    var classificationId = $('.classificationId').val();
    var name = $('.classificationValueName').val();
    var sort = $('.classificationValueSort').val();
    if('' == name){
        alert('数据名称不能为空');
        return;
    }

    $.ajax({
        url: '/ClassificationValue/insertData',
        type: 'POST',
        data: {
            classification: classificationId,
            name: name,
            sort: sort,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                selectPopup2('hide');
                $('.classificationValueName').val('');
                $('.classificationValueSort').val('');
                getClassificationValue(classificationId);
            }
        }
    });
}




//添加往来账户相关数据
function addContactsAccount(){
    var classificationId = $('.classificationId').val();
    var name = $('.contactsAccountName').val();
    var agency = $('.agency').val();
    var accountNumber = $('.accountNumber').val();
    var balance = $('.balance').val();
    var sort = $('.contactsAccountSort').val();
    if('' == name){
        alert('名称不能为空');
        return
    }
    if('' == balance){
        alert('账户余额不能为空');
        return
    }
    var cname = $('#' + classificationId).attr('atr');
    var type = '0';
    if('普通账户' == cname){
        type = '0';
    }else{
        type = '1';
    }

    $.ajax({
        url: '/ContactsAccount/insertData',
        type: 'POST',
        data: {
            classification: classificationId,
            type: type,
            name: name,
            agency: agency,
            accountNumber: accountNumber,
            balance: balance,
            sort: sort,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                selectPopup3('hide');
                $('.contactsAccountName').val('');
                $('.agency').val('');
                $('.accountNumber').val('');
                $('.balance').val('');
                $('.contactsAccountSort').val('');
                getContactsAccount(classificationId);
            }
        }
    });
}