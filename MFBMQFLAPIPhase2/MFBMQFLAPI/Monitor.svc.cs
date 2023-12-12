using MFBMQFLAPI.BAL;
using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;

namespace MFBMQFLAPI
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Monitor" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Monitor.svc or Monitor.svc.cs at the Solution Explorer and start debugging.

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple)]
    public class Monitor : IMonitor
    {
        public string GetProgressMonitorData(ProgressMonitor Input)
        {
            string _ProgressMonitorDetails = string.Empty;

           GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                _ProgressMonitorDetails = _obj.GetProgressMonitorData(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("ProgressMonitorDetails" + " " + ex.Message);
            }
            return _ProgressMonitorDetails;

        }

        public ProgressMonitorVINHistory ProgressMonitorVINHistory(ProgressMonitor Input)
        {
            ProgressMonitorVINHistory vinHistory = new ProgressMonitorVINHistory();
            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                vinHistory = _obj.ProgressMonitorVINHistory(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("ProgressMonitorVINHistory" + " " + ex.Message);
            }
            return vinHistory;
        }
        public bool DeleteVINandDetails(DeleteVIN deleteVIN)
        {
            bool result = false;
            GetProgressBAL detailsBAL = new GetProgressBAL();
            try
            {
                result = detailsBAL.DeleteVINandDetails(deleteVIN);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DeleteVINandDetails" + " " + ex.Message);
            }
            return result;
        }

        public GetProgressMonitorNew GetProgressMonitorNewData(ProgressMonitor Input)
        {
            GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();

            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                GetProgressMonitorNew = _obj.GetProgressMonitorNewData(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetProgressMonitorNewData" + " " + ex.Message);
            }
            return GetProgressMonitorNew;

        }


        public GetProgressMonitorNew GetProgressMonitorAllData(ProgressMonitor Input)
        {
            GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();

            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                GetProgressMonitorNew = _obj.GetProgressMonitorAllData(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetProgressMonitorNewData" + " " + ex.Message);
            }
            return GetProgressMonitorNew;

        }


        public string GetProgressMonitorNewDatas(ProgressMonitor Input)
        {
            //GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();
            string GetProgressMonitorNew = string.Empty;

            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                GetProgressMonitorNew = _obj.GetProgressMonitorNewDatas(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetProgressMonitorNewDatas" + " " + ex.Message);
            }
            return GetProgressMonitorNew;

        }

        public string GetProgressMonitorAllDataForExcel(ProgressMonitor Input)
        {
            //GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();
            string GetProgressMonitorNew = string.Empty;

            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                GetProgressMonitorNew = _obj.GetProgressMonitorAllDataForExcel(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetProgressMonitorAllDataForExcel" + " " + ex.Message);
            }
            return GetProgressMonitorNew;

        }


        public PMExcelIssuedateResponse ExcelDownloadforIssueDate(ProgressMonitor pMExcel)
        {
            PMExcelIssuedateResponse response = new PMExcelIssuedateResponse();
            GetProgressBAL userDetailsBAL = new GetProgressBAL();
            try
            {
                response = userDetailsBAL.ExcelDownloadforIssueDate(pMExcel);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("ExcelDownloadforIssueDate" + " " + ex.Message);
            }
            return response;
        }

        public ProgressMonitorVINHistory ProgressMonitorVINHistoryExcel(ProgressMonitor Input)
        {
            ProgressMonitorVINHistory vinHistory = new ProgressMonitorVINHistory();
            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                vinHistory = _obj.ProgressMonitorVINHistoryExcel(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("ProgressMonitorVINHistory" + " " + ex.Message);
            }
            return vinHistory;
        }

        public InsertDynamicColumnText InsertDynamicColumnText(InsertDynamicColumnTextInputs InsertDynamicColumnTextInputs)
        {
            InsertDynamicColumnText _InsertDynamicColumnText = new InsertDynamicColumnText();
            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                _InsertDynamicColumnText = _obj.InsertDynamicColumnText(InsertDynamicColumnTextInputs);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertDynamicColumnText" + " " + ex.Message);
            }
            return _InsertDynamicColumnText;
        }


        public GetProgressMonitorNew GetProgressMonitorNewDataForTablet(ProgressMonitor Input)
        {
            GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();

            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                GetProgressMonitorNew = _obj.GetProgressMonitorNewDataForTablet(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetProgressMonitorNewDataForTablet " + " " + ex.Message);
            }
            return GetProgressMonitorNew;

        }


        public GETDynamicColumnText GETDynamicColumnText(GETDynamicColumnTextInputs Input)
        {
            GETDynamicColumnText GETDynamicColumnText = new GETDynamicColumnText();

            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                GETDynamicColumnText = _obj.GETDynamicColumnText(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GETDynamicColumnTextGETDynamicColumnText" + " " + ex.Message);
            }
            return GETDynamicColumnText;

        }


        public ColorResult UpdateAllProgressColor(ColorInputs Inputs)
        {
            ColorResult ColorResult = new ColorResult();
            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                ColorResult = _obj.UpdateAllProgressColor(Inputs);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateAllProgressColor" + " " + ex.Message);
            }
            return ColorResult;
        }



        public GetVinlists GetVinlists(GetVinlists Input)
        {
            GetVinlists vinHistory = new GetVinlists();
            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                vinHistory = _obj.GetVinlists(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetVinlists" + " " + ex.Message);
            }
            return vinHistory;
        }

        public List<VinCheckListUploadHistroy> Get_VinUploadCheckListHistory()
        {
            List<VinCheckListUploadHistroy> result = new List<VinCheckListUploadHistroy>();
            GetProgressBAL _obj = new GetProgressBAL();
            try
            {
                result = _obj.Get_VinUploadCheckListHistory();
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get_VinUploadCheckListHistory" + " " + ex.Message);
            }
            return result;

        }

    }
}
