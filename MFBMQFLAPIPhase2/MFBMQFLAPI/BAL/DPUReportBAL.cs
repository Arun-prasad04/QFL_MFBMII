using MFBMQFLAPI.DAL;
using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace MFBMQFLAPI.BAL
{
    public class DPUReportBAL
    {

        public DPUReportDropdownDetails GetDPUReportDropdownlist(DPUReportDropdownInput input)
        {
            DPUReportDropdownDetails DPUReport = new DPUReportDropdownDetails();
            DPUReportDAL _dal = new DPUReportDAL();

            DataSet ds = new DataSet();
            ds = _dal.GetDPUReportDropdownlist(input);

            List<DPUReportModel> Model = new List<DPUReportModel>();
            List<DPUReportVechileType> VechileType = new List<DPUReportVechileType>();

            List<DPUReportQGate> QGate = new List<DPUReportQGate>();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    VechileType.Add(new DPUReportVechileType
                    {
                        VechileTypeID = Convert.ToInt32(ds.Tables[0].Rows[i]["VehicleTypeId"]),
                        VechileType = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"])

                    });

                }
            }
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    Model.Add(new DPUReportModel
                    {
                        ModelID = Convert.ToInt32(ds.Tables[1].Rows[i]["ModelMasterId"]),
                        Model = Convert.ToString(ds.Tables[1].Rows[i]["Model"]),
                        VehicleTypeId = Convert.ToInt32(ds.Tables[1].Rows[i]["VehicleTypeId"]),
                    });

                }

            }
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    QGate.Add(new DPUReportQGate
                    {
                        QGateId = Convert.ToInt32(ds.Tables[2].Rows[i]["QGateId"]),
                        GateName = Convert.ToString(ds.Tables[2].Rows[i]["GateName"]),
                        LineName= Convert.ToString(ds.Tables[2].Rows[i]["LineName"])
                    });
                }

            }
            DPUReport.VechileType = VechileType;
            DPUReport.Model = Model;
            DPUReport.QGate = QGate;
            return DPUReport;

        }

        public DPUReportDetails GetDPUReport(DPUReportInput input)
        {
            DPUReportDetails DPUReport = new DPUReportDetails();
            DPUReportDAL _dal = new DPUReportDAL();

            DataSet ds = new DataSet();
            ds = _dal.GetDPUReport(input);

            List<BarDPUReport> BarDPUReport = new List<BarDPUReport>();
            List<LineDPUReport> LineDPUReport = new List<LineDPUReport>();

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    BarDPUReport dpuReport = new BarDPUReport();

                    dpuReport.Month = Convert.ToString(ds.Tables[0].Rows[i]["Month"]);
                    dpuReport.VINCount = Convert.ToDecimal(ds.Tables[0].Rows[i]["VINCount"]);
                    BarDPUReport.Add(dpuReport);
                }
            }
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    LineDPUReport lineReport = new LineDPUReport();

                    lineReport.LineAverage = Convert.ToDecimal(ds.Tables[1].Rows[i]["LineAverage"]);
                    LineDPUReport.Add(lineReport);
                }
            }

            DPUReport.Bar = BarDPUReport;
            DPUReport.Line = LineDPUReport;
            return DPUReport;

        }

        public DPUReportDetails GetDefectNumberReport(DPUReportInput input)
        {
            DPUReportDetails DPUReport = new DPUReportDetails();
            DPUReportDAL _dal = new DPUReportDAL();

            DataSet ds = new DataSet();
            ds = _dal.GetDefectNumberReport(input);

            List<BarDPUReport> BarDPUReport = new List<BarDPUReport>();
            List<LineDPUReport> LineDPUReport = new List<LineDPUReport>();

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    BarDPUReport dpuReport = new BarDPUReport();

                    dpuReport.Month = Convert.ToString(ds.Tables[0].Rows[i]["Month"]);
                    dpuReport.VINCount = Convert.ToDecimal(ds.Tables[0].Rows[i]["VINCount"]);
                    BarDPUReport.Add(dpuReport);
                }
            }
            if (ds != null && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    LineDPUReport lineReport = new LineDPUReport();

                    lineReport.VINCount = Convert.ToDecimal(ds.Tables[1].Rows[i]["VINCount"]);
                    LineDPUReport.Add(lineReport);
                }
            }

            DPUReport.Bar = BarDPUReport;
            DPUReport.Line = LineDPUReport;
            return DPUReport;

        }

    }
}