var UserDetails;
var Api;
var Token;
var plantid;
var GetNewProgressColumnId;



 $(document).ready(function () {


    InitializeUrl();

     $('.selectpicker').selectpicker();
     $('.glyphicon-ok').hide();
     $("#AddNewProgressForm").validationEngine('attach', {
        onValidationComplete: function (form, status) {
            var validationfield, validationsummary;
            validationsummary = validatefield($('#txtNewProgressDynamic'));
            if (validationsummary) {
                if (Mode == "I" || Mode == "U")
                {
                    //showloader();
                    SaveNewProgressDynamicColumn();
                }
                                                                                      
            }
            else {
               
                return false;
            }
        },
        'showPrompts': false

    });

    $("#btnSearch").click(function () {
        AfterPopUpConfirmation();
    })

    $("#btnCancelSearch").click(function () {
        $("#Confirmationpopup").modal('hide');
    })



});



function ReloadUserDetails(newlanguage) {
    UserDetails.Language = newlanguage;
}
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
                   // var GateAccessEnabled = UserDetails.AccessDetails.filter(function (x) { return x.AccessType != "page" });
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
function GetNewProgressDynmamicColumnDetails(PlantId) {
    var json = {
        "plantid": PlantId,
     

    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetDynamicColumnList';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindingNewProgress(data, PlantId);
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
       var  optionhtml1 = '<option selected="selected"  value="0"> Select </option>';
         $("#drpPlant").append(optionhtml1);
        var optionhtml = "";
      
        $.each(drpPlant, function (i, item) {
          
            if (item.plantid == UserDetails.PlantId || len==1) {
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
           
            GetNewProgressDynmamicColumnDetails(PlantId);
            MaintainPlantId(PlantId);
        }

        if (UserDetails.PlantId != 0) {
            GetNewProgressDynmamicColumnDetails(UserDetails.PlantId);
        }
   

        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());

            GetNewProgressDynmamicColumnDetails(PlantId);
            MaintainPlantId(PlantId);
            
        });

        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());
    });

   
}
var LId;
var QGId;
var Mode;
function BindingNewProgress(data, PlantId) {


    $("#dvNewProgressBinding").empty();
    var content = [];

    content.push('<div class=\"col-md-4 col-lg-3 col-sm-6 lineGeneral\">');
    content.push('<div class=\"lineGeneralBox\" id=\"qgate\">');
    content.push('<div class=\"lineHeadTop\">');
    content.push('<div class=\"lineHeadLeft\" style=\"\">');
    content.push('<h3 class=\"lineHead\"><span class="trn"></span></h3>');
    content.push('</div>');
    content.push('<div class=\"lineHeadRight\" style=\"\">');
    content.push('<i class=\"fas fa-sort enable tooltip-QGList\"><span class=\"tooltiptext tooltip-top\">Enable Re-arrange</span></i>');
    content.push('<i id=\"\" class=\"fas fa-plus-circle  tooltip-QGList\"   onClick=\"AddNewDynamicColumn(this)\"><span class=\"tooltiptext tooltip-top\">Add New</span></i>');
    content.push('</div>');
    content.push('</div>');
    content.push('<div class=\"AutomatedQFLPage\">');
    content.push('<ul class=\"slides\" id=\"L_1'  + '\" style=\"\">');


    if (data != null && data.GetNewProgressDynmamicColumnList.length > 0) {

      
        $.each(data.GetNewProgressDynmamicColumnList, function (i, NewProgress) {
            content.push('<li  class=\"slide cursor-pointer tooltip-QGList NoRework\"  id=\"li_' + NewProgress.NewProgressColumnId + '\"><span class=\"tooltiptext tooltip-top \"  id=\"sp_' + NewProgress.NewProgressColumnId + '\">' + NewProgress.DynamicColumnName + '</span><span class="trn">' + NewProgress.DynamicColumnName + '</span><span style=\"float:right\">');

            content.push('<i class=\"fas fa-edit editList\" style=\"padding:3px;\"  onClick=\"EditNewProgress(' + NewProgress.NewProgressColumnId + ',this)\" ></i><i class=\"fa fa-trash deleteList\" style=\"padding:3px;\" onClick=\"DeleteNewProgress(' + NewProgress.NewProgressColumnId + ')\"></i>');

            content.push('</span></li>');
        });
    }

            content.push('</ul>');
            content.push('</div>');
            content.push('</div>');
            content.push('</div>')
       

        $("#dvNewProgressBinding").append(content.join(''));
        enableDisable();

        Conversion($('.Languagepicker').val());

       ///// For ToolTip 

        $(".AutomatedQFLPage").mCustomScrollbar({
            axis: "y", theme: "minimal-dark"
        });
        
       


   
}

