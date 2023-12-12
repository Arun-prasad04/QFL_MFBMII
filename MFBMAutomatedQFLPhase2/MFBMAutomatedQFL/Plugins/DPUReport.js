$(document).ready(function () {

    InitializeUrl();
    // DPUReportVehicleType();

    var currentTime = new Date()
    var dteNow = currentTime.getFullYear();
    // var today = new Date("'" + dteNow + "'");
    var today = "'" + dteNow + "'";
    $(".dateTime").datepicker({

        minViewMode: 'years',

        autoclose: true,

        format: 'yyyy',

        endDate: today,

    });
    $('#txtYear,#txtYeaStation').datepicker('setDate', today);

    $("#txtYear,#txtYeaStation").val(currentTime.getFullYear());
    $('#btnSubmit').click(function (data) {
        //if ($('#yearId').val() != '' && $('#EquipmentDDL').val() != null && $('#LabDDL').val() != null)
        DPUReportVehicleType();
        //else
        //    alert('Please select the LabName and Equipment Name and Year');

    });
    $('#btnSubmitStation').click(function (data) {
        //if ($('#yearId').val() != '' && $('#EquipmentDDL').val() != null && $('#LabDDL').val() != null)
        DPUReporStation();
        //else
        //    alert('Please select the LabName and Equipment Name and Year');

    });

    $("#chartB").hide();
    showHideChart();
});

function showHideChart() {

    $('input:radio[name=dpuReport]').on("change", function () {
        if (this.value == 'dpuVehicle') {
            $("#chartB").css("display", "none");
            $("#chartA").css("display", "block");
        }
        else if (this.value == 'dpuStations') {
            $("#chartA").css("display", "none");
            $("#chartB").css("display", "block");

        }
    });
}

function DPUReportVehicleType() {


    var json = {
        "UserId": UserDetails.UserId,
        "VehicleIds": $('#drpVehicle').val() == null ? 0 : $('#drpVehicle').val().join(','),
        "ModelIds": $('#drpModel').val() == null ? 0 : $('#drpModel').val().join(','),
        "Year": parseInt($('#txtYear').val()),
        "Type": "byVehicleType",

        "PlantId": $('#drpPlant').find(':selected').val()
    }

    var jsonData = JSON.stringify(json);
    var ApiFunc = UserDetails.Api + 'Report.svc/GetDPUReport';
    PostMethod(ApiFunc, jsonData, UserDetails.token, function (data) {


        //if (type == "byVechileType") {
        //    if (data.Month != null && data.Count != null)
        byVehicleType(data.Bar, data.Line);
        //    else
        //        RGraph.Reset(document.getElementById('cvsA'));
        //}
        //if (type == "byStation") {
        //    if (data.Month != null && data.Count != null)
        //        byStation(data.Month, data.Count, data.LineAverage);
        //    else
        //        RGraph.Reset(document.getElementById('cvsB'));
        //}
    });

}

function DPUReporStation() {


    var json = {
        "UserId": UserDetails.UserId,
        "QGateIds": $('#drpQGate').val() == null ? 0 : $('#drpQGate').val().join(','),

        "Year": parseInt($('#txtYeaStation').val()),
        "Type": "byStation",

        "PlantId": $('#drpPlant').find(':selected').val()
    }

    var jsonData = JSON.stringify(json);
    var ApiFunc = UserDetails.Api + 'Report.svc/GetDPUReport';
    PostMethod(ApiFunc, jsonData, UserDetails.token, function (data) {
        byStation(data.Bar, data.Line);
    });

}

