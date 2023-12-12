using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using MFBMQFLAPI.BAL; 

namespace MFBMQFLAPI
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Report" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Report.svc or Report.svc.cs at the Solution Explorer and start debugging.

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple)]
    public class Report : IReport
    {


        #region DPU Report DROP DOWN LIST
        public DPUReportDropdownDetails GetDPUReportDropdownlist(DPUReportDropdownInput Input)
        {
            DPUReportDropdownDetails _DPUReport = new DPUReportDropdownDetails();
            DPUReportBAL DPUReportBAL = new DPUReportBAL();
            try
            {
                _DPUReport = DPUReportBAL.GetDPUReportDropdownlist(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DPUReport DropdownDetails " + " " + ex.Message);
            }
            return _DPUReport;
        }
        #endregion
   
        #region DPU Report
        public DPUReportDetails GetDPUReport(DPUReportInput Input)
        {
            DPUReportDetails _DPUReport = new DPUReportDetails();
            DPUReportBAL DPUReportBAL = new DPUReportBAL();
            try
            {
                _DPUReport = DPUReportBAL.GetDPUReport(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("_DPUReport " + " " + ex.Message);
            }
            return _DPUReport;
        }
        #endregion


        #region DPU DefectNumberReport
        public DPUReportDetails GetDefectNumberReport(DPUReportInput Input)
        {
            DPUReportDetails _DPUReport = new DPUReportDetails();
            DPUReportBAL DPUReportBAL = new DPUReportBAL();
            try
            {
                _DPUReport = DPUReportBAL.GetDefectNumberReport(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("_DPUReport " + " " + ex.Message);
            }
            return _DPUReport;
        }
        #endregion

    }
}
