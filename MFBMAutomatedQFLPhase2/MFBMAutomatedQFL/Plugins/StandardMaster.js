var filedata = [];
var filename = [];
var filesize = [];
var Mode;
var standardid;
var UserDetails;
var Api;
var Token;
var plantid;
var name;
var fsize;
var files;
var deleteguid;
var deletefilename;
var DeleteMode;
var deleteID;
var fs;

$(document).ready(function () {

    
    InitializeUrl();

    $('#StandardMaster').validationEngine('attach', {
        onValidationComplete: function (form, status) {
            var validationfield, validationsummary;
			validationsummary = validatespaceValue($('#txtStandMaster'));
			
          
			if (ExistsFileName == "") {
				validationfield = validatefile($('#files1'));

			}

            
               
       
            validationsummary = (validationfield == false ? validationfield : validationsummary);

            if (validationsummary)
            {
                //var validate = validatespaceValue($('#txtStandMaster'));

                //if (validate)
                //{
                    FileUpload(filedata, name, filesize);
                //}
               
                

            }
            else {

                return false;
            }
        },

        'showPrompts': false


    })
    

    $('#bfile').click(function () {
        //alert('trigger');
        $("#files1").trigger("click");
    });


    if (window.File && window.FileList && window.FileReader)
    {
        $("#files1").on("change", function (e) {
           $("#FileName").empty();
            filedata = [];
            filename = [];
             files = e.target.files,
             filesLength = files.length, loaded = 0;
                    
            for (var i = 0; i < filesLength; i++) {
             
                var fileReader = new FileReader();
                var f = files[i];
                name = f.name;
                fsize = (f.size / 1024 / 1024).toFixed(2);
                var extt = f.name.replace(/^.*\./, '');
                var ext = extt.toLowerCase();
                if (ext == "pdf") {
                    $('#FileName').append(f.name);
                    filename.push(f.name);
                    filesize.push(f.size);
                   
                    fileReader.onload = (function (e)
                    {
                        
                        filedata.push(e.target.result);
                      

                        if (filesLength!=0) {
                              $('#FileError').hide();
                        }
                       
                        if (filesLength == 0) {
                         
                            $('#FileError').show();
                        }

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
          


        });


    } else {
        $('#hTitle3').empty();
        $('#DynamicAlertModal').modal('show');
        $('#hTitle3').text('Your browser does not support to File API!..');

    }
    $("#btnSearch").click(function () {
        AfterPopUpConfirmation();
    })

    $("#btnCancelSearch").click(function () {
        $("#Confirmationpopup").modal('hide');
    })
    $("input").on("keypress", function (e) {
        if (e.which === 32 && !this.value.length)
            e.preventDefault();
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
function DeleteStandardMasterFile(FDGuid, FDName,FID) {


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

   
    if (UserDetails.RoleId != 6)
    {
        deleteguid = FDGuid;
        deletefilename = FDName;
        deleteID = FID;
        DeleteMode = 'F';
        if (deletefilename != "") {
            $("#Confirmationpopup").modal('show');
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage').text('Are you sure? Want to delete this? If you delete this all related and information will be lost.');
            }
            else {
                $('#ConfirmationMessage').text('本気ですか？これを削除しますか？これを削除すると、関連するすべての情報が失われます');
            }
        }
        else
        {
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Already File Deleted Standard');
            }
            else {
                $('#hTitle3').text('すでにファイルが削除された標準');
            }
           
               
               // $('#hTitle3').text('Already File Deleted StandardMaster');
            
        }
       
        //DeleteID = DeleteStandardID;
      }
    }
}
function AfterPopUpConfirmation()
{
    //if (UserDetails.RoleId != 6)
    //{
        if (DeleteMode == 'F') {
            if (deletefilename != "") {
                //showloader();
              
                var formData = new FormData();
                var fs = (filesize[0] / 1024 / 1024).toFixed(2);
                //var file = filedata[0];

                formData.append('filedata', "");
                formData.append('standardname', $("#txtStandMaster").val());
                formData.append('userid', UserDetails.UserId);
                formData.append('mode', DeleteMode);
                formData.append('token', Token);
                formData.append('standardid', deleteID);
                formData.append('filename', deletefilename);
                formData.append('fileguid', deleteguid);
                formData.append('filesize', "");

                var ApiFunc = '../Home/StandardMaster/';

                FilePostMethod(ApiFunc, formData, null, function (data) {
                    DeleteMode = '';
					var En_Message = '';
					var Jp_Message = '';
                    if (data != null && data != '') {
                       // hideloader();
                        $("#Confirmationpopup").modal('hide');
                        if (data == "Deleted") {
                            $('#AddStandmasterModal').modal('hide');
                            $('#DynamicAlertModal').modal('show');
                            En_Message ='Standard Reference deleted successfully';
                            Jp_Message ='標準参照が正常に削除されました';
                            filedata = [];
                            name = "";
                            filesize = [];
                            GetStandardMaster($('#drpPlant').find(':selected').val(),0);
                        }
						else
						{
                            

							En_Message = 'Standard file deleted due to error. Please contact the administrator.';

							Jp_Message = 'エラーファイルにより標準ファイルが削除されました。管理者に連絡してください';
						}

						 
						if (UserDetails.Language == "en")
						{
							$('#hTitle3').text(En_Message);
						}
						else {
							$('#hTitle3').text(Jp_Message);
						}
						$('#DynamicAlertModal').modal('show');

                    }


                });
            }
            else {
                $('#DynamicAlertModal').modal('show');
                $('#hTitle3').text('StandMaster Template File is Not Available..!');
            }

        }

        else {
            var json = {

                "standardid": DeleteID,
                "mode": Mode,
                "userid": UserDetails.UserId
            }
            var Input = JSON.stringify(json);
            var ApiFunc = Api + 'Master.svc/AddUpdateStandardMaster';
            PostMethod(ApiFunc, Input, Token, function (data) {
                $("#Confirmationpopup").modal('hide');
                // $("#AlertModalEdit").modal('hide');

                if (data == "Deleted") {

                    $('#DynamicAlertModal').modal('show');
                    if (UserDetails.Language == "en") {
                        $('#hTitle3').text('Standard Reference deleted successfully');
                        GetStandardMaster($('#drpPlant').find(':selected').val(),0);
                    }
                    else {
                        $('#hTitle3').text('標準参照が正常に削除されました');
                    }
                    DeleteID = 0;
                    GetStandardMaster($('#drpPlant').find(':selected').val(),0);
                }
            });
        }

   // }


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

        if (len == 1)
        {
            $('#drpPlant').prop('disabled', true);
            var PlantId = $('#drpPlant').find(':selected').val();

            MaintainPlantId(PlantId)
        }

        $('#drpPlant').change(function ()
        {
            var PlantId = parseInt(jQuery(this).val());
            MaintainPlantId(PlantId)
            if ($('#drpPlant').find(':selected').val() != 0) {

                GetStandardMaster($('#drpPlant').find(':selected').val(),0);
            }


      
        });
        if ($('#drpPlant').find(':selected').val() != 0)
        {

            GetStandardMaster($('#drpPlant').find(':selected').val(),0);
        }

        if (UserDetails.Language == "") { $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val()); }
        else {
            $('.Languagepicker').selectpicker('val', UserDetails.Language);
            Conversion($('.Languagepicker').val());
        }

    });
}
function GetStandardMaster(Plantid,standardid)
{

    var json = {
        "plantid": Plantid,
        "standardid": standardid
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetStandardMasterDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindingData(data);
    });
   

}
function DeleteStandardmaster(DeleteStandardID) {
   

    //if (UserDetails.RoleId != 6)
    //{
        Mode = "D";
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

            $("#Confirmationpopup").modal('show');
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage').text('Are you sure? Want to delete this? If you delete this all related and information will be lost.');
            }
            else {
                $('#ConfirmationMessage').text('本気ですか？これを削除しますか？これを削除すると、関連するすべての情報が失われます');
            }
            DeleteID = DeleteStandardID;
        }
   // }


}