function AddNewDynamicColumn() {
    Mode = "I";
    $("#txtNewProgressDynamic").val('');

    $('#txtNewProgressDynamic').removeClass("error");
   // $('#txtQGateName').css('border', '1px solid #ccc ');
    if (UserDetails.Language == "jp") {
        $("#btnSubmit").val("保存する");
    }
    else {
        $("#btnSubmit").val("Save");

    }
    
    $("#Dynamictitle").text('Add New');
    $("#addListNewProgressPopup").modal('show');
}
function EditNewProgress(NewProgressColumnId, element) {
    $('#txtNewProgressDynamic').removeClass("error");
    $('#txtNewProgressDynamic').css('border', '1px solid #ccc');
  
    QGId = NewProgressColumnId;
    Mode = "U";

    $("#txtNewProgressDynamic").val($("#sp_" + NewProgressColumnId).text());
    if (UserDetails.Language == "jp") {
        $("#btnSubmit").val("更新");
    }
    else {
        $("#btnSubmit").val("Update");
    }
    $("#Dynamictitle").text('Edit');

    $("#addListNewProgressPopup").modal('show');
}
function DeleteNewProgress(NewProgressColumnId) {
    $("#Dynamictitle").text('Delete');

    $("#Confirmationpopup").modal('show');
    if (UserDetails.Language == "en") {
        $('#ConfirmationMessage').text('Are you sure? Want to delete this Column? If you delete this Column all related  information will be lost.');
    }
    else {
        $('#ConfirmationMessage').text('本気ですか？ この列を削除しますか？ この列を削除すると、関連するすべての情報が失われます。');
    }
    GetNewProgressColumnId = NewProgressColumnId;
}

function AfterPopUpConfirmation() {
    Mode = "D";
    QGId = GetNewProgressColumnId;
    SaveNewProgressDynamicColumn();
}

function SaveNewProgressDynamicColumn() {



    var dataObject = JSON.stringify({
        "mode": Mode,
        "NewProgressColumnId": QGId,
        'DynamicColumnName': $.trim($("#txtNewProgressDynamic").val()),
        'userid': UserDetails.UserId,
        'plantid':UserDetails.PlantId
    });

    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateNewProgressColumn';

    var Input = dataObject;
   
    PostMethod(ApiFunc, Input, Token, function (data) {
        $("#addListNewProgressPopup").modal('hide');
        var En_Message='';
        var Jp_Message='';
        var isValid;
        //hideloader();

        if (data.Columninsertstatus == "Inserted")
        {
            En_Message = 'Column created successfully';
            Jp_Message = 'Columnが正常に作成されました';
            isValid = true;
        }
        else if (data.Columninsertstatus == "Updated")
        {
            En_Message = 'Column updated successfully';
            Jp_Message = 'Columnが正常に更新されました';
            isValid = true;
        }
        else if (data.Columninsertstatus == "Deleted")
        {
            En_Message = 'Column deleted successfully';
            Jp_Message = 'Columnが正常に削除されました';
            isValid = true;

            $("#Confirmationpopup").modal('hide');
        }
        else if (data.Columninsertstatus == "Exists")
        {
            En_Message = 'This Column exists already with same name. Please use different name.';
            Jp_Message = 'Column はすでに同じ名前で存在しています。別の名前を使用してください';
            isValid = false;
        }
        else if (data.Columninsertstatus == "Error")
        {
            if (Mode = "U") {
                En_Message = 'Column Update Failed, try again later!..'
                Jp_Message = 'Columnの更新に失敗しました。もう一度お試しください。!';
                isValid = false;
            }
            else if (Mode = "D") {
                En_Message = 'Delete this Column Failed, try again later!..';
                Jp_Message = 'Columnの削除に失敗しました後でもう一度やり直してください。!';
                isValid = false;
                $("#Confirmationpopup").modal('hide');
            }
            else {
                En_Message = 'Column Insert Failed, try again later!..';
                Jp_Message = 'Columnの挿入に失敗しました。もう一度やり直してください!';
                isValid = false;
            }
        }        

        if (UserDetails.Language == "en") {
            $('#hTitle3').text(En_Message);
        }
        else {
            $('#hTitle3').text(Jp_Message);
        }
        $('#DynamicAlertModal').modal('show');
        if (isValid) {            
            if (UserDetails.PlantId != "") {
                GetNewProgressDynmamicColumnDetails(UserDetails.PlantId);
            }
        }

    });
}


