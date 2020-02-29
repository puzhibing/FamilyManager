
var inputId = '';//存储点击选择表单input记录当前点击的id值

$(function () {
    init();

    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;

    $('.selected').css({
        'left' : (width - 502) / 2
    });

    $('.select').click(function () {
        inputId = $(this).attr('id');
        var clazz = $(this).attr('clazz');
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

    $('.transfer_text .type').change(function () {
        chooseTransferType();
    })

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

    $('.consumption_text .whetherToAmortize').change(function () {
        chooseAmortizationType();
    })

    getTheMonthData();//获取本月支出总和
    getThisYear();//获取本年支出总和
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
        case 'typeOfIncome'://收入类型
            getTypeOfIncome();
            break;
        case 'expenditureAccount'://支出账户
            getExpenditureAccount();
            break;
        case 'incomeAccount'://收入账户、转入账户、转出账户、借贷入账户
            // getIncomeAccount();
            getExpenditureAccount();
            break
        case 'contacts'://成员
            getContacts();
            break
        case 'borrower'://借款对象
            getBorrower();
            break;
        case 'loanObject'://贷款对象
            getLoanObject();
            break;
        case 'investmentObject'://投资对象
            getInvestmentObject();
            break;
        case 'repaymentObject'://还款
            getRepaymentObject();
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
                    str += '<li id="' + list[i].id + '" onclick="getClassificationValue(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
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
                    str += '<li id="' + list[i].id + '" onclick="getClassificationValue(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
            }
        }
    });
}


//获取支出账户
function getExpenditureAccount() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('账户相关');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="getAccountValue(this)">' + list[i].name + '</li>';
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
            }
        }
    });
}


//获取收入账户、转入账户、转出账户、借贷入账户
function getIncomeAccount() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('账户相关');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    if(list[i].id == '2c18b356a06645479aec'){
                        str += '<li id="' + list[i].id + '" onclick="getAccountValue(this)">' + list[i].name + '</li>';
                    }
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
            }
        }
    });
}




//获取还款对象（包含借贷对象和所有的成员对象）
function getRepaymentObject() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('还款相关');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    if(list[i].id == '6c9ccc681599478c9d45' || list[i].id == '3ccf613441a546c9a355'){
                        str += '<li id="' + list[i].id + '" onclick="getAccountValue(this)">' + list[i].name + '</li>';
                    }
                }

                //获取成员相关分类数据
                $.ajax({
                    url: '/Classification/selectDataByKind',
                    type: 'POST',
                    data: {
                        kind: 'wvrr4ax8uimvmtlo0p50'
                    },
                    success: function (res) {
                        if(res.b){
                            var list = res.result;
                            for (var i = 0 ; i < list.length ; i++){
                                str += '<li id="' + list[i].id + '" onclick="getContactsValue(this)">' + list[i].name + '</li>'
                            }
                            str += '</ul>';
                            $('.selected .con .type').html(str);
                        }
                    }
                });

            }
        }
    });
}




//获取往来对象数据
function getContacts() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: 'wvrr4ax8uimvmtlo0p50'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('成员');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<li id="' + list[i].id + '" onclick="getContactsValue(this)">' + list[i].name + '</li>'
                }
                str += '</ul>';
                $('.selected .con .type').html(str);
            }
        }
    });
}


//获取借款相关（信用借款和所有成员）
function getBorrower() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('借款相关');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    if(list[i].id == '6c9ccc681599478c9d45'){
                        str += '<li id="' + list[i].id + '" onclick="getAccountValue(this)">' + list[i].name + '</li>';
                    }
                }

                //获取成员相关分类数据
                $.ajax({
                    url: '/Classification/selectDataByKind',
                    type: 'POST',
                    data: {
                        kind: 'wvrr4ax8uimvmtlo0p50'
                    },
                    success: function (res) {
                        if(res.b){
                            var list = res.result;
                            for (var i = 0 ; i < list.length ; i++){
                                str += '<li id="' + list[i].id + '" onclick="getContactsValue(this)">' + list[i].name + '</li>'
                            }
                            str += '</ul>';
                            $('.selected .con .type').html(str);
                        }
                    }
                });

            }
        }
    });
}


