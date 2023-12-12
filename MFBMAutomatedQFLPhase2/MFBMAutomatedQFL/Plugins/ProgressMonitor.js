

var UserDetails;
var Api;
var Token;
var plantid;
var VinNumber;
var VehicleName;
var ModelName;
var vincount;

$(document).ready(function () {
    result = "";
    fromcounts = 0;
    tocounts = 0;
    $("#liProgressMonitor").addClass("active");
    $("#ExportExcel").click(function () {
        $('#ConfirmationpopupforExcelDownload').modal('show');
    });

    $("#exceldownload").submit(function (e) {
        var startdate = $('#startDate').val();
        var endDate = $('#endDate').val();





        var from = new Date(DateConvert(startdate));
        var To = new Date(DateConvert(endDate));
        const diffTime = Math.abs(To - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        var Current = 365;

        var datearrayFrom = startdate.split("/");
        var datearrayFrom = datearrayFrom[2];
        var datearrayTo = endDate.split("/");
        var datearrayTo = datearrayTo[2];
        var datearrayCurrent = new Date().getFullYear();


        //if (datearrayTo == datearrayCurrent) {


        //    if (Current < diffDays) {
        //        // alert(diffDays)
        //        $('#accordions').empty();
        //        if (UserDetails.Language == "en") {
        //            $('#AlertTitle').text("Please select date range witin 1 year");

        //        }
        //        else {
        //            $('#AlertTitle').text("1年以内の日付範囲を選択してください");

        //        }
        //        $('#AlertModal').modal('show');

        //        return false;
        //    }
        //}
        //else if (datearrayFrom != datearrayTo) {

        //    $('#accordions').empty();
        //    if (UserDetails.Language == "en") {
        //        $('#AlertTitle').text("For Historical data retrival, Please select From date and To date from same year");

        //    }
        //    else {
        //        $('#AlertTitle').text("履歴データの取得については、[開始日]と[同じ年の終了日]を選択してください");

        //    }
        //    $('#AlertModal').modal('show');

        //    return false;
        //}


        showloader();
    });

    InitializeUrl();
    $('.selectpicker').selectpicker();
    $('.glyphicon-ok').hide();
    $('#startDate').datetimepicker({ autoclose: true, pickTime: false, minView: 2, format: "dd/mm/yyyy" }).datetimepicker('update', new Date()).on('changeDate',
        function (selected) {
            var minDate = new Date(selected.date.valueOf());
            $("#endDate").datetimepicker('setStartDate', minDate);
        })


    $("#endDate").datetimepicker({
        autoclose: true,
        pickTime: false,
        minView: 2,
        format: "dd/mm/yyyy"
    });
    $(".datepicker").datetimepicker({
        autoclose: true,
        pickTime: false,
        minView: 2,
        format: "dd/mm/yyyy"
    });
    $('#startDate').val('');
    $("#startDate").datetimepicker('setEndDate', new Date());
    $("#endDate").datetimepicker('setEndDate', new Date());

    //--------------- ProgressMonitor VINHistory Details Below Add Jak 21-04-2020---------

    $('#accordions').on('click', 'tbody tr > td', function () {
        HistoryVIN = $.trim($(this).closest('tr').children('td:first').text());
        // HistoryVIN = "110011";

        var VIN_Id = $.trim($(this).closest('tr').children('td:first').text());
        VinNumber = VIN_Id;
        VehicleName = $(this).closest('tr').find('.progsVehicleName').text();
        ModelName = $(this).closest('tr').find('.progsModelName').text();

        CallVINHistoryDetails();
    });
    //--------------------------END -------------------------------------------------
    $("#vinDelete").on("click", function () {
        //alert('hi')
        $('#resoanComment').css('border', '1px solid #ccc');
        $('#resoanComment').val('');

        $('#CompletionConfirm').show();
        $('#btnCancel').show();
        $('#FinalPopupClose').hide();

        $("#Confirmationpopup").modal('show');
        if (UserDetails.Language == 'en') {
            $('#ConfirmationMessage').text('Deleting this VIN will delete all information about this VIN and can not be reverted back. Are you sure? Want to delete the VIN?');
        }
        else {
            $('#ConfirmationMessage').text('このVINを削除すると、このVINに関するすべての情報が削除され、元に戻すことはできません。 本気ですか？ VINを削除しますか？');
        }
    });
    $('#CompletionConfirm').click(function () {
        $("#Confirmationpopup").modal('hide');
        $('#vinComment').modal('show');
    });

    $("#btnCancel").on("click", function () {

        $("#Confirmationpopup").modal('hide');

    });

    $("#FinalPopupClose").on("click", function () {

        $("#Confirmationpopup").modal('hide');

    });
    $("#okDismiss").on("click", function () {

        if (ProgressMonitorVINDeleteValidation()) {
            DeleteVINandDetails();
            $("#vinComment").modal('hide');
        }
    });

});

function ReloadUserDetails(newlanguage) {
    UserDetails.Language = newlanguage;
}

function DeleteVINandDetails() {

    var json = {
        "vin": VinNumber,
        "userid": UserDetails.UserId,
        "comments": $('#resoanComment').val(),
        "vehicletypename": VehicleName,
        "modelname": ModelName,
        "plantid": $('#drpPlant').find(':selected').val()
    };

    var DeleteVIN = JSON.stringify(json);

    // console.log(Token);
    var ApiFunc = Api + 'Monitor.svc/DeleteVINandDetails';
    PostMethod(ApiFunc, DeleteVIN, Token, function (data) {

        // console.log(data);

        $('#CompletionConfirm').hide();
        $('#btnCancel').hide();
        $('#FinalPopupClose').show();
        $("#VINHistoryPopUp").modal('hide');
        $("#myModal").modal('hide');
        $("#Confirmationpopup").modal('show');

        if (UserDetails.Language == 'en') {
            $('#ConfirmationMessage').text('VIN has been successfully deleted!');
        }
        else {
            $('#ConfirmationMessage').text('VINが正常に削除されました');
        }

        GetDropdownlistDetails();

    });
}
function InitializeUrl() {
    //LoaderShow();
    var ApiFunc = '../Home/PageLoadData/';
    JsonPostMethod(ApiFunc, '', '', function (data) {
        if (data != null && data != '') {
            UserDetails = data;
            Api = UserDetails.Api;
            Token = UserDetails.Token;
            ProgressMonitorFromandEndDate();
            GetDropdownlistDetails();
           // GetDropdownlistDetails1();

            if (UserDetails.RoleId == 6) {
                if (UserDetails.AccessDetails.length > 0) {

                    $("#liProgressMonitor").hide();
                    $("#liQFLFeedback").hide()
                    $("#menuExtras").hide();
                    $("#limenuReports").hide();
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

                $("#RevercompletionId").hide();
            }
            else {
                $("#liProgressMonitor").show();
                $("#liQFLFeedback").show()
                $("#menuExtras").show();
                $("#limenuReports").show();
                $("#RevercompletionId").show();
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

            ProgressMonitor(PlantId);
            MaintainPlantId(PlantId);
        }

        if (UserDetails.PlantId != 0) {
            ProgressMonitor(UserDetails.PlantId);
        }


        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());

            ProgressMonitor(PlantId);
            MaintainPlantId(PlantId);
        });


        if (UserDetails.Language == "") {
            $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val());

        }
        else {
            $('.Languagepicker').selectpicker('val', UserDetails.Language);

            Conversion($('.Languagepicker').val());
        }
    });

 
}


function Serach() {
    result = "";
    fromcounts = 0;
    tocounts = 0;
    var PlantId = $('#drpPlant').val();
    ProgressMonitor(PlantId);
}

function DateConvert(date) {
    var datearray = date.split("/");

    return (datearray[1] + '/' + datearray[0] + '/' + datearray[2]);
}


