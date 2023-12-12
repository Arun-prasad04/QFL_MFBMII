using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace MFBMQFLAPI
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMonitor" in both code and config file together.
    [ServiceContract]
  
    public interface IMonitor
    {
        [OperationContract(Name = "GetProgressMonitorData")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetProgressMonitorData")]
        string GetProgressMonitorData(ProgressMonitor Input);

        [OperationContract(Name = "ProgressMonitorVINHistory")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/ProgressMonitorVINHistory")]
        ProgressMonitorVINHistory ProgressMonitorVINHistory(ProgressMonitor Input);
        [OperationContract(Name = "DeleteVINandDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DeleteVINandDetails")]
        bool DeleteVINandDetails(DeleteVIN deleteVIN);

        [OperationContract(Name = "GetProgressMonitorNewData")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetProgressMonitorNewData")]
        GetProgressMonitorNew GetProgressMonitorNewData(ProgressMonitor Input);

        [OperationContract(Name = "GetProgressMonitorAllData")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetProgressMonitorAllData")]
        GetProgressMonitorNew GetProgressMonitorAllData(ProgressMonitor Input);

        [OperationContract(Name = "GetProgressMonitorNewDatas")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetProgressMonitorNewDatas")]
        string GetProgressMonitorNewDatas(ProgressMonitor Input);

        [OperationContract(Name = "GetProgressMonitorAllDataForExcel")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetProgressMonitorAllDataForExcel")]
        string GetProgressMonitorAllDataForExcel(ProgressMonitor Input);


        [OperationContract(Name = "ExcelDownloadforIssueDate")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/ExcelDownloadforIssueDate")]
        PMExcelIssuedateResponse ExcelDownloadforIssueDate(ProgressMonitor pMExcel);


        [OperationContract(Name = "ProgressMonitorVINHistoryExcel")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/ProgressMonitorVINHistoryExcel")]
        ProgressMonitorVINHistory ProgressMonitorVINHistoryExcel(ProgressMonitor Input);

        [OperationContract(Name = "InsertDynamicColumnText")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertDynamicColumnText")]
        InsertDynamicColumnText InsertDynamicColumnText(InsertDynamicColumnTextInputs InsertDynamicColumnTextInputs);



        [OperationContract(Name = "GetProgressMonitorNewDataForTablet")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetProgressMonitorNewDataForTablet")]
        GetProgressMonitorNew GetProgressMonitorNewDataForTablet(ProgressMonitor Input);

        [OperationContract(Name = "GETDynamicColumnText")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GETDynamicColumnText")]
        GETDynamicColumnText GETDynamicColumnText(GETDynamicColumnTextInputs Input);


        [OperationContract(Name = "UpdateAllProgressColor")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateAllProgressColor")]
        ColorResult UpdateAllProgressColor(ColorInputs Inputs);




        [OperationContract(Name = "GetVinlists")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetVinlists")]
        GetVinlists GetVinlists(GetVinlists Input);


        [OperationContract(Name = "Get_VinUploadCheckListHistory")]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/Get_VinUploadCheckListHistory")]
        List<VinCheckListUploadHistroy> Get_VinUploadCheckListHistory();
    }
}
