using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Net;
using MFBMAutomatedQFL.Models;
using System.Configuration;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Data;
using Newtonsoft.Json;

namespace MFBMAutomatedQFL.Services
{
    public partial class WebServices : WebClient
    {
        public int Timeout { get; set; }

        protected override WebRequest GetWebRequest(Uri address)
        {
            var request = base.GetWebRequest(address);
            request.Timeout = Timeout;
            return request;
        }

        //public UserDetails GetUserDetails(string emailid, string token)
        //{
        //    string result = string.Empty;
        //    UserDetails user = new UserDetails();
        //    try
        //    {
        //        var client = new WebServices();
        //        client.Timeout = 900000;
        //        client.Credentials = CredentialCache.DefaultCredentials;
        //        client.Headers["Content-type"] = "application/json";
        //        client.Headers["Authorization"] = "Basic " + token;
        //        client.Headers["cache-control"] = "no-cache";
                
        //        client.Proxy.Credentials = CredentialCache.DefaultCredentials;
        //        var url = ConfigurationManager.AppSettings["API"] + "QFL.svc/GetUserDetails?emailid=" + emailid;
        //        var jsonString = client.DownloadString(url);
        //        result = Convert.ToString(jsonString);
        //        JObject o = JObject.Parse(jsonString);
               
        //        user = JsonConvert.DeserializeObject<UserDetails>(jsonString);
        //        //user.UserName = (string)o["UserName"];
        //        //user.Email = (string)o["Email"];
        //        //user.LastLogin = (string)o["LastLogin"];
        //        //user.UserId = (int)o["UserId"];
        //        //user.CountryCode = (string)o["CountryCode"];
        //        //user.DeptId = (int)o["DeptId"];
        //        //user.RoleId = (int)o["RoleId"];
        //    }
        //    catch (Exception ex)
        //    {
        //        WriteToLog("Service Consume Error");
        //        WriteToLog(ex.Message);
        //    }
        //    return user;
        //}


        public DataSet GetUserDetails(string emailid, string token)
        {
            string result = string.Empty;
            UserDetails user = new UserDetails();
            UserDetails Input = new UserDetails();
            Input.Email = emailid;
            DataSet myDataSet = new DataSet();
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = CredentialCache.DefaultCredentials;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";

                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                var url = ConfigurationManager.AppSettings["API"] + "QFL.svc/GetUserDetails";

                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(UserDetails));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                string unescapedJsonString = JsonConvert.DeserializeObject<string>(jsonString);

