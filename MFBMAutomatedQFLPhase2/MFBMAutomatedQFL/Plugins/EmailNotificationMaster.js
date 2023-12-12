$(document).ready(function () {

    InitializeUrl();
    $('.selectpicker').selectpicker();




});
function InitializeUrl() {
    //LoaderShow();
    var ApiFunc = '../Home/PageLoadData/';
    JsonPostMethod(ApiFunc, '', '', function (data) {
        if (data != null && data != '') {
            UserDetails = data;
            Api = UserDetails.Api;
            Token = UserDetails.Token;
            GetDropdownlistDetails();
            if (UserDetails.RoleId == 6) {
                if (UserDetails.AccessDetails.length > 0) {

                    $("#liProgressMonitor").hide();
                    $("#liProgressMonitorNew").hide();
                    $("#liProgressMonitorAll").hide();
                    $("#liQFLFeedback").hide()
                    $("#menuExtras").hide();
                    $("#limenuReports").hide();
                    //var GateAccessEnabled = UserDetails.AccessDetails.filter(function (x) { return x.AccessType != "page" });
                    var GateAccessEnabled = UserDetails.AccessDetails.filter(function (x) { return x.AccessName == "QFL Feedback" });
                    var ProgressMonitorEnabled = UserDetails.AccessDetails.filter(function (x) { return x.AccessName == "Progress Monitor" });
                    var QGateMasterEnabled = UserDetails.AccessDetails.filter(function (x) { return x.AccessName == "Master Access" });
                    var ReportAccess = UserDetails.AccessDetails.filter(function (x) { return x.AccessName == "Report Access" });
                    if (GateAccessEnabled.length > 0) {
                        $("#liQFLFeedback").show();
                    }
                    else {
                        $("#liQFLFeedback").hide()
                    }
                    if (ProgressMonitorEnabled.length > 0) {
                        $("#liProgressMonitor").show();
                        $("#liProgressMonitorNew").show();
                        $("#liProgressMonitorAll").show();
                    }
                    else {
                        $("#liProgressMonitor").hide()
                        $("#liProgressMonitorNew").hide();
                        $("#liProgressMonitorAll").hide();
                    }
                    if (QGateMasterEnabled.length > 0) {
                        $("#menuExtras").show();
                    }
                    else {
                        $("#menuExtras").hide()
                    }

                    if (ReportAccess.length > 0) {
                        $("#limenuReports").show();
                    }
                    else {
                        $("#limenuReports").hide()
                    }
                }
            }
            else {
                $("#liProgressMonitor").show();
                $("#liQFLFeedback").show()
                $("#menuExtras").show();
                $("#limenuReports").show();
            }
        }
        else {
            alert("Session Expired");
            window.location.href = "Login";
        }
    });
}
function GetDropdownlistDetails() {

    var json = {
        "userid": UserDetails.UserId,
        "roleid": UserDetails.RoleId
    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'QFL.svc/DropDownlistDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        $("#drpPlant").empty();
        drpPlant = data.Plant;
        var len = drpPlant.length;
        var optionhtml1 = '<option selected="selected"  value="0"> Select </option>';
        $("#drpPlant").append(optionhtml1);
        var optionhtml = "";

        $.each(drpPlant, function (i, item) {

            if (item.plantid == UserDetails.PlantId || len == 1) {
                optionhtml = '<option selected="selected"  value="' +
                    item.plantid + '">' + item.plantname + '</option>';
            }
            else {
                optionhtml = '<option value="' +
                    item.plantid + '">' + item.plantname + '</option>';
            }


            $("#drpPlant").append(optionhtml);
            $("#drpPlant").selectpicker('refresh');


        });


        if (len == 1) {
            $('#drpPlant').prop('disabled', true);
            var PlantId = $('#drpPlant').find(':selected').val();
            GetEmailNotificationDetails(PlantId)
            MaintainPlantId(PlantId);
            //GetUserDetails($('#drpPlant').find(':selected').val());
        }

        if (UserDetails.PlantId != 0) {
            GetEmailNotificationDetails(UserDetails.PlantId)
        }


        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());
            GetEmailNotificationDetails(PlantId)
            MaintainPlantId(PlantId);
        });

        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());

    });

  

}



