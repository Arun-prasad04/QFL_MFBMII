var UserDetails;
var Api;
var Token;
var Mode;
var DefectPlaceID;

//InsertDefectPlaceMaster
$(document).ready(function ()
{

    $("#liProgressMonitor").hide();
    $("#liQFLFeedback").hide()
    $("#menuExtras").hide();
    $("#limenuReports").hide();

    $("input").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length)
            e.preventDefault();
    });
    InitializeUrl();

    $('#DefectMaster').validationEngine('attach',{
        onValidationComplete: function (form, status) {
            var validationsummary, Validationspace;
            validationsummary = validatefield($('#txtDefectplacname'));
            Validationspace = validatespaceValue($('#txtDefectplacname'));

            validationsummary = (Validationspace == false ? Validationspace : validationsummary);
           // alert($('#txtDefectplacname').val())
           
            if (validationsummary)
            {
                //var Validationspace;
                
                if (Validationspace)
                {
                    GetTextBoxValueOne();
                }
                   
                

            }
            else {

                return false;
            }
        },

        'showPrompts': false


    })
    //$('#DefectMaster').validationEngine('attach', {
    //    onValidationComplete: function (form, status) {
    //        alert(status);
           
    //        validationsummary = validatefield($('#txtDefectplacname'));
            
    //        if (validationsummary)
    //        {
    //            FileUpload(filedata, name, filesize);

    //        }
    //        else {

    //            return false;
    //        }
    //    },

    //    'showPrompts': false


    //})
    $("#btnSearch").click(function () {
        AfterPopUpConfirmation();
    })

    $("#btnCancelSearch").click(function () {
        $("#Confirmationpopup").modal('hide');
    })
    
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
            MaintainPlantId(PlantId)

        }
        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());
            MaintainPlantId(PlantId)
            if ($('#drpPlant').find(':selected').val() != 0) {

                GetDefectMaster(PlantId,0);
            }



        });
        if ($('#drpPlant').find(':selected').val() != 0) {

            GetDefectMaster($('#drpPlant').find(':selected').val(),0);
        }
        if (UserDetails.Language == "") { $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val()); }
        else {
            $('.Languagepicker').selectpicker('val', UserDetails.Language);
            Conversion($('.Languagepicker').val());
        }


    });
}
function GetDefectMaster(PlantId,defectplaceid) {

    var json = {
        "plantid": PlantId,
        "defectplaceid": defectplaceid,
        "type":'Master'
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetDefectPlaceMaster';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindingData(data);
    });


}
function BindingData(data) {
    $("#DefectPlacemaster").empty();
    var content = [];
    var Defectmasterdetails = data.defectplacemasterlist;
    //content.push(' <div class="col-md-3"></div>');
    content.push(' <div class="col-md-3"></div>');
    content.push('<div class\="col-md-6\">');
    content.push('<table class=\"table table-bordered text-center\">');

    $.each(Defectmasterdetails, function (i, DefectMaster) {
        //var createdby = StandMaster.ModifiedBy == 0 ? StandMaster.createdby : StandMaster.ModifiedBy;
        //var Createddate = StandMaster.ModifiedDate == "" ? StandMaster.CreatedDate : StandMaster.ModifiedDate;
        content.push('<tr>');
        var Sno = i + 1;
        content.push('<td width="35%">' + Sno + '</td>');
        content.push('<td width="35%">' + DefectMaster.defectplacename + '</td>');
        content.push('<td width="30%">');
        content.push('<i class="fa fa-pencil-alt icondownload" aria-hidden="true" title="" data-toggle="modal"  onClick ="EditDefectmaster(\'' + DefectMaster.defectplaceid + '\',\'' + DefectMaster.defectplacename + '\')"></i>');
        content.push('<i class="fa fa-trash icondelete" aria-hidden="true" title="" data-toggle="modal" data-target="#delete"  onClick ="DeleteDefectmaster(\'' + DefectMaster.defectplaceid + '\')"></i>');
        content.push('</td>');
        content.push('</tr>');

    });

    content.push('</tbody>');
    content.push('</table>');
    content.push('</div>');
    //content.push('</div>');

    $("#DefectPlacemaster").append(content.join(''));

    if (UserDetails.Language == "") { $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val()); }
    else {
        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());
    }


}

