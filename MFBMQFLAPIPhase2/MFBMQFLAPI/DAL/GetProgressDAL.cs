using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MFBMQFLAPI.DAL
{
    public class GetProgressDAL : DataComponent
    {
        public DataSet GetProgressMonitorData(ProgressMonitor Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetProgressMonitor", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);

            if (!string.IsNullOrEmpty(Input.vinfrom))
            {
                cmd.Parameters.AddWithValue("@VINFrom", Input.vinfrom);
                cmd.Parameters.AddWithValue("@VINTo", Input.vinto);
            }

            if (!string.IsNullOrEmpty(Input.fromdate))
            {
                //string[] from = Convert.ToString(Input.fromdate).Split('/');
                //string[] to = Convert.ToString(Input.todate).Split('/');
                //cmd.Parameters.AddWithValue("@FromDate", from[2] + "-" + from[1] + "-" + from[0]);
                //cmd.Parameters.AddWithValue("@ToDate", to[2] + "-" + to[1] + "-" + to[0]);

                cmd.Parameters.AddWithValue("@FromDate", Input.fromdate);
                cmd.Parameters.AddWithValue("@ToDate", Input.todate);
            }
            cmd.Parameters.AddWithValue("@FromCount", Input.fromcount);
            cmd.Parameters.AddWithValue("@ToCount", Input.tocount);
            cmd.Parameters.AddWithValue("@LineId", Input.Lineid);
            //cmd.Parameters.AddWithValue("@StoredProceudre", "OldProgress");

            return SelectCmd(cmd, sql_cs);
        }

        public DataSet ProgressMonitorVINHistory(ProgressMonitor Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_ProgressMonitorVINHistoryDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);
            cmd.Parameters.AddWithValue("@VINNumber", Input.VINNumber);
            cmd.Parameters.AddWithValue("@ModelName", Input.ModelName);
            return SelectCmd(cmd, sql_cs);
        }

        public bool DeleteVINandDetails(DeleteVIN deleteVIN)
        {
            SqlCommand cmd = new SqlCommand("DeleteVINDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VIN", deleteVIN.vin);
            cmd.Parameters.AddWithValue("@UserId", deleteVIN.userid);
            cmd.Parameters.AddWithValue("@Comments", deleteVIN.comments);
            cmd.Parameters.AddWithValue("@ModelName", deleteVIN.modelname);
            cmd.Parameters.AddWithValue("@VehicleType", deleteVIN.vehicletypename);
            cmd.Parameters.AddWithValue("@PlantId", deleteVIN.plantid);
            return ExecuteCmd(cmd, sql_cs);
        }


        public DataSet GetProgressMonitoNewData(ProgressMonitor Input)
      {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetProgressMonitorNew", con);
            //SqlCommand cmd = new SqlCommand("MSP_GetProgressMonitorNew", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);

            if (!string.IsNullOrEmpty(Input.vinfrom))
            {
                cmd.Parameters.AddWithValue("@VINFrom", Input.vinfrom);
                cmd.Parameters.AddWithValue("@VINTo", Input.vinto);
            }

            if (!string.IsNullOrEmpty(Input.fromdate))
            {
                cmd.Parameters.AddWithValue("@FromDate", Input.fromdate);
                cmd.Parameters.AddWithValue("@ToDate", Input.todate);
            }
           // cmd.Parameters.AddWithValue("@StoredProceudre", "NEWProgress");
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetProgressMonitorAllData(ProgressMonitor Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetProgressMonitorAll", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);

            if (!string.IsNullOrEmpty(Input.vinfrom))
            {
                cmd.Parameters.AddWithValue("@VINFrom", Input.vinfrom);
                cmd.Parameters.AddWithValue("@VINTo", Input.vinto);
            }

            if (!string.IsNullOrEmpty(Input.fromdate))
            {
                cmd.Parameters.AddWithValue("@FromDate", Input.fromdate);
                cmd.Parameters.AddWithValue("@ToDate", Input.todate);
            }
            //cmd.Parameters.AddWithValue("@StoredProceudre", "AllProgress");
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet ExcelDownloadforIssueDate(ProgressMonitor Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_PMExcelDownloadforIssueDate", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);

            if (!string.IsNullOrEmpty(Input.vinfrom))
            {
                cmd.Parameters.AddWithValue("@VINFrom", Input.vinfrom);
                cmd.Parameters.AddWithValue("@VINTo", Input.vinto);
            }

            if (!string.IsNullOrEmpty(Input.fromdate))
            {
                cmd.Parameters.AddWithValue("@FromDate", Input.fromdate);
                cmd.Parameters.AddWithValue("@ToDate", Input.todate);
            }
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet ProgressMonitorVINHistoryExcel(ProgressMonitor Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_ProgressMonitorVINHistoryExcel", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);

            if (!string.IsNullOrEmpty(Input.vinfrom))
            {
                cmd.Parameters.AddWithValue("@VINFrom", Input.vinfrom);
                cmd.Parameters.AddWithValue("@VINTo", Input.vinto);
            }

            if (!string.IsNullOrEmpty(Input.fromdate))
            {
                cmd.Parameters.AddWithValue("@FromDate", Input.fromdate);
                cmd.Parameters.AddWithValue("@ToDate", Input.todate);
            }

            return SelectCmd(cmd, sql_cs);
        }


        public DataSet InsertDynamicColumnText(string ListDynamicvalues)
        {
            SqlCommand cmd = new SqlCommand("MSP_InsertDynamicColumnDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ListDynamicvaluesXml", Convert.ToString(ListDynamicvalues));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetProgressMonitorNewDataForTablet(ProgressMonitor Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetProgressMonitorNewForTablet", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Input.plantid);

            if (!string.IsNullOrEmpty(Input.vinfrom))
            {
                cmd.Parameters.AddWithValue("@VINFrom", Input.vinfrom);
                cmd.Parameters.AddWithValue("@VINTo", Input.vinto);
            }

            if (!string.IsNullOrEmpty(Input.fromdate))
            {
                cmd.Parameters.AddWithValue("@FromDate", Input.fromdate);
                cmd.Parameters.AddWithValue("@ToDate", Input.todate);
            }
            //cmd.Parameters.AddWithValue("@StoredProceudre", "NEWProgressFORTablet");
            return SelectCmd(cmd, sql_cs);
        }



        public DataSet GETDynamicColumnText(GETDynamicColumnTextInputs Input)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetDynamicvalues", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@QFLFeedBackworkflowId", Input.QFLWorkFeedBackworkflowId);
            cmd.Parameters.AddWithValue("@VinId", Input.VinId);
             cmd.Parameters.AddWithValue("@VinNumber", Input.VinNumber);
            
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet UpdateAllProgressColor(ColorInputs Inputs)
        {
            SqlCommand cmd = new SqlCommand("MSP_UpdateAllProgressColor", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToString(Inputs.Vinnumber));
            cmd.Parameters.AddWithValue("@QFLFeedBackworkFlowId", Convert.ToString(Inputs.QFLWorkFeedBackworkflowId));
            cmd.Parameters.AddWithValue("@SelectValue", Convert.ToString(Inputs.SelectValue));
            cmd.Parameters.AddWithValue("@SelectedColor", Convert.ToString(Inputs.SelectedColor));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetVinlists(GetVinlists Input)
        {
            SqlCommand cmd = new SqlCommand("GetVinlist", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Vinnumber", Input.Vinnumber);
            cmd.Parameters.AddWithValue("@ModelName", Input.ModelName);

           

            return SelectCmd(cmd, sql_cs);
        }

        public DataSet Get_VinUploadCheckListHistory()
        {
            SqlCommand cmd = new SqlCommand("GetVinUploadCheckList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            return SelectCmd(cmd, sql_cs);
        }

    }
}