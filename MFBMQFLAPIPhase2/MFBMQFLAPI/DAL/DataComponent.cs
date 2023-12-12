using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using MFBMQFLAPI.JsonClass;

namespace MFBMQFLAPI.DAL
{
    public class DataComponent
    {
        public static ConnectionStringSettings sql_cs= ConfigurationManager.ConnectionStrings["dbConnectionString"];
        public static SqlConnection con= new SqlConnection(ConfigurationManager.ConnectionStrings["dbConnectionString"].ConnectionString);

        public static SqlConnection con1 = new SqlConnection(ConfigurationManager.ConnectionStrings["dbConnectionString1"].ConnectionString);
        public static ConnectionStringSettings sql_cs1 = ConfigurationManager.ConnectionStrings["dbConnectionString1"];

        public void conn()
        {
            try
            {
                if (con.State != ConnectionState.Open)
                {
                    con.Close();
                }
                con.Open();
            }
            catch (Exception)
            {
                if (con.State != ConnectionState.Closed)
                {
                    con.Close();
                    con.Open();
                }
            }
        }

        public static bool ExecuteCmd(SqlCommand SqlCmd, ConnectionStringSettings cs)
        {
            bool _wasSuccessful= false;

            try
            {
                SqlConnection sqlConn=new SqlConnection(cs.ToString());
                SqlCmd.Connection = sqlConn;
                try
                {
                    sqlConn.Open();
                    SqlCmd.ExecuteNonQuery();
                    _wasSuccessful = true;
                }
                catch (Exception ex)
                {
                   ErrorLog.WriteToLog(ex.Message);
                }
                finally
                {
                    sqlConn.Close();
                }
            }
            catch (Exception ex)
            {

            }
            return _wasSuccessful;
        }

        public static DataSet SelectCmd(SqlCommand SqlCmd, ConnectionStringSettings cs)
        {
            DataSet dsResults= new DataSet();
            SqlDataAdapter sqlAdapter = new SqlDataAdapter();
            try
            {
                SqlConnection sqlConn=new SqlConnection(cs.ToString());
                SqlCmd.Connection = sqlConn;
                try
                {
                    SqlCmd.CommandTimeout = 0;
                    sqlAdapter.SelectCommand = SqlCmd;
                    sqlAdapter.Fill(dsResults);
                }
                catch (SqlException ex)
                {
                    ErrorLog.WriteToLog(ex.Message);
                    throw ex;
                }
                finally
                {
                    sqlConn.Close();
                    sqlConn.Dispose();
                    SqlCmd.Dispose();
                }
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog(ex.Message);
            }
            return dsResults;
        }
       
    }
}