function ReloadUserDetails(newlanguage) {
    UserDetails.Language = newlanguage;
}

function btnSaveEmailDetails() {
   
    if (IsManagerEdit == 1) {
        btnEditManagerSaveEmailDetails();
       

    }
    else if (IsUserEdit==1) {
        btnEditUserSaveEmailDetails();
    }


    else {
        btnSaveManagerAndUserEmailDetails();
    }
   
    
}

function ClickAddNew() {
    $(".label-info").text("");
    $('#txtmanagerval').tagsinput('removeAll');
    $('#txtuserval').tagsinput('removeAll');
    $("#managerValidation").hide();
    $("#userValidation").hide();

    $("#EmailModalLive").modal('show');

    $('#managertextboxhidden').show();
    $('#usertextboxhidden').show();

    IsManagerEdit = 0;
    IsUserEdit = 0;


}

$(document).ready(function () {

   
    
    $('#Dt_EmailNotification').on('click', 'tbody tr > td', function () {
        groupIdglp = "";


        var Class = $(this).attr("class") 
        var groupid = $(this).closest('tr').find('.groupid').text();
        groupIdglp = groupid;
        
        if (Class.includes("checkManager")) {
            BindingManagertextbox(groupid)
        }
        else if (Class.includes("checkUser")) {
            BindingUsertextbox(groupid);

        }

    });



    $('input#txtmanagerval').on("change keyup paste", function (evt) {
        $("#managerValidation").hide();

    });

    $('input#txtuserval').on("change keyup paste", function (evt) {
        $("#userValidation").hide();

    });






});


function GetEmailNotificationDetails(PlantId) {
    var json = {
        "Plantid": PlantId,


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetEmailNotificationDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        $('.dashboard-table').dataTable().fnDestroy();

        BindingEmailNotificationDetails(data, PlantId);

        var table = $('.dashboard-table').DataTable({
            
           // "aaSorting": [[0, "desc"]]
        });
        table.order([0, 'asc']).draw();
    });
}

var UserListglp;
var ManagerLstglp;
var groupidlstglp;
var groupIdglp;
var IsManagerEdit;
var IsUserEdit;

function BindingEmailNotificationDetails(data, PlantId) {

    $('#Dt_EmailNotification tbody').empty();
    groupIdglp = "";
    var content = [];
    var UserList = data.UserLst;
    var ManagerLst = data.ManagerLst;
    var groupidlst = data.groupidlst;

     UserListglp = data.UserLst;
     ManagerLstglp = data.ManagerLst;
     groupidlstglp = data.groupidlst;

    //$("#Dt_EmailNotification").empty();
    var tbody = '';
    var delManagerEmailId = "";
    $.each(groupidlst, function (key, value) {
        delManagerEmailId = "";
        var Manager = ManagerLst.filter(function (x) { return x.groupid == value.groupid; });
        var User = UserList.filter(function (x) { return x.groupid == value.groupid; });
        var Span = '';
        content.push('<tr>');

        content.push('<td style="display:none;" class="groupid">' + value.groupid + '</td>');

        content.push('<td class="checkManager">');

          
        $.each(Manager, function (key, value) {

            content.push('<span class="badge badge-primary ManagerVal">' + value.ManagerVal + '</span>')
            content.push('<span style="display:none;" class="badge badge-primary managerId">' + value.EmailManagerId + '</span>')
            if (delManagerEmailId == "") {
                delManagerEmailId = value.EmailManagerId;
            }
            else {
                delManagerEmailId = delManagerEmailId+","+ value.EmailManagerId;
            }

            });
        content.push('</td>');
        content.push('<td class="checkUser">');
        $.each(User, function (key, value) {
            content.push('<span class="badge badge-primary">' + value.UserVal + '</span>')
        });
        content.push('</td>');

        content.push('<td class="">');
        content.push('<i class="fa fa-trash deleteList" style="margin-left:20px;" onclick=deleteEmailNotifyDetails("'+delManagerEmailId+'")></i>');
        content.push('</tr>');


        content.push('</tr>');
            
    });
    console.log(content.join(''));
    $('#Dt_EmailNotification tbody').append(content.join(''));

}

