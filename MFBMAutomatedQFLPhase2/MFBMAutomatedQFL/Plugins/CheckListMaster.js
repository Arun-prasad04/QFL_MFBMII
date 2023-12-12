var UserDetails;
var Api;
var Token;
var plantid;
var currentplantid;
var Currentchangeplantid;
var VehicleMaster;
var PlantCode;
var MID;
var ischecked;
var MasterID;
var Mname;
var CheckListID;
var LineMasterData = "";

$(document).ready(function () {


   







    InitializeUrl();
    
   $('#AddVehicleTypeForm').validationEngine('attach', {
       onValidationComplete: function (form, status) {
           var validationfield, validationsummary;
           validationsummary = validatedropdown($('#drpLinemaster'));
           validationsummary = validatefield($('#txtVehicleTypeName'));
           validationfield = validatefield($('#txtDescription'));
           validationsummary = (validationfield == false ? validationfield : validationsummary);
       
          
           if (validationsummary)
           {
               SaveVehicleTypeMaster(PlantCode);
                  
          
            }
            else {
               
                return false;
            }
        },

        'showPrompts': false


    })

    $("#AddModelForm").validationEngine('attach', {
        onValidationComplete: function (form, status) {

            var validationfield, validationsummary;
            validationsummary = validatedropdown($('#drpVechiletype'));
            validationfield = validatefield($('#txtModelName'));
            validationsummary = (validationfield == false ? validationfield : validationsummary);

            if (validationsummary)
            {
               
                SaveModelMaster(PlantCode);
                       
            }
            else
            { 
                return false;
            }
        },
        'showPrompts': false
    });
    $("#btnSearch").click(function () {

        var ReExaminationGateId = $("#ReExaminationGateId").val();

        if (ReExaminationGateId == 3) {
            DeleteCheckListHistoryForPainting();
        }
        else {
            AfterPopUpConfirmation();

        }

    })

    $("#btnCancelSearch").click(function () {
        $("#Confirmationpopup").modal('hide');
    })
    
});




function OnChange(fUpload, modelid, vehicletypeid) {
    var ReExaminationGateId = $("#ReExaminationGateId").val();

    if (ReExaminationGateId == 3) {
        UploadPDFToImageForPaint(fUpload, modelid, vehicletypeid)
    }
    else {

    
    var files = $(fUpload)[0].files;
    if (files.length > 0) {
        //var index = $(fUpload).closest('tr').index();
        //var rowindex = parseInt(index, 10);
        showloader();
        var file = $(fUpload)[0].files[0];
        //var mimeType = file.type;
        var fileName = file.name;
        var LineName = $("#LineName").val();

        var formData = new FormData();
        formData.append('file', file);
        formData.append('modelid', modelid);
        formData.append('vehicletypeid', vehicletypeid);
        formData.append('qgateid', $('#QGateid').val());
        formData.append('createdby', UserDetails.UserId);
        formData.append('plantcode', UserDetails.PlantId);
        formData.append('filename', fileName);
        formData.append('Linename', LineName);
        var ApiFunc = '../Home/UploadFile/';
        FilePostMethod(ApiFunc, formData, null, function (data) {
            if (data != null && data != '') {
                hideloader();
                if (data == "Inserted" || data == "Updated") {
                    $('#DynamicAlertModal').modal('show');
                    if (UserDetails.Language == "en") {
                        $('#hTitle3').text('Checklist uploaded successfully');
                    }
                    else {
                        $('#hTitle3').text('チェックリストが正常にアップロードされました');
                    }
                    GetVehicleAndMasterDetailReload(UserDetails.PlantId);
                }
                else {
					$('#DynamicAlertModal').modal('show');
					if (UserDetails.Language == "en") {
                        $('#hTitle3').text('Error Upload checklist. Please check the template and mke sure all columns are in same order. If issue persists, contact Admin.');

					}
					else
					{
                        $('#hTitle3').text('エラーチェックリストのアップロード。テンプレートを確認し、すべての列が同じ順序であることを確認してください。問題が解決しない場合は、管理者に連絡してください.');
					}
                   
                }
                GetVehicleAndMasterDetails()
            }
            else {
                hideloader();
                $('#DynamicAlertModal').modal('show');
				if (UserDetails.Language == "en") {
                    $('#hTitle3').text('Error Upload checklist. Please check the template and mke sure all columns are in same order. If issue persists, contact Admin.');

				}
				else {
                    $('#hTitle3').text('エラーチェックリストのアップロード。テンプレートを確認し、すべての列が同じ順序であることを確認してください。問題が解決しない場合は、管理者に連絡してください');
				}
            }
        });
        $(fUpload).val('');
        }
    }
}