//获取贷款相关分类数据
function getLoanObject() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('借款相关');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    if(list[i].id == '3ccf613441a546c9a355'){
                        str += '<li id="' + list[i].id + '" onclick="getAccountValue(this)">' + list[i].name + '</li>';
                    }
                }

                str += '</ul>';
                $('.selected .con .type').html(str);
            }
        }
    });
}


//获取投资相关分类
function getInvestmentObject() {
    $.ajax({
        url: '/Classification/selectDataByKind',
        type: 'POST',
        data: {
            kind: '4wvbwptevrnwq9m2qd7e'
        },
        success: function (res) {
            if(res.b){
                $('.selected .con .type').html('');
                $('.selected .title span').text('借款相关');
                var list = res.result;
                var str = '<ul>';
                for (var i = 0 ; i < list.length ; i++){
                    if(list[i].id == '96d34403a8f24910997e'){
                        str += '<li id="' + list[i].id + '" onclick="getAccountValue(this)">' + list[i].name + '</li>';
                    }
                }

                str += '</ul>';
                $('.selected .con .type').html(str);
            }
        }
    });
}


//点击分类，获取分类对象的值
function getClassificationValue(e){
    $(e).siblings().removeAttr('style');
    $(e).css({
        'border-left':'3px solid #880015',
        'color':'#880015',
        'background-color':'#FFFFFF'
    });
    var id = $(e).attr('id');

    $.ajax({
        url: '/ClassificationValue/selectDataByClassification',
        type: 'POST',
        data: {
            classification: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<table>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '" onclick="selectValue(this)"><td>' + list[i].name + '</td></tr>';
                }
                str += '</table>';
                $('.selected .con .option').html(str);
            }
        }
    });

}


//点击账户分类获取账户数据
function getAccountValue(e){
    $(e).siblings().removeAttr('style');
    $(e).css({
        'border-left':'3px solid #880015',
        'color':'#880015',
        'background-color':'#FFFFFF'
    });
    var id = $(e).attr('id');

    $.ajax({
        url: '/ContactsAccount/selectDataByClassification',
        type: 'POST',
        data: {
            classification: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<table>';
                for (var i = 0 ; i < list.length ; i++){
                    str += '<tr id="' + list[i].id + '" onclick="selectValue(this)"><td>' + list[i].name + '</td><td>' + list[i].balance + '</td></tr>';
                }
                str += '</table>';
                $('.selected .con .option').html(str);
            }
        }
    });
}


//点击成员相关的分类获取对应的值
function getContactsValue(e) {
    $(e).siblings().removeAttr('style');
    $(e).css({
        'border-left':'3px solid #880015',
        'color':'#880015',
        'background-color':'#FFFFFF'
    });
    var id = $(e).attr('id');

    $.ajax({
        url: '/ContactsAccount/selectDataByClassification',
        type: 'POST',
        data: {
            classification: id
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var str = '<table>';
                for (var i = 0 ; i < list.length ; i++){
                    if(list[i].type == '1') {
                        str += '<tr id="' + list[i].id + '" onclick="selectValue(this)"><td>' + list[i].name + '</td><td>' + list[i].balance + '</td></tr>';
                    }
                }
                str += '</table>';
                $('.selected .con .option').html(str);
            }
        }
    });
}




//点击选择值处理的函数
function selectValue(e){
    var text = $(e).children('td:first').text();
    var id = $(e).attr('id');
    $('#' + inputId).val(text);
    $('#' + inputId).attr('valueId',id);
    selectPopup('hide');
}




//提交数据处理函数
function saveExpenditureData(){
    var id = '';
    var amount = $('.consumption_text .amount').val();
    var classificationValue = $('.consumption_text #typeOfExpenditure').attr('valueId');
    var expenditure = $('.consumption_text #expenditureAccount').attr('valueId');
    var documentDate = getDateForDatetimeLocal($('.consumption_text .documentDate').val());
    var remark = $('.consumption_text .remark').val();
    var amortizationMonths = $('.consumption_text .amortizationMonths').val();

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
            businessType: '1',//支出
            expenditure: expenditure,
            amount: amount,
            classificationValue: classificationValue,
            remark: remark,
            amortizationMonths: amortizationMonths,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                $('.consumption_text .amount').val('');
                $('.consumption_text #typeOfExpenditure').val('');
                $('.consumption_text #expenditureAccount').val('');
                $('.consumption_tex .documentDate').val('');
                $('.consumption_tex .remark').val('');
                $('.consumption_text .amortizationMonths').val('');
                alert('保存成功');
            }
        }
    });
}