function byVehicleType(Bar, Line) {

    // console.log(Line);
    //console.log(Bar);
    var xaxis = [];
    var yaxis = [];
    var LineAverage = [];
    for (var i = 0; i < Bar.length; i++) {
        xaxis.push(Bar[i]['Month']);
        yaxis.push(Bar[i]['VINCount']);
    }

    for (var i = 0; i < Line.length; i++) {
        LineAverage.push(Line[i]['LineAverage']);
    }

    // var maxValue = Math.max.apply(Math, yaxis);

    var mVal1 = Math.max.apply(Math, LineAverage);
    var mVal2 = Math.max.apply(Math, yaxis);

    if (mVal1 < mVal2) {
        maxValue = mVal2;
    }
    else {
        maxValue = mVal1;
    }


    //console.log(yaxis);


    RGraph.Reset(document.getElementById('cvsA'));

    line = new RGraph.Line({
        id: 'cvsA',
        // data: [5, 4, 1, 6, 5, 6, 7, 4, 1, 6, 5, 6, 7],
        data: yaxis,
        options: {
            yaxisScaleMax: maxValue,//maxValue,
            //xaxisLabels: ['2017', 'Jan.18', 'Feb.18', 'Mar.18', 'Apr.18', 'May.18', 'Jun.18', 'Jul.18', 'Aug.18', 'Sep.18', 'Oct.18', 'Nov.18', 'Dec.18'],
            xaxisLabels: xaxis,
            colors: ['#004355'],
            title: 'DPU',
            titleY: -20,
            titleSize: 16,
            // titleBold: true,
            tickmarksStyle: 'circle',
            tickmarksSize: 5,
            shadow: false,
            marginTop: 35,
            marginRight: 30,
            marginLeft: 30,
            backgroundGrid: false,
            linewidth: 2,
            labelsAbove: true,
            textColor: '#000',
            axesColor: '#999',
            textSize: 12,
            labelsAboveSize: 10
            // tooltips: ["90", "0", "70", "20", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
            //tooltips: TotalCountTooltips,
            //labelsAboveOffsety: 10
        }
    }).draw();




    new RGraph.Line({
        id: 'cvsA',
        data: LineAverage,
        //data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,5],
        options: {
            // xaxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

            yaxisScaleMax: maxValue,

            yaxisLabels: null,
            line: false,
            //lineDash: [5, 5],
            lineColors: ['#004355'],
            textSize: 16,
            axes: false,
            backgroundGrid: false,
            linewidth: 2,
            tickmarksStyle: null,
            textSize: 10,
            //xaxisLabelsOffsety: 5,
            // colors: ['#00677F'],
            labelsAbove: true,
            tickmarksStyle: 'square',
            // labelsAboveOffsety: 30

        }
    }).draw();


    RGraph.redraw();

}

function byStation(Bar, Line) {

    var xaxis = [];
    var yaxis = [];
    var LineAverage = [];

    for (var i = 0; i < Bar.length; i++) {
        xaxis.push(Bar[i]['Month']);
        yaxis.push(Bar[i]['VINCount']);
    }

    for (var i = 0; i < Line.length; i++) {
        LineAverage.push(parseInt(Line[i]['LineAverage']));
    }

    //var maxValue = Math.max.apply(Math, yaxis);

    var mVal1 = Math.max.apply(Math, LineAverage);
    var mVal2 = Math.max.apply(Math, yaxis);

    if (mVal1 < mVal2) {
        maxValue = mVal2;
    }
    else {
        maxValue = mVal1;
    }

    RGraph.Reset(document.getElementById('cvsB'));
    line = new RGraph.Line({
        id: 'cvsB',
        //data: [5, 4, 1, 6, 5, 6, 7, 4, 1, 6, 5, 6, 7],
        data: yaxis,
        options: {
            //xaxisLabels: ['2019', 'Jan.20', 'Feb.20', 'Mar.20', 'Apr.20', 'May.20', 'Jun.20', 'Jul.20', 'Aug.20', 'Sep.20', 'Oct.20', 'Nov.20', 'Dec.20'],
            xaxisLabels: xaxis,
            yaxisScaleMax: maxValue,
            // xaxisLabels: TotalMonthWiseright,
            colors: ['#004355'],
            title: 'DPU',
            titleSize: 16,
            // titleBold: true,
            tickmarksStyle: 'circle',
            tickmarksSize: 5,
            shadow: false,
            marginTop: 35,
            marginRight: 30,
            marginLeft: 30,
            backgroundGrid: false,
            linewidth: 2,
            labelsAbove: true,
            textColor: '#000',
            axesColor: '#999',
            textSize: 12,
            labelsAboveSize: 10,
            // tooltips: ["90", "0", "70", "20", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
            // tooltips: TotalCountTooltips
        }
    }).draw();

    new RGraph.Line({
        id: 'cvsB',
        data: LineAverage,
        //data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        options: {
            // xaxisLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

            yaxisScaleMax: maxValue,

            yaxisLabels: null,
            line: false,
            lineDash: [5, 5],
            lineColors: ['#004355'],
            textSize: 16,
            axes: false,
            backgroundGrid: false,
            linewidth: 2,
            tickmarksStyle: null,
            textSize: 10,
            //xaxisLabelsOffsety: 5,
            // colors: ['#00677F'],
            labelsAbove: true,
            tickmarksStyle: 'square',
            // tooltips: '' + Linedata + ''
        }
    }).draw();


    RGraph.redraw();
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

            // GetQGateDetails(PlantId);
            MaintainPlantId(PlantId);
        }

        if (UserDetails.PlantId != 0) {
            GetModelandVariant(UserDetails.PlantId);
        }


        $('#drpPlant').change(function () {
            var PlantId = parseInt(jQuery(this).val());

            GetModelandVariant(PlantId);
            MaintainPlantId(PlantId);
        });
        //alert(UserDetails.Language);
        if (UserDetails.Language == "") { $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val()); }
        else {
            $('.Languagepicker').selectpicker('val', UserDetails.Language);
            Conversion($('.Languagepicker').val());
        }
    });


}