function BindingChecklist(data, PlantId) {
    if (data != null) {
        $("#Checklistmaster").empty();
        var content = [];
        var ModelMaster;
        var checklistDetails;
        VehicleMaster = data.vehicletypemasterdetail;
        ModelMaster = data.modelmasterdetail;
        checklistDetails = data.CheckListmasterList;
        var ReExaminationGateId = $("#ReExaminationGateId").val();

        //content.push('<div class=\"row\">');
        content.push('<div class=\"col-md-3\"></div>');
        content.push('<div class\="col-md-6\">');
        content.push('<table class=\"table table-bordered text-center\">');
        content.push('<tbody>');
      
         $.each(VehicleMaster, function (i, Vehicle) {
            var Model = $.grep(ModelMaster, function (element, index) {
                return element.vehicletypeid == Vehicle.vehicletypeid;
            });
             var count = Model.length;
             var count1 = Model.length;
           if (count == 0) {
               count = 1;
             }
          
             content.push('<tr>');
             content.push('<td width="35%" class="disable" onClick ="EditVehicletype(\'' + Vehicle.vehicletypeid + '\' , \'' + Vehicle.vehicletype + '\',\'' + Vehicle.vehicledescription + '\',' + Vehicle.lineid + ')" rowspan="' + count + '" style =\"cursor:pointer\"> <span class="trn">' + Vehicle.vehicletype + '</span></td>');

             if (count1 == 0) {

                 content.push('<td width="35%" class="disable" onClick ="EditVehicletype(\'' +  + '\' , \'' +  + '\',\'' + + '\')" rowspan="' + count + '" style =\"cursor:pointer\">' + ""  + '</td>');
                 content.push('<td width="35%" class="disable" onClick ="EditVehicletype(\'' + + '\' , \'' + + '\',\'' + + '\')" rowspan="' + count + '" style =\"cursor:pointer\">' +"" + '</td>');
                 content.push('</tr>');

                 //content.push('<td width="35%" class="disable" onclick="EditModel(\'' + + '\',\'' + + '\',\'' + + '\',\'' + + '\')" style =\"cursor:pointer\">' + + '</td>');
                 //content.push('<td width="30%" rowspan="' + 1 + '">');
                 //content.push('<form class="display-contents" action="/UploadFile/" method=\"post\" enctype=\"multipart/form-data\"><span class=\"image-upload\">');
                 //content.push('<label for=\"file-input' + + '\">');
                 //content.push('<i class=\"fa fa-upload iconupload\" aria-hidden="true" title=""></i>');
                 //content.push('</label>');
                 //content.push('<input id=\"file-input' + + '\" name=\"file-input' + + '\" type="file" onchange=\"OnChange(this,\'' + + '\',\'' + + '\');\" />');
                 //content.push('</span></form>');
                 ////content.push('<i class=\"fa fa-download icondownload\" aria-hidden="true" title=""></i>');
                 //content.push('<i onClick ="Downloadchecklist(\'' + + '\', \'' + + '\')" class=\"fa fa-download icondownload\" aria-hidden="true" title=""></i>');
                 //content.push('<i class="fa fa-trash icondelete" aria-hidden="true" title="" data-original-title="Delete" onclick="DeleteChecKListItem(\'' + + '\')"></i>');
                 //content.push('<i onClick ="ViewChecklist(\'' + + '\' , \'' + + '\')" class=\"fa fa-history iconhistory\" aria-hidden="true" title="" data-toggle="modal" data-target="#history"></i>');
                 //content.push(' </td>');
                 //content.push('</tr>');
             }
           
           
            var actioncount = 0;
            $.each(Model, function (i, Models) {

                content.push('<td width="35%" class="disable" onclick="EditModel(\'' + Models.vehicletypeid + '\',\'' + Vehicle.vehicletype + '\',\'' + Models.modelmasterid + '\',\'' + Models.model + '\')" style =\"cursor:pointer\"><span class="trn">' + Models.model + '</span></td>');
                if (actioncount == 0) { 
                    content.push('<td width="30%" rowspan="' + count + '">');
                    content.push('<form class="display-inline-table" action="/UploadFile/" method=\"post\" enctype=\"multipart/form-data\"><span class=\"image-upload\">'); 
                    content.push('<label for=\"file-input' + Models.modelmasterid + '\">');
                    content.push('<i class=\"fa fa-upload iconupload\" aria-hidden="true" title=""></i>');
                    content.push('</label>');
                    content.push('<input id=\"file-input' + Models.modelmasterid + '\" name=\"file-input' + Models.modelmasterid + '\" type="file" onchange=\"OnChange(this,\'' + Models.modelmasterid + '\',\'' + Vehicle.vehicletypeid + '\');\" />');
                    content.push('</span></form>');
                    //content.push('<i class=\"fa fa-download icondownload\" aria-hidden="true" title=""></i>');
                    content.push('<i onClick ="Downloadchecklist(\'' + Models.checklistfileid + '\', \'' + Models.checklistfilename + '\')" class=\"fa fa-download icondownload\" aria-hidden="true" title=""></i>');

                    if (ReExaminationGateId == 3) {
                        content.push('<i class="fa fa-trash icondelete" aria-hidden="true" title="" data-original-title="Delete" onclick="DeleteChecKListItemForPainting(\'' + Vehicle.vehicletypeid + '\', \'' + Models.checklistfilename + '\')"></i>');

                    }
                    else {
                        content.push('<i class="fa fa-trash icondelete" aria-hidden="true" title="" data-original-title="Delete" onclick="DeleteChecKListItem(\'' + Models.checklistid + '\', \'' + Models.checklistfilename + '\')"></i>');

                    }


                    content.push('<i onClick ="ViewChecklist(\'' + Models.vehicletypeid + '\')" class=\"fa fa-history iconhistory\" aria-hidden="true" title="" data-toggle="modal" data-target="#history"></i>');
                    content.push(' </td>');
                    actioncount = 1;
                   
                }
                content.push('</tr>');
            });

             
           
        });
        content.push('</tbody>');
        content.push('</table>');
        content.push('</div>');
        //content.push('</div>');
    }
    $("#Checklistmaster").append(content.join(''));
    $(".AutomatedQFLPage").mCustomScrollbar({
        axis: "y", theme: "minimal-dark"
    });
}

