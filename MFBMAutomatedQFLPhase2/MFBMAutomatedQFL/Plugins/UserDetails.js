$(document).ready(function () {
  

    InitializeUrl();
    //$('#drpPlant').prop('disabled', true);
   
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
            MaintainPlantId(PlantId);
            //GetUserDetails($('#drpPlant').find(':selected').val());
        }

        if (UserDetails.PlantId != 0) {
           
        }


        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());
            MaintainPlantId(PlantId);
            GetUserDetails($('#drpPlant').find(':selected').val());
        });

        GetUserDetails($('#drpPlant').find(':selected').val());
    });
  
    $('.Languagepicker').selectpicker('val', UserDetails.Language);
    Conversion($('.Languagepicker').val());
   
}

function GetUserDetails(PlantId) {
    showloader();
    var json = {
        "PlantCode": PlantId,
       
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'Master.svc/GetUserAccessDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {
        loop = false;
        BindGetUserData(data);
        var table = $('.datatable').DataTable({


            // "aaSorting": [[0, "desc"]]
        });

        table.order([0, 'asc']).draw();
    });
}



function BindGetUserData(data) {
   
    $('#UserDetails').empty();
    var Header = data.userheaders;
    var UserList = data.userdetaillist;
    var useremail = data.useremail;
    var LineList = data.Linelist;
    var Admindetails = data.AdminDetails
    var Userdetails = data.UserList
    ProgressData = data;
   

   
    var lineheader = '';
    var secondItem = '';
    var thirdItem = "";
    var tableheader = '';
    var tablebody = '';
    var tablefooter = '';
    var finaltable = '';
    var tableheaderhide = '';
    var hiddentable = [];
    var HeaderItem = "";
    var AdminList = "";
    //var UserList = "";
    
    var designarr = [];
    var count = 1;
    var Progress = 0;
    var QFL = 0;
    var Masters = 0;
    var Reports = 0;

    var headeraccess = [];

    if (LineList.length <= 0) {
        return false;
    }

   
    var i = 0;
        lineheader += '<div id="tab' + i + '"  class="panel panel-default"><div class="panel-heading">';
        lineheader += '<a data-toggle="collapse" class="collapsed" data-parent="#accordions" href="#collapse' + i + '">';
        lineheader += '<h4 class="panel-title">User Details<span class="circle pull-right"><i class="fa"></i></span></h4></a></div>';
        tableheader += '<div id="collapse' + i + '" class=""><div class="table-responsive">';
    tableheader += '<table class="table table-bordered datatable" style ="width:' + Header[i].counts + 'px">';
    tableheader += '<thead><tr class="tblheadtext"><th style="width: 210px" class="IE-header-width"><span class="trn">Email</span></th><th style="width: 120px" class="overflow-ellipse-header" title="Progress Monitor"><span class="trn">Progress Monitor</span></th><th style="width: 120px" class="overflow-ellipse-header" title="QFLFeedBack"><span class="trn">QFLFeedBack</span></th><th style="width: 120px" class="overflow-ellipse-header" title="Masters"><span class="trn">Masters</span></th><th style="width: 120px" class="overflow-ellipse-header" title="Reports"><span class="trn">Reports</span></th>';
    tableheaderhide += '<div class=" AutomatedQFLPage-progressmonitor' + i + '"><table class="table table-bordered text-center datatable" style ="width:' + Header[i].counts + 'px"><thead style="display: none"><tr class="tblheadtext"><th style="width: 210px"  class="IE-header-width"><span class="trn">Email</span></th><th style="width: 120px" class="overflow-ellipse-header" title="Progress Monitor"><span class="trn">Progress Monitor</span></th><th style="width: 120px" class="overflow-ellipse-header" title="QFLFeedBack"><span class="trn">QFLFeedBack</span></th><th style="width: 120px" class="overflow-ellipse-header" title="Masters"><span class="trn">Masters</span></th><th style="width: 120px" class="overflow-ellipse-header" title="Reports"><span class="trn">Reports</span></th>';

    designarr.push(".AutomatedQFLPage-progressmonitor" + i + " > .mCustomScrollBox");
    tablebody += '<tbody>';

    var globaldata = '';

    
  

 
    $.each(LineList, function (i, value) {
        HeaderItem = $.grep(Header, function (element, index) {
            return element.accesstype == value.accesstype;
            tablebody += '<tr class="cursor-pointer">';
        });

        $.each(HeaderItem, function (i, value) {

            if (value.accessname.indexOf("Re-Examination1") >= 0) {
                tableheader += '<th style="width: 120px" title="' + value.accessname.replace("Re-Examination1", "完成 Re-Examination") + '" class="overflow-ellipse-header"><span class="trn">' + value.accessname.replace("Re-Examination1", "完成 Re-Examination") + '</span></th>';
                tableheaderhide += '<th style="width: 120px" title="' + value.accessname.replace("Re-Examination1", "完成 Re-Examination") + '" class="overflow-ellipse-header"><span class="trn">' + value.accessname.replace("Re-Examination1", "完成 Re-Examination") + '</span></th>';

            }
            else if (value.accessname.indexOf("Re-Examination") >= 0) {
                tableheader += '<th style="width: 120px" title="' + value.accessname.replace("Re-Examination", "QG Re-Examination") + '" class="overflow-ellipse-header"><span class="trn">' + value.accessname.replace("Re-Examination", "QG Re-Examination") + '</span></th>';
                tableheaderhide += '<th style="width: 120px" title="' + value.accessname.replace("Re-Examination", "QG Re-Examination") + '" class="overflow-ellipse-header"><span class="trn">' + value.accessname.replace("Re-Examination", "QG Re-Examination") + '</span></th>';

            }
        else {
                tableheader += '<th style="width: 120px" title="' + value.accessname + '" class="overflow-ellipse-header"><span class="trn">' + value.accessname + '</span></th>';
                tableheaderhide += '<th style="width: 120px" title="' + value.accessname + '" class="overflow-ellipse-header"><span class="trn">' + value.accessname + '</span></th>';

            }

          
           
        });

    });


    for (var j = 0; j < useremail.length; j++) {
       // tablebody += '<tr>';

        secondItem = useremail[j].userid;


        thirdItem = $.grep(UserList, function (element, index) {
            return element.userid == secondItem;
        });

        Progress = 0
        QFL = 0
        Masters = 0
        Reports = 0

        $.each(thirdItem, function (i, item) {
            if (useremail[j].emailid == "test@123.com") {
                //alert(useremail[j].emailid)
                //debugger;
            }
           
            if (i == 0) {
                tablebody += '<td style = "width: 210px;height:50px" class="overflow-ellipse">' + useremail[j].emailid + '</td>';
                tablebody += '<td style = "width: 210px;display:none;height:50px" class="overflow-ellipse">' + useremail[j].emailid + '</td>';
                
            }
            //tablebody += ' <td width="120px">O</td> ';
            //tablebody += ' <td width="120px">O</td> ';
            //tablebody += ' <td width="120px">O</td> ';
            //tablebody += ' <td width="120px">O</td> ';

            if (item.accessname == "Progress Monitor") {
                Progress = 1;
            }


            if (item.accessname == "QFL Feedback") {
                QFL = 1;
            }


            if (item.accessname == "Master Access") {
                Masters = 1;
            }

            if (item.accessname == "Report Access") {
                Reports = 1;
            }


        });


        if (thirdItem.length > 0) {
            if (Progress == 1) {
                tablebody += '<td style = "width:120px;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width:120px;display:none;height:50px"><div class="numberCircle"></div></td>';
            }
            else {
                tablebody += '<td style = "width:120px;height:50px"></td>';
                tablebody += '<td style = "width:120px;display:none;height:50px"></td>';
            }
            if (QFL == 1) {
                tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';

                //tablebody += '<td style = "width:120px;height:50px><div class="numberCircle"></div></td>';
                //tablebody += '<td style = "width:120px;display:none;height:50px"><div class="numberCircle"></div></td>';
            }
            else {
                tablebody += '<td style = "width: 120px;height:50px"></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"></td>';
            }
            if (Masters == 1) {
                tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';
            }
            else {
                tablebody += '<td style = "width: 120px;height:50px></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"></td>';
            }
            if (Reports == 1) {
                tablebody += '<td style = "width: 120px";height:50px><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';
            }
            else {
                tablebody += '<td style = "width: 120px;height:50px"></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"></td>';
            }

            $.each(LineList, function (i, value) {
                HeaderItem = $.grep(Header, function (element, index) {
                    return element.accesstype == value.accesstype;
                });

                $.each(HeaderItem, function (i, value) {


                    //var str = value.reaccessname;
                    //var res = str.replace("-", "");
                    //var AccessName = res.replace(" ", "");
                    var AccessName = value.reaccessname + "_" + useremail[j].userid;
                    //AccessName = AccessName.replace(" ", "");
                    //AccessName = AccessName.replace(" ", "");

                   

                    // alert(accessname + ", "+value.accessname)
                    tablebody += '<td style = "width:120px;height:50px" ><div id="' + AccessName + '" class=""></div></td>';
                    tablebody += '<td style = "width:120px; display:none;height:50px"><div id="' + AccessName + '_Hidden" class=""></div></td>';
                });

            });

        }
        else {
            //tablebody += '<td style = "width: 210px;height:50px" class="overflow-ellipse"data-toggle="tooltip" title="' + useremail[j].emailid + '" data-placement="bottom" data-original-title="' + useremail[j].emailid + '"> ' + useremail[j].emailid + '</td>';
            //tablebody += '<td style = "width: 210px;display:none;height:50px" class="overflow-ellipse">' + useremail[j].emailid + '</td>';
            //tablebody += '<td style = "width: 120px";height:50px><div class="numberCircle"></div></td>';
            //tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>' ;
            //tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
            //tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';
            //tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
            //tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';
            //tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
            //tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';


         
            tablebody += '<td style = "width: 210px;height:50px" class="overflow-ellipse"data-toggle="tooltip" title="' + useremail[j].Roleid + '" data-placement="bottom" data-original-title="' + useremail[j].emailid + '"> ' + useremail[j].emailid + '</td>';
            tablebody += '<td style = "width: 210px;display:none;height:50px" class="overflow-ellipse">' + useremail[j].emailid + '</td>';

            if (useremail[j].Roleid == 6) {
                tablebody += '<td style = "width: 120px";height:50px><div class=""></div> </td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class=""></div></td>';
                tablebody += '<td style = "width: 120px;height:50px"><div class=""></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class=""></div></td>';
                tablebody += '<td style = "width: 120px;height:50px"><div class=""></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class=""></div></td>';
                tablebody += '<td style = "width: 120px;height:50px"><div class=""></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class=""></div></td>';
            }
            else {
                tablebody += '<td style = "width: 120px";height:50px><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>' ;
                tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;height:50px"><div class="numberCircle"></div></td>';
                tablebody += '<td style = "width: 120px;display:none;height:50px"><div class="numberCircle"></div></td>';

            }

           
           

            $.each(LineList, function (i, value) {
                HeaderItem = $.grep(Header, function (element, index) {
                    return element.accesstype == value.accesstype;
                });
               

                $.each(HeaderItem, function (i, value) {


                    //var str = value.accessname;
                    //var res = str.replace("-", "");
                    //var AccessName = res.replace(" ", "");
                    //AccessName = AccessName.replace(" ", "");
                    var AccessName = value.reaccessname + "_" + useremail[j].userid
                   

                    // alert(accessname + ", "+value.accessname)
                    if (useremail[j].Roleid == 6) {

                     

                        tablebody += '<td style = "width:120px;height:50px" id="' + AccessName + '"><div class=""></div></td>';
                        tablebody += '<td style = "width:120px; display:none;height:50px" id="' + AccessName + '_Hidden"><div class=""></div></td>';
                    }
                    else {
                        tablebody += '<td style = "width:120px;height:50px" id="' + AccessName + '"><div class="numberCircle"></div></td>';
                        tablebody += '<td style = "width:120px; display:none;height:50px" id="' + AccessName + '_Hidden"><div class="numberCircle"></div></td>';
                    }
                   
                });

            });

        }

        

      
        tablebody += '</tr>';
       
    }
   
    tablebody += '</tbody>';
        tableheader += '</tr></thead></table>';

        //tableheader += '<th width="60%"><span class="trn">Defect</span></th><th width="120px"><span class="trn">Status</span></th></tr></thead></table>';
   

        if (tablebody == '<tbody><tr>') {

            hiddentable.push('#tab' + i)
        }
        else {

            $('#tab' + i).css('display', '');
        }

        tablefooter += '</tbody></table ></div></div></div></div>';
        finaltable += lineheader + tableheader + tableheaderhide + tablebody + tablefooter;
    console.log(finaltable)
        lineheader = ''; tableheader = ''; tablebody = ''; tablefooter = ''; tableheaderhide = '';
   


    $('#UserDetails').append(finaltable);
    //$("#ReworkHDBLine_28841").html("Yes");
    var User
    
        //User = Userdetails.filter(function (x) { return x.AccessType == Userdetails[j].userid });
    $.each(Userdetails, function (i, item) {
     
      //var str = item.accessname;
      //  var res = str.replace("-", "");
      //  var AccessName = res.replace(" ", "");
      //  AccessName = AccessName + "_" + item.userid
      //  AccessName = AccessName.replace(" ", "");
        //  AccessName = AccessName.replace(" ", "");

       

        var AccessName = item.reaccessname + "_" + item.userid
       

        $("#" + AccessName).addClass("numberCircle");

        //$("#" + AccessName).html("Yes");
    });

   

   



    for (var i = 0; i < hiddentable.length; i++) {
        $(hiddentable[i]).css('display', 'none');
    }

    



    for (var i = 0; i < designarr.length; i++) {
        $(".AutomatedQFLPage-progressmonitor" + i).mCustomScrollbar({

            scrollbarPosition: "outside",
            theme: "minimal-dark"
        });
        $height = $(window).height() - 480;

        $(".AutomatedQFLPage-progressmonitor" + i).height($height);
        $(designarr[i]).css("width", Header[0].counts + "px").css("max-width", Header[0].counts + "px")
        $('.AutomatedQFLPage-progressmonitor' + i).css("width", Header[0].counts + "px")
        $('#collapse' + i).translate({ lang: $('.Languagepicker').val(), t: dict });
    }
} 

function UserAccessExport() {
    var Plantid = $('#drpPlant').find(':selected').val();
    document.location.href = "../Home/DowloadExcelForUserDetails?plantId=" + Plantid;
    //window.location.href = ApiFunc;

}

