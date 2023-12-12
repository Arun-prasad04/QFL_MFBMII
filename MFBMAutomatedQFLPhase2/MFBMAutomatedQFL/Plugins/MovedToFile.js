var UserDetails;
var Api;
var Token;
var plantid;
var GetNewProgressColumnId;



 $(document).ready(function () {


    InitializeUrl();
     $('.selectpicker').selectpicker();
     $('.glyphicon-ok').hide();


     $('#tables').on('click', 'tbody tr > td', function () {

         var VIN_Id = $.trim($(this).closest('tr').children('td:eq(0)').text());
         var Model = $.trim($(this).closest('tr').children('td:eq(1)').text());

         GetVins(VIN_Id, Model);

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
            GetVinCheckListDetails();

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
           
            MaintainPlantId(PlantId);
        }

        if (UserDetails.PlantId != 0) {
        }
   

        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());

            MaintainPlantId(PlantId);
            
        });

        $('.Languagepicker').selectpicker('val', UserDetails.Language);
        Conversion($('.Languagepicker').val());
    });

   
}

function GetVinCheckListDetails() {



    //$("#ddlvinselect").append(optionhtml);




    var ApiFunc = UserDetails.Api + 'Monitor.svc/Get_VinUploadCheckListHistory'
    GetMethod(ApiFunc, UserDetails.Token, function (data) {

     

        bindVinuploadhistroytable(data);
    });

}



function bindVinuploadhistroytable(data) {

    $('#tblFiles').DataTable(
        {
            data: data,
            "columns":
                [
                    {
                        "data": "Vinnumber"
                    },

                    { "data": "ModelName" },
                  
                   
                ],
            "bSort": true, "bDestroy": true, "bLengthChange": false, "pageLength": 10, "dom": 'lrtip', "bSortCellsTop": true, "bFilter": true, "aaSorting": [], "deferRender": true
            , "createdRow": function (row, data, index) {
                // console.log(data);
                $(row).addClass('trfiles');
            }
        }
    );
    $("#tblFiles").css("width", "100%");
    if (UserDetails.Language == "en") {
        $("#tblFiles_info").find('span')[0].innerHTML = "Showing";
        $("#tblFiles_info").find('span')[1].innerHTML = "entries";
        $("#tblFiles_previous").text("Previous");
        $("#tblFiles_next").text("Next");
    }
    else {
        $("#tblFiles_info").find('span')[0].innerHTML = "表示中";
        $("#tblFiles_info").find('span')[1].innerHTML = "エントリー";
        $("#tblFiles_next").text("次");
        $("#tblFiles_previous").text("前");
    }
    //    $('.Languagepicker').selectpicker('val', UserDetails.Language);
    //    Conversion($('.Languagepicker').val());


}




function GetVins(VIN_Id, Model) {





    var json = {

        "Vinnumber": VIN_Id,
        "ModelName": Model,
       

    };
    var Input = JSON.stringify(json);

    var ApiFunc = '../Home/MovedToFolder/';
    JsonPostMethod(ApiFunc, Input, '', function (data) {
    })
}