var VId = 0;
var Mode;
var ModelID;
var drpPlant;
var Vechiletypeid;

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
            plantid = UserDetails.PlantId;
            GetDropdownlistDetails();
            GetVehicleAndMasterDetails();
        
            if (UserDetails.RoleId == 6) {
              
                //$("#addvehicle").css('display', 'none');
                //$("#addmodel").css('display', 'none');
               
                
                if (UserDetails.AccessDetails.length > 0) {

                    $("#liProgressMonitor").hide();
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
                    }
                    else {
                        $("#liProgressMonitor").hide()
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

            $('.Languagepicker').selectpicker('val', UserDetails.Language);
            Conversion($('.Languagepicker').val());
        }
        else {
            alert("Session Expired");
            window.location.href = "Login";
        }
    });
}
function AddVehicleType() {
    $('#drpLinemaster').removeClass("error");
    $("#drpLinemaster").next().find('button').removeClass('error');
    $('#txtVehicleTypeName').removeClass("error");
    $('#txtDescription').removeClass("error");
    VId = 0;
    Mode = 'I';
    $("#txtVehicleTypeName").val('');
    $("#btndeleted").css('display', 'none');
    $("#txtDescription").val('');
   
    
    if (UserDetails.Language == "en") {
       
        $("#AlertTitleUpdate").text('Add Vehicle Type');
        $("#btnSubmited").val('Save');

       
    }
    else {
        $("#btnSubmited").val('セーブ');
        $("#AlertTitleUpdate").text('車両タイプを追加');
    }
    PlantCode = $('#drpPlant').find(':selected').attr("name");
    //BindingLineMasterdrp(LineMasterData);
    

    $("#VehicleTypeModalEdit").modal('show');
}

function AddModel() {
    MasterID = 'I';
    VId = 0;
    Mode = 'I';
    $("#txtModelName").val('');
    $('#txtModelName').removeClass("error");
    $('#drpVechiletype').removeClass("error");
    $("#btndelete").css('display', 'none');
    $("#drpVechiletype").next().find('button').removeClass('error');
    $("#drpVechiletype").prop("disabled", false);
   

    if (UserDetails.Language == "en") {
        $("#modelTitleUpdate").text('Add Model');
        $("#btnSubmit").val('Save');
    }
    else {
        $("#modelTitleUpdate").text('モデルを追加');
        $("#btnSubmit").val('セーブ');
    }
   
    currentplantid = $('#drpPlant').find(':selected').val();
    PlantCode = $('#drpPlant').find(':selected').attr("name");
    GetDropdownVechilelist(currentplantid);
    //VId = $('#drpVechiletype').find(":selected").val();
    $("#AlertModalEdit").modal('show');

   
}