function BindingData(data)
{
    $("#Standmaster").empty();
    var content = [];
    var standmasterdetails = data.liststandardmasters;
    //content.push(' <div class="col-md-3"></div>');
    content.push(' <div class="col-md-3"></div>');
    content.push('<div class\="col-md-6\">');
    content.push('<table class=\"table table-bordered text-center\">');
    $.each(standmasterdetails, function (i, StandMaster)
    {
        var createdby = StandMaster.ModifiedBy == 0 ? StandMaster.createdby : StandMaster.ModifiedBy;
        var Createddate = StandMaster.ModifiedDate == "" ? StandMaster.CreatedDate : StandMaster.ModifiedDate;
        var Sno = i + 1;
        content.push('<tr>');
        content.push('<td width="35%">' + Sno + '</td>');
        content.push('<td width="35%">' + StandMaster.standardname + '</td>');
        content.push('<td width="30%">');

        content.push('<i class="fa fa-pencil-alt icondownload" aria-hidden="true" title="" data-toggle="modal"  onClick ="EditStandardmaster(\'' + StandMaster.standardid + '\' , \'' + StandMaster.standardname + '\',\'' + StandMaster.filename + '\',\'' + createdby + '\',\'' + Createddate + '\',\'' + StandMaster.filesize + '\',\'' + StandMaster.fileguid + '\')"></i>');
        content.push('<i class="fa fa-trash icondelete" aria-hidden="true" title="" data-toggle="modal" data-target="#delete"  onClick ="DeleteStandardmaster(\'' + StandMaster.standardid + '\')"></i>');
        content.push('</td>');
        content.push('</tr>');
   
    });

    content.push('</tbody>');
    content.push('</table>');
    content.push('</div>');
        //content.push('</div>');

    $("#Standmaster").append(content.join(''));

    if (UserDetails.Language == "") { $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val()); }
    else {
        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());
    }


}