function enableDisable()
{
    var enableaAncestor;
    var listAncestor;
    $(".lineGeneral ul li.NoRework").on("click", function (e) {

        
        if (e.target.innerHTML != "") {
            var iid = (this.id).toString().replace('li_', 'sp_');
            PostGate((this.id).toString().replace('li_', ''), $('#' + iid).text());
        }
        
        else {
            return false;
        }
    });
  

    $(".disable").hide();
    $(".enable, .disable").off("click");
    $(".enable, .disable").on("click", function () {
      
    
        enableaAncestor = $(this).parent().parent().parent().attr('id');
        var curClass = $(this).attr('class');
        var ulClass = $(this).parent().parent().parent().find("ul").attr("id");
        //        if (curClass == "fas fa-key enable tooltip-QGList" || curClass == "tooltip-QGList fas fa-key enable") {
        if (curClass.indexOf('enable') > -1) {
            $(this).removeClass("fas fa-sort enable");
            $(this).addClass("fas fa-save disable");
            $("i.disable span").text("save");
            dragDropList(ulClass);
            //            $(".lineGeneral ul li").off("click");

            //$("#" + ulClass + " li").off("click");
            $(".lineGeneral ul li.NoRework").off("click");



        }
        else {
         
            $(this).removeClass("fas fa-save disable");
            $(this).addClass("fas fa-sort enable");
            $("i.enable span").text("Enable Re-arrange");
            $("#" + ulClass).sortable("destroy");
            UpdateOrder(ulClass)


            $("#" + ulClass + " li").on("click", function () {
                var iid = (this.id).toString().replace('li_', 'sp_');
                PostGate((this.id).toString().replace('li_', ''), $('#' + iid).text());
            });

            $("#" + ulClass + " .deleteList").off("click");
            $("#" + ulClass + " .editList").off("click");
        }


    });
}


function UpdateOrder(ulId)
{
    var Lst = [];

    for (var i = 0; i < $('#' + ulId + ' li').length; i++) {
        var order = i + 1;
        var NewProgressColumnId = $($('#' + ulId + ' li')[i]).attr('id').split('_')[1];
        json = {
            "orderno": order,
            "NewProgressColumnId": NewProgressColumnId

        };
        Lst.push(json);
    }

    var json = {
        "order": Lst


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/ReOrderByNewProgress';

    PostMethod(ApiFunc, Input, Token, function (data) {
        $('#hTitle3').empty();
        $('#DynamicAlertModal').modal('show');
        $('#hTitle3').append('<span class="trn">Updated successfully</span>');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Updated successfully');
        }
        else {
            $('#hTitle3').text('が正常に更新されました');
        }
    });
}


function dragDropList(ulClass)
{

    //$(".slides").sortable({
    $("#" + ulClass).sortable({
        placeholder: 'slide-placeholder',
        axis: "y",
        revert: 150,
        items: '> li:not(.Rework)',
        start: function (e, ui) {

            placeholderHeight = ui.item.outerHeight();
            ui.placeholder.height(placeholderHeight + 15);
            $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);

        },
        change: function (event, ui) {

            var liId = ui.helper[0].id;
            //var ulId = $("#" + liId).parent().attr('id');


            ui.placeholder.stop().height(0).animate({
                height: ui.item.outerHeight() + 15
            }, 300);

            placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));

            $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
                height: 0
            }, 300, function () {
                $(this).remove();
                placeholderHeight = ui.item.outerHeight();
                $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);

            });


        },
        stop: function (e, ui) {
            $(".slide-placeholder-animator").remove();
        }


    });

}

function movedtoFile() {
    var json = {

        "Vinnumber": "00003",
        "ModelName": "BE637GLMSHGP",
        "Filename": "UploadNotOkImg_00003_37_69_4_8_2022_42436_PM.png"

    };
    var Input = JSON.stringify(json);

    var ApiFunc = '../Home/MovedToFolder/';
    JsonPostMethod(ApiFunc, Input, '', function (data) {
    })
}