function SaveVehicleTypeMaster(PlantCode) {
   
    //alert($("#txtVehicleTypeName").val());


    
        var dataObject = JSON.stringify({
            "mode": Mode,
            "vehicletypeid": VId,
            'vehicletype': $("#txtVehicleTypeName").val(),
            'vehicledescription': $("#txtDescription").val(),
            'plantcode': PlantCode,//$("#sddlplantMaster").multipleSelect("getSelects", "value")[0],//$("#drpPlant").multipleSelect("getSelects", "value")[0] == "" ? 0 : $("#drpPlant").multipleSelect("getSelects", "value")[0],
            'createdby': UserDetails.UserId,
            'lineid':  $("#LineId").val()
        });

        var ApiFunc = Api + 'Master.svc/' + 'InsertUpdateVehicleTypeMaster';

        var Input = dataObject;

        PostMethod(ApiFunc, Input, Token, function (data) {
            var En_Message = '';
            var Jp_Message = '';
            var isvaild;

         
            if (data.result == "Inserted")
            {
                $("#VehicleTypeModalEdit").modal('hide');
                En_Message = 'New Vehcile type created successfully.';
                Jp_Message = '新しいVehcileタイプが正常に作成されました.';
                isvaild = true;
             
            }
            else if (data.result == "AlreadyExist") {
                var vechiclename = $("#txtVehicleTypeName").val();
                En_Message = vechiclename + 'Vehicle type exists already with same name. Please use different name.';
                Jp_Message = vechiclename + '車両タイプは同じ名前ですでに存在しています。別の名前を使用してください.'
                isvaild = false;

            }
           
         
            else if (data.result == "Updated")
            {
                $("#VehicleTypeModalEdit").modal('hide');
                En_Message = 'Vehcile type updated successfully.';
                Jp_Message = 'Vehcileタイプが正常に更新されました.';
                isvaild = true;
                Mname = '';

               
            }
            else if (data.result == "VinAdded") {
                En_Message = 'This Vechicle Type Assigned to VIN.';
                Jp_Message = 'VINに割り当てられたこのVechicleタイプ.';
                isvaild = true;
                Mname = '';
                

            }
            if (data.result == "Deleted")
            {
                $("#VehicleTypeModalEdit").modal('hide');
                $("#Confirmationpopup").modal('hide');
                En_Message = 'Vehicle type deleted successfully';
                Jp_Message = 'Vehcileタイプが正常に削除されました！..';
                isvaild = true;
                Mode = '';
               
              
            }
        
            else if (data.result == "Error")
            {
                $('#DynamicAlertModal').modal('show');
                if (Mode = "I")
                {
                    En_Message = 'Vehicle Type Insert Failed Try again later';
                    Jp_Message = '車両タイプの挿入に失敗しました後でもう一度お試しください！..';
                    isvaild = false;
                    
                }
                else if (Mode = "U")
                {
                    En_Message = 'Vehicle Type Update Failed Try again later';
                    Jp_Message = '車両タイプの更新に失敗しました後でもう一度お試しください！..';
                    isvaild = false;
                  
                }
                else if (Mode = "D")
                {
                    En_Message = 'Delete Vehicle Type Failed Try again later';
                    Jp_Message = '車両タイプの削除失敗しました！';
                    isvaild = false;
                    
                }
            }
            if (UserDetails.Language == "en") {
                $('#hTitle3').text(En_Message);
            }
            else {
                $('#hTitle3').text(Jp_Message);
            }
            $('#DynamicAlertModal').modal('show');
            
            if (isvaild)
            {
                Mode = '';
                Vehiclemode = '';
                if (UserDetails.PlantId != "") {
                    plantid = UserDetails.PlantId
                    GetVehicleAndMasterDetails();
                }
            }
        });
    

}
var Vehiclemode;
function DeleteVechicle()
{
    CheckListID = 0;

    Vehiclemode = '';
    $("#Confirmationpopup").modal('show');
    if (UserDetails.Language == "en") {
        $('#ConfirmationMessage').text('Are you sure? Want to delete this? If you delete this all related and information will be lost.');
    }
    else {
        $('#ConfirmationMessage').text('本気ですか？これを削除しますか？これを削除すると、関連するすべての情報が失われます.');
    }

    Vehiclemode = 'D';
}
function DeleteModel()
{
    CheckListID = 0;
    $("#Confirmationpopup").modal('show');
    if (UserDetails.Language == "en") {
        $('#ConfirmationMessage').text('Are you sure? Want to delete this? If you delete this all related and information will be lost.');
    }
    else {
        $('#ConfirmationMessage').text('本気ですか？これを削除しますか？これを削除すると、関連するすべての情報が失われます.');
    }
   
    Mode = 'D';

}
function SaveModelMaster(PlantCode) {

    var Model = document.getElementById("txtModelName").value.toUpperCase(); 
    //var Model = $("#txtModelName").val();
  var   LineName =   $("#LineName").val();
    var Checkmodel = Model.substring(0, 1);
    if (LineName == "HDB Line" && Checkmodel == "M") {
      
    }
    else if (LineName == "LDB Line" && Checkmodel == "B") {

      
    }
    else if (LineName != "HDB Line" && LineName != "LDB Line")
    {

    }

    else {
        if (UserDetails.Language == "en") {
            if (LineName == "HDB Line") {
                $('#hTitle3').text("Model name should be start with  M  for HDB Line");
            }
            else if (LineName == "LDB Line") {
                $('#hTitle3').text("Model name should be start with B  for LDB Line");
            }
        }


            else {
                if (LineName == "HDB Line") {
                    $('#hTitle3').text("モデル名はHDB Lineの場合はMで始まる必要があります");
                }
                else if (LineName == "LDB Line") {
                    $('#hTitle3').text("LDBラインのモデル名はBで始まる必要があります");
                }
          
          
        }
        $('#DynamicAlertModal').modal('show');
        return false;
    }
   
    var dataObject = JSON.stringify({
        "modelmasterid": MID,
        "mode": Mode,
        "vehicletypeid": VId,
        'model': Model,
        'plantcode': PlantCode,//$("#drpPlant").multipleSelect("getSelects", "value")[0] == "" ? 0 : $("#drpPlant").multipleSelect("getSelects", "value")[0],
        'createdby': UserDetails.UserId
    });

    var ApiFunc = Api + 'Master.svc/' + 'InserUpdateModelMaster';

    var Input = dataObject;

    PostMethod(ApiFunc, Input, Token, function (data)
    {
        var En_Message = '';
        var Jp_Message = '';
        var isvaild;
        

        if (data.result == "Inserted")
        {
            $("#AlertModalEdit").modal('hide');
            En_Message = 'New Model created successfully';
            Jp_Message = '新しいモデルが正常に作成されました！..';
            isvaild = true;
            GetVehicleAndMasterDetails();

            MID = 0;
        }
        else if (data.result == "Updated")
        {
            $("#AlertModalEdit").modal('hide');
            En_Message = 'Model updated successfully';
            Jp_Message = 'モデルが正常に更新されました！..';
            isvaild = true;
            MID = 0;
           
          
        } 
        else if (data.result == "VinAdded") {
            $("#AlertModalEdit").modal('hide');
            En_Message = 'This Model Assiged to VIN. Can Not Delete this Model';
            Jp_Message = 'バリアントが正常に更新されました！..';
            isvaild = false;
            MID = 0;


        } 
        else if (data.result == "Deleted")
        {
            $("#AlertModalEdit").modal('hide');
            $("#Confirmationpopup").modal('hide');
            En_Message = 'Model deleted successfully';
            Jp_Message = 'モデルが正常に削除されました！..';
            isvaild = true;
            MID = 0
        }
        else if (data.result == "AlreadyExist") {
           
            var errorvalue = " " + $("#txtModelName").val();

            En_Message = errorvalue + ' Model exists already with same name. Please use different name';
            Jp_Message = errorvalue + ' 同じ名前のモデルがすでに存在します。別の名前を使用してください。';
            isvaild = false;

        }
        else if (data.result == "Error") {
            isvaild = false;
            $('#DynamicAlertModal').modal('show');
            if (Mode = "I")
            {
                En_Message = 'Model Insert Failed Try again later';
                Jp_Message = 'バリアントの挿入に失敗しました後でもう一度お試しください！';
              
               
            }
            else if (Mode = "U")
            {
                En_Message = 'Model Update Failed Try again later';
                Jp_Message = 'バリアントの更新に失敗しました後でもう一度お試しください！..';
               
            }
            else if (Mode = "D")
            {
                En_Message = 'Delete Model Failed Try again later';
                Jp_Message = 'バリアントの削除に失敗しました後でもう一度お試しください！..';
             }
        }
        if (UserDetails.Language == "en") {
            $('#hTitle3').text(En_Message);
        }
        else {
            $('#hTitle3').text(Jp_Message);
        }
        $('#DynamicAlertModal').modal('show');
        if (isvaild) {
            if (UserDetails.PlantId != "") {
                plantid = UserDetails.PlantId;
                GetVehicleAndMasterDetails();
            }
        }
    });
}


