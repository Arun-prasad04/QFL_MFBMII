var filedata = [];
var filename = [];
var UserDetails;
var Api;
var Token;
var plantid;
var GetQgateMasterDetails;


var QGRework;
 $(document).ready(function () {


     //$("#liQGateMaster").addClass("active");
    InitializeUrl();

     $('.selectpicker').selectpicker();
     $('.glyphicon-ok').hide();
    $("#AddQualityGateForm").validationEngine('attach', {
        onValidationComplete: function (form, status) {
            var validationfield, validationsummary;
            validationsummary = validatefield($('#txtQGateName'));
            if (validationsummary) {
                if (Mode == "I" || Mode == "U")
                {
                    //showloader();
                    SaveQGateMaster();
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
function GetQGateDetails(PlantId) {
    var json = {
        "userid": UserDetails.UserId,
        "roleid": UserDetails.RoleId

    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetQGateMasterDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindingQGate(data, PlantId);
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
           
            GetQGateDetails(PlantId);
            MaintainPlantId(PlantId);
        }

        if (UserDetails.PlantId != 0) {
            GetQGateDetails(UserDetails.PlantId);
        }
   

        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());

            GetQGateDetails(PlantId);
            MaintainPlantId(PlantId);
            
        });

        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());
    });

   
}
var LId;
var QGId;
var Mode;
var QGRework;
function BindingQGate(data, PlantId) {

     GetQgateMasterDetails = data;

    if (data != null && data.lline.length > 0) {

        $("#dvQGate").empty();
        var content = [];

        var LineDdta = data.lline.filter(function (x) { return x.plantid == PlantId; });

        $.each(LineDdta, function (i, Litem) {
            content.push('<div class=\"col-md-4 col-lg-3 col-sm-6 lineGeneral\">');
            content.push('<div class=\"lineGeneralBox\" id=\"qgate\">');
            content.push('<div class=\"lineHeadTop\">');
            content.push('<div class=\"lineHeadLeft\" style=\"\">');
			content.push('<h3 class=\"lineHead\"><span class="trn">' + Litem.linename + '</span></h3>');
            content.push('</div>');
            content.push('<div class=\"lineHeadRight\" style=\"\">');
            content.push('<i class=\"fas fa-sort enable tooltip-QGList\"><span class=\"tooltiptext tooltip-top\">Enable Re-arrange</span></i>');
            content.push('<i id=\"' + Litem.lineid + '\" class=\"fas fa-plus-circle  tooltip-QGList\"   onClick=\"newQGate(' + Litem.lineid + ',this)\"><span class=\"tooltiptext tooltip-top\">Add QGate</span></i>');
            content.push('</div>');
            content.push('</div>');
            content.push('<div class=\"AutomatedQFLPage\">');
            content.push('<ul class=\"slides\" id=\"L_' + Litem.lineid + '\" style=\"\">');

            var QGData = $.grep(data.qgatedetails, function (element, index) {
                return element.lineid == Litem.lineid;
            });

            $.each(QGData, function (i, QGitem) {
                if (QGitem.qgatename == "Rework" || QGitem.qgatename == "Re-Examination" || QGitem.qgatename == "Seal" || QGitem.qgatename == "Re-Examination1" || QGitem.qgatename == "塗装 Re-Examination" || QGitem.qgatename == "塗装 Rework") {
                   
                    if (QGitem.qgatename == "Re-Examination") {
                        if ($('.Languagepicker').val() == "jp") {
                            content.push('<li class=\"slide tooltip-QGList Rework\" id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \" id=\"sp_' + QGitem.qgateid + '\">' + "QG 再検査" + '</span><span class="trn">' + "QG 再検査" + '</span><span style=\"float:right\">');
                        }
                        else {
                            content.push('<li class=\"slide tooltip-QGList Rework\" id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \" id=\"sp_' + QGitem.qgateid + '\">' + "QG " + QGitem.qgatename + '</span><span class="trn">' + "QG " + QGitem.qgatename + '</span><span style=\"float:right\">');
                        }
                    }


                    else if (QGitem.qgatename == "Re-Examination1") {
                        if ($('.Languagepicker').val() == "jp") {
                            content.push('<li class=\"slide tooltip-QGList Rework\" id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \" id=\"sp_' + QGitem.qgateid + '\">' + "完成 再検査" + '</span><span class="trn">' + "完成 再検査" + '</span><span style=\"float:right\">');
                        }
                        else {
                            content.push('<li class=\"slide tooltip-QGList Rework\" id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \" id=\"sp_' + QGitem.qgateid + '\">' + "完成 Re-Examination" + '</span><span class="trn">' + "完成 Re-Examination" + '</span><span style=\"float:right\">');
                        }
                    }

                    else {
                        if (QGitem.qgatename == "塗装 Re-Examination") {

                            if (QGitem.Active_InActive == true) {
                                var active = "red";
                                var Inactive = "";
                            }
                            else {
                                var Inactive = "red";
                                var active = "";
                            }
                            content.push('<li class=\"slide tooltip-QGList Rework\" id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \" id=\"sp_' + QGitem.qgateid + '\">' + QGitem.qgatename + '</span><span class="trn">' + QGitem.qgatename + '</span><span id="ReExamInActive_' + QGitem.qgateid + '" onclick=ReExamActiveInActive(' + QGitem.qgateid + ',"InActive") class="pointer"  style="float:right;color:' + Inactive + '">InActive</span> <span style="float:right">/</span> <span id="ReExamActive_' + QGitem.qgateid+'" onclick=ReExamActiveInActive(' + QGitem.qgateid + ',"Active")  class="pointer" style="float:right; color:' + active + ';">Active</span> <span style=\"float:right\">');

                        }
                        else {

                            content.push('<li class=\"slide tooltip-QGList Rework\" id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \" id=\"sp_' + QGitem.qgateid + '\">' + QGitem.qgatename + '</span><span class="trn">' + QGitem.qgatename + '</span> <span style=\"float:right\">');
                        }
                    }
                }
                else {

                    if (QGitem.Active_InActive == true) {
                        var active = "red";
                        var Inactive = "black";
                    }
                    else {
                        var Inactive = "red";
                        var active = "black";
                    }


                    content.push('<li  class=\"slide cursor-pointer tooltip-QGList NoRework\"  id=\"li_' + QGitem.qgateid + '\"><span class=\"tooltiptext tooltip-top \"  id=\"sp_' + QGitem.qgateid + '\">' + QGitem.qgatename + '</span><span class="trn">' + QGitem.qgatename + '</span><span style=\"float:right\">');
                }
                if (QGitem.qgatename != "Rework" && QGitem.qgatename != "Re-Examination" && QGitem.qgatename != "Seal" && QGitem.qgatename != "Re-Examination1" && QGitem.qgatename != "塗装 Re-Examination" && QGitem.qgatename != "塗装 Rework") {
                    var check = QGitem.rework == 1 ? "checked='checked'" : '';
                    content.push('<i class=\"fas fa-edit editList\" style=\"padding:3px;\"  onClick=\"editQGateMaster(' + QGitem.qgateid + ',' + QGitem.lineid + ',' + QGitem.ReExaminationGateId + ',this,\'' + QGitem.QgateColor +'\')\" ></i><i class=\"fa fa-trash deleteList\" style=\"padding:3px;\" onClick=\"deleteQGateMaster(' + QGitem.qgateid + ')\"></i>');
                    //if (UserDetails.RoleId == 1) {
                    //content.push('<span id="ReExamInActive_' + QGitem.qgateid + '" onclick=ReExamActiveInActive(' + QGitem.qgateid + ',"InActive","MainGate") class="pointer editList"  style="float:right;color:' + Inactive + '">Disable</span> <span style="float:right">/</span> <span id="ReExamActive_' + QGitem.qgateid + '" onclick=ReExamActiveInActive(' + QGitem.qgateid + ',"Active","MainGate")  class="pointer editList" style="float:right; color:' + active + ';">Enable</span>');
                    //}
                    //content.push('<label class="container-checkbox"><input type="checkbox"' + check + ' onClick=\"AddRework(' + QGitem.qgateid + ',this,' + QGitem.lineid + ')\"><span class="checkmark"></span></label><i class=\"fas fa-edit editList\" style=\"padding:3px;\"  onClick=\"editQGateMaster(' + QGitem.qgateid + ',' + QGitem.lineid + ',this)\" ></i><i class=\"fa fa-trash deleteList\" style=\"padding:3px;\" onClick=\"deleteQGateMaster(' + QGitem.qgateid + ')\"></i>');
                }
                content.push('</span></li>');
            });

            content.push('</ul>');
            content.push('</div>');
            content.push('</div>');
            content.push('</div>')
        });

        $("#dvQGate").append(content.join(''));
        enableDisable();

        Conversion($('.Languagepicker').val());

       ///// For ToolTip 

        $(".AutomatedQFLPage").mCustomScrollbar({
            axis: "y", theme: "minimal-dark"
        });
        
       


    }
}

function newQGate(LineId) {
    LId = LineId;
    Mode = "I";
    $("#txtQGateName").val('');

    $('#txtQGateName').removeClass("error");
   // $('#txtQGateName').css('border', '1px solid #ccc ');
    if (UserDetails.Language == "jp") {
        $("#btnSubmit").val("保存する");
    }
    else {
        $("#btnSubmit").val("Save");

    }
    $("#addListQGate").modal('show');
}
function editQGateMaster(QGateId, LineId, ReExaminationGateId,element,QgateColor) {
    $('#txtQGateName').removeClass("error");
    $('#txtQGateName').css('border', '1px solid #ccc');
    var check = $(element).closest('span').find('input[type = checkbox]')[0];
    if (check) {
        if (check.checked) {
            QGRework = 1;
        } else {
            QGRework = 0;
        }
    }
    LId = LineId;
    QGId = QGateId;
    Mode = "U";


    $("input[name=ReExam]").val([ReExaminationGateId]);
    $("input[name=bgColor]").val([QgateColor]);

    $("#txtQGateName").val($("#sp_" + QGateId).text());
    if (UserDetails.Language == "jp") {
        $("#btnSubmit").val("更新");
    }
    else {
        $("#btnSubmit").val("Update");
    }
    $("#addListQGate").modal('show');
}
function deleteQGateMaster(QGateId) {

    $("#Confirmationpopup").modal('show');
    if (UserDetails.Language == "en") {
        $('#ConfirmationMessage').text('Are you sure? Want to delete this Q-Gate? If you delete this Q-Gate all related checklist and information will be lost.The same Q-Gate will be deleted from Concern Resolution Portal also');
    }
    else {
        $('#ConfirmationMessage').text('本気ですか？このQ-Gateを削除しますか？このQ-Gateを削除すると、関連するすべてのチェックリストと情報が失われます。同じQ-Gateが問題解決ポータルからも削除されます。');
    }
    getQGateId = QGateId;
}

function AfterPopUpConfirmation() {
    Mode = "D";
    QGId = getQGateId;
    SaveQGateMaster();
}

function SaveQGateMaster() {


    var dataObject = JSON.stringify({
        "mode": Mode,
        "qgateid": QGId,
        'qgatename': $.trim($("#txtQGateName").val()),
        'lineid': LId,
        'userid': UserDetails.UserId,
        'rework': QGRework,
        "ReExaminationGateId": $('input[name="ReExam"]:checked').val(),
        "QgateColor": $('input[name="bgColor"]:checked').val(),
    });

    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateQGateMaster';

    var Input = dataObject;
   
    PostMethod(ApiFunc, Input, Token, function (data) {
        $("#addListQGate").modal('hide');
        var En_Message='';
        var Jp_Message='';
        var isValid;
        //hideloader();

        if (data.qgateinsertstatus == "Inserted")
        {
            En_Message = 'Q-Gate created successfully';
            Jp_Message = 'Q-Gateが正常に作成されました';
            isValid = true;
        }
        else if (data.qgateinsertstatus == "Updated")
        {
            En_Message = 'Q-Gate updated successfully';
            Jp_Message = 'Q-Gateが正常に更新されました';
            isValid = true;
        }
        else if (data.qgateinsertstatus == "Deleted")
        {
            En_Message = 'Q-Gate deleted successfully';
            Jp_Message = 'Q-Gateが正常に削除されました';
            isValid = true;

            $("#Confirmationpopup").modal('hide');
        }
        else if (data.qgateinsertstatus == "Exists")
        {
            En_Message = 'Q-Gate exists already with same name. Please use different name.';
            Jp_Message = 'Q-Gateはすでに同じ名前で存在しています。別の名前を使用してください';
            isValid = false;
        }
        else if (data.qgateinsertstatus == "Error")
        {
            if (Mode = "U") {
                En_Message = 'QGate Update Failed, try again later!..'
                Jp_Message = 'QGateの更新に失敗しました。もう一度お試しください。!';
                isValid = false;
            }
            else if (Mode = "D") {
                En_Message = 'Delete QGate Failed, try again later!..';
                Jp_Message = 'QGateの削除に失敗しました後でもう一度やり直してください。!';
                isValid = false;
                $("#Confirmationpopup").modal('hide');
            }
            else {
                En_Message = 'QGate Insert Failed, try again later!..';
                Jp_Message = 'QGateの挿入に失敗しました。もう一度やり直してください!';
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
                GetQGateDetails(UserDetails.PlantId);
            }
        }

    });
}


function enableDisable()
{
    var enableaAncestor;
    var listAncestor;
    $(".lineGeneral ul li.NoRework").on("click", function (e) {

        
        if (e.target.innerHTML != "" && e.target.innerHTML != "Enable" && e.target.innerHTML != "Disable") {
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
        var QGateId = $($('#' + ulId + ' li')[i]).attr('id').split('_')[1];
        json = {
            "orderno": order,
            "qgateid": QGateId

        };
        Lst.push(json);
    }

    var json = {
        "order": Lst


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/ReOrderByQgateMaster';

    PostMethod(ApiFunc, Input, Token, function (data) {
        $('#hTitle3').empty();
        $('#DynamicAlertModal').modal('show');
        $('#hTitle3').append('<span class="trn">Q-Gate updated successfully</span>');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Q-Gate updated successfully');
        }
        else {
            $('#hTitle3').text('Q-Gateが正常に更新されました');
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


function AddRework(QGateId, element, LineId) {
    LId = LineId;
    if (element.checked) {
        QGRework = 1;
    } else {
        QGRework = 0;
    }
    QGId = QGateId;

    Mode = "U";
    var dataObject = JSON.stringify({
        "mode": Mode,
        "qgateid": QGId,
        'qgatename': $("#sp_" + QGateId).text(),
        'lineid': LId,
        'userid': UserDetails.UserId,
        'rework': QGRework
    });

    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateQGateMaster';

    var Input = dataObject;

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.qgateinsertstatus == "Updated") {
            $('#DynamicAlertModal').modal('show');

            if (UserDetails.Language == "en") {
                if (QGRework == 1)
                    $('#hTitle3').text('Rework Enabled For This QGate!..');
                else
                    $('#hTitle3').text('Rework Disabled For This QGate!..');
            }
            else {
                if (QGRework == 1)
                    $('#hTitle3').text('このQGateに対してリワークが有効!..');
                else
                    $('#hTitle3').text('このQGateではリワークは無効 !..');
            }
            //GetQGateDetails();
        }

    });

}


function PostGate(qgateid, gatename) {

    

    var QGData = $.grep(GetQgateMasterDetails.qgatedetails, function (element, index) {
        return element.qgateid == qgateid;
    });
    var Lineid = QGData[0].lineid;
    var ReExaminationGateId = QGData[0].ReExaminationGateId;
    var Line = $.grep(GetQgateMasterDetails.lline, function (element, index) {
        return element.lineid == Lineid;
    });
   

    
    var Linename = Line[0].linename;
      

    $('#hdngateid').val(qgateid);
    $('#hdngatename').val(gatename);
    showloader();
    window.location.href = "../Home/CheckListMaster?qgateid=" + qgateid + "&gatename=" + gatename + "&Lineid=" + Lineid + "&Linename=" + Linename + "&ReExaminationGateId=" + ReExaminationGateId
   
    //$("#frmpostchecklist").submit();
}



function ReExamActiveInActive(QGateId, Status, Gate) {


    if (Gate == "MainGate") {

        $("#Confirmationpopup2").modal('show');
        if (Status == "Active") {
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage2').text('Are you sure want to Enable this Q-Gate? ');
            }
            else {
                $('#ConfirmationMessage2').text('このQ-Gateを有効にしてよろしいですか？');
            }
            Active_InActive = 1;
        }
        else {
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage2').text('Are you sure want to Disable this Q-Gate? ');
            }
            else {
                $('#ConfirmationMessage2').text('このQ-Gateを無効にしてよろしいですか？');
            }
            Active_InActive = 0;

        }


    }

    else {

    
    $("#Confirmationpopup1").modal('show');
    if (Status == "Active") {
        if (UserDetails.Language == "en") {
            $('#ConfirmationMessage1').text('Are you sure want to Active this Q-Gate? ');
        }
        else {
            $('#ConfirmationMessage1').text('このQ-Gateをアクティブにしてよろしいですか？');
        }
        Active_InActive = 1;
    }
    else {
        if (UserDetails.Language == "en") {
            $('#ConfirmationMessage1').text('Are you sure want to InActive this Q-Gate? ');
        }
        else {
            $('#ConfirmationMessage1').text('このf-catを接続してもよろしいですか？');
        }
        Active_InActive = 0;

    }

    }
    
   
    getQGateId = QGateId;
}
var Active_InActive = 0;
function PaintReExamActiveInActiveOnClick() {
    var dataObject = JSON.stringify({

        "userid": UserDetails.UserId,
        'qgateid': getQGateId,
        'Active_InActive': Active_InActive,
    });
    var ApiFunc = Api + 'Master.svc/' + 'DeleteActiveInActvieForPaintReExam';


    var Input = dataObject;
    PostMethod(ApiFunc, Input, Token, function (data) {

        if (data == "Deleted") {
            $("#Confirmationpopup1").modal('hide');

            if (Active_InActive == 1) {
                $("#ReExamActive_" + getQGateId).css("color", "red");
                $("#ReExamInActive_" + getQGateId).css("color", "black");
            }
            else {
                $("#ReExamInActive_" + getQGateId).css("color", "red");
                $("#ReExamActive_" + getQGateId).css("color", "black");
            }
        }


    });

}


function ReExamActiveInActiveOnClickMainGate() {
    var dataObject = JSON.stringify({

        "userid": UserDetails.UserId,
        'qgateid': getQGateId,
        'Active_InActive': Active_InActive,
    });
    var ApiFunc = Api + 'Master.svc/' + 'DeleteActiveInActvieForMainGate';


    var Input = dataObject;
    PostMethod(ApiFunc, Input, Token, function (data) {

        if (data == "Updated") {
            $("#Confirmationpopup2").modal('hide');

            if (Active_InActive == 1) {
                $("#ReExamActive_" + getQGateId).css("color", "red");
                $("#ReExamInActive_" + getQGateId).css("color", "black");
            }
            else {
                $("#ReExamInActive_" + getQGateId).css("color", "red");
                $("#ReExamActive_" + getQGateId).css("color", "black");
            }
        }


    });

}



