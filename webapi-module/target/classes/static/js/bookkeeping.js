


$(function () {
    init();

    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;

    $('.selected').css({
        'left' : (width - 502) / 2
    });

    $('.select').click(function () {
        var clazz = $(this).attr('clazz');
        var id = $(this).attr('id');
        $('.inputId').val(id);
        dynamicContent(clazz);
        selectPopup('show');
        $('.selected .con .option').html('');
    });


    $('.menu nav').click(function () {
        q(this);
    });
    
    
    //关闭按钮关闭弹窗
    $('.selected .title i').click(function () {
        selectPopup('hide');
    });

    //定义提交事件
    $('.consumption_text button').click(function () {
        saveExpenditureData();
    });

    $('.income_text button').click(function () {
        saveIncomeData();
    });

    $('.transfer_text button').click(function () {
        saveTransferData();
    });

    $('.borrowing_text .type').change(function () {
        chooseBorrowingType();
    })

    $('.borrowing_text button').click(function () {
        saveBorrowingData();
    });

    $('.investment_text .type').change(function () {
        chooseInvestmentType();
    });

    $('.investment_text button').click(function () {
        saveInvestmentData();
    });
});



//初始化页面样式
function init() {
    $('.menu nav:first').css({
        'background-color':'#FFFFFF',
        'border-bottom':'2px solid #880015'
    });
    var c = $('.menu nav:first').attr('class') + '_text';
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
    var c = $(e).attr('class') + '_text';
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



//根据点击的类型不同，定义选择面板的不同数据
function dynamicContent(clazz){
    switch (clazz) {
        case 'typeOfExpenditure'://支出类型
            getTypeOfExpenditure();
            break;
        case 'typeOfIncome':
            getTypeOfIncome();
            break;
        case 'contactsAccount':
            getContactsAccount();
            break;
        default:
            break;
    }
}




//获取支出类型数据
function getTypeOfExpenditure() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: 'ils5hnlfbysciwppvvpk'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('支出类型');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="selectLi(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
                $('.seletedType').val('1');
            }
        }
    });
}



//获取收入类型数据
function getTypeOfIncome() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: 'wvrr4ax8uimvmtlo0p5p'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('收入类型');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="selectLi(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
                $('.seletedType').val('1');
            }
        }
    });
}



//获取账户及往来数据
function getContactsAccount() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('账户及往来');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="selectLi(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
                $('.seletedType').val('2');
            }
        }
    });
}




//点击分类选项处理的相关逻辑
function selectLi(e){
    $(e).siblings().removeAttr('style');
    $(e).css({
        'border-left':'3px solid #880015',
        'color':'#880015',
        'background-color':'#FFFFFF'
    });
    var type = $('.seletedType').val();
    var id = $(e).attr('id');
    getValues(type , id);
}



//点击分类获取数据
function getValues(type , id){
    var url = '';
    if('1' == type){
        url = '/ClassificationValue/selectDataByClassification';
    }else if('2' == type){
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
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="selectValue(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .option').html(str);
            }
        }
    });
}




//点击选择值处理的函数
function selectValue(e){
    var inputId = $('.inputId').val();
    var value = $(e).text();
    var valueId = $(e).attr('id');
    $('#' + inputId).val(value);
    $('#' + inputId).attr('valueId',valueId);
    selectPopup('hide');
}




//提交数据处理函数
function saveExpenditureData(){
    var id = '';
    var amount = $('.consumption_text .amount').val();
    var classificationValue = $('.consumption_text #typeOfExpenditure').val();
    var expenditure = $('.consumption_text #expenditureAccount').val();
    var documentDate = $('.consumption_tex .documentDate').val();
    var remark = $('.consumption_tex .remark').val();

    if(amount == ''){
        alert('金额不能为空');
        return
    }
    if(classificationValue == ''){
        alert('类型不能为空');
        return
    }
    if(expenditure == ''){
        alert('账户不能为空');
        return
    }
    if(documentDate == ''){
        alert('日期不能为空');
        return
    }

    var url;
    if(id == ''){
        url = '/BusinessOrder/insertData';
    }else{
        url = '/BusinessOrder/updateData';
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: id,
            documentDate: documentDate,
            documentType: '1',
            expenditure: expenditure,
            amount: amount,
            classificationValue: classificationValue,
            remark: remark,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                $('.consumption_text .amount').val('');
                $('.consumption_text #typeOfExpenditure').val('');
                $('.consumption_text #expenditureAccount').val('');
                $('.consumption_tex .documentDate').val('');
                $('.consumption_tex .remark').val('');
                alert('保存成功');
            }
        }
    });
}



function saveIncomeData() {
    var id = '';
    var amount = $('.income_text .amount').val();
    var classificationValue = $('.income_text #incomeType').val();
    var income = $('.income_text #incomeAccount').val();
    var documentDate = $('.income_text .documentDate').val();
    var remark = $('.income_text .remark').val();


    var url;
    if(id == ''){
        url = '/BusinessOrder/insertData';
    }else{
        url = '/BusinessOrder/updateData';
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: id,
            documentDate: documentDate,
            documentType: '2',
            income: income,
            amount: amount,
            classificationValue: classificationValue,
            remark: remark,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                $('.income_text .amount').val('');
                $('.income_text #incomeType').val('');
                $('.income_text #incomeAccount').val('');
                $('.income_text .documentDate').val('');
                $('.income_text .remark').val('');
                alert('保存成功');
            }
        }
    });
}