function GetDropdownVechilelist(currentplantid) {

    var json = {
        "plantid": currentplantid,
        "lineid": $("#LineId").val()
       

    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'Master.svc/VehicleAndModelmasterDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        var drpPlant = data.vehicletypemasterdetail;
        var optionhtml1 = '<option selected="selected" value="Select">' + "Select" + '</option>';

        $("#drpVechiletype").empty();
        $("#drpVechiletype").append(optionhtml1);
        $("#drpVechiletype").selectpicker('refresh');

        // $("#drpPlant").append(optionhtml1);
        var optionhtml = "";
        $.each(drpPlant, function (i, item) {

            if (currentplantid== UserDetails.PlantId) {
                optionhtml = '<option  value="' + item.vehicletypeid + '" name="' + item.vehicledescription + '">' + item.vehicletype + '</option>';
            }
            else {
                optionhtml = '<option value="' + item.vehicletypeid + '" name="' + item.vehicledescription + '">' + item.vehicletype + '</option>';
            }
            $("#drpVechiletype").append(optionhtml);
            $("#drpVechiletype").selectpicker('refresh');

        });

        $('#drpVechiletype').change(function () {
            VId = parseInt(jQuery(this).val());
            //VId = $('#drpVechiletype').find(":selected").val();
          
           
        });

       
      

    });
}


function GetVehicleAndMasterDetails()
{
    var json = {
        "plantid": plantid,
        "qgateid": $("#QGateid").val(),
        "lineid": $("#LineId").val()
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/VehicleAndModelmasterDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindingChecklist(data, plantid);
        //BindingLineMasterdrp(data);
        //LineMasterData = data

    });
    //$('.Languagepicker').selectpicker('val', UserDetails.Language);
    //Conversion($('.Languagepicker').val());
}

//function BindingLineMasterdrp(data) {
   
    
//    $('#txtDescription').prop('disabled', true);
//    $('#txtVehicleTypeName').prop('disabled', true);

//    var drpLine = data.ListLineMaster;

//    $("#drpLinemaster").empty();
//    var optionhtml1 = '<option selected="selected" value="0">' + "Select" + '</option>';
//    $("#drpLinemaster").append(optionhtml1);
   


//    var optionhtml = "";
//    $.each(drpLine, function (i, item) {


//        optionhtml = '<option  value="' + item.lineid + '" name="' + item.linename + '">' + item.linename + '</option>';

//        $("#drpLinemaster").append(optionhtml);
//        $("#drpLinemaster").selectpicker('refresh');
//    });

//    $('#drpLinemaster').change(function () {
//        LineID = parseInt(jQuery(this).val());
//        //VId = $('#drpVechiletype').find(":selected").val();
//        if (LineID != 0) {
//            $('#txtDescription').prop('disabled', false);
//            $('#txtVehicleTypeName').prop('disabled', false);
//        }
//        else {
//            $('#txtDescription').prop('disabled', true);
//            $('#txtVehicleTypeName').prop('disabled', true);
//        }
      

//    });



//}

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
        // $("#drpPlant").append(optionhtml1);
        var optionhtml = "";
        $.each(drpPlant, function (i, item) {
            if (item.plantid == UserDetails.PlantId) {
                optionhtml = '<option Selected="selected" name="' + item.plantcode + '"  value="' +
                    item.plantid + '">' + item.plantname + '</option>';
            }
            else {
                optionhtml = '<option name="' + item.plantcode + '"  value="' +item.plantid + '">' + item.plantname + '</option>';
            }
            $("#drpPlant").append(optionhtml);
            $("#drpPlant").selectpicker('refresh');
        });
        $('#drpPlant').prop('disabled', true);
      
     
        
        
        
    });
    //$('.Languagepicker').selectpicker('val', UserDetails.Language);
    //Conversion($('.Languagepicker').val());
}

function EditVehicletype(VehicleId, vehicletype, VehicleDescription) {
    //if (UserDetails.RoleId != 6) {
        Mname = 'I';
        $('#txtVehicleTypeName').removeClass("error");
        $('#txtDescription').removeClass("error");
        $("#btndeleted").show();
        $("#txtVehicleTypeName").val(vehicletype);
        $("#txtDescription").val(VehicleDescription);
        VId = VehicleId;
        Mode = "U";
        $('#txtVehicleTypeName').css('border', '1px solid #ccc');
        $('#txtDescription').css('border', '1px solid #ccc');
        if (UserDetails.Language == "en")
        {
            $("#btnSubmited").val('Update');
            $("#AlertTitleUpdate").text('Edit Vehicle Type');
        }
        else
        {
            $("#btnSubmited").val('更新');
            $("#AlertTitleUpdate").text('車両タイプの編集');
        }
        PlantCode = $('#drpPlant').find(':selected').attr("name");

        $("#VehicleTypeModalEdit").modal('show');





        var lineid = $("#LineId").val()
        var drpLine = LineMasterData.ListLineMaster;

        $("#drpLinemaster").empty();
        //var optionhtml1 = '<option selected="selected" value="0">' + "Select" + '</option>';
        //$("#drpLinemaster").append(optionhtml1);
        var optionhtml = "";
        $.each(drpLine, function (i, item) {

            if (item.lineid == lineid) {
                optionhtml = '<option  value="' + item.lineid + '" selected name="' + item.linename + '">' + item.linename + '</option>';

            }
            else {
                optionhtml = '<option  value="' + item.lineid + '" name="' + item.linename + '">' + item.linename + '</option>';

            }

            $("#drpLinemaster").append(optionhtml);
            $("#drpLinemaster").selectpicker('refresh');
        });
        var LineID =$('#drpLinemaster').find(':selected').val()
        if (LineID != 0) {
            $('#txtDescription').prop('disabled', false);
            $('#txtVehicleTypeName').prop('disabled', false);
        }
        else {
            $('#txtDescription').prop('disabled', true);
            $('#txtVehicleTypeName').prop('disabled', true);
        }
   // }
}