var ExistID = 0, ExistStandName, ExistsFileName, Existscreatedby, Exitscreateddate, Existssize, Existguid;

function DownloadStandardMaster(DwdID, DwdGUID, DwdFileName) {
    if (DwdFileName == "") {


        $('#DynamicAlertModal').modal('show');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('StandMaster Template File is Not Available..!');
        }
        else {
            $('#hTitle3').text('このStandardMasterで使用できるファイルはありません');
        }


        return false;
    }
    else {

		window.location.href = "../Home/DwdStandardMasterFile?StandardMasterfilename=" + DwdGUID + "&filename=" + DwdFileName;
       }

}
function EditStandardmaster(id,Name,filename,createdby,createddate,size,guid)
{
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
        else
        {
            if (UserDetails.Language == "en")
            {
                $("#AlertTitleUpdate").text('Edit Standard Master');
                $("#btnSubmit").val('Update');
            }
            else
            {
                $("#AlertTitleUpdate").text('標準マスターを編集します');
                $("#btnSubmit").val('更新');
            }

            ExistID = id;
            ExistStandName = Name;
            ExistsFileName = filename;
            Existscreatedby = createdby;
            Exitscreateddate = createddate;
            Existssize = size;
            Existguid = guid;
            $("#AttachmentUpload").empty();
            $('#FileName').empty();
            var html = '';
            //VId = 0;
            Mode = 'U';
            $("#txtStandMaster").val(Name);
            $('#FileName').append(filename);

            $('#files1').val('');
            $('#txtStandMaster').removeClass("error");
            $('#FileError').css('display', 'none');

            if (filename != '')
            {

           
          

            html += '<div class="attachment-border"> <div class="row"><div class="col-md-3 col-sm-3"><img alt="" class="img-responsive" src="../Images/' + CheckFileType(filename) + '"> <p class="mbsize">'
                + '<span> ' + size + '</span ></p >'
                + '</div><div class="col-md-9 col-sm-9"><h4 class="overflow-attachment1"> ' + filename + '</h4><p class="overflow-attachment2">' + createdby + ' </p>'
                + '<label class="overflow-attachment3">' + createddate + '</label> <span class="pull-right btn-group"  onClick = "DeleteStandardMasterFile(\'' + Existguid + '\', \'' + ExistsFileName + '\',\'' + ExistID + '\')"><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-trash"></span></i> </span>'
                + '<span class="pull-right btn-group" onClick ="DownloadStandardMaster(\'' + ExistID + '\', \'' + Existguid + '\', \'' + ExistsFileName + '\')"><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-save"></span></i> </span>'
                + '</div></div></div>';


                $('#AttachmentUpload').append(html);
            }

            $("#AddStandmasterModal").modal('show');
        }
    //}
}


