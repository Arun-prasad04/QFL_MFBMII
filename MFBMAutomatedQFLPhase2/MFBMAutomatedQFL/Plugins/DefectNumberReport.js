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

    $("#defectFromDate").datetimepicker({
        autoclose: true,
        pickTime: false,
        minView: 2,
        format: "yyyy/mm/dd"
    });
    var d = new Date();
    var currYear = d.getFullYear();
    var currMonth = d.getMonth();
    var currDate = d.getDate();
    var CurrDateTime = new Date(currYear, currMonth, currDate);
    var CurrentStatDate = new Date(currYear, 1 - 1, 1);

    $("#defectFromDate").datetimepicker('setDate', CurrentStatDate);


    $("#defectEndDate").datetimepicker({
        autoclose: true,
        pickTime: false,
        minView: 2,
        format: "yyyy/mm/dd"
    });

    $("#defectEndDate").datetimepicker('setDate', CurrDateTime);

    $('#txtYear,#txtYeaStation,#txtClassification').datepicker('setDate', today);
    $("#txtYear,#txtYeaStation,#txtClassification").val(currentTime.getFullYear());



    $("#DefectFromDate").datepicker('setDate', today);
    $("#DefectFromDate").val(currentTime.getFullYear());

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

    $('#btnSubmitByDefect').click(function () {
        ByDefectType();
    })

    $('#btnSubmitByClassification').click(function () {
        ByClassification();
    })


    $("#chartB").hide();
    $("#chartC").hide();
    $("#chartD").hide();
    showHideChart();
});