function BindingManagertextbox(groupId) {

    //$("#EditEmailModalLive").modal('show');
    IsUserEdit = 0;
    $(".label-info").text("");
    $('#txtmanagerval').tagsinput('removeAll');
    $("#managerValidation").hide();
    $("#userValidation").hide();

    $('#managertextboxhidden').show();
    $('#usertextboxhidden').hide();

    $("#exampleModalLiveLabel").text("");
    $("#exampleModalLiveLabel").text('Edit Manager');


    $("#EmailModalLive").modal('show');

    //$('#bindingtextbox').empty();
    var contentManager="";

    var Manager = ManagerLstglp.filter(function (x) { return x.groupid == groupId; });
    groupIdglp = "";
    groupIdglp = groupId;

    $.each(Manager, function (key, value) {

        if (contentManager == "") {
            contentManager = value.ManagerVal;

        }
        else {
            contentManager = contentManager + "," + value.ManagerVal;
        }



        //content.push('<div>');
        //content.push('<input type="text" onkeyup="myOnChangeManager(' + value.EmailManagerId+')" class="validate[required] form-control mt-10" value="' + value.ManagerVal + '" id="txtmanagerval_' + value.EmailManagerId +'" />');
        //if (UserDetails.Language == "en") {
        //    content.push('<span style="color:red;display:none" id="EditmanagerValidation_' + value.EmailManagerId + '">Please Enter the value</span>');
        //}
        //else {
        //    content.push('<span style="color:red;display:none" id="EditmanagerValidation_' + value.EmailManagerId + '">値を入力してください</span>');

        //}
        //    content.push('</div>');
    });
    $("#txtmanagerval").tagsinput('add', contentManager);
    IsManagerEdit = 1;
  

   
   // $('#bindingtextbox').append(content.join(''));

}



function BindingUsertextbox(groupId) {

  //  $("#EditUserEmailModalLive").modal('show');

    $(".label-info").text("");
    $('#txtuserval').tagsinput('removeAll');
    $("#managerValidation").hide();
    $("#userValidation").hide();

    $('#managertextboxhidden').hide();
    $('#usertextboxhidden').show();

    $("#EmailModalLive").modal('show');

    $("#exampleModalLiveLabel").text("");
    $("#exampleModalLiveLabel").text('Edit User');

    //$('#bindingUsertextbox').empty();

     IsManagerEdit=0;
   
    var contentUser = "";
    groupIdglp = "";
    groupIdglp = groupId;

    var User = UserListglp.filter(function (x) { return x.groupid == groupId; });


    $.each(User, function (key, value) {

    
        
        if (contentUser == "") {
            contentUser = value.UserVal;

        }
        else {
            contentUser = contentUser+","+ value.UserVal;

        }
        //content.push('<div>');
        //content.push('<input type="text" onkeyup="myOnChangeUser(' + value.EmailUserId + ')"  class="validate[required] form-control mt-10" value="' + value.UserVal + '" id="txtuserval_' + value.EmailUserId + '" />');
        //if (UserDetails.Language == "en") {
        //    content.push('<span style="color:red;display:none" id="EditUserValidation_' + value.EmailUserId + '">Please Enter the value</span>');

        //}
        //else {
        //    content.push('<span style="color:red;display:none" id="EditUserValidation_' + value.EmailUserId + '">値を入力してください</span>');

        //}
        //content.push('</div>');
    });
    //$('#bindingUsertextbox').append(content.join(''));
    $("#txtuserval").tagsinput('add', contentUser);

    IsUserEdit = 1;
}