function AfterPopUpConfirmation()
{
    var json = {
        "defectplaceid": DefectPlaceID,
        "createdby": UserDetails.UserId,
        "mode": Mode
        }
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/InsertDefectPlaceMaster';
    PostMethod(ApiFunc, Input, Token, function (data)
    {
        GetDefectMaster($('#drpPlant').find(':selected').val(),0);
        $("#Confirmationpopup").modal('hide');
        
        if (data.result == "Deleted") {
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Defect place template deleted successfully.');
              

                DefectPlaceID = 0;
            }
            else {
                $('#hTitle3').text('欠陥場所テンプレートが正常に削除されました.');
            }
        }
    });
}
function DeleteDefectmaster(deletid)
{
   //if (UserDetails.RoleId != 6) {
        Mode = 'D';
        if ($('#drpPlant').find(':selected').val() == 0)
        {
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Please select Plant to proceed');
            }
            else {
                $('#hTitle3').text('続行するにはプラントを選択してください');
            }

        }
        else
        {
            DefectPlaceID = deletid;
            $("#Confirmationpopup").modal('show');
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage').text('Are you sure? Want to delete this? If you delete this all related and information will be lost.');
            }
            else {
                $('#ConfirmationMessage').text('本気ですか？これを削除しますか？これを削除すると、関連するすべての情報が失われます.');
            }
        }
    //}
}
function GetTextBoxValueOne() {
    var b_destinations = []
    //b_destinations.forEach(function (element) {
    //    console.log(element.value);
    //    b_destinationsArr.push(element.value);
    //});
    for (var i = 1; i <= 43; i++)
    {

        var idname = '#Defectplacname' + i;
        
        var inputvalue = $(idname).val();
        if (inputvalue != '') {

            var inputvaluedefectplace = inputvalue;
                var jsonInput =
                {
                    "defectplaceitemid": DefectPlaceID != 0 ? DefectPlaceID : 0,
                    "defectplaceitemname": inputvaluedefectplace,
                    "positionnumber":i
                }
                b_destinations.push(jsonInput);
            }

    }

    //alert(b_destinations);
    var json = {
        "plantid": $('#drpPlant').find(':selected').val(),
        "defectplaceid": DefectPlaceID != 0 ? DefectPlaceID : 0,
        "defectplacename": $('#txtDefectplacname').val(),
        "createdby": UserDetails.UserId,
        "mode": Mode,
        "defectplacemasterinputlist": b_destinations 
    }
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/InsertDefectPlaceMaster';
    PostMethod(ApiFunc, Input, Token, function (data)
    {
        


        var En_Message = '';
        var Jp_Message = '';
        var isValid;


        if (data.result == "Inserted") {
            $("#DefectMasterModal").modal('hide');
            En_Message = 'New Defect place template created successfully';
            Jp_Message = '新しい欠陥場所テンプレートが正常に作成されました';
            isValid = true;
            DefectPlaceID = 0;
        }
        else if (data.result == "Updated") {
            $("#DefectMasterModal").modal('hide');
            En_Message = 'Defect place template updated successfully.';
            Jp_Message = '欠陥場所テンプレートが正常に更新されました';
            isValid = true;
            DefectPlaceID = 0;
        }
        else if (data.result == "Exists") {
            En_Message = 'Defect place template exists already with same name. Please use different name.';
            Jp_Message = '同じ名前の欠陥場所テンプレートがすでに存在しています。別の名前を使用してください.';
            isValid = false;
        }
        if (UserDetails.Language == "en") {
            $('#hTitle3').text(En_Message);
        }
        else {
            $('#hTitle3').text(Jp_Message);
        }
        $('#DynamicAlertModal').modal('show');
        if (isValid==true)
        {
            GetDefectMaster($('#drpPlant').find(':selected').val(),0);
            //if (UserDetails.PlantId != "") {
            //    GetDefectMaster($('#drpPlant').find(':selected').val(),0);
            //}
        }
       
        //BindingData(data);
    });
}
function AddDefectmaster()
{
    DefectPlaceID = 0;
    //if (UserDetails.RoleId != 6)
    //{
        if ($('#drpPlant').find(':selected').val() == 0) {
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Please select Plant to proceed');
            }
            else {
                $('#hTitle3').text('続行するにはプラントを選択してください');
            }

        }
        else {
            VId = 0;
            Mode = 'I';
            $("#txtDefectplacname").val('');
            $('#txtDefectplacname').removeClass("error");
            $(".text-box").val('');


			if (UserDetails.Language == "en")
			{
                $("#btnSubmit").val('Save');
            }
            else {
                $("#btnSubmit").val('セーブ');
            }


            $("#DefectMasterModal").modal('show');


        }
    //}
}

function EditDefectmaster(defectplaceid,defectplacename)
{
    //if (UserDetails.RoleId != 6) {
        if ($('#drpPlant').find(':selected').val() == 0) {
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Please select Plant to proceed');
            }
            else {
                $('#hTitle3').text('続行するにはプラントを選択してください');
            }

        }
        else {



            var PlaceName = defectplacename
            DefectPlaceID = defectplaceid;
            var json = {
                "defectplaceid": defectplaceid,
                "type": 'Detail'
            };
            var Input = JSON.stringify(json);
            var ApiFunc = Api + 'Master.svc/GetDefectPlaceMaster';
            PostMethod(ApiFunc, Input, Token, function (data) {
                DefectBindingData(data, PlaceName);
            });
        }
   // }
}
function DefectBindingData(data, PlaceName)
{
    Mode = 'U';

    $("#txtDefectplacname").val('');
    $('#txtDefectplacname').removeClass("error");
    $(".text-box").val('');
    

    if (UserDetails.Language == "en") {

        $("#btnSubmit").val('Update');
    }
    else {
		$("#btnSubmit").val('更新');
    }


    $('#txtDefectplacname').val(PlaceName);
    var content = [];
    var Defectmasterdetails = data.defectplacemasterlist;
    var serial_no = [];
    //init serial_no as what you want.
    for (var i = 0; i < Defectmasterdetails.length; i++)
    {
        var DefectPlaceName = Defectmasterdetails[i].defectplaceitemname;
        var position = Defectmasterdetails[i].positionnumber;
      
        
            var idname = '#Defectplacname' + position;
            $(idname).val(DefectPlaceName);
        
        //serial_no.push(DefectPlaceName);
           
        
       // alert(idvalue);
       // var inputvalue = $(idname).val();
    }

    //now set value into the textbox 
    //$(".text-box").each(function (i) {
    //    $(this).val(serial_no[i]);
    //})
    //$.each(Defectmasterdetails, function (i, DefectMaster)
    //{

    $("#DefectMasterModal").modal('show');
    //});
}