function ProgressMonitor(plantid) {


     // alert(daysBetween(startdate, endDate));

    //const startDate = '2020-01-01';
    //const endDate = '2020-01-30';

    //const diffInMs = new Date(endDate) - new Date(startDate)
    //const diffInDays = diffInMs / (1000 * 60 * 60 * 24);


    var startdate = $('#startDate').val();
    var endDate = $('#endDate').val();





    var from = new Date(DateConvert(startdate));
    var To = new Date(DateConvert(endDate));
    const diffTime = Math.abs(To - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var Current = 365;

    var datearrayFrom = startdate.split("/");
    var datearrayFrom = datearrayFrom[2];
    var datearrayTo = endDate.split("/");
    var datearrayTo = datearrayTo[2];
    var datearrayCurrent = new Date().getFullYear();


    //if (datearrayTo == datearrayCurrent) {


    //    if (Current < diffDays) {
    //        // alert(diffDays)
    //        $('#accordions').empty();
    //        if (UserDetails.Language == "en") {
    //            $('#AlertTitle').text("Please select date range witin 1 year");

    //        }
    //        else {
    //            $('#AlertTitle').text("1年以内の日付範囲を選択してください");

    //        }
    //        $('#AlertModal').modal('show');

    //        return false;
    //    }
    //}
    //else if (datearrayFrom != datearrayTo) {

    //    $('#accordions').empty();
    //    if (UserDetails.Language == "en") {
    //        $('#AlertTitle').text("For Historical data retrival, Please select From date and To date from same year");

    //    }
    //    else {
    //        $('#AlertTitle').text("履歴データの取得については、[開始日]と[同じ年の終了日]を選択してください");

    //    }
    //    $('#AlertModal').modal('show');

    //    return false;
    //}


    showloader();
    var json = {
        "plantid": plantid,
        "vinfrom": $('#vinfrom').val(),
        "vinto": $('#vinto').val() == '' ? $('#vinfrom').val() : $('#vinto').val(),
        "fromdate": $('#startDate').val(),
        "todate": $('#endDate').val() == '' ? $('#startDate').val() : $('#endDate').val(),
        "fromcount": 1,
        "tocount": 50
    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'Monitor.svc/GetProgressMonitorData';
    PostMethod(ApiFunc, Input, Token, function (data) {
        BindData(data);
    });


}
var scrolldata = ''

function BindData(data) {
    data = JSON.parse(data);


    $("#IssueDateVINFrom").val($('#vinfrom').val());
    $("#IssueDateVINvinto").val($('#vinto').val());
    $("#IssueFromDate").val($('#startDate').val());
    $("#IssueToDate").val($('#endDate').val());
    $("#IssuePlantId").val(UserDetails.PlantId);

    $('#accordions').empty();
    var Vindata = data.Table1;
    vincount = Vindata.length;
    if (vincount == 0) {
        $('#accordions').append('<span style="margin-left: 558px";>..Records not found..</span>');

    }



    if (data != null && data.Table != null && data.Table1 != null && data.Table.length > 0 && data.Table1.length > 0) {
        var firstItem = _.uniq(data.Table, function (x) {
            return x.LineName;
        });
        var secondItem = data.Table1;

        var lineheader = '';
        var tableheader = '';
        var tablebody = '';
        var tablefooter = '';
        var finaltable = '';
        var tableheaderhide = '';
        var hiddentable = [];
        var designarr = [];
        $.each(firstItem, function (i, item) {
            if (i == 0) {


            } lineheader += '<div id="tab' + i + '" class="panel panel-default"><div class="panel-heading">';
            lineheader += '<a data-toggle="collapse" onclick=ClickLineName("' + encodeURI(item.LineName) + '","progressTableId-' + item.LineId + '",' + item.LineId + ',"progressTableTbody-' + item.LineId + '",' + i + ') class="collapsed" data-parent="#accordions" href="#collapse' + i + '">';
            lineheader += '<h4 class="panel-title"   >' + item.LineName + '<span class="circle pull-right"><i class="fa"></i></span></h4></a></div>';
            tableheader += '<div id="collapse' + i + '" class="panel-collapse collapse"><div class="table-responsive">';
            tableheader += '<table class="table table-bordered" style ="width:' + item.Counts + 'px" >';
            tableheader += '<thead><tr class="tblheadtext"><th style="width: 150px"><span class="trn">VIN</span></th><th style="width: 150px"><span class="trn">Vehicle Type</span></th><th style="width: 150px"><span class="trn">Model</span></th>';
            tableheaderhide += '<div class="AutomatedQFLPage-progressmonitor' + i + '"><table id="progressTableId-' + item.LineId + '" class="table table-bordered text-center" style ="width:' + item.counts + 'px"><thead style="display: none"><tr class="tblheadtext"><th style="width: 150px"><span class="trn">Vin</span></th><th style="width: 150px"><span class="trn">Vehicle Type</span></th><th style="width: 150px"><span class="trn">Model</span></th>';
            designarr.push(".AutomatedQFLPage-progressmonitor" + i + " > .mCustomScrollBox");
            tablebody += '<tbody id="progressTableTbody-' + item.LineId + '">';
            var globaldata = '';
            var globalrework = '';
            var ActiveInactiveItems = '';
            secondItem = $.grep(data.Table1, function (element, index) {
                return element.LineId == item.LineId;
            });

            if (secondItem.length == 0) {
                hiddentable.push('#tab' + i)
            }

            for (var k = 0; k < secondItem.length; k++) {
                tablebody += '<tr class="cursor-pointer">';

                for (var j = 0; j < Object.keys(secondItem[0]).length; j++) {

                    if (j == 0 || j == 1 || j == 2) {


                        tablebody += '<td style="width: 150px">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>';

                        if (j == 0) {
                            globaldata = $.grep(data.Table2, function (element, index) {

                                return element.VINNumber == secondItem[k][Object.keys(secondItem[k])[j]] 
                                    && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                            });

                            globalrework = $.grep(data.Table3, function (element, index) {

                                return element.VINNumber == secondItem[k][Object.keys(secondItem[k])[j]]
                                    && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                            });
                            tablebody += '<td style="width: 150px;display:none;" class="progsVinNumber">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>'; // No header only hidden field for variant and modalid


                        }
                        if (j == 1) {

                            tablebody += '<td style="width: 150px; display:none;" class="progsVehicleName">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>'; // No header only hidden field for variant and modalid

                        }
                        if (j == 2) {

                            tablebody += '<td style="width: 150px;display:none;" class="progsModelName">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>'; // No header only hidden field for variant and modalid
                        }
                    }
                    else if (Object.keys(secondItem[0])[j] != "LineId" && Object.keys(secondItem[0])[j] != "Rework" && Object.keys(secondItem[0])[j] != "Reexam" && Object.keys(secondItem[0])[j] != "Reexam1") {


                        var filtergate = $.grep(data.Table, function (element, index) {
                            return element.QGateId == Object.keys(secondItem[0])[j].split('_')[1] && element.LineId == item.LineId;
                        });

                        //ActiveInactiveItems = $.grep(data.Table4, function (element, index) {
                        //    return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] && element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                        //        && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                        //});

                        if (filtergate.length != 0) {
                            if (secondItem[k][Object.keys(secondItem[k])[j]] == 1) {
                                globaldata = $.grep(data.Table2, function (element, index) {
                                    return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] && element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                                        && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                                });
                                var color = '';
                                if (globaldata[0].CompletedDate != null && globaldata[0].CompletedDate != '' && globaldata[0].CompletedDate != '1900-01-01')
                                    color = '#00FF00';
                                else
                                    color = '#fff';
                                tablebody += '<td  style="background:' + color + ';width: 150px;" >' + ConvertProgressMonitorDayandYear(globaldata[0].Date);
                                tablebody += '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                            }
                            else if (Math.round(secondItem[k][Object.keys(secondItem[k])[j]]) == 2) {

                                globaldata = $.grep(data.Table2, function (element, index) {
                                    return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] &&
                                        element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                                        && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                                });
                                var color = '';
                                if (globaldata[0].CompletedDate != null && globaldata[0].CompletedDate != '' && globaldata[0].CompletedDate != '1900-01-01')
                                    color = '#00FF00';
                                else
                                    color = '#fff';
                                tablebody += '<td  style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globaldata[0].Date); tablebody += '<div data-toggle="tooltip" data-placement="top" data-original-title="QG not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i><span>' + globaldata[0].Denomerator + '</span></div></td>';
                            }
                            else if (secondItem[k][Object.keys(secondItem[k])[j]] == 3) {

                                globaldata = $.grep(data.Table2, function (element, index) {
                                    return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] &&
                                        element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                                        && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                                });
                                var color = '';
                                if (globaldata[0].CompletedDate != null && globaldata[0].CompletedDate != '' && globaldata[0].CompletedDate != '1900-01-01')
                                    color = '#00FF00';
                                else
                                    color = '#fff';
                                tablebody += '<td  style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globaldata[0].Date); tablebody += '<div data-toggle="tooltip" data-placement="top" data-original-title="QG In Progress"><i title="In-Progress" class="fas fa-chart-line color-main"></i></div></td>';
                            }
                            else {

                                    tablebody += '<td style="width: 150px;"></td>'
                                
                            }

                            if (k == 0) {
                                tableheader += '<th style="width: 150px;">' + Object.keys(secondItem[0])[j].split('_')[0] + '</th>';
                                tableheaderhide += '<th style="width: 150px;">' + Object.keys(secondItem[0])[j].split('_')[0] + '</th>';
                            }
                        }
                    }

                    //if (globalrework[0].VINNumber == "33096")
                    //{
                    //    var a = globalrework[0].VINNumber;
                    //}
                    else if (Object.keys(secondItem[0])[j] == "Rework" && Object.keys(secondItem[0])[j] != "LineId") {

                  // periyan

                        if (globalrework[0].ReWorkCompletedDate != null && globalrework[0].ReWorkCompletedDate != '' && globalrework[0].ReWorkCompletedDate != '1900-01-01' && globalrework[0].ReWorkCompletedDate != '1900-01-01T00:00:00')
                            color = '#00FF00';
                        else
                            color = '#fff';
                        var Numerator = 0;
                        var Denomerator = 0

                        if (globalrework.length > 1) {
                            Numerator = globalrework[0].Numerator + globalrework[1].Numerator
                            Denomerator = globalrework[0].Denomerator + globalrework[1].Denomerator
                        }
                        else {
                            Numerator = globalrework[0].Numerator
                            Denomerator = globalrework[0].Denomerator
                        }


                        tablebody += '<td style="background:' + color + ';width: 150px;"><div data-toggle="modal" data-target="#myModal">' + ConvertProgressMonitorDayandYear(globalrework[0].ReWorkCompletedDate1);
                        tablebody += '<br> <i class="far fa-circle reworkConfirmationCircle color-circle"></i>'
                            + Numerator + '/' + '' + Denomerator + '</div></td>';
                    }
                    else if (Object.keys(secondItem[0])[j] == "Reexam" && Object.keys(secondItem[0])[j] != "LineId") {

                        if (globalrework[0].ReExaminationGateId == 1) {

                            if (globalrework[0].ReExaminationCompletedDate != null && globalrework[0].ReExaminationCompletedDate != '' && globalrework[0].ReExaminationCompletedDate != '1900-01-01' && globalrework[0].ReExaminationCompletedDate != '1900-01-01T00:00:00')
                                color = '#00FF00';
                            else
                                color = '#fff';

                            if (globalrework[0].Denomerator != 0 && globalrework[0].Numerator == globalrework[0].Denomerator && globalrework[0].Rework == 0) {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                            }
                            else if (globalrework[0].Rework != 0) {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i>' + globalrework[0].Rework + '</div></td>';

                            }
                            else if (color == "#00FF00") {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';

                                //tablebody += '<td  style="background:' + color + ';width: 150px;"><div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>'
                            }
                            else { tablebody += '<td style="width: 150px;"></td>' }
                        }

                        else {
                            tablebody += '<td style="width: 150px;"></td>'
                        }



                    }



                    else if (Object.keys(secondItem[0])[j] == "Reexam1" && Object.keys(secondItem[0])[j] != "LineId") {


                        if (globalrework.length > 1) {
                            if (globalrework[1].ReExaminationGateId == 2) {

                                if (globalrework[1].ReExaminationCompletedDate != null && globalrework[1].ReExaminationCompletedDate != '' && globalrework[1].ReExaminationCompletedDate != '1900-01-01' && globalrework[1].ReExaminationCompletedDate != '1900-01-01T00:00:00')
                                    color = '#00FF00';
                                else
                                    color = '#fff';

                                if (globalrework[1].Denomerator != 0 && globalrework[1].Numerator == globalrework[1].Denomerator && globalrework[1].Rework == 0) {
                                    tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[1].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                                }
                                else if (globalrework[1].Rework != 0) {
                                    tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[1].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i>' + globalrework[1].Rework + '</div></td>';

                                }
                                else if (color == "#00FF00") {
                                    tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[1].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                                }
                                else {
                                    tablebody += '<td style="width: 150px;"></td>'
                                }
                            }
                        }
                        else {
                            if (globalrework[0].ReExaminationGateId == 2) {

                                if (globalrework[0].ReExaminationCompletedDate != null && globalrework[0].ReExaminationCompletedDate != '' && globalrework[0].ReExaminationCompletedDate != '1900-01-01' && globalrework[0].ReExaminationCompletedDate != '1900-01-01T00:00:00')
                                    color = '#00FF00';
                                else
                                    color = '#fff';

                                if (globalrework[0].Denomerator != 0 && globalrework[0].Numerator == globalrework[0].Denomerator && globalrework[0].Rework == 0) {
                                    tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                                }
                                else if (globalrework[0].Rework != 0) {
                                    tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i>' + globalrework[0].Rework + '</div></td>';

                                }

                                else if (color == "#00FF00") {
                                    tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                                }
                                else {
                                    tablebody += '<td style="width: 150px;"></td>'
                                }
                            }
                            else {

                                tablebody += '<td style="width: 150px;"></td>'
                            }
                        }




                    }
                    else {

                    }

                }

                tablebody += '</tr>'
            }
            tableheader += '<th style="width: 150px;"><span class="trn">Rework</span></th>';
            tableheader += '<th style="width: 150px;"><span class="trn">QG Re-Examination</span></th>';
            tableheader += '<th style="width: 150px;"><span class="trn">完成 Re-Examination</span></th></tr></thead></table>';

            tableheaderhide += '<th style="width: 150px;"><span class="trn">Rework</span></th>';
            tableheaderhide += '<th style="width: 150px;"><span class="trn">QG Re-Examination</span></th>';
            tableheaderhide += '<th style="width: 150px;"><span class="trn">完成 Re-Examination</span></th></tr></thead>';

            tablefooter += '</tbody></table ></div></div></div></div>';

            if (tablebody == '<tbody><tr class="cursor-pointer">') {
                hiddentable.push('#tab' + i)
            }
            else {

                $('#tab' + i).css('display', '');
            }

            finaltable += lineheader + tableheader + tableheaderhide + tablebody + tablefooter;
            lineheader = ''; tableheader = ''; tablebody = ''; tablefooter = ''; tableheaderhide = '';



        });

        $('#accordions').html(finaltable);
        console.log(finaltable)


        for (var i = 0; i < hiddentable.length; i++) {
            $(hiddentable[i]).css('display', 'none');
        }

        for (var i = 0; i < designarr.length; i++) {
            $(".AutomatedQFLPage-progressmonitor" + i).mCustomScrollbar({

                scrollbarPosition: "outside",
                theme: "minimal-dark",
                callbacks: {
                    onTotalScroll: function () {
                        ScrollDataLoad();
                    }

                }
            });
            $height = $(window).height() - 480;

            $(".AutomatedQFLPage-progressmonitor" + i).height($height);
            $(designarr[i]).css("width", firstItem[i].Counts + "px").css("max-width", firstItem[i].Counts + "px")
            $('.AutomatedQFLPage-progressmonitor' + i).css("width", firstItem[i].Counts + "px")
            $('#collapse' + i).translate({ lang: $('.Languagepicker').val(), t: dict });
        }



        //$(".AutomatedQFLPage-progressmonitor1").height($height);

        //$('#collapse0,#collapse1').translate({ lang: $('.Languagepicker').val(), t: dict });

        //$('.AutomatedQFLPage-progressmonitor0 > .mCustomScrollBox').css("width", firstItem[0].Counts + "px").css("max-width", firstItem[0].Counts + "px")
        //$('.AutomatedQFLPage-progressmonitor0').css("width", firstItem[0].Counts + "px")

        //$('.AutomatedQFLPage-progressmonitor1 > .mCustomScrollBox').css("width", firstItem[1].Counts + "px").css("max-width", firstItem[1].Counts + "px")
        //$('.AutomatedQFLPage-progressmonitor1').css("width", firstItem[1].Counts + "px")


        ////Added for Testing Gate
        //$(".AutomatedQFLPage-progressmonitor2").mCustomScrollbar({

        //    scrollbarPosition: "outside",
        //    theme: "minimal-dark"
        //});
        //$height = $(window).height() - 480;

        //$(".AutomatedQFLPage-progressmonitor2").height($height);


        //$(".AutomatedQFLPage-progressmonitor2").mCustomScrollbar({

        //    scrollbarPosition: "outside",
        //    theme: "minimal-dark"
        //});
        //$('#collapse2').translate({ lang: $('.Languagepicker').val(), t: dict });

        //$('.AutomatedQFLPage-progressmonitor2 > .mCustomScrollBox').css("width", firstItem[2].Counts + "px").css("max-width", firstItem[2].Counts + "px")
        //$('.AutomatedQFLPage-progressmonitor2').css("width", firstItem[2].Counts + "px")
        //Ended

    }

    hideloader();
}



