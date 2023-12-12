using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using MFBMQFLAPI.JsonClass;
using System.Data.SqlClient;

namespace MFBMQFLAPI.DAL
{
    public class DPUReportDAL : DataComponent
    {
        
            public DataSet GetDPUReportDropdownlist(DPUReportDropdownInput input)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetVehicleAndModelReport", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(input.PlantId));
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet GetDPUReport(DPUReportInput Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetDPUReport", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ModelIds", Convert.ToString(Input.ModelIds));
            cmd.Parameters.AddWithValue("@VariantIds", Convert.ToString(Input.VehicleIds));
            cmd.Parameters.AddWithValue("@QGateIds", Convert.ToString(Input.QGateIds));
            cmd.Parameters.AddWithValue("@Year", Input.Year);
            cmd.Parameters.AddWithValue("@Type", Convert.ToString(Input.Type));
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(Input.PlantId));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetDefectNumberReport(DPUReportInput Input)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetDefectNumberReport", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ModelIds", Convert.ToString(Input.ModelIds));
            cmd.Parameters.AddWithValue("@VariantIds", Convert.ToString(Input.VehicleIds));
            cmd.Parameters.AddWithValue("@QGateIds", Convert.ToString(Input.QGateIds));
            cmd.Parameters.AddWithValue("@Year", Input.Year);
            cmd.Parameters.AddWithValue("@Type", Convert.ToString(Input.Type));
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(Input.PlantId));
            cmd.Parameters.AddWithValue("@FromDate", Convert.ToString(Input.FromDate));
            cmd.Parameters.AddWithValue("@ToDate", Convert.ToString(Input.EndDate));

            return SelectCmd(cmd, sql_cs);
        }

    }
}