function btnEditManagerSaveEmailDetails() {


    var Mode = "";
    var txtmanagerval = $("#txtmanagerval").val().split(",");


   
     if (txtmanagerval == "") {
        $("#managerValidation").show();
        return false;

    }
    

    var Manager = [];
    var User = [];

    var Return = true;
    var ManagerReturn = true;

    $.each(txtmanagerval, function (i) {
        if (txtmanagerval[i].toLowerCase().indexOf("daimlertruck.com") === -1) {


            Return = false;
            ManagerReturn = false
            return false;

        }
        else {
            // Manager.push(txtmanagerval[i]);
            json = {
                "ManagerVal": txtmanagerval[i]
            };
            Manager.push(json);

        }
    });


   

     if (ManagerReturn == false) {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Only allowed daimler id in Manager details');
        }
        else {
            $('#hTitle3').text('マネージャーの詳細で許可されているダイムラーIDのみ');
        }
    }

   
    if (Return == false) {
        return Return;

    }




    var json = {
        "Mode": "U",
        "EmailManagerId": 0,
        'EmailUserId': 0,
        'userid': UserDetails.UserId,
        'plantid': UserDetails.PlantId,
        'ManagerLst': Manager,
        'UserLst': User,
        "Action":"Manager",
        "GroupId": parseInt(groupIdglp) 
    }; 


    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateEmailNotification';
    var Input = JSON.stringify(json);

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.Result == "Updated") {
            $("#DynamicAlertModal").modal('show');
            $("#EmailModalLive").modal('hide');
            GetEmailNotificationDetails(UserDetails.PlantId);
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Updated successfully..');
            }
            else {
                $('#hTitle3').text('更新成功..');
            }
        }
    });



}


function btnEditUserSaveEmailDetails() {

    var Mode = "";
    var txtuserval = $("#txtuserval").val().split(",");


     if (txtuserval == "") {
        $("#userValidation").show();
        return false;


    }

    var Manager = [];
    var User = [];

    var Return = true;
    var UserReturn = true;


    $.each(txtuserval, function (i) {

        if (txtuserval[i].toLowerCase().indexOf("daimler.com") === -1) {


            Return = false;
            UserReturn = false;
            return false;
        }
        else {

            json = {
                "UserVal": txtuserval[i]
            };
            User.push(json);


        }
    });



     if (UserReturn == false) {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Only allowed daimler id in User details');
        }
        else {
            $('#hTitle3').text('ユーザーの詳細で許可されているダイムラーIDのみ');
        }
    }

    if (Return == false) {
        return Return;

    }

    var json = {
        "Mode": "U",
        "EmailManagerId": 0,
        'EmailUserId': 0,
        'userid': UserDetails.UserId,
        'plantid': UserDetails.PlantId,
        'ManagerLst': Manager,
        'UserLst': User,
        "Action": "User",
        "GroupId": parseInt(groupIdglp) 
    };


    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateEmailNotification';
    var Input = JSON.stringify(json);

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.Result == "Updated") {
            $("#DynamicAlertModal").modal('show');
            $("#EmailModalLive").modal('hide');
            GetEmailNotificationDetails(UserDetails.PlantId);
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Updated successfully..');
            }
            else {
                $('#hTitle3').text('更新成功..');
            }
        }
    });



}

function myOnChangeManager(EmailManagerId) {
    var txtmanagervalidId = "EditmanagerValidation_" + EmailManagerId;
    $("#" + txtmanagervalidId).hide();
}

function myOnChangeUser(EmailUserId) {
    var txtUservalidId = "EditUserValidation_" + EmailUserId;
    $("#" + txtUservalidId).hide();
}