function EditModel(vehicleId, VechicleType, ModelId, ModelName) {
   // if (UserDetails.RoleId != 6) {
        VId = vehicleId;
        MID = ModelId;
        Mode = 'U';
        $("#btndelete").show();
        $('#txtModelName').removeClass("error");
        $('#drpVechiletype').removeClass("error");
        $("#drpVechiletype").next().find('button').removeClass('error');
        $("#txtModelName").val(ModelName);
        $('#txtModelName').css('border', '1px solid #ccc');
        $("#drpVechiletype").empty();
        var optionhtml = "";

        optionhtml = '<option selected="selected"  value="' + vehicleId + '" name="' + PlantId + '">' + VechicleType + '</option>';

        $("#drpVechiletype").append(optionhtml);
        $("#drpVechiletype").selectpicker('refresh');
        $("#drpVechiletype").css('border', '1px solid #ccc');
        $("#drpVechiletype").prop("disabled", true);
        if (UserDetails.Language == "en") {
            $("#modelTitleUpdate").text('Edit Model');
            $("#btnSubmit").val('Update');
        }
        else {
			$("#modelTitleUpdate").text('モデルを編集');
            $("#btnSubmit").val('更新');
        }
        currentplantid = PlantId;
        PlantCode = $('#drpPlant').find(':selected').attr("name");


        $("#AlertModalEdit").modal('show');
    //}
}


function AfterPopUpConfirmation()
{


   // if (UserDetails.RoleId != 6)
   // {
        
        if (CheckListID != 0) {
            var json = {
                "checklistid": CheckListID,
                "isactive": 0,
                "createdby": UserDetails.UserId
            };
            var Input = JSON.stringify(json);
            var ApiFunc = Api + 'Master.svc/InsertUpdateCheckListmaster';
            PostMethod(ApiFunc, Input, Token, function (data) {
                $("#Confirmationpopup").modal('hide');
                // $("#AlertModalEdit").modal('hide');
                
                if (data == "Updated")
                {
                    
                    $('#DynamicAlertModal').modal('show');
                    if (UserDetails.Language == "en") {
                        $('#hTitle3').text('Checklist deleted successfully');
                    }
                    else {
                        $('#hTitle3').text('チェックリストを削除しました.');
                    }
                    CheckListID = 0;
                    GetVehicleAndMasterDetails();
                }
            });
        }
        else if (Mode == 'D')
        {
            SaveModelMaster(PlantCode);
        }
        else if (Vehiclemode == 'D' && VId !="")
        {
            Mode = Vehiclemode;
            SaveVehicleTypeMaster(PlantCode)
        }
        else {
            $("#Confirmationpopup").modal('hide');
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('No file available for this VIN and Model.');
            }
            else {
                $('#hTitle3').text('このVINとモデルに使用できるファイルはありません');
            }

        }


        GetVehicleAndMasterDetails();
   // }
  
}
function DeleteChecKListItem(checklistID,CheckListFilename) {
   // if (UserDetails.RoleId != 6)
   // {
        if (CheckListFilename == "" || CheckListFilename == null) {


            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('No file available for this VIN and Model');
            }
            else {
                $('#hTitle3').text('このVINとモデルに使用できるファイルはありません.');
            }


            return false;
        }
        else
        {
            $("#Confirmationpopup").modal('show');
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage').text('Are you sure want to delete this Checklist ? If you delete, all the related Checklist and information will be lost.');
            }
            else {
                $('#ConfirmationMessage').text('このチェックリストを削除してもよろしいですか？削除すると、関連するすべてのチェックリストと情報が失われます.');
            }
            CheckListID = checklistID;

        }
       
   // }
}


function ViewChecklist(Vehicletypeid) {
    var QgateId = $("#QGateid").val();
    PlantCode = $('#drpPlant').find(':selected').attr("name");
    
    var ReExaminationGateId = $("#ReExaminationGateId").val();
    if (ReExaminationGateId == 3) {
        var dataObject = JSON.stringify({

            "vehicletypeid": Vehicletypeid,
            'qgateid': QgateId,
            'plantcode': UserDetails.PlantId,
        });
        var ApiFunc = Api + 'Master.svc/' + 'GetCheckListHistoryForPainting';
    }
    else {

        var dataObject = JSON.stringify({

            "vehicletypeid": Vehicletypeid,
            'qgateid': QgateId,
            'plantcode': PlantCode,
        });
        var ApiFunc = Api + 'Master.svc/' + 'GetCheckListHistory';
    }
   
    var Input = dataObject;
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindChecklistHistory(data)
    });
}
function BindChecklistHistory(data) {
    var ChecklistHistory
    $("#ChecklistHistory").empty();
    var content = [];
    ChecklistHistory = data.checklisthistorydetails;
    $.each(ChecklistHistory, function (i, ChecklistHistoryMaster) {
        content.push('<tr>');
        content.push('<td><a href="#" onClick ="Downloadchecklist(\'' + 0 + '\', \'' + ChecklistHistoryMaster.filename + '\')">' + ChecklistHistoryMaster.filename + '</td>');
        content.push('<td>' + ChecklistHistoryMaster.vehicletypemodel + '</td>');
        content.push('<td>' + ChecklistHistoryMaster.uploadedby + '</td>');
        content.push('<td>' + ChecklistHistoryMaster.uploadeddate + '</td>');
        content.push('</tr>');
    });
    $("#ChecklistHistory").append(content.join(''));
}