function saveIncomeData() {
    var id = '';
    var amount = $('.income_text .amount').val();
    var contacts = $('.income_text #contacts').attr('valueId');
    var classificationValue = $('.income_text #incomeType').attr('valueId');
    var income = $('.income_text #incomeAccount').attr('valueId');
    var documentDate = getDateForDatetimeLocal($('.income_text .documentDate').val());
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
            businessType: '2',//收入
            income: income,
            amount: amount,
            contacts: contacts,
            classificationValue: classificationValue,
            remark: remark,
            token: '1'
        },
        success: function (res) {
            if(res.b){
                $('.income_text .amount').val('');
                $('.income_text #contacts').val('');
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
    var type = $('.transfer_text .type').val();
    var expenditure = $('.transfer_text #transferAccount').attr('valueId');//支出
    var income = $('.transfer_text #transferToAccount').attr('valueId');//收入
    var amount = $('.transfer_text .amount').val();
    var documentDate = getDateForDatetimeLocal($('.transfer_text .documentDate').val());
    var remark = $('.transfer_text .remark').val();
    var classificationValue = '';

    var businessType = '3';//转账
    if(type == '2'){
        businessType = '10';//还款
        classificationValue = 'fa5eb829090e4a67a985';
    }else if('3'){
        businessType = '11';//收款
        expenditure = $('.transfer_text #transferToAccount').attr('valueId');//支出
        income = $('.transfer_text #transferAccount').attr('valueId');//收入
        classificationValue = 'd79e5553c02945568a43';
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
            businessType: businessType,
            income: income,
            expenditure: expenditure,
            amount: amount,
            classificationValue: classificationValue,
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

//选择不同的类型处理函数
function chooseTransferType() {
    var type = $('.transfer_text .type').val();
    if(type == '1'){
        $('.transfer_text .outAccount').text('转入账户');
        $('.transfer_text .enterAccount').text('转出账户');
        $('.transfer_text .amountName').text('转账金额');
        $('.transfer_text .date').text('转账日期');

        $('#transferToAccount').attr('clazz','incomeAccount');
    }else if(type == '2'){//还款
        $('.transfer_text .outAccount').text('支出账户');
        $('.transfer_text .enterAccount').text('还款对象');
        $('.transfer_text .amountName').text('还款金额');
        $('.transfer_text .date').text('还款日期');

        $('#transferToAccount').attr('clazz','repaymentObject');
    }else{//收款
        $('.transfer_text .outAccount').text('收入账户');
        $('.transfer_text .enterAccount').text('还款对象');
        $('.transfer_text .amountName').text('还款金额');
        $('.transfer_text .date').text('还款日期');

        $('#transferToAccount').attr('clazz','repaymentObject');
    }
}





function saveBorrowingData() {
    var id = '';
    var income = '';
    var expenditure = '';
    var businessType = '';
    var amount = $('.borrowing_text .amount').val();
    var documentDate = getDateForDatetimeLocal($('.borrowing_text .documentDate').val());
    var remark = $('.borrowing_text .remark').val();
    var type = $('.borrowing_text .type').val();
    switch (type) {
        case '1':
            income = $('.borrowing_text #contactsAccount').attr('valueId');
            expenditure = $('.borrowing_text #borrowingAccount').attr('valueId');
            businessType = '4';//借出
            break;
        case '2':
            income = $('.borrowing_text #borrowingAccount').attr('valueId');
            expenditure = $('.borrowing_text #contactsAccount').attr('valueId');
            businessType = '5';//借入
            break;
        case '3':
            income = $('.borrowing_text #contactsAccount').attr('valueId');
            expenditure = $('.borrowing_text #borrowingAccount').attr('valueId');
            businessType = '6';//贷出
            break;
        case '4':
            income = $('.borrowing_text #borrowingAccount').attr('valueId');
            expenditure = $('.borrowing_text #contactsAccount').attr('valueId');
            businessType = '7';//贷入
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
            businessType: businessType,
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

            $('#contactsAccount').attr('clazz','borrower');
            break;
        case '2':
            $('.borrowing_text .ordinaryName').text('借入账户');
            $('.borrowing_text .contactsName').text('借款对象');
            $('.borrowing_text .amountName').text('借款金额');
            $('.borrowing_text .dateName').text('借款日期');

            $('#contactsAccount').attr('clazz','borrower');
            break;
        case '3':
            $('.borrowing_text .ordinaryName').text('贷出账户');
            $('.borrowing_text .contactsName').text('贷款对象');
            $('.borrowing_text .amountName').text('贷款金额');
            $('.borrowing_text .dateName').text('贷款日期');

            $('#contactsAccount').attr('clazz','loanObject');
            break;
        case '4':
            $('.borrowing_text .ordinaryName').text('贷入账户');
            $('.borrowing_text .contactsName').text('贷款对象');
            $('.borrowing_text .amountName').text('贷款金额');
            $('.borrowing_text .dateName').text('贷款日期');

            $('#contactsAccount').attr('clazz','loanObject');
            break;
        default:
            break;
    }
}


function saveInvestmentData(){
    var id = '';
    var income = '';
    var expenditure = '';
    var businessType = '';
    var amount = $('.investment_text .amount').val();
    var documentDate = getDateForDatetimeLocal($('.investment_text .documentDate').val());
    var remark = $('.investment_text .remark').val();
    var type = $('.investment_text .type').val();
    if(type == '1'){
        income = $('.investment_text #investmentObject').attr('valueId');
        expenditure = $('.investment_text #investmentAccount').attr('valueId');
        businessType = '8';//投资支出
    }else{
        income = $('.investment_text #investmentAccount').attr('valueId');
        expenditure = $('.investment_text #investmentObject').attr('valueId');
        businessType = '9';//投资赎回
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
            businessType: businessType,
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
        $('.investment_text .amountName').text('投资金额');
        $('.investment_text .accountName').text('支出账户');
        $('.investment_text .investmentName').text('投资对象');
        $('.investment_text .date').text('投资日期');
    }else{
        $('.investment_text .amountName').text('赎回金额');
        $('.investment_text .accountName').text('收入账户');
        $('.investment_text .investmentName').text('赎回对象');
        $('.investment_text .date').text('赎回日期');
    }
}




//获取当月支出的数据
function getTheMonthData(){
    var date1 = new Date();
    var start = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-01';
    var end = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + getMonthDays(date1.getFullYear() , date1.getMonth() + 1);
    $.ajax({
        url: '/BusinessOrder/selectExpenditure',
        type: 'POST',
        data: {
            startDate: start,
            endDate: end
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var sun = 0;
                for(var i = 0 ; i < list.length ; i++){
                    sun = parseFloat(sun) + parseFloat(list[i].amount);
                }
                $('.monthsum span:first').text(parseFloat(sun).toFixed(2) + ' 元');
            }
        }
    });
}

//获取本年支出数据
function getThisYear() {
    var date1 = new Date();
    var start = date1.getFullYear() + '-' + '01-01';
    var end = date1.getFullYear() + '-12-31';
    $.ajax({
        url: '/BusinessOrder/selectExpenditure',
        type: 'POST',
        data: {
            startDate: start,
            endDate: end
        },
        success: function (res) {
            if(res.b){
                var list = res.result;
                var sun = 0;
                for(var i = 0 ; i < list.length ; i++){
                    sun = parseFloat(sun) + parseFloat(list[i].amount);
                }
                $('.yearsum span:first').text(parseFloat(sun).toFixed(2) + ' 元');
            }
        }
    });
}



//选择处理函数
function chooseAmortizationType(){
    var type = $('.consumption_text .whetherToAmortize').val();
    if(type == '0'){
        $('.consumption_text .amortizationMonths').removeAttr('disabled');
    }else {
        $('.consumption_text .amortizationMonths').attr('disabled','disabled');
    }
}