$(document).ready(function () {

    InitializeUrl();
    $('.selectpicker').selectpicker();

    $("#AddEditPaintForm").validationEngine('attach', {
        onValidationComplete: function (form, status) {
            var validationfield, validationsummary;
            validationsummary = validatefield($('#txtPaintingValues'));
            if (validationsummary) {
                 
                   // SaveQGateMaster();
                
                SavePaintingMasterValues();
            }
            else {

                return false;
            }
        },
        'showPrompts': false

    });


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
            BindingLineAPI(PlantId);

            MaintainPlantId(PlantId);
            //GetUserDetails($('#drpPlant').find(':selected').val());
        }

        if (UserDetails.PlantId != 0) {
            BindingLineAPI(UserDetails.PlantId);
        }


        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());
            BindingLineAPI(PlantId);

            MaintainPlantId(PlantId);
        });

        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());

    });

  

}



function ReloadUserDetails(newlanguage) {
    UserDetails.Language = newlanguage;
}


function BindingLineTables(data) {

    var GetPaintingMasterDetailsList = data.GetPaintingMasterDetailsList;
    var GetLineList = data.GetLineList;
    var GetPaintingMasterDetails = "";
    $("#LineTables").empty();
    var loopcount
    var LineName = "";

    $.each(GetLineList, function (i, item) {
        var content = [];

        LineName = item.LineName.split(" ").join("");

        GetPaintingMasterDetails = $.grep(GetPaintingMasterDetailsList, function (element, index) {
            return element.LineId == item.LineId;
        });

        content.push('<div class="panel-heading" style="border-radius: 5px 5px 0px 0px">')
        content.push('<h4 class="panel-title">' + item.LineName+'</h4>')
        content.push('</div>')

        content.push('<table class="table table-bordered" id="' + LineName + 'table">')
        content.push('<thead>')

        
        $.each(GetPaintingMasterDetails, function (i, item) {





                if (item.OrderNo == 1 || item.OrderNo == 7) {
                    content.push('<tr class="tblheadtext">');
                }

              
            content.push('<th style="text-align: center; width: 15%;" onclick=OnLineClickEvent(' + item.OrderNo + ',' + item.PaintingMasterId + ',' + item.LineId + ',"' + LineName + '","' + encodeURI(item.PaintingValues)+'")>');
            content.push('<span>' + item.PaintingValues + '</span>');
                content.push('<img src="' + UserDetails.PaintingImagePath + '/' + item.PaintingFileName + '" class="PaintImage" />');
                content.push('</th>')

                if (item.OrderNo == 6 || item.OrderNo == 12) {
                    content.push('</tr>');

                }
            
        });

        content.push('</thead>')
        content.push('</table>')
       
        $("#LineTables").append(content.join(''));

      

    });

  
   
}

function BindingLineAPI(PlantId) {
    var json = {
        "Plantid": PlantId,


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetPaintingMasterDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {

      
            BindingLineTables(data);

      
    });
}
var GLBOrderNo;
var GLBPaintingMasterId;
var GLBLineId;
var GLBLineName;
var GLBPaintingValues;

function OnLineClickEvent(OrderNo, PaintingMasterId, LineId, LineName, PaintingValues) {
    var PaintingValue = decodeURI(PaintingValues);
    $('#txtPaintingValues').val("");
    GLBOrderNo = OrderNo;
    GLBPaintingMasterId = PaintingMasterId;
    GLBLineId = LineId;
    GLBLineName = LineName;
    GLBPaintingValues = PaintingValue;
    if (PaintingValue == "") {

        if (UserDetails.Language == "en") {
            $("#Paintingtitle").text("Add New")
        }
        else {
            $("#Paintingtitle").text("新しく追加する")
        }
      
    }
    else {
        
        $('#txtPaintingValues').val(PaintingValue);
        if (UserDetails.Language == "en") {
            $("#Paintingtitle").text("Edit")
        }
        else {
            $("#Paintingtitle").text("編集")
        }


        

    }
    
    $("#AddEditPaintFormModal").modal('show');
}

function SavePaintingMasterValues() {

    var PaintingValues = $('#txtPaintingValues').val();
    var json = {
        "OrderNo": GLBOrderNo,
        "PaintingMasterId": GLBPaintingMasterId,
        'LineId': GLBLineId,
        'LineName': GLBLineName,
        'PaintingValues': PaintingValues,
        'userid': UserDetails.UserId,
        'plantid': UserDetails.PlantId,
    };


    var ApiFunc = Api + 'Master.svc/' + 'InsertUpdatePaintingMaster';
    var Input = JSON.stringify(json);

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.Result == "Updated") {

            $("#DynamicAlertModal").modal('show');
            $("#AddEditPaintFormModal").modal('hide');
            BindingLineAPI(UserDetails.PlantId);
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Updated successfully..');
            }
            else {
                $('#hTitle3').text('更新成功..');
            }
        }
    });
}