function Downloadchecklist(Checklistfileid, checklistfilename) {

    checklistfilename = encodeURIComponent(checklistfilename.trim());
    if (checklistfilename == "" || checklistfilename == null) {


        $('#DynamicAlertModal').modal('show');
        if (UserDetails.Language == "en")
        {
            $('#hTitle3').text('No file available for this VIN and Model.');
        }
        else
        {
            $('#hTitle3').text('このVINとモデルに使用できるファイルはありません！..');
        }


        return false;
    }
    //window.location.href = "../Home/DownLoadCheckListFile?checklistfilename=" + data.checklistfilename;

    var ApiFunc = "../Home/DownLoadCheckList?checklistfilename=" + checklistfilename;

    JsonPostMethod(ApiFunc, '', '', function (data) {
        if (data != null && data != '') {

            var Linename = $("#LineName").val();
            var ReExaminationGateId = $("#ReExaminationGateId").val();
            if (ReExaminationGateId == 3) {
                window.location.href = "../Home/DownloadchecklistFileForPainting?checklistfilename=" + checklistfilename+"&Linename=" + Linename ;
            }
            else {
                window.location.href = "../Home/DownLoadCheckListFile?checklistfilename=" + checklistfilename;
            }

        }
        else {

        }
    });
}


function GetVehicleAndMasterDetailReload(plantid) {

    //alert(plantid);
    var json = {
        "plantid": plantid,
        "lineid": $("#LineId").val()
       
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/VehicleAndModelmasterDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindingChecklist(data, plantid);
    });
    //$('.Languagepicker').selectpicker('val', UserDetails.Language);
    //Conversion($('.Languagepicker').val());
}

function btnSubmitModel() {

    if (Mode == "D") {
        Mode = 'U';

    }
}
var filedata = [];
var filename = [];
var filesize = [];
function UploadPDFToImageForPaint(fUpload, modelid, vehicletypeid) {
    var files = $(fUpload)[0].files;




    filedata = [];
    filename = [];

    filesLength = files.length, loaded = 0;

    for (var i = 0; i < filesLength; i++) {

        var fileReader = new FileReader();
        var f = files[i];

        fsize = (f.size / 1024 / 1024).toFixed(2);
        var extt = f.name.replace(/^.*\./, '');
        var ext = extt.toLowerCase();
        if (ext == "pdf") {
            filename.push(f.name);
            filesize.push(f.size);



            fileReader.onload = (function (e) {

                filedata.push(e.target.result);

                $(fUpload).val('');


            });
            fileReader.readAsDataURL(f);
        }
        else {
            $('#hTitle3').empty();
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('File format not supported. Please upload docuemnts in PDF Format');
            }
            else {
                $('#hTitle3').text('サポートされていないファイル形式です。ドキュメントをPDF形式でアップロードしてください');
            }


        }
    }






    if (files.length > 0) {
      
        showloader();
        var file = $(fUpload)[0].files[0];

        var imagedata = "";
        var imagedata1 = "";


        if (file.type == "application/pdf") {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                
                var pdfData = new Uint8Array(this.result);
                // Using DocumentInitParameters object to load binary data.
                var loadingTask = pdfjsLib.getDocument({ data: pdfData });
                loadingTask.promise.then(function (pdf) {
                    console.log('PDF loaded');

                    // Fetch the first page
                    var pageNumber = 1;
                    pdf.getPage(pageNumber).then(function (page) {
                        console.log('Page loaded');

                        var scale = 2;
                        var viewport = page.getViewport({ scale: scale });

                        // Prepare canvas using PDF page dimensions
                        var canvas = $("#pdfViewer")[0];
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        // Render PDF page into canvas context
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        var renderTask = page.render(renderContext);
                        renderTask.promise.then(function () {


                           

                            var canvas = document.getElementById("pdfViewer");// save canvas image as data url (png format by default)
                            var dataURL = canvas.toDataURL("image/png");
                            imagedata = dataURL.replace('data:image/png;base64,', '');

                            var fileName = file.name;
                            var LineName = $("#LineName").val();
                            var ids = guid();
                            var formData = new FormData();
                            formData.append('file', file);
                            formData.append('filedata', filedata);
                            formData.append('modelid', modelid);
                            formData.append('vehicletypeid', vehicletypeid);
                            formData.append('qgateid', $('#QGateid').val());
                            formData.append('createdby', UserDetails.UserId);
                            formData.append('plantcode', UserDetails.PlantId);
                            formData.append('filename', fileName);
                            formData.append('Linename', LineName);
                            formData.append('token', Token);
                            formData.append('imagedata', imagedata);

                            var ApiFunc = '../Home/UploadPdfFileForPaint/';
                            FilePostMethod(ApiFunc, formData, null, function (data) {
                                signatureClear();
                                if (data != null && data != '') {
                                    hideloader();
                                    if (data == "Inserted" || data == "Updated") {
                                        $('#DynamicAlertModal').modal('show');
                                        if (UserDetails.Language == "en") {
                                            $('#hTitle3').text('Checklist uploaded successfully');
                                        }
                                        else {
                                            $('#hTitle3').text('チェックリストが正常にアップロードされました');
                                        }
                                        GetVehicleAndMasterDetailReload(UserDetails.PlantId);
                                    }
                                    else {
                                        $('#DynamicAlertModal').modal('show');
                                        if (UserDetails.Language == "en") {
                                            $('#hTitle3').text('Error Upload checklist. Please check the template and mke sure all columns are in same order. If issue persists, contact Admin.');

                                        }
                                        else {
                                            $('#hTitle3').text('エラーチェックリストのアップロード。テンプレートを確認し、すべての列が同じ順序であることを確認してください。問題が解決しない場合は、管理者に連絡してください.');
                                        }

                                    }
                                    GetVehicleAndMasterDetails()
                                }
                                else {
                                    hideloader();
                                    $('#DynamicAlertModal').modal('show');
                                    if (UserDetails.Language == "en") {
                                        $('#hTitle3').text('Error Upload checklist. Please check the template and mke sure all columns are in same order. If issue persists, contact Admin.');

                                    }
                                    else {
                                        $('#hTitle3').text('エラーチェックリストのアップロード。テンプレートを確認し、すべての列が同じ順序であることを確認してください。問題が解決しない場合は、管理者に連絡してください');
                                    }
                                }
                            });

                            
                           

                        });

                      
                    });
                }, function (reason) {
                    // PDF loading error
                    console.error(reason);
                });

              
            };
            fileReader.readAsArrayBuffer(file);
        }


      


        //filedata = [];
        //filename = [];
      
        //    filesLength = files.length, loaded = 0;

        //for (var i = 0; i < filesLength; i++) {

        //    var fileReader = new FileReader();
        //    var f = files[i];
         
        //    fsize = (f.size / 1024 / 1024).toFixed(2);
        //    var extt = f.name.replace(/^.*\./, '');
        //    var ext = extt.toLowerCase();
        //    if (ext == "pdf") {
        //        filename.push(f.name);
        //        filesize.push(f.size);



        //        fileReader.onload = (function (e) {

        //            filedata.push(e.target.result);

        //            $(fUpload).val('');
                 

        //        });
        //        fileReader.readAsDataURL(f);
        //    }
        //    else {
        //        $('#hTitle3').empty();
        //        $('#DynamicAlertModal').modal('show');
        //        if (UserDetails.Language == "en") {
        //            $('#hTitle3').text('File format not supported. Please upload docuemnts in PDF Format');
        //        }
        //        else {
        //            $('#hTitle3').text('サポートされていないファイル形式です。ドキュメントをPDF形式でアップロードしてください');
        //        }


        //    }
        //}



       
    }
}

