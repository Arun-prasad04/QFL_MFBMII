var UserDetails;
var Api;
var Token;
var plantid;
var QgateId;
var ChecklistItemsAll;
var ModelNumber;
var Mode;
var CheckListItemStatus;
var VIN;
var blankChecklistItemId;
var QFLDefectPlaceItems = "";
var QFLCheckListItemId = "";
var QFLFeedbackSites = "";
var QFLFeedBackWorkflowId = "";
var VinIds;
var GateValid = "";
var GateName = "";
var CheckItemValue = "";
var filesdata = [];
var filedata = [];
var filecount=0;
var fileid=0;
var filesToUpload = [];
var Mfiles;
var En_Message;
var Jp_Message;

var IsSignature = "";
var disabled = "";
var signaturePath = "";
var OtherSite1 = "";
var OtherSite2 = "";
var OtherSite3 = "";
var OtherSite4 = "";
var OtherSite5 = "";
var OtherDamage = "";
var OtherDefectClass = "";
var QFLFeedbackSitesOther = "";
var StaticCheckListItemId = "";
var CheckListstatusItem = "";
var DefectStaticCheclist = "";
var DefectPlaceStaticItem = "";
var OtherMode = false;
var HandWrittenText = "";
var GetGateDetails = "";
var BindingBlankCheckItems = "";
var ClickNotOkItems = "";
var SelectedCheckListItemId = "";
var SelectedStaticCheckListItemId = "";
var OtherSiteCount = "";
var Reworkgateid
var ReExaminationgateid
var ReExaminationgateidjp
var QFLCheckListItemIdforskip="";
var QFLstaticCheckListItemIdforskip="";
var selectorlanguage;
var Slick = 0;
var NotOkCheck = "";
var ReExaminationgateidforPainting = 0;
var ReworkidforPainting
var ReExaminationGateIdvarient;
var ReworkLoadPendingcnt;



$(document).ready(function () {
    $("#sealgateheader").hide();
    $("#Completedbtn1").hide();
    $("#Completedbtn").hide();
   $("#EraseImageid").hide();

    $("#CompletedbtnForPainting").hide();
    $("#Completedbtn1ForPainting").hide();

    $("#Reworkgateheader").hide();
    $("#tblQFLFeedback").hide();

    selectorlanguage = "en"
    $("#LanguageModetxt").text("English");
    $("#LanguageModetxtDamage").text("English");

    $("#btnOtherClearidDamage").hide();

    $("#Signaturevalidation").text("");
    $("#LanguageChanger").hide();

    $("#liQFLFeedback").addClass("active");

    InitializeUrl();
    $("#webcameraPreviewdiv").hide();
    $('#txtVinQRNumber').keyup(function () {
		$(this).val($(this).val().toUpperCase());

		document.getElementById('txtVinQRNumber').addEventListener('input', function (e) {
			var target = e.target,
				position = target.selectionStart; // Capture initial position

			target.value = target.value.replace(/\s/g, '');  // This triggers the cursor to move.

			target.selectionEnd = position;    // Set the cursor back to the initial position.
		});
		
	});

	

    $('#feedback-search').on('click', function () {
     $("#stop").trigger("click");

$("#qr-reader").hide();
        $("#qr-reader-results").hide();
       
        var textbox = document.getElementById("txtVinQRNumber");
        if (textbox.value.length >= 5)
        {
            showloader();
            if ($('#drpPlant').find(':selected').val() == 0)
            {

                hideloader();
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
                
				
                GetLineIdDetails($('#drpPlant').find(':selected').val());
               
            }
            
        }
        else {

            if ($('#txtVinQRNumber').val() == '')
            {
                var validationsummary;
                validationsummary = validatefield($('#txtVinQRNumber'));
                return validationsummary;  
                
            }
            else
            {
                showloader();
                hideloader();
                En_Message = 'Invalid VIN. Please check VIN again! ' + $('#txtVinQRNumber').val();
                Jp_Message = '無効なVIN。もう一度VINを確認してください ' + $('#txtVinQRNumber').val();
           
            }
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en")
            {
                $('#hTitle3').text(En_Message);
            }
            else {
                $('#hTitle3').text(Jp_Message);
            }
           
        }
       
    });
    
    $("#btnSearch").click(function () {


        AfterPopUpConfirmation();
    })
    
    $("#btnCancelSearch").click(function () {
        $("#Confirmationpopup").modal('hide');
    })

    $("#btnSearchDelete").click(function () {

        ActualComment();
	})
	$("#btndeleteconfirmation").click(function () {

		ActualMode = '';

	})
	
    $("#btnCancelSearchDelete").click(function () {
        $("#DeleteConfirmationpopup").modal('hide');
    })

    $("#btncancel").click(function () {
        $("#files1").val('');
        $("#AttachmentUpload").empty();
        filesToUpload = [];

    })

    
    

    $("#btnSearchVin").click(function () {
        showloader();
        Mode = "Y";
        GetCheckListItems(UserDetails.PlantId, QgateId, Mode)
    })
    $("#btnCancelSearchVin").click(function () {

        $("#ConfirmationpopupVin").modal('hide');
    })

    $("#btnSubmit").click(function () {
        QFLCheckListItemId = "";
        QFLDefectPlaceItems = "";

        for (var i = 1; i <= 43; i++) {

            var className = $("#QFLDefectPlace_" + i).attr('class');
            var DefectPlaceid = $("#QFLDefectPlace_" + i).val();
            var defectPlaceName = $("#QFLDefectPlace_" + i).text();
            if (className == "btn feedback-input-buttons btn-block feedback-input-buttons-click") {

                if (QFLDefectPlaceItems != "") {
                    QFLDefectPlaceItems = QFLDefectPlaceItems + ","
                }

                if (QFLCheckListItemId != "") {
                    QFLCheckListItemId = QFLCheckListItemId + ","
                }


                if (StaticCheckListItemId == "" || StaticCheckListItemId == "0") {
                    StaticCheckListItemId = DefectPlaceStaticItem;
                }

                QFLDefectPlaceItems = QFLDefectPlaceItems + defectPlaceName;
                
                
                QFLCheckListItemId = QFLCheckListItemId + DefectPlaceid;

                if (QFLCheckListItemId != "") {
                    $("#DefectValidation").hide();

                }
            }
        }
        SelectedDefectPlace = QFLDefectPlaceItems

       


        $("#DefectValidation").text("");
        if (QFLCheckListItemId == "" && (StaticCheckListItemId == "" || StaticCheckListItemId == "0") ) {
            $("#DefectValidation").show();

            if (UserDetails.Language == "en") {
                $("#DefectValidation").text("Please click the Button");
            }
            else {
                $("#DefectValidation").text("ボタンをクリックしてください");
            }
            return false;
        }

       
          
       
        var json = {
            "checklistitemid": QFLCheckListItemId,
            "defectplace": QFLDefectPlaceItems,
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        };
        var Input = JSON.stringify(json);

        if (ClickNotOkItems == "NotOk") {
            var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
        }
        else {
            var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
        }
        PostMethod(ApiFunc, Input, Token, function (data) {


            var SiteValue = "";
            for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                if (data.listchecklistdefectitems[i].site1 != "") {
                    SiteValue = data.listchecklistdefectitems[i].site1;
                }

            }
         

            if(SiteValue=="")
            {
                $("#myModal").modal('hide');
              
                if (NotOkCheck == "NotOk") {
                    GetDamageDefectItems("Site 1")
                }
                else{
                    QFLFeeedBackSiteOtherPopup("Damage")
                }
              
            }
            else{

                if (NotOkCheck == "NotOk") {
                    QFLFeeedBackSitePopup(data);
                    $("#myModal2").modal('show');
                    $("#myModal").modal('hide');
                }
                else{
                    $("#myModal").modal('hide');
                    QFLFeeedBackSiteOtherPopup("Site1")
                }
 
            }

           
        });
    })

    $("#btnSubmit1").click(function () {

        $("#DefectSiteValidation").text("");
        if (QFLCheckListItemId == "" && StaticCheckListItemId=="") {
            $("#DefectSiteValidation").show();
            if (UserDetails.Language == "en") {
                $("#DefectSiteValidation").text("Please click the Button");
            }
            else {
                $("#DefectSiteValidation").text("ボタンをクリックしてください");
            }
            return false;
        }
        SelectedCheckListItemId = QFLCheckListItemId;
        SelectedStaticCheckListItemId = StaticCheckListItemId;
        var Site = QFLFeedbackSites;
       
            var json = {
                "checklistitemid": QFLCheckListItemId,
                "site1": QFLDefectPlaceItems,
                "vinid": VinIds,
                "qgateid": QgateId,
                "staticchecklistitemid": StaticCheckListItemId

            };

        var SiteValue = "";
        var Input = JSON.stringify(json);

        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
        
            PostMethod(ApiFunc, Input, Token, function (data) {
                if (data.listchecklistdefectitems.length <= 0) {
                    return false;
                }

                //CheckSiteValue("", 0, 0, 0, GateName,data);
               
                for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                    if (data.listchecklistdefectitems[i].site2 != "") {
                        SiteValue = data.listchecklistdefectitems[i].site2;
                    }

                }

                if (SiteValue != "") {
                    QFLFeeedBackSitePopup(data);
                    $("#myModalSite2").modal('show');
                    $("#myModal2").modal('hide');

                }
                else {
                    GetDamageDefectItems("Site 3");
                }
                
                
            });
        
       
    })

    $("#btnSubmit2").click(function () {

        if (UserDetails.UserId == 0) {
            Sessionout();
            return false;
        }

        
        $("#DefectClassValidation").text("");
        if (defectclassitem=="") {
            $("#DefectClassValidation").show();
            if (UserDetails.Language == "en") {
                $("#DefectClassValidation").text("Please click the Button");
            }
            else {
                $("#DefectClassValidation").text("ボタンをクリックしてください");
            }
          
            return false;
        }
        //DefectStaticCheclist= QFLFeedBackWorkflowId

        var json = {
            "vinid": VinIds,
            "qflworkflowid": DefectStaticCheclist,
            "site1": OtherSite1,
            "site2": OtherSite2,
            "site3": OtherSite3,
            "site4": OtherSite4,
            "site5": OtherSite5,
            "damage": OtherDamage,
            "defectclass": defectclassitem,
            "userid": UserDetails.UserId,
            "gateid": QgateId,
            "selectedchecklistitemid": SelectedCheckListItemId,
            "selectedstaticchecklistitemid": SelectedStaticCheckListItemId,
            "vinnumber": VIN,
            "defectplace": SelectedDefectPlace,
            "SiteSaveImage": OtherSiteSaveFilename,
            "uploadedFileName": uploadedFileName,
            "checklistitemid": QFLCheckListItemIdforskip,
            "StaticCheckListItemId": QFLstaticCheckListItemIdforskip,
            "ModelName": ModelNumber
                

        };
        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/InsertStaticCheckItems';
        PostMethod(ApiFunc, Input, Token, function (data) {

            $("#OtherDefectPopUp").modal('hide');
            $("#OtherDefectPopUpDamage").modal('hide');
            $("#myModalDefectClass").modal('hide');
            popuphidefunction();

            // Load up a new modal...

            $('#DynamicAlertModal').modal('show');
            showPopup3 = false;

            // $("#DynamicAlertModal").modal('show');

            if (UserDetails.Language == "en") {
                $('#hTitle3').text('New defect added to the check item.');
            }
            else {
                $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
            }
            ForcetoStopReworkComplete();
            GetCheckListItems(UserDetails.PlantId, QgateId, '')

        });
          
     
    });




    $("#btnSkipfordefectplace").click(function () {
       

 
        var json = {
            "checklistitemid": QFLCheckListItemIdforskip,
            "defectplace": QFLDefectPlaceItems,
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": QFLstaticCheckListItemIdforskip
        };
        var Input = JSON.stringify(json);

        if (ClickNotOkItems == "NotOk") {
            var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
        }
        else {
            var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
        }
        PostMethod(ApiFunc, Input, Token, function (data) {

            var SiteValue = "";
            for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                if (data.listchecklistdefectitems[i].site1 != "") {
                    SiteValue = data.listchecklistdefectitems[i].site1;
                }

            }


            if(SiteValue=="")
            {
                $("#myModal").modal('hide');
              
                if (NotOkCheck == "NotOk") {
                    GetDamageDefectItems("Site 1")
                }
                else{
                    QFLFeeedBackSiteOtherPopup("Damage")
                }
              
            }
            else{

                if (NotOkCheck == "NotOk") {
                    QFLFeeedBackSitePopup(data);
                    $("#myModal2").modal('show');
                    $("#myModal").modal('hide');
                }
                else{
                    $("#myModal").modal('hide');
                    QFLFeeedBackSiteOtherPopup("Site1")
                }
            }

        });
    })



    $('#bfile').click(function () {
        $("#files1").trigger("click");
    });


    if (window.File && window.FileList && window.FileReader) {
        $("#files1").on("change", function (e) {
           
			var files = $("#files1").get(0).files;
			//filedata = $("#files1").get(0).files;
		
			
			//CustomFileHandlingFunction(file);
			
			for (var i = 0; i < files.length; i++) {
				filesdata[filecount] = files[i];
				filecount++;
                
			}
			Mfiles = Mfiles + filedata;

            ///filedata = [];
           filename = [];
            var filesize = [];
            var content = [];
            var files;
            files = e.target.files,
                filesLength = files.length, loaded = 0;
            var filejson;
            var html = [];

            //LoaderShow();
            var i;
            for (i = 0; i < filesLength; i++) {
                var fileReader = new FileReader();
                var f;
                f = files[i];
                var fs = (f.size / 1024 / 1024).toFixed(2);
                var d = new Date();
                var getDateTime = (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '  ' +
                    d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());

                var deleteenable = 'none';
                var extt = f.name.replace(/^.*\./, '');
                var ext = extt.toLowerCase();
           

				if (ext == "xlsx" || ext == "pptx" || ext == "ppt" || ext == "xls" || ext == "csv" || ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "svg" || ext == "doc" || ext == "docx" || ext == "pdf" || ext == "mp4" || ext == "txt" || ext == "zip") {
                  //content.push('<span style="font-size: 12px; " id="' + fileid + '" class="trn label label-info ">' + f.name + ' <a onclick="deleteFile(\'' + fileid + '\',\'' + f.name + '\');" data-container="body" data-toggle="tooltip" data-placement="top" title="Delete"  type="button" class=" btn btn-danger rejectbtn btn-xs"><span class="glyphicon glyphicon-remove pull-right btn-group"></span></a></br></span>'); 
                    html += '<div class="col-md-6 mt-20" id="' + fileid + '" ><div class=" attachment-border"><div class="row"><div class="col-md-3 col-sm-3"><img alt="" class="img-responsive" src="../Images/' + CheckFileType(f.name) + '"> <p class="mbsize">'
                        + '<span> ' + fs.toString() + " MB" + '</span ></p >'
                        + '</div><div class="col-md-9 col-sm-9"><h4 class="overflow-attachment1"> ' + f.name + '</h4><p class="overflow-attachment2">' + UserDetails.UserName + ' </p>'
                        + '<label class="overflow-attachment3">' + getDateTime + '</label> <span class="pull-right btn-group"   onclick="deleteFile(\'' + fileid + '\',\'' + f.name + '\');"><i data-container="body" data-toggle="tooltip"  data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-trash"></span></i> </span>'
                        + '<span class="pull-right btn-group" onClick =""><i data-container="body"  disabled data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-save"></span></i> </span>'
                        + '</div></div></div></div>';
                     fileid++;
                    filename.push(f.name);
                    filesize.push(f.size);
                    fileReader.onload = (function (e) {
                        var file = e.target;
                        filedata.push(e.target.files);
                         loaded++;
                    
                    });
                   
                }
                else {


                    html += '<div class="col-md-6 mt-20" id="' + fileid + '" ><div class=" attachment-border"><div class="row"><div class="col-md-3 col-sm-3"><img alt="" class="img-responsive" src="../Images/' + CheckFileType(f.name) + '"> <p class="mbsize">'
                        + '<span> ' + fs.toString() + " MB" + '</span ></p >'
                        + '</div><div class="col-md-9 col-sm-9"><h4 class="overflow-attachment1"> ' + f.name + '</h4><p class="overflow-attachment2">' + UserDetails.UserName + ' </p>'
                        + '<label class="overflow-attachment3">' + getDateTime + '</label> <span class="pull-right btn-group"   onclick="deleteFile(\'' + fileid + '\',\'' + f.name + '\');"><i data-container="body" data-toggle="tooltip"  data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-trash"></span></i> </span>'
                        + '<span class="pull-right btn-group" onClick =""><i data-container="body"  disabled data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-save"></span></i> </span>'
                        + '</div></div></div></div>';
                       fileid++;
                    filename.push(f.name);
                    filesize.push(f.size);
                    fileReader.onload = (function (e) {
                        var file = e.target;
                        filedata.push(e.target.files);
                        loaded++;
                    });
                    //$('#hTitle3').empty();
                    //$('#DynamicAlertModal').modal('show');
                    //if (UserDetails.Language == 'en') {
                    //    $('#hTitle3').text('File Format Not Supported');

                    //}
                    //else {
                    //    $('#hTitle3').text('サポートされていないファイル形式');

                    //}
                   
                   



                }
            }
            //LoaderHide();
            
            $("#AttachmentUpload").append(html);
        });


    }
    else {
        $('#hTitle3').empty();
        $('#DynamicAlertModal').modal('show');
        $('#hTitle3').text('Your browser does not support to File API!..');

    }

    $("#Completedbtn").click(function () {

        if (UserDetails.UserId == 0) {
            Sessionout();
            return false;
        }

        if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") {
            GetCheckListItems(UserDetails.PlantId, QgateId, '')
        }


        $("#Signaturevalidation").text('');
        var canvas = document.getElementById("newSignature");
        canvasValidation= document.getElementById('newSignature');
      
        var context = canvas.getContext("2d");
        clearCanvas(context, canvasValidation);
        clearCanvas(context, canvas);

        canvasValidation=canvasValidation.toDataURL("image/png")

        var Signature;

        setTimeout(function () {
            if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") {
                if (ReworkLoadPendingcnt != "0") {
                    return false;
                }
            }
            $('#completed').modal('show');
        }, 1000);
        
       
        //$("#btnSinganature").trigger("click");
        //if (IsSignature == "Exists") {
        //    $("ExistingSignature").show();
        //    $("#Modelbody").removeClass("modal-bodySig1").addClass("modal-bodySig");

        //    var json = {
        //        "vinnumber": VIN,
        //        "gatename": GateName,
        //        "userid": UserDetails.UserId
        //    };
        //    var Input = JSON.stringify(json);

        //    var ApiFunc = Api + 'QFL.svc/GetSealGateDetails';
        //    PostMethod(ApiFunc, Input, Token, function (data) {

        //        if (data.listsealgate1 != null || data.listsealgate1 != "") {
        //            if (GateName == "Rework" || GateName == "Re-Examination") {
        //                Signature = data.listsealgate1;

        //            }
        //            else {
        //                Signature = data.listsealgate1.filter(function (x) { return x.gateid == QgateId; });

        //            }
        //        }
        //        //   $('#ExistingSignature').html('<img id="" src="../Signature/' + Signature[0].filename + '" width="300" />');

        //        $('#ExistingSignature').html('<img  id="" src="../Signature/' + Signature[0].filename + '" width="300" />');
        //        // $('#ExistingSignature').html('<img  id="" src="https://s365id1qf042.in365.corpintra.net/SignatureUat/' + Signature[0].filename + '" width="300" />');
        //    });


        //    if (UserDetails.Language == "en") {

        //        $('#SinganatureConfirmationMsg').text('Are you sure? Want to complete this VIN inspection in this Q-Gate?');
        //    }
        //    else {
        //        $('#SinganatureConfirmationMsg').text('本気ですか？このQ-GateでこのVIN検査を完了してみませんか？');

        //    }
        //    $('#SinganatureConfirmationpopup').modal('show');
        //}

        //else {
        //    $("#btnSinganature").trigger("click");
        //}

    })



    $("#Completedbtn1").click(function () {

        //$('#ExistingSignature').hide();
        var Signature;

        if (IsSignature == "Exists") {
            $("#Modelbody").removeClass("modal-bodySig").addClass("modal-bodySig1");
            $('#ExistingSignature').html('<img id="" src="" />');

            $("ExistingSignature").hide();

            if (UserDetails.Language == "en") {

                $('#SinganatureConfirmationMsg').text('Are you sure? Want to cancel the completion of Inspection in the Q-Gate?');
            }
            else {
                $('#SinganatureConfirmationMsg').text('本気ですか？ Q-Gateでの検査完了をキャンセルしたいですか？');

            }
            $('#SinganatureConfirmationpopup').modal('show');
        }
        else {
            $("#btnSinganature").trigger("click");
        }

    })

    $("#btnSinganature").click(function () {

        if (UserDetails.UserId == 0) {
            Sessionout();
            return false;
        }


        $('#SinganatureConfirmationpopup').modal('hide');

        document.getElementById('Completedbtn1').value = "";

        document.getElementById('Completedbtn').value = "Completed";

        $("#Completedbtn1").hide();
        $("#Completedbtn").show();
        document.getElementById("Qgateid_" + QgateId).style.backgroundColor = "";


       
            document.getElementById('Completedbtn1ForPainting').value = "";

            document.getElementById('CompletedbtnForPainting').value = "Completed";
        if (ReExaminationGateIdvarient == 3) {
            $("#Completedbtn1ForPainting").hide();
            $("#CompletedbtnForPainting").show();
        }
        



        var paintinggateName = "";

        if (ReExaminationGateIdvarient == 3) {
            if (GateName == "塗装 Rework") {
                paintinggateName = "Rework"

                var json = {
                    "filename": "",
                    "vinid": VinIds,
                    "userid": UserDetails.UserId,
                    "iscompleted": false,
                    "vinnumber": VIN,
                    "isreworkcompleted": false,
                    "isreexaminationcompleted": false,
                    "gatename": GateName,
                    "ModelName": ModelNumber

                };

            }
            else if (GateName == "塗装 Re-Examination") {
                paintinggateName = "Re-Examination"

                var json = {
                    "filename": "",
                    "vinid": VinIds,
                    "userid": UserDetails.UserId,
                    "iscompleted": false,
                    "vinnumber": VIN,
                    "isreworkcompleted": false,
                    "isreexaminationcompleted": false,
                    "gatename": GateName,
                    "ModelName": ModelNumber
                };
            }
                else
                {
                    var json = {
                        "filename": "",
                        "vinid": VinIds,
                        "userid": UserDetails.UserId,
                        "iscompleted": false,
                        "vinnumber": VIN,
                        "isreworkcompleted": false,
                        "isreexaminationcompleted": false,
                        "gatename": GateName,
                        "ModelName": ModelNumber
                    };
                }
        }

        else {

 


        if (GateName == "Rework") {
            var json = {
                "filename": "",
                "vinid": VinIds,
                "userid": UserDetails.UserId,
                "iscompleted": false,
                "vinnumber": VIN,
                "isreworkcompleted": false,
                "isreexaminationcompleted": false,
                "gatename": GateName,
                "ModelName": ModelNumber

            };
        }
        else if (GateName == "Re-Examination" ) {
            var json = {
                "filename": "",
                "vinid": VinIds,
                "userid": UserDetails.UserId,
                "iscompleted": false,
                "vinnumber": VIN,
                "isreworkcompleted": false,
                "isreexaminationcompleted": false,
                "gatename": GateName,
                "ModelName": ModelNumber
            };
        }

        else if (GateName == "Re-Examination1") {
            var json = {
                "filename": "",
                "vinid": VinIds,
                "userid": UserDetails.UserId,
                "iscompleted": false,
                "vinnumber": VIN,
                "isreworkcompleted": false,
                "isreexaminationcompleted": false,
                "gatename": GateName,
                "ModelName": ModelNumber
            };
        }

        else {
            var json = {
                "filename": "",
                "vinid": VinIds,
                "userid": UserDetails.UserId,
                "iscompleted": false,
                "vinnumber": VIN,
                "isreworkcompleted": false,
                "isreexaminationcompleted": false,
                "gatename": GateName,
                "ModelName": ModelNumber
            };
            }
        }

        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/InsertSignature';

        PostMethod(ApiFunc, Input, Token, function (data) {

            if (ReExaminationGateIdvarient == 3) {
                if (GateName == "塗装 Rework" || GateName == "塗装 Re-Examination") {
                    $('#VINCompletionDetailsForPainting').hide();

                    GetPaintingMasterDefectItems();
                }
                else {
                    BindindCheckItemImage();
                }
            }
            else {
                GetCheckListItems(UserDetails.PlantId, QgateId, Mode);

            }

        });





    })

 
})


function GetDamageDefectItems(Site) {

    if (Site == "Site 1") {
        var json = {
            "checklistitemid": QFLCheckListItemIdforskip,
            "site1": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": QFLstaticCheckListItemIdforskip
        };
    }


    else if (Site == "Site 2") {
        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site1": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        };
    }
    else  if (Site == "Site 3") {
        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site2": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        };
    }

    else if (Site == "Site 4") {
        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site3": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        };
    }

    else if (Site == "Site 5") {
        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site4": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        };
    }

    else if (Site == "Damage") {
        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site5": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        };
    }


    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.listchecklistdefectitems.length <= 0) {
            return false;
        }
        if (data.qflselectedname == "DefectClass") {
            $("#myModal2").modal('hide');
            //QFLFeeedBackDefectClassPopup(data)

        }
        else {
            QFLFeeedBackSitePopup(data);
            $("#myModalSite5").modal('hide');
            $("#myModalDamage").modal('show');
            $("#myModalSite4").modal('hide');
            $("#myModalSite3").modal('hide');
            $("#myModalSite2").modal('hide');
            $("#myModal2").modal('hide')
        }

    })
  }

function UpdateCheckItemsfromDamage()
{

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    $("#DefectSiteValidation").text("");
    if (QFLCheckListItemId == "" && StaticCheckListItemId == "") {
        $("#DefectSiteValidation").show();
        if (UserDetails.Language == "en") {
            $("#DefectSiteValidation").text("Please click the Button");
        }
        else {
            $("#DefectSiteValidation").text("ボタンをクリックしてください");
        }

        return false;
    }

    var json = {
        "checkitemstatus": 3,
        "qflfeedbackworkflowid": QFLFeedBackWorkflowId,
        "checklistitemid": QFLCheckListItemId,
        "gatename": GateName,
        "checkitemvalue": CheckItemValue,
        "userid": UserDetails.UserId,
        "staticchecklistitemid": StaticCheckListItemId,
        "vinnumber": VIN,
        "selecteddefectplace": SelectedDefectPlace,
        "uploadedFileName":uploadedFileName,
        "Vinid": VinIds,
        "ModelName": ModelNumber
    };

    var Input = JSON.stringify(json);

    if (ClickNotOkItems == "NotOk") {
        var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemsNotOk';
    }
    else {
        var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatus';
    }

    //var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatus';
    PostMethod(ApiFunc, Input, Token, function (data) {

        //$("#myModal2").modal('hide');
        popuphidefunction();
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('New defect added to the check item');
        }
        else {
            $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
        }
        ForcetoStopReworkComplete();
        GetCheckListItems(UserDetails.PlantId, QgateId, '')

    });
}

function deleteFile(fileidx,name)
{
	
	var fileName = name;


	filesToUpload[fileidx] = fileName;
	$('#' + fileidx).remove();
	
	//$(this).parent().remove();

   
    }

    



function ReloadUserDetails(newlanguage) {
    UserDetails.Language = newlanguage;
}

function InitializeUrl() {
    //LoaderShow();
    var ApiFunc = '../Home/PageLoadData/';
    JsonPostMethod(ApiFunc, '', '', function (data) {
        if (data != null && data != '') {
            //console.log(data)
            UserDetails = data;
            Api = UserDetails.Api;
            Token = UserDetails.Token;
            signaturePath = UserDetails.SiganturePath;
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
                        $("#feedback-search-content").show();
                        $("#qflfeedbacklabel").show();
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
                else {
                    $("#liProgressMonitor").hide();
                    $("#liQFLFeedback").hide()
                    $("#menuExtras").hide();
                    $("#limenuReports").hide();
                    $("#feedback-search-content").hide();
                    $("#qflfeedbacklabel").hide();
                 

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
            //alert("Session Expired");
            window.location.href = "Login";
        }
    });
}

function GetDropdownlistDetails() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


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

            MaintainPlantId(PlantId);

        }

        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());

            MaintainPlantId(PlantId);
            //GetCheckListItems(PlantId, QgateId);
        });

        if (UserDetails.Language == "") {
            $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val());
      
        }
        else {
            $('.Languagepicker').selectpicker('val', UserDetails.Language);
           
            Conversion($('.Languagepicker').val());}
        
    });
}
function BindingQGateList(data) {

    GetGateDetails = "";
    $("#GateDetailList").empty();
    var content = [];
    GetGateDetails = data;
    var Qgate = data.gatelist;
    if (Qgate == null || Qgate == "") {
        alert("This VIN and Model contains no Qgate")
        return false;
    }
    var OrderNo = 1;
    var GateCount = Qgate.length;
    GateCount = GateCount - 7;
  
    $.each(Qgate, function (i, GateList) {
       
        if (OrderNo == 1) {
            content.push('<div class=\"multiple feedback-gate gate-btn gate-active\" value="' + GateList.gatename + '" id="Qgateid_' + GateList.qgateid + '" onclick="CheckListItem(' + GateList.qgateid + ')">');
            QgateId = GateList.qgateid;
            GateName = GateList.gatename
            ReExaminationGateIdvarient = GateList.ReExaminationGateId

        }
        else {
            //if (GateList.gatename == "Rework" || GateList.gatename == "Re-Examination" || GateList.gatename == "Seal")
            //    content.push('<div class=\"multiple feedback-gate gate-btn\">');
            //else

            if(GateList.gatename=="Re-Examination")
            {
                content.push('<div class=\"multiple feedback-gate gate-btn\" value="' + "QG Re-Examination" + '" id="Qgateid_' + GateList.qgateid + '" onclick="CheckListItem(' + GateList.qgateid + ')">');

            }
            else  if(GateList.gatename=="Re-Examination1")
            {
                content.push('<div class=\"multiple feedback-gate gate-btn\" value="' + "完成 Re-Examination" + '" id="Qgateid_' + GateList.qgateid + '" onclick="CheckListItem(' + GateList.qgateid + ')">');

            }

            else{
                content.push('<div class=\"multiple feedback-gate gate-btn\" value="' + GateList.gatename + '" id="Qgateid_' + GateList.qgateid + '" onclick="CheckListItem(' + GateList.qgateid + ')">');

            }
            
        }
  
        content.push('<a  title="View" href="#" class=\"text-white\">');
        if(GateList.gatename=="Re-Examination")
        {
            content.push('<span class="trn">'+ "QG Re-Examination"+'</span>');
        }
       else if(GateList.gatename=="Re-Examination1")
        {
            content.push('<span class="trn">'+ "完成 Re-Examination" +'</span>');
        }
       else
        {
            content.push('<span class="trn">'+ GateList.gatename +'</span>');
        }
        content.push('</a>');
        
        content.push('</div>');
        OrderNo = 2;

        if (GateList.gatename == "Rework") {
            Reworkgateid = GateList.qgateid;
        }
        if (GateList.gatename == "Re-Examination") {
            ReExaminationgateid = GateList.qgateid;
        }
        if (GateList.gatename == "Re-Examination1") {
            ReExaminationgateidjp = GateList.qgateid;
        }

        if (GateList.gatename == "塗装 Rework") {
            ReworkidforPainting = GateList.qgateid;
        }
        if (GateList.gatename == "塗装 Re-Examination") {
            ReExaminationgateidforPainting = GateList.qgateid;
        }

    });

    
    $("#GateDetailList").append(content.join(''));

    $('#GateDetailList').translate({ lang: $('.Languagepicker').val(), t: dict });

    sliderInit(GateCount);
}

function sliderInit(GateCounts) {



    $('.one-time').slick({
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        slickqgates: GateCounts
    });
}

function CheckListItem(QgateIds) {
    
    checkItemMenu = "";
    showloader();
   
    $("#Completedbtn1").hide();
    $("#Completedbtn").hide();
    $("#EraseImageid").hide();
    $("#CompletedbtnForPainting").hide();
    $("#Completedbtn1ForPainting").hide();
    $("#appendCheckItemReworkImages").empty();
    $("#vinCompletetxtForPainting").text("");
    $(".Paintuploadimage").hide();

    QgateId = QgateIds;

    var ListGate = GetGateDetails.gatelist.filter(function (x) { return x.qgateid == QgateId; });
    var GName = ListGate[0].gatename;
    ReExaminationGateIdvarient = ListGate[0].ReExaminationGateId;

    GateName = GName;
    if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Seal" || GateName == "Re-Examination1") {
        $("#Completedbtn").hide();
        $("#Completedbtn1").hide();
    }
    else {
        //$("#Completedbtn").show();
        //$("#Completedbtn1").show();

        $("#Completedbtn").hide();
        $("#Completedbtn1").hide();
    }

    if (GateName == "Seal") {
        $("#appendCheckItemImage").empty();
        $('#VINCompletionDetails').hide();

        GetSealGateItems();
        hideloader();
    }
    else if (GateName == "塗装 Rework")
    {

        $("#appendCheckItemImage").empty();
        $("#cloned").empty();
        $("#PaintingMastertable").show();
        $("#BindingSealGate").empty();
        $("#tblQFLFeedbackRework_wrapper").hide();
        $("#checklistitemstatusid").hide();
        $("#PaintingReworkgateheader").show();

        //$("#PaintingReworkgateheader").show();
        //$("#tblQFLFeedbackReworkPainting").show();
        $('#CompletedbtnForPainting').prop('disabled', true);

        $("#tblQFLFeedbackRework").hide();
        $("#tblQFLFeedbackReExamination").hide();
       // $("#tblQFLFeedbackSeal").hide();
        $("#tblQFLFeedback").hide();
        BindingLineAPI(UserDetails.PlantId)

        GetPaintingMasterDefectItems()

    }

    else if (GateName == "塗装 Re-Examination") {
        $("#appendCheckItemImage").empty();

        $("#cloned").empty();
        $("#PaintingMastertable").show();
        $("#tblQFLFeedbackRework_wrapper").hide();
        $("#checklistitemstatusid").hide();
        $("#PaintingReExamgateheader").show();
        $("#BindingSealGate").empty();
        $('#CompletedbtnForPainting').prop('disabled', true);

        //$("#PaintingReworkgateheader").show();
        //$("#tblQFLFeedbackReworkPainting").show();


        $("#tblQFLFeedbackRework").hide();
        $("#tblQFLFeedbackReExamination").hide();
       // $("#tblQFLFeedbackSeal").hide();
        $("#tblQFLFeedback").hide();
        BindingLineAPI(UserDetails.PlantId)

        GetPaintingMasterDefectItems()

    }


    else {


        var className = $("#btntabtotal").attr('class');

        className = $("#btntabtotal").attr('class');
        if (className == "check-status feedback-check-item2 check-item-btn") {


            $("#btntabtotal").removeClass("check-status feedback-check-item2 check-item-btn").addClass("check-status feedback-check-item2 check-item-btn check-active");
            $("#btntabOk").removeClass("check-status feedback-check-item2 check-item-btn check-active").addClass("check-status feedback-check-item2 check-item-btn");
            $("#btntabNotOk").removeClass("check-status feedback-check-item2 check-item-btn check-active").addClass("check-status feedback-check-item2 check-item-btn");
            $("#btntabSkipped").removeClass("check-status feedback-check-item2 check-item-btn check-active").addClass("check-status feedback-check-item2 check-item-btn");
            $("#btntabPending").removeClass("check-status feedback-check-item2 check-item-btn check-active").addClass("check-status feedback-check-item2 check-item-btn");

            CheckListstatusItem = "Total";

        }

        if (ReExaminationGateIdvarient == 3) {
            $("#BindingSealGate").empty();

            $("#cloned").empty();
            $("#output").empty();
            $("#EraseImageid").attr("src", UserDetails.PaintingImagePath + "EraseImage.png");
            $("#PaintingReworkgateheader").hide();
            $("#PaintingReExamgateheader").hide();
            $("#Completedbtn").show();
            $("#screenshot").show();
            $("#EraseImageid").show();
            $('#CompletedbtnForPainting').prop('disabled', false);
            $(".Paintuploadimage").show();


            EraseClick = "";
            glbtakeshot = 0;
          
            GetQGCheckItemImage();
        }
        else {



            $("#appendCheckItemImage").empty();
            $("#cloned").empty();
            $("#tblQFLFeedbackReExamPainting").hide();
            $("#tblQFLFeedbackReExamPainting_wrapper").hide();
            
            GetCheckListItems(UserDetails.PlantId, QgateId);

        }
       
    }


}

var GBLLineId = 0;
function GetLineIdDetails(PlantId) {
    var json = {
        "plantid": PlantId
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetGateDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        LineDetails = data.linemasterdetails;
        count = data.linemasterdetails.length;
        var LineDdta
        isValid = false;
        $.each(LineDetails, function (i, Line) {
            position = Line.characterposition - 1;
            value = Line.charactervalue;
            var str = $('#txtVinQRNumber').val();
            var n = str.indexOf(value);
            if (position == n) {
                LineDdta = LineDetails.filter(function (x) { return x.charactervalue == value; });
                VIN = str.substring(0, position);
                ModelNumber = str.substring(position, str.length);
                var num = $.isNumeric(VIN)
                if (num) {
                    isValid = true;
                }
                else {
                    isValid = false;
                }
                $('#selectedvin').text(VIN);
                $('#selectedmodel').text(ModelNumber);
                $('#selectedline').text(LineDdta[0].linename);

            }
            else {
              
                if (value != "M" && value != "B" && isValid == false) {
                    LineDdta = LineDetails.filter(function (x) { return x.charactervalue == value; });
                    var str = $('#txtVinQRNumber').val();
                
                    var n = str.indexOf("C");
                    VIN = str.substring(0, 6);
                    ModelNumber = str.substring(6, str.length);
                    isValid = true;
                    $('#selectedvin').text(VIN);
                    $('#selectedmodel').text(ModelNumber);
                    $('#selectedline').text(LineDdta[0].linename);
                }
            }
        });
		if (!isValid)
		{
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                hideloader();
                $('#hTitle3').text('Invalid VIN. Please check VIN again....! ' + $('#txtVinQRNumber').val());
            }
            else {
                $('#hTitle3').text('無効なVIN。もう一度VINを確認してください ...! ' + $('#txtVinQRNumber').val());
            }
        }
        else if (isValid) {
            GBLLineId = LineDdta[0].lineid;
            
            var json = {
                "lineid": LineDdta[0].lineid,
            };
            var Input = JSON.stringify(json);

            var ApiFunc = Api + 'QFL.svc/GetGateListDetails';
            PostMethod(ApiFunc, Input, Token, function (data) {
                // alert(GateValid)

                //BindingQGateList(data)
                BindGateDetails = data;
                //BindingQGateList(BindGateDetails);
            });
            AfterPopUpConfirmation();
            //$("#Confirmationpopup").modal('show');
           
            if (UserDetails.Language == "en") {
                $('#ConfirmationMessage').text('Are you want to Search the VIN No :' + $('#txtVinQRNumber').val() + ' ?');
            }

            else {
                $('#ConfirmationMessage').text('VIN番号を検索しますか');
            }

            
            var json = {
                "vinnumber": VIN,
                "gatename": null,
                "userid": UserDetails.UserId,
                "ModelName": ModelNumber
            };
            var Input = JSON.stringify(json);

            var ApiFunc = Api + 'QFL.svc/GetSealGateDetails';
            PostMethod(ApiFunc, Input, Token, function (data) {
                var CompletedGate = data.listsealgate;
                $.each(CompletedGate, function (i, CompletedGates) {
                    if (CompletedGates.gateid != 0) {
                        document.getElementById("Qgateid_" + CompletedGates.gateid).style.backgroundColor = "darkgreen";

                    }
                });

            });

           
        }
    });
}
function AfterPopUpConfirmation() {
    
    var json = {
        "vinnumber": VIN,
        "modelnumber": ModelNumber
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/CheckVaildVin';
    PostMethod(ApiFunc, Input, Token, function (data)
    {
        $("#Confirmationpopup").modal('hide');
        if (data.result == "SAME_VEHICLE_TYPE")
        {
            GateValid = "Ok";
            BindingQGateList(BindGateDetails);
            if (ReExaminationGateIdvarient == 3) {
              
                $("#EraseImageid").show();

                $('#feedback-search-content').hide();
                $("#webcameraPreviewdiv").hide();
                $('#feedback-details').css('visibility', 'visible');
                $("#SelectedItems").show();
                $("#PaintingReworkgateheader").hide();
                $("#PaintingReExamgateheader").hide();

                GetQGCheckItemImage();
            }
            else {



                showloader();
                GateValid = "Ok";
                $("#SelectedItems").show();
                $('#feedback-search-content').hide();
                $('#feedback-details').css('visibility', 'visible');
                GetCheckListItems(UserDetails.PlantId, QgateId);
                $("#CompletedbtnForPainting").hide();
                $("#Completedbtn1ForPainting").hide();
            }
        }
        else if (data.result == "DIFFERENT_VEHICLE_TYPE")
        {
            hideloader();
           
            $("#GateDetailList").empty();
            $("#DynamicAlertModal").modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('This VIN has been already with different vehicle type/Model.Please Check the VIN again..' + $('#txtVinQRNumber').val());
            }
            else {
                $('#hTitle3').text('このVINはすでに別の車両タイプ / モデルになっています。もう一度VINを確認してください');
            }
        }
        else if (data.result == "NEWVIN") {
            GateValid = "Ok";
            Slick = 0;
            showloader();
            BindingQGateList(BindGateDetails);

            if (ReExaminationGateIdvarient == 3) {
              

                $('#feedback-search-content').hide();
                $("#webcameraPreviewdiv").hide();
                $('#feedback-details').css('visibility', 'visible');
                $("#SelectedItems").show();

                $("#PaintingReworkgateheader").hide();
                $("#PaintingReExamgateheader").hide();

                GetQGCheckItemImage();
            }

            else {

                $("#CompletedbtnForPainting").hide();
                $("#Completedbtn1ForPainting").hide();


                $("#SelectedItems").show();
                //$("#DynamicAlertModal").modal('show');
                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('This VIN has been NEWVIN.. ' + $('#txtVinQRNumber').val());

                    $('#feedback-search-content').hide();
                    $("#webcameraPreviewdiv").hide();
                    $('#feedback-details').css('visibility', 'visible');
                   
                    GetCheckListItems(UserDetails.PlantId, QgateId);
                }
                else {
                    $('#hTitle3').text('VIN番号を検索しますか');
                    $('#feedback-search-content').hide();
                    $("#webcameraPreviewdiv").hide();
                    $('#feedback-details').css('visibility', 'visible');

                    GetCheckListItems(UserDetails.PlantId, QgateId);
                }
            }
        }
        else if (data.result == "INVAILDMODEL") {
            $("#GateDetailList").empty();
            hideloader();
            $("#DynamicAlertModal").modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Specified Model is not available in masters. Please check.' + $('#txtVinQRNumber').val());
                //$('#feedback-search-content').hide();
                $("#webcameraPreviewdiv").hide();

                //GetCheckListItems(UserDetails.PlantId, QgateId);
            }
            else {
                $('#hTitle3').text('指定されたモデルはマスターでは使用できません。チェックしてください.' + $('#txtVinQRNumber').val());
            }
        }
    });
}


var IsReExamSignature;
function BindingCheckListItems(data, CheckListstatus) {
    if (CheckListstatus == undefined) {
        $("#spOkCount").text(0);
        $("#spNotOkCount").text(0);
        $("#spSkippedCount").text(0);
        $("#spPendingCount").text(0);
        $("#spTotalCount").text(0);

    }


    $("#Checkitemtables").show();
    $("#PaintingMastertable").hide();
    $("#PaintingReworkgateheader").hide();
    $("#PaintingReExamgateheader").hide();
    $("#tblQFLFeedbackReworkPainting").hide();
    $("#tblQFLFeedbackReworkPainting_wrapper").hide();
    $("#tblQFLFeedbackReExamPainting").hide();
    $("#tblQFLFeedbackReExamPainting_wrapper").hide();

    //if(GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1")
    //{
    //  //  $('#notokImageappend').prepend('<img style="height:100px" id="" src="' + UserDetails.SignatureSitePath+ SealGateItems.filename + '" />')

    //}

    if (GateName == "Rework" ) {
        $("#defectforrework").show();
        $("#Reworkgateheader").show();
        $("#defectStandardrework").hide();
        $("#defectActualrework").hide();
        $("#maingateheader").hide();
        $("#tblQFLFeedbackRework").show();
        $("#tblQFLFeedback").hide();
        $("#tblQFLFeedback_wrapper").hide();
        $("#tblQFLFeedbackRework_info").hide();
        $("#tblQFLFeedbackRework_paginate").hide();

        $("#tblQFLFeedbackRework_wrapper").show();
      
        $("#tblQFLFeedbackReExamination_wrapper").hide();
        
        
        $("#ReExaminationgateheader").hide();
        $("#tblQFLFeedbackReExamination").hide();
    }


   else if ( GateName == "Re-Examination" || GateName == "Re-Examination1") {
       
        $("#Reworkgateheader").hide();
        $("#defectStandardrework").hide();
        $("#defectActualrework").hide();
        $("#maingateheader").hide();
        $("#tblQFLFeedbackRework").hide();
        $("#tblQFLFeedback").hide();
        $("#tblQFLFeedback_wrapper").hide();
        $("#tblQFLFeedbackRework_info").hide();
        $("#tblQFLFeedbackRework_paginate").hide();
        $("#ReExaminationgateheader").show();
        $("#tblQFLFeedbackReExamination").show();

        $("#tblQFLFeedbackRework_wrapper").hide();

        $("#tblQFLFeedbackReExamination_wrapper").show();

        
        
    }

    else {
        $("#defectforrework").hide();
        $("#Reworkgateheader").hide();
        $("#defectStandardrework").show();
        $("#defectActualrework").show();
        $("#maingateheader").show();
        $("#tblQFLFeedbackRework").hide();
        $("#tblQFLFeedback").show();
        $("#tblQFLFeedbackRework_wrapper").hide();

        $("#tblQFLFeedbackReExamination_wrapper").hide();
        

        //("#tblQFLFeedbackReExamination_wrapper").hide();
        //$("#tblQFLFeedbackReExamination_paginate").hide();
        
       
        $("#ReExaminationgateheader").hide();
        $("#tblQFLFeedbackReExamination").hide();

        $("#tblQFLFeedback_wrapper").show();
    }

   

    $("#sealgateheader").hide();
    $("#BindingSealGate").empty();
    //$("#tblQFLFeedback_paginate").empty();
    
    $("#checklistitemstatusid").show();
    //$("#maingateheader").show();
     disabled = "";
    ChecklistItemsAll = "";
    var CheckListItems = "";
    var checkListStatus = "";
    IsSignature = data.issignature;
    if (data.result == "Not Exists") {
        disabled = "disabled";
        data="";
    }
    BindingBlankCheckItems = data.blankcheckitems;
    CheckListstatus = CheckListstatusItem;
    var content = [];
    $("#BindingCheckListItems").empty();
    ChecklistItemsAll = data;
    var CheckListItems = data.listofchecklistitems;
    var checkListStatus = data.checkListStatus
    var Okcnt = 0;
    var Skipcnt = 0;
    var NotOkcnt = 0;
    var pendingcnt = 0;
    IsReExamSignature = data.isreexamsignature;


    if (data != "") {
        ChecklistItemsAll = data;
        CheckListItems = data.listofchecklistitems;
        checkListStatus = data.checkliststatus;
        
    }
    if (data.listofchecklistitems == undefined || data == "" || data.listofchecklistitems.length==0) {
        $('#vinCompletetxt').text("");
        
        $('#tblQFLFeedback').css('dispaly', '');
        $('#tblQFLFeedback').dataTable().fnClearTable();
        $('.dataTables_empty').text("");

        $('#BindingCheckListItems').empty();
        $('#BindingCheckListItems').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');

        if (GateName == "Rework") {

            $('#tblQFLFeedbackRework').css('dispaly', '');
            $('#tblQFLFeedbackRework').dataTable().fnClearTable();
            $("#tblQFLFeedback_wrapper").hide();

            $('.dataTables_empty').text("");

            $('#BindingCheckListItemsRework').empty();
            $('#BindingCheckListItemsRework').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');
            $('#tblQFLFeedbackRework_info').show();
            $('#tblQFLFeedbackRework_paginate').show();
        }

        if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

            $('#tblQFLFeedbackReExamination').css('dispaly', '');
            $('#tblQFLFeedbackReExamination').dataTable().fnClearTable();
            $('.dataTables_empty').text("");
            $("#tblQFLFeedback_wrapper").hide();


            $('#BindingCheckListItemsReExam').empty();
            $('#BindingCheckListItemsReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');


            if (GateName == "Re-Examination") {



                $('#Completedbtn').prop('disabled', true);
                    if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") {

                        if (GateName == "Re-Examination") {
                            if (IsReExamSignature == true) {
                                $('#Completedbtn').prop('disabled', false);


                                if (data.isreexaminationcompleted == true) {
                                    $("#Completedbtn1").show();
                                    $("#SealGateRemovefoot").show();

                                    $("#Completedbtn1").val("Revert Completion");
                                    $("#Completedbtn").val("");

                                    $('#Completedbtn1').prop('disabled', false);

                                    $('#VINCompletionDetails').show();
                                    $("#Completedbtn").hide();

                                }

                                else {
                                    $("#Completedbtn").val("Completed");
                                    $("#Completedbtn1").val("");
                                    $("#Completedbtn").show();
                                    $("#SealGateRemovefoot").show();

                                    $('#Completedbtn').prop('disabled', false);

                                    $("#Completedbtn1").hide();
                                    $('#VINCompletionDetails').hide();
                                }
                            }
                            else {
                                $("#Completedbtn").show();

                            }

                        }
                    }

              

            }
            else if (GateName == "Re-Examination1") {



                $('#Completedbtn').prop('disabled', true);
                        if (IsReExamSignature == true) {
                            $('#Completedbtn').prop('disabled', false);


                            if (data.isreexaminationcompletedjp == true) {
                                $("#Completedbtn1").show();
                                $("#SealGateRemovefoot").show();

                                $("#Completedbtn1").val("Revert Completion");
                                $("#Completedbtn").val("");

                                $('#Completedbtn1').prop('disabled', false);

                                $('#VINCompletionDetails').show();
                                $("#Completedbtn").hide();

                            }

                            else {
                                $("#Completedbtn").val("Completed");
                                $("#Completedbtn1").val("");
                                $("#Completedbtn").show();
                                $("#SealGateRemovefoot").show();

                                $('#Completedbtn').prop('disabled', false);

                                $("#Completedbtn1").hide();
                                $('#VINCompletionDetails').hide();
                            }
                        }
                        else {
                            $("#Completedbtn").show();

                        }

                    
                



            }

        }
        return false;
       

    }


   
    if (GateName == "Rework") {
        if (data.isreworkcompleted == true) {

            $("#Completedbtn1").val("Revert Completion");
            $("#Completedbtn").val("");
            $("#Completedbtn1").show();
            $('#VINCompletionDetails').show();
            $("#SealGateRemovefoot").show();
            $("#Completedbtn").hide();
            disabled = "disabled";
        }

        else {
            $("#Completedbtn").val("Completed");
            $("#Completedbtn1").val("");
            $("#Completedbtn").show();
            $("#SealGateRemovefoot").show();
            $("#Completedbtn1").hide();
            $('#VINCompletionDetails').hide();
        }
        if (data.listofchecklistitems == null || data.listofchecklistitems == undefined) {
          
                $('#BindingCheckListItemsRework').empty();
                $('#BindingCheckListItemsRework').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>')
           
            hideloader();
            return false;
        }
    }
    else if (GateName == "Re-Examination" || GateName == "Re-Examination1") {
        
        if (GateName == "Re-Examination")
        {
            if (data.isreexaminationcompleted == true) {

                $("#Completedbtn1").val("Revert Completion");
                $("#Completedbtn").val("");
                $("#Completedbtn1").show();
                $("#SealGateRemovefoot").show();
                $('#VINCompletionDetails').show();
                $("#Completedbtn").hide();
                disabled = "disabled";
            }

            else {
                $("#Completedbtn").val("Completed");
                $("#Completedbtn1").val("");
                $("#Completedbtn").show();
                $("#SealGateRemovefoot").show();
                $("#Completedbtn1").hide();
                $('#VINCompletionDetails').hide();
            }

        }
        else  if (GateName == "Re-Examination1")
        {
            if (data.isreexaminationcompletedjp == true) {

                $("#Completedbtn1").val("Revert Completion");
                $("#Completedbtn").val("");
                $("#Completedbtn1").show();
                $("#SealGateRemovefoot").show();
                $('#VINCompletionDetails').show();
                $("#Completedbtn").hide();
                disabled = "disabled";
            }

            else {
                $("#Completedbtn").val("Completed");
                $("#Completedbtn1").val("");
                $("#Completedbtn").show();
                $("#SealGateRemovefoot").show();
                $("#Completedbtn1").hide();
                $('#VINCompletionDetails').hide();
            }

        }
        
            if (data.listofchecklistitems == null || data.listofchecklistitems == undefined) {

                $('#BindingCheckListItemsReExam').empty();
                $('#BindingCheckListItemsReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');
           
            hideloader();
            return false;
        }
    }
    else {
        if (data.iscompleted == true) {

            $("#Completedbtn1").val("Revert Completion");
            $("#Completedbtn").val("");
            $("#SealGateRemovefoot").show();
            $("#Completedbtn1").show();
            $('#VINCompletionDetails').show();
            $("#Completedbtn").hide();
            disabled = "disabled";
        }

        else {
            $("#Completedbtn").val("Completed");
            $("#Completedbtn1").val("");
            $("#SealGateRemovefoot").show();
            $("#Completedbtn").show();
            $("#Completedbtn1").hide();
            $('#VINCompletionDetails').hide();
        }
    }
    



    if ( GateName == "Seal") {
        $("#Completedbtn").hide();
        $("#Completedbtn1").hide();
    }

    

    //var spTotalCount = CheckListItems.length;
    var spOkCount = CheckListItems.filter(function (x) { return x.checklistitemname =="Ok"; });
    var spNotOkCount = CheckListItems.filter(function (x) { return x.checklistitemname == "NotOk"; });
    var spSkippedCount = CheckListItems.filter(function (x) { return x.checklistitemname == "Skip"; });
    var spPendingCount = CheckListItems.filter(function (x) { return x.checklistitemname == "Pending"; });

  

    if (CheckListstatus == "Ok") {
        CheckListItems = spOkCount;
    }
    else if (CheckListstatus == "Pending") {
        CheckListItems = spPendingCount;
    }
    else if (CheckListstatus == "NotOk") {
        CheckListItems = spNotOkCount
    }

    else if (CheckListstatus == "Skipped") {
        CheckListItems = spSkippedCount;
    }

    var spOkCount = checkListStatus.filter(function (x) { return x.checkliststatus == "Ok"; });
    var spNotOkCount = checkListStatus.filter(function (x) { return x.checkliststatus == "NotOk"; });
    var spSkippedCount = checkListStatus.filter(function (x) { return x.checkliststatus == "Skip"; });
    var spPendingCount = checkListStatus.filter(function (x) { return x.checkliststatus == "Pending"; });
    
    var Sptotal = 0;
   
    $("#spOkCount").text(0);
    $("#spNotOkCount").text(0);
    $("#spSkippedCount").text(0);
    $("#spPendingCount").text(0);
    $("#spTotalCount").text(0);
   
    if (spOkCount.length > 0) {
        $("#spOkCount").text(spOkCount[0].count);
        Sptotal = spOkCount[0].count;
        Okcnt = spOkCount[0].count;
    }
    if (spNotOkCount.length > 0) {
        $("#spNotOkCount").text(spNotOkCount[0].count);
        Sptotal = Sptotal + spNotOkCount[0].count;
        NotOkcnt=spNotOkCount[0].count;
    }
    if (spSkippedCount.length > 0) {
        $("#spSkippedCount").text(spSkippedCount[0].count);
        Sptotal = Sptotal + spSkippedCount[0].count;
        Skipcnt = spSkippedCount[0].count;
    }
    if (spPendingCount.length > 0) {
        $("#spPendingCount").text(spPendingCount[0].count);
        Sptotal = Sptotal + spPendingCount[0].count;
        pendingcnt = spPendingCount[0].count;
    }
    if (Sptotal>0) {
        $("#spTotalCount").text(Sptotal);

    }
    $('#Completedbtn').prop('disabled', true);
    if (Sptotal > 0) {
       
        
        var OkSkipNotOkcount = Okcnt + Skipcnt + NotOkcnt;
       
        if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") {

            if (GateName == "Re-Examination" || GateName == "Re-Examination1") {
                if (Okcnt == Sptotal && IsReExamSignature == true) {
                    $('#Completedbtn').prop('disabled', false);
                }
               
            }
            else {
                if (Okcnt == Sptotal) {
                    $('#Completedbtn').prop('disabled', false);
                }
            }


        }
        else {
            if (OkSkipNotOkcount == Sptotal) {
                $('#Completedbtn').prop('disabled', false);
            }

        }

       
    }


    if (CheckListstatus == "Ok" && Okcnt == "0") {


        $('#tblQFLFeedback').css('dispaly', '');
        $('#tblQFLFeedback').dataTable().fnClearTable();
        $('#vinCompletetxt').text("");
        $('.dataTables_empty').text("");
        $('#BindingCheckListItems').empty();
        $('#BindingCheckListItems').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');

        if (GateName == "Rework") {

            $('#tblQFLFeedbackRework').css('dispaly', '');
            $('#tblQFLFeedbackRework').dataTable().fnClearTable();
            $('.dataTables_empty').text("");
            $("#tblQFLFeedback_wrapper").hide();

            $('#BindingCheckListItemsRework').empty();
            $('#BindingCheckListItemsRework').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');
            $('#tblQFLFeedbackRework_info').show();
            $('#tblQFLFeedbackRework_paginate').show();
        }

        if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

            $('#tblQFLFeedbackReExamination').css('dispaly', '');
            $('#tblQFLFeedbackReExamination').dataTable().fnClearTable();
            $('.dataTables_empty').text("");
            $("#tblQFLFeedback_wrapper").hide();


            $('#BindingCheckListItemsReExam').empty();
            $('#BindingCheckListItemsReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');
            
            
        }


            return false;
    }
    else if (CheckListstatus == "NotOk" && NotOkcnt == "0") {


       
       
            $('#tblQFLFeedback').css('dispaly', '');
            $('#tblQFLFeedback').dataTable().fnClearTable();
            $('#vinCompletetxt').text("");
            $('.dataTables_empty').text("");

            $('#BindingCheckListItems').empty();
            $('#BindingCheckListItems').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');

            if (GateName == "Rework") {

                $('#tblQFLFeedbackRework').css('dispaly', '');
                $('#tblQFLFeedbackRework').dataTable().fnClearTable();
                $('.dataTables_empty').text("");
                $("#tblQFLFeedback_wrapper").hide();

                $('#BindingCheckListItemsRework').empty();
                $('#BindingCheckListItemsRework').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');
                $('#tblQFLFeedbackRework_info').show();
                $('#tblQFLFeedbackRework_paginate').show();
            }

            if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

                $('#tblQFLFeedbackReExamination').css('dispaly', '');
                $('#tblQFLFeedbackReExamination').dataTable().fnClearTable();
                $('.dataTables_empty').text("");
                $("#tblQFLFeedback_wrapper").hide();


                $('#BindingCheckListItemsReExam').empty();
                $('#BindingCheckListItemsReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');
            
            
            }
            
            return false;
    }

    else if (CheckListstatus == "Skipped" && Skipcnt == "0") {

       

        

            $('#tblQFLFeedback').css('dispaly', '');
            $('#tblQFLFeedback').dataTable().fnClearTable();
            $('#vinCompletetxt').text("");
            $('.dataTables_empty').text("");

            $('#BindingCheckListItems').empty();
            $('#BindingCheckListItems').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');

            if (GateName == "Rework") {

                $('#tblQFLFeedbackRework').css('dispaly', '');
                $('#tblQFLFeedbackRework').dataTable().fnClearTable();
                $('.dataTables_empty').text("");
                $("#tblQFLFeedback_wrapper").hide();

                $('#BindingCheckListItemsRework').empty();
                $('#BindingCheckListItemsRework').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');
                $('#tblQFLFeedbackRework_info').show();
                $('#tblQFLFeedbackRework_paginate').show();
            }

            if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

                $('#tblQFLFeedbackReExamination').css('dispaly', '');
                $('#tblQFLFeedbackReExamination').dataTable().fnClearTable();
                $('.dataTables_empty').text("");
                $("#tblQFLFeedback_wrapper").hide();


                $('#BindingCheckListItemsReExam').empty();
                $('#BindingCheckListItemsReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');
            
            
            }

            return false;
    }

    else if (CheckListstatus == "Pending" && pendingcnt == "0") {

        $('#tblQFLFeedback').css('dispaly', '');
        $('#tblQFLFeedback').dataTable().fnClearTable();
        $('#vinCompletetxt').text("");
        $('.dataTables_empty').text("");

        $('#BindingCheckListItems').empty();
        $('#BindingCheckListItems').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');

        if (GateName == "Rework") {

            $('#tblQFLFeedbackRework').css('dispaly', '');
            $('#tblQFLFeedbackRework').dataTable().fnClearTable();
            $("#tblQFLFeedback_wrapper").hide();

            $('.dataTables_empty').text("");

            $('#BindingCheckListItemsRework').empty();
            $('#BindingCheckListItemsRework').append('<span class="" style="padding-left: 594px";> No Checkitems found </span>');
            $('#tblQFLFeedbackRework_info').show();
            $('#tblQFLFeedbackRework_paginate').show();
        }

        if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

            $('#tblQFLFeedbackReExamination').css('dispaly', '');
            $('#tblQFLFeedbackReExamination').dataTable().fnClearTable();
            $("#tblQFLFeedback_wrapper").hide();

            $('.dataTables_empty').text("");


            $('#BindingCheckListItemsReExam').empty();
            $('#BindingCheckListItemsReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

            
        }
            return false;
    }

    //CheckListItems = CheckListItems.filter(function (x) { return x.qgateid == QgateId; });

  
    if (CheckListItems != null || CheckListItems != "") {
		var Sno;
        $('#tblQFLFeedback').css('dispaly', '');
        $('#tblQFLFeedback').dataTable().fnClearTable();
        $("#tblQFLFeedback_wrapper").hide();

        Bindingtable(CheckListItems, data.iscompleted, data);

      
    }
    if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") {
        ReworkLoadPendingcnt = $("#spPendingCount").text();
    }
}

function Bindingtable(data, iscompleted, datas) {

   if(GateName == "Rework")
    {
       $('#tblQFLFeedbackRework').DataTable({
            data: data,
            "columns": [
                { "data": "GateName" },
               { "data": "inspectionitem" },
               { "data": "checklistitemname" },
               { "data": "ReworkModifiedBy" },
                { "data": "ReworkModifiedDate" },
                { "data": "checklistitemname" }

            ], "bSort": false, "bDestroy": true, "bLengthChange": false, "pageLength": 100, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [],
            "deferRender": true,
            "drawCallback": function (settings) {
                // alert(UserDetails.Language)
                $('.Languagepicker').selectpicker('val', UserDetails.Language);
                $('#tblQFLFeedback_info,#tblQFLFeedback').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#tblQFLFeedback_paginate').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#strecord').translate({ lang: $('.Languagepicker').val(), t: dict });
                if (data.length <= 0) {
                    $('#BindingCheckListItems').empty();
                    $('#BindingCheckListItems').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

                }


            },
            "createdRow": function (row, data, index) {

                VinIds = data.vinid;
                var cursor = "";
                if (UserDetails.RoleId == 6) {


                    var Linename = $("#selectedline").text();

                    var Line = UserDetails.AccessDetails.filter(function (x) { return x.AccessType == Linename });
                    var GateAccess = Line.filter(function (x) { return x.AccessName.replace('-' + Linename, '') == GateName.replace('Re-Examination', 'ReExamination') });

                }
                var DefectPlace = datas.GetDefectPlaceCheckList.filter(function (x) { return x.qflfeedbackworkflowid == data.qflfeedbackworkflowid });
                var defectivePlace = "";
                if (DefectPlace.length > 0) {

                    if (DefectPlace[0].defectiveplace.trim() != "") {
                        defectivePlace = DefectPlace[0].defectiveplace

                    }
                }

                var DefectForRework = datas.DefectCheckListForRework.filter(function (x) { return x.qflfeedbackworkflowid == data.qflfeedbackworkflowid});
                var Filterdefect = "";
                if (DefectForRework.length > 0) {

                    if (DefectForRework[0].site1.trim() != "") {
                        Filterdefect = DefectForRework[0].site1

                    }
                    if (DefectForRework[0].site2.trim() != "") {

                        if (Filterdefect != "") {
                            Filterdefect = Filterdefect + ', ' + DefectForRework[0].site2

                        }
                        else {
                            Filterdefect = DefectForRework[0].site2

                        }

                    }
                    if (DefectForRework[0].site3.trim() != "") {

                        if (Filterdefect != "") {
                            Filterdefect = Filterdefect + ', ' + DefectForRework[0].site3


                        }
                        else {
                            Filterdefect = DefectForRework[0].site3

                        }

                    }
                    if (DefectForRework[0].site4.trim() != "") {
                        if (Filterdefect != "") {
                            Filterdefect = Filterdefect + ', ' + DefectForRework[0].site4


                        }
                        else {
                            Filterdefect = DefectForRework[0].site4

                        }

                    }
                    if (DefectForRework[0].site5.trim() != "") {
                        if (Filterdefect != "") {
                            Filterdefect = Filterdefect + ', ' + DefectForRework[0].site5


                        }
                        else {
                            Filterdefect = DefectForRework[0].site5

                        }

                    }
                    if (DefectForRework[0].damage.trim() != "") {

                        if (Filterdefect != "") {
                            Filterdefect = Filterdefect + ', ' + DefectForRework[0].damage


                        }
                        else {
                            Filterdefect = DefectForRework[0].damage

                        }


                    }
                 
                    //if (DefectForRework[0].defectclass != "") {

                    //    if (Filterdefect != "") {
                    //        Filterdefect = Filterdefect + ',' + DefectForRework[0].defectclass


                    //    }
                    //    else {
                    //        Filterdefect = DefectForRework[0].defectclass

                    //    }


                    //}
                }
                if (Filterdefect != "" && defectivePlace != "") {
                    Filterdefect = "," + Filterdefect
                }

                var CheckItemdisabled = "";
                var disabled1 = "";
                var disabledStandard = "";
                var disabledStandardicon = "";
                if (GateName != "Rework" && GateName != "Re-Examination" && GateName != "Re-Examination1")
                    if (data.iscompleted) {
                        disabled = "disabled";
                    }

                if (data.checklistitemstatusid == 7) {

                    if (GateName == "Rework") {

                        disabled1 = "disabled";
                    }

                }


                if (datas.ReverCompleteOnlyAdmin == true) {
                    $('#Completedbtn1').prop('disabled', false);

                }
                else {
                    $('#Completedbtn1').prop('disabled', true);

                }

                if (UserDetails.RoleId == 6) {
                    if (GateAccess.length > 0) {
                        //$('#Completedbtn').prop('disabled', false);
                        if(datas.ReverCompleteOnlyAdmin==true)
                        {
                            $('#Completedbtn1').prop('disabled', false);

                        }
                        else
                        {
                            $('#Completedbtn1').prop('disabled', true);

                        }
                    }
                    else {
                        disabled = "disabled";
                        cursor = "not-allowed;";
                        disabledStandard = "disabled";
                        CheckItemdisabled = "disabled";
                        $('#Completedbtn').prop('disabled', true);
                        $('#Completedbtn1').prop('disabled', true);
                    }
                }

               


                if (disabled != "") {
                    disabled1 = disabled;
                }


                var NotOkCount = data.givennotokcount;
                if (NotOkCount == 0) {
                    NotOkCount = "";
                }

                var okcheckcount = data.okcheckcount;
                if (okcheckcount == 0) {
                    okcheckcount = "";
                }

                var ReExaminationcount = data.reexaminationcount;
                if (ReExaminationcount == 0) {
                    ReExaminationcount = "";
                }
                var checkItem = "";
                if (data.checkitems == "") {
                    checkItem = "";
                }
                else {
                    checkItem = "blank";
                }

                if (datas.TableName != null) {


                    if (datas.TableName.length > 0 && datas.TableName != "Main") {


                        CheckItemdisabled = "disabled";
                        disabledStandard = "disabled";
                        disabled = "disabled";
                        console.log(datas.TableName)
                    }
                }

                okcheckcount = "";
                $('td', row).eq(0).attr({ 'title': data.GateName, "data-label": "GateName", "data-toggle": "tooltip", "data-placement": "top", "class": "" }).css("background-color", data.QgateColor);
                if (data.OriginalInspectionItem.toUpperCase()=="ADD") {
                  
                    $('td', row).eq(1).empty().append('<span></span>').css("background-color", data.QgateColor);;
                }
                else
                {
                    
                    $('td', row).eq(1).attr({ 'title': data.inspectionitem, "data-label": "PartName", "data-toggle": "tooltip", "data-placement": "top" }).css("background-color", data.QgateColor);
  
                }

               

                var standard = [];
                var jsonComments = [];
                var content = [];
                var Empty = [];

                if (data.Site1Image == "") {
                    $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>').css("background-color", data.QgateColor);

                }
                else {
                    if (defectivePlace != "" || Filterdefect != "") {
                      //  $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="../SignatureSitePath/' + VIN + '/' + data.Site1Image + '" />');
                        $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber + '/' + data.Site1Image + '" />').css("background-color", data.QgateColor);

                    }
                    else {
                       // $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="../SignatureSitePath/' + VIN + '/' + data.Site1Image + '" />');
                        $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber + '/' + data.Site1Image + '" />').css("background-color", data.QgateColor);
                         
                    }

                }


                //$('td', row).eq(2).empty().append('<span style="display:none">' + Filterdefect + '</span>');


                $('td', row).eq(3).attr({ 'title': data.ReworkModifiedBy, "data-label": "CompletedBy", "data-toggle": "tooltip", "data-placement": "top" }).css("background-color", data.QgateColor);

                $('td', row).eq(4).attr({ 'title': data.ReworkModifiedDate, "data-label": "CompletedDate", "data-toggle": "tooltip", "data-placement": "top" }).css("background-color", data.QgateColor);


                content.push('<div class="row">');

               
                content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
              
                if(data.IsCommunication==true)
                {
                    content.push('<span><a href="#" DefectValue="'+defectivePlace + Filterdefect+'"  onclick=btnReExamCommunicate(this,"' + data.vinid + '",'+data.qflfeedbackworkflowid+',"Rework","'+encodeURI(data.inspectionitem)+'",'+data.checklistitemstatusid+')  class=" ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_'+data.qflfeedbackworkflowid+'" style=""><i id="btnCommunicateCommentIcon_'+data.qflfeedbackworkflowid+'" class="fas fa-comments text-gray"></i></a></span>');

                }
                else{
                    content.push('<span><a href="#"  DefectValue="'+defectivePlace + Filterdefect+'"   onclick=btnReExamCommunicate(this,"' + data.vinid + '",'+data.qflfeedbackworkflowid+',"Rework","'+encodeURI(data.inspectionitem)+'",'+data.checklistitemstatusid+')  class="btn btn-save CommentEvent ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_'+data.qflfeedbackworkflowid+'" style=""><i  id="btnCommunicateCommentIcon_'+data.qflfeedbackworkflowid+'" class="fas fa-comments "></i></a></span>');

                }
                
                
                content.push('</div>');

                        //  ---------------------------------Ok Items --------------------------

                    

                         if (data.checklistitemstatusid == 5) {

                             content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                             content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                             content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ',' + data.isreexamflg + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                             content.push('<i style="color:green;cursor:' + cursor +'" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                            content.push('</a>');
                            content.push('</span>');
                            //content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                            content.push('</div>');
                        }

                        else if (data.checklistitemstatusid == 7) {

                             content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper">');
                             content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                             content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ',' + data.isreexamflg + ') class="btn-saveCheck ' + disabled1 + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                            content.push('<i style="color:green;cursor:'+cursor+'" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                            content.push('</a>');
                            content.push('</span>');
                            //content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                            content.push('</div>');
                         }

                         else if (data.isreexamflg == true) {

                             content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper">');
                             content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                             content.push('<a href="#" style="background-color: red;"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ',' + data.isreexamflg + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                             content.push('<i  id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                             content.push('</a>');
                             content.push('</span>');
                             //content.push('<span class="feedback-button-number" id=""></span>');
                             content.push('</div>');

                         }

                           

                 else if (data.checklistitemstatusid == 3) {
                             content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper">');
                             content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                             content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ',' + data.isreexamflg + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i  id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id=""></span>');
                    content.push('</div>');

                }
                else if (data.checklistitemstatusid == 6) {

                             content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper">');
                             content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                             content.push('<a href="#" style="background-color: red;"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ',' + data.isreexamflg + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i  id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id=""></span>');
                    content.push('</div>');

                }


               

                        //  --------------------------------- Ok Items --------------------------


                //--------------------------- Reset---------------------------

            
                content.push('<div class="col-sm-3  p-lr-5 disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons" style="color:red">');
                content.push('<a href="#"  id="CheckItemsReset' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Reset" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ',' + data.isreexamflg + ') class="btn-reset btn ' + disabled1 + '" data-toggle="tooltip" title="Reset" aria-hidden="true">');
                content.push('<i id="CheckItemsResets' + data.qflfeedbackworkflowid + '" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                content.push('</a>');
                content.push('</span>');
                content.push('</div>');


                var UploadedImageDisabled="";
                if(data.NotOkUploadImage=="" || data.NotOkUploadImage==null && data.NotOkUploadImage==undefined)
                {
                    UploadedImageDisabled="disabled";
                }
                else if(disabled=="disabled")
                {
                    UploadedImageDisabled="disabled";
                }
                else
                {
                    UploadedImageDisabled="";
                }

                
                content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                content.push('<a href="#" onclick="btnOpenUploadedImage(' + data.qflfeedbackworkflowid + ',' + data.checklistitemid + ',\''+data.NotOkUploadImage+'\')"  id="' + data.qflfeedbackworkflowid + '"  class="btn btn-save ' + UploadedImageDisabled + '"  data-toggle="tooltip" title="Image" aria-hidden="true">');
                content.push('<i style="" id="" class="fa fa-picture-o  feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                content.push('</a>');
                content.push('</span>');
                content.push('</div>');

                
 
                content.push('</div>');



                                  //  -----------------------------Reset-------------------------


                $('td', row).eq(5).empty().append(content.join(''));

                $('td', row).eq(6).empty().append('<span></span>');
            }
        })

   }

   else if (GateName == "Re-Examination") {
       $('#BindingCheckListItemsRework').empty();

       $('#tblQFLFeedbackReExamination').DataTable({
           data: data,
           "columns": [
               { "data": "GateName" },
               { "data": "inspectionitem" },
               { "data": "checklistitemname" },
               { "data": "ReworkModifiedBy" },
                { "data": "ReworkModifiedDate" },
                  { "data": "checklistitemname" }

           ], "bSort": false, "bDestroy": true, "bLengthChange": false, "pageLength": 100, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [],
           "deferRender": true,
           "drawCallback": function (settings) {
               // alert(UserDetails.Language)
               $('.Languagepicker').selectpicker('val', UserDetails.Language);
               $('#tblQFLFeedback_info,#tblQFLFeedback').translate({ lang: $('.Languagepicker').val(), t: dict });
               $('#tblQFLFeedback_paginate').translate({ lang: $('.Languagepicker').val(), t: dict });
               $('#strecord').translate({ lang: $('.Languagepicker').val(), t: dict });
               if (data.length <= 0) {
                   $('#BindingCheckListItems').empty();
                   $('#BindingCheckListItems').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

               }


           },
           "createdRow": function (row, data, index) {

               VinIds = data.vinid;
               var cursor = "";
               if (UserDetails.RoleId == 6) {


                   var Linename = $("#selectedline").text();

                   var Line = UserDetails.AccessDetails.filter(function (x) { return x.AccessType == Linename });
                 
                   var GateAccess = Line.filter(function (x) { return x.AccessName.replace('-' + Linename, '') == GateName.replace('Re-Examination', 'ReExamination') });

               }
               var DefectPlace = datas.GetDefectPlaceCheckList.filter(function (x) { return x.qflfeedbackworkflowid == data.qflfeedbackworkflowid });
               var defectivePlace = "";
               if (DefectPlace.length > 0) {

                   if (DefectPlace[0].defectiveplace.trim() != "") {
                       defectivePlace = DefectPlace[0].defectiveplace

                   }
               }

               var DefectForRework = datas.DefectCheckListForRework.filter(function (x) { return x.qflfeedbackworkflowid == data.qflfeedbackworkflowid });
               var Filterdefect = "";
               if (DefectForRework.length > 0) {

                   if (DefectForRework[0].site1.trim() != "") {
                       Filterdefect = DefectForRework[0].site1

                   }
                   if (DefectForRework[0].site2.trim() != "") {

                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site2

                       }
                       else {
                           Filterdefect = DefectForRework[0].site2

                       }

                   }
                   if (DefectForRework[0].site3.trim() != "") {

                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site3


                       }
                       else {
                           Filterdefect = DefectForRework[0].site3

                       }

                   }
                   if (DefectForRework[0].site4.trim() != "") {
                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site4


                       }
                       else {
                           Filterdefect = DefectForRework[0].site4

                       }

                   }
                   if (DefectForRework[0].site5.trim() != "") {
                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site5


                       }
                       else {
                           Filterdefect = DefectForRework[0].site5

                       }

                   }
                   if (DefectForRework[0].damage.trim() != "") {

                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].damage


                       }
                       else {
                           Filterdefect = DefectForRework[0].damage

                       }


                   }
                 
                   //if (DefectForRework[0].defectclass != "") {

                   //    if (Filterdefect != "") {
                   //        Filterdefect = Filterdefect + ',' + DefectForRework[0].defectclass


                   //    }
                   //    else {
                   //        Filterdefect = DefectForRework[0].defectclass

                   //    }


                   //}
               }
               if (Filterdefect != "" && defectivePlace != "") {
                   Filterdefect = "," + Filterdefect;
               }

               var CheckItemdisabled = "";
               var disabled1 = "";
               var disabledStandard = "";
               var disabledStandardicon = "";
               if (GateName != "Rework" && GateName != "Re-Examination" && GateName != "Re-Examination1")
                   if (data.iscompleted) {
                       disabled = "disabled";
                   }

               if (data.checklistitemstatusid == 7) {

                   if (GateName == "Rework") {

                       disabled1 = "disabled";
                   }

               }
               if (disabled != "") {
                   disabled1 = disabled;
               }

               //var standard = datas.standardmasteritems.filter(function (x) { return x.standardname.toLowerCase() == data.standard.toLowerCase(); });


               //if (standard.length > 0) {
               //    if (standard[0].standardfilename == "") {
               //        disabledStandardicon = "";
               //        disabledStandard = "disabled";
               //    }


               //}
               //else {
               //    disabledStandardicon = "";
               //    disabledStandard = "disabled";
               //}


               if (datas.ReverCompleteOnlyAdmin == true) {
                   $('#Completedbtn1').prop('disabled', false);

               }
               else {
                   $('#Completedbtn1').prop('disabled', true);

               }

               if (UserDetails.RoleId == 6) {
                   if (GateAccess.length > 0) {
                      // $('#Completedbtn').prop('disabled', false);
                       if(datas.ReverCompleteOnlyAdmin==true)
                       {
                           $('#Completedbtn1').prop('disabled', false);

                       }
                       else
                       {
                           $('#Completedbtn1').prop('disabled', true);

                       }
                   }
                   else {
                       disabled = "disabled";
                       cursor = "not-allowed;";
                       disabledStandard = "disabled";
                       CheckItemdisabled = "disabled";
                       $('#Completedbtn').prop('disabled', true);
                       $('#Completedbtn1').prop('disabled', true);
                   }
               }


               var NotOkCount = data.givennotokcount;
               if (NotOkCount == 0) {
                   NotOkCount = "";
               }

               var okcheckcount = data.okcheckcount;
               if (okcheckcount == 0) {
                   okcheckcount = "";
               }

               var ReExaminationcount = data.reexaminationcount;
               if (ReExaminationcount == 0) {
                   ReExaminationcount = "";
               }
               var checkItem = "";
               if (data.checkitems == "") {
                   checkItem = "";
               }
               else {
                   checkItem = "blank";
               }

               okcheckcount = "";

               if (datas.TableName != null) {


                   if (datas.TableName.length > 0 && datas.TableName != "Main") {


                       CheckItemdisabled = "disabled";
                       disabledStandard = "disabled";
                       disabled = "disabled";
                       console.log(datas.TableName)
                   }
               }

               var standard = [];
               var jsonComments = [];
               var content = [];
               var Empty = [];
              

               //$('td', row).eq(0).empty().append('<span>ReExamination Gate</span>');
               $('td', row).eq(0).attr({ 'title': data.GateName, "data-label": "GateName", "data-toggle": "tooltip", "data-placement": "top" });

               
               if (data.OriginalInspectionItem.toUpperCase()=="ADD") {
                  
                   $('td', row).eq(1).empty().append('<span></span>');
               }
               else
               {
                    
                   $('td', row).eq(1).attr({ 'title': data.inspectionitem, "data-label": "PartName", "data-toggle": "tooltip", "data-placement": "top" });
  
               }

               if (data.Site1Image == "") {
                   $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>');

               }
               else {
                   if (defectivePlace != "" || Filterdefect != "") {
                       // $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="../SignatureSitePath/' + VIN + '/' + data.Site1Image + '" />');
                       $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber + '/' + data.Site1Image + '" />');

                   }
                   else {
                       // $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="../SignatureSitePath/' + VIN + '/' + data.Site1Image + '" />');
                       $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber + '/' + data.Site1Image + '" />');

                   }
                   //  $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="'+UserDetails.SignatureSitePath+' /' + VIN + '/' + data.Site1Image + '" />');

               }

               //$('td', row).eq(3).empty().append('<span>Sathish kumar s</span>');
               //$('td', row).eq(4).empty().append('<span>01/01/2020 22 13</span>');

               $('td', row).eq(3).attr({ 'title': data.ReworkModifiedBy, "data-label": "CompletedBy", "data-toggle": "tooltip", "data-placement": "top" });

               $('td', row).eq(4).attr({ 'title': data.ReworkModifiedDate, "data-label": "CompletedDate", "data-toggle": "tooltip", "data-placement": "top" });

               //content.push('<div class="row">');
               
               content.push('<div class=" p-lr-5 ml-10 disabled-wrapper" >');
               content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
               if(data.IsCommunication==true)
               {
                   content.push('<span><a href="#" DefectValue="'+defectivePlace + Filterdefect+'" onclick=btnReExamCommunicate(this,"' + data.vinid + '",'+data.qflfeedbackworkflowid+',"Re-Examination","'+encodeURI(data.inspectionitem)+'",'+data.checklistitemstatusid+')  class="' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_'+data.qflfeedbackworkflowid+'" style=""><i id="btnCommunicateCommentIcon_'+data.qflfeedbackworkflowid+'"  class="fas fa-comments text-gray"></i></a></span>');

               }
               else{
                   content.push('<span><a href="#"  DefectValue="'+defectivePlace + Filterdefect+'"  onclick=btnReExamCommunicate(this,"' + data.vinid + '",'+data.qflfeedbackworkflowid+',"Re-Examination","'+encodeURI(data.inspectionitem)+'",'+data.checklistitemstatusid+')  class="btn btn-save CommentEvent ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_'+data.qflfeedbackworkflowid+'" style=""><i id="btnCommunicateCommentIcon_'+data.qflfeedbackworkflowid+'"  class="fas fa-comments"></i></a></span>');

               }        
               
               content.push('</div>');

               //  ---------------------------------Ok Items --------------------------
           

             
                   //  --------------------------------- Ok Items --------------------------

                   if (data.checklistitemstatusid == 5) {
                       content.push('<div class="  p-lr-5 ml-10  disabled-wrapper" >');
                       content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                       content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                       content.push('<i  id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                       content.push('</a>');
                       content.push('</span>');
                       //content.push('<span class="feedback-button-number" id=""></span>');
                       content.push('</div>');
                   }
                   else if (data.checklistitemstatusid == 7) {
                       content.push('<div class=" p-lr-5  ml-10  disabled-wrapper">');
                       content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                       content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                       content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                       content.push('</a>');
                       content.push('</span>');
                       // content.push('<span class="feedback-button-number" id="">'+okcheckcount+'</span>');
                       content.push('</div>');
                   }

                   //else if (okcheckcount != "") {
                   //    content.push('<span class="feebback-pending-buttons" id="">');
                   //    content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '") class="btn-saveCheck' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                   //    content.push('<i style="color:green" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check disabled" ToolTipService.ShowOnDisabled="True"></i>');
                   //    content.push('</a>');
                   //    content.push(' ' + okcheckcount + '</span>');

                   //}
                   //  --------------------------------- Ok Items --------------------------

                   //  ---------------------------------Not Ok Items --------------------------


                   if (data.checklistitemstatusid == 5 || data.checklistitemstatusid == 7) {
                       content.push('<div class="p-lr-5  ml-10  disabled-wrapper">');
                       content.push('<span class="feebback-pending-buttons disabled-wrapper" style="color:red">');
                       content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-close ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                       content.push('<i id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '"">' + NotOkCount + '</span></i>');
                       content.push('</a>');
                       content.push('</span>');
                       //content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                       content.push('</div>');
                   }
                   //  ---------------------------------Not Ok Items --------------------------

              




               //--------------------------- Reset---------------------------

            
               content.push('<div class=" p-lr-5  ml-10 disabled-wrapper">');
               content.push('<span class="feebback-pending-buttons" style="color:red">');
               content.push('<a href="#"  id="CheckItemsReset' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Reset" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-reset btn ' + disabled + '" data-toggle="tooltip" title="Reset" aria-hidden="true">');
               content.push('<i id="CheckItemsResets' + data.qflfeedbackworkflowid + '" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
               content.push('</a>');
               content.push('</span>');
               content.push('</div>');

               // content.push('</div>');

               var UploadedImageDisabled="";
               if(data.NotOkUploadImage=="" || data.NotOkUploadImage==null && data.NotOkUploadImage==undefined)
               {
                   UploadedImageDisabled="disabled";
               }
               else if(disabled=="disabled")
               {
                   UploadedImageDisabled="disabled";
               }
               else
               {
                   UploadedImageDisabled="";
               }


               content.push('<div class=" p-lr-5 mt-5px  ml-10  disabled-wrapper">');
               content.push('<span class="feebback-pending-buttons ">');
               content.push('<a href="#" onclick="btnOpenUploadedImage(' + data.qflfeedbackworkflowid + ',' + data.checklistitemid + ',\''+data.NotOkUploadImage+'\')"  id=""  class="btn-save btn ' + UploadedImageDisabled + '" data-toggle="tooltip" title="Image" aria-hidden="true">');
               content.push('<i id="" class="fas fa-picture-o" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
               content.push('</a>');
               content.push('</span>');
               content.push('</div>');




                 
               //content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
               //content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

               //content.push('<a href="#"  id="' + data.qflfeedbackworkflowid + '"  class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
               //content.push('<i style="" id="" class="fa fa-picture-o  feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

               //content.push('</a>');
               //content.push('</span>');
               //content.push('</div>');


               //  -----------------------------Reset-------------------------

              
               $('td', row).eq(5).empty().append(content.join(''));

               $('td', row).eq(6).empty().append('<span></span>');
           }
       })

   }


   else if (GateName == "Re-Examination1") {
       $('#BindingCheckListItemsRework').empty();


       $('#tblQFLFeedbackReExamination').DataTable({
           data: data,
           "columns": [
               { "data": "GateName" },
               { "data": "inspectionitem" },
               { "data": "checklistitemname" },
               { "data": "ReworkModifiedBy" },
                { "data": "ReworkModifiedDate" },
                { "data": "checklistitemname" }

           ], "bSort": false, "bDestroy": true, "bLengthChange": false, "pageLength": 100, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [],
           "deferRender": true,
           "drawCallback": function (settings) {
               // alert(UserDetails.Language)
               $('.Languagepicker').selectpicker('val', UserDetails.Language);
               $('#tblQFLFeedback_info,#tblQFLFeedback').translate({ lang: $('.Languagepicker').val(), t: dict });
               $('#tblQFLFeedback_paginate').translate({ lang: $('.Languagepicker').val(), t: dict });
               $('#strecord').translate({ lang: $('.Languagepicker').val(), t: dict });
               if (data.length <= 0) {
                   $('#BindingCheckListItems').empty();
                   $('#BindingCheckListItems').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

               }


           },
           "createdRow": function (row, data, index) {

               VinIds = data.vinid;
               var cursor = "";
               if (UserDetails.RoleId == 6) {


                   var Linename = $("#selectedline").text();

                   var Line = UserDetails.AccessDetails.filter(function (x) { return x.AccessType == Linename });
                 
                   var GateAccess = Line.filter(function (x) { return x.AccessName.replace('-' + Linename, '') == GateName.replace('Re-Examination1', 'ReExamination1') });

               }
               var DefectPlace = datas.GetDefectPlaceCheckList.filter(function (x) { return x.qflfeedbackworkflowid == data.qflfeedbackworkflowid });
               var defectivePlace = "";
               if (DefectPlace.length > 0) {

                   if (DefectPlace[0].defectiveplace.trim() != "") {
                       defectivePlace = DefectPlace[0].defectiveplace

                   }
               }

               var DefectForRework = datas.DefectCheckListForRework.filter(function (x) { return x.qflfeedbackworkflowid == data.qflfeedbackworkflowid });
               var Filterdefect = "";
               if (DefectForRework.length > 0) {

                   if (DefectForRework[0].site1.trim() != "") {
                       Filterdefect = DefectForRework[0].site1

                   }
                   if (DefectForRework[0].site2.trim() != "") {

                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site2

                       }
                       else {
                           Filterdefect = DefectForRework[0].site2

                       }

                   }
                   if (DefectForRework[0].site3.trim() != "") {

                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site3


                       }
                       else {
                           Filterdefect = DefectForRework[0].site3

                       }

                   }
                   if (DefectForRework[0].site4.trim() != "") {
                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site4


                       }
                       else {
                           Filterdefect = DefectForRework[0].site4

                       }

                   }
                   if (DefectForRework[0].site5.trim() != "") {
                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].site5


                       }
                       else {
                           Filterdefect = DefectForRework[0].site5

                       }

                   }
                   if (DefectForRework[0].damage.trim() != "") {

                       if (Filterdefect != "") {
                           Filterdefect = Filterdefect + ', ' + DefectForRework[0].damage


                       }
                       else {
                           Filterdefect = DefectForRework[0].damage

                       }


                   }
                 
                   //if (DefectForRework[0].defectclass != "") {

                   //    if (Filterdefect != "") {
                   //        Filterdefect = Filterdefect + ',' + DefectForRework[0].defectclass


                   //    }
                   //    else {
                   //        Filterdefect = DefectForRework[0].defectclass

                   //    }


                   //}
               }
               if (Filterdefect != "" && defectivePlace != "") {
                   Filterdefect = "," + Filterdefect;
               }

               var CheckItemdisabled = "";
               var disabled1 = "";
               var disabledStandard = "";
               var disabledStandardicon = "";
               if (GateName != "Rework" && GateName != "Re-Examination" && GateName != "Re-Examination1")
                   if (data.iscompleted) {
                       disabled = "disabled";
                   }

               if (data.checklistitemstatusid == 7) {

                   if (GateName == "Rework") {

                       disabled1 = "disabled";
                   }

               }
               if (disabled != "") {
                   disabled1 = disabled;
               }

               //var standard = datas.standardmasteritems.filter(function (x) { return x.standardname.toLowerCase() == data.standard.toLowerCase(); });


               //if (standard.length > 0) {
               //    if (standard[0].standardfilename == "") {
               //        disabledStandardicon = "";
               //        disabledStandard = "disabled";
               //    }


               //}
               //else {
               //    disabledStandardicon = "";
               //    disabledStandard = "disabled";
               //}

               if (datas.ReverCompleteOnlyAdmin == true) {
                   $('#Completedbtn1').prop('disabled', false);

               }
               else {
                   $('#Completedbtn1').prop('disabled', true);

               }
               if (UserDetails.RoleId == 6) {
                   if (GateAccess.length > 0) {
                      // $('#Completedbtn').prop('disabled', false);
                       if(datas.ReverCompleteOnlyAdmin==true)
                       {
                           $('#Completedbtn1').prop('disabled', false);

                       }
                       else
                       {
                           $('#Completedbtn1').prop('disabled', true);

                       }
                   }
                   else {
                       disabled = "disabled";
                       cursor = "not-allowed;";
                       disabledStandard = "disabled";
                       CheckItemdisabled = "disabled";
                       $('#Completedbtn').prop('disabled', true);
                       $('#Completedbtn1').prop('disabled', true);
                   }
               }


               var NotOkCount = data.givennotokcount;
               if (NotOkCount == 0) {
                   NotOkCount = "";
               }

               var okcheckcount = data.okcheckcount;
               if (okcheckcount == 0) {
                   okcheckcount = "";
               }

               var ReExaminationcount = data.reexaminationcount;
               if (ReExaminationcount == 0) {
                   ReExaminationcount = "";
               }
               var checkItem = "";
               if (data.checkitems == "") {
                   checkItem = "";
               }
               else {
                   checkItem = "blank";
               }

               okcheckcount = "";
               if (datas.TableName != null) {


                   if (datas.TableName.length > 0 && datas.TableName != "Main") {


                       CheckItemdisabled = "disabled";
                       disabledStandard = "disabled";
                       disabled = "disabled";
                       console.log(datas.TableName)
                   }
               }
             

               var standard = [];
               var jsonComments = [];
               var content = [];
               var Empty = [];
            
               $('td', row).eq(0).attr({ 'title': data.GateName, "data-label": "GateName", "data-toggle": "tooltip", "data-placement": "top" });

               $('td', row).eq(3).attr({ 'title': data.ReworkModifiedBy, "data-label": "CompletedBy", "data-toggle": "tooltip", "data-placement": "top" });

               $('td', row).eq(4).attr({ 'title': data.ReworkModifiedDate, "data-label": "CompletedDate", "data-toggle": "tooltip", "data-placement": "top" });

               
               if (data.OriginalInspectionItem.toUpperCase()=="ADD") {
                  
                   $('td', row).eq(1).empty().append('<span></span>');
               }
               else
               {
                    
                   $('td', row).eq(1).attr({ 'title': data.inspectionitem, "data-label": "PartName", "data-toggle": "tooltip", "data-placement": "top" });
  
               }

               if (data.Site1Image == "") {
                   $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>');

               }
               else {
                   if (defectivePlace != "" || Filterdefect != "") {
                       // $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="../SignatureSitePath/' + VIN + '/' + data.Site1Image + '" />');
                       $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber+ '/' + data.Site1Image + '" />');

                   }
                   else {
                       // $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="../SignatureSitePath/' + VIN + '/' + data.Site1Image + '" />');
                       $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber+ '/' + data.Site1Image + '" />');

                   }
                   //  $('td', row).eq(1).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="'+UserDetails.SignatureSitePath+' /' + VIN + '/' + data.Site1Image + '" />');

               }

              // content.push('<div class="row">');
            
               content.push('<div class=" ml-10 disabled-wrapper" >');
               content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
               if(data.IsCommunication==true)
               {
                   content.push('<span><a href="#" DefectValue="'+defectivePlace + Filterdefect+'" onclick=btnReExamCommunicate(this,"' + data.vinid + '",'+data.qflfeedbackworkflowid+',"Re-Examination1","'+encodeURI(data.inspectionitem)+'",'+data.checklistitemstatusid+')  class=" ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_'+data.qflfeedbackworkflowid+'" style=""><i id="btnCommunicateCommentIcon_'+data.qflfeedbackworkflowid+'"  class="fas fa-comments  text-gray"></i></a></span>');

               }
               else{
                   content.push('<span><a href="#"  DefectValue="'+defectivePlace + Filterdefect+'"  onclick=btnReExamCommunicate(this,"' + data.vinid + '",'+data.qflfeedbackworkflowid+',"Re-Examination1","'+encodeURI(data.inspectionitem)+'",'+data.checklistitemstatusid+')  class="btn btn-save CommentEvent ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_'+data.qflfeedbackworkflowid+'" style=""><i id="btnCommunicateCommentIcon_'+data.qflfeedbackworkflowid+'"  class="fas fa-comments"></i></a></span>');

               }
               content.push('</div>');

               //  ---------------------------------Ok Items --------------------------
           

               if (GateName == "Re-Examination1") {
                   //  --------------------------------- Ok Items --------------------------

                   if (data.checklistitemstatusid == 5) {
                       content.push('<div class=" ml-10 disabled-wrapper" >');
                       content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                       content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                       content.push('<i  id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                       content.push('</a>');
                       content.push('</span>');
                       //content.push('<span class="feedback-button-number" id=""></span>');
                       content.push('</div>');
                   }
                   else if (data.checklistitemstatusid == 7) {
                       content.push('<div class=" ml-10 disabled-wrapper">');
                       content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                       content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                       content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                       content.push('</a>');
                       content.push('</span>');
                       // content.push('<span class="feedback-button-number" id="">'+okcheckcount+'</span>');
                       content.push('</div>');
                   }

                   //else if (okcheckcount != "") {
                   //    content.push('<span class="feebback-pending-buttons" id="">');
                   //    content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '") class="btn-saveCheck' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                   //    content.push('<i style="color:green" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check disabled" ToolTipService.ShowOnDisabled="True"></i>');
                   //    content.push('</a>');
                   //    content.push(' ' + okcheckcount + '</span>');

                   //}
                   //  --------------------------------- Ok Items --------------------------

                   //  ---------------------------------Not Ok Items --------------------------


                   if (data.checklistitemstatusid == 5 || data.checklistitemstatusid == 7) {
                       content.push('<div class="ml-10 disabled-wrapper">');
                       content.push('<span class="feebback-pending-buttons disabled-wrapper" style="color:red">');
                       content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-close ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                       content.push('<i id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '"">' + NotOkCount + '</span></i>');
                       content.push('</a>');
                       content.push('</span>');
                       //content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                       content.push('</div>');
                   }
                   //  ---------------------------------Not Ok Items --------------------------

               }




               //--------------------------- Reset---------------------------

              
               content.push('<div class=" ml-10 disabled-wrapper">');
               content.push('<span class="feebback-pending-buttons" style="color:red">');
               content.push('<a href="#"  id="CheckItemsReset' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Reset" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-reset btn ' + disabled + '" data-toggle="tooltip" title="Reset" aria-hidden="true">');
               content.push('<i id="CheckItemsResets' + data.qflfeedbackworkflowid + '" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
               content.push('</a>');
               content.push('</span>');
               content.push('</div>');
              
               //content.push('</div>');


               var UploadedImageDisabled="";
               if(data.NotOkUploadImage=="" || data.NotOkUploadImage==null && data.NotOkUploadImage==undefined)
               {
                   UploadedImageDisabled="disabled";
               }
               else if(disabled=="disabled")
               {
                   UploadedImageDisabled="disabled";
               }
               else
               {
                   UploadedImageDisabled="";
               }

               
               content.push('<div class=" p-lr-5 mt-5px  ml-10  disabled-wrapper">');
               content.push('<span class="feebback-pending-buttons">');
               content.push('<a href="#"  onclick="btnOpenUploadedImage(' + data.qflfeedbackworkflowid + ',' + data.checklistitemid + ',\''+data.NotOkUploadImage+'\')" id=""  class="btn-save btn ' + UploadedImageDisabled + '" data-toggle="tooltip" title="Image" aria-hidden="true">');
               content.push('<i id="" class="fas fa-picture-o" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
               content.push('</a>');
               content.push('</span>');
               content.push('</div>');


               //  -----------------------------Reset-------------------------

              
               $('td', row).eq(5).empty().append(content.join(''));

               $('td', row).eq(6).empty().append('<span></span>');
           }
       })

   }

   else {
       $('#BindingCheckListItemsRework').empty();
       $('#BindingCheckListItemsReExam').empty();
       
        $('#tblQFLFeedback').DataTable({
            data: data,
            "columns": [
                { "data": "inspectionitem" },
                { "data": "checkitems" },
                { "data": "specification" },
                { "data": "standard" },
                { "data": "actualid" },
                { "data": "inspectionitem" },
                { "data": "checklistitemname" }

            ], "bSort": false, "bDestroy": true, "bLengthChange": false, "pageLength": 100, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [],
            "deferRender": true,
            "drawCallback": function (settings) {
                // alert(UserDetails.Language)
                $('.Languagepicker').selectpicker('val', UserDetails.Language);
                $('#tblQFLFeedback_info,#tblQFLFeedback').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#tblQFLFeedback_paginate').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#strecord').translate({ lang: $('.Languagepicker').val(), t: dict });
                if (data.length <= 0) {
                    $('#BindingCheckListItems').empty();
                    $('#BindingCheckListItems').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

                }


            },
            "createdRow": function (row, data, index) {

                VinIds = data.vinid;
                var cursor = "";
                if (UserDetails.RoleId == 6) {


                    var Linename = $("#selectedline").text();

                    var Line = UserDetails.AccessDetails.filter(function (x) { return x.AccessType == Linename });
                    var GateAccess = Line.filter(function (x) { return x.AccessName.replace('-' + Linename, '') == GateName.replace('Re-Examination', 'ReExamination') });

                }


                var CheckItemdisabled = "";
                var disabled1 = "";
                var disabledStandard = "";
                var disabledStandardicon = "";
                if (GateName != "Rework" && GateName != "Re-Examination" || GateName != "Re-Examination1")
                    if (data.iscompleted) {
                        disabled = "disabled";


                    }

                if (data.checklistitemstatusid == 7) {

                    if (GateName == "Rework") {

                        disabled1 = "disabled";
                    }

                }
                if (disabled != "") {
                    disabled1 = disabled;
                }

                var standard = datas.standardmasteritems.filter(function (x) { return x.standardname.toLowerCase() == data.standard.toLowerCase(); });


                if (standard.length > 0) {
                    if (standard[0].standardfilename == "") {
                        disabledStandardicon = "";
                        disabledStandard = "disabled";
                    }


                }
                else {
                    disabledStandardicon = "";
                    disabledStandard = "disabled";
                }

                if (datas.ReverCompleteOnlyAdmin == true) {
                    $('#Completedbtn1').prop('disabled', false);

                }
                else {
                    $('#Completedbtn1').prop('disabled', true);

                }
                if (UserDetails.RoleId == 6) {
                    if (GateAccess.length > 0) {
                        // $('#Completedbtn').prop('disabled', false);
                        if (datas.ReverCompleteOnlyAdmin == true) {
                            $('#Completedbtn1').prop('disabled', false);

                        }
                        else {
                            $('#Completedbtn1').prop('disabled', true);

                        }
                    }
                    else {
                        disabled = "disabled";
                        cursor = "not-allowed;";
                        disabledStandard = "disabled";
                        CheckItemdisabled = "disabled";
                        $('#Completedbtn').prop('disabled', true);
                        $('#Completedbtn1').prop('disabled', true);
                    }
                }
                CheckItemdisabled = disabled;




                var NotOkCount = data.givennotokcount;
                if (NotOkCount == 0) {
                    NotOkCount = "";
                }

                var okcheckcount = data.okcheckcount;
                if (okcheckcount == 0) {
                    okcheckcount = "";
                }

                var ReExaminationcount = data.reexaminationcount;
                if (ReExaminationcount == 0) {
                    ReExaminationcount = "";
                }
                var checkItem = "";
                if (data.checkitems == "") {
                    checkItem = "";
                }
                else {
                    checkItem = "blank";
                }

          
                if (datas.TableName != null) {

              
                if (datas.TableName.length > 0 && datas.TableName != "Main")
                   {

                
                CheckItemdisabled = "disabled";
                disabledStandard = "disabled";
                  disabled = "disabled";
                    console.log(datas.TableName)
                    }
                }

            

                if (data.OriginalInspectionItem.toUpperCase()=="ADD") {
                  
                    $('td', row).eq(0).empty().append('<span></span>');
                }
                else
                {
                    
               $('td', row).eq(0).attr({ 'title': data.inspectionitem, "data-label": "PartName", "data-toggle": "tooltip", "data-placement": "top" });
  
                }



                if (data.checkitems == "") {
                    $('td:eq(1)', row).append('<button type="button" class="btn btn-success btn-xs ' + CheckItemdisabled + '" ' + CheckItemdisabled + ' data-toggle="modal" onclick="AddBlankChecklistItem(' + data.checklistitemid + ',' + data.statichecklistitemid + ','+data.qflfeedbackworkflowid+')" data-target="#checkitem"><span class="trn">Add New</span></button>')

                }

                else {
                    if (data.EditCheckItems == "Edit") {
                        //$('td', row).eq(1).attr({ 'title': data.checkitems, "data-label": "CheckItem", "data-toggle": "tooltip", "data-placement": "top" });
                        $('td:eq(1)', row).append(' <button type="button" class="btn btn-success btn-xs ' + CheckItemdisabled + '" ' + CheckItemdisabled + ' data-toggle="modal" onclick="AddBlankChecklistItem(' + data.checklistitemid + ',' + data.statichecklistitemid + ','+data.qflfeedbackworkflowid+ ')" data-target="#checkitem"><span class="trn fab fa-quora"></span></button>')

                    }
                    else {
                        $('td', row).eq(1).attr({ 'title': data.checkitems, "data-label": "CheckItem", "data-toggle": "tooltip", "data-placement": "top" });

                    }

                }
                $('td', row).eq(2).attr({ 'title': data.specification, "data-label": "Spec", "data-toggle": "tooltip", "data-placement": "top" });


                var standard = [];
                var jsonComments = [];
                var content = [];
                var Empty = [];

                standard.push('<span>');

                standard.push('<a href="#" onclick=btnstandard("' + data.standard + '") class="btn btn-save disabled-wrapper ' + disabledStandard + '"  data-toggle="tooltip" title="standard"  aria-hidden="true">');
                if (disabledStandardicon == "") {

                    standard.push('<i class="far fa-circle"></i>');
                }
                else {
                    standard.push('<i class="fas fa-book"></i>');
                }

                standard.push('</a></span>');

                $('td', row).eq(3).empty().append(standard.join(''));
                if (data.actualid != 0) {
                    jsonComments.push('<span style="cursor: not-allowed;display:none;"><a href="#" onclick=btncomments("' + data.checklistitemid + '","' + data.actualid + '","' + data.statichecklistitemid + '","' + disabled + '",' + data.vinid + ') class="' + disabled + ' disabled-wrapper"  data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommentSave" style=""><i class="fas fa-comments text-gray"></i></a></span>');
                    //jsonComments.push('<td class="feebback-pending-td text-right" id="btnbtnOk">');

                }
                else {
                    jsonComments.push('<span style="cursor: not-allowed;display:none;"><a href="#" onclick=btncomments("' + data.checklistitemid + '","' + data.actualid + '","' + data.statichecklistitemid + '","' + disabled + '",' + data.vinid + ') class="btn btn-save CommentEvent ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommentSave" style=""><i class="fas fa-comments"></i></a></span>');
                    //jsonComments.push('<td class="feebback-pending-td text-right" id="btnbtnOk">');

                }

                $('td', row).eq(4).empty().append(jsonComments.join(''));

                var checkstaticId = data.checklistitemid;
                if (checkstaticId == 0 || checkstaticId == "" || checkstaticId == undefined || checkstaticId == null) {
                    checkstaticId = data.statichecklistitemid;
                }

                content.push('<div class="row">');
                if (data.checkitems == "") {
                    // content.push('<span class="feebback-pending-buttons" id="">');
                    // content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + data.checkitems + '") class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    // content.push('<i  style="background-color:lightskyblue" id="CheckItemsOks' + data.qflfeedbackworkflowid + '" class="fas fa-check" ToolTipService.ShowOnDisabled="True"></i>');
                    // content.push('</a>');
                    //// content.push('</span>');
                    // content.push('<span class="feedback-button-number"></span>');
                    // content.push('</span>');


                    content.push('<div class="col-sm-3 feedback-action p-lr-5">');
                    content.push('<span class="feebback-pending-buttons" id="">');
                    content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-OkCheckItems ' + CheckItemdisabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i  id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""> </span></i>');
                    content.push('</a>');

                    content.push('</span>');
                    // content.push('<span class="feedback-button-number" id=""> </span>');
                    content.push('</div>');



                    content.push('<div class="col-sm-3 feedback-action p-lr-5">');
                    content.push('<span class="feebback-pending-buttons" style="color:red">');
                    content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-NotOkCheckItems ' + CheckItemdisabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                    content.push('<i id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="">' + NotOkCount + '</span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    // content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                    content.push('</div>');


                    content.push('<div class="col-sm-3 feedback-action p-lr-5">');
                    content.push('<span class="feebback-pending-buttons">');
                    content.push('<a href="#" id="CheckItemsSkip' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Skip" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-skipCheckItems ' + CheckItemdisabled + '" ToolTipService.ShowOnDisabled="True" data-toggle="tooltip" title="Skip" aria-hidden="true">');
                    content.push('<i id="CheckItemsSkips' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-share"><span class="feedback-button-number" id=""></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id=""></span>');
                    content.push('</div>');

                }
                else {


                        if (data.checklistitemstatusid == 2) {

                            //  --------------------------------- Ok Items --------------------------
                          

                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor +'">');
                            content.push('<span class="feebback-pending-buttons" style="" id="">');
                            content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                            content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                            content.push('</a>');
                            content.push('</span>');
                            //content.push('<span class="feedback-button-number" id="OkCheckItemCount">' + okcheckcount + '</span>');
                            content.push('</div>');


                            //content.push('' + okcheckcount + '</span>');
                        }

                        else if (data.checklistitemstatusid == 7) {
                            //content.push('<div class="col-sm-3 feedback-action p-lr-5">');
                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');

                            content.push('<span class="feebback-pending-buttons" id="">');
                            content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"  onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');

                            content.push('<i style="color:orange; cursor:' + cursor + '" id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check disabled feedback-icon-whitespace display-flex" ToolTipService.ShowOnDisabled="True"> </i>');

                            content.push('</a>');
                            //content.push('<span class="feedback-button-number" id="OkCheckItemCount">' + okcheckcount + '</span>');
                            content.push('</span>');
                            // content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                            content.push('</div>');
                        }

                        else if (ReExaminationcount != "") {

                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');
                            content.push('<span class="feebback-pending-buttons" id="">');
                            content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"  onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');

                            content.push('<i style="color:orange; cursor:' + cursor + '" id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check disabled feedback-icon-whitespace display-flex" ToolTipService.ShowOnDisabled="True"> </i>');

                            content.push('</a>');
                            //content.push('<span class="feedback-button-number" id="OkCheckItemCount">' + okcheckcount + '</span>');
                            content.push('</span>');
                            // content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                            content.push('</div>');

                        }

                        else if (okcheckcount != "") {

                            if (data.checklistitemstatusid == 3 || data.checklistitemstatusid == 5
                                || data.checklistitemstatusid == 6) {

                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '" >');
                                content.push('<span class="feebback-pending-buttons" id="" style="cursor:' + cursor + '" >');
                                content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-save disabled"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                                content.push('<i   id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                                content.push('</a>');
                                // content.push('<span class="feedback-button-number" id=""> </span>');
                                content.push('</span>');

                                //content.push('<span class="feedback-button-number" id=""></span>');
                                content.push('</div>');

                            }
                            else {

                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');
                                content.push('<span class="feebback-pending-buttons" style="" id="">');
                                content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                                content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                                content.push('</a>');
                                content.push('</span>');
                                //content.push('<span class="feedback-button-number" id="OkCheckItemCount">' + okcheckcount + '</span>');
                                content.push('</div>');
                            }
                          

                           

                        }

                        else {

                            if (data.checklistitemstatusid == 3 || data.checklistitemstatusid == 5
                                || data.checklistitemstatusid == 6 || data.checklistitemstatusid == 7 || 
                                data.checklistitemstatusid == 4) {

                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '" >');
                                content.push('<span class="feebback-pending-buttons" id="" style="cursor:' + cursor + '" >');
                                content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-save disabled"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                                content.push('<i   id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                                content.push('</a>');
                                // content.push('<span class="feedback-button-number" id=""> </span>');
                                content.push('</span>');

                                //content.push('<span class="feedback-button-number" id=""></span>');
                                content.push('</div>');

                            }
                            else {

                            

                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor +'" >');
                            content.push('<span class="feebback-pending-buttons" id="" style="cursor:' + cursor +'" >');
                                content.push('<a href="#"  id="CheckItemsOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Ok" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                                content.push('<i   id="CheckItemsOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                            content.push('</a>');
                            // content.push('<span class="feedback-button-number" id=""> </span>');
                            content.push('</span>');

                            //content.push('<span class="feedback-button-number" id=""></span>');
                                content.push('</div>');
                            }
                        }
                        //  --------------------------------- Ok Items --------------------------
                        //  ---------------------------------Not Ok Items --------------------------


                        if (data.notokcheckcount == 0) {
                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor +'">');
                            content.push('<span class="feebback-pending-buttons" style="color:red;cursor:' + cursor +'">');
                            content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"  onclick=btntbnCheckItems("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-closeCheck ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                            content.push('<i style="color:red; cursor:' + cursor + '" id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '_' + checkstaticId+ '"">' + NotOkCount + '</span></i>');
                            content.push('</a>');
                            //content.push('<span style="color:red;margin-left: -16px;">' + NotOkCount +'</span>');
                            content.push('</span>');
                            // content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                            content.push('</div>');
                        }
                         else if (data.checklistitemstatusid == 3) {
                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor +'">');
                            content.push('<span class="feebback-pending-buttons" style="color:red;cursor:' + cursor +'" >');
                            content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItemsNotOk("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-closeCheck ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                            content.push('<i style="color:red;cursor:' + cursor + '";" id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"">' + NotOkCount + '</span></i>');
                            content.push('</a>');
                            // content.push('<span style="color:red;margin-left: -16px;">' + NotOkCount +'</span>');
                            content.push('</span>');
                            // content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                            content.push('</div>');

                        }

                        else if (data.checklistitemstatusid == 6 || data.checklistitemstatusid == 5) {
                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor +'">');
                            content.push('<span class="feebback-pending-buttons" style="color:red;cursor:' + cursor +'">');
                            content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItemsNotOk("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-closeCheck ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                            content.push('<i style="color:red" id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"">' + NotOkCount + '</span></i>');
                            content.push('</a>');
                            //content.push('<span style="color:red;margin-left: -16px;">' + NotOkCount +'</span>');
                            content.push('</span>');
                            //content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                            content.push('</div>');
                        }
                        else {

                            if (data.checklistitemstatusid == 2 || data.checklistitemstatusid == 7 || data.checklistitemstatusid == 4) {
                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');

                                content.push('<span class="feebback-pending-buttons" style="color:red;cursor:' + cursor + '">');
                                content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-close disabled" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                                content.push('<i  id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"">' + NotOkCount + '</span></i>');
                                content.push('</a>');
                                //content.push('<span style="color:red;">' + NotOkCount +'</span>');
                                content.push('</span>');
                                //content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span > ');
                                content.push('</div>');
                            }
                   

                             else {
                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');

                                content.push('<span class="feebback-pending-buttons" style="color:red;cursor:' + cursor + '">');
                                content.push('<a href="#"  id="CheckItemsNotOk' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "NotOk" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-close ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                                content.push('<i  id="CheckItemsNotOks' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '_' + checkstaticId + '"">' + NotOkCount + '</span></i>');
                                content.push('</a>');
                                //content.push('<span style="color:red;">' + NotOkCount +'</span>');
                                content.push('</span>');
                                //content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span > ');
                                content.push('</div>');
                              }
                            }

                            
                        //  ---------------------------------Not Ok Items --------------------------
                        //  ---------------------------------Skip  Items --------------------------

                        if (data.checklistitemstatusid == 4) {
                            content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:'+ cursor +'">');
                            content.push('<span class="feebback-pending-buttons" style="cursor:'+ cursor +'">');
                            content.push('<a href="#" id="CheckItemsSkip' + data.qflfeedbackworkflowid + '_'+checkstaticId + '" onclick=btntbnCheckItems("' + "Skip" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-skipCheck ' + disabled + ' " data-toggle="tooltip" title="Skip" aria-hidden="true">');
                            content.push('<i style="color:gray; cursor:' + cursor + '" id="CheckItemsSkips' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-share" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                            content.push('</a>');
                            content.push('</span>');
                            //content.push('<span class="feedback-button-number" id=""></span>');
                            content.push('</div>');

                        }
                        else {

                            if (data.checklistitemstatusid == 2 || data.checklistitemstatusid == 3 ||
                                data.checklistitemstatusid == 5 || data.checklistitemstatusid == 6 ||  data.checklistitemstatusid == 7) {

                               
                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');

                                content.push('<span class="feebback-pending-buttons style="cursor:' + cursor + '">');
                                content.push('<a href="#" id="CheckItemsSkip' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Skip" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-skip disabled" ToolTipService.ShowOnDisabled="True" data-toggle="tooltip" title="Skip" aria-hidden="true">');
                                content.push('<i style="cursor:' + cursor + '" id="CheckItemsSkips' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-share"><span class="feedback-button-number" id=""></span></i>');
                                content.push('</a>');
                                content.push('</span>');
                                // content.push('<span class="feedback-button-number" id=""></span>');
                                content.push('</div>');
                            }

                            else {

                                content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');

                                content.push('<span class="feebback-pending-buttons style="cursor:' + cursor + '">');
                                content.push('<a href="#" id="CheckItemsSkip' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Skip" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","blank",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn btn-skip ' + disabled + ' " ToolTipService.ShowOnDisabled="True" data-toggle="tooltip" title="Skip" aria-hidden="true">');
                                content.push('<i style="cursor:' + cursor + '" id="CheckItemsSkips' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-share"><span class="feedback-button-number" id=""></span></i>');
                                content.push('</a>');
                                content.push('</span>');
                                // content.push('<span class="feedback-button-number" id=""></span>');
                                content.push('</div>');
                            }

                        }
                        //  ---------------------------------Skip Items --------------------------


                    
                }

                if (GateName != "Rework") {
                    content.push('<div class="col-sm-3 feedback-action p-lr-5" style="cursor:' + cursor + '">');

                    content.push('<span class="feebback-pending-buttons" style="color:red;cursor:' + cursor +'">');
                    content.push('<a href="#"  id="CheckItemsReset' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" onclick=btntbnCheckItems("' + "Reset" + '","' + data.qflfeedbackworkflowid + '","' + data.checklistitemid + '","' + data.vinid + '","' + data.statichecklistitemid + '","' + checkItem + '",' + data.individualitemcount + ',' + data.givennotokcount + ',' + data.okcheckcount + ',' + data.notokcheckcount + ') class="btn-reset btn ' + disabled + '" data-toggle="tooltip" title="Reset" aria-hidden="true">');
                    content.push('<i style="cursor:' + cursor + '" id="CheckItemsResets' + data.qflfeedbackworkflowid + '_' + checkstaticId + '" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    content.push('</div>');
                    content.push('</div>');
                }


                    $('td', row).eq(5).empty().append(content.join(''));

                    $('td', row).eq(6).empty().append('<span></span>');
                
               
            }
        })

    }
    
 
}


function btnstandard(standardName)
{
	var invaild;
    var url;
    var guid = 0;
    var file = '';
	if (standardName == "" || standardName==null) {
        $('#DynamicAlertModal').modal('show');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('None of files available for this StandardMaster !..');
        }
        else {
            $('#hTitle3').text('このStandardMasterで使用できるファイルはありません');
        }
        return false;
    }
    else {
        event.stopPropagation();
        var json = {
            "plantid": $('#drpPlant').find(':selected').val(),
            "standardid": 0,
            "standardname": standardName
        };
        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'Master.svc/DownloaadStandardMasterDetails';
        PostMethod(ApiFunc, Input, Token, function (data) {

            // BindingData(data);
           
            guid = data.fileguid;
			file = data.filename;
			
			if ((guid != 0 && guid != null) && (file != 0 && file != null)) {
				invaild = true;
				url = "../Home/RedirectStandardMasterFile?StandardMasterfilename=" + guid + "&filename=" + file;
				//alert(url);
				//event.stopPropagation();
				window.open(url, "_blank");

				//win.focus();
			}
			else {
				invaild = false;
				if (invaild == false) {
					$('#DynamicAlertModal').modal('show');
					if (UserDetails.Language == "en") {
						$('#hTitle3').text('None of files available for this StandardMaster !..');
					}
					else {
						$('#hTitle3').text('このStandardMasterで使用できるファイルはありません');
					}

				}
			}

            //window.open("../Home/DownLoadStandardMasterFile?StandardMasterfilename=" + data.fileguid + "&filename=" + data.filename, data.filename, 'width=400, height=400');
            //Window.location.href = "../Home/DownLoadStandardMasterFile?StandardMasterfilename=" + data.fileguid + "&filename=" + data.filename;
            //var win = window.open(url, '_blank');
            //win.focus();
            //return false;
            //637958MP38FMK10
        });
		//alert(guid);
		
		
		

    }
	
	guid = '';
	file = '';
}
var statichecklistitemids=0

function AddBlankChecklistItem(id, statichecklistitemid,qflfeedbackworkflowid) {
    $("#blankcheckitem").css("border-color", "");

    $('#blankcheckitem').val('');
    $("#blankcheckitem").hide();
    $("#bindingemptycheckitems").show();
    $("#BlankOtherCheckItemsid").show();

    blankChecklistItemId = id;
    statichecklistitemids = statichecklistitemid;

    var content = [];
    var EmptyCheckItems = ChecklistItemsAll.listofchecklistitems;
    var EmptyCheckItemsSpec
    EmptyCheckItemsSpec = EmptyCheckItems.filter(function (x) { return x.qflfeedbackworkflowid == qflfeedbackworkflowid; });
    var inspection = "";
    var OriginalInspectionItem="";
    if (EmptyCheckItemsSpec.length > 0) {
        inspection = EmptyCheckItemsSpec[0].inspectionitem;
        OriginalInspectionItem=EmptyCheckItemsSpec[0].OriginalInspectionItem
    }

    var GetEmptyCheckItems = BindingBlankCheckItems.filter(function (x) { return x.inspectionitem == inspection; });

    
    var CheckValue = 0;

    if(OriginalInspectionItem.toUpperCase()=="ADD")
    {
        if (GetEmptyCheckItems.length > 1) {


            for (var i = 0; i <= GetEmptyCheckItems.length; i++) {
                if (GetEmptyCheckItems[0].spec != "") {
                    CheckValue = i + 1;

                }
            }
        }
    }
    else{
        if (GetEmptyCheckItems.length > 0) {


            for (var i = 0; i <= GetEmptyCheckItems.length; i++) {
                if (GetEmptyCheckItems[0].spec != "") {
                    CheckValue = i + 1;

                }
            }
        }
}
   

        if (CheckValue ==0) {

        $("#blankcheckitem").show();
        $("#bindingemptycheckitems").hide();
         $("#BlankOtherCheckItemsid").hide();
    }
    $("#bindingemptycheckitems").empty();
   
    BlankSepc = "";
    $.each(GetEmptyCheckItems, function (i, EmptyCheckItems1) {

        content.push('<div>');
        content.push('<label class="radio-inline">');
        content.push('<input type="radio" id="' + "BlankCheckItems_" + EmptyCheckItems1.checklistitemid + '" value="' + EmptyCheckItems1.spec +'" onchange=EmptyCheckItemonChange("BlankCheckItems_","' + EmptyCheckItems1.checklistitemid+'") name="optradio">' + EmptyCheckItems1.spec);
        content.push('</label>');
        content.push('</div>');
    });

    $("#bindingemptycheckitems").append(content.join(''));
   
}
var BlankSepc = "";
function EmptyCheckItemonChange(BlankCheckItems, checklistitemid) {
    var Spec = $("#" + BlankCheckItems + checklistitemid).val();
 
    BlankSepc = Spec;
}

function SaveBlankChecklistItem() {

    if (BlankSepc == "" && $('#blankcheckitem').val()=="") {
        $("#blankcheckitem").css("border-color", "red");
        return false;
    }

    if (BlankSepc == "") {
        var json = {
            "checkitems": $('#blankcheckitem').val(),
            "checklistitemid": blankChecklistItemId,
            "staticchecklistItemId": statichecklistitemids,

            "vinid": VinIds,
            "qgateid": QgateId
        };
    }
    else {
        var json = {
            "checkitems": BlankSepc,
            "checklistitemid": blankChecklistItemId,
            "staticchecklistItemId": 0,

            "vinid": VinIds,
            "qgateid": QgateId
        };
    }

   
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/UpdateBlankCheckItem';
    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data != null) {
            if (data.result == "False") {
                $("#DynamicAlertModal").modal('show');

                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('Checklist Item update failed, please contact your administrator..');

                }
                else {
                    $('#hTitle3').text('チェックリストアイテムが失敗しました。管理者に連絡してください。');
                }
            }
            else {
                $("#checkitem").modal('hide')
                GetCheckListItems(UserDetails.PlantId, QgateId, "")
            }
        }
    });
}

function GetCheckListItems(PlantId, QgateId, Mode) {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

   
    var json = {
        "plantid": PlantId,
        "modelnumber": ModelNumber,
        "qgateid": QgateId,
        "userid": UserDetails.UserId,
        "vinmodel": VIN,
        "mode": Mode
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCheckListItems';
    PostMethod(ApiFunc, Input, Token, function (data) {
        showloader();
        $('#Completedbtn').prop('disabled', true);
        if (data.result == "Not Exists" || data.result == "No CheckListItems") {
            data.listofchecklistitems = "";

        }


        if (data.isreworkcompleted) {

            document.getElementById("Qgateid_" + Reworkgateid).style.backgroundColor = "darkgreen";

        }
        else {
            document.getElementById("Qgateid_" + Reworkgateid).style.backgroundColor = "";

        }
       


        if (data.isreexaminationcompleted) {
            document.getElementById("Qgateid_" + ReExaminationgateid).style.backgroundColor = "darkgreen";
          
        }
        
        if (data.isreexaminationcompletedjp) {
            document.getElementById("Qgateid_" + ReExaminationgateidjp).style.backgroundColor = "darkgreen";
          
        }
       
        if(data.QGReExamBackgroundColor==false)
        {
            document.getElementById("Qgateid_" + ReExaminationgateid).style.backgroundColor = "";

        }

        if(data.JPReExamBackgroundColor==false)
        {
            document.getElementById("Qgateid_" + ReExaminationgateidjp).style.backgroundColor = "";

        }

        if (data.ReworkNotificationcount != 0) {
            $("#Notificationcount").text(data.ReworkNotificationcount);
            $("#Notificationcount").show();

        }
        else {
            $("#Notificationcount").hide();
        }
        

        ConfirmationCheckItems(data);
        BindingCheckListItems(data, CheckListItemStatus);
        hideloader();
        if (data.iscompleted) {
            CompletedDetails(data);
        }
        if (GateName == "Rework") {

            if (data.isreworkcompleted) {
               
                CompletedDetails(data);
            }
        }
        else if (GateName == "Re-Examination" ) {

            if (data.isreexaminationcompleted) {
                CompletedDetails(data);
            }
        }

        else if (GateName == "Re-Examination1") {

            if (data.isreexaminationcompletedjp) {
                CompletedDetails(data);
               
                $('#Completedbtn1').prop('disabled', true);
            }
        }
        // if Japanese ReExamination is completed, should not be revert completion all the gates. Once Revert Japanese ReExamination,Should Revert another gates
        if (data.isreexaminationcompletedjp) {
            $('#Completedbtn1').prop('disabled', true);
        }

    });
    Mode = "";
}
function CompletedDetails()
{
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    
        var json = {
            "vinnumber": VIN,
            "gatename": GateName,
            "userid": UserDetails.UserId,
            "ModelName": ModelNumber
        };
        var Input = JSON.stringify(json);

        var ApiFunc = Api + 'QFL.svc/GetSealGateDetails';
        PostMethod(ApiFunc, Input, Token, function (data) {



            if (GateName == "Rework") {
                var Signature = data.listsealgate1;


                if (Signature.length > 0) {
                    if (Signature[0].isreworkcompleted) {
                        $('#VINCompletionDetails').show();
                        $('#vinCompletetxt').text('Completed on ' + Signature[0].reworkcompleteddate + ' JST' + ' by ' + Signature[0].completedname);

                        $('#vinCompletetxt').show();
                    }
                }
            }
            else if (GateName == "Re-Examination" ) {
                //var Signature = data.listsealgate1;

                var Signature = data.listsealgate.filter(function (x) { return x.gatename == 'Re-Examination'; });

                if (Signature.length > 0) {
                    if (Signature[0].isreexaminationcompleted) {
                        $('#VINCompletionDetails').show();
                        $('#vinCompletetxt').text('Completed on ' + Signature[0].reexaminationcompleteddate + ' JST' + ' by ' + Signature[0].completedname);

                        $('#vinCompletetxt').show();
                    }
                }
            }

            else if ( GateName == "Re-Examination1") {
                //var Signature = data.listsealgate1;

                var Signature = data.listsealgate.filter(function (x) { return x.gatename == 'Re-Examination1'; });

                if (Signature.length > 0) {
                    if (Signature[0].isreexaminationcompleted) {
                        $('#VINCompletionDetails').show();
                        $('#vinCompletetxt').text('Completed on ' + Signature[0].reexaminationcompleteddate + ' JST' + ' by ' + Signature[0].completedname);

                        $('#vinCompletetxt').show();
                    }
                }
            }



            else if (GateName == "塗装 Rework") {
                var Signature = data.listsealgate1;


                if (Signature.length > 0) {
                    if (Signature[0].isreworkcompleted) {
                        $('#VINCompletionDetailsForPainting').show();
                        $('#vinCompletetxtForPainting').text('Completed on ' + Signature[0].reworkcompleteddate + ' JST' + ' by ' + Signature[0].completedname);

                        $('#vinCompletetxtForPainting').show();
                    }
                }
            }

            else if (GateName == "塗装 Re-Examination") {
                //var Signature = data.listsealgate1;

                var Signature = data.listsealgate.filter(function (x) { return x.gatename == '塗装 Re-Examination'; });

                if (Signature.length > 0) {
                    if (Signature[0].isreexaminationcompleted) {
                        $('#VINCompletionDetailsForPainting').show();
                        $('#vinCompletetxtForPainting').text('Completed on ' + Signature[0].reexaminationcompleteddate + ' JST' + ' by ' + Signature[0].completedname);

                        $('#vinCompletetxtForPainting').show();
                    }
                }
            }


            else {
                var Signature = data.listsealgate1.filter(function (x) { return x.gateid == QgateId; });

                if (Signature.length > 0) {
                    if (Signature[0].iscompleted) {

                        if (ReExaminationGateIdvarient == 3) {
                            $('#VINCompletionDetailsForPainting').show();
                            $('#vinCompletetxtForPainting').text('Completed on ' + Signature[0].completeddate + ' JST' + ' by ' + Signature[0].completedname);

                            $('#vinCompletetxtForPainting').show();
                        }
                        else {

                        
                        $('#VINCompletionDetails').show();
                        $('#vinCompletetxt').text('Completed on ' + Signature[0].completeddate + ' JST' + ' by ' + Signature[0].completedname);

                            $('#vinCompletetxt').show();
                        }
                    }
                }
            }
         



        });
    }



function GetSealGateItems() {
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var json = {
        "vinnumber": VIN,
        "gatename": GateName,
        "userid": UserDetails.UserId,
        "ModelName": ModelNumber
    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'QFL.svc/GetSealGateDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {

        if (data.listsealgate !=null || data.listsealgate != "") {

            BindingSealGate(data);
        }
       
        
        else {
          
            $("#Qgateid_" + QgateId).attr("disabled", true);
            
        }

        });

}

function BindingSealGate(data) {
    $("#BindingCheckListItems").empty();
    $("#maingateheader").hide();
    $("#sealgateheader").show();
    $("#checklistitemstatusid").hide();
    $("#PaintingMastertable").hide();
    $("#PaintingReworkgateheader").hide();
    $("#tblQFLFeedbackReworkPainting").hide();
    $("#tblQFLFeedbackReworkPainting_wrapper").hide();
    $("#tblQFLFeedbackReExamPainting").hide();
    $("#tblQFLFeedbackReExamPainting_wrapper").hide();

    $("#tblQFLFeedback_wrapper").hide();
    $("#SealGateRemovefoot").hide();
    $("#tblQFLFeedbackRework_wrapper").hide();
    $("#tblQFLFeedbackRework_paginate").hide();
    $("#Reworkgateheader").hide();
    $("#tblQFLFeedbackReExamination_wrapper").hide();

    
    $("#ReExaminationgateheader").hide();
    $("#tblQFLFeedbackReExamination").hide();
    $("#PaintingReExamgateheader").hide();
    $("#screenshot").hide();

   // $("#tblQFLFeedbackSeal").show();
    $("#Checkitemtables").show();


    var content = [];
    var SealGateItems = "";
    $("#BindingSealGate").empty();
    SealGateItems = data.listsealgate;
    var Image = "";
   
    var BingSealGateDetails = "";
   
    $.each(SealGateItems, function (i, SealGateItems) {
        //Image = "18_04_2020_154110.png";
        if (SealGateItems.gatename == "Rework" || SealGateItems.gatename =="塗装 Rework") {
            BingSealGateDetails = "";
            BingSealGateDetails = '<tr class="trtblSchedule odd" role="row">';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.sno + '</td>';
          
                BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.gatename + '</td>';
            

            BingSealGateDetails = BingSealGateDetails + '<td> ' + SealGateItems.completedname + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.reworkcompleteddate + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td id="SealGate' + SealGateItems.sno + '" value="' + SealGateItems.filename + '"  onclick=DownloadSignature("' + SealGateItems.filename + '")></td>';
            BingSealGateDetails = BingSealGateDetails + '</tr>';
        }
        else if (SealGateItems.gatename == "Re-Examination" || SealGateItems.gatename == "Re-Examination1" || SealGateItems.gatename == "塗装 Re-Examination") {
            BingSealGateDetails = "";
            BingSealGateDetails = '<tr class="trtblSchedule odd" role="row">';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.sno + '</td>';
            //BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.gatename + '</td>';


            if(SealGateItems.gatename == "Re-Examination")
            {
                BingSealGateDetails = BingSealGateDetails + '<td>' + "QG Re-Examination" + '</td>';

            }
            else if(SealGateItems.gatename == "Re-Examination1")
            {
                BingSealGateDetails = BingSealGateDetails + '<td>' +"完成 Re-Examination"+ '</td>';

            }
            else if (SealGateItems.gatename == "塗装 Re-Examination")
            {
                BingSealGateDetails = BingSealGateDetails + '<td>' +"塗装 Re-Examination"+ '</td>';

            }
           

            BingSealGateDetails = BingSealGateDetails + '<td> ' + SealGateItems.completedname + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.reexaminationcompleteddate + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td id="SealGate' + SealGateItems.sno + '" value="' + SealGateItems.filename + '"  onclick=DownloadSignature("' + SealGateItems.filename + '")></td>';
            BingSealGateDetails = BingSealGateDetails + '</tr>';
        }

        else {
          
            BingSealGateDetails = "";
            BingSealGateDetails = '<tr class="trtblSchedule odd" role="row">';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.sno + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.gatename + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td> ' + SealGateItems.completedname + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td>' + SealGateItems.completeddate + '</td>';
            BingSealGateDetails = BingSealGateDetails + '<td id="SealGate' + SealGateItems.sno + '" value="' + SealGateItems.filename + '"  onclick=DownloadSignature("' + SealGateItems.filename + '")></td>';
            BingSealGateDetails = BingSealGateDetails + '</tr>';
        }
      

        $("#BindingSealGate").append(BingSealGateDetails);
        $('#SealGate' + SealGateItems.sno).prepend('<img style="height:100px" id="" src="' + UserDetails.SignatureSitePath+ SealGateItems.filename + '" />')
    });

    //$("#BindingSealGate").append(content.join(''));

    
}

function DownloadSignature(SignatureFilename) {
  
    //window.location.href = "../Home/DownLoadCheckListFile?checklistfilename=" + data.checklistfilename;
   
    window.location.href = "../Home/DownLoadSignatureFile?SignatureFilename=" + SignatureFilename;
    //var ApiFunc = "../Home/DownLoadSignature?SignatureFilename=" + SignatureFilename;
   
    //JsonPostMethod(ApiFunc, '', '', function (data) {
    //    if (data != null && data != '') {
    //        window.location.href = "../Home/DownLoadSignatureFile?SignatureFilename=" + SignatureFilename;
    //    }
    //    else {

    //    }
    //});
}



function ConfirmationCheckItems(data) {

    $("#Completedbtn1").hide();
    $("#Completedbtn").hide();

    if (data.result == "No CheckListItems") {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('No Checkitems found');

        }
        else {
            $('#hTitle3').text('チェックアイテムが見つかりません');
        }
    } 
    else if (data.result == "Not Exists") {
        if (data.vinexists == "VinNotExists") {
           
            $("#ConfirmationpopupVin").modal('show');
            if (UserDetails.Language == "en") {
                //$('#ConfirmationMessageVin').text('Are you want to submit the VIN No : ' + $('#txtVinQRNumber').val() + ' ?');
                $('#ConfirmationMessageVin').html('Are you sure? Want to submit the VIN :  ' + $('#txtVinQRNumber').val() + ' ? ');


            }
            else {
                //$('#ConfirmationMessageVin').text('VINを送信しますか : ' + $('#txtVinQRNumber').val() + ' ?');
                $('#ConfirmationMessageVin').html('本気ですか？ VINを送信したい：' + $('#txtVinQRNumber').val() + ' ? ');

            }
        }
        else {
            Mode = "Y";
            GetCheckListItems(UserDetails.PlantId, QgateId, Mode);
        }
       
    }
    else if (data.result == "Inserted") {
        $("#ConfirmationpopupVin").modal('hide');
    }

}

function btntbnCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount,reexamflg) {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }
    VinIds = VinId;

       var CheckstaticId = checklistitemid

    if (CheckstaticId == 0 || CheckstaticId == "" || CheckstaticId == undefined || CheckstaticId == null) {
        CheckstaticId = staticchecklistitemid;
    }


    uploadedFileName="";
    $(".uploaded_imageid").hide();
    OtherSignatureValidation= document.getElementById('newSignature1');
    DamageSignatureValidation= document.getElementById('newSignature1Damage');
      
    var context = OtherSignatureValidation.getContext("2d");
    var context1 = DamageSignatureValidation.getContext("2d");

    clearCanvas(context, OtherSignatureValidation);
    clearCanvas(context1, DamageSignatureValidation);

    OtherSignatureValidation=OtherSignatureValidation.toDataURL("image/png")
    DamageSignatureValidation=DamageSignatureValidation.toDataURL("image/png")

    QFLCheckListItemIdforskip = checklistitemid
    QFLstaticCheckListItemIdforskip = staticchecklistitemid
    StaticCheckListItemId = staticchecklistitemid;
    ReverseSite1Selection = "";
    ReverseSite2Selection = "";
    ReverseSite3Selection = "";
    ReverseSite4Selection = "";
    ReverseSite5Selection = "";
    SelectedCheckListItemId = "";
    SelectedStaticCheckListItemId = "";

    DefectStaticCheclist = QFLFeedbackWorkflowId;

    SelectedDefectPlace = "";

    Site1Reverse = "";
    Site2Reverse = "";
    Site3Reverse = "";
    Site4Reverse = "";
    Site5Reverse = "";
    DamageReverse = "";

    SelectedSite1Data = "";
    SelectedSite2Data = "";
    SelectedSite3Data = "";
    SelectedSite4Data = "";
    SelectedSite5Data = "";
    SelectedDamageData = "";

    ClickNotOkItems = "";
    if (CheckListItem == "") {

       

            $("#DynamicAlertModal").modal('show');
            if (UserDetails.Language == "en") {
                //$('#ConfirmationMessageVin').text('Are you want to submit the VIN No : ' + $('#txtVinQRNumber').val() + ' ?');
                $('#hTitle3').html('Please enter CheckItem characters / symbols appears');


            }
            else {
                //$('#ConfirmationMessageVin').text('VINを送信しますか : ' + $('#txtVinQRNumber').val() + ' ?');
                $('#hTitle3').html('文字・記号を入力してください');

            }
            return false;
      

       
    }

    

    var CheckItemstatus = 0;
    StaticCheckListItemId = "";
    StaticCheckListItemId = staticchecklistitemid;
    DefectStaticCheclist = QFLFeedbackWorkflowId;

   

    var Ok = "";
    var NotOk = "";
    var Skip = "";
    
     
    
    if ((GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") && (CheckItems != "NotOk")) {

        

            var classNameOk = $('#CheckItemsOk' + QFLFeedbackWorkflowId).attr('class');
            if (classNameOk == undefined) {
                classNameOk = ""
            }

       
        if ((classNameOk.trim() == "btn-saveCheck" || classNameOk.trim() == "btn-saveCheck disabled") && CheckItems == "Ok") {
                return false;
        }


      

            var classNameOk = $('#CheckItemsOk' + QFLFeedbackWorkflowId).attr('class');
            var classNameNotOk = $('#CheckItemsNotOk' + QFLFeedbackWorkflowId).attr('class');
            var classNameSkip = $('#CheckItemsSkip' + QFLFeedbackWorkflowId).attr('class');



            if (CheckItems == "Reset") {

                if (GateName == "Rework") {

                    if (classNameOk.trim() == "btn-saveCheck") {

                        if (reexamflg == true) {
                            document.getElementById("CheckItemsOk" + QFLFeedbackWorkflowId).style.backgroundColor = "red";

                        }

                        $('#CheckItemsResets' + QFLFeedbackWorkflowId).removeClass("fas fa-refresh").addClass("fas fa-spinner fa-spin");
                        var ReExamid = "ReExamItemCount" + QFLFeedbackWorkflowId;
                        $("#" + ReExamid).hide();

                        $("#OkCheckItemCount" + QFLFeedbackWorkflowId).text("");
                        $("#ReExamItemCount" + QFLFeedbackWorkflowId).text("");
                        $("#NotOkCount" + QFLFeedbackWorkflowId).text("");


                        $('#CheckItemsOks' + QFLFeedbackWorkflowId).css("color", "white");
                        $('#CheckItemsOk' + QFLFeedbackWorkflowId).removeClass("btn-saveCheck ").addClass("btn btn-save ");

                        //$('#CheckItemsNotOks' + QFLFeedbackWorkflowId).css("color", "white");
                        //$('#CheckItemsNotOk' + QFLFeedbackWorkflowId).removeClass("btn-closeCheck").addClass("btn btn-close");

                        $('#CheckItemsResets' + QFLFeedbackWorkflowId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-refresh");

                        UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);
                        return false;
                    }
                }

                else if (classNameOk.trim() == "btn-saveCheck" || classNameNotOk.trim() == "btn btn-closeCheck") {
                    $('#CheckItemsResets' + QFLFeedbackWorkflowId).removeClass("fas fa-refresh").addClass("fas fa-spinner fa-spin");


                    var ReExamid = "ReExamItemCount" + QFLFeedbackWorkflowId;

                    $("#OkCheckItemCount" + QFLFeedbackWorkflowId).text("");
                    $("#ReExamItemCount" + QFLFeedbackWorkflowId).text("");
                    $("#" + ReExamid).hide();
                    $("#NotOkCount" + QFLFeedbackWorkflowId).text("");


                    $('#CheckItemsOks' + QFLFeedbackWorkflowId).css("color", "white");
                    $('#CheckItemsOk' + QFLFeedbackWorkflowId).removeClass("btn-saveCheck ").addClass("btn btn-save ");

                    $('#CheckItemsNotOks' + QFLFeedbackWorkflowId).css("color", "white");
                    $('#CheckItemsNotOk' + QFLFeedbackWorkflowId).removeClass("btn-closeCheck").addClass("btn btn-close");

                    $('#CheckItemsResets' + QFLFeedbackWorkflowId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-refresh");

                    UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);
                    return false;
                }
            }
            else {

                $('#CheckItemsOks' + QFLFeedbackWorkflowId).removeClass("fas fa-check").addClass("fas fa-spinner fa-spin");

                if (GateName == "Rework") {

                    $("#NotOkCount" + QFLFeedbackWorkflowId).text("");

                    $("#OkCheckItemCount" + QFLFeedbackWorkflowId).text(individualitemcount);

                    $('#CheckItemsOks' + QFLFeedbackWorkflowId).css("color", "green");
                    $('#CheckItemsOk' + QFLFeedbackWorkflowId).removeClass("btn btn-save").addClass("btn-saveCheck ");

                    $('#CheckItemsNotOks' + QFLFeedbackWorkflowId).css("color", "white");
                    $('#CheckItemsNotOk' + QFLFeedbackWorkflowId).removeClass("btn-closeCheck").addClass("btn btn-close");

                }


                else if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

                    $("#OkCheckItemCount" + QFLFeedbackWorkflowId).text(individualitemcount);

                    $('#CheckItemsOks' + QFLFeedbackWorkflowId).css("color", "green");
                    $('#CheckItemsOk' + QFLFeedbackWorkflowId).removeClass("btn btn-save").addClass("btn-saveCheck ");

                    $('#CheckItemsNotOks' + QFLFeedbackWorkflowId).css("color", "white");
                    $('#CheckItemsNotOk' + QFLFeedbackWorkflowId).removeClass("btn-closeCheck").addClass("btn btn-close");

                }
                $('#CheckItemsOks' + QFLFeedbackWorkflowId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-check");


                UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);
                return false;
            }

        

        //else {
        //    $('#CheckItemsOks' + QFLFeedbackWorkflowId).removeClass("fas fa-check").addClass("fas fa-spinner fa-spin");

        //}
            
     }
        
    if (CheckItems == "Reset")
    {
        btnbtnResetCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg)
    }

    

    else if (CheckItems == "Ok") {

        btnbtnOkCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg)
   
    }
   

    else if (CheckItems == "NotOk") {

        btnbtnNotOkCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg)
    }
    else if (CheckItems == "Skip") {
        btnbtnSkipCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg)
     
    }
    if (CheckItems != "NotOk") {
        CheckItemValue = CheckItems;

       //UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItemValue,GateName);
    }
    var Pending = $("#spPendingCount").text();
    if (GateName == "Re-Examination" || GateName == "Re-Examination1") {
        if (Pending == 0 && IsReExamSignature == true) {
            $('#Completedbtn').prop('disabled', false);
        }
        else {
            $('#Completedbtn').prop('disabled', true);
        }
    }
    else {
        if (Pending == 0) {
            $('#Completedbtn').prop('disabled', false);
        }
        else {
            $('#Completedbtn').prop('disabled', true);
        }
    }
}
function UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItemValue, GateName)
{
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }
   
    var json = {
        "checkitemstatus": CheckItemstatus,
        "qflfeedbackworkflowid": QFLFeedbackWorkflowId,
        "checklistitemid": checklistitemid,
        "gatename": GateName,
        "checkitemvalue": CheckItemValue,
        "userid": UserDetails.UserId,
        "staticchecklistitemid": StaticCheckListItemId,
        "vinnumber": VIN,
        "selecteddefectplace": SelectedDefectPlace,
        "uploadedFileName": uploadedFileName,
        "Vinid": VinIds,
        "ModelName": ModelNumber

    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatus';
    PostMethodForUpdate(ApiFunc, Input, Token, function (data) {
        if (checkItemMenu == "MenuItems" || (GateName == "Rework" && CheckItemValue=="NotOk") ) {
            GetCheckListItems(UserDetails.PlantId, QgateId, '')

        }

        if (GateName == "Rework" || GateName == "Re-Examination" || GateName == "Re-Examination1") {
            var spOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Ok"; });
            var spNotOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "NotOk"; });
            var spSkippedCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Skip"; });
            var spPendingCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Pending"; });

            if (spOkCount.length > 0) {


                $("#spOkCount").text(spOkCount[0].totalrecords);
            }
            else {
                $("#spOkCount").text(0);
            }
            if (spNotOkCount.length > 0) {

                $("#spNotOkCount").text(spNotOkCount[0].totalrecords);
            }
            else {
                $("#spNotOkCount").text(0);
            }
            if (spPendingCount.length > 0) {

                $("#spPendingCount").text(spPendingCount[0].totalrecords);
            }
            else {
                $("#spPendingCount").text(0);

            }

            var Total = $("#spTotalCount").text();
            var Ok = $("#spOkCount").text();

            if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

                if (Total == Ok && IsReExamSignature == true) {
                    $('#Completedbtn').prop('disabled', false);
                }
                else {
                    $('#Completedbtn').prop('disabled', true);
                }
            }
            else {
                if (Total == Ok) {
                  

                    $('#Completedbtn').prop('disabled', false);
                }
                else {
                    $('#Completedbtn').prop('disabled', true);
                }
            }
        }

        else {

           

            var spOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Ok"; });
            var spNotOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "NotOk"; });
            var spSkippedCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Skip"; });
            var spPendingCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Pending"; });

            if (spOkCount.length > 0) {


                $("#spOkCount").text(spOkCount[0].totalrecords);
            }
            else {
                $("#spOkCount").text(0);
            }

            if (spSkippedCount.length > 0) {


                $("#spSkippedCount").text(spSkippedCount[0].totalrecords);
            }
            else {
                $("#spSkippedCount").text(0);
            }
            if (spNotOkCount.length > 0) {

                $("#spNotOkCount").text(spNotOkCount[0].totalrecords);
            }
            else {
                $("#spNotOkCount").text(0);
            }
            if (spPendingCount.length > 0) {

                $("#spPendingCount").text(spPendingCount[0].totalrecords);
            }
            else {
                $("#spPendingCount").text(0);

            }

            var Total = $("#spTotalCount").text();
            var PendingCount = $("#spPendingCount").text();
            var NotOk = $("#spNotOkCount").text();
            var Skip = $("#spSkippedCount").text();
            var Ok = $("#spOkCount").text();

            var all =  parseInt(NotOk) + parseInt(Skip) +parseInt(Ok);

            if (parseInt(Total) == all) {
                $('#Completedbtn').prop('disabled', false);
            }
            else {
                $('#Completedbtn').prop('disabled', true);
            }

        }
       
        
    })
}


var checkItemMenu = "";
function CheckListitemsStatus(CheckItemStatus) {
    CheckListstatusItem = CheckItemStatus;
    if (CheckItemStatus == "Total") {
        checkItemMenu = "";
    }
    else {

        checkItemMenu = "MenuItems";
    }

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

   
    showloader();

    var json = {
        "plantid": UserDetails.PlantId,
        "modelnumber": ModelNumber,
        "qgateid": QgateId,
        "userid": UserDetails.UserId,
        "vinmodel": VIN,
        "mode": Mode
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCheckListItems';
    PostMethod(ApiFunc, Input, Token, function (data) {

        BindingCheckListItems(data, CheckListstatusItem)
        hideloader();


        if (data.iscompleted) {
            CompletedDetails(data);
        }
        if (GateName == "Rework") {

            if (data.isreworkcompleted) {

                CompletedDetails(data);
            }
        }
        else if (GateName == "Re-Examination") {

            if (data.isreexaminationcompleted) {
                CompletedDetails(data);
            }
        }

        else if (GateName == "Re-Examination1") {

            if (data.isreexaminationcompletedjp) {
                CompletedDetails(data);
            }
        }

    });
   
   
    
}

function BindingPlaceClass(checklistitemid, VinId) {
  
    var json = {
        "checklistitemid": checklistitemid,
        "vinid": VinId,
        "qgateid": QgateId,
         "staticchecklistitemid": StaticCheckListItemId
       
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
    PostMethod(ApiFunc, Input, Token, function (data) {

        var Defect = data.listchecklistdefectitems.length;
       
        if (Defect == 0) {
           
            var json = {
                "checklistitemid": QFLCheckListItemIdforskip,
                "defectplace": QFLDefectPlaceItems,
                "vinid": VinIds,
                "qgateid": QgateId,
                "staticchecklistitemid": QFLstaticCheckListItemIdforskip
            };
            var Input = JSON.stringify(json);

            if (ClickNotOkItems == "NotOk") {
                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
            }
            else {
                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
            }
            PostMethod(ApiFunc, Input, Token, function (data) {
                var SiteValue = "";
                for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                    if (data.listchecklistdefectitems[i].site1 != "") {
                        SiteValue = data.listchecklistdefectitems[i].site1;
                    }

                }

                if (SiteValue != "") {
                    QFLFeeedBackSitePopup(data);
                    $("#myModal2").modal('show');
                   
                }
                else {
                    GetDamageDefectItems(data.qflselectedname);
                }


               
                DefectPlacePopupdata = "";
               
            });




        }
        else {
            BindingDefectPlacePopup(data)
        }
       
    })

   
}
var DefectPlacePopupdata = "";
function BindingDefectPlacePopup(data) {
    $("#DefectValidation").text("");
    DefectPlacePopupdata = data;
    QFLDefectPlaceItems ="";
    QFLCheckListItemId = "";
    DefectPlaceStaticItem = StaticCheckListItemId;
    StaticCheckListItemId = "";
    SelectedCheckListItemId = "";
    SelectedStaticCheckListItemId = "";
    SelectedDefectPlace = "";

    var content = [];
  
    var CheckItemDefectClass = data.listchecklistdefectitems;
	//var CheckItemDefectClasslen = CheckItemDefectClass.length;
	if (UserDetails.Language == "en") {
		$('#btnSubmit').val('Done');
	}
	else {
        $('#btnSubmit').val('できた');
	}

    $("#myModal").modal('show');
    var count = 1;
    var a = 0;
    var i;

    for (var x = 1; x <= 43; x++) {
        $("#QFLDefectPlace_" + x).html('&nbsp;');
       
        $("#QFLDefectPlace_" + x).removeClass("btn feedback-input-buttons btn-block feedback-input-buttons-click").addClass("btn feedback-input-buttons btn-block");
        $("#QFLDefectPlace_" + x).val("");
        $("#QFLDefectPlace_" + x).attr("disabled", false);

    }

    $.each(CheckItemDefectClass, function (i, ListCheckItemDefectClass) {
         //a = i + 1;
        $("#QFLDefectPlace_" + ListCheckItemDefectClass.positionnumber).text(ListCheckItemDefectClass.defectplace)
        $("#QFLDefectPlace_" + ListCheckItemDefectClass.positionnumber).val(ListCheckItemDefectClass.checklistitemid)

      //  $("#QFLDefectPlace_" + ListCheckItemDefectClass.positionnumber).attr('name', ListCheckItemDefectClass.defectplace);


        if (ListCheckItemDefectClass.defectplace == "") {
            $("#QFLDefectPlace_" + a).html('&nbsp;');
           
        }
           
       
        
    });
    //if (a != 0) {
    //    count = a + 1;

    //}
    //else {
    //    count=1
    //}
    var DefectPlace = "";
    for (i = 1; i <= 43; i++) {

        DefectPlace = document.getElementById("QFLDefectPlace_" + i).innerHTML;
        //DefectPlace = $("#QFLDefectPlace_" + i).text();
       

        if (DefectPlace == "&nbsp;") {
           
            $("#QFLDefectPlace_" + i).attr("disabled", true);
        }
      
       
    }
}


var ReverseSelection = "";
var SelectedDefectPlace = "";

function QFLDefectPlaceClick(DefectPlaceidValue) {
    
    var className = $("#" + DefectPlaceidValue).attr('class');

    var DefectPlaceid = $("#" + DefectPlaceidValue).val();
    var defectPlaceName = $("#" + DefectPlaceidValue).text();
    if (className == "btn feedback-input-buttons btn-block") {
       

        if (QFLDefectPlaceItems != "") {
            QFLDefectPlaceItems = QFLDefectPlaceItems + ","
        }

        if (QFLCheckListItemId != "") {
            QFLCheckListItemId = QFLCheckListItemId + ","
        }


        if (StaticCheckListItemId == "" || StaticCheckListItemId == "0") {
            StaticCheckListItemId = DefectPlaceStaticItem;
        }

        QFLDefectPlaceItems = QFLDefectPlaceItems +  defectPlaceName ;
        QFLCheckListItemId = QFLCheckListItemId + DefectPlaceid;

        if (QFLCheckListItemId != "") {
            $("#DefectValidation").hide();
           
        }
}
    if (className == "btn feedback-input-buttons btn-block feedback-input-buttons-click") {
       
        var DefectPlaceid = $("#" + DefectPlaceidValue).val();
        var defectPlaceName = $("#" + DefectPlaceidValue).text();
       
        QFLCheckListItemId = QFLCheckListItemId.replace(DefectPlaceid + ",", "");
        QFLDefectPlaceItems = QFLDefectPlaceItems.replace(defectPlaceName + ",", "")

        QFLCheckListItemId = QFLCheckListItemId.replace(DefectPlaceid, "");
        QFLDefectPlaceItems = QFLDefectPlaceItems.replace(defectPlaceName, "")
        StaticCheckListItemId = StaticCheckListItemId.replace(StaticCheckListItemId, "")
    }
    
}

var Site1Reverse = "";
var Site2Reverse = "";
var Site3Reverse = "";
var Site4Reverse = "";
var Site5Reverse = "";
var DamageReverse = "";

var SelectedSite1Data = "";
var SelectedSite2Data = "";
var SelectedSite3Data = "";
var SelectedSite4Data = "";
var SelectedSite5Data = "";
var SelectedDamageData = "";
function QFLFeeedBackSitePopup(data) {

   
    $("#DefectSiteValidation").text("");
    $("#DefectSite2Validation").hide();
    $("#DefectSiteValidation").hide();
    $("#DefectSite3Validation").hide();
    $("#DefectSite4Validation").hide();
    $("#DefectSite5Validation").hide();
    $("#DefectDamageValidation").hide();

    if (data.qflselectedname == "Site 1") {
        Site1Reverse = "Active";
        SelectedSite1Data = data
    }
    else if (data.qflselectedname == "Site 2") {
        Site2Reverse = "Active";
        SelectedSite2Data = data

    }
    else if (data.qflselectedname == "Site 3") {
        Site3Reverse = "Active";
        SelectedSite3Data = data

    }
    else if (data.qflselectedname == "Site 4") {
        Site4Reverse = "Active";
        SelectedSite4Data = data

    }
    else if (data.qflselectedname == "Site 5") {
        Site5Reverse = "Active";
        SelectedSite5Data = data

    }
    else if (data.qflselectedname == "Damage") {
        DamageReverse = "Active";
        SelectedDamageData = data

    }

    ReverseSelection = "";
    QFLDefectPlaceItems = "";
    QFLCheckListItemId = "";
    StaticCheckListItemId = "";
    QFLFeedBackWorkflowId = "";
    $("#QFLFeedBackSite").empty();
    var content = [];
    var OtherDoneButton = [];
    var QFLFeedBackSite = data.listchecklistdefectitems
  
    QFLFeedbackSitesOther = data.qflselectedname;
    if (QFLFeedBackSite.length <= 0) {
        return false;
    }
    QFLFeedbackSites = data.qflselectedname
	if (QFLFeedbackSites == "Site 1") {
		//if (UserDetails.Language == "en")
		//{
		//	$('#btnSubmit1').val('Submit');

		//}
		//else {
		//	$('#btnSubmit1').val('参加する');
		//}
       

    }
    //$("#PopupTitle1").text(data.qflselectedname);
    var buttoncount = 1;
    var Buttonid = 1;

    var QFLFeedBackSiteLenght = QFLFeedBackSite.length;
    var QFLFeedBackSiteLoopCount = 1;
    var SelectedValue = "";
    var SiteValues = "";

    $.each(data.listdefectselectedvalue, function (i, listdefectselectedvalue) {
        if (SelectedValue != "") {
            SelectedValue = SelectedValue + ", "
        }
        SelectedValue = SelectedValue+ listdefectselectedvalue.selectedvalue; 
    });
    $('#PopupTitleDamage').text('Damage');

    if (QFLFeedBackSite.length > 0) {
        content.push('<div><span><label class="f-16">' + SelectedValue + '</label></span> </div>');
        content.push('<div class="row mt-10">');

      
        $.each(QFLFeedBackSite, function (i, QFLFeedBackSite) {

            if (buttoncount > 3) {
                content.push('</div> <div class="row mt-10">');

                buttoncount = 1;
            }


            if (QFLFeedbackSites == "Site 1") {
                $('#PopupTitle1').val('Site 1');
                SiteValues = "Site1";
                if (QFLFeedBackSite.site1 != "") {



                    content.push('<div class="col-sm-4">');
                    $('#PopupTitle1').val('Site 1');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle1").text("Site 1");
                    }
                    else {

                        $("#PopupTitle1").text("敷地 1");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite1_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite1_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site1") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site1 + '</button>');
                    content.push('</div>');

                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;

                //}
            }
            else if (QFLFeedbackSites == "Site 2") {
                SiteValues = "Site2";
                $("#myModal2").modal('hide');
               
                $('#PopupTitle2').val('Site 2');
                if (QFLFeedBackSite.site2 != "") {

                    content.push('<div class="col-sm-4">');
                    //$('#PopupTitle').val('Site 2');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle2").text("Site 2");
                    }
                    else {

                        $("#PopupTitle2").text("敷地 2");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite2_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite2_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site2") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site2 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                $("#myModalSite2").modal('show');
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }

            else if (QFLFeedbackSites == "Site 3") {
                SiteValues = "Site3";
                $('#PopupTitle3').val('Site 3');

                if (QFLFeedBackSite.site3 != "") {



                    content.push('<div class="col-sm-4">');
                    //$('#PopupTitle').val('Site 3');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle3").text("Site 3");
                    }
                    else {

                        $("#PopupTitle3").text("敷地 3");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite3_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite3_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site3") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site3 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            else if (QFLFeedbackSites == "Site 4") {
                SiteValues = "Site4";
                $('#PopupTitle4').val('Site 4');
                if (QFLFeedBackSite.site4 != "") {

                    content.push('<div class="col-sm-4">');
                    //$('#PopupTitle').val('Site 4');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle4").text("Site 4");
                    }
                    else {

                        $("#PopupTitle4").text("敷地 4");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite4_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite4_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site4") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site4 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            else if (QFLFeedbackSites == "Site 5") {
                SiteValues = "Site5";
                $('#PopupTitle5').val('Site 5');
                if (QFLFeedBackSite.site5 != "") {


                    content.push('<div class="col-sm-4">');

                    if (UserDetails.Language == "en") {
                        $("#PopupTitle5").text("Site 5");
                    }
                    else {

                        $("#PopupTitle5").text("敷地 5");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite5_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite5_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site5") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site5 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            else if (QFLFeedbackSites == "Damage") {
                SiteValues = "Damage";
                $('#PopupTitleDamage').val('Damage');
                if (QFLFeedBackSite.damage != "") {


                    content.push('<div class="col-sm-4">');

                    if (UserDetails.Language == "en") {
                        $("#PopupTitleDamage").text("Damage");
                    }
                    else {

                        $("#PopupTitleDamage").text("ダメージ");


                    }
                    content.push('<button type="button" id="QFLFeedbackSiteDamage_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSiteDamage_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Damage") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.damage + '</button>');
                    content.push('</div>');

                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            //content.push('</div>');
            //buttoncount++;
            Buttonid++;
            QFLFeedBackSiteLoopCount++
        });

        //content.push('<input type="submit" value="Others" id="btnOtherSite" text="' + data.qflselectedname + '"  style="margin-left:72px" class="btn btn-success"  onclick=SiteOthers1() />')


    }
   

    if (GateName != "Rework" && GateName != "Re-Examination" || GateName != "Re-Examination1") {
        var disable = "";
        var othersitecount = data.getothersiterowcount

        if (othersitecount.length > 0) {
            if (othersitecount.length > 1) {
                disable = "disabled";
            }
        }

        if (buttoncount > 3) {
            content.push('</div> <div class="row mt-10">');

        }
        content.push('<div class="col-sm-4">');
        //content.push('<button type="button" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons">' + "Others" + '</button>');

        if (UserDetails.Language == "en") {
            content.push('<input style="background-color:#676a6c;color: white;" type="submit" value="Others" id="btnOtherSite" text="" class="btn btn-block feedback-modal-buttons" ' + disable + ' onclick=SiteOthers1("' + SiteValues+'") />');

        }
        else {
            content.push('<input style="background-color:#676a6c;color: white;" type="submit" value="その他" id="btnOtherSite" text="" class="btn btn-block feedback-modal-buttons" ' + disable + ' onclick=SiteOthers1("' + SiteValues+'") />');
        }
        OtherDoneButton.push('<input type="submit" id="" onclick=btnOtherCancelSite("' + SiteValues+'") class="btn btn-danger trn" value="Back" />');
        OtherDoneButton.push('<input type="submit" id="btnSubmitOtherSite" onclick=btnOtherSiteSave("' + SiteValues +'") class="btn btn-success btn-cancel btn-center trn" value="Done" />');

    }
    $("#OtherSiteDoneid").empty();
    $("#OtherSiteDoneid").append(OtherDoneButton.join(''));
    content.push('</div>');
    content.push('</div>');
    
    if (QFLFeedbackSites == "Site 1") {
        $("#QFLFeedBackSite1").empty();
        $("#QFLFeedBackSite1").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 2") {
        $("#QFLFeedBackSite2").empty();
        $("#QFLFeedBackSite2").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 3") {
        $("#QFLFeedBackSite3").empty();
        $("#QFLFeedBackSite3").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 4") {
        $("#QFLFeedBackSite4").empty();
        $("#QFLFeedBackSite4").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 5") {
        $("#QFLFeedBackSite5").empty();
        $("#QFLFeedBackSite5").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Damage") {
        $("#QFLFeedBackSiteDamage").empty();
        $("#QFLFeedBackSiteDamage").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }

    

}

function SiteOthers1(SiteValues) {
    //QFLFeedbackSitesOther = "Site 1";
    OtherMode = false;
    var Site = SiteValues;
     OtherSite1 = "";
     OtherSite2 = "";
     OtherSite3 = "";
     OtherSite4 = "";
     OtherSite5 = "";
    OtherDamage = "";
   

    document.getElementById("txtOthervalue").value = "";
    document.getElementById("txtOthervalueDamage").value = "";
    $("#Modetxt").text("Text Mode");
    $("#LanguageChanger").hide();

    QFLFeedbackSitesOther = Site;
    $("#myModal2").modal('hide');
    $("#OtherDefectValidation").text("");
    $("#OtherDefectValidation").hide();

    if (QFLFeedbackSitesOther == "Site1") {

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Site 1");
        }
        else {

			$("#OtherDefectPopUpTitle").text("敷地 1");


        }
        $("#myModal2").modal('hide');
    }


    if (QFLFeedbackSitesOther == "Site2") {

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Site 2");
        }
        else {

			$("#OtherDefectPopUpTitle").text("敷地 2");



        }
        $("#myModalSite2").modal('hide');
    }

    if (QFLFeedbackSitesOther == "Site3") {

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Site 3");
        }
        else {

			$("#OtherDefectPopUpTitle").text("敷地 3");


        }
        $("#myModalSite3").modal('hide');
    }

    if (QFLFeedbackSitesOther == "Site4") {

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Site 4");
        }
        else {

			$("#OtherDefectPopUpTitle").text("敷地 4");


        }
        $("#myModalSite4").modal('hide')
    }

    if (QFLFeedbackSitesOther == "Site5") {

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Site 5");
        }
        else {

			$("#OtherDefectPopUpTitle").text("敷地 5");


        }
        $("#myModalSite5").modal('hide');
    }

    if (QFLFeedbackSitesOther == "Damage") {

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Damage");
        }
        else {

            $("#OtherDefectPopUpTitle").text("ダメージ");
        }
        $("#myModalDamage").modal('hide');
        //$("#OtherDefectPopUpDamage").modal('show');
        //$("#ModetxtDamage").text("Text Mode");
    }
   

	//$("#OtherDefectPopUpTitle").text(QFLFeedbackSitesOther);

	if (UserDetails.Language == "en") {
		$('#btnSubmitOtherSite').val('Done');
	}
	else {
        $('#btnSubmitOtherSite').val('できた');
    }
   
        $("#OtherDefectPopUp").modal('show');

   
    

    $("#SignatureHide").hide();
    $("#txtOthervalue").show();
    $("#btnOtherClearid").hide();
    $("#someSwitchOptionPrimary").prop('checked', false);



    var canvas = document.getElementById("newSignature1");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var selectionmode = "";

function btnOtherCancelSite() {
    document.getElementById("txtOthervalue").value = "";
	$("#OtherDefectPopUp").modal('hide');

	if (UserDetails.Language == "en") {
		$('#btnSubmit1').val('Done');
	}
	else {
        $('#btnSubmit1').val('できた');
    }
    $("#OtherDefectPopUp").modal('hide');
    if (QFLFeedbackSitesOther == "Site1") {
        $("#myModal2").modal('show');
    }
    else if (QFLFeedbackSitesOther == "Site2") {
        $("#myModalSite2").modal('show');
    }
    else if (QFLFeedbackSitesOther == "Site3") {
        $("#myModalSite3").modal('show');
    }
    else if (QFLFeedbackSitesOther == "Site4") {
        $("#myModalSite4").modal('show');
    }
    else if (QFLFeedbackSitesOther == "Site5") {
        $("#myModalSite5").modal('show');
    }
    else if (QFLFeedbackSitesOther == "Damage") {
        $("#myModalDamage").modal('show');
    }

}




function QFLFeedbackSite(QFLFeedbackSiteId, staticchecklistitemid, qflfeedbackworkflowid, Site) {



    var className = $("#" + QFLFeedbackSiteId).attr('class');
    if (className == "btn btn-block feedback-modal-buttons") {
        $("#" + QFLFeedbackSiteId).removeClass("btn btn-block feedback-modal-buttons").addClass("btn btn-block feedback-modal-buttons feedback-modal-buttons-click");

    }
    else {
        $("#" + QFLFeedbackSiteId).removeClass("btn btn-block feedback-modal-buttons feedback-modal-buttons-click").addClass("btn btn-block feedback-modal-buttons");

    }

    var checkListItemId = $("#" + QFLFeedbackSiteId).val();
    var QFLFeebdbackSite = $("#" + QFLFeedbackSiteId).text();


    if (className == "btn btn-block feedback-modal-buttons") {

        if (QFLDefectPlaceItems != "") {
            QFLDefectPlaceItems = QFLDefectPlaceItems + ","
        }

        if (QFLCheckListItemId != "") {
            QFLCheckListItemId = QFLCheckListItemId + ","
        }

        if (StaticCheckListItemId != "") {
            if (staticchecklistitemid != "") {
                StaticCheckListItemId = StaticCheckListItemId + ","
            }

        }

        if (QFLFeedBackWorkflowId != "") {
            QFLFeedBackWorkflowId = QFLFeedBackWorkflowId + ","
        }

        //if (ReverseSelection != "") {
        //    ReverseSelection = ReverseSelection + ","
        //}
        ReverseSelection = QFLFeedbackSiteId;

        QFLDefectPlaceItems = QFLDefectPlaceItems + QFLFeebdbackSite;
        QFLCheckListItemId = QFLCheckListItemId + checkListItemId;
        StaticCheckListItemId = StaticCheckListItemId + staticchecklistitemid;
        QFLFeedBackWorkflowId = QFLFeedBackWorkflowId + qflfeedbackworkflowid;


        if (Site == "Site1") {

            ReverseSite1CheckListItemId = QFLCheckListItemId;
            ReverseSite1StaticCheckListItemid = StaticCheckListItemId;
            $("#DefectSiteValidation").hide();

            $("#btnSubmit1").click();

        }
        else if (Site == "Site2") {

            //  ReverseSite2Selection = ReverseSite2Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite2Selection = ReverseSite2Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite2CheckListItemId = QFLCheckListItemId;
            ReverseSite2StaticCheckListItemid = StaticCheckListItemId;
            $("#DefectSite2Validation").hide();

            $("#btnSubmitSite2").click();
        }

        else if (Site == "Site3") {

            //ReverseSite3Selection = ReverseSite3Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite3Selection = ReverseSite3Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite3CheckListItemId = QFLCheckListItemId;
            ReverseSite3StaticCheckListItemid = StaticCheckListItemId;
            $("#DefectSite3Validation").hide();

            $("#btnSubmitSite3").click();

        }

        else if (Site == "Site4") {

            //ReverseSite4Selection = ReverseSite4Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite4Selection = ReverseSite4Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite4CheckListItemId = QFLCheckListItemId;
            ReverseSite4StaticCheckListItemid = StaticCheckListItemId;
            $("#DefectSite4Validation").hide();

            $("#btnSubmitSite4").click();

        }

        else if (Site == "Site5") {

            //ReverseSite5Selection = ReverseSite5Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite5Selection = ReverseSite5Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite5CheckListItemId = QFLCheckListItemId;
            ReverseSite5StaticCheckListItemid = StaticCheckListItemId;
            $("#DefectSite5Validation").hide();

            $("#btnSubmitSite5").click();

        }


        else if (Site == "Damage") {

            //ReverseSite5Selection = ReverseSite5Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite5Selection = ReverseSite5Selection.replace(QFLFeedbackSiteId, "");
            //ReverseSite5CheckListItemId = QFLCheckListItemId;
            //ReverseSite5StaticCheckListItemid = StaticCheckListItemId;
            $("#DefectDamageValidation").hide();
            $("#btnSubmitDamage").click();

        }

    }
    if (className == "btn btn-block feedback-modal-buttons feedback-modal-buttons-click") {
        var checkListItemId = $("#" + QFLFeedbackSiteId).val();
        var QFLFeebdbackSite = $("#" + QFLFeedbackSiteId).text();

        if (checkListItemId != "") {
            QFLCheckListItemId = QFLCheckListItemId.replace("," + checkListItemId, "");

        }
        QFLDefectPlaceItems = QFLDefectPlaceItems.replace("," + QFLFeebdbackSite, "")
        if (staticchecklistitemid != "") {
            StaticCheckListItemId = StaticCheckListItemId.replace("," + staticchecklistitemid, "");

        }
        QFLFeedBackWorkflowId = QFLFeedBackWorkflowId.replace("," + qflfeedbackworkflowid, "")

        if (checkListItemId != "") {
            QFLCheckListItemId = QFLCheckListItemId.replace(checkListItemId, "");
        }
        QFLDefectPlaceItems = QFLDefectPlaceItems.replace(QFLFeebdbackSite, "")
        if (staticchecklistitemid != "") {
            StaticCheckListItemId = StaticCheckListItemId.replace(staticchecklistitemid, "");
        }
        QFLFeedBackWorkflowId = QFLFeedBackWorkflowId.replace("," + qflfeedbackworkflowid, "")

        if (Site == "Site1") {

            //ReverseSite1Selection = ReverseSite1Selection.replace("," + QFLFeedbackSiteId, "");
            // ReverseSite1Selection = ReverseSite1Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite1CheckListItemId = QFLCheckListItemId;
            ReverseSite1StaticCheckListItemid = StaticCheckListItemId;
        }
        else if (Site == "Site2") {

            //  ReverseSite2Selection = ReverseSite2Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite2Selection = ReverseSite2Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite2CheckListItemId = QFLCheckListItemId;
            ReverseSite2StaticCheckListItemid = StaticCheckListItemId;
        }

        else if (Site == "Site3") {

            //ReverseSite3Selection = ReverseSite3Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite3Selection = ReverseSite3Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite3CheckListItemId = QFLCheckListItemId;
            ReverseSite3StaticCheckListItemid = StaticCheckListItemId;
        }

        else if (Site == "Site4") {

            //ReverseSite4Selection = ReverseSite4Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite4Selection = ReverseSite4Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite4CheckListItemId = QFLCheckListItemId;
            ReverseSite4StaticCheckListItemid = StaticCheckListItemId;
        }

        else if (Site == "Site5") {

            //ReverseSite5Selection = ReverseSite5Selection.replace("," + QFLFeedbackSiteId, "");
            //ReverseSite5Selection = ReverseSite5Selection.replace(QFLFeedbackSiteId, "");
            ReverseSite5CheckListItemId = QFLCheckListItemId;
            ReverseSite5StaticCheckListItemid = StaticCheckListItemId;
        }


    }
    
}
var defectclassitem = ""

function QFLFeeedBackDefectClassPopup(data, PreviousSiteValue) {
	if (UserDetails.Language == "en") {
		$('#btnSubmit2').val('Done');
	}
	else {
        $('#btnSubmit2').val('できた');
	}

    $("#myModal3").modal('show');
    
    $("#DefectClassValidation").text("");
    $("#QFLFeedBackDefectClass").empty();
    $("#QFLFeedBackDefectClassImage").empty();

    $("#defectclassbackbtnid").empty();
    QFLDefectPlaceItems = "";
    QFLCheckListItemId = "";
    QFLFeedBackWorkflowId = "";
    StaticCheckListItemId = "";
    defectclassitem = "";

    var content = [];
    var contentBack = [];
    //var QFLFeedBackDefectclass = data.listchecklistdefectitems

    var buttoncount = 1;
    var Buttonid = 1;
    var SelectedValue = "";

    //$.each(data.listdefectselectedvalue, function (i, listdefectselectedvalue) {
    //    if (SelectedValue != "") {
    //        SelectedValue = SelectedValue + ", "
    //    }
    //    SelectedValue = SelectedValue + listdefectselectedvalue.selectedvalue;
    //});

  
        content.push('<div><span><label class="f-16">' + SelectedValue + '</label></span> </div>');

        //content.push('<h2 class="text-center" id="popupDefectclass">Defect Class</h2>');
        content.push('<div class="row">');
        content.push('<div class="col-sm-6">');
        content.push('<button type="button" id="QFLFeedbackDefectClass_' + 1 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","A",1) class="btn btn-block feedback-modal-buttons2">A </button>');
        content.push('</div>');
   
          content.push('<div class="col-sm-6">');
         content.push('<button type="button" id="QFLFeedbackDefectClass_' + 2 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","B",2) class="btn btn-block feedback-modal-buttons2">B</button>');

        content.push('</div>');

        content.push('</div>');


        content.push('<div class="row mt-10">');
        content.push('<div class="col-sm-6">');
        content.push('<button type="button" id="QFLFeedbackDefectClass_' + 3 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","C",3) class="btn btn-block feedback-modal-buttons2">C</button>');
        content.push('</div>');

        content.push('<div class="col-sm-6">');

        content.push('<button type="button" id="QFLFeedbackDefectClass_' + 4 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","D",4) class="btn btn-block feedback-modal-buttons2">D</button>');
        content.push('</div>');
        content.push('</div>');


        //content.push('</div>');


    contentBack.push('<input type="submit" value="Back" onclick=QFLFeedbackDefectClassBack("' + PreviousSiteValue +'") class="btn btn-danger trn" />');
    
        $("#QFLFeedBackDefectClass").append(content.join(''));
    $("#defectclassbackbtnid").append(contentBack.join(''));

       
        
  }


function QFLFeedbackDefectClass(QFLFeedbackDefectClassid,DefectValuem,id) {

    CheckItemValue = "NotOk";
    var DefectClassID = "#" + QFLFeedbackDefectClassid + id;
    var className = $(DefectClassID).attr('class');
    if (className == "btn btn-block feedback-modal-buttons2") {

        $("#" + QFLFeedbackDefectClassid +"1").removeClass("btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click").addClass("btn btn-block feedback-modal-buttons2");
        $("#" + QFLFeedbackDefectClassid +"2").removeClass("btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click").addClass("btn btn-block feedback-modal-buttons2");
        $("#" + QFLFeedbackDefectClassid +"3").removeClass("btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click").addClass("btn btn-block feedback-modal-buttons2");
        $("#" + QFLFeedbackDefectClassid +"4").removeClass("btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click").addClass("btn btn-block feedback-modal-buttons2");

        $(DefectClassID).removeClass("btn btn-block feedback-modal-buttons2").addClass("btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click");
        
    }
    else {
        $(DefectClassID).removeClass("btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click").addClass("btn btn-block feedback-modal-buttons2");

    }

    var QFLFeebdbackDefectPlace = $(DefectClassID).text();


    if (className == "btn btn-block feedback-modal-buttons2") {

        defectclassitem = QFLFeebdbackDefectPlace;


        QFLDefectPlaceItems =  QFLFeebdbackDefectPlace;
    

        if (QFLDefectPlaceItems != "") {
            $("#DefectClassValidation").hide();

        }
    }
    if (className == "btn btn-block feedback-modal-buttons2 feedback-modal-buttons-click") {
        var checkListItemId = $("#" + QFLFeedbackDefectClassid+id).val();
        var QFLFeebdbackDefectPlace = $("#" + QFLFeedbackDefectClassid+id).text();

        defectclassitem = defectclassitem.replace("," + QFLFeebdbackDefectPlace, "")
        defectclassitem = defectclassitem.replace(QFLFeebdbackDefectPlace, "")
     



    }

}



var checkItemID;
var ActualMode;
var ActualcommentsID;
var ActualStaticCheckListItemId;
var ExistGuid;
var ActualFD;
var filelistcount=0;





function btncomments(checklistitemid, actualid, statichecklistitemid,disabled,VinId) {

    if (disabled == "disabled") {
        return false;
    }
    VinId = VinIds;
    $("#ActualCommentTableId").hide();
    $("#actualcommentsid").hide();

    filesdata = [];
    filesToUpload = [];

    filecount = 0;
    fileid = 0;

    ExistGuid = 0;
    ActualcommentsID = 0;
    $('#actualvalue').val('');
    $('#responsible').val('');
    $('#damagecode').val('');
    $('#textareacomments').val('');

    $('#FileName').empty();


    $("#files1").val('');
   // $("#AttachmentUpload").append(html);
    $("#AttachmentUpload").empty();

    if (UserDetails.Language == "en") {
        $('#btnSubmitActual').val('Submit');

    }
    else {
        $('#btnSubmitActual').val('参加する');

    }




    if (actualid != 0) {
        if (UserDetails.Language == "en") {
            $('#btnSubmitActual').val('Update');

        }
        else {
            $('#btnSubmitActual').val('更新');

        }
        var dataObject = JSON.stringify({
            "actualid": actualid,

        });

        var ApiFunc = Api + 'QFL.svc/' + 'GetActualCommentDetails';

        var Input = dataObject;

        PostMethod(ApiFunc, Input, Token, function (data) {

            
            if (data.actualid != 0) {
                $('#actualvalue').val(data.actualvalue);
                $('#responsible').val(data.responsible);
                $('#damagecode').val(data.damagecode);
                $('#textareacomments').val(data.comments);
                ActualMode = 'U';
                ActualcommentsID = actualid;
                ExistGuid = data.foldername;

                var html = [];
                var standmasterdetails = data.ActualComments;

                //content.push('<div class\="col-md-12\">');
                //content.push('<table class=\"table table-bordered text-center\">');
                $.each(standmasterdetails, function (i, StandMaster) {
                    ++filelistcount;
                    ActualFD = 1;
                    var Sno = i + 1;
                    var fsize = (StandMaster.filesize / 1024).toFixed(2);

                    html += '<div class="col-md-6 mt-20"><div class=" attachment-border"> <div class="row"><div class="col-md-3 col-sm-3"><img alt="" class="img-responsive" src="../Images/' + CheckFileType(StandMaster.filename) + '"> <p class="mbsize">'
                        + '<span> ' + fsize.toString() + " MB" + '</span ></p >'
                        + '</div><div class="col-md-9 col-sm-9"><h4 class="overflow-attachment1"> ' + StandMaster.filename + '</h4><p class="overflow-attachment2">' + data.username + ' </p>'
                        + '<label class="overflow-attachment3">' + StandMaster.createddate + '</label> <span class="pull-right btn-group"    onClick = "DeleteActualCommentsFiles(\'' + StandMaster.fileid + '\', \'' + StandMaster.filename + '\')"><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-trash"></span></i> </span>'
                        + '<span class="pull-right btn-group" onClick ="DownloadCommentFiles(\'' + data.foldername + '\', \'' + StandMaster.filename + '\')"><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-save"></span></i> </span>'
                        + '</div></div></div></div>';

                    //html += '<div class="col-md-6 mt-20" id="' + fileid + '" ><div class=" attachment-border"><a onclick="deleteFile(\'' + fileid + '\',\'' + f.name + '\');" data-container="body" data-toggle="tooltip" data-placement="top" title="Delete"  type="button" class="pull-right btn btn-danger rejectbtn btn-xs mt-n5"><span class="glyphicon glyphicon-remove pull-left btn-group"></span></a> <div class="row"><div class="col-md-3 col-sm-3"><img alt="" class="img-responsive" src="../Images/' + CheckFileType(f.name) + '"> <p class="mbsize">'
                    //    + '<span> ' + fs.toString() + " MB" + '</span ></p >'
                    //    + '</div><div class="col-md-9 col-sm-9"><h4 class="overflow-attachment1"> ' + f.name + '</h4><p class="overflow-attachment2">' + UserDetails.UserName + ' </p>'
                    //    + '<label class="overflow-attachment3">' + getDateTime + '</label> <span class="pull-right btn-group" style="display:' + deleteenable + '"   onClick = ""><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-trash"></span></i> </span>'
                    //    + '<span class="pull-right btn-group" onClick =""><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-save"></span></i> </span>'
                    //    + '</div></div></div></div>';
                    //content.push('<tr>');
                    //content.push('<td width="35%">' + Sno + '</td>');
                    //content.push('<td width="35%">' + StandMaster.filename + '</td>');
                    //content.push('<td width="30%">');
                    //content.push('<i onClick ="DownloadCommentFiles(\'' + data.foldername + '\', \'' + StandMaster.filename + '\')" class=\"fa fa-download icondownload\" aria-hidden="true" title=""></i>');

                    //content.push('<i class="fa fa-trash icondelete" aria-hidden="true" title="" data-toggle="modal" data-target="#delete"  onClick ="DeleteActualCommentsFiles(\'' + StandMaster.fileid + '\', \'' + StandMaster.filename + '\')"></i>');
                    //content.push('</td>');
                    //content.push('</tr>');

                });

                //content.push('</tbody>');
                //content.push('</table>');
                //content.push('</div>');
                //content.push('</div>');

               // $("#Standmaster").append(content.join(''));
                $("#AttachmentUpload").append(html);
                  if (standmasterdetails.length > 0) {
                      $("#ActualCommentTableId").show();
                      $("#actualcommentsid").show();
                      
                }
                else {
                      $("#ActualCommentTableId").hide();
                      $("#actualcommentsid").hide();
                }
            }
        });
    }
    checkItemID = '';
    $("#files1").empty();
    DeleteID = 0;
    DeleteFilename = '';
    $('#comments').modal('show');


    checkItemID = checklistitemid;
    ActualStaticCheckListItemId = statichecklistitemid;
    CommentVinId = VinId;


}
var DeleteFilename;
var DeleteID;
var CommentVinId;
function DeleteActualCommentsFiles(DeleteFileID, Filename) {
    ActualMode = "D";

    if (UserDetails.RoleId != 6) {
        if ((($('#actualvalue').val() == "") && ($('#responsible').val() == "")) && (($('#damagecode').val() == '') && ($('#textareacomments').val() == '')) && (filelistcount == 1)) {


            ActualMode = "FD";
        }
        else {
            ActualMode = "D";
        }

        $("#DeleteConfirmationpopup").modal('show');
        //$("#comments").modal('show');
        if (UserDetails.Language == "en") {
            $('#DeleteConfirmationMessage').text('Are you sure? Want to delete this Actuals/Comments?');
        }
        else {
            $('#DeleteConfirmationMessage').text('本気ですか？この実績/コメントを削除しますか？');
        }
        DeleteID = DeleteFileID;
        DeleteFilename = Filename;
    }


}
function DownloadCommentFiles(DwdGUID, DwdFileName) {
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

        window.location.href = "../Home/DownLoadCommentsFile?StandardMasterfilename=" + DwdGUID + "&filename=" + DwdFileName;
    }

}



function ActualComment()
{
   
	fileid = 0;
	filecount = 0;
	var files = $("#files1").get(0).files;
	var filescount;


	for (var i = 0; i < files.length; i++)
	{
		var filedetails = files[i];

		if (filedetails.name != filesToUpload[i])
		{
			filescount = 1;
		}

	}

	if ((($('#actualvalue').val() == "") && ($('#responsible').val() == "")) && (($('#damagecode').val() == '') && ($('#textareacomments').val() == '')) && (filescount != 1 && ActualMode != 'D') && (ActualMode != 'U' && ActualMode != 'FD'))
	{
		//ActualMode = '';
	
		$('#comments').modal('hide');

		$('#DynamicAlertModal').modal('show');
		if (UserDetails.Language == "en") {
            $('#hTitle3').text('Actuals/Comments added!..');
		}
		else {
            $('#hTitle3').text('追加された実績 / コメント');
		}

	}
	else {    
        showloader();

	
		var id = 0;
		if (ActualMode != 'D' && ActualMode != 'FD')
		{
            if (ExistGuid == 0)
            {
		
				ActualMode = 'I';
			}
			else {
				ActualMode = 'U';

			}
		}
		if ((($('#actualvalue').val() == "") && ($('#responsible').val() == "")) && (($('#damagecode').val() == '') && ($('#textareacomments').val() == '')) && (filescount != 1 && ActualFD != 1))
		{
			//alert(ActualMode);
			ActualMode ='FD';
			

		}

	
    var fd = new FormData();
    //var files = $("#files1").get(0).files;
		//var files =  input.files[0];
    

		for (var i = 0; i < filesdata.length; i++)
	{

			var filedetailss = filesdata[i];

			//alert(filedetailss.name);
			if (filedetailss.name != filesToUpload[i])
		{
                fd.append("fileInput", filesdata[i]);
                if (ExistGuid == 0) {
                    id = guid();
                }
		}
        
       
        
        
        }

        if (UserDetails.UserId == 0) {
            Sessionout();
            return false;
        }


    //fd.append("fileInput", filesdata);
    fd.append("token", Token);
    fd.append("fileguid", id == 0 ? ExistGuid : id);
    fd.append("actualid", ActualcommentsID);
    fd.append("checklistitemid", checkItemID);
    fd.append("actualvalue", $('#actualvalue').val());
    fd.append("responsible", $('#responsible').val());
    fd.append("damagecode", $('#damagecode').val());
    fd.append("comments", $('#textareacomments').val());
    fd.append("userid", UserDetails.UserId);
    fd.append("mode", ActualMode);
    fd.append("fileid", DeleteID);
    fd.append("deletefilename", DeleteFilename);
        fd.append("VinIds", CommentVinId);
		fd.append("StaticCheckListItemId", ActualStaticCheckListItemId);

    //var ApiFunc =

    var ApiFunc = '../Home/Actualcomment/';

    //var Input = dataObject;

	FilePostMethod(ApiFunc, fd, null, function (data)
    {
        filesToUpload = [];
		fileid = 0;
        filecount = 0;
        hideloader();
		$('#DeleteConfirmationpopup').modal('hide');
		if (data == "Inserted")
		{
            $('#comments').modal('hide');
            
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en")
            {
                $('#hTitle3').text('Actuals/Comments added');
            }
            else
            {
                $('#hTitle3').text('追加された実績 / コメント');
            }
            ActualMode = '';
            ActualcommentsID = '';
            ExistGuid = 0;
		}

		

		else if (data == "Deleted")

        {
           
           // $('#comments').modal('hide');
           
           
            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Actuals/Comments deleted');
            }
            else {
                $('#hTitle3').text('実績/コメントを削除しました');
			}
			//alert(checkItemID);
			//alert(ActualcommentsID);
			btncomments(checkItemID, ActualcommentsID, StaticCheckListItemId);
			
            //ActualMode = '';
            //ActualcommentsID = '';
            //ExistGuid = 0;
		}
		else if (data == "Updated")
        {
            
            $('#comments').modal('hide');
            $('#DynamicAlertModal').modal('show');

            if (ActualMode == 'FD')
            {
                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('Actuals/Comments deleted');
                }
                else {
                    $('#hTitle3').text('実績/コメントを削除しました');
                }
            }
            else
            {
                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('Actuals/Comments updated');
                }
                else {
                    $('#hTitle3').text('実績/コメントを更新しました');
                }
            }
            ActualMode = '';
            ActualcommentsID = '';
            ExistGuid = 0;
        }
		ActualFD = 0;
		filelistcount = 0;
        GetCheckListItems(UserDetails.PlantId, QgateId, '')
      
	});
		
		

	}

    
}

var canvasValidation;

function signatureSave() {


    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    

    const blanks = isCanvasBlank(document.getElementById('newSignature'));

    var canvas1 = document.getElementById("newSignature");// save canvas image as data url (png format by default)
    var dataURL1 = canvas1.toDataURL("image/png");
    var image1 = dataURL1.replace('data:image/png;base64,', '');
    var blank;
    var Imglenght = image1.length;


    if(canvasValidation==dataURL1)
    {
        blank = true;
    }
    else
    {
        blank=  false;
    }
    
    //if (Imglenght == 1180 || Imglenght==5812) {

    //     blank = true;
    //}
    //else {
    //    blank=  false;
    //}

    $("#Signaturevalidation").removeAttr("color");

    if (blank == false) {
        
        var canvas = document.getElementById("newSignature");// save canvas image as data url (png format by default)
        var dataURL = canvas.toDataURL("image/png");
        var image = dataURL.replace('data:image/png;base64,', '');

        var json = {
            "imagedata": image,
            "Vinnumber": VIN,
            "VinId": VinIds,
            "Gateid": QgateId

        };
        var Input = JSON.stringify(json);

        var ApiFunc = '../Home/SignatureSave/';
        JsonPostMethod(ApiFunc, Input, '', function (data) {

            if (data != null && data != '') {
                if (data == "Error") {

                   
                    $("#DynamicAlertModal").modal('show');
                  
                    if (UserDetails.Language == "en") {
                        $('#hTitle3').text('Error');
                    }
                    else {
                        $('#hTitle3').text('エラー');
                    }
                    return false;
                }
                //Periyan



                var paintinggateName = "";

                if (ReExaminationGateIdvarient == 3) {
                    if (GateName == "塗装 Rework") {
                        paintinggateName = "Rework"

                        var json = {
                            "filename": data,
                            "vinid": VinIds,
                            "userid": UserDetails.UserId,
                            "iscompleted": false,
                            "vinnumber": VIN,
                            "isreworkcompleted": true,
                            "isreexaminationcompleted": false,
                            "gatename": GateName,
                            "ModelName": ModelNumber

                        };

                    }
                    else if (GateName == "塗装 Re-Examination") {
                        paintinggateName = "Re-Examination"

                        var json = {
                            "filename": data,
                            "vinid": VinIds,
                            "userid": UserDetails.UserId,
                            "iscompleted": false,
                            "vinnumber": VIN,
                            "isreworkcompleted": false,
                            "isreexaminationcompleted": true,
                            "gatename": GateName,
                            "ModelName": ModelNumber
                        };
                    }
                    else {
                        var json = {
                            "filename": data,
                            "vinid": VinIds,
                            "userid": UserDetails.UserId,
                            "iscompleted": true,
                            "vinnumber": null,
                            "isreworkcompleted": false,
                            "isreexaminationcompleted": false,
                            "gatename": GateName,
                            "ModelName": ModelNumber
                        };
                    }
                }

                else {
                    if (GateName == "Rework") {
                        var json = {
                            "filename": data,
                            "vinid": VinIds,
                            "userid": UserDetails.UserId,
                            "iscompleted": false,
                            "vinnumber": VIN,
                            "isreworkcompleted": true,
                            "isreexaminationcompleted": false,
                            "gatename": GateName,
                            "ModelName": ModelNumber

                        };
                    }
                    else if (GateName == "Re-Examination" || GateName == "Re-Examination1") {
                        var json = {
                            "filename": data,
                            "vinid": VinIds,
                            "userid": UserDetails.UserId,
                            "iscompleted": false,
                            "vinnumber": VIN,
                            "isreworkcompleted": false,
                            "isreexaminationcompleted": true,
                            "gatename": GateName,
                            "ModelName": ModelNumber

                        };
                    }
                    else {
                        var json = {
                            "filename": data,
                            "vinid": VinIds,
                            "userid": UserDetails.UserId,
                            "iscompleted": true,
                            "vinnumber": null,
                            "isreworkcompleted": false,
                            "isreexaminationcompleted": false,
                            "gatename": GateName,
                            "ModelName": ModelNumber

                        };
                    }

                }


                var Input = JSON.stringify(json);
                var ApiFunc = Api + 'QFL.svc/InsertSignature';

                PostMethod(ApiFunc, Input, Token, function (data) {
                    if (data.result == "Inserted") {

                        $("#completed").modal('hide');
                        $("#DynamicAlertModal").modal('show');
                        document.getElementById("Signaturevalidation").style.color = "green"
                        if (UserDetails.Language == "en") {
                            $('#hTitle3').text('Inspection Item completed successfully for this Qgate');
                        }
                        else {
                            $('#hTitle3').text('このQgateのInspectionItemは正常に完了しました');
                        }
                        document.getElementById("Qgateid_" + QgateId).style.backgroundColor = "darkgreen";

                        if (ReExaminationGateIdvarient == 3) {

                            if (GateName == "塗装 Rework" || GateName == "塗装 Re-Examination") {
                                GetPaintingMasterDefectItems();
                            }
                            else {
                                BindindCheckItemImage();
                            }
                           
                        }
                        else {
                            GetCheckListItems(UserDetails.PlantId, QgateId, Mode);

                        }
                    }
                });
            }
        });
    }

    else {
        document.getElementById("Signaturevalidation").style.color = "red";
        if (UserDetails.Language == "en") {
            $("#Signaturevalidation").text('The signature is blank. Draw a signature');
        }
        else {
            $("#Signaturevalidation").text('署名が空白です。署名を描いてください');
        }

        //return false;
    }


};
function signatureClear() {
    var canvas = document.getElementById("newSignature");
    var context = canvas.getContext("2d");
    //context.clearRect(0, 0, canvas.width, canvas.height);
    clearCanvas(context, canvas);
    $("#Signaturevalidation").text("")
}

$(document).ready(function () {
    var canvas = document.getElementById("newSignature");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    $("#Signaturevalidation").text("")

    var canvas = document.getElementById("newSignature1");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    $("#Signaturevalidation").text("")

});

function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
    const pixelBuffer = new Uint32Array(context.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
    //return !pixelBuffer.some(color => color !== 0);
}

function btnOtherSlide() {

    var Mode = $("#someSwitchOptionPrimary").prop('checked');
   
    if (Mode == true) {
        OtherMode = true
        
        $("#txtOthervalue").hide();
        $("#SignatureHide").show();
        $("#btnOtherClearid").show();
        
        $("#Modetxt").text("Hand Written Mode");

        //$("#LanguageChanger").show();

        if (QFLFeedbackSitesOther != "Damage") {
            selectionmode=""
        }
    }
    else {
        OtherMode = false
        $("#btnOtherClearid").hide();
        $("#SignatureHide").hide();
        $("#txtOthervalue").show();
        $("#Modetxt").text("Text Mode");

        $("#LanguageChanger").hide();
        if (QFLFeedbackSitesOther != "Damage") {
            selectionmode = "txt"
        }
    }
   
}

function btnOtherClear() {
    var canvas = document.getElementById("newSignature1");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    $("#Signaturevalidation").text("")
}

var PreviousselectedValue

function btnOtherSiteSave() {

    OtherSiteSaveFilename = "";
    $("#OtherDefectValidation").text("");
    $("#OtherDefectValidation").hide();
    $("#OtherDefectValidationDamage").hide();
    $("#OtherDefectValidationDamage").text("");
    btnOtherClearDamage();
    GetDefectClassItems(QFLFeedbackSitesOther);

    if (QFLFeedbackSitesOther != "Damage") {
        if (selectionmode == "txt") {
            SelectionModetxt();
            $("#ModetxtDamage").text("Text Mode");
        }


       else if (OtherMode == true) {
            $("#ModetxtDamage").text("Hand Written Mode");
            var canvas1
            $("#someSwitchOptionPrimaryDamage").prop('checked', true);
            PreviousselectedValue = QFLFeedbackSitesOther;

            canvas1 = document.getElementById("newSignature1");

            var dataURL1 = canvas1.toDataURL("image/png");
            var image1 = dataURL1.replace('data:image/png;base64,', '');
            var blank;
            var Imglenght = image1.length;

         
            if (OtherSignatureValidation == dataURL1) {


                $("#OtherDefectValidation").show();
                $("#OtherDefectValidation").text("Please Fill the " + QFLFeedbackSitesOther + " value");
                return false;

                blank = true;
            }

            blank = false;


            $("#Signaturevalidation").removeAttr("color");

            if (blank == false) {
                showloader();
                HandWrittenText = "";
                HandWrittenTextDamage = "";
                var canvas = "";


                canvas = document.getElementById("newSignature1");

                // save canvas image as data url (png format by default)


                var dataURL = canvas.toDataURL("image/png");
                var image = dataURL.replace('data:image/png;base64,', '');

                var json = {
                    "imagedata": image,
                    "Vinnumber": VIN,
                    "VinId": VinIds,
                    "Gateid": QgateId,
                    "ModelName": ModelNumber
                };
                var Input = JSON.stringify(json);

                var ApiFunc = '../Home/SignatureSiteSave/';
                JsonPostMethod(ApiFunc, Input, '', function (data) {

                    if (data != null && data != '') {
                        OtherSiteSaveFilename = data;
                        CheckSinganatureYes();

                        //var ApiFunc = '../Home/CheckSignature/';
                        //JsonPostMethod(ApiFunc, Input, '', function (data) {
                        //    if (data != null && data != '') {

                        //        if (QFLFeedbackSitesOther == "Damage") {
                        //            HandWrittenTextDamage = data;
                        //        }
                        //        else {
                        //            HandWrittenText = data;
                        //        }

                        //        hideloader();
                        //        $('#CheckSignatureConfirmationpopup').modal('show');

                        //        if (UserDetails.Language == "en") {

                        //            $('#CheckSignatureConfirmationMsg').text('Are you sure? Please confirm your inputs.  ' + data + ' ?');
                        //        }
                        //        else {
                        //            $('#CheckSignatureConfirmationMsg').text('本気ですか？入力を確認してください' + data + ' ？');

                        //        }


                        //    }
                        //});
                    }
                });


            }

        }


        else {
            SelectionModetxt();
            selectionmode = "txt";
            $("#ModetxtDamage").text("Text Mode");
        }
     
    }
    else {
     if (OtherMode == true) {
            $("#ModetxtDamage").text("Hand Written Mode");
            var canvas1
            $("#someSwitchOptionPrimaryDamage").prop('checked', true);
            PreviousselectedValue = QFLFeedbackSitesOther;

            canvas1 = document.getElementById("newSignature1");

            var dataURL1 = canvas1.toDataURL("image/png");
            var image1 = dataURL1.replace('data:image/png;base64,', '');
            var blank;
            var Imglenght = image1.length;



            if (OtherSignatureValidation == dataURL1) {


                $("#OtherDefectValidation").show();
                $("#OtherDefectValidation").text("Please Fill the " + QFLFeedbackSitesOther + " value");
                return false;

                blank = true;
            }

            blank = false;


            $("#Signaturevalidation").removeAttr("color");

            if (blank == false) {
                showloader();
                HandWrittenText = "";
                HandWrittenTextDamage = "";
                var canvas = "";


                canvas = document.getElementById("newSignature1");

                // save canvas image as data url (png format by default)


                var dataURL = canvas.toDataURL("image/png");
                var image = dataURL.replace('data:image/png;base64,', '');

                var json = {
                    "imagedata": image,
                    "Vinnumber": VIN,
                     "VinId": VinIds,
                    "Gateid": QgateId,
                    "ModelName": ModelNumber
                };
                var Input = JSON.stringify(json);

                var ApiFunc = '../Home/SignatureSiteSave/';
                JsonPostMethod(ApiFunc, Input, '', function (data) {

                    if (data != null && data != '') {
                        OtherSiteSaveFilename = data;
                        CheckSinganatureYes();
                        //var ApiFunc = '../Home/CheckSignature/';
                        //JsonPostMethod(ApiFunc, Input, '', function (data) {
                        //    if (data != null && data != '') {

                        //        if (QFLFeedbackSitesOther == "Damage") {
                        //            HandWrittenTextDamage = data;
                        //        }
                        //        else {
                        //            HandWrittenText = data;
                        //        }

                        //        hideloader();
                        //        $('#CheckSignatureConfirmationpopup').modal('show');

                        //        if (UserDetails.Language == "en") {

                        //            $('#CheckSignatureConfirmationMsg').text('Are you sure? Please confirm your inputs.  ' + data + ' ?');
                        //        }
                        //        else {
                        //            $('#CheckSignatureConfirmationMsg').text('本気ですか？入力を確認してください' + data + ' ？');

                        //        }


                        //    }
                        //});
                    }
                });


            }

        }


        else {
            SelectionModetxt();
            selectionmode = "txt";
            $("#ModetxtDamage").text("Text Mode");
        }
    }
    
}
var IsSiteActive = false;
var OtherSiteSaveFilename = "";
function btnOtherCancelSiteDamage() {
    $("#OtherDefectPopUpDamage").modal('hide');
    $("#OtherDefectPopUp").modal('show');
    IsSiteActive = false;
    QFLFeedbackSitesOther = SelectedOtherSite;
}

var SelectedOtherSite = "";
function CheckSinganatureYes() {


    $('#CheckSignatureConfirmationpopup').modal('hide');
    var Site = QFLFeedbackSitesOther;

    const canvas = document.getElementById("newSignature1Damage");
    var context = canvas.getContext("2d");
    clearCanvas(context, canvas);
    SelectedOtherSite = QFLFeedbackSitesOther;
    if (QFLFeedbackSitesOther == "Site1") {

        OtherSite1 = HandWrittenText;

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }

       // Site = "Damage";
        OtherSite1 = "N/A";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#txtOthervalueDamage").hide();
        $("#SignatureHideDamage").show();
        //$("#LanguageChangerDamage").show();
        $("#btnOtherClearidDamage").show();

    }
    else if (QFLFeedbackSitesOther == "Site2") {

        OtherSite2 = HandWrittenText;
        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }

     //   Site = "Damage";

        OtherSite1 = "N/A";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#txtOthervalueDamage").hide();
        $("#SignatureHideDamage").show();
        //$("#LanguageChangerDamage").show();
        $("#btnOtherClearidDamage").show();
    }
    else if (QFLFeedbackSitesOther == "Site3") {
        OtherSite3 = HandWrittenText;

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
       // Site = "Damage";
        OtherSite1 = "N/A";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#txtOthervalueDamage").hide();
        $("#SignatureHideDamage").show();
        //$("#LanguageChangerDamage").show();
        $("#btnOtherClearidDamage").show();
    }
    else if (QFLFeedbackSitesOther == "Site4") {
        OtherSite4 = HandWrittenText;


        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
       // Site = "Damage";
        OtherSite1 = "N/A";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#txtOthervalueDamage").hide();
        $("#SignatureHideDamage").show();
        //$("#LanguageChangerDamage").show();
        $("#btnOtherClearidDamage").show();
    }
    else if (QFLFeedbackSitesOther == "Site5") {
        OtherSite5 = HandWrittenText;
       // Site = "Damage";

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
        $("#OtherDefectPopUp").modal("hide");
        // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#txtOthervalueDamage").hide();
        $("#SignatureHideDamage").show();
       // $("#LanguageChangerDamage").show();
        $("#btnOtherClearidDamage").show();

        OtherSite1 = "N/A";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';
    }
    else if (QFLFeedbackSitesOther == "Damage") {
        OtherDamage = HandWrittenTextDamage;
        if (HandWrittenTextDamage == "") {
            OtherDamage = HandWrittenText;
        }
        //    Site = "DefectClass";
        //    if (UserDetails.Language == "en") {
        //        $("#OtherDefectPopUpTitle").text("DefectClass");
        //    }
        //    else {

        //        $("#OtherDefectPopUpTitle").text("欠陥クラス");
        //    }


        //}
        //else if (QFLFeedbackSitesOther == "DefectClass") {
        //    OtherDefectClass = HandWrittenText;
        OtherSite1 = "N/A";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';
        OtherDamage = "";
    }

    if (QFLFeedbackSitesOther == "Damage") {
        
        //var json = {
        //    "vinid": VinIds,
        //    "qflworkflowid": DefectStaticCheclist,
        //    "site1": OtherSite1,
        //    "site2": OtherSite2,
        //    "site3": OtherSite3,
        //    "site4": OtherSite4,
        //    "site5": OtherSite5,
        //    "damage": OtherDamage,
        //    "defectclass": OtherDefectClass,
        //    "userid": UserDetails.UserId,
        //    "gateid": QgateId,
        //    "selectedchecklistitemid": SelectedCheckListItemId,
        //    "selectedstaticchecklistitemid": SelectedStaticCheckListItemId,
        //    "vinnumber": VIN,
        //    "defectplace": SelectedDefectPlace
        //};
        //var Input = JSON.stringify(json);
        //var ApiFunc = Api + 'QFL.svc/InsertStaticCheckItems';
        //PostMethod(ApiFunc, Input, Token, function (data) {

        //    $("#OtherDefectPopUp").modal('hide');
        //    $("#OtherDefectPopUpDamage").modal('hide');
        //    $('#DynamicAlertModal').modal('show')
        //    popuphidefunction();
            

        //    if (UserDetails.Language == "en") {
        //        $('#hTitle3').text('New defect added to the check item.');
        //    }
        //    else {
        //        $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
        //    }
        //    ForcetoStopReworkComplete();
        //    GetCheckListItems(UserDetails.PlantId, QgateId, '')

        //});

        $("#OtherDefectPopUp").modal("hide");

        $("#myModalDefectClass").modal("show");
        const canvas = document.getElementById("newSignature1");
        var context = canvas.getContext("2d");
        clearCanvas(context, canvas);
        //context.clearRect(0, 0, canvas.width, canvas.height);
        //canvas.width = canvas.width;
        //context.beginPath();
    }
    else {

        const canvas = document.getElementById("newSignature1");
        var context = canvas.getContext("2d");
        //clearCanvas(context, canvas);

        QFLFeedbackSitesOther = Site;
        $("#Signaturevalidation").text("")

    }

}


function btntbnCheckItemsNotOk(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem,individualitemcount ,givennotokcount ,okcheckcount, notokcheckcount,reexamflg ) {

     Site1Reverse = "";
     Site2Reverse = "";
     Site3Reverse = "";
     Site4Reverse = "";
     Site5Reverse = "";
     DamageReverse = "";
     uploadedFileName="";
     $(".uploaded_imageid").hide();

    var CheckstaticId = checklistitemid

    if (CheckstaticId == 0 || CheckstaticId == "" || CheckstaticId == undefined || CheckstaticId == null) {
        CheckstaticId = staticchecklistitemid;
    }

    

     OtherSignatureValidation= document.getElementById('newSignature1');
     DamageSignatureValidation= document.getElementById('newSignature1Damage');
      
     var context = OtherSignatureValidation.getContext("2d");
     var context1 = DamageSignatureValidation.getContext("2d");

     clearCanvas(context, OtherSignatureValidation);
     clearCanvas(context1, DamageSignatureValidation);

     OtherSignatureValidation=OtherSignatureValidation.toDataURL("image/png")
     DamageSignatureValidation=DamageSignatureValidation.toDataURL("image/png")

    QFLCheckListItemIdforskip = checklistitemid
    QFLstaticCheckListItemIdforskip = staticchecklistitemid
    StaticCheckListItemId = staticchecklistitemid;
    SelectedCheckListItemId = "";
    SelectedStaticCheckListItemId = "";

    DefectStaticCheclist = QFLFeedbackWorkflowId;
    SelectedDefectPlace = "";
    var classNameNotOk = $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
    if (classNameNotOk.trim() == "btn btn-closeCheck") {
        ClickNotOkItems = "NotOk"
        VinIds = VinId;
        //CheckSiteValue("", QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);
        NotOkCheck="NotOk";
        BindingPlaceClassNotOk(checklistitemid, VinId, StaticCheckListItemId);
    }
    else if (classNameNotOk.trim() == "btn btn-close")
    {
        NotOkCheck="NotOk";
        ClickNotOkItems = ""
        VinIds = VinId;
        //CheckSiteValue("", QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);
        BindingPlaceClass(checklistitemid, VinIds);
    }
  
    else {
        ClickNotOkItems = "NotOk";
        NotOkCheck="NotOk"
        VinIds = VinId;
        StaticCheckListItemId = "";
        StaticCheckListItemId = staticchecklistitemid;
        DefectStaticCheclist = QFLFeedbackWorkflowId;

        if (CheckItems == "NotOk") {
            VinIds = VinId
            BindingPlaceClassNotOk(checklistitemid, VinId, StaticCheckListItemId);
            CheckItemstatus = 3;
        }
    }
   
  
}

function BindingPlaceClassNotOk(checklistitemid, VinId, StaticCheckListItemId) {
   
    var json = {
        "checklistitemid": checklistitemid,
        "vinid": VinId,
        "qgateid": QgateId,
        "staticchecklistitemid": StaticCheckListItemId

    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
    PostMethod(ApiFunc, Input, Token, function (data) {

        var Defect = data.listchecklistdefectitems.length;

        if (Defect == 0) {
           
            var json = {
                "checklistitemid": QFLCheckListItemIdforskip,
                "defectplace": QFLDefectPlaceItems,
                "vinid": VinIds,
                "qgateid": QgateId,
                "staticchecklistitemid": QFLstaticCheckListItemIdforskip
            };
            var Input = JSON.stringify(json);

            if (ClickNotOkItems == "NotOk") {
                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
            }
            else {
                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
            }
            PostMethod(ApiFunc, Input, Token, function (data) {
                var SiteValue = "";
                for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                    if (data.listchecklistdefectitems[i].site1 != "") {
                        SiteValue = data.listchecklistdefectitems[i].site1;
                    }

                }

                if (SiteValue != "") {
                    QFLFeeedBackSitePopup(data);
                    $("#myModal2").modal('show');

                }
                else {
                    GetDamageDefectItemsNotOk(data.qflselectedname);
                }

                DefectPlacePopupdata = "";




            });

        }
        else {
            BindingDefectPlacePopup(data)
        }

    })


}

function btnlanguageselection() {

    var Mode = $("#LanguageChanger1").prop('checked');
    if (Mode == true) {
        selectorlanguage = "jp"
        $("#LanguageModetxt").text("Japanese");

    }
    else {
        selectorlanguage = "en"
        $("#LanguageModetxt").text("English");
    }


}

var BackSiteQFLFeedbackSiteId
var ReverseSite1StaticCheckListItemid = "";
var ReverseSite2StaticCheckListItemid = "";
var ReverseSite3StaticCheckListItemid = "";
var ReverseSite4StaticCheckListItemid = "";
var ReverseSite5StaticCheckListItemid = "";

var ReverseSite1CheckListItemId = "";
var ReverseSite2CheckListItemId = "";
var ReverseSite3CheckListItemId = "";
var ReverseSite4CheckListItemId = "";
var ReverseSite5CheckListItemId = "";

var ReverseSite1Selection = "";
var ReverseSite2Selection = "";
var ReverseSite3Selection = "";
var ReverseSite4Selection = "";
var ReverseSite5Selection = "";

function backSitepopup(BackSiteValue) {


    if (BackSiteValue == "Damage") {

        if (Site5Reverse == "Active") {
            QFLFeeedBackSitePopupReverse(SelectedSite5Data, "Site 5");
        }
        else if (Site4Reverse == "Active") {
            QFLFeeedBackSitePopupReverse(SelectedSite4Data, "Site 4");
        }
        else if (Site3Reverse == "Active") {
            QFLFeeedBackSitePopupReverse(SelectedSite3Data, "Site 3");
        }

        else if (Site2Reverse == "Active") {
            QFLFeeedBackSitePopupReverse(SelectedSite2Data, "Site 2");
        }

        else if (Site1Reverse == "Active") {
            QFLFeeedBackSitePopupReverse(SelectedSite1Data, "Site 1");
        }
       
        else if (DefectPlacePopupdata.listchecklistdefectitems == undefined || DefectPlacePopupdata=="") {
            $("#myModalDamage").modal('hide')
        }
        else if (DefectPlacePopupdata.listchecklistdefectitems.length > 0) {
            BindingDefectPlacePopup(DefectPlacePopupdata)
            $("#myModalDamage").modal('hide')
            $("#myModal").modal('show');
        }
       
    }

   

    else if (BackSiteValue == "Site5") {
        QFLFeeedBackSitePopupReverse(SelectedSite4Data, "Site 4");
    }
    else if (BackSiteValue == "Site4") {
        QFLFeeedBackSitePopupReverse(SelectedSite3Data, "Site 3");
    }
    else if (BackSiteValue == "Site3") {
        QFLFeeedBackSitePopupReverse(SelectedSite2Data, "Site 2");
    }
    else if (BackSiteValue == "Site2") {
        QFLFeeedBackSitePopupReverse(SelectedSite1Data, "Site 1");
    }
    

}

function QFLFeeedBackSitePopupReverse(data, Site) {

    if (Site == "Site 1") {
        Site2Reverse = "";
        DamageReverse = "";
    }
    else if (Site == "Site 2") {
        Site3Reverse = "";
        DamageReverse = "";
    }
    else if (Site == "Site 3") {
        Site4Reverse = "";
        DamageReverse = "";
    }
    else if (Site == "Site 4") {
        Site5Reverse = "";
        DamageReverse = "";
    }
    else if (Site == "Site 5") {

        DamageReverse = "";
    }



    if (Site == "Site 1") {
        QFLFeeedBackSitePopupForBack(data);
        SelectedSite2Data = "";

        $("#myModalSite4").modal('hide');
        $("#myModalSite5").modal('hide');
        $("#myModalDamage").modal('hide');
        $("#myModalSite3").modal('hide');
        $("#myModalSite2").modal('hide');
        //$("#myModal2").modal('hide')
        $("#myModal2").modal('show')
       
        //QFLCheckListItemId = ReverseSite1CheckListItemId;
        //StaticCheckListItemId = ReverseSite1StaticCheckListItemid;
    }
    else if (Site == "Site 2") {
        QFLFeeedBackSitePopupForBack(data);
        SelectedSite3Data = "";
        $("#myModalSite2").modal('show');
        $("#myModalSite4").modal('hide');
        $("#myModalSite5").modal('hide');
        $("#myModalDamage").modal('hide');
        $("#myModalSite3").modal('hide');
      
        $("#myModal2").modal('hide')

        //QFLCheckListItemId = ReverseSite2CheckListItemId;
        //StaticCheckListItemId = ReverseSite2StaticCheckListItemid;
    }

    else if (Site == "Site 3") {
        QFLFeeedBackSitePopupForBack(data);
        SelectedSite4Data = "";
        $("#myModalSite3").modal('show');
        $("#myModalSite4").modal('hide');
        $("#myModalSite5").modal('hide');
        $("#myModalDamage").modal('hide');
       
        $("#myModalSite2").modal('hide');
        $("#myModal2").modal('hide')

        //QFLCheckListItemId = ReverseSite3CheckListItemId;
        //StaticCheckListItemId = ReverseSite3StaticCheckListItemid;
    }

    else if (Site == "Site 4") {
        QFLFeeedBackSitePopupForBack(data);
        SelectedSite5Data = "";
        $("#myModalSite4").modal('show');
        $("#myModalSite5").modal('hide');
        $("#myModalDamage").modal('hide');
        $("#myModalSite3").modal('hide');
        $("#myModalSite2").modal('hide');
        $("#myModal2").modal('hide')

        //QFLCheckListItemId = ReverseSite4CheckListItemId;
        //StaticCheckListItemId = ReverseSite4StaticCheckListItemid;
    }

    else if (Site == "Site 5") {
        QFLFeeedBackSitePopupForBack(data);
        SelectedDamageData = "";
        $("#myModalSite5").modal('show');
        $("#myModalDamage").modal('hide');
        $("#myModalSite4").modal('hide');
        $("#myModalSite3").modal('hide');
        $("#myModalSite2").modal('hide');
        $("#myModal2").modal('hide')

        //QFLCheckListItemId = ReverseSite5CheckListItemId;
        //StaticCheckListItemId = ReverseSite5StaticCheckListItemid;
    }


}

function backSite1popup() {

    if (DefectPlacePopupdata.listchecklistdefectitems == undefined || DefectPlacePopupdata=="") {
        $("#myModal2").modal('hide');
        $("#myModal").modal('hide');
    }
  
    else if (DefectPlacePopupdata.listchecklistdefectitems.length > 0) {
        BindingDefectPlacePopup(DefectPlacePopupdata)
        $("#myModal2").modal('hide');
        $("#myModal").modal('show');
    }
    else {
        $("#myModal2").modal('hide');
    }
}

function popuphidefunction() {
    $("#myModalSite5").modal('hide');
    $("#myModalDamage").modal('hide');
    $("#myModalSite4").modal('hide');
    $("#myModalSite3").modal('hide');
    $("#myModalSite2").modal('hide');
    $("#myModal2").modal('hide');
    $("#myModalDefectClass").modal('hide');
}

function ForcetoStopReworkComplete() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var json = {
        "filename": "",
        "vinid": VinIds,
        "userid": UserDetails.UserId,
        "iscompleted": false,
        "vinnumber": VIN,
        "isreworkcompleted": false,
        "isreexaminationcompleted": false,
        "gatename": 'Rework',
        "ModelName": ModelNumber

    };


    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/InsertSignature';

    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.result == "Updated") {

        }
        document.getElementById("Qgateid_" + Reworkgateid).style.backgroundColor = "";

    });


}

function CheckSiteValue(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItemValue, GateName,datas) {

    var json = {
        "checklistitemid": QFLCheckListItemIdforskip,
        "defectplace": "",
        "vinid": VinIds,
        "qgateid": QgateId,
        "staticchecklistitemid": QFLstaticCheckListItemIdforskip
    };
    var Input = JSON.stringify(json);
     
 
    if (ClickNotOkItems == "NotOk") {
        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
    }
    else {
        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
    }
   
    PostMethod(ApiFunc, Input, Token, function (data) {

        if (data.listchecklistdefectitems.length) {

            if (data.listchecklistdefectitems.length == 1 || data.listchecklistdefectitems.length <= 0 || data.listchecklistdefectitems == undefined) {
                //UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItemValue, GateName);
                var checklistitemids
                var staticCheckListItemIds
                if (data.listchecklistdefectitems.length <= 0 || data.listchecklistdefectitems == undefined) {
                    checklistitemids = QFLCheckListItemIdforskip;
                    staticCheckListItemIds = QFLstaticCheckListItemIdforskip
                }
                else {
                    checklistitemids = data.listchecklistdefectitems[0].checklistitemid;
                    staticCheckListItemIds = data.listchecklistdefectitems[0].staticchecklistitemid;
                }




                var json = {
                    "checklistitemid": checklistitemids,
                    "site5": "",
                    "vinid": VinIds,
                    "qgateid": QgateId,
                    "staticchecklistitemid": staticCheckListItemIds
                };
                var Input = JSON.stringify(json);


                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';

                //var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatus';
                PostMethod(ApiFunc, Input, Token, function (data) {
                    $("#myModal2").modal('hide');
                    
                    GetDirectDamagePopupData(data)
                
                    // QFLFeeedBackSitePopup(data);

                    //$("#myModal2").modal('hide');
                    //popuphidefunction();
                    //$("#DynamicAlertModal").modal('show');

                    //if (UserDetails.Language == "en") {
                    //    $('#hTitle3').text('New defect added to the check item');
                    //}
                    //else {
                    //    $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
                    //}
                    //ForcetoStopReworkComplete();
                    //GetCheckListItems(UserDetails.PlantId, QgateId, '')

                });

            }
            else {
                for (var i = 0; i < datas.listchecklistdefectitems.length; i++) {

                    if (datas.listchecklistdefectitems[i].site2 != "") {
                        SiteValue = datas.listchecklistdefectitems[i].site2;
                    }

                }

                if (SiteValue != "") {
                    QFLFeeedBackSitePopup(datas);
                    $("#myModalSite2").modal('show');
                    $("#myModal2").modal('hide');

                }
                else {
                    GetDamageDefectItems(datas.qflselectedname);
                }
            }

        }
       

    });

}



var CheckSiteValid;
$(document).ready(function () {
    $("#btnSubmitSite2").click(function () {

        $("#DefectSite2Validation").text("");
        if (QFLCheckListItemId == "" && StaticCheckListItemId == "") {
            $("#DefectSite2Validation").show();
            if (UserDetails.Language == "en") {
                $("#DefectSite2Validation").text("Please click the Button");
            }
            else {
                $("#DefectSite2Validation").text("ボタンをクリックしてください");
            }
            return false;
        }
        SelectedCheckListItemId = QFLCheckListItemId;
        SelectedStaticCheckListItemId = StaticCheckListItemId;
        var Site = QFLFeedbackSites;

        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site2": QFLDefectPlaceItems,
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        }



        var Input = JSON.stringify(json);
        var SiteValue = "";
        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
      
            PostMethod(ApiFunc, Input, Token, function (data) {
                if (data.listchecklistdefectitems.length <= 0) {
                    return false;
                }
               
                    for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                        if (data.listchecklistdefectitems[i].site3 != "") {
                            SiteValue = data.listchecklistdefectitems[i].site3;
                        }

                    }

                    if (SiteValue != "") {
                        QFLFeeedBackSitePopup(data);
                        $("#myModalSite2").modal('hide');
                        $("#myModalSite3").modal('show');
                    }
                    else {
                        GetDamageDefectItems(data.qflselectedname);
                    }
                
            });
        

    });

    $("#btnSubmitSite3").click(function () {
        
        $("#DefectSite3Validation").text("");
        if (QFLCheckListItemId == "" && StaticCheckListItemId == "") {
            $("#DefectSite3Validation").show();
            if (UserDetails.Language == "en") {
                $("#DefectSite3Validation").text("Please click the Button");
            }
            else {
                $("#DefectSite3Validation").text("ボタンをクリックしてください");
            }
            return false;
        }
        SelectedCheckListItemId = QFLCheckListItemId;
        SelectedStaticCheckListItemId = StaticCheckListItemId;
        var Site = QFLFeedbackSites;

        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site3": QFLDefectPlaceItems,
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        }



        var Input = JSON.stringify(json);
        var SiteValue = "";
        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
       
            PostMethod(ApiFunc, Input, Token, function (data) {
                if (data.listchecklistdefectitems.length <= 0) {
                    return false;
                }
                
                    for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                        if (data.listchecklistdefectitems[i].site4 != "") {
                            SiteValue = data.listchecklistdefectitems[i].site4;
                        }

                    }

                    if (SiteValue != "") {
                        QFLFeeedBackSitePopup(data);
                        $("#myModalSite3").modal('hide');
                        $("#myModalSite4").modal('show');
                    }
                    else {
                        GetDamageDefectItems(data.qflselectedname);
                    }
               
            });
        

    });


    $("#btnSubmitSite4").click(function () {

        $("#DefectSite4Validation").text("");
        if (QFLCheckListItemId == "" && StaticCheckListItemId == "") {
            $("#DefectSite4Validation").show();
            if (UserDetails.Language == "en") {
                $("#DefectSite4Validation").text("Please click the Button");
            }
            else {
                $("#DefectSite4Validation").text("ボタンをクリックしてください");
            }
            return false;
        }
        SelectedCheckListItemId = QFLCheckListItemId;
        SelectedStaticCheckListItemId = StaticCheckListItemId;
        var Site = QFLFeedbackSites;

        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site4": QFLDefectPlaceItems,
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        }



        var Input = JSON.stringify(json);
        var SiteValue = "";
        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
        
            PostMethod(ApiFunc, Input, Token, function (data) {
                if (data.listchecklistdefectitems.length <= 0) {
                    return false;
                }

                    for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                        if (data.listchecklistdefectitems[i].site5 != "") {
                            SiteValue = data.listchecklistdefectitems[i].site5;
                        }

                    }

                    if (SiteValue != "") {
                        QFLFeeedBackSitePopup(data);
                        $("#myModalSite4").modal('hide');
                        $("#myModalSite5").modal('show');
                    }
                    else {
                        GetDamageDefectItems(data.qflselectedname);
                    }
                
            });
       

    });


    $("#btnSubmitSite5").click(function () {

        $("#DefectSite5Validation").text("");
        if (QFLCheckListItemId == "" && StaticCheckListItemId == "") {
            $("#DefectSite5Validation").show();
            if (UserDetails.Language == "en") {
                $("#DefectSite5Validation").text("Please click the Button");
            }
            else {
                $("#DefectSite5Validation").text("ボタンをクリックしてください");
            }
            return false;
        }
        SelectedCheckListItemId = QFLCheckListItemId;
        SelectedStaticCheckListItemId = StaticCheckListItemId;
        var Site = QFLFeedbackSites;

        var json = {
            "checklistitemid": QFLCheckListItemId,
            "site5": QFLDefectPlaceItems,
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": StaticCheckListItemId
        }



        var Input = JSON.stringify(json);
        var SiteValue = "";
        var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
        
            PostMethod(ApiFunc, Input, Token, function (data) {
                if (data.listchecklistdefectitems.length <= 0) {
                    return false;
                }
               
               
                    for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                        if (data.listchecklistdefectitems[i].damage != "") {
                            SiteValue = data.listchecklistdefectitems[i].damage;
                        }

                    }

                    if (SiteValue != "") {
                        QFLFeeedBackSitePopup(data);
                        $("#myModalSite5").modal('hide');
                        $("#myModalDamage").modal('show');
                    }
                    else {
                        GetDamageDefectItems(data.qflselectedname);
                    }
                
            });
       

    });


    $("#btnSubmitDamage").click(function () {

        $("#DefectDamageValidation").text("");
        if (QFLCheckListItemId == "" && StaticCheckListItemId == "") {
            $("#DefectDamageValidation").show();
            if (UserDetails.Language == "en") {
                $("#DefectDamageValidation").text("Please click the Button");
            }
            else {
                $("#DefectDamageValidation").text("ボタンをクリックしてください");
            }
            return false;
        }
        SelectedCheckListItemId = QFLCheckListItemId;
        SelectedStaticCheckListItemId = StaticCheckListItemId;
        CheckItemValue = "NotOk";
        $("#myModalDamage").modal('hide');
        UpdateCheckItemsfromDamage();

    });

});

function clearCanvas(context, canvas) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
}

function btnOtherSlideDamage() {

    var Mode = $("#someSwitchOptionPrimaryDamage").prop('checked');

    if (Mode == true) {
        OtherMode = true

        $("#txtOthervalueDamage").hide();
        $("#SignatureHideDamage").show();
        $("#btnOtherClearidDamage").show();

        $("#ModetxtDamage").text("Hand Written Mode");

      //  $("#LanguageChangerDamage").show();
    }
    else {
        OtherMode = false
        $("#btnOtherClearidDamage").hide();
        $("#SignatureHideDamage").hide();
        $("#txtOthervalueDamage").show();
        $("#ModetxtDamage").text("Text Mode");
        $("#LanguageChangerDamage").hide();

    }

}

function btnlanguageselectionDamage() {

    var Mode = $("#LanguageChanger1Damage").prop('checked');
    if (Mode == true) {
        selectorlanguage = "jp"
        $("#LanguageModetxtDamage").text("Japanese");

    }
    else {
        selectorlanguage = "en"
        $("#LanguageModetxtDamage").text("English");
    }


}

function SelectionModetxt() {
    $("#someSwitchOptionPrimaryDamage").prop('checked', false);
    var Txtvalidation = document.getElementById("txtOthervalue").value;
    var TxtvalidationDamage = document.getElementById("txtOthervalueDamage").value;

    
        if (Txtvalidation == "") {
            $("#OtherDefectValidation").show();
            $("#OtherDefectValidation").text("Please Fill the " + QFLFeedbackSitesOther + " value");
            return false;
        }
    
    IsSiteActive = true;
    PreviousselectedValue = QFLFeedbackSitesOther;
    var Site = QFLFeedbackSitesOther;
    SelectedOtherSite = QFLFeedbackSitesOther;
    if (QFLFeedbackSitesOther == "Site1") {

        OtherSite1 = Txtvalidation;

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }

        //Site = "Damage";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
       // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");

        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();

    }
    else if (QFLFeedbackSitesOther == "Site2") {

        OtherSite2 = Txtvalidation;



        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }

        //Site = "Damage";

        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        //$("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Site3") {
        OtherSite3 = Txtvalidation;


        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
       // Site = "Damage";
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        //$("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#OtherDefectPopUp").modal("hide");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Site4") {
        OtherSite4 = Txtvalidation;
       // Site = "Site 5";

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
        //Site = "Damage";
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        //$("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#OtherDefectPopUp").modal("hide");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Site5") {
        OtherSite5 = Txtvalidation;
       // Site = "Damage";

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {

            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
        $("#OtherDefectPopUp").modal("hide");
       // $("#OtherDefectPopUpDamage").modal("show");
        $("#myModalDefectClass").modal("show");
        $("#OtherDefectPopUp").modal("hide");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Damage") {

        OtherDamage = TxtvalidationDamage;
        if (TxtvalidationDamage == "") {
            OtherDamage = Txtvalidation;
        }
    }
    else if (QFLFeedbackSitesOther == "DefectClass") {
       // OtherDefectClass = Txtvalidation;

    }
    selectionmode = "txt";
    $("#btnOtherClearidDamage").hide();
    if (QFLFeedbackSitesOther == "Damage") {
        showPopup2 = false;
        showPopup3 = true;
        //var json = {
        //    "vinid": VinIds,
        //    "qflworkflowid": DefectStaticCheclist,
        //    "site1": OtherSite1,
        //    "site2": OtherSite2,
        //    "site3": OtherSite3,
        //    "site4": OtherSite4,
        //    "site5": OtherSite5,
        //    "damage": OtherDamage,
        //    "defectclass": OtherDefectClass,
        //    "userid": UserDetails.UserId,
        //    "gateid": QgateId,
        //    "selectedchecklistitemid": SelectedCheckListItemId,
        //    "selectedstaticchecklistitemid": SelectedStaticCheckListItemId,
        //    "vinnumber": VIN,
        //    "defectplace": SelectedDefectPlace
        //};
        //var Input = JSON.stringify(json);
        //var ApiFunc = Api + 'QFL.svc/InsertStaticCheckItems';
        //PostMethod(ApiFunc, Input, Token, function (data) {

        //    $("#OtherDefectPopUp").modal('hide');
        //    $("#OtherDefectPopUpDamage").modal('hide');
        //    popuphidefunction();

        //    // Load up a new modal...

        //    $('#DynamicAlertModal').modal('show');
        //    showPopup3 = false;

        //    // $("#DynamicAlertModal").modal('show');

        //    if (UserDetails.Language == "en") {
        //        $('#hTitle3').text('New defect added to the check item.');
        //    }
        //    else {
        //        $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
        //    }
        //    ForcetoStopReworkComplete();
        //    GetCheckListItems(UserDetails.PlantId, QgateId, '')

        //});

        $("#OtherDefectPopUp").modal("hide");
       
        $("#myModalDefectClass").modal("show");



        document.getElementById("txtOthervalue").value = "";
        document.getElementById("txtOthervalueDamage").value = "";
    }
    else {
        //$("#OtherDefectPopUpTitle").text(Site);
        QFLFeedbackSitesOther = Site;
        // document.getElementById("txtOthervalue").value = "";
    }
}

function SelectionModetxtDamage() {


    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    $("#someSwitchOptionPrimaryDamage").prop('checked', false);
    var Txtvalidation = document.getElementById("txtOthervalue").value;
    var TxtvalidationDamage = document.getElementById("txtOthervalueDamage").value;



    if (TxtvalidationDamage == "") {
        $("#OtherDefectValidationDamage").show();
        $("#OtherDefectValidationDamage").text("Please Fill the " + QFLFeedbackSitesOther + " value");
        return false;
    }


    IsSiteActive = true;
    PreviousselectedValue = QFLFeedbackSitesOther;
    var Site = QFLFeedbackSitesOther;
    if (QFLFeedbackSitesOther == "Site1") {

        OtherSite1 = Txtvalidation;

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }

        Site = "Damage";
        OtherSite2 = 'N/A';
        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        $("#OtherDefectPopUpDamage").modal("show");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();

    }
    else if (QFLFeedbackSitesOther == "Site2") {

        OtherSite2 = Txtvalidation;



        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }

        Site = "Damage";

        OtherSite3 = 'N/A';
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        $("#OtherDefectPopUpDamage").modal("show");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Site3") {
        OtherSite3 = Txtvalidation;


        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
        Site = "Damage";
        OtherSite4 = 'N/A';
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        $("#OtherDefectPopUpDamage").modal("show");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Site4") {
        OtherSite4 = Txtvalidation;
        Site = "Site 5";

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {
            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
        Site = "Damage";
        OtherSite5 = 'N/A';

        $("#OtherDefectPopUp").modal("hide");
        $("#OtherDefectPopUpDamage").modal("show");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Site5") {
        OtherSite5 = Txtvalidation;
        Site = "Damage";

        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitleDamage").text("Damage");
        }
        else {

            $("#OtherDefectPopUpTitleDamage").text("ダメージ");
        }
        $("#OtherDefectPopUp").modal("hide");
        $("#OtherDefectPopUpDamage").modal("show");
        $("#txtOthervalueDamage").show();
        $("#SignatureHideDamage").hide();
        $("#LanguageChangerDamage").hide();
    }
    else if (QFLFeedbackSitesOther == "Damage") {

        OtherDamage = TxtvalidationDamage;

        if (TxtvalidationDamage == "") {
            OtherDamage = Txtvalidation;
        }

        //Site = "DefectClass";

        //if (UserDetails.Language == "en") {
        //    $("#OtherDefectPopUpTitle").text("DefectClass");
        //}
        //else {

        //    $("#OtherDefectPopUpTitle").text("欠陥クラス");


        //}

    }
    else if (QFLFeedbackSitesOther == "DefectClass") {
        OtherDefectClass = Txtvalidation;

    }
    selectionmode = "txt";
    $("#btnOtherClearidDamage").hide();
    if (QFLFeedbackSitesOther == "Damage") {
        showPopup2 = false;
        showPopup3 = true;
        var json = {
            "vinid": VinIds,
            "qflworkflowid": DefectStaticCheclist,
            "site1": OtherSite1,
            "site2": OtherSite2,
            "site3": OtherSite3,
            "site4": OtherSite4,
            "site5": OtherSite5,
            "damage": OtherDamage,
            "defectclass": OtherDefectClass,
            "userid": UserDetails.UserId,
            "gateid": QgateId,
            "selectedchecklistitemid": SelectedCheckListItemId,
            "selectedstaticchecklistitemid": SelectedStaticCheckListItemId,
            "vinnumber": VIN,
            "defectplace": SelectedDefectPlace,
            "SiteSaveImage": "",
            "uploadedFileName": uploadedFileName,
            "checklistitemid": QFLCheckListItemIdforskip,
            "StaticCheckListItemId": QFLstaticCheckListItemIdforskip,
            "ModelName": ModelNumber
        };
        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/InsertStaticCheckItems';
        PostMethod(ApiFunc, Input, Token, function (data) {

            $("#OtherDefectPopUp").modal('hide');
            $("#OtherDefectPopUpDamage").modal('hide');
            popuphidefunction();

            // Load up a new modal...

            $('#DynamicAlertModal').modal('show');
            showPopup3 = false;

            // $("#DynamicAlertModal").modal('show');

            if (UserDetails.Language == "en") {
                $('#hTitle3').text('New defect added to the check item.');
            }
            else {
                $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
            }
            ForcetoStopReworkComplete();
            GetCheckListItems(UserDetails.PlantId, QgateId, '')

        });


        document.getElementById("txtOthervalue").value = "";
        document.getElementById("txtOthervalueDamage").value = "";
    }
    else {
        //$("#OtherDefectPopUpTitle").text(Site);
        QFLFeedbackSitesOther = Site;
        // document.getElementById("txtOthervalue").value = "";
    }
}

var OtherSignatureValidation;
var DamageSignatureValidation;
function btnOtherSiteSaveDamage() {
    $("#OtherDefectValidation").text("");
    $("#OtherDefectValidation").hide();
    $("#OtherDefectValidationDamage").hide();
    $("#OtherDefectValidationDamage").text("");



    if (OtherMode == true) {

        var canvas1
        $("#someSwitchOptionPrimaryDamage").prop('checked', true);
        PreviousselectedValue = QFLFeedbackSitesOther;
        if (QFLFeedbackSitesOther == "Damage") {
            canvas1 = document.getElementById("newSignature1Damage");

        }
        else {
            canvas1 = document.getElementById("newSignature1");
        }


        var dataURL1 = canvas1.toDataURL("image/png");
        var image1 = dataURL1.replace('data:image/png;base64,', '');
        var blank;
        var Imglenght = image1.length;

        if (QFLFeedbackSitesOther == "Damage") {

            if (DamageSignatureValidation == dataURL1) {


                $("#OtherDefectValidationDamage").show();
                $("#OtherDefectValidationDamage").text("Please Fill the " + QFLFeedbackSitesOther + " value");
                return false;


                blank = true;
            }
        }
        else {
            if (OtherSignatureValidation == dataURL1) {


                $("#OtherDefectValidation").show();
                $("#OtherDefectValidation").text("Please Fill the " + QFLFeedbackSitesOther + " value");
                return false;


                blank = true;
            }
        }
        blank = false;


        $("#Signaturevalidation").removeAttr("color");

        if (blank == false) {
            showloader();
            HandWrittenText = "";
            HandWrittenTextDamage = "";
            var canvas = "";
            if (QFLFeedbackSitesOther == "Damage") {
                canvas = document.getElementById("newSignature1Damage");
            }
            else {
                canvas = document.getElementById("newSignature1");
            }
            // save canvas image as data url (png format by default)


            var dataURL = canvas.toDataURL("image/png");
            var image = dataURL.replace('data:image/png;base64,', '');

            var json = {
                "imagedata": image,
                "Vinnumber": VIN,
                "VinId": VinIds,
                "Gateid": QgateId,
                "ModelName": ModelNumber
            };
            var Input = JSON.stringify(json);

            var ApiFunc = '../Home/SignatureSiteSave/';
            JsonPostMethod(ApiFunc, Input, '', function (data) {

                if (data != null && data != '') {
                    OtherSiteSaveFilename = data;
                    CheckSinganatureYes();
                    //var ApiFunc = '../Home/CheckSignature/';
                    //JsonPostMethod(ApiFunc, Input, '', function (data) {
                    //    if (data != null && data != '') {

                    //        if (QFLFeedbackSitesOther == "Damage") {
                    //            HandWrittenTextDamage = data;
                    //        }
                    //        else {
                    //            HandWrittenText = data;
                    //        }

                    //        hideloader();
                    //        $('#CheckSignatureConfirmationpopup').modal('show');

                    //        if (UserDetails.Language == "en") {

                    //            $('#CheckSignatureConfirmationMsg').text('Are you sure? Please confirm your inputs.  ' + data + ' ?');
                    //        }
                    //        else {
                    //            $('#CheckSignatureConfirmationMsg').text('本気ですか？入力を確認してください' + data + ' ？');

                    //        }


                    //    }
                    //});
                }
            });


        }


    }


    else {
        SelectionModetxtDamage()

    }
}

function btnOtherClearDamage() {
    var canvas = document.getElementById("newSignature1Damage");
    var context = canvas.getContext("2d");
    //context.clearRect(0, 0, canvas.width, canvas.height);

    $("#Signaturevalidation").text("");
    //canvas.width = canvas.width;
    clearCanvas(context, canvas)
}


function PermenentClosePopup() {
    popuphidefunction()
    Site1Reverse = "";
    Site2Reverse = "";
    Site3Reverse = "";
    Site4Reverse = "";
    Site5Reverse = "";
    DamageReverse = "";
}

function GetDirectDamagePopupData(data) {

    $("#myModalDamage").modal('show');

    $("#DefectSiteValidation").text("");
    $("#DefectSite2Validation").hide();
    $("#DefectSiteValidation").hide();
    $("#DefectSite3Validation").hide();
    $("#DefectSite4Validation").hide();
    $("#DefectSite5Validation").hide();
    $("#DefectDamageValidation").hide();

    if (data.qflselectedname == "Site 1") {
        Site1Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 2") {
        Site2Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 3") {
        Site3Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 4") {
        Site4Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 5") {
        Site5Reverse = "Active";

    }
    else if (data.qflselectedname == "Damage") {
        DamageReverse = "Active";

    }

    ReverseSelection = "";
    QFLDefectPlaceItems = "";
    QFLCheckListItemId = "";
    StaticCheckListItemId = "";
    QFLFeedBackWorkflowId = "";
    $("#QFLFeedBackSite").empty();
    var content = [];
    var QFLFeedBackSite = data.listchecklistdefectitems

    QFLFeedbackSitesOther = data.qflselectedname;
    if (QFLFeedBackSite.length <= 0) {
        return false;
    }
    QFLFeedbackSites = data.qflselectedname
    if (QFLFeedbackSites == "Site 1") {
        //if (UserDetails.Language == "en")
        //{
        //	$('#btnSubmit1').val('Submit');

        //}
        //else {
        //	$('#btnSubmit1').val('参加する');
        //}


    }
    //$("#PopupTitle1").text(data.qflselectedname);
    var buttoncount = 1;
    var Buttonid = 1;

    var QFLFeedBackSiteLenght = QFLFeedBackSite.length;
    var QFLFeedBackSiteLoopCount = 1;
    var SelectedValue = "";
    var SiteValues = "";


    if (QFLFeedBackSite.length > 0) {
        content.push('<div><span><label class="f-16">' + SelectedValue + '</label></span> </div>');
        content.push('<div class="row mt-10">');


        $.each(QFLFeedBackSite, function (i, QFLFeedBackSite) {

            if (buttoncount > 3) {
                content.push('</div> <div class="row mt-10">');

                buttoncount = 1;
            }

             if (QFLFeedbackSites == "Damage") {
                SiteValues = "Damage";
                $('#PopupTitleDamage').val('Damage');
                if (QFLFeedBackSite.damage != "") {


                    content.push('<div class="col-sm-4">');

                    if (UserDetails.Language == "en") {
                        $("#PopupTitleDamage").text("Damage");
                    }
                    else {

                        $("#PopupTitleDamage").text("ダメージ");

                    }
                    content.push('<button type="button" id="QFLFeedbackSiteDamage_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSiteDamage_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Damage") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.damage + '</button>');
                    content.push('</div>');

                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            //content.push('</div>');
            //buttoncount++;
            Buttonid++;
            QFLFeedBackSiteLoopCount++
        });

        //content.push('<input type="submit" value="Others" id="btnOtherSite" text="' + data.qflselectedname + '"  style="margin-left:72px" class="btn btn-success"  onclick=SiteOthers1() />')


    }


    if (GateName != "Rework" && GateName != "Re-Examination" || GateName != "Re-Examination1") {
        var disable = "";
        var othersitecount = data.getothersiterowcount

        if (othersitecount.length > 0) {
            if (othersitecount.length > 1) {
                disable = "";
            }
        }

        if (buttoncount > 3) {
            content.push('</div> <div class="row mt-10">');

        }
        content.push('<div class="col-sm-4">');
        //content.push('<button type="button" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons">' + "Others" + '</button>');

        if (UserDetails.Language == "en") {
            content.push('<input style="background-color:#676a6c;color: white;" type="submit" value="Others" id="btnOtherSite" text="" class="btn btn-block feedback-modal-buttons" ' + disable + ' onclick=SiteOthers1("' + SiteValues + '") />');

        }
        else {
            content.push('<input style="background-color:#676a6c;color: white;" type="submit" value="その他" id="btnOtherSite" text="" class="btn btn-block feedback-modal-buttons" ' + disable + ' onclick=SiteOthers1("' + SiteValues + '") />');
        }
    }

    content.push('</div>');
    content.push('</div>');

    var OtherDoneButton = [];
    $("#OtherSiteDoneid").empty();

    OtherDoneButton.push('<input type="submit" id="" onclick=btnOtherCancelSite("' + SiteValues + '") class="btn btn-danger trn" value="Back" />');
    OtherDoneButton.push('<input type="submit" id="btnSubmitOtherSite" onclick=btnOtherSiteSave("' + SiteValues + '") class="btn btn-success btn-cancel btn-center trn" value="Done" />');
    $("#OtherSiteDoneid").append(OtherDoneButton.join(''));

     if (QFLFeedbackSites == "Damage") {
        $("#QFLFeedBackSiteDamage").empty();
        $("#QFLFeedBackSiteDamage").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
     }




}

function QFLFeeedBackSitePopupForBack(data) {

    $("#DefectSiteValidation").text("");
    $("#DefectSite2Validation").hide();
    $("#DefectSiteValidation").hide();
    $("#DefectSite3Validation").hide();
    $("#DefectSite4Validation").hide();
    $("#DefectSite5Validation").hide();
    $("#DefectDamageValidation").hide();

    ReverseSelection = "";
    QFLDefectPlaceItems = "";
    QFLCheckListItemId = "";
    StaticCheckListItemId = "";
    QFLFeedBackWorkflowId = "";
    $("#QFLFeedBackSite").empty();
    var content = [];
    var QFLFeedBackSite = data.listchecklistdefectitems

    QFLFeedbackSitesOther = data.qflselectedname;
    if (QFLFeedBackSite.length <= 0) {
        return false;
    }
    QFLFeedbackSites = data.qflselectedname
 

    if (data.qflselectedname == "Site 1") {
        Site1Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 2") {
        Site2Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 3") {
        Site3Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 4") {
        Site4Reverse = "Active";

    }
    else if (data.qflselectedname == "Site 5") {
        Site5Reverse = "Active";

    }
    else if (data.qflselectedname == "Damage") {
        DamageReverse = "Active";

    }

    var buttoncount = 1;
    var Buttonid = 1;

    var QFLFeedBackSiteLenght = QFLFeedBackSite.length;
    var QFLFeedBackSiteLoopCount = 1;
    var SelectedValue = "";
    var SiteValues = "";

    $.each(data.listdefectselectedvalue, function (i, listdefectselectedvalue) {
        if (SelectedValue != "") {
            SelectedValue = SelectedValue + ", "
        }
        SelectedValue = SelectedValue + listdefectselectedvalue.selectedvalue;
    });


    if (QFLFeedBackSite.length > 0) {
        content.push('<div><span><label class="f-16">' + SelectedValue + '</label></span> </div>');
        content.push('<div class="row mt-10">');


        $.each(QFLFeedBackSite, function (i, QFLFeedBackSite) {

            if (buttoncount > 3) {
                content.push('</div> <div class="row mt-10">');

                buttoncount = 1;
            }


            if (QFLFeedbackSites == "Site 1") {
                $('#PopupTitle1').val('Site 1');
                SiteValues = "Site1";
                if (QFLFeedBackSite.site1 != "") {



                    content.push('<div class="col-sm-4">');
                    $('#PopupTitle1').val('Site 1');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle1").text("Site 1");
                    }
                    else {

                        $("#PopupTitle1").text("敷地 1");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite1_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite1_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site1") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site1 + '</button>');
                    content.push('</div>');

                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;

                //}
            }
            else if (QFLFeedbackSites == "Site 2") {
                SiteValues = "Site2";
                $("#myModal2").modal('hide');

                $('#PopupTitle2').val('Site 2');
                if (QFLFeedBackSite.site2 != "") {

                    content.push('<div class="col-sm-4">');
                    //$('#PopupTitle').val('Site 2');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle2").text("Site 2");
                    }
                    else {

                        $("#PopupTitle2").text("敷地 2");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite2_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite2_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site2") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site2 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                $("#myModalSite2").modal('show');
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }

            else if (QFLFeedbackSites == "Site 3") {
                SiteValues = "Site3";
                $('#PopupTitle3').val('Site 3');

                if (QFLFeedBackSite.site3 != "") {



                    content.push('<div class="col-sm-4">');
                    //$('#PopupTitle').val('Site 3');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle3").text("Site 3");
                    }
                    else {

                        $("#PopupTitle3").text("敷地 3");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite3_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite3_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site3") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site3 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            else if (QFLFeedbackSites == "Site 4") {
                SiteValues = "Site4";
                $('#PopupTitle4').val('Site 4');
                if (QFLFeedBackSite.site4 != "") {

                    content.push('<div class="col-sm-4">');
                    //$('#PopupTitle').val('Site 4');
                    if (UserDetails.Language == "en") {
                        $("#PopupTitle4").text("Site 4");
                    }
                    else {

                        $("#PopupTitle4").text("敷地 4");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite4_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite4_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site4") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site4 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            else if (QFLFeedbackSites == "Site 5") {
                SiteValues = "Site5";
                $('#PopupTitle5').val('Site 5');
                if (QFLFeedBackSite.site5 != "") {


                    content.push('<div class="col-sm-4">');

                    if (UserDetails.Language == "en") {
                        $("#PopupTitle5").text("Site 5");
                    }
                    else {

                        $("#PopupTitle5").text("敷地 5");


                    }
                    content.push('<button type="button" id="QFLFeedbackSite5_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite5_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Site5") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.site5 + '</button>');
                    content.push('</div>');
                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            else if (QFLFeedbackSites == "Damage") {
                SiteValues = "Damage";
                $('#PopupTitleDamage').val('Damage');
                if (QFLFeedBackSite.damage != "") {


                    content.push('<div class="col-sm-4">');

                    if (UserDetails.Language == "en") {
                        $("#PopupTitleDamage").text("Damage");
                    }
                    else {

                        $("#PopupTitleDamage").text("ダメージ");


                    }
                    content.push('<button type="button" id="QFLFeedbackSiteDamage_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSiteDamage_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '","Damage") class="btn btn-block feedback-modal-buttons">' + QFLFeedBackSite.damage + '</button>');
                    content.push('</div>');

                    buttoncount++;
                }
                //else {
                //    content.push('<div class="col-sm-4">');
                //    content.push('<button type="button" style="background-color:#de5147;color: white;" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '","' + QFLFeedBackSite.qflfeedbackworkflowid + '") class="btn btn-block feedback-modal-buttons"> N/A </button>');
                //    content.push('</div>');
                //    buttoncount++;
                //}
            }
            //content.push('</div>');
            //buttoncount++;
            Buttonid++;
            QFLFeedBackSiteLoopCount++
        });

        //content.push('<input type="submit" value="Others" id="btnOtherSite" text="' + data.qflselectedname + '"  style="margin-left:72px" class="btn btn-success"  onclick=SiteOthers1() />')


    }


    if (GateName != "Rework" && GateName != "Re-Examination" || GateName != "Re-Examination1") {
        var disable = "";
        var othersitecount = data.getothersiterowcount

        if (othersitecount.length > 0) {
            if (othersitecount.length > 1) {
                disable = "disabled";
            }
        }

        if (buttoncount > 3) {
            content.push('</div> <div class="row mt-10">');

        }
        content.push('<div class="col-sm-4">');
        //content.push('<button type="button" id="QFLFeedbackSite_' + Buttonid + '" value="' + QFLFeedBackSite.checklistitemid + '" onclick=QFLFeedbackSite("QFLFeedbackSite_' + Buttonid + '","' + QFLFeedBackSite.staticchecklistitemid + '") class="btn btn-block feedback-modal-buttons">' + "Others" + '</button>');

        if (UserDetails.Language == "en") {
            content.push('<input style="background-color:#676a6c;color: white;" type="submit" value="Others" id="btnOtherSite" text="" class="btn btn-block feedback-modal-buttons" ' + disable + ' onclick=SiteOthers1("' + SiteValues + '") />');

        }
        else {
            content.push('<input style="background-color:#676a6c;color: white;" type="submit" value="その他" id="btnOtherSite" text="" class="btn btn-block feedback-modal-buttons" ' + disable + ' onclick=SiteOthers1("' + SiteValues + '") />');
        }
    }

    content.push('</div>');
    content.push('</div>');

    var OtherDoneButton = [];
    $("#OtherSiteDoneid").empty();

    OtherDoneButton.push('<input type="submit" id="" onclick=btnOtherCancelSite("' + SiteValues + '") class="btn btn-danger trn" value="Back" />');
    OtherDoneButton.push('<input type="submit" id="btnSubmitOtherSite" onclick=btnOtherSiteSave("' + SiteValues + '") class="btn btn-success btn-cancel btn-center trn" value="Done" />');
    $("#OtherSiteDoneid").append(OtherDoneButton.join(''));

    if (QFLFeedbackSites == "Site 1") {
        $("#QFLFeedBackSite1").empty();
        $("#QFLFeedBackSite1").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 2") {
        $("#QFLFeedBackSite2").empty();
        $("#QFLFeedBackSite2").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 3") {
        $("#QFLFeedBackSite3").empty();
        $("#QFLFeedBackSite3").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 4") {
        $("#QFLFeedBackSite4").empty();
        $("#QFLFeedBackSite4").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Site 5") {
        $("#QFLFeedBackSite5").empty();
        $("#QFLFeedBackSite5").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }
    else if (QFLFeedbackSites == "Damage") {
        $("#QFLFeedBackSiteDamage").empty();
        $("#QFLFeedBackSiteDamage").append(content.join(''));
        $("#btnOtherSite").text(QFLFeedbackSitesOther);
    }



}
function GetDefectClassItems(PreviousSiteValue) {

    //var json = {
    //    "checklistitemid": QFLCheckListItemIdforskip,
    //    "damage": "Others",
    //    "vinid": VinIds,
    //    "qgateid": QgateId,
    //    "staticchecklistitemid": QFLstaticCheckListItemIdforskip
    //};
    //var Input = JSON.stringify(json);

 
   
    //    var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';

    //PostMethod(ApiFunc, Input, Token, function (data) {

    //    QFLFeeedBackDefectClassPopup(data, PreviousSiteValue);

    //});
    QFLFeeedBackDefectClassPopup("", PreviousSiteValue);

}

function QFLFeedbackDefectClassBack(PreviousSite) {
    $("#myModalDefectClass").modal('hide');
    $("#OtherDefectPopUp").modal('show');
    $("#output").empty();
    $("#myModalDefectClassImage").modal('hide');


}

function DirectUpdateCheckItemsReExam(QFLFeedBackWorkflowId, checklistitemid, CheckItems, staticchecklistitemid, VinId) {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var json = {
        "checkitemstatus": 3,
        "qflfeedbackworkflowid": QFLFeedBackWorkflowId,
        "checklistitemid": checklistitemid,
        "gatename": GateName,
        "checkitemvalue": CheckItems,
        "userid": UserDetails.UserId,
        "staticchecklistitemid": staticchecklistitemid,
        "vinnumber": VIN,
        "selecteddefectplace": "",
        "uploadedFileName":uploadedFileName,
        "Vinid": VinIds,
        "ModelName": ModelNumber

    };

    var Input = JSON.stringify(json);

    if (ClickNotOkItems == "NotOk") {
        var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemsNotOk';
    }
    else {
        var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatus';
    }

    //var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatus';
    PostMethod(ApiFunc, Input, Token, function (data) {

        //$("#myModal2").modal('hide');
        popuphidefunction();
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('New defect added to the check item');
        }
        else {
            $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
        }
        ForcetoStopReworkComplete();
        GetCheckListItems(UserDetails.PlantId, QgateId, '')

    });
}


function GetDamageDefectItemsNotOk(Site) {

  
        var json = {
            "checklistitemid": QFLCheckListItemIdforskip,
            "site1": 'N/A',
            "vinid": VinIds,
            "qgateid": QgateId,
            "staticchecklistitemid": QFLstaticCheckListItemIdforskip
        };
    



    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data.listchecklistdefectitems.length <= 0) {
            return false;
        }
      
            QFLFeeedBackSitePopup(data);
            $("#myModalSite5").modal('hide');
            $("#myModalDamage").modal('show');
            $("#myModalSite4").modal('hide');
            $("#myModalSite3").modal('hide');
            $("#myModalSite2").modal('hide');
            $("#myModal2").modal('hide')
        

    })

}

function btnbtnResetCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg)
{
    var CheckItemstatus = 0;

    var CheckstaticId = checklistitemid

    if (CheckstaticId == 0 || CheckstaticId == "" || CheckstaticId == undefined || CheckstaticId == null) {
        CheckstaticId = staticchecklistitemid;
    }

    if (checkItemMenu == "") {

        var classNameOk = $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
        var classNameNotOk = $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
        var classNameSkip = $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
        if (classNameOk == undefined) {
            classNameOk = "";
        }
        if (classNameNotOk == undefined) {
            classNameNotOk = "";
        }
        if (classNameSkip == undefined) {
            classNameSkip = "";
        }

        if (classNameOk.trim() == "btn-saveCheck" || classNameSkip.trim() == "btn-skipCheck" || classNameNotOk.trim() == "btn btn-closeCheck") {



            var ReExamid = "ReExamItemCount" + QFLFeedbackWorkflowId;
            $("#" + ReExamid).hide();
            $("#OkCheckItemCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");
            $("#ReExamItemCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");
            $("#NotOkCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");


            var className = $('#CheckItemsResets' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
            $('#CheckItemsResets' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-refresh").addClass("fas fa-spinner fa-spin");

            $('#CheckItemsOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
            //$('#CheckItemsOks' + QFLFeedbackWorkflowId).css("color", "");
            $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-saveCheck ").addClass("btn btn-save ");
            $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-saveCheck disabled").addClass("btn btn-save ");

            $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-closeCheck").addClass("btn btn-close");
            $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn btn-close disabled").addClass("btn btn-close");
            $('#CheckItemsNotOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");

            $('#CheckItemsSkips' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
            $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-skipCheck").addClass("btn btn-skip");
            $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn btn-close disabled").addClass("btn btn-skip");

            $('#CheckItemsResets' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-refresh");
            UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);

        }
        else {
            return false;
        }
    }
    else {
        var className = $('#CheckItemsResets' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
        $('#CheckItemsResets' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-refresh").addClass("fas fa-spinner fa-spin");
        UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);

    }
}

function btnbtnOkCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg) {
    var CheckstaticId = checklistitemid

    if (CheckstaticId == 0 || CheckstaticId == "" || CheckstaticId == undefined || CheckstaticId == null) {
        CheckstaticId = staticchecklistitemid;
    }



    var className = $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
   var  CheckItemstatus = 2;
    if (className.trim() == "btn-saveCheck" || className.trim() == "btn-saveCheck disabled") {

        return false;
    }
    if (checkItemMenu == "") {
        $('#CheckItemsOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-check").addClass("fas fa-spinner fa-spin");

        if (CheckListItemStatus == undefined || CheckListItemStatus == "Pending" || CheckListItemStatus == "Total") {

            $("#OkCheckItemCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text(individualitemcount);

            $('#CheckItemsOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "green");
            $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn btn-save").addClass("btn-saveCheck ");

            $('#CheckItemsSkips' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
            $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-skipCheck").addClass("btn btn-skip disabled");

            $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).prop('disabled', true);


            $('#CheckItemsNotOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
            $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-closeCheck").addClass("btn btn-close disabled");

            if (notokcheckcount == 0) {

                $('#CheckItemsNotOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
                $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-closeCheck").addClass("btn btn-close");
                $("#NotOkCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");
            }
            else {
                //$('#CheckItemsNotOks' + QFLFeedbackWorkflowId).css("color", "white");
                //$('#CheckItemsNotOk' + QFLFeedbackWorkflowId).removeClass("btn-closeCheck").addClass("btn btn-close");

            }

            $('#CheckItemsOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-check");

           
        }
      
       
        UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);

    }
    else {
        $('#CheckItemsOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-check").addClass("fas fa-spinner fa-spin");
        UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);

    }
}

function btnbtnNotOkCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg) {
    var CheckItemstatus = 3;
    var CheckstaticId = checklistitemid

    if (CheckstaticId == 0 || CheckstaticId == "" || CheckstaticId == undefined || CheckstaticId == null) {
        CheckstaticId = staticchecklistitemid;
    }

  

    CheckSiteValid = true
    if (GateName == "Re-Examination" || GateName == "Re-Examination1") {
        var classNameNotOk = $('#CheckItemsNotOk' + QFLFeedbackWorkflowId).attr('class');
    }
    else {
        var classNameNotOk = $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');

    }
    if (classNameNotOk.trim() == "btn btn-close") {
        NotOkCheck="NotOk"
        VinIds = VinId
        if (GateName == "Re-Examination"  || GateName == "Re-Examination1") {
            DirectUpdateCheckItemsReExam(QFLFeedbackWorkflowId, checklistitemid, CheckItems, staticchecklistitemid, VinId);
        }
        else {
             NotOkCheck="NotOk"
            BindingPlaceClass(checklistitemid, VinIds);
        }

    }
    else {
        NotOkCheck=""
        BindingNotOKOthers(checklistitemid, VinIds)
        //return false;
    }



    CheckItemstatus = 3;
}

function btnbtnSkipCheckItems(CheckItems, QFLFeedbackWorkflowId, checklistitemid, VinId, staticchecklistitemid, CheckListItem, individualitemcount, NotOkCount, okcheckcount, notokcheckcount, reexamflg) {

    var CheckstaticId = checklistitemid

    if (CheckstaticId == 0 || CheckstaticId == "" || CheckstaticId == undefined || CheckstaticId == null) {
        CheckstaticId = staticchecklistitemid;
    }

    var className = $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).attr('class');
    var CheckItemstatus = 4;


    if (className.trim() == "btn-skipCheck" || className.trim() == "btn-skipCheck  disabled") {

        return false;
    }

    if (checkItemMenu == "") {
        $('#CheckItemsSkips' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-share").addClass("fas fa-spinner fa-spin");


        if (CheckListItemStatus == undefined || CheckListItemStatus == "Pending" || CheckListItemStatus == "Total") {

        

            var ReExamid = "ReExamItemCount" + QFLFeedbackWorkflowId;
            $("#" + ReExamid).hide();
            $("#OkCheckItemCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");
            $("#ReExamItemCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");
            $("#NotOkCount" + QFLFeedbackWorkflowId + "_" + CheckstaticId).text("");

            $('#CheckItemsSkips' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "gray");
            $('#CheckItemsSkip' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn btn-skip").addClass("btn-skipCheck");


            $('#CheckItemsOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
            $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-saveCheck").addClass("btn btn-save");
            $('#CheckItemsOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-saveCheck").addClass("btn btn-save disabled");

            $('#CheckItemsNotOks' + QFLFeedbackWorkflowId + "_" + CheckstaticId).css("color", "white");
            $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-closeCheck").addClass("btn btn-close");
            $('#CheckItemsNotOk' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("btn-closeCheck").addClass("btn btn-close disabled");

            $('#CheckItemsSkips' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-share");

        }
       


        CheckItemstatus = 4;
        UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);

    }
    else {
        $('#CheckItemsSkips' + QFLFeedbackWorkflowId + "_" + CheckstaticId).removeClass("fas fa-share").addClass("fas fa-spinner fa-spin");
        UpdateCheckListItems(CheckItemstatus, QFLFeedbackWorkflowId, checklistitemid, CheckItems, GateName);

    }
}

var communaicateQFLFeedBackid=0;
var communaicateGateName="";
var  communaicateVinId=0;
var communaicate_CheckListItemStatusId=0
function btnReExamCommunicate(e,VinId,QFLFeedbackWorkFlowid,GateName,Partname,CheckListItemStatusId)
{
    $("#CommunicateValidation").hide();
    $(".uploaded_imageid").hide();
    var DefectValue= e.getAttribute('DefectValue');
    var DecodePartName=decodeURI(Partname);
    $("#ReworkAndReExamCommunicateTitle").text(DecodePartName+' & '+DefectValue);
    communaicateQFLFeedBackid=QFLFeedbackWorkFlowid;
    communaicateGateName=GateName;
    communaicateVinId=VinId;
    communaicate_CheckListItemStatusId=CheckListItemStatusId;
    
    GetCommunicationDetails();
}

function BindingPopupCommunicationDetails(CommunicationDetails,Data)
    {
    var content=[];

    var IsDisabledComments=Data.IsDisabledComments;

    if(IsDisabledComments==true)
    {
        $('#txtCommunication').prop('disabled', true);
        $('#btnCommunicationClick').hide();
        $('#btnCommunicationclose').val("Close");

    }
    else
    {
        $('#txtCommunication').prop('disabled', false);
        $('#btnCommunicationClick').show();
        $('#btnCommunicationclose').val("Back");

    }

    $("#BindingCommunicationDetails").empty();

    if(CommunicationDetails.length>0)
    {
        $.each(CommunicationDetails, function (i, item) {

            if(item.StartPosition.toUpperCase()=="LEFT")
            {
                

                content.push('<div class="row">')
                content.push('<div class="col-md-2">')
                if (item.FileName != "") {
                    content.push('<img onclick="btnOpenUploadedImage(' + 0 + ',' + 0 + ',\'' + item.FileName + '\')" src="' + UserDetails.SignatureSitePath + VIN   + '/' + item.FileName + '" style="width:100%; margin-top: 15px;"/>')

                }
                content.push('</div>')
                content.push('<div class="col-md-4">')
                if(item.GateName=="Re-Examination")
                {
                    content.push('<h5 class="font-weights">'+'QG Re-Examination'+'</h5>')

                }
            
                else if(item.GateName=="Re-Examination1")
                {
                    content.push('<h5 class="font-weights">'+'完成 Re-Examination'+'</h5>')

                }
                else
                {
                    content.push('<h5 class="font-weights">'+item.GateName+'</h5>')

                }

                content.push('<h5 class="font-weights">'+item.CompletedBy+'</h5>')
                content.push('<h5 class="font-weights">' + item.CompletedDate + '</h5>')
              
                content.push('</div>')
   
                content.push('<div class="col-md-6">')
                content.push('<div class="talk-bubbleleft triangle left-top">')
                content.push('<div class="talktext">')
                content.push('<p class="font-weights">'+item.Comments+'</p>')
                content.push('</div>')

                content.push('</div>')
                content.push('</div>')
                content.push('</div>')
            }


            else{
                content.push('<div class="row">')
                content.push('<div class="col-md-6">')
                content.push('<div class="talk-bubbleright triangle right-top right-Border-bubble">')
                content.push('<div class="talktext">')
                content.push('<p class="font-weights">'+item.Comments+'</p>')
                content.push('</div>')
                content.push('</div>')
                content.push('</div>')
                content.push('<div class="col-md-4">')
                

                if(item.GateName=="Re-Examination")
                {
                    content.push('<h5 class="font-weights">'+'QG Re-Examination'+'</h5>')

                }
            
                else if(item.GateName=="Re-Examination1")
                {
                    content.push('<h5 class="font-weights">'+'完成 Re-Examination'+'</h5>')

                }
                else
                {
                    content.push('<h5 class="font-weights">'+item.GateName+'</h5>')

                }
                // Peri
                content.push('<h5 class="font-weights">'+item.CompletedBy+'</h5>')
                content.push('<h5 class="font-weights">' + item.CompletedDate + '</h5>')
            
                content.push('</div>')
                content.push('<div class="col-md-2">')
                if (item.FileName != "") {
                    content.push('<img onclick="btnOpenUploadedImage(' + 0 + ',' + 0 + ',\'' + item.FileName + '\')" src="' + UserDetails.SignatureSitePath + VIN  + '/' + item.FileName + '" style="width:90%; margin-top: 15px;"/>')

                }
                content.push('</div>')
                content.push('</div>')
            }
        });
  
        $("#BindingCommunicationDetails").append(content.join(''));
    }
    
}

function btnCloseComunication()
{
    $("#ReworkAndReExamCommunicate").modal('hide');

}


function btnSubmittCommunication ()
{
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var Comments=$("#txtCommunication").val();
   
    if(Comments !="")
    {
        var json = {
            "VinId": communaicateVinId,
            "communaicateQFLFeedBackid": communaicateQFLFeedBackid,
            "Vinnumber": VIN,
            "communaicateGateName": communaicateGateName,
            "Comments": Comments,
            "userid": UserDetails.UserId,
            "CheckListItemStatusId":communaicate_CheckListItemStatusId,
            "ModelName": ModelNumber,
            "uploadedFileName": uploadedFileName

        };

        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/InsertCommunicationDetails';
        PostMethod(ApiFunc, Input, Token, function (data) {

            if(data.Result="Insert")
            {
                
                $("#btnCommunicateCommentIcon_"+communaicateQFLFeedBackid).attr("style", "color:gray")
                $("#btnCommunicateComment_"+communaicateQFLFeedBackid).removeClass("btn btn-save CommentEvent")
                $("#txtCommunication").val("");
                GetCommunicationDetails();
            }
            else{
            }

        });
    }
    else{
        $("#CommunicateValidation").show();
        
    }
    
  

}

function GetCommunicationDetails()

{
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var json = {
        "VinId": communaicateVinId,
        "communaicateQFLFeedBackid": communaicateQFLFeedBackid,
        "Vinnumber": VIN,
        "communaicateGateName": communaicateGateName,
        "userid": UserDetails.UserId,
        "CheckListItemStatusId":communaicate_CheckListItemStatusId
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCommunicationDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
              
        BindingCommunicationDetails(data);
    });
}

function BindingCommunicationDetails(data)
{
    BindingPopupCommunicationDetails(data.ListofCommunicationDetails,data)
        $("#ReworkAndReExamCommunicate").modal('show');
    

}



function BindingNotOKOthers(checklistitemid, VinId) {
  
    var json = {
        "checklistitemid": checklistitemid,
        "vinid": VinId,
        "qgateid": QgateId,
        "staticchecklistitemid": StaticCheckListItemId
       
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
    PostMethod(ApiFunc, Input, Token, function (data) {

        var Defect = data.listchecklistdefectitems.length;

        if(Defect !=0)
        {
            BindingDefectPlacePopup(data)
        }
        else{


            var json = {
                "checklistitemid": QFLCheckListItemIdforskip,
                "defectplace": QFLDefectPlaceItems,
                "vinid": VinIds,
                "qgateid": QgateId,
                "staticchecklistitemid": QFLstaticCheckListItemIdforskip
            };
            var Input = JSON.stringify(json);

            if (ClickNotOkItems == "NotOk") {
                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItemNotOk';
            }
            else {
                var ApiFunc = Api + 'QFL.svc/GetDefectCheckListItems';
            }
            PostMethod(ApiFunc, Input, Token, function (data) {
                var SiteValue = "";
                for (var i = 0; i < data.listchecklistdefectitems.length; i++) {

                    if (data.listchecklistdefectitems[i].site1 != "") {
                        SiteValue = data.listchecklistdefectitems[i].site1;
                    }

                }

                var classNameNotOk = $('#CheckItemsNotOk' + DefectStaticCheclist).attr('class');

                if(SiteValue=="")
                {
                    QFLFeeedBackSiteOtherPopup("Damage")
                }
                else{

                    QFLFeeedBackSiteOtherPopup("Site1")
                }

   
               
            });

        }
       
          
    
       
       
    })

   
}



function QFLFeeedBackSiteOtherPopup(SiteValues) {

   
        var OtherDoneButton = [];
      
        OtherDoneButton.push('<input type="submit" id="" onclick=btnDirectOtherCancelSite("' + SiteValues+'") class="btn btn-danger trn" value="Back" />');
        OtherDoneButton.push('<input type="submit" id="btnSubmitOtherSite" onclick=btnOtherSiteSave("' + SiteValues +'") class="btn btn-success btn-cancel btn-center trn" value="Done" />');

    $("#OtherSiteDoneid").empty();
    $("#OtherSiteDoneid").append(OtherDoneButton.join(''));
  
    SiteOthers1(SiteValues)
    
}

function btnDirectOtherCancelSite(SiteValues) {
    document.getElementById("txtOthervalue").value = "";
    $("#OtherDefectPopUp").modal('hide');
    if (UserDetails.Language == "en") {
        $('#btnSubmit1').val('Done');
    }
    else {
        $('#btnSubmit1').val('できた');
    }
   

    if (DefectPlacePopupdata.listchecklistdefectitems == undefined || DefectPlacePopupdata=="") {

    }
  
    else if (DefectPlacePopupdata.listchecklistdefectitems.length > 0) {
        BindingDefectPlacePopup(DefectPlacePopupdata)
        $("#myModal").modal('show');
    }

}


function btnOpenUploadedImage(qflfeedbackworkflowid,checklistitemid,NotOkUploadImage)
{
    $("#NotOkUploadImage").modal('show');

    $("#notokImageappend").empty();
   

    $('#notokImageappend').prepend('<img src="' + UserDetails.SignatureSitePath + VIN + "/" + NotOkUploadImage + '"  class="image-thumbnail" alt="img" style="width:100%; ">')
}

function ImageFileUpload()
{
    $("#FileUpload1").click();
}

var filedata = [];
var filename = [];
var files;
var filesLength;
var name;
var fsize;
var filesize=[];
var uploadedFileName="";

$(document).ready(function () {

    

if (window.File && window.FileList && window.FileReader)
{
    $("#FileUpload1").on("change", function (e) {
        uploadedFileName="";

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
            if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "svg" || ext == "JPG" || ext == "JPEG" || ext == "PNG" || ext == "SVG") {
              
                filename.push(f.name);
                filesize.push(f.size);
                   
                fileReader.onload = (function (e)
                {
                        
                    filedata.push(e.target.result);
                    FileUpload(filedata, filename, filesize)
                });
                fileReader.readAsDataURL(f);

               
            }
            else {
                $('#hTitle3').empty();
                $('#DynamicAlertModal').modal('show');
                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('File format not supported. Please upload docuemnts in img Format');
                }
                else {
                    $('#hTitle3').text('サポートされていないファイル形式です。ドキュメントをimg形式でアップロードしてください');
                }
                  

            }
        }
          
     

    });


}
});


function FileUpload(filedata, name, filesize) {
    var formData = new FormData();
    var file = filedata[0];
   
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

   // uploadedFileName=name[0];
   
    formData.append('filedata', filedata.length == 0 ? "" : file);
    formData.append('userid', UserDetails.UserId);
    formData.append('plantid', $('#drpPlant').find(':selected').val());
    formData.append('Vinnumber', VIN);
    formData.append('VinId', VinIds);
    formData.append('GateId', QgateId);
    formData.append('ModelName', ModelNumber);

   
    formData.append('filename', filedata.length == 0 ? name[0] : name[0]);
        formData.append('filesize', filedata.length == 1 ? fsize.toString() + " MB": 0 );
    

        var ApiFunc = '../Home/NotOkUploadImage/';

    FilePostMethod(ApiFunc, formData, null, function (data) {
        var En_Message = '';
        var Jp_Message = '';
        var isValid;
      
        if (data != null && data != '') {

            if (data == "error") {


                $("#DynamicAlertModal").modal('show');

                if (UserDetails.Language == "en") {
                    $('#hTitle3').text('Error');
                }
                else {
                    $('#hTitle3').text('エラー');
                }
                return false;
            }



            uploadedFileName = data;
            $('.uploaded_imageid').attr('src', UserDetails.SignatureSitePath + '/' + VIN + '/'  + '/' + data);
            $(".uploaded_imageid").show();


        }


    });
   
}

function OpenBlankOtherCheckItems() {
    BlankSepc = "";
    $("#blankcheckitem").show();
    $("#bindingemptycheckitems").hide();
    $("#BlankOtherCheckItemsid").hide();
}

function CheckListItemDetailsforEmail() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var json = {
        "userid": UserDetails.UserId
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetEmailNotificationCheckListItems';
    PostMethod(ApiFunc, Input, Token, function (data) {
        if (data != null && data != undefined) {

           // $('.dashboard-table').dataTable().fnDestroy();
            BindingEmailNotificationdetails(data)
            $("#EmailNotifypopup").modal('show');


          //  var table = $('.dashboard-table').DataTable({

          //      // "aaSorting": [[0, "desc"]]
          //  });
          ////  table.order([0, 'asc']).draw();
        }
    })
}

function BindingEmailNotificationdetails(data) {
    $('#tblQFLFeedbackEmailNotify tbody').empty();
    var content = [];
    var CheckListItems = data.listofchecklistitems
    $.each(CheckListItems, function (key, value) {


        var DefectPlace = data.GetDefectPlaceCheckList.filter(function (x) { return x.qflfeedbackworkflowid == value.qflfeedbackworkflowid });
        var defectivePlace = "";
        if (DefectPlace.length > 0) {

            if (DefectPlace[0].defectiveplace.trim() != "") {
                defectivePlace = DefectPlace[0].defectiveplace

            }
        }

        var DefectForRework = data.DefectCheckListForRework.filter(function (x) { return x.qflfeedbackworkflowid == value.qflfeedbackworkflowid });
        var Filterdefect = "";
        if (DefectForRework.length > 0) {

            if (DefectForRework[0].site1.trim() != "") {
                Filterdefect = DefectForRework[0].site1

            }
            if (DefectForRework[0].site2.trim() != "") {

                if (Filterdefect != "") {
                    Filterdefect = Filterdefect + ', ' + DefectForRework[0].site2

                }
                else {
                    Filterdefect = DefectForRework[0].site2

                }

            }
            if (DefectForRework[0].site3.trim() != "") {

                if (Filterdefect != "") {
                    Filterdefect = Filterdefect + ', ' + DefectForRework[0].site3


                }
                else {
                    Filterdefect = DefectForRework[0].site3

                }

            }
            if (DefectForRework[0].site4.trim() != "") {
                if (Filterdefect != "") {
                    Filterdefect = Filterdefect + ', ' + DefectForRework[0].site4


                }
                else {
                    Filterdefect = DefectForRework[0].site4

                }

            }
            if (DefectForRework[0].site5.trim() != "") {
                if (Filterdefect != "") {
                    Filterdefect = Filterdefect + ', ' + DefectForRework[0].site5


                }
                else {
                    Filterdefect = DefectForRework[0].site5

                }

            }
            if (DefectForRework[0].damage.trim() != "") {

                if (Filterdefect != "") {
                    Filterdefect = Filterdefect + ', ' + DefectForRework[0].damage


                }
                else {
                    Filterdefect = DefectForRework[0].damage

                }


            }


        }
        if (Filterdefect != "" && defectivePlace != "") {
            Filterdefect = "," + Filterdefect
        }
        content.push('<tr>');
        content.push('<td  class="">' + value.Vinnumber + '</td>');
        content.push('<td  class="">' + value.GateName + '</td>');
        content.push('<td  class="">' + value.inspectionitem + '</td>');

        if (value.Site1Image == "") {
            content.push('<td  class="">' + defectivePlace + Filterdefect + '</td>');
        }
        else {
            if (defectivePlace != "" || Filterdefect != "") {
                content.push('<td  class="">' + defectivePlace + Filterdefect + '</span>' + " , " + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + value.Vinnumber + '/' + ModelNumber + '/' + value.Site1Image + '" /> </td>');

            }
            else {
                content.push('<td  class="">' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + value.Vinnumber + '/' + ModelNumber + '/' + value.Site1Image + '" /> </td>');

            }

        }
        content.push('<td  class="">' + value.ReworkModifiedBy + '</td>');
        content.push('<td  class="">' + value.ReworkModifiedDate + '</td>');
       
        content.push('</tr>');
    });
   // console.log(content.join(''));
    $('#BindingCheckListItemsEmailNotify').append(content.join(''));


}

function GetQGCheckItemImage() {

    $("#BindingCheckListItems").empty();
    $("#BindingSealGate").empty();
    $("#checklistitemstatusid").hide();
    $("#maingateheader").hide();
    $("#Reworkgateheader").hide();
    $("#ReExaminationgateheader").hide();
    $("#sealgateheader").hide();

    hideloader();
    BindingLineAPI(UserDetails.PlantId)

    BindindCheckItemImage();


}
var CheckItemImageId = 0;
function BindindCheckItemImage() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var json = {
        "PlantId": UserDetails.PlantId,
        "ModelName": ModelNumber,
        "QgateId": QgateId,
        "Vinnumber": VIN,
        "userid": UserDetails.UserId,
        "Vinid": 0,
        "CheckItemImageId": 0,
        "ImageFileName": "",


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCheckListItemImage';
    PostMethod(ApiFunc, Input, Token, function (data) {

       


        var IsCompleted = data.iscompleted;
        if (ReworkidforPainting == undefined) {
            ReworkidforPainting = 0;
        }

        if (data.isreworkcompleted) {

            document.getElementById("Qgateid_" + ReworkidforPainting).style.backgroundColor = "darkgreen";

        }
        else {
            document.getElementById("Qgateid_" + ReworkidforPainting).style.backgroundColor = "";

        }

        if (ReExaminationgateidforPainting == undefined) {
            ReExaminationgateidforPainting = 0;
        }

        if (ReExaminationgateidforPainting != 0) {

            if (data.isreexaminationcompleted) {
                document.getElementById("Qgateid_" + ReExaminationgateidforPainting).style.backgroundColor = "darkgreen";

            }
            else {
                document.getElementById("Qgateid_" + ReExaminationgateidforPainting).style.backgroundColor = "";

            }
        }


        if (IsCompleted) {
            CompletedDetails(data);
        }
       
        var EraseImageDisabled = document.getElementById('EraseImageid');

        if (IsCompleted == true) {
            $("#Completedbtn1ForPainting").show();
            $("#CompletedbtnForPainting").hide();
            EraseImageDisabled.onclick = null;

            document.getElementById("Qgateid_" + QgateId).style.backgroundColor = "darkgreen";
            
           // $("#EraseImageid").hide();
            //Periyan
          
        
        }
        else {
            EraseImageDisabled.onclick = ClickErase;

            $("#CompletedbtnForPainting").show();
            $("#Completedbtn1ForPainting").hide();
            document.getElementById("Qgateid_" + QgateId).style.backgroundColor = "";
            $('#VINCompletionDetailsForPainting').hide();
           //$('#EraseImageid').on('click', true);
            $("#EraseImageid").show();

        }

        BindingImagedata(data, IsCompleted);
        
    })
}



function BindingImagedata(data, IsCompleted) {
    var ListOfCheckListItemImage = data.ListOfCheckListItemImage;

    var Result = data.result;

    if (Result == "No CheckItems") {
        $("#appendCheckItemImage").empty();

        $('#appendCheckItemImage').append('<span class="" style="padding-left: 594px;font-weight: bold;">No Image found </span>');
        $("#EraseImageid").hide();
        $("#CompletedbtnForPainting").hide();

        return false;
    }

    var images = "bus.png";
    images = images.replace("NaN", "")
    var content = [];
    if (ListOfCheckListItemImage.length > 0 && data != null) {


        VinIds = ListOfCheckListItemImage[0].Vinid;
        var ImageFileName = ListOfCheckListItemImage[0].ImageFileName;
        var UploadedFileName = ListOfCheckListItemImage[0].UploadedFileName;
        CheckItemImageId = ListOfCheckListItemImage[0].CheckItemImageId;
        dynamiccount = ListOfCheckListItemImage[0].DynamicCount;
        var selectedline = $("#selectedline").text();

        if (IsCompleted == true) {
           // content.push('<img   src="' + UserDetails.PaintingImagePath + '/PaintUploadedImage/' + selectedline+'/' + UploadedFileName + '" class="busimage" style="margin-left:20px;width:100%" />')
            content.push('<img  src="' + UserDetails.PaintingImagePath + '/PaintUploadedImage/' + selectedline + '/' + UploadedFileName + '" class="busimage" style="margin-left:20px;width:100%;height:1000px" />')
        }
        else {
            content.push('<img id="busimages"  onclick="CheckItemImageClick()" src="' + UserDetails.PaintingImagePath + '/PaintUploadedImage/' + selectedline + '/' + UploadedFileName + '" class="busimage" style="margin-left:20px;width:100%;height:1000px" />')

        }
            BindintPaintingdetails(data);
        
       

    }

    else {
        content.push('<img  onclick="CheckItemImageClick()" src="' + UserDetails.PaintingImagePath + '/' + images + '" class="busimage" style="margin-left:20px;height:1000px"" />')

    }

    $("#appendCheckItemImage").empty();

    $("#appendCheckItemImage").append(content.join(''));
}

var dynamiccount = 0;
var margintop = 0;
var marginleft = 0;
function CheckItemImageClick() {

    $(".uploaded_imageid").hide();

    $("#DefectClassValidationImage").empty('');
    $("#DefectClassValidationImage").hide();


    uploadedFileName = "";
    var top = $("#mCSB_1_container").css("top");
    var top1 = top.replace("px", "");
    var top1 = top1.replace("-", "");
    var Imageid = 'follows_' + GLBOrderNo;
    var clonedCount = 'clonedCount_' + GLBOrderNo;
    var cloned = 'cloned_' + GLBOrderNo;
    //$("#" + cloned).append('<span style="display:none" id="clonedCount_' + GLBOrderNo + '" class="clonenumber">' + dynamiccount+'</span>')

    var Values = $("#" + Imageid).prop('src');
    if (Values == undefined) {
        return false;
    }

   
    $("#" + Imageid).show();
    var dataDiv = $(".busimage").offset();
    
     
    var Percent = event.pageX  - dataDiv.left;
    var percentYImg = Percent * 100 / $(".busimage").width();

   
   

    //alert("X Coordinate: " + x + " Y Coordinate: " + y);
    $('#' + Imageid).css({ 'top': parseInt(event.clientY) + parseInt(top1) - 387, 'left': percentYImg+'%' });

    margintop = parseInt(event.clientY) + parseInt(top1) - 387
    marginleft = percentYImg; 

    //$('#' + clonedCount).css({ 'margin-top': parseInt(event.clientY) + parseInt(top1) - 387 - 30, 'margin-left': event.clientX - 27 });
    //$('#' + clonedCount).show();

    if (GLBOrderNo == 12) {
        if (UserDetails.Language == "en") {
            $("#OtherDefectPopUpTitle").text("Damage");
        }
        else {

            $("#OtherDefectPopUpTitle").text("ダメージ");
        }

        EnterDefectValues();
    }
    else {
        QFLFeeedBackDefectClassPopupImage();
        $("#myModalDefectClassImage").modal("show");
    }

  
}



//$(document).ready(function () {
   
//    $("body").on("click", ".busimage", function (e) {
//        e.preventDefault();
//        var offset = $(this).offset();
//        let X = (e.clientX - offset.left);
//        let Y = (e.clientY - offset.top);

//        $(".uploaded_imageid").hide();
//        uploadedFileName = "";
//        var top = $("#mCSB_1_container").css("top");
//        var top1 = top.replace("px", "");
//        var top1 = top1.replace("-", "");
//        var Imageid = 'follows_' + GLBOrderNo;
//        var clonedCount = 'clonedCount_' + GLBOrderNo;
//        var cloned = 'cloned_' + GLBOrderNo;

//        var Values = $("#" + Imageid).prop('src');
//        if (Values == undefined) {
//            return false;
//        }
  

//        $("#" + Imageid).show();
//        var dataDiv = $(".busimage").offset();

     
//        //$('#' + Imageid).css({ 'top': parseInt(Y) + parseInt(top1), 'left': X  });
//        $('#' + Imageid).css({ 'top': parseInt(Y) + parseInt(top1)-387, 'left': X+8,'position':'absolute' });

//        //margintop = parseInt(event.clientY) + parseInt(top1) - 387
//        //marginleft = percentYImg;

     
//        if (GLBOrderNo == 12) {
//            if (UserDetails.Language == "en") {
//                $("#OtherDefectPopUpTitle").text("Damage");
//            }
//            else {

//                $("#OtherDefectPopUpTitle").text("ダメージ");
//            }

//            EnterDefectValues();
//        }
//        else {
//            QFLFeeedBackDefectClassPopupImage();
//            $("#myModalDefectClassImage").modal("show");
//        }







//    });
       
   
//});

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


function BindingLineTables(data)
{
    $("#Checkitemtables").hide();
    $("#PaintingMastertable").show();

   
        var content = [];
    var Cloned = [];
    var GetPaintingMasterDetails = "";

       

        GetPaintingMasterDetails = $.grep(data.GetPaintingMasterDetailsList, function (element, index) {
            return element.LineId == GBLLineId;
        });


        $.each(GetPaintingMasterDetails, function (i, item) {





            if (item.OrderNo == 1) {
                content.push('<tr class="tblheadtext">');
            }


            content.push('<th class="pointer" style="text-align: center; width: 15%;" onclick=OnLineClickEvent(' + item.OrderNo + ',' + item.PaintingMasterId + ',' + item.LineId + ',"' + encodeURI(item.PaintingValues) + '","' + encodeURI(item.PaintingFileName) + '")>');
            content.push('<span >' + item.PaintingValues + '</span>');
           
            content.push('<img  onclick=OnLineClickEvent(' + item.OrderNo + ',' + item.PaintingMasterId + ',' + item.LineId + ',"' + encodeURI(item.PaintingValues) + '","' + encodeURI(item.PaintingFileName) + '") src="' + UserDetails.PaintingImagePath + '/' + item.PaintingFileName + '" id="follow_' + item.OrderNo +'" class="PaintImage2 pointer" />');
            Cloned.push('<span id="cloned_' + item.OrderNo + '" class="pointer"></span>');
           

            content.push('</th>')

            if (item.OrderNo == 6) {
                content.push('</tr>');

            }

        });

        content.push('</thead>')
        content.push('</table>')

    $("#PaintingMastertable").empty();
        $("#PaintingMastertable").append(content.join(''));
    $("#cloned").append(Cloned.join(''));
}
var GLBOrderNo = 0;
var uniqueValues = 0;
var PaintingFileNameGLB = "";
function OnLineClickEvent(OrderNo, PaintingMasterId, LineId, PaintingValues, PaintingFileName)
{
    EraseClick = "";
    GLBPointX = "";
    $("#EraseImageid").attr("src", UserDetails.PaintingImagePath + "EraseImage.png");

    PaintingFileNameGLB = decodeURI(PaintingFileName);

    GLBOrderNo = OrderNo;
    var Imageid = 'follow_' + OrderNo;
    var Imageids = 'follows_' + OrderNo;
    var cloned = 'cloned_' + OrderNo;

    //for (var i = 1; i <= 12; i++) {
    //    $('#cloned_' +i).empty();
    //}

  //  $('#' + cloned).empty();
   // $("#cloned").empty();

    
   
    $('#' + Imageid)
        // clone(true,true) means -> .clone( [withDataAndEvents ] [, deepWithDataAndEvents ] )
        .clone(true, true)
        .attr('id', Imageids)
        .attr('class',"PaintImage hidepaintimage")
        .appendTo("#" + cloned);
   // $("#" + Imageids).prop("onclick", null).off("click");

   // $("#" + Imageids).attr('onClick', 'stopMoving(' +OrderNo+')');

    //$("#" + Imageids).hide();
    $(".hidepaintimage").hide();
}

var ScreenshotImageFileName;

        // Define the function 
        // to screenshot the div
function takeshot() {
    $('#output').html($('#cloned').html());

    var div =
        document.getElementById('screenshot');
    var ttDiv = document.getElementById('output');
    // Use the html2canvas
    // function to take a screenshot
   //  and append it
   //  to the output div
    html2canvas(div).then(
        function (canvas) {


            //.getElementById('output')

            canvas.id = 'CanvasImage';
            // append canvas to ttDiv
            ttDiv.appendChild(canvas);

           // $("#takeScreenshot").click();
            UpdatescreenshotImage();

        });

  //  UpdatescreenshotImage();



}
       

function EnterDefectValues() {
    OtherSignatureValidation = document.getElementById('newSignature1');


    var context = OtherSignatureValidation.getContext("2d");

    clearCanvas(context, OtherSignatureValidation);

    OtherSignatureValidation = OtherSignatureValidation.toDataURL("image/png")

    selectionmode = "txt";
    var OtherDoneButton = [];
    $("#OtherSiteDoneid").empty();

    OtherDoneButton.push('<input type="submit" id="" onclick=btnOtherCancelSite() class="btn btn-danger trn" value="Back" />');
    OtherDoneButton.push('<input type="submit" id="btnSubmitOtherSite" onclick=btnOtherSiteSaveImage() class="btn btn-success btn-cancel btn-center trn" value="Done" />');
    $("#OtherSiteDoneid").append(OtherDoneButton.join(''));

    QFLFeedbackSitesOther = "";
    $("#OtherDefectPopUp").modal('show');
    $("#SignatureHide").hide();
    $("#txtOthervalue").show();
    $("#txtOthervalue").val("");
    $("#btnOtherClearid").hide();
    $("#someSwitchOptionPrimary").prop('checked', false);



    var canvas = document.getElementById("newSignature1");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    

}

//function btnOtherSiteSaveImage() {
//    QFLFeeedBackDefectClassPopup("", "")
//    $("#myModalDefectClassImage").modal('show');

//}

function btnOtherSiteSaveImage() {
    //$("#EraseImageid").hide();

    //takeshot();
    //$("#EraseImageid").show();

    OtherSiteSaveFilename = "";
    $("#OtherDefectValidation").text("");
    $("#OtherDefectValidation").hide();
    $("#OtherDefectValidationDamage").hide();
    $("#OtherDefectValidationDamage").text("");



    btnOtherClearDamage();
    QFLFeeedBackDefectClassPopupImage();

    
        if (selectionmode == "txt") {
            SelectionModetxtImage();
            $("#ModetxtDamage").text("Text Mode");
        }


        else if (OtherMode == true) {
            $("#ModetxtDamage").text("Hand Written Mode");
            var canvas1
            $("#someSwitchOptionPrimaryDamage").prop('checked', true);
            PreviousselectedValue = QFLFeedbackSitesOther;

            canvas1 = document.getElementById("newSignature1");

            var dataURL1 = canvas1.toDataURL("image/png");
            var image1 = dataURL1.replace('data:image/png;base64,', '');
            var blank;
            var Imglenght = image1.length;


            if (OtherSignatureValidation == dataURL1) {


                $("#OtherDefectValidation").show();
                $("#OtherDefectValidation").text("Please Fill the " + QFLFeedbackSitesOther + " value");
                return false;

                blank = true;
            }

            blank = false;


            $("#Signaturevalidation").removeAttr("color");

            if (blank == false) {
                showloader();
                HandWrittenText = "";
                HandWrittenTextDamage = "";
                var canvas = "";


                canvas = document.getElementById("newSignature1");

                // save canvas image as data url (png format by default)


                var dataURL = canvas.toDataURL("image/png");
                var image = dataURL.replace('data:image/png;base64,', '');

                var json = {
                    "imagedata": image,
                    "Vinnumber": VIN,
                    "VinId": VinIds,
                    "Gateid": QgateId,
                    "ModelName": ModelNumber
                };
                var Input = JSON.stringify(json);

                var ApiFunc = '../Home/SignatureSiteSave/';
                JsonPostMethod(ApiFunc, Input, '', function (data) {

                    if (data != null && data != '') {
                        OtherSiteSaveFilename = data;
                        txtDamageImage = "";

                        $("#OtherDefectPopUp").modal("hide");

                        $("#myModalDefectClassImage").modal("show");
                        const canvas = document.getElementById("newSignature1");
                        var context = canvas.getContext("2d");
                        clearCanvas(context, canvas);

                      
                    }
                });


            }

        }


        else {
            SelectionModetxtImage();
            selectionmode = "txt";
            $("#ModetxtDamage").text("Text Mode");
        }

    
}

var txtDamageImage = "";
var txtDefectImage = "";
function SelectionModetxtImage() {
    $("#someSwitchOptionPrimaryDamage").prop('checked', false);
    var Txtvalidation = document.getElementById("txtOthervalue").value;
    var TxtvalidationDamage = document.getElementById("txtOthervalueDamage").value;


    if (Txtvalidation == "") {
        $("#OtherDefectValidation").show();
        $("#OtherDefectValidation").text("Please Fill the " + QFLFeedbackSitesOther + " value");
        return false;
    }

    txtDamageImage = Txtvalidation;

    $("#OtherDefectPopUp").modal("hide");

    $("#myModalDefectClassImage").modal("show");



    document.getElementById("txtOthervalue").value = "";
}



function QFLFeeedBackDefectClassPopupImage() {
    if (UserDetails.Language == "en") {
        $('#btnSubmit2').val('Done');
    }
    else {
        $('#btnSubmit2').val('できた');
    }

    $("#myModal3").modal('show');

    $("#DefectClassValidation").text("");
    $("#QFLFeedBackDefectClassImage").empty();
    $("#QFLFeedBackDefectClass").empty();

    $("#defectclassbackbtnidImage").empty();
    QFLDefectPlaceItems = "";
    QFLCheckListItemId = "";
    QFLFeedBackWorkflowId = "";
    StaticCheckListItemId = "";
    defectclassitem = "";

    var content = [];
    var contentBack = [];
    //var QFLFeedBackDefectclass = data.listchecklistdefectitems

    var buttoncount = 1;
    var Buttonid = 1;
    var SelectedValue = "";



    content.push('<div><span><label class="f-16">' + SelectedValue + '</label></span> </div>');

    //content.push('<h2 class="text-center" id="popupDefectclass">Defect Class</h2>');
    content.push('<div class="row">');
    content.push('<div class="col-sm-6">');
    content.push('<button type="button" id="QFLFeedbackDefectClass_' + 1 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","A",1) class="btn btn-block feedback-modal-buttons2">A </button>');
    content.push('</div>');

    content.push('<div class="col-sm-6">');
    content.push('<button type="button" id="QFLFeedbackDefectClass_' + 2 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","B",2) class="btn btn-block feedback-modal-buttons2">B</button>');

    content.push('</div>');

    content.push('</div>');


    content.push('<div class="row mt-10">');
    content.push('<div class="col-sm-6">');
    content.push('<button type="button" id="QFLFeedbackDefectClass_' + 3 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","C",3) class="btn btn-block feedback-modal-buttons2">C</button>');
    content.push('</div>');

    content.push('<div class="col-sm-6">');

    content.push('<button type="button" id="QFLFeedbackDefectClass_' + 4 + '" value="" onclick=QFLFeedbackDefectClass("QFLFeedbackDefectClass_","D",4) class="btn btn-block feedback-modal-buttons2">D</button>');
    content.push('</div>');
    content.push('</div>');


    //content.push('</div>');

    if (GLBOrderNo == 12) {
        contentBack.push('<input type="submit" value="Back" onclick=QFLFeedbackDefectClassBack("") class="btn btn-danger trn" />');

    }
    else {
        contentBack.push('<input type="submit" value="Back" onclick=QFLFeedbackDefectClassBackPaint("") class="btn btn-danger trn" />');

    }

    $("#QFLFeedBackDefectClassImage").append(content.join(''));
    $("#defectclassbackbtnidImage").append(contentBack.join(''));



}

function QFLFeedbackDefectClassBackPaint(PreviousSite) {
    $("#myModalDefectClass").modal('hide');
    $("#myModalDefectClassImage").modal('hide');
    $("#OtherDefectPopUp").modal('hide');
    GLBPointX = "";
    $("#output").empty();


}


function btnSavePaintingImages() {
    ScreenshotImageFileName = "";
    //var canvas1 = document.getElementById("CanvasImage");
    //var context = canvas1.getContext("2d");
    // clearCanvas(context, canvas1);

    //var dataURL1 = canvas1.toDataURL("image/png");
    //var image = dataURL1.replace('data:image/png;base64,', '');

    //var json = {
    //    "imagedata": image,
    //    "Vinnumber": VIN,
    //    "VinId": VinIds,
    //    "Gateid": QgateId

    //};
    //var Input = JSON.stringify(json);

    //var ApiFunc = '../Home/SignatureSaveBusImage/';
    //JsonPostMethod(ApiFunc, Input, '', function (data) {
      
  
   
    //        var json = {
    //            "ImageFileName": data,
    //            "userid": UserDetails.UserId,
    //            "Vinnumber": VIN,
    //            "QgateId": QgateId,
    //            "Vinid": VinIds,
    //            "LineId": GBLLineId,
    //            "PlantId": UserDetails.PlantId,
    //            "DamageValue": txtDamageImage,
    //            "DefectClass": defectclassitem,
    //            "DamageImage": OtherSiteSaveFilename,
    //            "CheckItemImageId": CheckItemImageId,
    //            "MarginTop": margintop,
    //            "MarginLeft": marginleft,
    //            "PaintingOrderNo": GLBOrderNo,
    //            "PaintingImage": PaintingFileNameGLB
    //        }

    //        var Input = JSON.stringify(json);
    //        var ApiFunc = Api + 'QFL.svc/InsertUpdateCheckListItemImages';
    //        PostMethod(ApiFunc, Input, Token, function (data) {

              
    //            $("#myModalDefectClassImage").modal('hide');
    //            $("#cloned_" + GLBOrderNo).empty();
             

    //            var canvas1 = document.getElementById("CanvasImage");

    //            var context = canvas1.getContext("2d");

    //            clearCanvas(context, canvas1);
                
    //            BindindCheckItemImage();
    //          $("#output").empty();

    //        })
    //});



    $("#DefectClassValidationImage").text("");
    if (defectclassitem == "") {
        $("#DefectClassValidationImage").show();
        if (UserDetails.Language == "en") {
            $("#DefectClassValidationImage").text("Please click the Button");
        }
        else {
            $("#DefectClassValidationImage").text("ボタンをクリックしてください");
        }

        return false;
    }

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var floatMarginLeft = marginleft.toFixed(2)
    var json = {
        "ImageFileName": "",
        "userid": UserDetails.UserId,
        "Vinnumber": VIN,
        "QgateId": QgateId,
        "Vinid": VinIds,
        "LineId": GBLLineId,
        "PlantId": UserDetails.PlantId,
        "DamageValue": txtDamageImage,
        "DefectClass": defectclassitem,
        "DamageImage": OtherSiteSaveFilename,
        "CheckItemImageId": CheckItemImageId,
        "MarginTop": margintop,
        "MarginLeft": floatMarginLeft ,
        "PaintingOrderNo": GLBOrderNo,
        "PaintingImage": PaintingFileNameGLB,
        "NotOkUploadImageFORPaint": uploadedFileName,
        "PointX": GLBPointX,
        "ModelName": ModelNumber
    }

    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/InsertUpdateCheckListItemImages';
    PostMethod(ApiFunc, Input, Token, function (data) {




        $("#myModalDefectClassImage").modal('hide');
        $("#cloned_" + GLBOrderNo).empty();
        GLBPointX = "";
        glbtakeshot = 1;
        BindindCheckItemImage();
       
     

    });



}
var glbtakeshot = 0;
function UpdatescreenshotImage() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var canvas1 = document.getElementById("CanvasImage");

    if (canvas1 == null) {

        return false;

    }
    var context = canvas1.getContext("2d");

    var dataURL1 = canvas1.toDataURL("image/png");
    var image = dataURL1.replace('data:image/png;base64,', '');

    var json = {
        "imagedata": image,
        "Vinnumber": VIN,
        "VinId": VinIds,
        "Gateid": QgateId,
        "ModelName": ModelNumber

    };
    var Input = JSON.stringify(json);

    var ApiFunc = '../Home/SignatureSaveBusImage/';
    JsonPostMethodNoLoader(ApiFunc, Input, '', function (data) {

        var json = {
            "ImageFileName": data,
            "userid": UserDetails.UserId,
            "CheckItemImageId": CheckItemImageId
        };

        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/UpdateImageFileName';
        PostMethodForUpdate(ApiFunc, Input, Token, function (data) {

            var canvas1 = document.getElementById("CanvasImage");
            var context = canvas1.getContext("2d");

            clearCanvas(context, canvas1);
            $("#output").empty();

        });

    });
}

function btntopmyModalDefectClass() {
    $("#output").empty();
}

function BindintPaintingdetails(data) {
    var PaintingCheckItemDefect = data.PaintingCheckItemDefect;
  for (var i = 1; i <= 12; i++) {
        $('#cloned_' +i).empty();
    }


    var content = [];
    if (PaintingCheckItemDefect.length > 0 && data != null) {

        $.each(PaintingCheckItemDefect, function (i, item) {
           // var MarginTopCount = item.MarginTop - 20
            var MarginTopCount = item.MarginTop 
            var MarginLeftcount = item.MarginLeft
            var ii = i + 1;
            var cloned = 'cloned_' + item.PaintingOrderNo;
            $("#" + cloned).append('<span onclick="OnEditPaintingevent(' + item.CheckItemDefectId + ')" style="display:block; top: ' + MarginTopCount + 'px; left: ' + MarginLeftcount + '%;color:' + item.PaintingColor+'" id="clonedCount_' + i + '" class="clonenumber ">' + ii + '</span>')

            $("#" + cloned).append('<img onclick="OnEditPaintingevent(' + item.CheckItemDefectId + ')" src="' + UserDetails.PaintingImagePath + '/' + item.PaintingImage + '" id="Editfollows_' + item.CheckItemDefectId + '" class="PaintImage pointer" style="display: block; top: ' + item.MarginTop + 'px; left: ' + item.MarginLeft + '%;">')
            $("#" + cloned).append('<span onclick="OnEditPaintingevent(' + item.CheckItemDefectId + ')" style="display:block; top: ' + MarginTopCount + 'px; left: ' + MarginLeftcount+ '%;color:red;margin-left:30px" id="clonedCount_' + i + '" class="clonenumber ">' + item.PointX + '</span>')


        });

        if (glbtakeshot == 1) {

        takeshot();

           // UpdatescreenshotImage();
            //setTimeout(function () {

            //    //UpdatescreenshotImage();


            //}, 1000);
            
        }
    }


   

}

var EraseClick = "";

function ClickErase() {
    $("#EraseImageid").attr("src", UserDetails.PaintingImagePath+"CopyEraseImage.png");
  
    EraseClick = "Erase";
}
var GLBCheckItemDefectId = 0;

function OnEditPaintingevent(CheckItemDefectId) {
    GLBCheckItemDefectId = CheckItemDefectId;

    if (EraseClick == "Erase") {
        $("#DeleteImageConfirmationpopup").modal('show');
        if (UserDetails.Language == "en") {
            $('#DeleteImageConfirmationMessage').text('Are you sure you want to delete it?');
        }
        else {
            $('#DeleteImageConfirmationMessage').text('削除してもよろしいですか？');
        }

        EraseClick = "";

    }

}

function BindindCheckItemImageAfterDelete() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var json = {
        "PlantId": UserDetails.PlantId,
        "ModelName": ModelNumber,
        "QgateId": QgateId,
        "Vinnumber": VIN,
        "userid": UserDetails.UserId,
        "Vinid": 0,
        "CheckItemImageId": 0,
        "ImageFileName": "",

    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCheckListItemImage';
    PostMethod(ApiFunc, Input, Token, function (data) {

        BindintPaintingdetails(data);

    })
}

function btnDeleteImageclick() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    $("#DeleteImageConfirmationpopup").modal('hide');
    glbtakeshot = 1;

    var json = {
        "CheckItemDefectId": GLBCheckItemDefectId,
        "userid": UserDetails.UserId,
        "ModelName": ModelNumber,
       "Vinnumber": VIN,
    }

    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/DeleteCheckListItemImages';
    PostMethod(ApiFunc, Input, Token, function (data) {

        if (data.result == "Deleted") {
            $("#EraseImageid").attr("src", UserDetails.PaintingImagePath + "EraseImage.png");

            BindindCheckItemImage();
           
        }
        else {

            $('#DynamicAlertModal').modal('show');
            if (UserDetails.Language == "en") {
                $('#hTitle3').text('Failed to delete');
            }
            else {
                $('#hTitle3').text('削除に失敗しました');
            }
        }

    })
}

function btnDeleteImageclickCancel() {
    EraseClick = "";
    $("#EraseImageid").attr("src", UserDetails.PaintingImagePath + "EraseImage.png");

    $("#DeleteImageConfirmationpopup").modal('hide');

}


function GetPaintingMasterDefectItems() {
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }



    var json = {
        "PlantId": UserDetails.PlantId,
        "ModelName": ModelNumber,
        "QgateId": QgateId,
        "Vinnumber": VIN,
        "userid": UserDetails.UserId,
        "Vinid": 0,
        "CheckItemImageId": 0,
        "ImageFileName": "",


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCheckListItemImagesForRework';
    PostMethod(ApiFunc, Input, Token, function (data) {


        $("#sealgateheader").hide();
        $("#maingateheader").hide();
        $("#Reworkgateheader").hide();
        $("#ReExaminationgateheader").hide();
        $("#tblQFLFeedbackReExamination_wrapper").hide();
        $("#tblQFLFeedbackRework_info").hide();
        $("#tblQFLFeedback_wrapper").hide();
        $("#tblQFLFeedbackReworkPainting_wrapper").show();
        $("#tblQFLFeedbackReworkPainting").hide();
        $("#SealGateRemovefoot").hide();

        $("#Checkitemtables").show();


        $('#tblQFLFeedbackReworkPainting').css('dispaly', '');
        $('#tblQFLFeedbackReworkPainting').dataTable().fnClearTable();
        $('#tblQFLFeedbackReExamPainting').css('dispaly', '');
        $('#tblQFLFeedbackReExamPainting').dataTable().fnClearTable();


        if (GateName == "塗装 Rework") {
            $("#tblQFLFeedbackReworkPainting").show();
            $("#tblQFLFeedbackReExamPainting_wrapper").hide();
            $("#PaintingReExamgateheader").hide();
            $("#tblQFLFeedbackReExamPainting").hide();
        }
        else if (GateName == "塗装 Re-Examination") {
            $("#tblQFLFeedbackReExamPainting").show();
            $("#tblQFLFeedbackReworkPainting_wrapper").hide();
            $("#PaintingReworkgateheader").hide();
            $("#tblQFLFeedbackReExamPainting_wrapper").show();


        }

       // BindindCheckItemImageForRework();
        // BindingCloned();
       // BindindCheckItemImageAfterDeleteForRework()
        
        $("#appendCheckItemReworkImages").empty();

        var IsCompleted = data.iscompleted;

        if (GateName == "塗装 Rework") {

            var SpOkCount = data.PaintingCheckItemDefect.filter(function (x) { return x.CheckListItemStatusId == 5 || x.CheckListItemStatusId == 7 ; });
            var TotalCnt = data.PaintingCheckItemDefect.length;
            if (SpOkCount.length == TotalCnt) {
                $('#CompletedbtnForPainting').prop('disabled', false);

            }
            else {
                $('#CompletedbtnForPainting').prop('disabled', true);

            }



            if (data.isreworkcompleted) {

                document.getElementById("Qgateid_" + ReworkidforPainting).style.backgroundColor = "darkgreen";
                $("#Completedbtn1ForPainting").show();
                $("#CompletedbtnForPainting").hide();
                CompletedDetails();
                disabled = "disabled";
            }
            else {
                document.getElementById("Qgateid_" + ReworkidforPainting).style.backgroundColor = "";
                $("#CompletedbtnForPainting").show();
                $("#Completedbtn1ForPainting").hide();
                disabled = "";
            }
        }


        else if (GateName == "塗装 Re-Examination") {

            var SpOkCount = data.PaintingCheckItemDefect.filter(function (x) { return  x.CheckListItemStatusId == 7; });
            var TotalCnt = data.PaintingCheckItemDefect.length;
            
            if (SpOkCount.length == TotalCnt && data.IsEnabledReExamination==true) {
                $('#CompletedbtnForPainting').prop('disabled', false);

            }
            else {
                $('#CompletedbtnForPainting').prop('disabled', true);

            }
            
            if (data.isreexaminationcompleted) {
                document.getElementById("Qgateid_" + ReExaminationgateidforPainting).style.backgroundColor = "darkgreen";
                $("#Completedbtn1ForPainting").show();
                $("#CompletedbtnForPainting").hide();
                CompletedDetails();
                disabled = "disabled";
            }
            else {
                document.getElementById("Qgateid_" + ReExaminationgateidforPainting).style.backgroundColor = "";
                $("#CompletedbtnForPainting").show();
                $("#Completedbtn1ForPainting").hide();
                disabled = "";
            }
        }
        else {

        
        if (IsCompleted == true) {
            $("#Completedbtn1ForPainting").show();
            $("#CompletedbtnForPainting").hide();
            document.getElementById("Qgateid_" + QgateId).style.backgroundColor = "darkgreen";

        }
        else {
            $("#CompletedbtnForPainting").show();
            $("#Completedbtn1ForPainting").hide();
            document.getElementById("Qgateid_" + QgateId).style.backgroundColor = "";

        }

        }
      


        BindintPaintingDefectItems(data.PaintingCheckItemDefect);
        if (data.PaintingCheckItemDefect.length > 0) {
            BindingscreenshotImagedataForRework(data)

        }
       
    })

}
function BindingCloned() {
    var Cloned = [];
    for (var i = 1; i <= 12; i++) {
        Cloned.push('<span id="cloned_' + i + '"></span>');

    }
    $("#cloned").append(Cloned.join(''));
}

function BindintPaintingDefectItems(data) {

   

    if (GateName == "塗装 Rework") {
        $('#tblQFLFeedbackReworkPainting').DataTable({
            data: data,
            "columns": [
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "CompletedDate" },
                { "data": "GateName" }

            ], "bSort": false, "bDestroy": true, "bLengthChange": false, "pageLength": 100, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [],
            "deferRender": true,
            "drawCallback": function (settings) {
                // alert(UserDetails.Language)
                $('.Languagepicker').selectpicker('val', UserDetails.Language);
                $('#tblQFLFeedback_info,#tblQFLFeedback').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#tblQFLFeedback_paginate').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#strecord').translate({ lang: $('.Languagepicker').val(), t: dict });
                if (data.length <= 0) {
                    $('#BindingCheckListItemsPaintingRework').empty();
                    $('#BindingCheckListItemsPaintingRework').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

                }


            },
            "createdRow": function (row, data, index) {

                VinIds = data.Vinid;
                //$('td', row).eq(0).attr({ 'title': data.GateName, "data-label": "GateName", "data-toggle": "tooltip", "data-placement": "top" });
                var content = [];
                var count = index + 1;

                $('td', row).eq(0).empty().append('<span>' + data.GateName + '</span>');
                $('td', row).eq(1).empty().append('<span>' + count + '</span>');
                if (data.DamageImage != "") {
                    //  $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + data.Site1Image + '" />');

                }
                else {
                    $('td', row).eq(2).empty().append('<span>' + data.DamageValue+'</span>');

                }
                
                $('td', row).eq(3).empty().append('<span>' + data.CompletedBy + '</span>');
                $('td', row).eq(4).empty().append('<span>' + data.CompletedDate + '</span>');

                content.push('<div class="row">');
                content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                if (data.IsCommunication == true) {

                    content.push('<span><a href="#"  DefectValue="' + data.DamageValue + '"   onclick=btnReExamCommunicateForPainting(this,"' + data.Vinid + '",' + data.CheckItemDefectId + ',"Rework",' + data.CheckListItemStatusId + ') class=" ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_' + data.CheckItemDefectId + '" style=""><i  id="btnCommunicateCommentIcon_' + data.CheckItemDefectId + '" class="fas fa-comments text-gray "></i></a></span>');
                }
                else {
                    content.push('<span><a href="#"  DefectValue="' + data.DamageValue +'"   onclick=btnReExamCommunicateForPainting(this,"' + data.Vinid + '",' + data.CheckItemDefectId + ',"Rework",' + data.CheckListItemStatusId + ')  class="btn btn-save CommentEvent ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_' + data.CheckItemDefectId + '" style=""><i  id="btnCommunicateCommentIcon_' + data.CheckItemDefectId + '" class="fas fa-comments "></i></a></span>');

                }
                content.push('</div>');
                var disabled1 = "";


                if (data.CheckListItemStatusId == 7) {

                    
                    disabled1 = "disabled"
                }


                if (disabled != "") {
                    disabled1 = disabled;
                }


                var cursor = "";


                if (data.CheckListItemStatusId == 5) {

                    content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                    content.push('<a href="#"  id="CheckItemsOk' + data.CheckItemDefectId + '"onclick=btnPaintingCheckItemsclick("' + "Ok" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + count + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.CheckItemDefectId + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                    content.push('</div>');
                }

                else if (data.CheckListItemStatusId == 7) {

                    content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper ">');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                    content.push('<a href="#"  id="CheckItemsOk' + data.CheckItemDefectId + '"onclick=btnPaintingCheckItemsclick("' + "Ok" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + count + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.CheckItemDefectId + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                    content.push('</div>');
                }





                else if (data.isreexamflg == true) {

                    content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper">');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                    content.push('<a href="#" style="background-color: red;"  id="CheckItemsOk' + data.CheckItemDefectId + '"onclick=btnPaintingCheckItemsclick("' + "Ok" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + count + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i  id="CheckItemsOks' + data.CheckItemDefectId + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id=""></span>');
                    content.push('</div>');

                }

                else if (data.CheckListItemStatusId == 3) {
                    content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper">');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                    content.push('<a href="#"  id="CheckItemsOk' + data.CheckItemDefectId + '"onclick=btnPaintingCheckItemsclick("' + "Ok" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + count + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i  id="CheckItemsOks' + data.CheckItemDefectId + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id=""></span>');
                    content.push('</div>');

                }
                




                //  --------------------------------- Ok Items --------------------------


                //--------------------------- Reset---------------------------

                content.push('<div class="col-sm-3  p-lr-5 disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons" style="color:red">');
                content.push('<a href="#"  id="CheckItemsReset' + data.CheckItemDefectId + '" onclick=btnPaintingCheckItemsclick("' + "Reset" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + count + ') class="btn-reset btn ' + disabled1 + '" data-toggle="tooltip" title="Reset" aria-hidden="true">');
                content.push('<i id="CheckItemsResets' + data.CheckItemDefectId + '" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                content.push('</a>');
                content.push('</span>');
                content.push('</div>');




                var UploadedImageDisabled = "";
                if (data.NotOkUploadImageFORPaint == "" || data.NotOkUploadImageFORPaint == null && data.NotOkUploadImageFORPaint == undefined) {
                    UploadedImageDisabled = "disabled";
                }
                else if (disabled == "disabled") {
                    UploadedImageDisabled = "disabled";
                }
                else {
                    UploadedImageDisabled = "";
                }



                content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                content.push('<a href="#" onclick="btnOpenUploadedImage(' + 0 + ',' + 0 + ',\'' + data.NotOkUploadImageFORPaint + '\')"  id=""  class="btn btn-save ' + UploadedImageDisabled+'"  data-toggle="tooltip" title="Image" aria-hidden="true">');
                content.push('<i style="" id="" class="fa fa-picture-o  feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                content.push('</a>');
                content.push('</span>');
                content.push('</div>');










                //--------------------


                //content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper">');
                //content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                //content.push('<a href="#"  id="CheckItemsOk" onclick=btntbnCheckItems() class="btn btn-save "  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                //content.push('<i  id="CheckItemsOks" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                //content.push('</a>');
                //content.push('</span>');
                ////content.push('<span class="feedback-button-number" id=""></span>');
                //content.push('</div>');


                //  content.push('<div class="col-sm-3  p-lr-5  disabled-wrapper">');
                //content.push('<span class="feebback-pending-buttons" style="color:red">');
                //content.push('<a href="#"  id="CheckItemsReset" onclick=btntbnCheckItems() class="btn-reset btn " data-toggle="tooltip" title="Reset" aria-hidden="true">');
                //content.push('<i id="CheckItemsResets" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                //content.push('</a>');
                //content.push('</span>');
                //content.push('</div>');


                //content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                //content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                //content.push('<a href="#" onclick="btnOpenUploadedImage()"  id=""  class="btn btn-save "  data-toggle="tooltip" title="Image" aria-hidden="true">');
                //content.push('<i style="" id="" class="fa fa-picture-o  feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                //content.push('</a>');
                //content.push('</span>');
                //content.push('</div>');


                content.push('</div>');


                $('td', row).eq(5).empty().append(content.join(''));

            }


        })

    }


    else if (GateName == "塗装 Re-Examination") {
        $('#tblQFLFeedbackReExamPainting').DataTable({
            data: data,
            "columns": [
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "GateName" },
                { "data": "GateName" }

            ], "bSort": false, "bDestroy": true, "bLengthChange": false, "pageLength": 100, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [],
            "deferRender": true,
            "drawCallback": function (settings) {
                // alert(UserDetails.Language)
                $('.Languagepicker').selectpicker('val', UserDetails.Language);
                $('#tblQFLFeedback_info,#tblQFLFeedback').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#tblQFLFeedback_paginate').translate({ lang: $('.Languagepicker').val(), t: dict });
                $('#strecord').translate({ lang: $('.Languagepicker').val(), t: dict });
                if (data.length <= 0) {
                    $('#BindingCheckListItemsPaintingReExam').empty();
                    $('#BindingCheckListItemsPaintingReExam').append('<span class="" id="" style="padding-left: 594px";> No Checkitems found </span>');

                }


            },
            "createdRow": function (row, data, index) {

                VinIds = data.Vinid;
                //$('td', row).eq(0).attr({ 'title': data.GateName, "data-label": "GateName", "data-toggle": "tooltip", "data-placement": "top" });
                var content = [];
                var count = index + 1;

                $('td', row).eq(0).empty().append('<span>' + data.GateName + '</span>');
                $('td', row).eq(1).empty().append('<span>' + data.ReExaminationOrderNo + '</span>');
                if (data.DamageImage != "") {
                    $('td', row).eq(2).empty().append('  <img  onclick = "" style="width:50px"  src = "' + UserDetails.SignatureSitePath + '/' + VIN + '/' + ModelNumber + '/' + data.DamageImage + '" class= "" style = "margin-left:0px" />');
                    //  $('td', row).eq(2).empty().append('<span>' + defectivePlace + Filterdefect + '</span>' + "" + '<img style="width:50px" id="" src="' + UserDetails.SignatureSitePath + '/' + VIN + '/' + data.Site1Image + '" />');

                }
                else {
                    $('td', row).eq(2).empty().append('<span>' + data.DamageValue +  '</span>');

                }
               
                $('td', row).eq(3).empty().append('<span>' + data.CompletedBy + '</span>');
                $('td', row).eq(4).empty().append('<span>' + data.CompletedDate + '</span>');

                content.push('<div class="row">');
                content.push('<div class="col-sm-3 feedback-action  p-lr-5 ml--10  disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                if (data.IsCommunication == true) {

                    content.push('<span><a href="#"  DefectValue="' + data.DamageValue +  '"   onclick=btnReExamCommunicateForPainting(this,"' + data.Vinid + '",' + data.CheckItemDefectId + ',"Re-Examination",' + data.CheckListItemStatusId + ') class=" ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_' + data.CheckItemDefectId + '" style=""><i  id="btnCommunicateCommentIcon_' + data.CheckItemDefectId + '" class="fas fa-comments text-gray "></i></a></span>');
                }
                else {
                    content.push('<span><a href="#"  DefectValue="' + data.DamageValue +  '"   onclick=btnReExamCommunicateForPainting(this,"' + data.Vinid + '",' + data.CheckItemDefectId + ',"Re-Examination",' + data.CheckListItemStatusId + ')  class="btn btn-save CommentEvent ' + disabled + '" data-toggle="tooltip" title="comment"   aria-hidden="true" id="btnCommunicateComment_' + data.CheckItemDefectId + '" style=""><i  id="btnCommunicateCommentIcon_' + data.CheckItemDefectId + '" class="fas fa-comments "></i></a></span>');

                }
                content.push('</div>');





                var cursor = "";


                if (data.CheckListItemStatusId == 5) {

                    content.push('<div class="col-sm-3 feedback-action p-lr-5 ml--10 disabled-wrapper">');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                    content.push('<a href="#"  id="CheckItemsOk' + data.CheckItemDefectId + '"onclick=btnPaintingCheckItemsclick("' + "Ok" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + data.ReExaminationOrderNo + ') class="btn btn-save ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i  id="CheckItemsOks' + data.CheckItemDefectId + '" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id=""></span>');
                    content.push('</div>');
                }

                else if (data.CheckListItemStatusId == 7) {

                    content.push('<div class="col-sm-3 feedback-action p-lr-5 ml--10 disabled-wrapper">');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');

                    content.push('<a href="#"  id="CheckItemsOk' + data.CheckItemDefectId + '"onclick=btnPaintingCheckItemsclick("' + "Ok" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + data.ReExaminationOrderNo + ') class="btn-saveCheck ' + disabled + '"  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                    content.push('<i style="color:green;cursor:' + cursor + '" id="CheckItemsOks' + data.CheckItemDefectId + '" class="fas fa-check disabled feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');

                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id="">' + okcheckcount + '</span>');
                    content.push('</div>');
                }




               




                //  --------------------------------- Ok Items --------------------------

                                //  ---------------------------------Not Ok Items --------------------------


                if (data.CheckListItemStatusId == 5 || data.CheckListItemStatusId == 7) {
                    content.push('<div class="col-sm-3 feedback-action p-lr-5 ml--10 disabled-wrapper">');
                    content.push('<span class="feebback-pending-buttons disabled-wrapper" style="color:red">');
                    content.push('<a href="#"  id="CheckItemsNotOk' + data.CheckItemDefectId + '" onclick=btnPaintingCheckItemsclick("' + "NotOk" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + data.ReExaminationOrderNo + ') class="btn btn-close ' + disabled + '" data-toggle="tooltip" title="Not OK" aria-hidden="true">');
                    content.push('<i id="CheckItemsNotOks' + data.CheckItemDefectId + '" class="fas fa-times" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id="NotOkCount' + data.qflfeedbackworkflowid + '""> </span></i>');
                    content.push('</a>');
                    content.push('</span>');
                    //content.push('<span class="feedback-button-number" id="">' + NotOkCount + '</span>');
                    content.push('</div>');
                }

             //  --------------------------------- NotOk Items --------------------------

                //--------------------------- Reset---------------------------

                content.push('<div class="col-sm-3  p-lr-5 ml--10 disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons" style="color:red">');
                content.push('<a href="#"  id="CheckItemsReset' + data.CheckItemDefectId + '" onclick=btnPaintingCheckItemsclick("' + "Reset" + '","' + data.CheckItemDefectId + '","' + data.Vinid + '",' + data.ReExaminationOrderNo + ') class="btn-reset btn ' + disabled + '" data-toggle="tooltip" title="Reset" aria-hidden="true">');
                content.push('<i id="CheckItemsResets' + data.CheckItemDefectId + '" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                content.push('</a>');
                content.push('</span>');
                content.push('</div>');


                var UploadedImageDisabled = "";
                if (data.NotOkUploadImageFORPaint == "" || data.NotOkUploadImageFORPaint == null && data.NotOkUploadImageFORPaint == undefined) {
                    UploadedImageDisabled = "disabled";
                }
                else if (disabled == "disabled") {
                    UploadedImageDisabled = "disabled";
                }
                else {
                    UploadedImageDisabled = "";
                }

                content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                content.push('<a href="#" onclick="btnOpenUploadedImage(' + 0 + ',' + 0 + ',\'' + data.NotOkUploadImageFORPaint + '\')"  id=""  class="btn btn-save ' + UploadedImageDisabled+'"  data-toggle="tooltip" title="Image" aria-hidden="true">');
                content.push('<i style="" id="" class="fa fa-picture-o  feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                content.push('</a>');
                content.push('</span>');
                content.push('</div>');


                //--------------------


                //content.push('<div class="col-sm-3 feedback-action p-lr-5 disabled-wrapper">');
                //content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                //content.push('<a href="#"  id="CheckItemsOk" onclick=btntbnCheckItems() class="btn btn-save "  data-toggle="tooltip" title="Ok" aria-hidden="true">');
                //content.push('<i  id="CheckItemsOks" class="fas fa-check feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></span></i>');
                //content.push('</a>');
                //content.push('</span>');
                ////content.push('<span class="feedback-button-number" id=""></span>');
                //content.push('</div>');


                //  content.push('<div class="col-sm-3  p-lr-5  disabled-wrapper">');
                //content.push('<span class="feebback-pending-buttons" style="color:red">');
                //content.push('<a href="#"  id="CheckItemsReset" onclick=btntbnCheckItems() class="btn-reset btn " data-toggle="tooltip" title="Reset" aria-hidden="true">');
                //content.push('<i id="CheckItemsResets" class="fas fa-refresh" ToolTipService.ShowOnDisabled="True"><span class="feedback-button-number" id=""></span></i>');
                //content.push('</a>');
                //content.push('</span>');
                //content.push('</div>');


                //content.push('<div class="col-sm-3 feedback-action p-lr-5  disabled-wrapper" >');
                //content.push('<span class="feebback-pending-buttons disabled-wrapper" id="">');
                //content.push('<a href="#" onclick="btnOpenUploadedImage()"  id=""  class="btn btn-save "  data-toggle="tooltip" title="Image" aria-hidden="true">');
                //content.push('<i style="" id="" class="fa fa-picture-o  feedback-icon-whitespace" ToolTipService.ShowOnDisabled="True"></i>');
                //content.push('</a>');
                //content.push('</span>');
                //content.push('</div>');


                content.push('</div>');


                $('td', row).eq(5).empty().append(content.join(''));

            }


        })

    }


}

function btnPaintingCheckItemsclick(CheckItems, CheckItemDefectId, Vinid,ReExaminationOrderNo) {


    if ((GateName == "塗装 Rework" || GateName == "塗装 Re-Examination")  && (CheckItems != "NotOk")) {



        var classNameOk = $('#CheckItemsOk' + CheckItemDefectId).attr('class');
        if (classNameOk == undefined) {
            classNameOk = ""
        }


        if ((classNameOk.trim() == "btn-saveCheck" || classNameOk.trim() == "btn-saveCheck disabled") && CheckItems == "Ok") {
            return false;
        }




        var classNameOk = $('#CheckItemsOk' + CheckItemDefectId).attr('class');
        var classNameNotOk = $('#CheckItemsNotOk' + CheckItemDefectId).attr('class');
        var classNameSkip = $('#CheckItemsSkip' + CheckItemDefectId).attr('class');

            if (CheckItems == "Reset") {

                if (GateName == "Rework") {

                    if (classNameOk.trim() == "btn-saveCheck") {

                        

                        $('#CheckItemsResets' + CheckItemDefectId).removeClass("fas fa-refresh").addClass("fas fa-spinner fa-spin");
                        var ReExamid = "ReExamItemCount" + CheckItemDefectId;
                        $("#" + ReExamid).hide();

                      //  $("#OkCheckItemCount" + CheckItemDefectId).text("");
                        $("#ReExamItemCount" + CheckItemDefectId).text("");
                        $("#NotOkCount" + CheckItemDefectId).text("");


                        $('#CheckItemsOks' + CheckItemDefectId).css("color", "white");
                        $('#CheckItemsOk' + CheckItemDefectId).removeClass("btn-saveCheck ").addClass("btn btn-save ");

                        $('#CheckItemsResets' + CheckItemDefectId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-refresh");

                        UpdateCheckListItemsforPainting(CheckItems, CheckItemDefectId, Vinid, GateName, ReExaminationOrderNo);
                        return false;
                    }
                }

                else if (classNameOk.trim() == "btn-saveCheck" || classNameNotOk.trim() == "btn btn-closeCheck") {
                    $('#CheckItemsResets' + CheckItemDefectId).removeClass("fas fa-refresh").addClass("fas fa-spinner fa-spin");


                    var ReExamid = "ReExamItemCount" + CheckItemDefectId;

                    //$("#OkCheckItemCount" + CheckItemDefectId).text("");
                    $("#ReExamItemCount" + CheckItemDefectId).text("");
                    $("#" + ReExamid).hide();
                    $("#NotOkCount" + CheckItemDefectId).text("");


                    $('#CheckItemsOks' + CheckItemDefectId).css("color", "white");
                    $('#CheckItemsOk' + CheckItemDefectId).removeClass("btn-saveCheck ").addClass("btn btn-save ");

                    $('#CheckItemsNotOks' + CheckItemDefectId).css("color", "white");
                    $('#CheckItemsNotOk' + CheckItemDefectId).removeClass("btn-closeCheck").addClass("btn btn-close");

                    $('#CheckItemsResets' + CheckItemDefectId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-refresh");

                    UpdateCheckListItemsforPainting(CheckItems, CheckItemDefectId, Vinid, GateName, ReExaminationOrderNo);
                    return false;
                }
            }
            else {

                $('#CheckItemsOks' + CheckItemDefectId).removeClass("fas fa-check").addClass("fas fa-spinner fa-spin");

                if (GateName == "塗装 Rework") {

                    $("#NotOkCount" + CheckItemDefectId).text("");

                    //$("#OkCheckItemCount" + CheckItemDefectId).text(individualitemcount);

                    $('#CheckItemsOks' + CheckItemDefectId).css("color", "green");
                    $('#CheckItemsOk' + CheckItemDefectId).removeClass("btn btn-save").addClass("btn-saveCheck ");

                    $('#CheckItemsNotOks' + CheckItemDefectId).css("color", "white");
                    $('#CheckItemsNotOk' + CheckItemDefectId).removeClass("btn-closeCheck").addClass("btn btn-close");

                }


                else if (GateName == "塗装 Re-Examination") {

                   // $("#OkCheckItemCount" + CheckItemDefectId).text(individualitemcount);

                    $('#CheckItemsOks' + CheckItemDefectId).css("color", "green");
                    $('#CheckItemsOk' + CheckItemDefectId).removeClass("btn btn-save").addClass("btn-saveCheck ");

                    $('#CheckItemsNotOks' + CheckItemDefectId).css("color", "white");
                    $('#CheckItemsNotOk' + CheckItemDefectId).removeClass("btn-closeCheck").addClass("btn btn-close");

                }
                $('#CheckItemsOks' + CheckItemDefectId).removeClass("fas fa-spinner fa-spin").addClass("fas fa-check");


                UpdateCheckListItemsforPainting(CheckItems, CheckItemDefectId, Vinid, GateName, ReExaminationOrderNo);
                return false;
            }

        



    }
    else if (CheckItems == "NotOk") {

        btnbtnNotOkCheckItemsPainting(CheckItems, CheckItemDefectId, Vinid, GateName)
    }



}

function btnbtnNotOkCheckItemsPainting(CheckItems, CheckItemDefectId, Vinid, GateName) {

    var classNameNotOk = $('#CheckItemsNotOk' + CheckItemDefectId).attr('class');
    if (classNameNotOk.trim() == "btn btn-close") {
        UpdateCheckItemsReExamPainting(CheckItems, CheckItemDefectId, Vinid, GateName);
    }
}
function UpdateCheckItemsReExamPainting(CheckItems, CheckItemDefectId, Vinid, GateName) {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var paintingGateName = "";
    if (GateName == "塗装 Rework") {
        paintingGateName = "Rework"
    }
    else if (GateName == "塗装 Re-Examination") {
        paintingGateName = "Re-Examination"
    }
    else {
        paintingGateName = GateName

    }
    var json = {
        "CheckItemDefectId": CheckItemDefectId,
        "gatename": paintingGateName,
        "checkitemvalue": CheckItems,
        "userid": UserDetails.UserId,
        "vinnumber": VIN,
    "ModelName": ModelNumber
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatusForPainting';

    PostMethod(ApiFunc, Input, Token, function (data) {

        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('New defect added to the check item');
        }
        else {
            $('#hTitle3').text('チェック項目に新しい欠陥が追加されました');
        }
        GetPaintingMasterDefectItems();
    });
}




function UpdateCheckListItemsforPainting(CheckItems, CheckItemDefectId, Vinid, GateName, ReExaminationOrderNo) {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var paintingGateName = "";
    if (GateName == "塗装 Rework") {
        paintingGateName = "Rework"
    }
    else if (GateName == "塗装 Re-Examination") {
        paintingGateName = "Re-Examination"
    }
    else {
        paintingGateName = GateName

    }

    var CheckItemValue = CheckItems;
        var json = {
            "CheckItemDefectId": CheckItemDefectId,
            "gatename": paintingGateName,
            "checkitemvalue": CheckItems,
            "userid": UserDetails.UserId,
            "vinnumber": VIN,
            "ReExaminationOrderNo": ReExaminationOrderNo,
            "ModelName": ModelNumber

        };
        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/UpdateCheckListItemStatusForPainting';
        PostMethodForUpdate(ApiFunc, Input, Token, function (data) {
            if (checkItemMenu == "MenuItems" || (GateName == "塗装 Rework" && CheckItemValue == "NotOk")) {
                //GetCheckListItems(UserDetails.PlantId, QgateId, '')

            }

            if (GateName == "塗装 Rework") {

                var SpOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == 5 || x.Status == 7; });
                var TotalCnt = data.UpdateCheckListItem.length;
                if (SpOkCount.length == TotalCnt) {
                    $('#CompletedbtnForPainting').prop('disabled', false);

                }
                else {
                    $('#CompletedbtnForPainting').prop('disabled', true);

                }
            }
            else if (GateName == "塗装 Re-Examination") {
                var SpOkCount = data.UpdateCheckListItem.filter(function (x) { return  x.Status == 7; });
                var TotalCnt = data.UpdateCheckListItem.length;
                if (SpOkCount.length == TotalCnt) {
                    $('#CompletedbtnForPainting').prop('disabled', false);

                }
                else {
                    $('#CompletedbtnForPainting').prop('disabled', true);

                }
            }

            //if (GateName == "Rework" || GateName == "Re-Examination") {
            //    var spOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Ok"; });
            //    var spNotOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "NotOk"; });
            //    var spSkippedCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Skip"; });
            //    var spPendingCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Pending"; });

            //    if (spOkCount.length > 0) {


            //        $("#spOkCount").text(spOkCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spOkCount").text(0);
            //    }
            //    if (spNotOkCount.length > 0) {

            //        $("#spNotOkCount").text(spNotOkCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spNotOkCount").text(0);
            //    }
            //    if (spPendingCount.length > 0) {

            //        $("#spPendingCount").text(spPendingCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spPendingCount").text(0);

            //    }

            //    var Total = $("#spTotalCount").text();
            //    var Ok = $("#spOkCount").text();

            //    if (GateName == "Re-Examination" || GateName == "Re-Examination1") {

            //        if (Total == Ok && IsReExamSignature == true) {
            //            $('#Completedbtn').prop('disabled', false);
            //        }
            //        else {
            //            $('#Completedbtn').prop('disabled', true);
            //        }
            //    }
            //    else {
            //        if (Total == Ok) {
            //            $('#Completedbtn').prop('disabled', false);
            //        }
            //        else {
            //            $('#Completedbtn').prop('disabled', true);
            //        }
            //    }
            //}

            //else {

            //    var spOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Ok"; });
            //    var spNotOkCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "NotOk"; });
            //    var spSkippedCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Skip"; });
            //    var spPendingCount = data.UpdateCheckListItem.filter(function (x) { return x.Status == "Pending"; });

            //    if (spOkCount.length > 0) {


            //        $("#spOkCount").text(spOkCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spOkCount").text(0);
            //    }

            //    if (spSkippedCount.length > 0) {


            //        $("#spSkippedCount").text(spSkippedCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spSkippedCount").text(0);
            //    }
            //    if (spNotOkCount.length > 0) {

            //        $("#spNotOkCount").text(spNotOkCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spNotOkCount").text(0);
            //    }
            //    if (spPendingCount.length > 0) {

            //        $("#spPendingCount").text(spPendingCount[0].totalrecords);
            //    }
            //    else {
            //        $("#spPendingCount").text(0);

            //    }

            //    var Total = $("#spTotalCount").text();
            //    var PendingCount = $("#spPendingCount").text();
            //    var NotOk = $("#spNotOkCount").text();
            //    var Skip = $("#spSkippedCount").text();
            //    var Ok = $("#spOkCount").text();

            //    var all = parseInt(NotOk) + parseInt(Skip) + parseInt(Ok);

            //    if (parseInt(Total) == all) {
            //        $('#Completedbtn').prop('disabled', false);
            //    }
            //    else {
            //        $('#Completedbtn').prop('disabled', true);
            //    }

            //}


        })
    




}


function BindingscreenshotImagedataForRework(data) {
    var ListOfCheckListItemImage = data.PaintingCheckItemDefect;

    var images = "bus.png";
    images = images.replace("NaN", "")
    var content = [];
    var selectedline = $("#selectedline").text();

    if (ListOfCheckListItemImage.length > 0 && data != null) {


        var ImageFileName = ListOfCheckListItemImage[0].ImageFileName;
        var UploadedFileName = ListOfCheckListItemImage[0].UploadedFileName;

        if (ImageFileName == "" || ImageFileName == undefined || ImageFileName == null) {
        //    content.push('<img  onclick="" src="' + UserDetails.PaintingImagePath + '/PaintUploadedImage/' + selectedline + '/' + UploadedFileName + '" class="busimage" style="margin-left:120px" />')
            content.push('<img  onclick="" src="' + UserDetails.PaintingImagePath + '/' + images + '" class="busimage" style="margin-left:120px;width:100%" />')


        }
        else {

            content.push('<img  onclick=""  src="' + UserDetails.PaintingImagePath + '/' + VIN + '/' + ModelNumber+ '/' + ImageFileName + '" class="busimage" style="margin-left:0px;width:100%" />')


        }

    }

    else {
        content.push('<img  onclick="" src="' + UserDetails.PaintingImagePath + '/' + images + '" class="busimage" style="margin-left:120px;width:100%" />')

    }

    $("#appendCheckItemReworkImages").empty();

    $("#appendCheckItemReworkImages").append(content.join(''));
}



function BindindCheckItemImageForRework() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var json = {
        "PlantId": UserDetails.PlantId,
        "ModelName": ModelNumber,
        "QgateId": QgateId,
        "Vinnumber": VIN,
        "userid": UserDetails.UserId,
        "Vinid": 0,
        "CheckItemImageId": 0,
        "ImageFileName": "",


    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCheckListItemImage';
    PostMethod(ApiFunc, Input, Token, function (data) {

        BindingImagedataForRework(data);

    })
}



function BindingImagedataForRework(data) {
    var ListOfCheckListItemImage = data.ListOfCheckListItemImage;
    

    var images = "bus.png";
    images = images.replace("NaN", "")
    var content = [];

    if (ListOfCheckListItemImage.length > 0 && data != null) {


        VinIds = ListOfCheckListItemImage[0].Vinid;
        var ImageFileName = ListOfCheckListItemImage[0].ImageFileName;
        CheckItemImageId = ListOfCheckListItemImage[0].CheckItemImageId;
       var UploadedFileName = ListOfCheckListItemImage[0].UploadedFileName;
        dynamiccount = ListOfCheckListItemImage[0].DynamicCount;
        var selectedline = $("#selectedline").text();

        if (ImageFileName == "" || ImageFileName == undefined || ImageFileName == null) {
            content.push('<img  onclick="CheckItemImageClick()" src="' + UserDetails.PaintingImagePath + '/PaintUploadedImage/' + selectedline + '/' + UploadedFileName + '" class="busimage" style="margin-left:20px;height:1000px" />')

            BindintPaintingdetails(data);
        }
        else {

            content.push('<img  onclick="CheckItemImageClick()"  src="' + UserDetails.PaintingImagePath + '/' + VIN + '/' + ModelNumber + '/' + ImageFileName + '" class="busimage" style="margin-left:0px;height:1000px" />')


        }

    }

    else {
        content.push('<img  onclick="CheckItemImageClick()" src="' + UserDetails.PaintingImagePath + '/' + images + '" class="busimage" style="margin-left:20px;height:1000px" />')

    }

    $("#appendCheckItemReworkImages").empty();

    $("#appendCheckItemReworkImages").append(content.join(''));
}


//function BindindCheckItemImageAfterDeleteForRework() {
//    var json = {
//        "PlantId": UserDetails.PlantId,
//        "ModalName": ModelNumber,
//        "QgateId": 0,
//        "Vinnumber": VIN,
//        "userid": UserDetails.UserId,
//        "Vinid": 0,
//        "CheckItemImageId": 0,
//        "ImageFileName": "",


//    };
//    var Input = JSON.stringify(json);
//    var ApiFunc = Api + 'QFL.svc/GetCheckListItemImagesForRework';
//    PostMethod(ApiFunc, Input, Token, function (data) {

//        BindintPaintingdetailsForRework(data);

//    })
//}


//function BindintPaintingdetailsForRework(data) {
//    var PaintingCheckItemDefect = data.PaintingCheckItemDefect;
//    for (var i = 1; i <= 12; i++) {
//        $('#cloned_' + i).empty();
//    }


//    var content = [];
//    if (PaintingCheckItemDefect.length > 0 && data != null) {

//        $.each(PaintingCheckItemDefect, function (i, item) {
//            // var MarginTopCount = item.MarginTop - 20
//            var MarginTopCount = item.MarginTop 
//            var MarginLeftcount = item.MarginLeft
//            var ii = i + 1;
//            var cloned = 'cloned_' + item.PaintingOrderNo;
//            $("#" + cloned).append('<span style="display:block; top: ' + MarginTopCount + 'px; left: ' + MarginLeftcount + 'px;color:' + item.PaintingColor + '" id="clonedCount_' + i + '" class="clonenumber pointer">' + ii + '</span>')

//            $("#" + cloned).append('<img onclick="OnEditPaintingevent(' + item.CheckItemDefectId + ')" src="' + UserDetails.PaintingImagePath + '/' + item.PaintingImage + '" id="Editfollows_' + item.CheckItemDefectId + '" class="PaintImage pointer" style="display: block; top: ' + item.MarginTop + 'px; left: ' + item.MarginLeft + '%;">')


//        });

//    }

//}


        

var communaicateCheckItemDefectId = 0;
var communaicatePaintGateName = "";
var communaicatePaintVinId = 0;
var communaicate_PaintCheckListItemStatusId = 0
function btnReExamCommunicateForPainting(e, VinId, CheckItemDefectId, GateName, CheckListItemStatusId) {
    $("#CommunicateValidationForPainting").hide();
    $('#txtCommunicationForPainting').val("");
    $(".uploaded_imageid").hide();

    var DefectValue = e.getAttribute('DefectValue');
    $("#ReworkAndReExamCommunicateTitleForPainting").text(DefectValue);
    communaicateCheckItemDefectId = CheckItemDefectId;
    communaicatePaintGateName = GateName;
    communaicatePaintVinId = VinId;
    communaicate_PaintCheckListItemStatusId = CheckListItemStatusId;

    GetCommunicationDetailsForPainting();
}

function BindingPopupCommunicationDetailsForPainting(CommunicationDetails, Data) {
    var content = [];

    var IsDisabledComments = Data.IsDisabledComments;

    if (IsDisabledComments == true) {
        $('#txtCommunicationForPainting').prop('disabled', true);
        $('#btnCommunicationClickForPainting').hide();
        $('#btnCommunicationcloseForPainting').val("Close");

    }
    else {
        $('#txtCommunicationForPainting').prop('disabled', false);
        $('#btnCommunicationClickForPainting').show();
        $('#btnCommunicationcloseForPainting').val("Back");

    }

    $("#BindingCommunicationDetailsForPainting").empty();

    if (CommunicationDetails.length > 0) {
        $.each(CommunicationDetails, function (i, item) {

            if (item.StartPosition.toUpperCase() == "LEFT") {


                content.push('<div class="row">')
                content.push('<div class="col-md-4">')
               
                    content.push('<h5 class="font-weights">' + item.GateName + '</h5>')

                

                content.push('<h5 class="font-weights">' + item.CompletedBy + '</h5>')
                content.push('<h5 class="font-weights">' + item.CompletedDate + '</h5>')
                content.push('</div>')

                content.push('<div class="col-md-8">')
                content.push('<div class="talk-bubbleleft triangle left-top">')
                content.push('<div class="talktext">')
                content.push('<p class="font-weights">' + item.Comments + '</p>')
                content.push('</div>')

                content.push('</div>')
                content.push('</div>')
                content.push('</div>')
            }


            else {
                content.push('<div class="row">')
                content.push('<div class="col-md-8">')
                content.push('<div class="talk-bubbleright triangle right-top right-Border-bubble">')
                content.push('<div class="talktext">')
                content.push('<p class="font-weights">' + item.Comments + '</p>')
                content.push('</div>')
                content.push('</div>')
                content.push('</div>')
                content.push('<div class="col-md-4">')

                    content.push('<h5 class="font-weights">' + item.GateName + '</h5>')

                
                content.push('<h5 class="font-weights">' + item.CompletedBy + '</h5>')
                content.push('<h5 class="font-weights">' + item.CompletedDate + '</h5>')
                content.push('</div>')
                content.push('</div>')
            }
        });

        $("#BindingCommunicationDetailsForPainting").append(content.join(''));
    }

}

function btnCloseComunicationForPainting() {
    $("#ReworkAndReExamCommunicateForPainting").modal('hide');

}


function btnSubmittCommunicationForPainting() {

    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }

    var Comments = $("#txtCommunicationForPainting").val();

    if (Comments != "") {
        var json = {
            "VinId": communaicatePaintVinId,
            "CheckItemDefectId": communaicateCheckItemDefectId,
            "Vinnumber": VIN,
            "communaicateGateName": communaicatePaintGateName,
            "Comments": Comments,
            "userid": UserDetails.UserId,
            "CheckListItemStatusId": communaicate_PaintCheckListItemStatusId,
            "ModelName": ModelNumber,
            "uploadedFileName": uploadedFileName

        };

        var Input = JSON.stringify(json);
        var ApiFunc = Api + 'QFL.svc/InsertPaintingCommunicationDetails';
        PostMethod(ApiFunc, Input, Token, function (data) {

            if (data.result == "Insert") {

                $("#btnCommunicateCommentIcon_" + communaicateCheckItemDefectId).attr("style", "color:gray")
                $("#btnCommunicateComment_" + communaicateCheckItemDefectId).removeClass("btn btn-save CommentEvent")
                $("#txtCommunication").val("");
                GetCommunicationDetailsForPainting();
            }
            else {
            }

        });
    }
    else {
        $("#CommunicateValidationForPainting").show();

    }



}

function GetCommunicationDetailsForPainting() {
    if (UserDetails.UserId == 0) {
        Sessionout();
        return false;
    }


    var json = {
        "VinId": communaicatePaintVinId,
        "CheckItemDefectId": communaicateCheckItemDefectId,
        "Vinnumber": VIN,
        "communaicateGateName": communaicatePaintGateName,
        "userid": UserDetails.UserId,
        "CheckListItemStatusId": communaicate_PaintCheckListItemStatusId
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetPaintingCommunicationDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {

        BindingCommunicationDetailsForPainting(data);
    });
}

function BindingCommunicationDetailsForPainting(data) {
    BindingPopupCommunicationDetailsForPainting(data.ListofCommunicationDetails, data)
    $("#ReworkAndReExamCommunicateForPainting").modal('show');


}

$(document).ready(function () {
    $("#CompletedbtnForPainting").click(function () {
        $("#Signaturevalidation").text('');
        var canvas = document.getElementById("newSignature");
        canvasValidation = document.getElementById('newSignature');

        var context = canvas.getContext("2d");
        clearCanvas(context, canvasValidation);
        clearCanvas(context, canvas);

        canvasValidation = canvasValidation.toDataURL("image/png")

        var Signature;
        $('#completed').modal('show');

        EraseClick = "";
        $("#EraseImageid").attr("src", UserDetails.PaintingImagePath + "EraseImage.png");

        var EraseImageDisabled = document.getElementById('EraseImageid');
        EraseImageDisabled.onclick = null;

    })



    $("#Completedbtn1ForPainting").click(function () {

        var Signature;

        var EraseImageDisabled = document.getElementById('EraseImageid');
        EraseImageDisabled.onclick = ClickErase;
      
            $("#Modelbody").removeClass("modal-bodySig").addClass("modal-bodySig1");
            $('#ExistingSignature').html('<img id="" src="" />');

            $("ExistingSignature").hide();

            if (UserDetails.Language == "en") {

                $('#SinganatureConfirmationMsg').text('Are you sure? Want to cancel the completion of Inspection in the Q-Gate?');
            }
            else {
                $('#SinganatureConfirmationMsg').text('本気ですか？ Q-Gateでの検査完了をキャンセルしたいですか？');

            }
            $('#SinganatureConfirmationpopup').modal('show');
        
        //else {
        //    $("#btnSinganature").trigger("click");
        //}

    })
})

var GLBPointX
function Onclickpointxbutton(Point) {
    GLBPointX = Point;
}

function Sessionout() {
    var ApiFunc = '../Home/Logoff';
    window.location.href = ApiFunc;

}