function AddStandmaster()
{
    ExistsFileName='';
    if ($('#drpPlant').find(':selected').val() == 0) {
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


        VId = 0;
        Mode = 'I';
        $("#txtStandMaster").val('');
        $("#AttachmentUpload").empty();
        $("#FileName").empty();
        $('#files1').val('');
        $('#files1').empty();
        $('#txtStandMaster').removeClass("error");
        $('#FileError').css('display', 'none');


        if (UserDetails.Language == "en") {
            $("#AlertTitleUpdate").text('Add Standard Master');
            $("#btnSubmit").val('Save');
        }
        else {
            $("#AlertTitleUpdate").text('標準マスターを追加します');
            $("#btnSubmit").val('セーブ');
        }


        $("#AddStandmasterModal").modal('show');
    }


}


function FileUpload(filedata, name, filesize) {
    var formData = new FormData();
    var file = filedata[0];
   
   
   
   
    formData.append('filedata', filedata.length == 0 ? "" : file);
    formData.append('standardname', $("#txtStandMaster").val());
    formData.append('userid', UserDetails.UserId);
    formData.append('mode', Mode);
    formData.append('token', Token);
    formData.append('plantid', $('#drpPlant').find(':selected').val());

    if (ExistID != 0) {
        formData.append('standardid', ExistID);
        formData.append('filename', filedata.length == 0 ? ExistsFileName : name);
        formData.append('fileguid', Existguid);
        formData.append('filesize', filedata.length == 1 ? fsize.toString() + " MB": Existssize );
    }
    else {
        var ids = guid();
        formData.append('standardid', 0);
        formData.append('filename', name);
        formData.append('fileguid', ids);
        formData.append('filesize', fsize.toString() + " MB");
    }
    var ApiFunc = '../Home/StandardMaster/';

    FilePostMethod(ApiFunc, formData, null, function (data) {
        var En_Message = '';
        var Jp_Message = '';
        var isValid;
     
        if (data != null && data != '') {

            if (data == "Inserted") {

               
                $('#AddStandmasterModal').modal('hide');
               
               
                En_Message = 'New Standard Reference inserted successfully';
                Jp_Message ='新しい標準参照が正常に挿入されました';
                isValid = true;
                filedata = '';
                name = "";
                filesize = [];
                fs = '';
                ExistsFileName = "";
                GetStandardMaster($('#drpPlant').find(':selected').val(),0);
            }
            else if (data == "Updated")
            {
                $('#AddStandmasterModal').modal('hide');


                En_Message = 'Standard Reference updated successfully';
                Jp_Message = '標準参照が正常に更新されました';
                isValid = true;
                filedata = '';
                name = "";
                filesize = [];
                fs = '';
                ExistsFileName = "";
                GetStandardMaster($('#drpPlant').find(':selected').val(), 0);
            }
            else if (data == "Exists")
            {
                
               
                En_Message = 'Standard Reference exists already with same name. Please use different name.';
                
                Jp_Message = '同じ名前の標準参照がすでに存在しています。別の名前を使用してください';
                    isValid = false;
                
            }
            else
            {
               
               
                    En_Message ='Error Uploading StandardMaster. Kindly contact administrator.';
                
                    Jp_Message ='スタンダードマスターのアップロード中にエラーが発生しました。管理者に連絡してください';
                isValid = false;
            }
            if (UserDetails.Language == "en") {
                $('#hTitle3').text(En_Message);
            }
            else {
                $('#hTitle3').text(Jp_Message);
            }
            $('#DynamicAlertModal').modal('show');

        }


    });
   
}