function showHideChart() {
    $('input:radio[name=dpuReport]').on("change", function () {
        if (this.value == 'dpuVehicle') {
            $("#chartB").css("display", "none");
            $("#chartC").css("display", "none");
            $("#chartD").css("display", "none");
            $("#chartA").css("display", "block");
        }
        else if (this.value == 'dpuStations') {
            $("#chartA").css("display", "none");
            $("#chartC").css("display", "none");
            $("#chartD").css("display", "none");
            $("#chartB").css("display", "block");
        }
        else if (this.value == 'dpuDefect') {
            $("#chartA").css("display", "none");
            $("#chartB").css("display", "none");
            $("#chartD").css("display", "none");
            $("#chartC").css("display", "block");
        }
        else if (this.value == 'dpuClassification') {
            $("#chartA").css("display", "none");
            $("#chartB").css("display", "none");
            $("#chartC").css("display", "none");
            $("#chartD").css("display", "block");
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
    var ApiFunc = UserDetails.Api + 'Report.svc/GetDefectNumberReport';
    PostMethod(ApiFunc, jsonData, UserDetails.token, function (data) {

        byVehicleType(data.Bar);

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
    var ApiFunc = UserDetails.Api + 'Report.svc/GetDefectNumberReport';
    PostMethod(ApiFunc, jsonData, UserDetails.token, function (data) {
        byStation(data.Bar);
    });

}


function ByDefectType() {

    var json = {
        "UserId": UserDetails.UserId,
        "VehicleIds": $('#drpVehicle').val() == null ? 0 : $('#drpVehicle').val().join(','),
        "ModelIds": $('#drpModel').val() == null ? 0 : $('#drpModel').val().join(','),
        "Year": parseInt($('#txtYear').val()),
        "Type": "byDefectType",
        "PlantId": $('#drpPlant').find(':selected').val(),
        "FromDate": $("#defectFromDate").val(),
        "EndDate": $("#defectEndDate").val()
    }

    var jsonData = JSON.stringify(json);
    var ApiFunc = UserDetails.Api + 'Report.svc/GetDefectNumberReport';
    PostMethod(ApiFunc, jsonData, UserDetails.token, function (data) {

        DefectTypeChart(data.Bar, data.Line);

    });
}

function ByClassification() {

    var json = {
        "UserId": UserDetails.UserId,
        "VehicleIds": $('#drpVehicle').val() == null ? 0 : $('#drpVehicle').val().join(','),
        "ModelIds": $('#drpModel').val() == null ? 0 : $('#drpModel').val().join(','),
        "Year": parseInt($('#txtClassification').val()),
        "Type": "byClassification",
        "PlantId": $('#drpPlant').find(':selected').val()
    }

    var jsonData = JSON.stringify(json);
    var ApiFunc = UserDetails.Api + 'Report.svc/GetDefectNumberReport';
    PostMethod(ApiFunc, jsonData, UserDetails.token, function (data) {

        ClassificationChart(data.Bar);

    });

}




function byVehicleType(Bar) {

    // console.log(Bar);

    var xaxis = [];
    var yaxis = [];
    for (var i = 0; i < Bar.length; i++) {
        xaxis.push(Bar[i]['Month']);
        yaxis.push(Bar[i]['VINCount']);
    }
    var maxValue = Math.max.apply(Math, yaxis);

    RGraph.Reset(document.getElementById('cvsA'));

    var tooltip = [];
    for (var i = 0; i <= xaxis.length; i++) {
        tooltip.push("" + xaxis[i] + " - " + yaxis[i] + "");
    }
    //console.log(yaxis);
    bar = new RGraph.Bar({
        id: 'cvsA',
        // data: [81, 0, 75, 85, 90, 78, 61, 51, 40, 20, 10, 0, 0, 0, 0],
        data: yaxis,
        options: {
            //  yaxisScaleMax: 200,
            yaxisScaleMax: maxValue,
            backgroundGridVlines: false,
            backgroundGridHlines: false,
            backgroundGridBorder: false,
            backgroundGridColor: '#999',
            //  xaxisLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //    labels: ['2017', '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxisLabels: xaxis,
            tooltips: tooltip,
            hmargin: 10,
            tooltipsEvent: 'onmousemove',
            marginLeft: 55,
            marginRight: 55,
            marginBottom: 45,
            colors: ['Gradient(#00677F)'],
            textColor: '#000',
            axesColor: '#999',
            xaxisTickmarksCount: 0,
            yaxisTickmarksCount: 0,
            shadowColor: 'black',
            shadowOffsetx: 0,
            shadowOffsety: 0,
            shadowBlur: 15,
            colorsStroke: 'rgba(0,0,0,0)',
            combinedEffect: 'wave',
            combinedEffectOptions: '{frames: 30}',
            textSize: 12,
            labelsAbove: true,
            labelsAboveBorder: false,
            labelsAboveBackground: 'none',
            labelsAboveBold: false,
            labelsAboveColor: '#000',
            //  title: "All defect numbers",
            titleSize: 16,
            xaxisScaleMax: 2300,
            xaxisTitle: "Complete Month Of Vehicle",
            xaxisTitleSize: 12,
            xaxisTitleBold: false,
            marginTop: 35,
            marginBottom: 50,
            xaxis: true,
            xaxisPosition: "bottom",
            xaxisLabelsSize: 12,
            key: ['Defects number'],
            keyInteractive: true,
            keyPositionMarginBoxed: false,
            keyPosition: 'graph',
            yaxisTitle: "Defects Number",

            xaxisTitlePos: 0.4
            //            title:
            //            {
            //            xaxis: "Complete Month Of Vehicle",
            //            yaxis:"Defect numbers"
            //            }
        }
    });
    var combo = new RGraph.CombinedChart([bar])
        .draw();

    // Because the combo class turns the line chart labels off,
    // turn them back on
    //    line.set({
    //        yaxisLabels: true
    //    });
}

function byStation(Bar) {


    var xaxis = [];
    var yaxis = [];
    var LineAverage = [];

    for (var i = 0; i < Bar.length; i++) {
        xaxis.push(Bar[i]['Month']);
        yaxis.push(Bar[i]['VINCount']);
    }

    var maxValue = Math.max.apply(Math, yaxis);

    console.log(xaxis);
    console.log(yaxis);
    console.log(maxValue);

    //var maxValue = '';
    //var maxValue = Math.max.apply(Math, yaxis);

    var tooltip = [];
    for (var i = 0; i <= xaxis.length; i++) {
        tooltip.push(xaxis[i] + " - " + yaxis[i]);
    }







    RGraph.Reset(document.getElementById('cvsB'));
    bar = new RGraph.Bar({
        id: 'cvsB',
        //data: [81, 0, 75, 85, 90, 78, 61, 51, 40, 20, 10, 0, 0, 0, 0],
        data: yaxis,
        options: {
            yaxisTitle: "Defects Number",
            xaxisTitle: "Complete month of vehicle",
            // yaxisScaleMax: 200,
            yaxisScaleMax: maxValue,
            backgroundGridVlines: false,
            backgroundGridHlines: false,
            backgroundGridBorder: false,
            backgroundGridColor: '#999',
            //            xaxisLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            // labels: ['2017', '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxisLabels: xaxis,
            tooltips: tooltip,
            tooltipsEvent: 'onmousemove',
            hmargin: 10,
            marginLeft: 55,
            marginRight: 55,
            marginBottom: 45,
            colors: ['Gradient(#00677F)'],
            textColor: '#000',
            axesColor: '#999',
            xaxisTickmarksCount: 0,
            yaxisTickmarksCount: 0,
            shadowColor: 'black',
            shadowOffsetx: 0,
            shadowOffsety: 0,
            shadowBlur: 15,
            colorsStroke: 'rgba(0,0,0,0)',
            combinedEffect: 'wave',
            combinedEffectOptions: '{frames: 30}',
            labelsAbove: true,
            labelsAboveBorder: false,
            labelsAboveBackground: 'none',
            labelsAboveBold: false,
            labelsAboveColor: '#000',
            //title: 'All defects Number',
            titleSize: 16,
            textSize: 12,
            xaxisTitleSize: 12,
            xaxisTitleBold: false,

            key: ['Defects number'],
            keyInteractive: true,
            keyPosition: 'graph'

        }
    });

    var combo = new RGraph.CombinedChart([bar])
        .draw();
}

function DefectTypeChart(Bar, Line) {



    var xaxis = [];
    var yaxis = [];
    var Percentage = [];


    if (xaxis.length <= 1) {
        xaxis.push('');
    }

    if (yaxis.length <= 1) {
        yaxis.push('');
    }

    if (Percentage.length <= 1) {
        Percentage.push('');
    }

    for (var i = 0; i < Bar.length; i++) {
        xaxis.push(Bar[i]['Month']);
        yaxis.push(Bar[i]['VINCount']);
    }

    for (var i = 0; i < Line.length; i++) {
        Percentage.push(Line[i]['VINCount']);
    }

    var tooltip = [];
    for (var i = 0; i <= yaxis.length; i++) {
        tooltip.push("" + yaxis[i] + "");
    }

    var Percentagetooltip = [];
    for (var i = 0; i <= Percentage.length; i++) {
        Percentagetooltip.push("" + Percentage[i] + "");
    }
    //var maxValue = Math.max.apply(Math, yaxis);

    var mVal1 = Math.max.apply(Math, Percentage);
    var mVal2 = Math.max.apply(Math, yaxis);

    if (mVal1 < mVal2) {
        maxValue = mVal2;
    }
    else {
        maxValue = mVal1;
    }

    RGraph.Reset(document.getElementById('cvsC'));
    bar = new RGraph.Bar({
        id: 'cvsC',
        //data: [90, 0, 70, 20, 20, 60, 70, 80, 60, 0, 10, 20, 40, 50, 20, 60, 70, 80, 60, 0, 10, 20, 40, 50],
        data: yaxis,
        options: {
            title: "Worst item",
            titleSize: 16,
            //yaxisScaleMax: 50,
            yaxisScaleMax: maxValue,
            backgroundGridVlines: false,
            backgroundGridBorder: true,
            backgroundGridColor: '#999',
            backgroundGrid: false,
            //xaxisLabels: ['Jan-19', 'Feb-19', 'Mar-19', 'Apr-19', 'May-19', 'Jun-19', 'Jul-19', 'Aug-19', 'Sep-19', 'Oct-19', 'Nov-19', 'Dec-19', 'Jan-19', 'Feb-19', 'Mar-19', 'Apr-19', 'May-19', 'Jun-19', 'Jul-19', 'Aug-19', 'Sep-19', 'Oct-19', 'Nov-19', 'Dec-19'],
            xaxisLabels: xaxis,
            hmargin: 10,
            marginLeft: 55,
            marginRight: 55,
            marginBottom: 45,
            colors: ['#004355'],
            textColor: '#000',
            axesColor: '#999',
            xaxisTickmarksCount: 10,
            yaxisTickmarksCount: 10,
            shadowColor: 'black',
            shadowOffsetx: 0,
            shadowOffsety: 0,
            shadowBlur: 15,
            colorsStroke: 'rgba(0,0,0,0)',
            combinedEffect: 'wave',
            combinedEffectOptions: '{frames: 30}',
            textSize: 12,
            titleBold: false,
            labelsAbove: true,
            //tooltips: ["90", "0", "70", "20", "20", "60", "70", "80", "60", "0", "10", "20", "40", "50", "20", "60", "70", "80", "60", "0", "10", "20", "40", "50"],
            tooltips: tooltip,
            titleYaxisSize: 12,
            //  grouping: 'stacked',
            labelsAboveSize: 10,
            yaxisTitle: null,
            // key: ['Components Completed'],
            keyPosition: 'margin',
            keyPositionY: 335,
            keyPositionX: 525,
            keyPositionMarginBoxed: false,
            marginBottom: 350,
            xaxisLabelsAngle: 45,
            yaxisLabels: true,
            xaxisLabelsSize: 11
            //xaxisLabelsOffsety: 10,
            //xaxisLabelsOffsetx: 15
        }
    });

    var line = new RGraph.Line({
        id: 'cvsC',
        //data: [150, 255, 566, 542, 588, 122, 131, 150, 255, 566, 542, 588, 122, 131, 150, 255, 566, 542, 588, 122, 131, 100, 130, 121],
        data: Percentage,
        options: {
            //yaxisScaleMax: 50,
            yaxisScaleMax: maxValue,
            axes: false,
            backgroundGrid: false,
            linewidth: 1.5,
            colors: ['#00677F'],
            yaxisPosition: 'right',
            axesColor: '#999',
            textColor: '#000',
            marginLeft: 45,
            marginRight: 45,
            // tickmarksSize: 5,
            spline: true,
            //    combinedEffect: 'trace',
            textSize: 12,
            yaxisLabels: true,
            shadow: false,
            //tooltips: ["150", "255", "566", "542", "588", "122", "131", "150", "255", "566", "542", "588", "122", "131", "150", "255", "566", "542", "588", "122", "131", "100", "130", "121"],
            tooltips: Percentagetooltip,
            grouping: 'stacked',
            yaxisTitle: "Cummulative Percentage",
            //key: ['% of Completion'],
            keyPosition: 'margin',
            keyPositionY: 335,
            keyPositionX: 750,
            tickmarksStyle: 'circle'

        }
    });

    var combo = new RGraph.CombinedChart([bar, line]).draw();
    // Because the combo class turns the line chart labels off,
    // turn them back on

    line.set({
        axes: true,
        yaxisLabels: true,
        //for spline of the line chart
        spline: !line.get('spline'),
        yaxisTitlePosition: 'right',
        yaxisTitlePos: 0.70
        // yaxisTickmarksLast     : true

    });

    RGraph.redraw();

}

function ClassificationChart(Bar) {

    console.log(Bar);
    var xaxis = [];
    var yaxis = [];
    var LineAverage = [];

    if (xaxis.length <= 1) {
        xaxis.push('');
    }

    if (yaxis.length <= 1) {
        yaxis.push('');
    }

    for (var i = 0; i < Bar.length; i++) {
        xaxis.push(Bar[i]['Month']);
        yaxis.push(Bar[i]['VINCount']);
    }

    var maxValue = Math.max.apply(Math, yaxis);

    var tooltip = [];
    for (var i = 0; i <= xaxis.length; i++) {
        tooltip.push(xaxis[i] + " - " + yaxis[i]);
    }

    RGraph.Reset(document.getElementById('cvsD'));
    bar = new RGraph.Bar({
        id: 'cvsD',
        //data: [81, 90, 75, 85],
        data: yaxis,
        options: {

            //yaxisScaleMax: 100,
            yaxisScaleMax: maxValue,
            backgroundGridVlines: false,
            backgroundGridHlines: false,
            backgroundGridBorder: false,
            backgroundGridColor: '#999',
            //            xaxisLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            //labels: ['A', 'B', 'C', 'D'],
            xaxisLabels: xaxis,
            tooltips: tooltip,
            tooltipsEvent: 'onmousemove',
            hmargin: 10,
            vmargin: 35,
            marginLeft: 55,
            marginRight: 55,
            marginBottom: 45,
            colors: ['Gradient(#00677F)'],
            textColor: '#000',
            axesColor: '#999',
            xaxisTickmarksCount: 0,
            yaxisTickmarksCount: 0,
            shadowColor: 'black',
            shadowOffsetx: 0,
            shadowOffsety: 0,
            shadowBlur: 15,
            colorsStroke: 'rgba(0,0,0,0)',
            combinedEffect: 'wave',
            combinedEffectOptions: '{frames: 30}',
            textSize: 12,
            labelsAbove: true,
            labelsAboveBorder: false,
            labelsAboveBackground: 'none',
            labelsAboveBold: false,
            labelsAboveColor: '#000',
            //  title: 'Priority Number',
            titleSize: 16,
            yaxisTitle: "Defects Number",
            xaxisTitle: "Classification"

        }
    });
    var combo = new RGraph.CombinedChart([bar])
        .draw();

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
            maxHeight: 250    ,
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

//function GetModelandVariant(PlantId) {
//    var json = {
//        "UserId": UserDetails.UserId,
//        "PlantId": PlantId
//    };
//    var Input = JSON.stringify(json);

//    var ApiFunc = Api + 'Report.svc/GetDPUReportDropdownlist';
//    PostMethod(ApiFunc, Input, Token, function (data) {
//        //        $("#drpVehicle").empty();

//        $("#drpVehicle").empty();
//        $('#drpQGate').empty();
//        var ddlVehicleNames = [];
//        var sddlModelNames = [];

//        var sddlQGateNames = [];

//        $.each(data.VechileType, function (i, item) {
//            var optionhtml = '<option value="' + item.VechileTypeID + '" >' + item.VechileType + '</option>';
//            ddlVehicleNames.push(optionhtml);
//        });
//        $("#drpVehicle").append(ddlVehicleNames.join(' ')); // Append VehicleType Page Load 

//        $('#drpVehicle').multiselect({
//            allSelectedText: 'All',
//            includeSelectAllOption: true,
//            buttonWidth: 250,
//            enableFiltering: true,
//            enableCaseInsensitiveFiltering: true,
//            onSelectAll: function (checked) {
//                //alert('onSelectAll triggered: ' + (checked ? 'selected all' : 'deselected all') + '!');
//                var sddlModelNames = [];
//                $('#drpModel').empty();
//                $("#drpModel").multiselect('destroy');
//                $.each(data.Model, function (i, item) {
//                    var optionhtml = '<option value="' + item.ModelID + '" >' + item.Model + '</option>';
//                    sddlModelNames.push(optionhtml);
//                });
//                $("#drpModel").append(sddlModelNames.join(' '));

//                $('#drpModel').multiselect({
//                    allSelectedText: 'All',
//                    includeSelectAllOption: true,
//                    buttonWidth: 250,
//                    enableFiltering: true,
//                    enableCaseInsensitiveFiltering: true
//                });

//                $('#drpModel').multiselect('selectAll', false);
//                $('#drpModel').multiselect('updateButtonText');
//            },
//            onChange: function (element, checked) {
//                var ddlModelNamesFilter = [];
//                $('#drpModel').empty();
//                $("#drpModel").multiselect('destroy');
//                //$('#drpModel').multiselect('rebuild');
//                //debugger;
//                //alert($('#drpVehicle').val().join(',').split(","));
//                if ($('#drpVehicle').val() != null) {

//                    var VehicleSplit = $('#drpVehicle').val().join(',').split(",");
//                    var ModelValues = [];
//                    $.each(VehicleSplit, function (i, item) {
//                        var ModelVal = $.grep(ModelData, function (v) {
//                            return v.VehicleTypeId == VehicleSplit[i];
//                        });
//                        ModelValues.push(ModelVal);
//                    });
//                    $.each(ModelValues, function (i, item) {
//                        $.each(item, function (i, x) {
//                            var optionhtml = '<option value="' + x.ModelID + '" >' + x.Model + '</option>';
//                            ddlModelNamesFilter.push(optionhtml);
//                        });
//                    });
//                    //}
//                    $("#drpModel").append(ddlModelNamesFilter.join(' ')).multiselect({
//                        allSelectedText: 'All',
//                        includeSelectAllOption: true,
//                        buttonWidth: 250,
//                        enableFiltering: true,
//                        enableCaseInsensitiveFiltering: true
//                    });
//                    $('#drpModel').multiselect('selectAll', false);
//                    $('#drpModel').multiselect('updateButtonText');

//                }
//                else {
//                    $('#drpModel').multiselect('selectAll', false);
//                    $('#drpModel').multiselect('updateButtonText');

//                    $('#drpModel').multiselect({
//                        allSelectedText: 'All',
//                        includeSelectAllOption: true,
//                        buttonWidth: 250,
//                        enableFiltering: true,
//                        enableCaseInsensitiveFiltering: true
//                    });
//                }
//            }
//        });

//        $('#drpVehicle').multiselect('selectAll', false);
//        $('#drpVehicle').multiselect('updateButtonText');

//        ModelData = data.Model;
//        var sddlModelNames = [];
//        $.each(data.Model, function (i, item) {
//            var optionhtml = '<option value="' + item.ModelID + '" >' + item.Model + '</option>';
//            sddlModelNames.push(optionhtml);
//        });
//        $("#drpModel").append(sddlModelNames.join(' ')); // Append Model Page Load 

//        $('#drpModel').multiselect({
//            allSelectedText: 'All',
//            includeSelectAllOption: true,
//            buttonWidth: 250,
//            enableFiltering: true,
//            enableCaseInsensitiveFiltering: true
//        });

//        $('#drpModel').multiselect('selectAll', false);
//        $('#drpModel').multiselect('updateButtonText');
//        $.each(data.QGate, function (i, item) {
//            var optionhtml = '<option value="' + item.QGateId + '" >' + item.GateName + '</option>';
//            sddlQGateNames.push(optionhtml);
//        });
//        $("#drpQGate").append(sddlQGateNames.join(' '));

//        $('#drpQGate').multiselect({
//            allSelectedText: 'All',
//            includeSelectAllOption: true,
//            buttonWidth: 250,
//            enableFiltering: true,
//            enableCaseInsensitiveFiltering: true
//        });

//        $('#drpQGate').multiselect('selectAll', false);
//        $('#drpQGate').multiselect('updateButtonText');
//    });

//}