function saveTransferData(){
    var id = '';
    var expenditure = $('.transfer_text #transferAccount').val();
    var income = $('.transfer_text #transferToAccount').val();
    var amount = $('.transfer_text .amount').val();
    var documentDate = $('.transfer_text .documentDate').val();
    var remark = $('.transfer_text .remark').val();

    var url;
    if(id == ''){
        url = '/BusinessOrder/insertData';
    }else{
        url = '/BusinessOrder/updateData';
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: id,
            documentDate: documentDate,
            documentType: '3',
            income: income,
            expenditure: expenditure,
            amount: amount,
            remark: remark,
            token: '1'
        },
        success: function (res) {
            if (res.b) {
                $('.transfer_text #transferAccount').val('');
                $('.transfer_text #transferToAccount').val('');
                $('.transfer_text .amount').val('');
                $('.transfer_text .documentDate').val('');
                $('.transfer_text .remark').val('');
                alert('保存成功');
            }
        }
    });
}


function saveBorrowingData() {
    var id = '';
    var income = '';
    var expenditure = '';
    var amount = $('.borrowing_text .amount').val();
    var documentDate = $('.borrowing_text .documentDate').val();
    var remark = $('.borrowing_text .remark').val();
    var type = $('.borrowing_text .type').val();
    switch (type) {
        case '1':
            income = $('.borrowing_text #contactsAccount').val();
            expenditure = $('.borrowing_text #borrowingAccount').val();
            break;
        case '2':
            income = $('.borrowing_text #borrowingAccount').val();
            expenditure = $('.borrowing_text #contactsAccount').val();
            break;
        case '3':
            income = $('.borrowing_text #contactsAccount').val();
            expenditure = $('.borrowing_text #borrowingAccount').val();
            break;
        case '4':
            income = $('.borrowing_text #borrowingAccount').val();
            expenditure = $('.borrowing_text #contactsAccount').val();
            break;
        default:
            break;
    }


    var url;
    if(id == ''){
        url = '/BusinessOrder/insertData';
    }else{
        url = '/BusinessOrder/updateData';
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: id,
            documentDate: documentDate,
            documentType: '3',
            income: income,
            expenditure: expenditure,
            amount: amount,
            remark: remark,
            token: '1'
        },
        success: function (res) {
            if (res.b) {
                $('.borrowing_text .amount').val('')
                $('.borrowing_text .documentDate').val('');
                $('.borrowing_text .remark').val('');
                $('.borrowing_text #borrowingAccount').val('');
                $('.borrowing_text #contactsAccount').val('');
                alert('保存成功');
            }
        }
    });






}



//选择不同的项修改页面显示的标题内容
function chooseBorrowingType(){
    var type = $('.borrowing_text .type').val();
    switch (type) {
        case '1':
            $('.borrowing_text .ordinaryName').text('借出账户');
            $('.borrowing_text .contactsName').text('借款对象');
            $('.borrowing_text .amountName').text('借款金额');
            $('.borrowing_text .dateName').text('借款日期');
            break;
        case '2':
            $('.borrowing_text .ordinaryName').text('借入账户');
            $('.borrowing_text .contactsName').text('借款对象');
            $('.borrowing_text .amountName').text('借款金额');
            $('.borrowing_text .dateName').text('借款日期');
            break;
        case '3':
            $('.borrowing_text .ordinaryName').text('贷出账户');
            $('.borrowing_text .contactsName').text('贷款对象');
            $('.borrowing_text .amountName').text('贷款金额');
            $('.borrowing_text .dateName').text('贷款日期');
            break;
        case '4':
            $('.borrowing_text .ordinaryName').text('贷入账户');
            $('.borrowing_text .contactsName').text('贷款对象');
            $('.borrowing_text .amountName').text('贷款金额');
            $('.borrowing_text .dateName').text('贷款日期');
            break;
        default:
            break;
    }
}


function saveInvestmentData(){
    var id = '';
    var income = '';
    var expenditure = '';
    var amount = $('.investment_text .amount').val();
    var documentDate = $('.investment_text .documentDate').val();
    var remark = $('.investment_text .remark').val();
    var type = $('.investment_text .type').val();
    if(type == '1'){
        income = $('.investment_text #investmentObject').val();
        expenditure = $('.investment_text #investmentAccount').val();
    }else{
        income = $('.investment_text #investmentAccount').val();
        expenditure = $('.investment_text #investmentObject').val();
    }

    var url;
    if(id == ''){
        url = '/BusinessOrder/insertData';
    }else{
        url = '/BusinessOrder/updateData';
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: id,
            documentDate: documentDate,
            documentType: '3',
            income: income,
            expenditure: expenditure,
            amount: amount,
            remark: remark,
            token: '1'
        },
        success: function (res) {
            if (res.b) {
                $('.investment_text .amount').val('')
                $('.investment_text .documentDate').val('');
                $('.investment_text .remark').val('');
                $('.investment_text #investmentObject').val('');
                $('.investment_text #investmentAccount').val('');
                alert('保存成功');
            }
        }
    });


}




function chooseInvestmentType() {
    var type = $('.investment_text .type').val();
    if(type == '1'){
        $('.investment_text .accountName').text('');
        $('.investment_text .investmentName').text('');
        $('.investment_text .date').text('');
        $('.investment_text .amountName').text('')
    }else{
        $('.investment_text .accountName').text('');
        $('.investment_text .investmentName').text('');
        $('.investment_text .date').text('');
        $('.investment_text .amountName').text('')
    }
}