                stream.Close();

              
                myDataSet = JsonConvert.DeserializeObject<DataSet>(unescapedJsonString);
                


            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }
            return myDataSet;
        }

        public string GetUploadPath()
        {
            return ConfigurationManager.AppSettings["UploadFile"];
        }
        public string GetSignaturePathPath()
        {
            return ConfigurationManager.AppSettings["SignaturePath"];
        }
        public string GetUploadPathForPaint()
        {
            return ConfigurationManager.AppSettings["PaintingImage"];
        }

        public string AddUpdateCheckListMaster(CheckListMaster checkListMaster, string token)
        {
            string url = ConfigurationManager.AppSettings["API"] + "Master.svc/InsertUpdateCheckListmaster";
            string jsonString = string.Empty;
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(CheckListMaster));
                serializer.WriteObject(stream, checkListMaster);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                jsonString = Encoding.UTF8.GetString(stream.ToArray());
                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return jsonString;
        }

        public string InsertUpdatActualComment(Actualcomment json)
            {
            string url = ConfigurationManager.AppSettings["API"] + "QFL.svc/InsertUpdateActualCommentDetails";
            string jsonString = string.Empty;
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + json.token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Actualcomment));
                serializer.WriteObject(stream, json);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                jsonString = Encoding.UTF8.GetString(stream.ToArray());
                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return jsonString;
        }
        public string InsertUpdatStandMaster(StandardModel json)
        {
            string url = ConfigurationManager.AppSettings["API"] + "Master.svc/AddUpdateStandardMaster";
            string jsonString = string.Empty;
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + json.token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(StandardModel));
                serializer.WriteObject(stream, json);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                jsonString = Encoding.UTF8.GetString(stream.ToArray());
                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return jsonString;
        }
        public void WriteToLog(string text)
        {
            string sTemp = ConfigurationManager.AppSettings["Path"] + "_" + DateTime.Now.ToString("dd_MM") + ".txt";
            FileStream Fs = new FileStream(sTemp, FileMode.OpenOrCreate | FileMode.Append);
            StreamWriter st = new StreamWriter(Fs);
            string dttemp = DateTime.Now.ToString("[dd:MM:yyyy] [HH:mm:ss:ffff]");
            st.WriteLine(dttemp + "\t" + text);
            st.Close();
        }



        public DataSet Get_Excel_ExportNew(int PlantId, string VINFrom, string VINTo, string FromDate, string ToDate, string token)
        {
            Excel_DetailsList _obj = new Excel_DetailsList();
            Inputs Input = new Inputs();
            string jsonStrings = string.Empty;
            //string jsonString = string.Empty;
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/GetProgressMonitorNewDatas";
            Input.plantid = PlantId;
            Input.vinfrom = VINFrom;
            Input.vinto = VINTo;
            Input.fromdate = FromDate;
            Input.todate = ToDate;
            DataSet myDataSet = new DataSet();
            try
            {



                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Inputs));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                string unescapedJsonString = JsonConvert.DeserializeObject<string>(jsonString);

                stream.Close();

                //var finalUnescapedJsonString = JsonConvert.DeserializeObject<string>(unescapedJsonString);
               

              //  WriteToLog(jsonString);

                myDataSet = JsonConvert.DeserializeObject<DataSet>(unescapedJsonString);

                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            //return _obj;
            return myDataSet;
        }


        //public DataSet Get_Excel_ExportNew(int PlantId, string VINFrom, string VINTo,  string FromDate, string ToDate, string token)
        //{
        //    Excel_DetailsList _obj = new Excel_DetailsList();
        //    Inputs Input = new Inputs();
        //    string jsonStrings = string.Empty;
        //    //string jsonString = string.Empty;
        //    string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/GetProgressMonitorNewDatas";
        //    Input.plantid = PlantId;
        //    Input.vinfrom = VINFrom;
        //    Input.vinto = VINTo;
        //    Input.fromdate = FromDate;
        //    Input.todate = ToDate;
        //    DataSet myDataSet = new DataSet();
        //    try
        //    {
        //        var client = new WebServices();
        //        client.Timeout = 900000;
        //        client.Credentials = System.Net.CredentialCache.DefaultCredentials;
        //        client.Encoding = Encoding.UTF8;
        //        client.Headers["Content-type"] = "application/json";
        //        client.Headers["Authorization"] = "Basic " + token;
        //        client.Headers["cache-control"] = "no-cache";
        //        client.Proxy.Credentials = CredentialCache.DefaultCredentials;
        //        MemoryStream stream = new MemoryStream();
        //        DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Inputs));
        //        serializer.WriteObject(stream, Input);
        //        byte[] data = client.UploadData(url, "POST", stream.ToArray());
        //        stream = new MemoryStream(data);
        //        var jsonString = Encoding.UTF8.GetString(stream.ToArray());
        //        // _obj = JsonConvert.DeserializeObject<Excel_DetailsList>(jsonString);
        //        string unescapedJsonString = JsonConvert.DeserializeObject<string>(jsonString);
        //        //var finalUnescapedJsonString = JsonConvert.DeserializeObject<string>(unescapedJsonString);
        //        jsonString = jsonString.Substring(1);
        //        jsonString = jsonString.Substring(0, jsonString.Length - 1);
        //        jsonString = jsonString.Replace(@"\", " ");

        //        WriteToLog(jsonString);

        //        myDataSet = JsonConvert.DeserializeObject<DataSet>(unescapedJsonString);

        //        stream.Close();

        //    }
        //    catch (Exception ex)
        //    {
        //        WriteToLog("Service Consume Error");
        //        WriteToLog(ex.Message);
        //    }

        //    //return _obj;
        //    return myDataSet;
        //}


        public PMExcelIssuedateResponse ExcelDownloadforIssueDate(Inputs inputs, string token)
        {

            PMExcelIssuedateResponse vinhistory = new PMExcelIssuedateResponse();
            //PMExcelIssuedateRequest Input = new PMExcelIssuedateRequest();
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/ExcelDownloadforIssueDate";
            // Input.PlantId = PlantId;
            //  Input.arryVIN = inputs.arryVIN;
            try
            {
                var client = new WebServices();
                client.Timeout = 1900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token; ;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Inputs));
                serializer.WriteObject(stream, inputs);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                vinhistory = JsonConvert.DeserializeObject<PMExcelIssuedateResponse>(jsonString);

                stream.Close();
            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return vinhistory;


        }

        public ProgressMonitorVINHistory VINHistoryDownloadExcel(int PlantId, string VIN, string token,string ModelName)
        {
            ProgressMonitorVINHistory vinhistory = new ProgressMonitorVINHistory();
            Inputs Input = new Inputs();
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/ProgressMonitorVINHistory";
            Input.plantid = PlantId;
            Input.VINNumber = VIN;
            Input.ModelName = ModelName;
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Inputs));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                vinhistory = JsonConvert.DeserializeObject<ProgressMonitorVINHistory>(jsonString);

                stream.Close();
            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return vinhistory;
        }


        public ProgressMonitorVINHistory VINHistoryDownloadExcelHistory(int PlantId, string FromVIN, string ToVin, string FromDate, string ToDate, string token)
        {
            ProgressMonitorVINHistory vinhistory = new ProgressMonitorVINHistory();
            Inputs Input = new Inputs();
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/ProgressMonitorVINHistoryExcel";
            Input.plantid = PlantId;
            Input.vinfrom = FromVIN;
            Input.vinto = ToVin;
            Input.fromdate = FromDate;
            Input.todate = ToDate;
           // Input.ModelName = ModelName;

            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Inputs));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                vinhistory = JsonConvert.DeserializeObject<ProgressMonitorVINHistory>(jsonString);

                stream.Close();
            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return vinhistory;
        }


        public DataSet Get_VINDATA(int PlantId, string VINFrom, string VINTo, string FromDate, string ToDate, string token)
        {

            ProgressMonitor Input = new ProgressMonitor();
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/GetProgressMonitorData";
            Input.plantid = PlantId;
            Input.vinfrom = VINFrom;
            Input.vinto = VINTo;
            Input.fromdate = FromDate;
            Input.todate = ToDate;
            DataSet myDataSet = new DataSet();
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(ProgressMonitor));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                string unescapedJsonString = JsonConvert.DeserializeObject<string>(jsonString);
                myDataSet = JsonConvert.DeserializeObject<DataSet>(unescapedJsonString);
                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            //return _obj;
            return myDataSet;
        }


        public GetUserAccessDetails GetUserAccessDetails(int plantid,string token)
        {

            GetUserAccessDetails User = new GetUserAccessDetails();
            GetUserAccessDetailInput Input = new GetUserAccessDetailInput();
            //PMExcelIssuedateRequest Input = new PMExcelIssuedateRequest();
            string url = ConfigurationManager.AppSettings["API"] + "Master.svc/GetUserAccessDetails";
                
          Input.PlantCode = plantid;
            try
            {
                var client = new WebServices();
                client.Timeout = 1900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token; ;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(GetUserAccessDetailInput));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                User = JsonConvert.DeserializeObject<GetUserAccessDetails>(jsonString);

                stream.Close();
            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return User;


        }

        public string AddUpdateCheckListMasterForPainting(CheckListMaster checkListMaster, string token)
        {
            string url = ConfigurationManager.AppSettings["API"] + "Master.svc/InsertUpdateCheckListmasterForPainting";
            string jsonString = string.Empty;
            checkListMaster.checklistitems = "";
            checkListMaster.mode = "";
            checkListMaster.result = "";
            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(CheckListMaster));
                serializer.WriteObject(stream, checkListMaster);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                jsonString = Encoding.UTF8.GetString(stream.ToArray());
                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return jsonString;
        }


        public DataSet DownloadExcelProgressAll(int PlantId, string VINFrom, string VINTo, string FromDate, string ToDate, string token)
        {
            Excel_DetailsList _obj = new Excel_DetailsList();
            Inputs Input = new Inputs();
            string jsonStrings = string.Empty;
            //string jsonString = string.Empty;
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/GetProgressMonitorAllDataForExcel";
            Input.plantid = PlantId;
            Input.vinfrom = VINFrom;
            Input.vinto = VINTo;
            Input.fromdate = FromDate;
            Input.todate = ToDate;
            DataSet myDataSet = new DataSet();
            try
            {



                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Inputs));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                string unescapedJsonString = JsonConvert.DeserializeObject<string>(jsonString);

                stream.Close();

                //var finalUnescapedJsonString = JsonConvert.DeserializeObject<string>(unescapedJsonString);


               // WriteToLog(jsonString);

                myDataSet = JsonConvert.DeserializeObject<DataSet>(unescapedJsonString);

                stream.Close();

            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            //return _obj;
            return myDataSet;
        }


        public GetVinlists GetVinlist( string Vinnumber, string ModelName ,string token)
        {
            GetVinlists vinhistory = new GetVinlists();
            GetVinlists Input = new GetVinlists();
            string url = ConfigurationManager.AppSettings["API"] + "Monitor.svc/GetVinLists";
            Input.Vinnumber = Vinnumber;
            Input.ModelName = ModelName;
           
            // Input.ModelName = ModelName;

            try
            {
                var client = new WebServices();
                client.Timeout = 900000;
                client.Credentials = System.Net.CredentialCache.DefaultCredentials;
                client.Encoding = Encoding.UTF8;
                client.Headers["Content-type"] = "application/json";
                client.Headers["Authorization"] = "Basic " + token;
                client.Headers["cache-control"] = "no-cache";
                client.Proxy.Credentials = CredentialCache.DefaultCredentials;
                MemoryStream stream = new MemoryStream();
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(GetVinlists));
                serializer.WriteObject(stream, Input);
                byte[] data = client.UploadData(url, "POST", stream.ToArray());
                stream = new MemoryStream(data);
                var jsonString = Encoding.UTF8.GetString(stream.ToArray());
                vinhistory = JsonConvert.DeserializeObject<GetVinlists>(jsonString);

                stream.Close();
            }
            catch (Exception ex)
            {
                WriteToLog("Service Consume Error");
                WriteToLog(ex.Message);
            }

            return vinhistory;
        }


    }
}