function btnSaveManagerAndUserEmailDetails() {
    var Mode = "";
    var txtmanagerval = $("#txtmanagerval").val().split(",");
    var txtuserval = $("#txtuserval").val().split(",");


    if (txtmanagerval == "" && txtuserval == "") {
        $("#managerValidation").show();
        $("#userValidation").show();
        return false;
    }
    else if (txtmanagerval == "") {
        $("#managerValidation").show();
        return false;

    }
    else if (txtuserval == "") {
        $("#userValidation").show();
        return false;


    }

    var Manager = [];
    var User = [];

    var Return = true;
    var ManagerReturn = true;
    var UserReturn = true;

    $.each(txtmanagerval, function (i) {
        if (txtmanagerval[i].toLowerCase().indexOf("daimler.com") === -1) {


            Return = false;
            ManagerReturn = false
            return false;

        }
        else {
            // Manager.push(txtmanagerval[i]);
            json = {
                "ManagerVal": txtmanagerval[i]
            };
            Manager.push(json);

        }
    });

    $.each(txtuserval, function (i) {

        if (txtuserval[i].toLowerCase().indexOf("daimler.com") === -1) {


            Return = false;
            UserReturn = false;
            return false;
        }
        else {

            json = {
                "UserVal": txtuserval[i]
            };
            User.push(json);


        }
    });

    if (ManagerReturn == false && UserReturn == false) {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Only allowed daimler id in Manager and User details');
        }
        else {
            $('#hTitle3').text('マネージャーとユーザーの詳細で許可されているダイムラーIDのみ');
        }
    }

    else if (ManagerReturn == false) {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Only allowed daimler id in Manager details');
        }
        else {
            $('#hTitle3').text('マネージャーの詳細で許可されているダイムラーIDのみ');
        }
    }

    else if (UserReturn == false) {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Only allowed daimler id in User details');
        }
        else {
            $('#hTitle3').text('ユーザーの詳細で許可されているダイムラーIDのみ');
        }
    }

    if (Return == false) {
        return Return;

    }

    var json = {
        "Mode": "I",
        "EmailManagerId": 0,
        'EmailUserId': 0,
        'userid': UserDetails.UserId,
        'plantid': UserDetails.PlantId,
        'ManagerLst': Manager,
        'UserLst': User,
        "Action": "",
        "GroupId": 0,
    };


    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateEmailNotification';
    var Input = JSON.stringify(json);

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.Result == "Inserted") {

            $('#txtmanagerval').tagsinput('removeAll');
            $('#txtuserval').tagsinput('removeAll');
            //$("#txtmanagerval").val("");
            //$("#txtuserval").val("");

            $("#DynamicAlertModal").modal('show');
            $("#EmailModalLive").modal('hide');
            GetEmailNotificationDetails(UserDetails.PlantId);
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Added details successfully..');
            }
            else {
                $('#hTitle3').text('詳細が正常に追加されました。');
            }
        }
    });


}

var GLBDelEmailManagerId = "";
function deleteEmailNotifyDetails(DelEmailManagerId) {
    GLBDelEmailManagerId = DelEmailManagerId;
    $("#Confirmationpopup").modal('show');
    if (UserDetails.Language == "en") {
        $('#ConfirmationMessage').text('Are you sure want to delete this Manager and User details !..');
    }
    else {
        $('#ConfirmationMessage').text('このマネージャーとユーザーの詳細を削除してもよろしいですか！..');
    }


  
}

function btnConfirmationEmailDelete() {
    var Manager;
    var User;

    var json = {
        "Mode": "D",
        "EmailManagerId": 0,
        'EmailUserId': 0,
        'userid': UserDetails.UserId,
        'plantid': UserDetails.PlantId,
        'ManagerLst': Manager,
        'UserLst': User,
        "Action": "Manager",
        "GroupId": parseInt(groupIdglp),
        "DelEmailManagerId": GLBDelEmailManagerId
    };


    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateEmailNotification';
    var Input = JSON.stringify(json);

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.Result == "Delete") {
            $("#DynamicAlertModal").modal('show');
            $("#Confirmationpopup").modal('hide');
            GetEmailNotificationDetails(UserDetails.PlantId);
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Deleted successfully..');
            }
            else {
                $('#hTitle3').text('正常に削除されました。');
            }
        }
    });
}