function buttons() {

    var canvas = document.getElementById("pdfViewer");// save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL("image/png");
   var imagedata = dataURL.replace('data:image/png;base64,', '');

    var json = {
        "imagedata": imagedata,
        "Vinnumber": '123123',
        "VinId": 0,
        "Gateid": $('#QGateid').val()

    };
    var Input = JSON.stringify(json);

    var ApiFunc = '../Home/SignatureSave/';
    JsonPostMethod(ApiFunc, Input, '', function (data) {
    });
}

function signatureClear() {
    var canvas = document.getElementById("pdfViewer");
    var context = canvas.getContext("2d");
    //context.clearRect(0, 0, canvas.width, canvas.height);
    clearCanvas(context, canvas);
}
function clearCanvas(context, canvas) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
}

var GLBVehicleTypeId
var GLBCheckListFilename="";
function DeleteChecKListItemForPainting(VehicleTypeId, CheckListFilename) {
    // if (UserDetails.RoleId != 6)
    // {
    if (CheckListFilename == "" || CheckListFilename == null) {


        $('#DynamicAlertModal').modal('show');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('No file available for this VIN and Model');
        }
        else {
            $('#hTitle3').text('このVINとモデルに使用できるファイルはありません.');
        }


        return false;
    }
    else {
        $("#Confirmationpopup").modal('show');
        if (UserDetails.Language == "en") {
            $('#ConfirmationMessage').text('Are you sure want to delete this Checklist ? If you delete, all the related Checklist and information will be lost.');
        }
        else {
            $('#ConfirmationMessage').text('このチェックリストを削除してもよろしいですか？削除すると、関連するすべてのチェックリストと情報が失われます.');
        }
        GLBVehicleTypeId = VehicleTypeId
        GLBCheckListFilename=CheckListFilename
    }

    // }
}

function DeleteCheckListHistoryForPainting() {
    $('#Confirmationpopup').modal('hide');

    var QgateId = $("#QGateid").val();

    if (GLBCheckListFilename == "" || GLBCheckListFilename == null || GLBCheckListFilename == undefined) {
        $("#Confirmationpopup").modal('hide');
        $('#DynamicAlertModal').modal('show');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('No file available for this VIN and Model.');
        }
        else {
            $('#hTitle3').text('このVINとモデルに使用できるファイルはありません');
        }
    }

    else {

        var dataObject = JSON.stringify({

            "vehicletypeid": GLBVehicleTypeId,
            'qgateid': QgateId,
            'plantcode': UserDetails.PlantId,
        });
        var ApiFunc = Api + 'Master.svc/' + 'DeleteCheckListHistoryForPainting';


        var Input = dataObject;
        PostMethod(ApiFunc, Input, Token, function (data) {

            if (data.result == "Deleted") {
                $('#DynamicAlertModal').modal('show');
                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('Checklist deleted successfully');
                }
                else {
                    $('#hTitle3').text('チェックリストを削除しました.');
                }

                GetVehicleAndMasterDetails();
            }

           
        });


    }


}