var ModelData;
var VariantData;

function GetModelandVariant(PlantId) {
    var json = {
        "UserId": UserDetails.UserId,
        "PlantId": PlantId
    };
    var Input = JSON.stringify(json);

    var ApiFunc = Api + 'Report.svc/GetDPUReportDropdownlist';
    PostMethod(ApiFunc, Input, Token, function (data) {
        // console.log(data);
        //        $("#drpVehicle").empty();

        $("#drpVehicle").empty();
        $('#drpQGate').empty();
        var ddlVehicleNames = [];
        var sddlModelNames = [];

        var sddlQGateNames = [];
        VariantData = data.VechileType
        $.each(data.VechileType, function (i, item) {
            var optionhtml = '<option value="' + item.VechileTypeID + '" >' + item.VechileType + '</option>';
            ddlVehicleNames.push(optionhtml);
        });
        $("#drpVehicle").append(ddlVehicleNames.join(' ')); // Append VehicleType Page Load 

        $('#drpVehicle').multiselect({
            allSelectedText: 'All',
            includeSelectAllOption: true,
            buttonWidth: 250,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onSelectAll: function (checked) {
                //alert('onSelectAll triggered: ' + (checked ? 'selected all' : 'deselected all') + '!');
                var sddlModelNames = [];
                $('#drpModel').empty();
                $("#drpModel").multiselect('destroy');

                $.each(data.VechileType, function (i, item) {
                    // console.log(item);

                    var filterModel = $.grep(data.Model, function (v) {
                        return v.VehicleTypeId == item.VechileTypeID;
                    });

                    var optionhtml = "";
                    $.each(filterModel, function (i, item) {
                        optionhtml += '<option value="' + item.ModelID + '" >' + item.Model + '</option>';
                    });
                    var optiongroup = '<optgroup class="groupbgcolor" label="' + item.VechileType + '">' + optionhtml + '</optgroup>';
                    sddlModelNames.push(optiongroup);
                });
                $("#drpModel").append(sddlModelNames.join(' '));

                $('#drpModel').multiselect({
                    allSelectedText: 'All',
                    includeSelectAllOption: true,
                    buttonWidth: 250,
                    enableFiltering: true,
                    enableCaseInsensitiveFiltering: true,
                    enableClickableOptGroups: true,
                    enableCollapsibleOptGroups: true
                });

                //$('#drpModel').multiselect('selectAll', false);
                //$('#drpModel').multiselect('updateButtonText');
            },
            onChange: function (element, checked) {
                var ddlModelNamesFilter = [];
                var sddlModelNames = [];
                $('#drpModel').empty();
                $("#drpModel").multiselect('destroy');

                if ($('#drpVehicle').val() != null) {

                    var VehicleSplit = $('#drpVehicle').val().join(',').split(",");
                    var filterVehicles = [];

                    $.each(VehicleSplit, function (i, item) {
                        var vehicleval = $.grep(VariantData, function (v) {
                            return v.VechileTypeID == VehicleSplit[i];
                        });
                        filterVehicles.push(vehicleval);
                    });

                    $.each(filterVehicles, function (i, item) {

                        $.each(item, function (i, item) {

                            filterModel = $.grep(ModelData, function (v) {
                                return v.VehicleTypeId == item.VechileTypeID;
                            });

                            var optionhtml = "";
                            $.each(filterModel, function (i, item) {
                                optionhtml += '<option value="' + item.ModelID + '" >' + item.Model + '</option>';
                                //  ddlModelNamesFilter.push(optionhtml);
                            });
                            var optiongroup = '<optgroup class="groupbgcolor" label="' + item.VechileType + '">' + optionhtml + '</optgroup>';
                            ddlModelNamesFilter.push(optiongroup);
                        });
                    });


                    //$.each(VehicleSplit, function (i, item) {
                    //    var ModelVal = $.grep(ModelData, function (v) {
                    //        return v.VehicleTypeId == VehicleSplit[i];
                    //    });
                    //    ModelValues.push(ModelVal);
                    //});
                    //$.each(ModelValues, function (i, item) {
                    //    $.each(item, function (i, x) {
                    //        var optionhtml = '<option value="' + x.ModelID + '" >' + x.Model + '</option>';
                    //        ddlModelNamesFilter.push(optionhtml);
                    //    });
                    //});
                    //}

                    $("#drpModel").append(ddlModelNamesFilter.join(' ')).multiselect({
                        allSelectedText: 'All',
                        includeSelectAllOption: true,
                        buttonWidth: 250,
                        enableFiltering: true,
                        enableCaseInsensitiveFiltering: true,
                        enableClickableOptGroups: true,
                        enableCollapsibleOptGroups: true
                    });
                    //$('#drpModel').multiselect('selectAll', false);
                    //$('#drpModel').multiselect('updateButtonText');

                }
                else {
                    $('#drpModel').multiselect('selectAll', false);
                    $('#drpModel').multiselect('updateButtonText');

                    $('#drpModel').multiselect({
                        allSelectedText: 'All',
                        includeSelectAllOption: true,
                        buttonWidth: 250,
                        enableFiltering: true,
                        enableCaseInsensitiveFiltering: true,
                        enableClickableOptGroups: true,
                        enableCollapsibleOptGroups: true
                    });
                }
            }
        });

        //$('#drpVehicle').multiselect('selectAll', false);
        //$('#drpVehicle').multiselect('updateButtonText');

        ModelData = data.Model;
        //$.each(data.Model, function (i, item) {
        //    var optionhtml = '<option value="' + item.ModelID + '" >' + item.Model + '</option>';
        //    sddlModelNames.push(optionhtml);
        //});
        //$("#drpModel").append(sddlModelNames.join(' ')); // Append Model Page Load 

        $('#drpModel').multiselect({
            allSelectedText: 'All',
            includeSelectAllOption: true,
            buttonWidth: 250,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true
        });

        //$('#drpModel').multiselect('selectAll', false);
        //$('#drpModel').multiselect('updateButtonText');


        //-----------------------------------Gate----------------------------------------

        var lines = _.uniq(data.QGate, function (x) {
            return x.LineName;
        });
        var optionhtml1 = '';
        $.each(lines, function (i, items) {
            var gates = $.grep(data.QGate, function (element, index) {
                return element.LineName == items.LineName;
            });

            $.each(gates, function (i, item) {
                optionhtml1 += '<option value="' + item.QGateId + '" >' + item.GateName + '</option>';

            });

            var optiongroup = '<optgroup class="groupbgcolor" label="' + items.LineName + '">' + optionhtml1 + '</optgroup>';
            sddlQGateNames.push(optiongroup);
            optionhtml1 = '';
        });



        $("#drpQGate").append(sddlQGateNames.join(' '));

        $('#drpQGate').multiselect({
            allSelectedText: 'All',
            includeSelectAllOption: true,
            buttonWidth: 250,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            maxHeight: 250
        });

        //$('#drpQGate').multiselect('selectAll', false);
        //$('#drpQGate').multiselect('updateButtonText');

        //-----------------------------------END Gate----------------------------------------

        if (UserDetails.Language == "") { $('.Languagepicker').selectpicker('val', 'en'); Conversion($('.Languagepicker').val()); }
        else {
            $('.Languagepicker').selectpicker('val', UserDetails.Language);
            Conversion($('.Languagepicker').val());
        }
    });

}