function ConvertProgressMonitorDayandYear(str) {
    var newdate = "";
    if (str != null && str != '') {
        var arr = str.split('-');
        newdate = arr[1] + '/' + arr[0];
    }
    else {
        newdate = "";
    }
    return newdate
}

//--------------- ProgressMonitor VINHistory Details Below Add Jak 21-04-2020---------


function CallVINHistoryDetails() {

    var json = {
        "plantid": $('#drpPlant').val(),
        "VINNumber": HistoryVIN,
        "ModelName": ModelName
    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'Monitor.svc/ProgressMonitorVINHistory';
    PostMethod(ApiFunc, Input, Token, function (data) {

        $('#myModal').modal('show');
        $('#VINHistoryPopUp').text('');
        BindVINHistoryData(data);

    });
}


function BindVINHistoryData(data) {

    console.log(data);
    $("#vinDelete").hide();

    if (UserDetails.RoleId == 1 || UserDetails.RoleId == 3) {
        $("#vinDelete").show();
    }
    $('#excelId').val(HistoryVIN);
    var HistoryHTML = "";
    $('#VINHistoryVINName').text(HistoryVIN); //------Bind the VIN Name Here


    if (data.HistoryGateDetails != null && data.HistoryGateDetails.length > 0) {

        for (var i = 0; i < data.HistoryGateDetails.length; i++) {

            var GateName = data.HistoryGateDetails[i]["GateName"].toString(); //----- Assign Gate Name 
            if (GateName != 'Seal' && GateName != "Comments") {
                HistoryHTML += ' <div class="col-sm-12">'
                HistoryHTML += ' <div class="progressmonitor-heading" id="VINHistroyHeader">';


                if (GateName == "ReExamination") {
                    HistoryHTML += ' <h4 class="trn">' + "QG Re-Examination" + '</h4>'; //------- Bind the QgateName Here
                }
                else if (GateName == "ReExamination1") {
                    HistoryHTML += ' <h4 class="trn">' + "完成 Re-Examination" + '</h4>'; //------- Bind the QgateName Here
                }
                else {
                    HistoryHTML += ' <h4 class="trn">' + GateName + '</h4>'; //------- Bind the QgateName Here
                }

                HistoryHTML += ' </div>';
                HistoryHTML += ' <table class="table table-bordered table-condensed table-hover text-center mt-10">';

                HistoryHTML += ' <thead>';
                HistoryHTML += ' <tr>';
                if (GateName == 'Rework' || GateName == 'ReExamination' || GateName == 'ReExamination1') {
                    HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">Qgate</span></th>';
                  
                }
                HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">PartName</span></th>';

                if (GateName == 'Rework' || GateName == 'ReExamination' || GateName == 'ReExamination1') {
                  
                    HistoryHTML += ' <th class="text-center" style="width: 15%"><span class="trn">Defect</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 5%"><span class="trn">Photo</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 5%"><span class="trn">Comments</span></th>';
                }

                if (GateName != 'Rework' && GateName != 'ReExamination' && GateName != 'ReExamination1') {
                    HistoryHTML += ' <th class="text-center" style="width: 30%"><span class="trn">Check Item</span></th>';
                }
                HistoryHTML += ' <th class="text-center" style="width: 5%"><span class="trn">Status</span></th>';

                if (GateName != 'Rework' && GateName != 'ReExamination' && GateName != 'ReExamination1') {
                    HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">Checked On</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 15%"><span class="trn">Checked By</span></th>';
                }

                if (GateName == 'Rework') {
                 
                    HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">Checked On</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 15%"><span class="trn">Checked By</span></th>';

                    HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">Completed On</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 15%"><span class="trn">Completed By</span></th>';
                }

                if (GateName == 'ReExamination' || GateName == 'ReExamination1') {
              

                    HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">Completed On</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 15%"><span class="trn">Completed By</span></th>';

                    HistoryHTML += ' <th class="text-center" style="width: 10%"><span class="trn">ReExamination On</span></th>';
                    HistoryHTML += ' <th class="text-center" style="width: 15%"><span class="trn">ReExamination By</span></th>';
                }

                HistoryHTML += ' </tr>';
                HistoryHTML += ' </thead>';
                HistoryHTML += ' <tbody>';

                for (var j = 0; j < data.HistoryVINDetails.length; j++) {

                    var OuterGateId = data.HistoryGateDetails[i]["GateId"].toString()
                    var InnerGateId = data.HistoryVINDetails[j]["GateId"].toString()
                    var actual = data.HistoryVINDetails[j]["ActualID"]

                    if (OuterGateId == InnerGateId) {

                        HistoryHTML += ' <tr>';
                        if (GateName == "Rework" || GateName == 'ReExamination' || GateName == 'ReExamination1') {
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["GateName"].toString() + '</td>';

                        }
                        HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["PartName"].toString() + '</td>';

                        if (GateName == 'Rework' || GateName == 'ReExamination' || GateName == 'ReExamination1') {

                            var CommentsChecked = $.grep(data.CommentsCheck, function (element, index) {
                                return element.QFLFeedbackWorkflowId == data.HistoryVINDetails[j]["QFLFeedbackWorkflowId"];
                            });


                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["DefectPlace"].toString() + '</td>';
                            if (data.HistoryVINDetails[j]["NotOkUploadImage"] != null && data.HistoryVINDetails[j]["NotOkUploadImage"] != "") {
                                HistoryHTML += ' <td>' + '<img onclick="btnOpenUploadedImage(\'' + data.HistoryVINDetails[j]["NotOkUploadImage"] + '\')"  style="width:50px" src="../Images/imagegallery.jpg" />' + '</td>';

                            }
                            else {
                                HistoryHTML += ' <td>' + '<img   style="width:27px" src="../Images/BlankImage.png" />' + '</td>';

                            }

                            if (CommentsChecked.length > 0) {


                                HistoryHTML += '<td style="" class="checkdisabled"> <a href="#" DefectValue="' + data.HistoryVINDetails[j]["DefectPlace"].toString() + '" id="communicationid_' + data.HistoryVINDetails[j]["QFLFeedbackWorkflowId"] + '"  class="btn  " onclick=btnReExamCommunicate(this,' + data.HistoryVINDetails[j]["VinId"] + ',' + data.HistoryVINDetails[j]["QFLFeedbackWorkflowId"] + ',"' + encodeURI(data.HistoryVINDetails[j]["PartName"]) + '","' + HistoryVIN + '")  class=" " data-toggle="tooltip" title="comment"   aria-hidden="true" id="" style=""><i id="" class="fas fa-comments text-gray"></i></a></td >';
                            }
                            else {
                                HistoryHTML += '<td style="" class="checkdisabled"> <a href="#" DefectValue="' + data.HistoryVINDetails[j]["DefectPlace"].toString() + '" id="communicationid_' + data.HistoryVINDetails[j]["QFLFeedbackWorkflowId"] + '"  class="btn btn-comment checkdisabled " onclick=btnReExamCommunicate(this,' + data.HistoryVINDetails[j]["VinId"] + ',' + data.HistoryVINDetails[j]["QFLFeedbackWorkflowId"] + ',"' + encodeURI(data.HistoryVINDetails[j]["PartName"]) + '","' + HistoryVIN + '")  class=" " data-toggle="tooltip" title="comment"   aria-hidden="true" id="" style=""><i id="" class="fas fa-comments"></i></a></td >';

                            }
                        }

                        if (GateName != 'Rework' && GateName != 'ReExamination' && GateName != 'ReExamination1') {

                        HistoryHTML += ' <td>';
                        var mrl = "ml-n29";
                        if (data.HistoryVINDetails[j]["Attachment"].toString() == "Yes") {
                            //alert(actual);

                            HistoryHTML += ' <span class="pull-left ml-10" data-toggle="modal" onclick=btncomments("' + actual + '") data-target="#"><i class="fas fa-comments" style="color: gray; font-size: 18px; cursor: pointer;display:none"></i></span>';
                        }
                        else {
                            if (actual != 0) {
                                HistoryHTML += ' <span class="pull-left ml-10" data-toggle="modal" onclick=btncomments("' + actual + '") data-target="#"><i class="fas fa-comments" style="color: gray; font-size: 18px; cursor: pointer;display:none"></i></span>';
                            }
                        }
                        //HistoryHTML += ' <div></div>';
                            HistoryHTML += '  <div class="' + mrl + '"><span >' + data.HistoryVINDetails[j]["CheckItem"].toString() + '</span></div>';
                       
                            HistoryHTML += ' </td>';
                        }
                        //if (GateName == 'Rework')
                        //{
                        //   // var a = data.HistoryVINDetails[j]["Status"].toString();

                          
                        //}
                       // var status = data.HistoryVINDetails[j]["Status"].toString();
                        if (data.HistoryVINDetails[j]["Status"].toString() == "Ok") { // ---- Here check Ok, Not Ok, Skip Status

                            if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["NotOkcount"].toString() != 0 && data.HistoryVINDetails[j]["ReExamOkCount"].toString() != 0) {

                               // HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';


                                 HistoryHTML += ' <td><span class="btn-check-check" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + ','+data.HistoryVINDetails[j]["ReExamOkCount"].toString()+'</span>';


                                //HistoryHTML += '<span class="btn-okcountcolor">' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + '</span>';
                                //HistoryHTML += '<span class="btn-ReExamokcountcolor">' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span>';

                                HistoryHTML += ' <span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';
                            }
                            else if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["ReExamOkCount"].toString() != 0) {
                                HistoryHTML += ' <td><span class="btn-check-check" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';

                              //  HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';


                                //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + data.HistoryVINDetails[j]["ReExamOkCount"].toString()+ '</span>';

                                //HistoryHTML += '<span class="btn-okcountcolor">' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + '</span>';
                                //HistoryHTML += '<span class="btn-ReExamokcountcolor">' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span>';
                            }
                            else {
                                if (data.HistoryVINDetails[j]["Okcount"].toString() != 0) {
                                     // HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';

                                    if (GateName == "Rework" || GateName == "ReExamination" || GateName == "ReExamination1") {
                                        HistoryHTML += (' <td><img  id="" src="../Images/ReExam.jpg" /> </td>');

                                    }
                                    else {
                                        HistoryHTML += ' <td><span class="btn btn-check-none not-ok-sample" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';

                                    }

                                    // HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + '</span></td>';
                                }
                                else if (data.HistoryVINDetails[j]["NotOkcount"].toString() != 0) {
                                    HistoryHTML += ' <td><span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                    HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';
                                }
                                else if (data.HistoryVINDetails[j]["Okcount"].toString() != 0) {

                                    //HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';
                                    HistoryHTML += ' <td><span class="btn-check-check" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                    // HistoryHTML += '<span>' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span></td>';
                                }

                            }

                            if (GateName != 'Rework' && GateName != 'ReExamination' && GateName != 'ReExamination1') {
                                if (data.HistoryVINDetails[j]["Skipcount"].toString() != 0) {
                                    HistoryHTML += '<span class="btn btn-skip-none not-ok-sample" data-toggle="tooltip" title="Skip" aria-hidden="true" data-original-title="OK"><i class="fas fa-share" style=""></i></span>';
                                    //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Skipcount"].toString() + '</span></td>';
                                }
                            }
                        }
                        else if (data.HistoryVINDetails[j]["Status"].toString() == "Not Ok") {

                            if (GateName == "Rework" || GateName == "ReExamination" || GateName == "ReExamination1") {
                                if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["NotOkcount"].toString() != 0) {


                                    HistoryHTML += ' <td><span class="btn btn-check-none  not-ok-sample" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                    HistoryHTML += ' <span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                    HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';



                                }

                                else {
                                    if (data.HistoryVINDetails[j]["Okcount"].toString() != 0) {
                                        HistoryHTML += ' <td><span class="btn btn-check-none not-ok-sample" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                        HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + '</span></td>';
                                    }
                                    if (data.HistoryVINDetails[j]["NotOkcount"].toString() != 0) {
                                        HistoryHTML += (' <td><img  id="" src="../Images/NotOk.jpg" /> </td>');

                                        // HistoryHTML += ' <td><span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                        //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';
                                    }
                                }
                            }
                            else {
                                if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["NotOkcount"].toString() != 0 && data.HistoryVINDetails[j]["ReExamOkCount"].toString() != 0) {



                                    HistoryHTML += ' <td><span class="btn-check-check" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                    // HistoryHTML += '<span class="btn-okcountcolor">' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + '</span>';
                                    // HistoryHTML += '<span class="btn-ReExamokcountcolor">' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span>';
                                    HistoryHTML += ' <span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                    HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';

                                }

                                else if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["ReExamOkCount"].toString() != 0) {
                                    HistoryHTML += ' <td><span class="btn-check-check" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                    //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + data.HistoryVINDetails[j]["ReExamOkCount"].toString()+ '</span>';
                                    // HistoryHTML += '<span class="btn-okcountcolor">' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + '</span>';
                                    // HistoryHTML += '<span class="btn-ReExamokcountcolor">' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span>';
                                }

                                else if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["NotOkcount"].toString() != 0) {

                                    HistoryHTML += ' <td><span class="" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="" style=""></i> </span>';
                                    HistoryHTML += ' <span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                    HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';

                                }

                                else if (data.HistoryVINDetails[j]["NotOkcount"].toString() != 0 && data.HistoryVINDetails[j]["ReExamOkCount"].toString() != 0) {



                                    HistoryHTML += ' <td><span class="btn-check-check" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';

                                    HistoryHTML += ' <span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                    HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';

                                }

                                else {
                                    if (data.HistoryVINDetails[j]["Okcount"].toString() != 0) {
                                        HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';


                                       // HistoryHTML += ' <td><span class="btn btn-check-none not-ok-sample" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                        // HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + '</span></td>';
                                    }
                                    else if (data.HistoryVINDetails[j]["NotOkcount"].toString() != 0) {
                                        HistoryHTML += ' <td><span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                        HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span></td>';
                                    }
                                    else if (data.HistoryVINDetails[j]["Okcount"].toString() != 0) {
                                        HistoryHTML += ' <td><span class="btn-check-check" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                        //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span></td>';
                                    }

                                }
                            }
                        }
                        else if (data.HistoryVINDetails[j]["Status"].toString() == "Skip") {
                            //HistoryHTML += ' <td><span class="btn btn-check-none not-ok-sample" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                            //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + '</span>';
                            //HistoryHTML += ' <span class="btn btn-closed-none not-ok-sample" data-toggle="tooltip" title="Not Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                            //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["NotOkcount"].toString() + '</span>';
                            if (data.HistoryVINDetails[j]["Skipcount"].toString() != 0) {
                                HistoryHTML += '<td><span class="btn btn-skip-none not-ok-sample" data-toggle="tooltip" title="Skip" aria-hidden="true" data-original-title="OK"><i class="fas fa-share" style=""></i></span>';
                                //  HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Skipcount"].toString() + '</span></td>';
                            }
                        }


                        else if (data.HistoryVINDetails[j]["Status"].toString() == "ReExam Ok") { // ---- Here check Ok, Not Ok, Skip Status

                            if (data.HistoryVINDetails[j]["Okcount"].toString() != 0 && data.HistoryVINDetails[j]["ReExamOkCount"].toString() != 0) {
                                //HistoryHTML += ' <td><span class="btn btn-check-none  not-ok-sample" data-toggle="tooltip" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';
                                //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + '</span>';
                                //HistoryHTML += ' <span class="btn-check-check" data-toggle="tooltip" title="Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-times" style=""></i></span>';
                                //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span></td>';

                               // HistoryHTML += ' <td><span class="btn-check-check" title="ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i> </span>';

                                HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';


                                //HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span>';
                                // HistoryHTML += '<span class="btn-okcountcolor">' + data.HistoryVINDetails[j]["Okcount"].toString() + ',' + '</span>';
                                //HistoryHTML += '<span class="btn-ReExamokcountcolor">' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span>';
                            }

                            else {
                                HistoryHTML += ' <td><span class="btn-check-check" data-toggle="tooltip" title="Ok" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i></span>';
                                //HistoryHTML += '<span class="btn-ReExamokcountcolor">' + data.HistoryVINDetails[j]["ReExamOkCount"].toString() + '</span></td>';
                            }




                        }



                        else {
                            HistoryHTML += ' <td><img  id="" src="../Images/ReExam.jpg" /> </span>';
                           // HistoryHTML += ' <td><span class="btn btn-check-none not-ok-sample" data-toggle="tooltip" title="" aria-hidden="true" data-original-title="OK"><i class="fas fa-check" style=""></i></span>';
                            //   HistoryHTML += '<span>' + data.HistoryVINDetails[j]["Okcount"].toString() + '</span></td>';
                        }

                        if (GateName != 'Rework' && GateName != 'ReExamination' && GateName != 'ReExamination1') { // ---- Here check DateTime

                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["CreatedDateTime"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["UserName"].toString() + '</td>';
                        }

                        else if (GateName == 'Rework') {

                           
                         
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["CreatedDateTime"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["UserName"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["ReworkModifiedDateTime"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["ReworkModifiedBys"].toString() + '</td>';
                        }
                        else if (GateName == 'ReExamination' || GateName == 'ReExamination1') {
                          

                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["CreatedDateTime"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["UserName"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["ReworkExaminationDateTime"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["ReExaminationModifiedBy"].toString() + '</td>';
                        }
                        else {
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["CreatedDateTime"].toString() + '</td>';
                            HistoryHTML += ' <td>' + data.HistoryVINDetails[j]["UserName"].toString() + '</td>';

                        }
                        //if (GateName == 'Rework' || GateName == 'ReExamination') {
                        //    HistoryHTML += ' <td>2020/03/20 14:25 JST</td>';
                        //    HistoryHTML += ' <td>S,Sathish kumar (575)</td>';
                        //}
                        HistoryHTML += ' </tr>';

                    }
                }
                HistoryHTML += ' </tbody>';
                HistoryHTML += ' </table>';
                HistoryHTML += ' </div>';
            }
        }

        $('#VINHistoryPopUp').append(HistoryHTML);
        $('#VINHistoryPopUp').translate({ lang: $('.Languagepicker').val(), t: dict });
    }

}
function DownloadCommentFiles(DwdGUID, DwdFileName) {
    if (DwdFileName == "") {


        $('#DynamicAlertModal').modal('show');
        if (UserDetails.Language == "en") {
            $('#hTitle3').text('Comments File is Not Available..!');
        }
        else {
            $('#hTitle3').text('このCommentsで使用できるファイルはありません');
        }


        return false;
    }
    else {

        window.location.href = "../Home/DownLoadCommentsFile?StandardMasterfilename=" + DwdGUID + "&filename=" + DwdFileName;
    }

}

function btncomments(actualid) {



    $('#actualvalue').val('');
    $('#responsible').val('');
    $('#damagecode').val('');
    $('#textareacomments').val('');




    $("#AttachmentUpload").empty();






    if (actualid != 0) {

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




                var html = [];
                var standmasterdetails = data.ActualComments;

                $.each(standmasterdetails, function (i, StandMaster) {


                    var deleteenable = 'none';
                    //alert(StandMaster.filesize);
                    var fsize = (StandMaster.filesize / 1024).toFixed(2);

                    html += '<div class="col-md-6 mt-20"><div class=" attachment-border"> <div class="row"><div class="col-md-3 col-sm-3"><img alt="" class="img-responsive" src="../Images/' + CheckFileType(StandMaster.filename) + '"> <p class="mbsize">'
                        + '<span> ' + fsize.toString() + " MB" + '</span ></p >'
                        + '</div><div class="col-md-9 col-sm-9"><h4 class="overflow-attachment1"> ' + StandMaster.filename + '</h4><p class="overflow-attachment2">' + data.username + ' </p>'
                        + '<label class="overflow-attachment3">' + StandMaster.createddate + '</label> <span class="pull-right btn-group" style="display:' + deleteenable + '"   onClick = ""><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-trash"></span></i> </span>'
                        + '<span class="pull-right btn-group" onClick ="DownloadCommentFiles(\'' + data.foldername + '\', \'' + StandMaster.filename + '\')"><i data-container="body" data-toggle="tooltip" data-placement="top" title="" type="button" class="btn btn-success btn-xs mr-5" data-original-title="Download"><span class="glyphicon glyphicon-save"></span></i> </span>'
                        + '</div></div></div></div>';



                });


                //content.push('</div>');

                $("#AttachmentUpload").append(html);
            }
        });
    }

    $('#actual_comment').modal('show');





}

function NewProgress() {
    var ApiFunc = '../Home/ProgressMonitorNew';
    window.location.href = ApiFunc;

}
function AllProgress() {
    var ApiFunc = '../Home/ProgressMonitorAll';
    window.location.href = ApiFunc;

}


function vinHistroyExcelDownload() {
    var vinName = $(this.excelId).val();
    var PlantId = UserDetails.PlantId;
    document.location.href = "../Home/VINHistoryDownloadExcel?PlantId=" + PlantId + "&VIN=" + vinName + "&ModelName=" + ModelName ;
}

function vinHistroyExcelDownloadExcel() {
    showloader();

    var PlantId = $('#drpPlant').val();
    var vinfrom = $('#vinfrom').val();
    var vinto = $('#vinto').val();
    var Fromdate = $('#startDate').val();
    var Todate = $('#endDate').val();


    var startdate = $('#startDate').val();
    var endDate = $('#endDate').val();





    var from = new Date(DateConvert(startdate));
    var To = new Date(DateConvert(endDate));
    const diffTime = Math.abs(To - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var Current = 365;

    var datearrayFrom = startdate.split("/");
    var datearrayFrom = datearrayFrom[2];
    var datearrayTo = endDate.split("/");
    var datearrayTo = datearrayTo[2];
    var datearrayCurrent = new Date().getFullYear();


    //if (datearrayTo == datearrayCurrent) {


    //    if (Current < diffDays) {
    //        // alert(diffDays)
    //        $('#accordions').empty();
    //        if (UserDetails.Language == "en") {
    //            $('#AlertTitle').text("Please select date range witin 1 year");

    //        }
    //        else {
    //            $('#AlertTitle').text("1年以内の日付範囲を選択してください");

    //        }
    //        $('#AlertModal').modal('show');

    //        return false;
    //    }
    //}
    //else if (datearrayFrom != datearrayTo) {

    //    $('#accordions').empty();
    //    if (UserDetails.Language == "en") {
    //        $('#AlertTitle').text("For Historical data retrival, Please select From date and To date from same year");

    //    }
    //    else {
    //        $('#AlertTitle').text("履歴データの取得については、[開始日]と[同じ年の終了日]を選択してください");

    //    }
    //    $('#AlertModal').modal('show');

    //    return false;
    //}



    document.location.href = "../Home/VINHistoryDownloadExcelHistory?PlantId=" + PlantId + "&VINFrom=" + vinfrom + "&VINTo=" + vinto + "&FromDate=" + Fromdate + "&ToDate=" + Todate;

    //document.location.href = "../Home/VINHistoryDownloadExcelHistory?PlantId=" + PlantId + "&Vin=" + vinName + "";

    //Loading(PlantId, vinName);


}


function vinHistroyExcelDownloadExcel1() {

    var PlantId = $('#drpPlant').val();
    var vinfrom = $('#vinfrom').val();
    var vinto = $('#vinto').val();
    var Fromdate = $('#startDate').val();
    var Todate = $('#endDate').val();

    var startdate = $('#startDate').val();
    var endDate = $('#endDate').val();





    var from = new Date(DateConvert(startdate));
    var To = new Date(DateConvert(endDate));
    const diffTime = Math.abs(To - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    var Current = 365;

    var datearrayFrom = startdate.split("/");
    var datearrayFrom = datearrayFrom[2];
    var datearrayTo = endDate.split("/");
    var datearrayTo = datearrayTo[2];
    var datearrayCurrent = new Date().getFullYear();


    //if (datearrayTo == datearrayCurrent) {


    //    if (Current < diffDays) {
    //        // alert(diffDays)
    //        $('#accordions').empty();
    //        if (UserDetails.Language == "en") {
    //            $('#AlertTitle').text("Please select date range witin 1 year");

    //        }
    //        else {
    //            $('#AlertTitle').text("1年以内の日付範囲を選択してください");

    //        }
    //        $('#AlertModal').modal('show');

    //        return false;
    //    }
    //}
    //else if (datearrayFrom != datearrayTo) {

    //    $('#accordions').empty();
    //    if (UserDetails.Language == "en") {
    //        $('#AlertTitle').text("For Historical data retrival, Please select From date and To date from same year");

    //    }
    //    else {
    //        $('#AlertTitle').text("履歴データの取得については、[開始日]と[同じ年の終了日]を選択してください");

    //    }
    //    $('#AlertModal').modal('show');

    //    return false;
    //}

    showloader();


    if (vincount > 50) {
        $("#DynamicAlertModal").modal('show');

        if (UserDetails.Language == "en") {
            $('#hTitle3').text('The Vin is greater than 50 So could not downlaod zip file');
        }
        else {
            $('#hTitle3').text('Vinが50より大きいため、zipファイルをダウンロードできませんでした');
        }
        hideloader();

        return false;
    }

    document.location.href = "../Home/HistoryVinAsZip?PlantId=" + PlantId + "&VINFrom=" + vinfrom + "&VINTo=" + vinto + "&FromDate=" + Fromdate + "&ToDate=" + Todate;




}


function RevertJPCompletion() {

    if (UserDetails.Language == "en") {

        $('#ConfirmationMessageRevert').text('Are you sure? Want to cancel completion of Inspection in ‘完成 Re-Examination’ gate?');
    }
    else {
        $('#ConfirmationMessageRevert').text('本気ですか？ 「再審査完了」ゲートで審査完了をキャンセルしたいですか？');

    }
    $('#ConfirmationpopupRevert').modal('show');

}

function RevertCompetionYes() {
    $('#ConfirmationpopupRevert').modal('hide');
    var VIN = $('#VINHistoryVINName').text();

    var json = {
        "filename": "",
        "vinid": 0,
        "userid": UserDetails.UserId,
        "iscompleted": false,
        "vinnumber": VIN,
        "isreworkcompleted": false,
        "isreexaminationcompleted": false,
        "gatename": "Re-Examination1"
    };




    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/InsertSignature';

    PostMethod(ApiFunc, Input, Token, function (data) {
        Serach();
    });
}

function ProgressMonitorFromandEndDate() {
    var d = new Date();
    var currMonth = d.getMonth();
    var currYear = d.getFullYear();
    //var startDate = new Date(currYear, currMonth, 1);
    var startDate = new Date(currYear, currMonth, (d.getDate() - 7));
    var EndDate = new Date(currYear, currMonth, (d.getDate()));

    $('#startDate').datetimepicker("setDate", startDate);
    $("#endDate").datetimepicker("setDate", EndDate);
}


//function vinHistroyExcelDownloadExcel2() {


//    document.location.href = "../Home/Images";

//    //document.location.href = "../Home/VINHistoryDownloadExcelHistory?PlantId=" + PlantId + "&Vin=" + vinName + "";

//    //Loading(PlantId, vinName);


//}


var GLBLineName = "";
var GLBTableId = "";
var GLBLineid = 0;
var GLBTableTbodt = 0;
var columid = 0;
function ClickLineName(Line, tableId, LineId, TableTbodt, columid) {
    var DecodeLine = decodeURI(Line)
    GLBTableId = tableId;
    GLBLineName = DecodeLine;
    GLBLineid = LineId;
    GLBTableTbodt = TableTbodt;
    columid = columid;
}




var loops = 0;

function ScrollDataLoad() {
    loops = loops + 1;
    console.log("loop = " + loops);
    setTimeout(function () {
        appendData();
    }, 2000);
    appendData();
}
var fromcounts = 0;
var tocounts = 0;
function appendData() {

    var totalRowCount = $('#' + GLBTableId + "> tbody > tr").length;

    fromcounts = parseInt(totalRowCount) + 1;
    tocounts = parseInt(totalRowCount) + 50;



    var json = {
        "plantid": UserDetails.PlantId,
        "vinfrom": $('#vinfrom').val(),
        "vinto": $('#vinto').val() == '' ? $('#vinfrom').val() : $('#vinto').val(),
        "fromdate": $('#startDate').val(),
        "todate": $('#endDate').val() == '' ? $('#startDate').val() : $('#endDate').val(),
        "fromcount": fromcounts,
        "tocount": tocounts,
        "Lineid": GLBLineid
    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'Monitor.svc/GetProgressMonitorData';
    PostMethodforAsync(ApiFunc, Input, Token, function (data) {
        data = JSON.parse(data);
        if (data != null && data.Table != null && data.Table1 != null && data.Table.length > 0 && data.Table1.length > 0) {
            showloader2();
            BindingforScrolldata(data);
            hideloader2();
        }

    });



}
var result = "";
function BindingforScrolldata(data) {
    //data = JSON.parse(data);
    var i = columid;

    if (data != null && data.Table != null && data.Table1 != null && data.Table.length > 0 && data.Table1.length > 0) {
        var firstItem = _.uniq(data.Table, function (x) {
            return x.LineName;
        });
        var secondItem = data.Table1;

        var lineheader = '';
        var tableheader = '';
        var tablebody = '';
        var tablefooter = '';
        var finaltable = '';
        var tableheaderhide = '';
        var hiddentable = [];
        var designarr = [];

        var globaldata = '';
        var globalrework = '';
        secondItem = data.Table1;


        for (var k = 0; k < secondItem.length; k++) {

            tablebody += '<tr class="cursor-pointer">'

            for (var j = 0; j < Object.keys(secondItem[0]).length; j++) {

                if (j == 0 || j == 1 || j == 2) {

                    tablebody += '<td style="width: 150px">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>';

                    if (j == 0) {
                        globaldata = $.grep(data.Table2, function (element, index) {

                            return element.VINNumber == secondItem[k][Object.keys(secondItem[k])[j]]
                                && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                        });

                        globalrework = $.grep(data.Table3, function (element, index) {

                            return element.VINNumber == secondItem[k][Object.keys(secondItem[k])[j]]
                                && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                        });
                        tablebody += '<td style="width: 150px;display:none;" class="progsVinNumber">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>'; // No header only hidden field for variant and modalid


                    }
                    if (j == 1) {

                        tablebody += '<td style="width: 150px; display:none;" class="progsVehicleName">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>'; // No header only hidden field for variant and modalid

                    }
                    if (j == 2) {

                        tablebody += '<td style="width: 150px;display:none;" class="progsModelName">' + secondItem[k][Object.keys(secondItem[k])[j]] + '</td>'; // No header only hidden field for variant and modalid
                    }
                }
                else if (Object.keys(secondItem[0])[j] != "LineId" && Object.keys(secondItem[0])[j] != "Rework" && Object.keys(secondItem[0])[j] != "Reexam" && Object.keys(secondItem[0])[j] != "Reexam1") {

                    var filtergate = $.grep(data.Table, function (element, index) {
                        return element.QGateId == Object.keys(secondItem[0])[j].split('_')[1] && element.LineId == GLBLineid;
                    });
                    if (filtergate.length != 0) {
                        if (secondItem[k][Object.keys(secondItem[k])[j]] == 1) {
                            globaldata = $.grep(data.Table2, function (element, index) {
                                return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] &&
                                    element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                                 && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                            });
                            var color = '';
                            if (globaldata[0].CompletedDate != null && globaldata[0].CompletedDate != '' && globaldata[0].CompletedDate != '1900-01-01')
                                color = '#00FF00';
                            else
                                color = '#fff';
                            tablebody += '<td  style="background:' + color + ';width: 150px;" >' + ConvertProgressMonitorDayandYear(globaldata[0].Date);
                            tablebody += '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                        }
                        else if (Math.round(secondItem[k][Object.keys(secondItem[k])[j]]) == 2) {

                            globaldata = $.grep(data.Table2, function (element, index) {
                                return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] &&
                                    element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                                    && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                            });
                            var color = '';
                            if (globaldata[0].CompletedDate != null && globaldata[0].CompletedDate != '' && globaldata[0].CompletedDate != '1900-01-01')
                                color = '#00FF00';
                            else
                                color = '#fff';
                            tablebody += '<td  style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globaldata[0].Date); tablebody += '<div data-toggle="tooltip" data-placement="top" data-original-title="QG not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i><span>' + globaldata[0].Denomerator + '</span></div></td>';
                        }
                        else if (secondItem[k][Object.keys(secondItem[k])[j]] == 3) {

                            globaldata = $.grep(data.Table2, function (element, index) {
                                return element.QGateId == Object.keys(secondItem[k])[j].split('_')[1] &&
                                    element.VINNumber == secondItem[k][Object.keys(secondItem[k])[0]]
                                    && element.ModelName == secondItem[k][Object.keys(secondItem[k])[2]];
                            });
                            var color = '';
                            if (globaldata[0].CompletedDate != null && globaldata[0].CompletedDate != '' && globaldata[0].CompletedDate != '1900-01-01')
                                color = '#00FF00';
                            else
                                color = '#fff';
                            tablebody += '<td  style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globaldata[0].Date); tablebody += '<div data-toggle="tooltip" data-placement="top" data-original-title="QG In Progress"><i title="In-Progress" class="fas fa-chart-line color-main"></i></div></td>';
                        }
                        else {
                            tablebody += '<td style="width: 150px;"></td>'
                        }

                        if (k == 0) {
                            tableheader += '<th style="width: 150px;">' + Object.keys(secondItem[0])[j].split('_')[0] + '</th>';
                            tableheaderhide += '<th style="width: 150px;">' + Object.keys(secondItem[0])[j].split('_')[0] + '</th>';
                        }
                    }
                }

                else if (Object.keys(secondItem[0])[j] == "Rework" && Object.keys(secondItem[0])[j] != "LineId") {
                    if (globalrework[0].ReWorkCompletedDate != null && globalrework[0].ReWorkCompletedDate != '' && globalrework[0].ReWorkCompletedDate != '1900-01-01' && globalrework[0].ReWorkCompletedDate != '1900-01-01T00:00:00')
                        color = '#00FF00';
                    else
                        color = '#fff';
                    var Numerator = 0;
                    var Denomerator = 0

                    if (globalrework.length > 1) {
                        Numerator = globalrework[0].Numerator + globalrework[1].Numerator
                        Denomerator = globalrework[0].Denomerator + globalrework[1].Denomerator
                    }
                    else {
                        Numerator = globalrework[0].Numerator
                        Denomerator = globalrework[0].Denomerator
                    }


                    tablebody += '<td style="background:' + color + ';width: 150px;"><div data-toggle="modal" data-target="#myModal">' + ConvertProgressMonitorDayandYear(globalrework[0].ReWorkCompletedDate1);
                    tablebody += '<br> <i class="far fa-circle reworkConfirmationCircle color-circle"></i>'
                        + Numerator + '/' + '' + Denomerator + '</div></td>';
                }
                else if (Object.keys(secondItem[0])[j] == "Reexam" && Object.keys(secondItem[0])[j] != "LineId") {
                    // periyan
                    if (globalrework[0].ReExaminationGateId == 1) {

                        if (globalrework[0].ReExaminationCompletedDate != null && globalrework[0].ReExaminationCompletedDate != '' && globalrework[0].ReExaminationCompletedDate != '1900-01-01' && globalrework[0].ReExaminationCompletedDate != '1900-01-01T00:00:00')
                            color = '#00FF00';
                        else
                            color = '#fff';

                        if (globalrework[0].Denomerator != 0 && globalrework[0].Numerator == globalrework[0].Denomerator && globalrework[0].Rework == 0) {
                            tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                        }
                        else if (globalrework[0].Rework != 0) {
                            tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i>' + globalrework[0].Rework + '</div></td>';

                        }
                        else if (color == "#00FF00") {
                            tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';

                            //tablebody += '<td  style="background:' + color + ';width: 150px;"><div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>'
                        }
                        else { tablebody += '<td style="width: 150px;"></td>' }
                    }

                    else {
                        tablebody += '<td style="width: 150px;"></td>'
                    }



                }



                else if (Object.keys(secondItem[0])[j] == "Reexam1" && Object.keys(secondItem[0])[j] != "LineId") {


                    if (globalrework.length > 1) {
                        if (globalrework[1].ReExaminationGateId == 2) {

                            if (globalrework[1].ReExaminationCompletedDate != null && globalrework[1].ReExaminationCompletedDate != '' && globalrework[1].ReExaminationCompletedDate != '1900-01-01' && globalrework[1].ReExaminationCompletedDate != '1900-01-01T00:00:00')
                                color = '#00FF00';
                            else
                                color = '#fff';

                            if (globalrework[1].Denomerator != 0 && globalrework[1].Numerator == globalrework[1].Denomerator && globalrework[1].Rework == 0) {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[1].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                            }
                            else if (globalrework[1].Rework != 0) {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[1].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i>' + globalrework[1].Rework + '</div></td>';

                            }
                            else if (color == "#00FF00") {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[1].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                            }
                            else {
                                tablebody += '<td style="width: 150px;"></td>'
                            }
                        }
                    }
                    else {
                        if (globalrework[0].ReExaminationGateId == 2) {

                            if (globalrework[0].ReExaminationCompletedDate != null && globalrework[0].ReExaminationCompletedDate != '' && globalrework[0].ReExaminationCompletedDate != '1900-01-01' && globalrework[0].ReExaminationCompletedDate != '1900-01-01T00:00:00')
                                color = '#00FF00';
                            else
                                color = '#fff';

                            if (globalrework[0].Denomerator != 0 && globalrework[0].Numerator == globalrework[0].Denomerator && globalrework[0].Rework == 0) {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                            }
                            else if (globalrework[0].Rework != 0) {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Not Passed"><i title="NOT OK" class="fas fa-times notok color-red"></i>' + globalrework[0].Rework + '</div></td>';

                            }

                            else if (color == "#00FF00") {
                                tablebody += '<td style="background:' + color + ';width: 150px;">' + ConvertProgressMonitorDayandYear(globalrework[0].ReExaminationCompletedDate1) + '<div data-toggle="tooltip" data-placement="top" data-original-title="QG Passed"><i title="OK" class="fas fa-check color-green"></i></div></td>';
                            }
                            else {
                                tablebody += '<td style="width: 150px;"></td>'
                            }
                        }
                        else {

                            tablebody += '<td style="width: 150px;"></td>'
                        }
                    }




                }
                else {

                }

            }

            tablebody += '</tr>'
        }



        //if (tablebody == '<tbody><tr class="cursor-pointer">') {
        //    hiddentable.push('#tab' + i)
        //}
        //else {

        //    $('#tab' + i).css('display', '');
        //}

        finaltable += tablebody;
        lineheader = ''; tableheader = ''; tablebody = ''; tablefooter = ''; tableheaderhide = '';




        $('#' + GLBTableId + ' tbody').append(finaltable);

        console.log(finaltable)

        for (var i = 0; i < hiddentable.length; i++) {
            $(hiddentable[i]).css('display', 'none');
        }


        for (var i = 0; i < designarr.length; i++) {
            $(".AutomatedQFLPage-progressmonitor" + i).mCustomScrollbar({

                scrollbarPosition: "outside",
                theme: "minimal-dark",
                callbacks: {
                    onTotalScroll: function () {
                        ScrollDataLoad();
                    }

                }

            });
            $height = $(window).height() - 480;

            $(".AutomatedQFLPage-progressmonitor" + i).height($height);
            $(designarr[i]).css("width", firstItem[i].Counts + "px").css("max-width", firstItem[i].Counts + "px")
            $('.AutomatedQFLPage-progressmonitor' + i).css("width", firstItem[i].Counts + "px")
            $('#collapse' + i).translate({ lang: $('.Languagepicker').val(), t: dict });
        }



    }
    else {
        result = "No Records"
    }


}


function btnOpenUploadedImage( NotOkUploadImage) {
    $("#NotOkUploadImage").modal('show');

    $("#notokImageappend").empty();

    var vin = $('#VINHistoryVINName').text();
    $('#notokImageappend').prepend('<img src="' + UserDetails.SignatureSitePath + vin + "/" + NotOkUploadImage + '"  class="image-thumbnail" alt="img" style="width:100%; ">')
}


var communaicateQFLFeedBackid = 0;
var communaicateGateName = "";
var communaicateVinId = 0;
var communaicate_CheckListItemStatusId = 0

function btnReExamCommunicate(e, VinId,  QFLFeedbackWorkFlowid, Partname, Vinnumber) {
    column = "Comments";
    VIN = Vinnumber;
    $("#CommunicateValidation").hide();
    var DefectValue = e.getAttribute('DefectValue');
    var DecodePartName = decodeURI(Partname);
    $("#ReworkAndReExamCommunicateTitle").text(DecodePartName + ' & ' + DefectValue);
    communaicateQFLFeedBackid = QFLFeedbackWorkFlowid;
    communaicateGateName = "ProgressMonitor";
    communaicateVinId = VinId;
    communaicate_CheckListItemStatusId = 0;

    GetCommunicationDetails();
}

function BindingPopupCommunicationDetails(CommunicationDetails, Data) {
    var content = [];

    var IsDisabledComments = Data.IsDisabledComments;

    if (IsDisabledComments == true) {
        //$('#txtCommunication').prop('disabled', true);
        $('#btnCommunicationClick').hide();

        if (UserDetails.Language == "en") {
            $('#btnCommunicationclose').val("Close");

        }
        else {
            $('#btnCommunicationclose').val("閉じる");

        }

    }
    else {
        //$('#txtCommunication').prop('disabled', false);
        $('#btnCommunicationClick').show();
        if (UserDetails.Language == "en") {
            $('#btnCommunicationclose').val("Back");
        }
        else {
            $('#btnCommunicationclose').val("バック");

        }
    }

    $("#BindingCommunicationDetails").empty();
    $("#ReworkAndReExamCommunicate").modal('show');

    if (CommunicationDetails.length > 0) {


        $.each(CommunicationDetails, function (i, item) {

            if (item.StartPosition.toUpperCase() == "LEFT") {


                content.push('<div class="row">')

                content.push('<div class="col-md-2">')
                if (item.FileName != "") {
                    content.push('<img class="image-thumbnail"  onclick="btnOpenUploadedImage(\'' + item.FileName + '\',\'' + item.Vinnumber + '\',\'' + item.ModelName + '\')" src="' + UserDetails.SignatureSitePath + item.Vinnumber + '/' + item.FileName + '" style="width:100%; margin-top: 15px;"/>')

                }
                content.push('</div>')
                content.push('<div class="col-md-4">')
                if (item.GateName == "Re-Examination") {
                    content.push('<h5 class="font-weights">' + 'QG Re-Examination' + '</h5>')

                }

                else if (item.GateName == "Re-Examination1") {
                    content.push('<h5 class="font-weights">' + '完成 Re-Examination' + '</h5>')

                }
                else {
                    content.push('<h5 class="font-weights">' + item.GateName + '</h5>')

                }

                content.push('<h5 class="font-weights">' + item.CompletedBy + '</h5>')
                content.push('<h5 class="font-weights">' + item.CompletedDate + '</h5>')

                content.push('</div>')

                content.push('<div class="col-md-6">')
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
                content.push('<div class="col-md-6">')
                content.push('<div class="talk-bubbleright triangle right-top right-Border-bubble">')
                content.push('<div class="talktext">')
                content.push('<p class="font-weights">' + item.Comments + '</p>')
                content.push('</div>')
                content.push('</div>')
                content.push('</div>')
                content.push('<div class="col-md-4">')

                if (item.GateName == "Re-Examination") {
                    content.push('<h5 class="font-weights">' + 'QG Re-Examination' + '</h5>')

                }

                else if (item.GateName == "Re-Examination1") {
                    content.push('<h5 class="font-weights">' + '完成 Re-Examination' + '</h5>')

                }
                else {
                    content.push('<h5 class="font-weights">' + item.GateName + '</h5>')

                }
                content.push('<h5 class="font-weights">' + item.CompletedBy + '</h5>')
                content.push('<h5 class="font-weights">' + item.CompletedDate + '</h5>')

                content.push('</div>')
                content.push('<div class="col-md-2">')
                if (item.FileName != "") {
                    content.push('<img class="image-thumbnail"  onclick="btnOpenUploadedImage(\'' + item.FileName + '\',\'' + item.Vinnumber + '\',\'' + item.ModelName + '\')" src="' + UserDetails.SignatureSitePath + item.Vinnumber + '/' + item.FileName + '" style="width:90%; margin-top: 15px;"/>')

                }
                content.push('</div>')
                content.push('</div>')
            }
        });

        $("#BindingCommunicationDetails").append(content.join(''));
    }
    else {
        //$("#communicationid_" + communaicateQFLFeedBackid).attr("disabled", true);
    }


}

function btnCloseComunication() {
    $("#ReworkAndReExamCommunicate").modal('hide');

}

var VIN = "";
function GetCommunicationDetails() {
    var json = {
        "VinId": communaicateVinId,
        "communaicateQFLFeedBackid": communaicateQFLFeedBackid,
        "Vinnumber": VIN,
        "communaicateGateName": communaicateGateName,
        "userid": UserDetails.UserId,
        "CheckListItemStatusId": communaicate_CheckListItemStatusId
    };
    var Input = JSON.stringify(json);
    var ApiFunc = Api + 'QFL.svc/GetCommunicationDetails';
    PostMethod(ApiFunc, Input, Token, function (data) {

        BindingCommunicationDetails(data);
    });
}

function BindingCommunicationDetails(data) {
    BindingPopupCommunicationDetails(data.ListofCommunicationDetails, data)
    //$("#ReworkAndReExamCommunicate").modal('show');


}
//---------------------------------END -----------------------------------------------