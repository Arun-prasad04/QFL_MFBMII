using MFBMAutomatedQFL.Models;
using MFBMAutomatedQFL.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Data;
using System.IO;
using System.Web.Mvc;
using NPOI;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.HSSF;
using System.Web;
using System.Text;
using Patagames.Ocr;
using Patagames.Ocr.Enums;
using System.Net;
using OfficeOpenXml;
using System.Reflection;
using System.IO.Compression;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Web.Helpers;
using NPOI.SS.Util;
using System.Drawing.Imaging;

namespace MFBMAutomatedQFL.Controllers
{

    public class HomeController : Controller
    {

        string langStatus = string.Empty;
        public ActionResult Index()
        {



            return View();
        }
        public ActionResult Logoff()
        {
            Session.RemoveAll();
            return Redirect(ConfigurationManager.AppSettings["Logout"]);
        }
        [SessionExpire]

        public ActionResult HomePage()
        {
            UserDetails users = (UserDetails)Session["UserDetails"];
            Session.RemoveAll();
            return Redirect((Convert.ToString(ConfigurationManager.AppSettings["Logout"]) + "Home/HomePage/" + users.language));
        }
        [SessionExpire]
        public ActionResult QFLFeedback()
        {
            return View();
        }

        [SessionExpire]
        public ActionResult QgateMaster()
        {
            return View();
        }
        [SessionExpire]
        public ActionResult StandardMaster()
        {
            StandardModel standardModel = new StandardModel();
            return View(standardModel);
        }

        [SessionExpire]
        public ActionResult DefectPlaceMaster()
        {
            Actualcomment defectPlaceModel = new Actualcomment();
            return View(defectPlaceModel);
        }
        [SessionExpire]

        public ActionResult CheckListMaster(string qgateid, string gatename, string LineId, string Linename,string ReExaminationGateId)
        {
            CheckListViewModel checklistviewModel = new CheckListViewModel
            {
                QGateId = qgateid,
                QGateName = gatename,
                LineId = LineId,
                Linename = Linename,
                ReExaminationGateId = ReExaminationGateId

            };
            return View(checklistviewModel);
        }
        //[SessionExpire]
        //[HttpPost]
        //public ActionResult CheckListMaster(string qgateid,string gatename)
        //{
        //    CheckListViewModel checklistviewModel = new CheckListViewModel
        //    {
        //        //QGateId = (formCollection["hdngateid"] != null) ? formCollection["hdngateid"] : "",
        //        //QGateName = (formCollection["hdngatename"] != null) ? formCollection["hdngatename"] : ""
        //    };
        //    return View(checklistviewModel);
        //}
        [SessionExpire]
        public ActionResult ProgressMonitor()
        {
            return View();
        }


        public ActionResult MFBMAutomatedQFL()
        {
            try
            {


                if (string.IsNullOrEmpty(Convert.ToString(Session["UserName"])))
                {

                    string email = Convert.ToString(Request.QueryString["email"]);
                    string tokenval = Convert.ToString(Request.QueryString["token"]);
                    bool pagevalidate = CheckToken(tokenval);
                    if (pagevalidate && email != null && email != "")
                    {
                        DataSet ds = new DataSet();
                        UserDetails Users = new UserDetails();
                        WebServices _web = new WebServices();
                        //string token = GenerateToken();
                        string token = tokenval;
                        ds = _web.GetUserDetails(email, token);



                        Users.Token = token;
                        Users.Language = Convert.ToString(Request.QueryString["ln"]);
                        langStatus = Convert.ToString(Request.QueryString["ln"]);

                        var filterLogin = from Line in ds.Tables[0].AsEnumerable()

                                          select new
                                          {
                                              UserName = Line.Field<string>("UserName"),
                                              LastLogin = Line.Field<DateTime>("LastLogin"),
                                              EmailId = Line.Field<string>("Email"),
                                              RoleId = Line.Field<Int64>("RoleId"),
                                              Userid = Line.Field<Int64>("Userid"),
                                              CountryCode = Line.Field<string>("CountryCode"),
                                              Deptid = Line.Field<Int64>("Deptid"),


                                          };


                        var filterAccess = from Line in ds.Tables[1].AsEnumerable()

                                           select new
                                           {
                                               UserId = Line.Field<Int64>("UserId"),
                                               AccessId = Line.Field<Int64>("AccessId"),
                                               AccessName = Line.Field<string>("AccessName"),
                                               Toolid = Line.Field<Int64>("Toolid"),
                                               AccessType = Line.Field<string>("AccessType"),


                                           };


                        UserAccess Access = new UserAccess();
                        List<UserAccess> AccesesDetails = new List<UserAccess>();

                        foreach (DataRow dr in ds.Tables[1].Rows)
                        {
                            AccesesDetails.Add(new UserAccess
                            {
                                AccessId = Convert.ToInt16(dr["AccessId"]),
                                UserId = Convert.ToInt16(dr["UserId"]),
                                AccessName = Convert.ToString(dr["AccessName"]),
                                AccessType = Convert.ToString(dr["AccessType"]),
                                ToolId = Convert.ToInt16(dr["ToolId"]),
                            });
                        }

                        Users.AccessDetails = AccesesDetails;

                        Users.UserName = filterLogin.ElementAt(0).UserName;
                        Users.LastLogin = Convert.ToString(filterLogin.ElementAt(0).LastLogin);
                        Users.Email = filterLogin.ElementAt(0).EmailId.ToString();
                        Users.UserId = Convert.ToInt16(filterLogin.ElementAt(0).Userid);
                        Users.CountryCode = filterLogin.ElementAt(0).CountryCode;
                        Users.DeptId = Convert.ToInt16(filterLogin.ElementAt(0).Deptid);
                        Users.RoleId = Convert.ToInt16(filterLogin.ElementAt(0).RoleId);

                        Session["UserDetails"] = Users;

                        Session["UserName"] = filterLogin.ElementAt(0).UserName;
                       Session["LastLogin"] = filterLogin.ElementAt(0).LastLogin;
                        Session["EmailId"] = filterLogin.ElementAt(0).EmailId;
                        Session["Userid"] = filterLogin.ElementAt(0).Userid;
                        Session["CountryCode"] = filterLogin.ElementAt(0).CountryCode;
                        Session["Deptid"] = filterLogin.ElementAt(0).Deptid;
                        Session["RoleId"] = filterLogin.ElementAt(0).RoleId;
                        var roleid = filterLogin.ElementAt(0).RoleId;
                        if (Convert.ToInt64(roleid) == 6)
                        {
                            if (Users.AccessDetails != null)
                            {
                                //var GateAccessEnable=Users.AccessDetails.FirstOrDefault(x=>x.AccessType!="page");
                                //if()
                                var ProgressMonitorEnabled = Users.AccessDetails.FirstOrDefault(x => x.AccessName == "Progress Monitor");
                                var QGateMasterEnabled = Users.AccessDetails.FirstOrDefault(x => x.AccessName == "Master Access");
                                var QFLFeedbackEnabled = Users.AccessDetails.FirstOrDefault(x => x.AccessName == "QFL FeedBack");
                                var ReportAccess = Users.AccessDetails.FirstOrDefault(x => x.AccessName == "Report Access");

                                if (ProgressMonitorEnabled != null)
                                {
                                    ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                                    return RedirectToAction("ProgressMonitor", "Home");
                                }
                                else if (QFLFeedbackEnabled != null)
                                {
                                    ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                                    return RedirectToAction("QFLFeedback", "Home");
                                }
                                else if (QGateMasterEnabled != null)
                                {
                                    ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                                    return RedirectToAction("QGateMaster", "Home");
                                }
                                else
                                {
                                    ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                                    return RedirectToAction("QFLFeedback", "Home");
                                }
                            }
                            else
                            {
                                ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                                return RedirectToAction("QFLFeedback", "Home");
                            }
                        }
                        else
                        {
                            ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                            return RedirectToAction("QFLFeedback", "Home");
                        }

                    }
                    else
                    {
                        ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                        return Redirect(Convert.ToString(ConfigurationManager.AppSettings["Logout"]));
                    }
                }
                else
                {
                    return RedirectToAction("QFLFeedback", "Home");
                }
            }
            catch (Exception ex)
            {
                ErrorLog.Log("MFBMAutomatedQFL Function- Current Language Status:  " + langStatus);
                ErrorLog.Log("QMIssueTracker " + ex.Message);
                return Redirect(Convert.ToString(ConfigurationManager.AppSettings["Logout"]));
            }
        }
        [SessionExpire]
        public JsonResult PageLoadData()
        {
            UserDetails Users = new UserDetails();
            try
            {

                Users = (UserDetails)Session["UserDetails"];


                //DataSet ds = (DataSet)Session["UserDetails"];
                //var filterLogin = from Line in ds.Tables[0].AsEnumerable()

                //                  select new
                //                  {
                //                      UserName = Line.Field<string>("UserName"),
                //                      LastLogin = Line.Field<string>("LastLogin"),
                //                      EmailId = Line.Field<string>("Email"),
                //                      RoleId = Line.Field<Int64>("RoleId"),
                //                      Userid = Line.Field<Int64>("Userid"),
                //                      CountryCode = Line.Field<string>("CountryCode"),
                //                      Deptid = Line.Field<Int64>("Deptid"),


                //                  };

                //var filterAccess = from Line in ds.Tables[1].AsEnumerable()

                //                   select new
                //                   {
                //                       UserId = Line.Field<Int64>("UserId"),
                //                       AccessId = Line.Field<Int64>("AccessId"),
                //                       AccessName = Line.Field<string>("AccessName"),
                //                       Toolid = Line.Field<Int64>("Toolid"),
                //                       AccessType = Line.Field<string>("AccessType"),


                //                   };


                //UserAccess Access = new UserAccess();
                //List<UserAccess> AccesesDetails = new List<UserAccess>();

                //for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                //{

                //    Access.AccessId = Convert.ToInt16(filterAccess.ElementAt(i).AccessId);
                //    Access.UserId = Convert.ToInt16(filterAccess.ElementAt(i).UserId);
                //    Access.AccessName = filterAccess.ElementAt(i).AccessName;
                //    Access.AccessType = filterAccess.ElementAt(i).AccessType;
                //    Access.ToolId = Convert.ToInt16(filterAccess.ElementAt(i).Toolid);
                //    AccesesDetails.Add(Access);
                //}


                //Users.AccessDetails = AccesesDetails;

                //Users.UserName = filterLogin.ElementAt(0).UserName;
                //Users.LastLogin = filterLogin.ElementAt(0).LastLogin;
                //Users.Email = filterLogin.ElementAt(0).EmailId.ToString();
                //Users.UserId = Convert.ToInt16( filterLogin.ElementAt(0).Userid);
                //Users.CountryCode = filterLogin.ElementAt(0).CountryCode;
                //Users.DeptId = Convert.ToInt16(filterLogin.ElementAt(0).Deptid);
                //Users.RoleId = Convert.ToInt16(filterLogin.ElementAt(0).RoleId);



                if (Users == null)
                    Users = new UserDetails();
                Users.Api = Convert.ToString(ConfigurationManager.AppSettings["Api"]);
                Users.SiganturePath = Convert.ToString(ConfigurationManager.AppSettings["SignaturePath"]);
                Users.SignatureSitePath = Convert.ToString(ConfigurationManager.AppSettings["SignatureSitePath"]);
                Users.PaintingImagePath = Convert.ToString(ConfigurationManager.AppSettings["PaintingImagePath"]);


                //ErrorLog.Log("JsonResult :" + Json(Users, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                ErrorLog.Log("Page Load Data " + ex.Message);
            }
            return Json(Users, JsonRequestBehavior.AllowGet);
        }
        [SessionExpire]
        public JsonResult LanguageChanger(string lan)
        {
            UserDetails Users = new UserDetails();

            try
            {
                Users = (UserDetails)Session["UserDetails"];

                if (Users == null)
                    Users = new UserDetails();

                Users.Language = lan;
            }
            catch (Exception ex)
            {
                ErrorLog.Log("Page Load Data " + ex.Message);
            }
            return Json(Users, JsonRequestBehavior.AllowGet);
        }

        public bool CheckToken(string tokenval)
        {
            tokenval = "Basic " + tokenval;
            var svcCredentials = System.Text.ASCIIEncoding.ASCII
             .GetString(Convert.FromBase64String(tokenval.Substring(6)))
             .Split('#');
            var user = new
            {
                Name = svcCredentials[0],
                Password = svcCredentials[1],
                Time = svcCredentials[2]
            };

            if (Convert.ToDateTime(user.Time) < DateTime.UtcNow.AddMinutes(-60)) // Time Validation
            {
                return false;
            }
            else if ((user.Name == ConfigurationManager.AppSettings["TokenUser"] && user.Password == ConfigurationManager.AppSettings["TokenPass"]))
            {

                return true;
            }
            else
            {
                return false;
            }
            //return true;
        }
        [SessionExpire]
        public JsonResult MaintainPlantId(int PlantId)
        {
            UserDetails Users = new UserDetails();
            try
            {
                //  ErrorLog.Log("PageLoad");
                //  ErrorLog.Log("UserDetails :" + Convert.ToString(Session["UserDetails"]));
                Users = (UserDetails)Session["UserDetails"];
                if (Users == null)
                    Users = new UserDetails();
                Users.Api = Convert.ToString(ConfigurationManager.AppSettings["Api"]);


                Users.PlantId = PlantId;

                //  ErrorLog.Log("JsonResult :" + Json(Users, JsonRequestBehavior.AllowGet));
            }
            catch (Exception ex)
            {
                ErrorLog.Log("MaintainPlantId" + ex.Message);
            }
            return Json(Users, JsonRequestBehavior.AllowGet);
        }

        [SessionExpire]
        [HttpPost]
        public ActionResult Actualcomment(FormCollection formCollection, string actualvalue, string responsible)
        {
            WebServices _web = new WebServices();
            try
            {

                HttpFileCollectionBase file = Request.Files;
                int r = file.Count;
                int i = 0;
                List<Actualcomment> defectdetail = new List<Actualcomment>();
                string checkitems = string.Empty;
                StringBuilder sb = new StringBuilder();
                //var fileName = Convert.ToString(formCollection["filename"]);

                //string guid = Convert.ToString(formCollection["fileguid"]);
                string FolderName = Convert.ToString(formCollection["fileguid"]);
                var checklistitemid = Convert.ToString(formCollection["checklistitemid"]);



                string postedFile = _web.GetUploadPath() + "ActualComment\\" + FolderName;
                if (!System.IO.Directory.Exists(postedFile))
                {
                    System.IO.Directory.CreateDirectory(postedFile);

                }

                if (System.IO.Directory.Exists(postedFile))
                {
                    for (i = 0; i < r; i++)
                    {
                        if (file != null && file[i].ContentLength > 0)
                        {


                            long b = file[i].ContentLength;
                            long kb = b / 1024;
                            long mb = kb / 1024;
                            string ActualFileSize = kb.ToString();// "KB";
                            // Storing file into the upload path
                            string fileName = Path.GetFileName(file[i].FileName);
                            string ActualFileName = fileName;
                            // fileName = fileName.Substring(0, fileName.Length - 5) + "-" + fileName.Substring(fileName.Length - 5, 5);
                            string existfilename = System.IO.Path.Combine(postedFile, fileName);
                            //int fileid = 0;
                            sb.Append("<rows>");
                            sb.Append("<row>");
                            sb.Append("<ActualFileName>" + ActualFileName.ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</ActualFileName>");
                            sb.Append("<ActualFileSize>" + ActualFileSize.ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</ActualFileSize>");
                            sb.Append("</row>");
                            sb.Append("</rows>");



                            byte[] bytes = null;
                            using (var File = new FileStream(existfilename, FileMode.Create))
                            {
                                var binaryReader = new BinaryReader(file[i].InputStream);
                                bytes = binaryReader.ReadBytes(Request.Files[0].ContentLength);
                                File.Write(bytes, 0, bytes.Length);
                                File.Flush();

                            }


                        }
                    }
                }

                var DeleteMode = Convert.ToString(formCollection["mode"]);
                //var DeleteMode = Convert.ToInt32(formCollection["fileid"]);
                var Deletefilename = Convert.ToString(formCollection["deletefilename"]);

                if (DeleteMode == "D" && System.IO.Directory.Exists(postedFile))
                {
                    string existfilename = System.IO.Path.Combine(postedFile, Deletefilename);
                    if (System.IO.File.Exists(existfilename))
                        System.IO.File.Delete(existfilename);
                }



                Actualcomment Actualcommentdetail = new Actualcomment()
                {
                    token = Convert.ToString(formCollection["token"]),

                    guid = Convert.ToString(formCollection["fileguid"]),
                    actualid = Convert.ToInt32(formCollection["actualid"]),
                    checklistitemid = Convert.ToInt32(formCollection["checklistitemid"]),
                    actualvalue = Convert.ToString(formCollection["actualvalue"]),
                    responsible = Convert.ToString(formCollection["responsible"]),
                    damagecode = Convert.ToString(formCollection["damagecode"]),
                    comments = Convert.ToString(formCollection["comments"]),
                    userid = Convert.ToInt32(formCollection["userid"]),
                    mode = Convert.ToString(formCollection["mode"]),
                    filedetail = sb.ToString(),
                    fileid = Convert.ToInt32(formCollection["fileid"]),
                    vinid = Convert.ToInt32(formCollection["VinIds"]),
                    staticchecklistitemid = Convert.ToString(formCollection["StaticCheckListItemId"]),

                };
                string result = string.Empty;

                result = _web.InsertUpdatActualComment(Actualcommentdetail);
                result = result.Replace("\"", "");
                //FileStream file1 = new FileStream(SubFolder, FileMode.Create);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)

            {
                ErrorLog.Log("Upload file: " + ex.Message);
                return Json("error", JsonRequestBehavior.AllowGet);

            }

        }

        [SessionExpire]
        [HttpPost]
        public ActionResult StandardMaster(FormCollection formCollection)
        {
            WebServices _web = new WebServices();
            try
            {

                HttpFileCollectionBase file = Request.Files;
                var fileName = Convert.ToString(formCollection["filename"]);
                string path = _web.GetUploadPath() + "StandMaster\\";
                string Tabpath = ConfigurationManager.AppSettings["UploadFileForTab"] + "StandMaster\\";
                string SubFolder = Convert.ToString(formCollection["fileguid"]);
                string vaild = Convert.ToString(formCollection["filedata"]);

                string pathString = System.IO.Path.Combine(path, SubFolder);
                string TabpathpathString = System.IO.Path.Combine(Tabpath, SubFolder);
                string Standardid = Convert.ToString(formCollection["standardid"]);

                if (!System.IO.Directory.Exists(pathString))
                {
                    System.IO.Directory.CreateDirectory(pathString);
                    string existfilename = System.IO.Path.Combine(pathString, fileName);

                    System.IO.Directory.CreateDirectory(TabpathpathString);
                    string Tabexistfilename = System.IO.Path.Combine(TabpathpathString, fileName);

                    using (var File = new FileStream(existfilename, FileMode.Create))
                    {
                        byte[] bytes = Convert.FromBase64String(Convert.ToString(formCollection["filedata"]).Split(',')[1]);
                        File.Write(bytes, 0, bytes.Length);
                        File.Flush();

                    }
                    using (var File = new FileStream(Tabexistfilename, FileMode.Create))
                    {
                        byte[] bytes = Convert.FromBase64String(Convert.ToString(formCollection["filedata"]).Split(',')[1]);
                        File.Write(bytes, 0, bytes.Length);
                        File.Flush();

                    }


                }
                else if (!string.IsNullOrEmpty(Standardid) && vaild != "")
                {
                    string existfilename = System.IO.Path.Combine(pathString, fileName);
                    string Tabexistfilename = System.IO.Path.Combine(TabpathpathString, fileName);
                    var isvaild = Convert.ToString(formCollection["filedata"]).Split(',')[1];
                    byte[] bytes = Convert.FromBase64String(isvaild);
                    using (var File = new FileStream(existfilename, FileMode.Create))
                    {
                        File.Write(bytes, 0, bytes.Length);
                        File.Flush();

                    }
                    using (var File = new FileStream(Tabexistfilename, FileMode.Create))
                    {
                        File.Write(bytes, 0, bytes.Length);
                        File.Flush();

                    }

                }
                else
                {
                    var DeleteMode = Convert.ToString(formCollection["mode"]);

                    if (DeleteMode == "F" && System.IO.Directory.Exists(pathString))
                    {
                        string existfilename = System.IO.Path.Combine(pathString, fileName);
                        if (System.IO.File.Exists(existfilename))
                            System.IO.File.Delete(existfilename);
                    }
                    if (DeleteMode == "F" && System.IO.Directory.Exists(TabpathpathString))
                    {
                        string Tabexistfilename = System.IO.Path.Combine(TabpathpathString, fileName);
                        if (System.IO.File.Exists(Tabexistfilename))
                            System.IO.File.Delete(Tabexistfilename);
                    }
                }


                StandardModel standardModel = new StandardModel()
                {
                    standardid = Convert.ToInt32(formCollection["standardid"]),
                    standardname = Convert.ToString(formCollection["standardname"]),
                    filename = Convert.ToString(formCollection["filename"]),
                    userid = Convert.ToInt32(formCollection["userid"]),
                    mode = Convert.ToString(formCollection["mode"]),
                    fileguid = Convert.ToString(formCollection["fileguid"]),
                    filesize = Convert.ToString(formCollection["filesize"]),
                    token = Convert.ToString(formCollection["token"]),
                    plantid = Convert.ToInt32(formCollection["plantid"])
                };
                string result = string.Empty;

                result = _web.InsertUpdatStandMaster(standardModel);
                result = result.Replace("\"", "");
                //FileStream file1 = new FileStream(SubFolder, FileMode.Create);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)

            {
                ErrorLog.Log("Upload file: " + ex.Message);
                return Json("error", JsonRequestBehavior.AllowGet);

            }

        }
        [SessionExpire]
        [HttpPost]
        public ActionResult UploadFile(FormCollection formCollection)
        {
            WebServices _web = new WebServices();
            string checkitems = string.Empty;
            try
            {
                HttpFileCollectionBase file = Request.Files;
                string result;
                if (file != null && file[0].ContentLength > 0)
                {
                    // Storing file into the upload path
                    var fileName = Path.GetFileName(file[0].FileName);
                    fileName = fileName.Substring(0, fileName.Length - 5) + "-" + Guid.NewGuid().ToString().Substring(0, 8)
                        + fileName.Substring(fileName.Length - 5, 5);
                    string postedFile = _web.GetUploadPath() + "CheckListFiles\\" + fileName;
                    //ErrorLog.Log("Upload file path: " + postedFile);
                    file[0].SaveAs(postedFile);
                    try
                    {
                        XSSFWorkbook hssfwb;
                        using (FileStream file1 = new FileStream(postedFile, FileMode.Open, FileAccess.Read))
                        {
                            hssfwb = new XSSFWorkbook(file1);
                        }

                        ISheet sheet = hssfwb.GetSheetAt(0);
                        if (sheet.LastRowNum > 0)
                        {
                            DataTable data = ReadExcelData(sheet);
                            for (int columnIndex = 0; columnIndex < 11; columnIndex++)
                            {
                                for (int row = 1; row < data.Rows.Count; row++)
                                {
                                    if (columnIndex == 0)
                                    {
                                        if (Convert.ToString(data.Rows[row][columnIndex]) == "")
                                        {
                                            data.Rows[row][columnIndex] = data.Rows[row - 1][columnIndex];
                                            data.Rows[row][12] = 1;
                                        }
                                        else
                                        {
                                            data.Rows[row][12] = 0;
                                        }
                                            
                                    }
                                    else if (columnIndex == 1 || columnIndex == 2)
                                    {
                                        if (Convert.ToString(data.Rows[row][columnIndex]) == ""
                                            && Convert.ToString(data.Rows[row][0]) == Convert.ToString(data.Rows[row - 1][0]))
                                        {
                                            data.Rows[row][columnIndex] = data.Rows[row - 1][columnIndex];
                                        }
                                    }
                                    else
                                    {
                                        //if (Convert.ToString(data.Rows[row][columnIndex]) == ""
                                        //    && Convert.ToString(data.Rows[row][columnIndex - 1]) == Convert.ToString(data.Rows[row - 1][columnIndex - 1]))
                                        //{
                                        //    data.Rows[row][columnIndex] = data.Rows[row - 1][columnIndex];
                                        //}



                                        if (Convert.ToString(data.Rows[row][columnIndex]) == "")
                                        {
                                            for (int i = 1; i < columnIndex - 1; i++)
                                            {

                                                if (Convert.ToString(data.Rows[row][columnIndex - i]) == "" && Convert.ToString(data.Rows[row - 1][columnIndex - i]) == "")
                                                {


                                                }
                                                else
                                                {
                                                    if (Convert.ToString(data.Rows[row][columnIndex - i]) == Convert.ToString(data.Rows[row - 1][columnIndex - i])
                                                          && Convert.ToString(data.Rows[row][0]) == Convert.ToString(data.Rows[row - 1][0]))
                                                    {
                                                        data.Rows[row][columnIndex] = data.Rows[row - 1][columnIndex];
                                                        i = columnIndex;
                                                    }
                                                    else
                                                    {
                                                        i = columnIndex;
                                                    }

                                                }

                                            }
                                        }


                                    }
                                }
                            }

                            checkitems = "<rows>";
                            for (int rowIndex = 0; rowIndex < data.Rows.Count; rowIndex++)
                            {
                                checkitems += "<row>";
                                checkitems += "<InspectionItem>" + data.Rows[rowIndex][0].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</InspectionItem>";
                                checkitems += "<Standard>" + data.Rows[rowIndex][1].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Standard>";

                                checkitems += "<CheckItems>" + data.Rows[rowIndex][2].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</CheckItems>";
                                checkitems += "<Specification>" + data.Rows[rowIndex][3].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Specification>";
                                checkitems += "<DefectPlace>" + data.Rows[rowIndex][4].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</DefectPlace>";
                                checkitems += "<Site1>" + data.Rows[rowIndex][5].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Site1>";
                                checkitems += "<Site2>" + data.Rows[rowIndex][6].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Site2>";
                                checkitems += "<Site3>" + data.Rows[rowIndex][7].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Site3>";
                                checkitems += "<Site4>" + data.Rows[rowIndex][8].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Site4>";
                                checkitems += "<Site5>" + data.Rows[rowIndex][9].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Site5>";
                                checkitems += "<Damage>" + data.Rows[rowIndex][10].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</Damage>";
                                checkitems += "<DefectClass>" + data.Rows[rowIndex][11].ToString().Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</DefectClass>";
                                checkitems += "<IsAutoFillPartName>" + data.Rows[rowIndex][12]+ "</IsAutoFillPartName>";

                                checkitems += "</row>";
                            }
                            checkitems += "</rows>";
                        }

                        CheckListMaster checkListMaster = new CheckListMaster()
                        {
                            //modelid = Convert.ToInt32(formCollection["modelid"]),
                            vehicletypeid = Convert.ToInt32(formCollection["vehicletypeid"]),
                            qgateid = Convert.ToInt32(formCollection["qgateid"]),
                            isactive = 1,
                            createdby = Convert.ToInt32(formCollection["createdby"]),
                            plantcode = Convert.ToInt32(formCollection["plantcode"]),
                            filename = fileName,
                            checklistitems = checkitems
                        };

                        result = _web.AddUpdateCheckListMaster(checkListMaster, Convert.ToString(formCollection["token"]));
                        result = result.Replace("\"", "");
                        // Delete the uploaded file if insert into DB failed
                        if (result.Equals("error"))
                        {
                            if (System.IO.File.Exists(postedFile))
                                System.IO.File.Delete(postedFile);
                        }
                    }
                    catch (Exception ex)
                    {
                        if (System.IO.File.Exists(postedFile))
                            System.IO.File.Delete(postedFile);
                        ErrorLog.Log("Upload file: " + ex.Message);
                        return Json("error", JsonRequestBehavior.AllowGet);
                    }
                }
                else
                    result = "error";

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ErrorLog.Log("Upload file: " + ex.Message);
                return Json("error", JsonRequestBehavior.AllowGet);
            }
        }

        private DataTable ReadExcelData(ISheet sheet)
        {
            DataTable result = new DataTable(sheet.SheetName);
            // write header row
            IRow headerRow = sheet.GetRow(0);
            foreach (ICell headerCell in headerRow)
            {
                result.Columns.Add(headerCell.ToString());
            }
            result.Columns.Add("IsAutoFillPartName");

            // write the rest
            int rowIndex = 0;
            foreach (IRow row in sheet)
            {
                // skip header row
                if (rowIndex++ == 0) continue;
                DataRow dataRow = result.NewRow();
                dataRow.ItemArray = row.Cells.Select(c => c.ToString()).ToArray();
                result.Rows.Add(dataRow);
            }
            // Remove the first column 'No'
            result.Columns.RemoveAt(0);
            return result;
        }





        [SessionExpire]
        public JsonResult DownLoadCheckList(string checklistfilename)
        {

            CheckListViewModel CheckListView = new CheckListViewModel();
            try
            {
                ErrorLog.Log("checklistfilename" + checklistfilename);
                CheckListView.checklistfilename = checklistfilename;
            }
            catch (Exception ex)
            {
                ErrorLog.Log("DownLoadCheckList" + ex.Message);
            }
            return Json(CheckListView, JsonRequestBehavior.AllowGet);
        }
        [SessionExpire]
        public FileResult DownLoadCheckListFile(string checklistfilename)
        {
            WebServices _web = new WebServices();
            //string checklistfilenames = Session["checklistfilename"].ToString();
            string filepath = _web.GetUploadPath() + "CheckListFiles\\" + checklistfilename;
            byte[] pdfByte = GetBytesFromFile(filepath);
            //return File(pdfByte, "application/xlsx", checklistfilename);

            Response.Clear();
            //if (Request.Browser.Browser == "IE")//IE needs special handling in order to display the international
            //                                    //characters in the file name
            //{
            //    string attachment = String.Format("attachment; filename={0}", Server.UrlPathEncode(checklistfilenames));
            //    Response.AddHeader("Content-Disposition", attachment);
            //}
            //else
            //    Response.AddHeader("Content-Disposition", "attachment; filename=" + checklistfilenames);
            string attachment = String.Format("attachment; filename={0}", Server.UrlPathEncode(checklistfilename));
            Response.AddHeader("Content-Disposition", attachment);

            Response.ContentType = ".xlsx";
            Response.Charset = "utf-8";
            Response.HeaderEncoding = UnicodeEncoding.UTF8;
            Response.ContentEncoding = UnicodeEncoding.UTF8;
            Response.BinaryWrite(pdfByte);
            Response.End();
            return null;
        }
        public byte[] GetBytesFromFile(string fullFilePath)
        {
            // this method is limited to 2^32 byte files (4.2 GB)
            FileStream fs = null;
            try
            {

                fs = System.IO.File.OpenRead(fullFilePath);
                byte[] bytes = new byte[fs.Length];
                fs.Read(bytes, 0, Convert.ToInt32(fs.Length));
                return bytes;
            }
            //catch(FileNotFoundException ex)
            //{

            //}
            finally
            {
                if (fs != null)
                {
                    fs.Close();
                    fs.Dispose();
                }
            }


        }
        [SessionExpire]
        public FileResult RedirectStandardMasterFile(string StandardMasterfilename, string filename)
        {
            WebServices _web = new WebServices();
            string filepath = _web.GetUploadPath() + "StandMaster\\" + StandardMasterfilename + "\\" + filename;
            byte[] pdfByte = GetBytesFromFile(filepath);
            string ReportURL = filepath;
            byte[] FileBytes = System.IO.File.ReadAllBytes(ReportURL);
            return File(FileBytes, "application/pdf");
        }
        [SessionExpire]
        public FileResult DwdStandardMasterFile(string StandardMasterfilename, string filename)
        {
            WebServices _web = new WebServices();
            string filepath = _web.GetUploadPath() + "StandMaster\\" + StandardMasterfilename + "\\" + filename;
            byte[] pdfByte = GetBytesFromFile(filepath);
            return File(pdfByte, "application/pdf", filename);
        }
        [SessionExpire]
        public FileResult DownLoadCommentsFile(string StandardMasterfilename, string filename)
        {
            WebServices _web = new WebServices();
            string filepath = _web.GetUploadPath() + "ActualComment\\" + StandardMasterfilename + "\\" + filename;
            byte[] pdfByte = GetBytesFromFile(filepath);
            return File(pdfByte, "application/pdf", filename);

        }
        [SessionExpire]
        public ActionResult DPUReport()
        {
            return View();
        }
        [SessionExpire]
        public ActionResult DefectNumberReport()
        {
            return View();
        }

        [SessionExpire]
        public JsonResult SignatureSave(string imagedata,string Vinnumber,int VinId, int Gateid)
        {
            WebServices Service = new WebServices();
            UserDetails Signature = new UserDetails();
            string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
            string Filename = DateTime.Now.ToString().Replace("/", "_").Replace(" ", "_").Replace(":", "") + ".png";
            Filename = "Signature_"+ Vinnumber+'_' + VinId+"_"+Gateid+"_" +Filename.Replace("-", "_");
            string fileNameWithPath = path + Filename;
            try
            {
                using (FileStream fs = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {

                        byte[] data = Convert.FromBase64String(imagedata);

                        bw.Write(data);

                        bw.Close();
                    }

                }
                //string token = GenerateToken(Convert.ToString(ConfigurationManager.AppSettings["TokenUser"]), Convert.ToString(ConfigurationManager.AppSettings["TokenPass"]));
                //Signature = Service.AddSignature(fileNameWitPath, token);

            }
            catch (Exception ex)
            {
                ErrorLog.Log("SignatureSave " + ex.Message);
                return Json("Error", JsonRequestBehavior.AllowGet);

            }
            return Json(Filename, JsonRequestBehavior.AllowGet);

        }

        [SessionExpire]
        public JsonResult SignatureSiteSave(string imagedata, string Vinnumber,int VinId,int Gateid,string ModelName)
        {
            WebServices Service = new WebServices();
            UserDetails Signature = new UserDetails();
            string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
            string Filename = DateTime.Now.ToString().Replace("/", "_").Replace(" ", "_").Replace(":", "") + ".png";
            // Filename = "Signature_" + Filename.Replace("-", "_");
            Filename = "Signature_" + Vinnumber + '_' + VinId + "_" + Gateid + "_" + Filename.Replace("-", "_");

            string fileNameWithPath = path + @"" + Vinnumber + @"\" + ModelName + @"\" + Filename;
            string postedFile = path + @"" + Vinnumber + @"\" + ModelName;

            if (!System.IO.Directory.Exists(postedFile))
            {
                System.IO.Directory.CreateDirectory(postedFile);

            }
            try
            {
                using (FileStream fs = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {

                        byte[] data = Convert.FromBase64String(imagedata);

                        bw.Write(data);

                        bw.Close();
                    }

                }
                //string token = GenerateToken(Convert.ToString(ConfigurationManager.AppSettings["TokenUser"]), Convert.ToString(ConfigurationManager.AppSettings["TokenPass"]));
                //Signature = Service.AddSignature(fileNameWitPath, token);

            }
            catch (Exception ex)
            {
                ErrorLog.Log("SignatureSiteSave " + ex.Message);
            }
            return Json(Filename, JsonRequestBehavior.AllowGet);

        }
        [SessionExpire]
        public ActionResult Signature()
        {
            return View();
        }

        [SessionExpire]
        public JsonResult DownLoadSignature(string SignatureFilename)
        {

            return Json(SignatureFilename, JsonRequestBehavior.AllowGet);
        }
        [SessionExpire]
        public FileResult DownLoadSignatureFile(string SignatureFilename)
        {
            WebServices _web = new WebServices();
            //string checklistfilenames = Session["checklistfilename"].ToString();
            string filepath = Convert.ToString(ConfigurationManager.AppSettings["SignaturePath"]) + SignatureFilename;
            byte[] pdfByte = GetBytesFromFile(filepath);
            //return File(pdfByte, "application/xlsx", checklistfilename);

            Response.Clear();

            string attachment = String.Format("attachment; filename={0}", Server.UrlPathEncode(SignatureFilename));
            Response.AddHeader("Content-Disposition", attachment);

            Response.ContentType = ".png";
            Response.Charset = "utf-8";
            Response.HeaderEncoding = UnicodeEncoding.UTF8;
            Response.ContentEncoding = UnicodeEncoding.UTF8;
            Response.BinaryWrite(pdfByte);
            Response.End();
            return null;
        }


        [SessionExpire]
        public JsonResult CheckSignature(string Filename, string lan)
        {
            string plainText = "";
            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];
            string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
            try
            {


                using (var api = OcrApi.Create())
                {
                    if (lan == "jp")
                    {
                        api.Init(Languages.Japanese);
                    }
                    else
                    {
                        api.Init(Languages.English);
                    }

                    plainText = api.GetTextFromImage(path + Filename);

                }
            }
            catch (Exception ex)
            {
                ErrorLog.Log("CheckSignature " + ex.Message);
            }
            return Json(plainText, JsonRequestBehavior.AllowGet);

        }

        [SessionExpire]
        public ActionResult ProgressMonitorNew()
        {
            return View();
        }

        [SessionExpire]
        [Obsolete]
        public void DownloadExcelProgressNew(int PlantId, string VinFrom, string VinTo, string FromDate, string ToDate)
        {
            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];

            DataSet ds = new DataSet();

            try
            {
                WebServices _web = new WebServices();
                IWorkbook workbook;
                workbook = new XSSFWorkbook();
                string ToVin = "";
                string Todate = "";
                if (ToDate == "" || ToDate == null)
                {
                    ToDate = FromDate;
                }
                if (VinTo == "" || VinTo == null)
                {
                    VinTo = VinFrom;
                }



                ds = _web.Get_Excel_ExportNew(PlantId, VinFrom, VinTo, FromDate, ToDate, Users.Token);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    //Create the worksheet
                    // ExcelWorksheet ws;
                    //IWorkbook workbook;
                    //workbook = new XSSFWorkbook();


                    //ds.Tables[0].Columns["VinNumber"].ColumnName = "VinNumber";
                    //ds.Tables[0].Columns["VehicleType"].ColumnName = "VehicleType";
                    //ds.Tables[0].Columns["ModelName"].ColumnName = "ModelName";
                    //ds.Tables[0].Columns["Inspection"].ColumnName = "Inspection";
                    //ds.Tables[0].Columns["Status"].ColumnName = "Status";


                    DataTable dtLine = new DataTable();



                    var BindUniqueLine = (from DataRow dRow in ds.Tables[1].Rows
                                          select dRow["LineName"]).Distinct();


                    DataTable DtBind = new DataTable();
                    DataTable DtBind1 = new DataTable();
                    foreach (var name in BindUniqueLine)
                    {

                        var filtergate = from Line in ds.Tables[1].AsEnumerable()
                                         where Line.Field<string>("LineName") == name.ToString()
                                         select new
                                         {
                                             LineName = Line.Field<Int64>("Sno")

                                         };

                        string LineName = Convert.ToString(name);
                        string expression = "LineId= '" + filtergate.ElementAt(0).LineName.ToString() + "'";


                        DataView dataView = ds.Tables[0].DefaultView;
                        //DataView dataView1 = ds.Tables[2].DefaultView;
                        if (!string.IsNullOrEmpty(LineName))
                        {
                            dataView.RowFilter = expression;
                            DtBind = dataView.ToTable();

                            //dataView1.RowFilter = expression;
                            //DtBind1 = dataView1.ToTable();
                            //DtBind.Columns["VariantId "].ColumnName = "VariantId";
                        }


                        var DynmaicColumnList = from DyColumns in ds.Tables[3].AsEnumerable()

                                                select new
                                                {
                                                    DynamicColumnName = DyColumns.Field<string>("DynamicColumnName"),
                                                    NewProgressColumnId = DyColumns.Field<Int64>("NewProgressColumnId"),


                                                };




                        DataTable dt = new DataTable();
                        dt.Columns.Add("VIN");
                        dt.Columns.Add("VehicleType");
                        dt.Columns.Add("Model");
                        dt.Columns.Add("Part Name");
                        dt.Columns.Add("Defect");
                        dt.Columns.Add("Status");
                        if (DynmaicColumnList.Count() > 0)
                        {
                            for (int i = 0; i < DynmaicColumnList.Count(); i++)
                            {
                                if (Convert.ToString(DynmaicColumnList.ElementAt(i).DynamicColumnName) != "")
                                {
                                    dt.Columns.Add(DynmaicColumnList.ElementAt(i).DynamicColumnName);
                                }

                            }
                        }






                        ISheet sheet1 = workbook.CreateSheet(Convert.ToString(LineName));
                        int k = 0;
                        int RowFrom = 1;
                        int Filtercount = 0;





                        //byte[] data = System.IO.File.ReadAllBytes("D:\\Auto QFL Phase II\\MFBMAutomatedQFL\\MFBMAutomatedQFL\\Signature\\Signature_05_05_2020_153946.png");
                        //int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
                        //ICreationHelper helper = workbook.GetCreationHelper();
                        //IDrawing drawing = sheet1.CreateDrawingPatriarch();
                        //IClientAnchor anchor = helper.CreateClientAnchor();
                        //anchor.Col1 = 4;//0 index based column
                        //anchor.Row1 = 0;//0 index based row
                        //IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                        //picture.Resize();

                        for (int i = 0; i < DtBind.Rows.Count; i++)
                        {

                            int counts = 1;

                            var filtergates = from Line in ds.Tables[2].AsEnumerable()
                                              where Line.Field<string>("VinNumber") == Convert.ToString(DtBind.Rows[i][0].ToString())
                                              select new
                                              {
                                                  Defect = Line.Field<string>("Defect"),
                                                  Vin = Line.Field<string>("VinNumber"),
                                                  VehicleType = Line.Field<string>("VehicleType"),
                                                  Model = Line.Field<string>("ModelName"),
                                                  CheckListItemStatusId = Line.Field<Int64>("CheckListItemStatusId"),
                                                  StatusCount = Line.Field<Int64>("StatusCount"),
                                                  ReExaminationCount = Line.Field<Int64>("ReExaminationCount"),
                                                  InspectionItem = Line.Field<string>("inspectionitem"),
                                                  Site1Image = Line.Field<string>("Site1Image"),
                                                  QFLFeedbackWorkflowId = Line.Field<Int64>("QFLFeedbackWorkflowId"),
                                                  VinId = Line.Field<Int64>("VinId"),

                                              };
                            for (int j = 0; j < filtergates.Count(); j++)
                            {
                                Filtercount = filtergates.Count();
                                DataRow dr = dt.NewRow();
                                dt.Rows.Add(dr);


                                if (filtergates.ElementAt(j).Site1Image != "")
                                {

                                    int imgWidth = 50; // only initial if not known
                                    int imgHeight = 50;
                                    int LOGO_MARGIN = 2;
                                    byte[] data = null;
                                    WebServices _webs = new WebServices();
                                    string filepath = ConfigurationManager.AppSettings["SignaturePath"] + filtergates.ElementAt(j).Vin + @"\" + filtergates.ElementAt(j).Site1Image;
                                    ICreationHelper helper = workbook.GetCreationHelper();
                                    IDrawing drawing = sheet1.CreateDrawingPatriarch();
                                    IClientAnchor anchor = helper.CreateClientAnchor();

                                    data = GetBytesFromFile(filepath);
                                    int pictureIndex = workbook.AddPicture(data, PictureType.PNG);

                                    anchor.Col1 = 4;
                                    anchor.Row1 = j + 1;

                                    IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                                    picture.Resize(1);
                                    //picture.Resize(0.5 * imgWidth / XSSFShape.PIXEL_DPI, 5 * imgHeight / XSSFShape.PIXEL_DPI);




                                }


                                //if (counts == 1)
                                //{

                                    RowFrom = k + 1;


                                    //dt.Rows[k]["VIN"] = Convert.ToString(DtBind1.Rows[k][2].ToString());
                                    //dt.Rows[k]["VehicleType"] = Convert.ToString(DtBind1.Rows[k][4].ToString());
                                    //dt.Rows[k]["Model"] = Convert.ToString(DtBind1.Rows[k][3].ToString());
                                    //dt.Rows[k]["Defect"] = Convert.ToString(DtBind1.Rows[k][0].ToString());

                                    dt.Rows[k]["VIN"] = Convert.ToString(filtergates.ElementAt(j).Vin);
                                    dt.Rows[k]["VehicleType"] = Convert.ToString(filtergates.ElementAt(j).VehicleType);
                                    dt.Rows[k]["Model"] = Convert.ToString(filtergates.ElementAt(j).Model);
                                    dt.Rows[k]["Part Name"] = Convert.ToString(filtergates.ElementAt(j).InspectionItem);

                                    dt.Rows[k]["Defect"] = Convert.ToString(filtergates.ElementAt(j).Defect);


                                    if (filtergates.ElementAt(j).CheckListItemStatusId == 3 || filtergates.ElementAt(j).CheckListItemStatusId == 6)
                                    {
                                        dt.Rows[k]["Status"] = Convert.ToString("Rework");
                                    }
                                    else
                                    {
                                        dt.Rows[k]["Status"] = Convert.ToString("Re-Examination");
                                    }


                                    //var DynamicDetails ="";

                                    //var DynamicValueDetails = from DyColumns in ds.Tables[4].AsEnumerable()
                                    //                          where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                    //                          &&
                                    //                          DyColumns.Field<Int64>("VinId") == Convert.ToInt64(filtergates.ElementAt(j).VinId)
                                    //                          select new
                                    //                          {
                                    //                              DynamicColumnDetails = DyColumns.Field<string>("DynamicColumnDetails"),
                                    //                              NewProgressColumnId = DyColumns.Field<Int64>("NewProgressColumnId"),
                                    //                              QFLFeedBackworkflowId = DyColumns.Field<Int64>("QFLFeedBackworkflowId"),
                                    //                              VinId = DyColumns.Field<Int64>("VinId"),

                                    //                          };

                                    var DynamicList = (from DyColumns in ds.Tables[6].AsEnumerable()
                                                          where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                                          select DyColumns).ToList();

                               
                                 
                                  DataTable  dataTable = DynamicList.CopyToDataTable();
                                    if (DynmaicColumnList.Count() >= 1)
                                    {
                                        //dt.Rows[k][6] = Convert.ToString(ds.Tables[7].Rows[k][1]);
                                        dt.Rows[k][6] = Convert.ToString(dataTable.Rows[0][1]);
                                  


                                    }
                                    if (DynmaicColumnList.Count() >= 2)
                                    {
                                        //dt.Rows[k][7] = Convert.ToString(ds.Tables[7].Rows[k][2]);
                                        dt.Rows[k][7] = Convert.ToString(dataTable.Rows[0][2]);
                                    }
                                    if (DynmaicColumnList.Count() >= 3)
                                    {
                                        dt.Rows[k][8] = Convert.ToString(dataTable.Rows[0][3]);
                                    }
                                    if (DynmaicColumnList.Count() >= 4)
                                    {
                                        dt.Rows[k][9] = Convert.ToString(dataTable.Rows[0][4]);
                                    }
                                    if (DynmaicColumnList.Count() >= 5)
                                    {
                                        dt.Rows[k][10] = Convert.ToString(dataTable.Rows[0][5]);
                                    }
                                    if (DynmaicColumnList.Count() >= 6)
                                    {
                                        dt.Rows[k][11] = Convert.ToString(dataTable.Rows[0][6]);
                                    }
                                    if (DynmaicColumnList.Count() >= 7)
                                    {
                                        dt.Rows[k][12] = Convert.ToString(dataTable.Rows[0][7]);
                                    }
                                    if (DynmaicColumnList.Count() >= 8)
                                    {
                                        dt.Rows[k][13] = Convert.ToString(dataTable.Rows[0][8]);
                                    }
                                    if (DynmaicColumnList.Count() >= 9)
                                    {
                                        dt.Rows[k][14] = Convert.ToString(dataTable.Rows[0][9]);
                                    }
                                    if (DynmaicColumnList.Count() >= 10)
                                    {
                                        dt.Rows[k][15] = Convert.ToString(dataTable.Rows[0][10]);
                                    }
                                    if (DynmaicColumnList.Count() >= 11)
                                    {
                                        dt.Rows[k][16] = Convert.ToString(dataTable.Rows[0][11]);
                                    }
                                    if (DynmaicColumnList.Count() >= 12)
                                    {
                                        dt.Rows[k][17] = Convert.ToString(dataTable.Rows[0][12]);
                                    }
                                    if (DynmaicColumnList.Count() >= 13)
                                    {
                                        dt.Rows[k][18] = Convert.ToString(dataTable.Rows[0][13]);
                                    }
                                    if (DynmaicColumnList.Count() >= 14)
                                    {
                                        dt.Rows[k][19] = Convert.ToString(dataTable.Rows[0][14]);
                                    }
                                    if (DynmaicColumnList.Count() >= 15)
                                    {
                                        dt.Rows[k][20] = Convert.ToString(dataTable.Rows[0][15]);
                                    }
                                    if (DynmaicColumnList.Count() >= 16)
                                    {
                                        for(int a=16;a< DynmaicColumnList.Count();a++)

                                        dt.Rows[k][a+5] = Convert.ToString(dataTable.Rows[0][a]);
                                    }


                                    //int m = 0;
                                    //while (m < DynmaicColumnList.Count())
                                    //{





                                    //    var DynamicDetails = (from item in DynamicValueDetails
                                    //                          where item.NewProgressColumnId == Convert.ToInt64(DynmaicColumnList.ElementAt(m).NewProgressColumnId)
                                    //                          select item).ToList();

                                    //    if (DynamicDetails.Count > 0)
                                    //    {

                                    //        dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString(DynamicDetails.ElementAt(0).DynamicColumnDetails);
                                    //    }
                                    //    else
                                    //    {
                                    //        if (DynmaicColumnList.ElementAt(m).DynamicColumnName != "")
                                    //        {
                                    //            dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString("");
                                    //        }

                                    //    }
                                    //    m++;
                                    //}

                                //}
                                //else
                                //{
                                //    dt.Rows[k]["Part Name"] = Convert.ToString(filtergates.ElementAt(j).InspectionItem);

                                //    dt.Rows[k]["Defect"] = Convert.ToString(filtergates.ElementAt(j).Defect);


                                //    if (filtergates.ElementAt(j).CheckListItemStatusId == 3 || filtergates.ElementAt(j).CheckListItemStatusId == 6)
                                //    {
                                //        dt.Rows[k]["Status"] = Convert.ToString("Rework");
                                //    }
                                //    else
                                //    {
                                //        dt.Rows[k]["Status"] = Convert.ToString("Re-Examination");
                                //    }


                                //    //var DynamicValueDetails = from DyColumns in ds.Tables[4].AsEnumerable()
                                //    //                          where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                //    //                          &&
                                //    //                          DyColumns.Field<Int64>("VinId") == Convert.ToInt64(filtergates.ElementAt(j).VinId)
                                //    //                          select new
                                //    //                          {
                                //    //                              DynamicColumnDetails = DyColumns.Field<string>("DynamicColumnDetails"),
                                //    //                              NewProgressColumnId = DyColumns.Field<Int64>("NewProgressColumnId"),
                                //    //                              QFLFeedBackworkflowId = DyColumns.Field<Int64>("QFLFeedBackworkflowId"),
                                //    //                              VinId = DyColumns.Field<Int64>("VinId"),

                                //    //                          };

                                //    var DynamicList = (from DyColumns in ds.Tables[6].AsEnumerable()
                                //                       where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                //                       select DyColumns).ToList();

                                //    DataTable dataTable = DynamicList.CopyToDataTable();

                                //    if (DynmaicColumnList.Count() >= 1)
                                //    {
                                //        dt.Rows[k][6] = Convert.ToString(dataTable.Rows[0][1]);

                                //    }
                                //    if (DynmaicColumnList.Count() >= 2)
                                //    {
                                //        dt.Rows[k][7] = Convert.ToString(dataTable.Rows[0][2]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 3)
                                //    {
                                //        dt.Rows[k][8] = Convert.ToString(dataTable.Rows[0][3]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 4)
                                //    {
                                //        dt.Rows[k][9] = Convert.ToString(dataTable.Rows[0][4]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 5)
                                //    {
                                //        dt.Rows[k][10] = Convert.ToString(dataTable.Rows[0][5]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 6)
                                //    {
                                //        dt.Rows[k][11] = Convert.ToString(dataTable.Rows[0][6]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 7)
                                //    {
                                //        dt.Rows[k][12] = Convert.ToString(dataTable.Rows[0][7]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 8)
                                //    {
                                //        dt.Rows[k][13] = Convert.ToString(dataTable.Rows[0][8]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 9)
                                //    {
                                //        dt.Rows[k][14] = Convert.ToString(dataTable.Rows[0][9]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 10)
                                //    {
                                //        dt.Rows[k][15] = Convert.ToString(dataTable.Rows[0][10]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 11)
                                //    {
                                //        dt.Rows[k][16] = Convert.ToString(dataTable.Rows[0][11]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 12)
                                //    {
                                //        dt.Rows[k][17] = Convert.ToString(dataTable.Rows[0][12]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 13)
                                //    {
                                //        dt.Rows[k][18] = Convert.ToString(dataTable.Rows[0][13]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 14)
                                //    {
                                //        dt.Rows[k][19] = Convert.ToString(dataTable.Rows[0][14]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 15)
                                //    {
                                //        dt.Rows[k][20] = Convert.ToString(dataTable.Rows[0][15]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 16)
                                //    {
                                //        for (int a = 16; a < DynmaicColumnList.Count(); a++)

                                //            dt.Rows[k][a + 5] = Convert.ToString(dataTable.Rows[0][a]);
                                //    }

                                //    //int m = 0;
                                //    //while (m < DynmaicColumnList.Count())
                                //    //{


                                //    //    var DynamicDetails = (from item in DynamicValueDetails
                                //    //                          where item.NewProgressColumnId == Convert.ToInt64(DynmaicColumnList.ElementAt(m).NewProgressColumnId)
                                //    //                          select item).ToList();

                                //    //    if (DynamicDetails.Count > 0)
                                //    //    {

                                //    //        dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString(DynamicDetails.ElementAt(0).DynamicColumnDetails);
                                //    //    }
                                //    //    else
                                //    //    {


                                //    //        if (DynmaicColumnList.ElementAt(m).DynamicColumnName != "")
                                //    //        {
                                //    //            dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString("");
                                //    //        }

                                //    //    }
                                //    //    m++;
                                //    //}


                                //    if (Filtercount == j + 1)
                                //    {
                                //        //new NPOI.SS.Util.CellRangeAddress(RowFrom,RowTo, FromColumn, ToColumn);
                                //        NPOI.SS.Util.CellRangeAddress cra = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 0, 0);
                                //        NPOI.SS.Util.CellRangeAddress cra1 = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 1, 1);
                                //        NPOI.SS.Util.CellRangeAddress cra2 = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 2, 2);
                                //        //NPOI.SS.Util.CellRangeAddress cra3 = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 4, 4);
                                //        sheet1.AddMergedRegion(cra);
                                //        sheet1.AddMergedRegion(cra1);
                                //        sheet1.AddMergedRegion(cra2);
                                //        //sheet1.AddMergedRegion(cra3);

                                //        ErrorLog.Log("Filtercount" + DateTime.Today);
                                //    }

                                //    ErrorLog.Log("Else" + DateTime.Today);

                                //}




                                counts++;
                                k++;


                            }
                        }

                        //header bold


                        var font = workbook.CreateFont();
                        font.FontHeightInPoints = (short)12;
                        font.FontName = "Calibri";

                        font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                        NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                        NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                        NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                        //make a header row  
                        IRow row1 = sheet1.CreateRow(0);

                        XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                        yourStyle.WrapText = true;
                        yourStyle.Alignment = HorizontalAlignment.Center;
                        yourStyle.VerticalAlignment = VerticalAlignment.Center;
                        yourStyle.BorderBottom = BorderStyle.Medium;
                        yourStyle.BorderRight = BorderStyle.Medium;
                        yourStyle.BorderTop = BorderStyle.Medium;
                        yourStyle.BorderLeft = BorderStyle.Medium;



                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            //sheet1.SetColumnWidth(j, 5000);
                            sheet1.SetColumnWidth(j, 9000);
                            ICell cell = row1.CreateCell(j);
                            cell.CellStyle = workbook.CreateCellStyle();
                            cell.CellStyle = yourStyle;
                            cell.CellStyle.SetFont(font);
                            cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                            cell.CellStyle.FillPattern = FillPattern.NoFill;

                            String columnName = dt.Columns[j].ToString();
                            cell.SetCellValue(columnName);
                        }

                        //loops through data  
                        for (int m = 0; m < dt.Rows.Count; m++)
                        {
                            IRow row = sheet1.CreateRow(m + 1);
                            for (int j = 0; j < dt.Columns.Count; j++)
                            {
                                ICell cell = row.CreateCell(j);
                                cell.CellStyle = yourStyle;
                                String columnName = dt.Columns[j].ToString();
                                cell.SetCellValue(dt.Rows[m][columnName].ToString());

                            }
                        }

                    }

                    using (var exportData = new MemoryStream())
                    {
                        Response.Clear();
                        workbook.Write(exportData);

                        Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", "Progress_Monitor" + "_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx"));
                        Response.BinaryWrite(exportData.ToArray());
                        Response.End();
                    }
                }
            }


            catch (Exception ex)
            {
                ErrorLog.Log("Progressmonitor Excel" + ex.Message);
            }
        }


        [SessionExpire]
        [Obsolete]
        public void ExcelDownloadforIssueDate(Inputs input)
        {
            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];

            WebServices webService = new WebServices();

            if (input.vinto == null || input.vinto == "")
            {
                input.vinto = input.vinfrom;
            }


            if (input.todate == "" || input.todate == null)
            {
                input.todate = input.fromdate;
            }

            PMExcelIssuedateResponse result = new PMExcelIssuedateResponse();
            result = webService.ExcelDownloadforIssueDate(input, Users.Token);

            ExcelPackage excel = new ExcelPackage();
            //Create the worksheet
            IWorkbook workbook;
            workbook = new XSSFWorkbook();
            List<PMExcelIssuedate> pmExcels = new List<PMExcelIssuedate>();

            pmExcels = (from x in result.pmExcels select x).ToList();

            ListtoDataTable lsttodt = new ListtoDataTable();
            try
            {
                if (result.pmExcels.Count > 0)
                {
                    DataTable dt = lsttodt.ToDataTable(pmExcels);
                    ISheet sheet1 = workbook.CreateSheet("Sheet");

                    dt.Columns.Remove("ActualValue");
                    dt.Columns.Remove("Responsible");
                    dt.Columns.Remove("DamageCode");
                    dt.Columns.Remove("Comment");
                    dt.Columns.Remove("Attachment");

                    IRow row1 = sheet1.CreateRow(0);

                    //header bold


                    var font = workbook.CreateFont();
                    font.FontHeightInPoints = (short)12;
                    font.FontName = "Calibri";

                    font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                    NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                    NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                    NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                    //make a header row  
                    XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                    yourStyle.WrapText = true;
                    yourStyle.Alignment = HorizontalAlignment.Center;
                    yourStyle.VerticalAlignment = VerticalAlignment.Center;
                    yourStyle.BorderBottom = BorderStyle.Medium;
                    yourStyle.BorderRight = BorderStyle.Medium;
                    yourStyle.BorderTop = BorderStyle.Medium;
                    yourStyle.BorderLeft = BorderStyle.Medium;


                    //dt.Columns[4].ColumnName = "VehicleType";
                    dt.Columns[5].ColumnName = "Defect Description";
                    dt.Columns[6].ColumnName = "QGate";
                    dt.Columns[7].ColumnName = "Part Number";
                    dt.Columns[9].ColumnName = "Rework Status";
                    dt.Columns[10].ColumnName = "ReExamination Status";
                    dt.Columns[11].ColumnName = "CheckedBy";
                    dt.Columns[12].ColumnName = "Remarks 1";
                    dt.Columns[13].ColumnName = "Remarks 2";
                    dt.AcceptChanges();

                    //for (int l = 0; l < dt.Columns.Count; l++)
                    //{
                    //    // sheet1.SetColumnWidth(l, 8000);
                    //    ICell cell = row1.CreateCell(l);
                    //    cell.CellStyle = workbook.CreateCellStyle();
                    //    cell.CellStyle = yourStyle;
                    //    cell.CellStyle.SetFont(font);
                    //    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //    cell.CellStyle.FillPattern = FillPattern.NoFill;

                    //    String columnName = dt.Columns[l].ToString();
                    //    cell.SetCellValue(columnName);
                    //}

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        IRow row = sheet1.CreateRow(i + 1);

                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            if(i==0)
                            {

                                int l = j;
                                ICell cell1 = row1.CreateCell(l);
                                cell1.CellStyle = workbook.CreateCellStyle();
                                cell1.CellStyle = yourStyle;
                                cell1.CellStyle.SetFont(font);
                                cell1.CellStyle.FillForegroundColor = XlColour.Indexed;
                                cell1.CellStyle.FillPattern = FillPattern.NoFill;

                                String columnName1 = dt.Columns[l].ToString();
                                cell1.SetCellValue(columnName1);
                            }

                            ICell cell = row.CreateCell(j);
                            cell.CellStyle = yourStyle;
                            String columnName = dt.Columns[j].ToString();
                            cell.SetCellValue(dt.Rows[i][columnName].ToString());
                        }
                        //  sheet1.AutoSizeColumn(i);
                    }
                }

                using (var exportData = new MemoryStream())
                {
                    Response.Clear();
                    workbook.Write(exportData);

                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", "Export Issues" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx"));
                    Response.BinaryWrite(exportData.ToArray());
                    Response.End();
                }
            }
            catch (Exception ex)
            {
                ErrorLog.Log("Progressmonitor Excel - ExcelDownloadforIssueDate " + ex.Message);
            }


        }

        public class ListtoDataTable
        {
            public DataTable ToDataTable<T>(List<T> items)
            {
                DataTable dataTable = new DataTable(typeof(T).Name);
                //Get all the properties by using reflection   
                PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
                foreach (PropertyInfo prop in Props)
                {
                    //Setting column names as Property names  
                    dataTable.Columns.Add(prop.Name);
                }
                foreach (T item in items)
                {
                    var values = new object[Props.Length];
                    for (int i = 0; i < Props.Length; i++)
                    {

                        values[i] = Props[i].GetValue(item, null);
                    }
                    dataTable.Rows.Add(values);
                }

                return dataTable;
            }
        }

        [SessionExpire]
        [Obsolete]
        public void VINHistoryDownloadExcel(int PlantId, string VIN,string ModelName)
        {
            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];


            //string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
            //string filename = "Signature_5_13_2020_83714_PM.png";



            WebServices webService = new WebServices();
            ProgressMonitorVINHistory result = new ProgressMonitorVINHistory();
            result = webService.VINHistoryDownloadExcel(PlantId, VIN, Users.Token, ModelName);
            try
            {

                ExcelPackage excel = new ExcelPackage();
                //Create the worksheet  

                IWorkbook workbook;
                workbook = new XSSFWorkbook();

               

                // byte[] bytes = System.IO.File.ReadAllBytes(path + filename);
                //workbook.AddPicture(bytes, PictureType.PNG);
                List<ProgressMonitorHistoryVINDetails> listDatas = new List<ProgressMonitorHistoryVINDetails>();
                List<ProgressMonitorHistoryVINDetails> listDatas1 = new List<ProgressMonitorHistoryVINDetails>();
                List<ProgressMonitorHistoryVINDetailsForComments> listDataComments = new List<ProgressMonitorHistoryVINDetailsForComments>();

                if (result.HistoryGateDetails.Count > 0)
                {
                    // Periyan
                    for (int i = 0; i < result.HistoryGateDetails.Count; i++)
                    {
                        listDatas = (from item in result.HistoryVINDetails
                                     where item.GateId == 0
                                     select item).ToList();


                        listDataComments = (from item in result.ListOfComments
                                                        where item.GateId == 0
                                                        select item).ToList(); ;
                        
                        if (Convert.ToString(result.HistoryGateDetails[i].GateId) == "-5")
                        {
                            listDataComments = result.ListOfComments;
                        }
                        else
                        {
                            listDatas = (from item in result.HistoryVINDetails
                                         where item.GateId == result.HistoryGateDetails[i].GateId
                                         //&& item.VIN == result.ModifiedDateDetailsList[i].VIN && item.Varaint == result.ModifiedDateDetailsList[i].Varaint
                                         select item).ToList();
                        }

                     


                        ListtoDataTable lsttodt = new ListtoDataTable();
                        string VINName = string.Empty;
                        string sign = string.Empty;
                        if (listDatas.Count > 0 || listDataComments.Count>0)
                        {

                            //for (int m = 0; m < listDatas.Count; m++)
                            //{
                            //    if (listDatas.ElementAtOrDefault(m).GateId.ToString() != "-1"
                            //        || listDatas.ElementAtOrDefault(m).GateId.ToString() != "-2"
                            //        || listDatas.ElementAtOrDefault(m).GateId.ToString() != "-4"
                            //        || listDatas.ElementAtOrDefault(m).GateId.ToString() != "-5")
                            //    {


                            //        if (listDatas.ElementAtOrDefault(m).Status == "Ok")
                            //        {
                            //            if (listDatas.ElementAtOrDefault(m).NotOkcount != 0 || listDatas.ElementAtOrDefault(m).ReExamOkCount != 0)
                            //            {
                            //                listDatas.ElementAtOrDefault(m).Status = listDatas.ElementAtOrDefault(m).Status.Replace("Ok", "Not Ok");
                            //            }
                            //        }

                            //        if (listDatas.ElementAtOrDefault(m).Status == "ReExam Ok")
                            //        {


                            //            listDatas.ElementAtOrDefault(m).Status = listDatas.ElementAtOrDefault(m).Status.Replace("ReExam Ok", "Not Ok");
                            //        }
                            //        listDatas.ElementAtOrDefault(m).NotOkcount = listDatas.ElementAtOrDefault(m).NotOkcount;
                            //        // listDatas.ElementAtOrDefault(m).NotOkcount = listDatas.ElementAtOrDefault(m).NotOkcount + listDatas.ElementAtOrDefault(m).ReExamOkCount;

                            //    }
                            //}

                            //convert list to datatable
                            DataTable dt;
                            if (Convert.ToString(result.HistoryGateDetails[i].GateId) == "-5")
                            {
                                 dt = lsttodt.ToDataTable(listDataComments);
                            }
                            else
                            {
                                 dt = lsttodt.ToDataTable(listDatas);
                            }
                           
                            
                            dt.Columns.Remove("GateId");
                            dt.Columns.Remove("CreatedBy");
                            dt.Columns.Remove("VinId");
                            dt.Columns.Remove("CreatedDate");
                            dt.Columns.Remove("CreatedTime");
                            dt.Columns.Remove("ReworkModifiedDate");
                            dt.Columns.Remove("ReworkModifiedTime");
                            dt.Columns.Remove("ReworkExaminationDate");
                            dt.Columns.Remove("ReworkExaminationTime");
                            dt.Columns.Remove("ActualID");
                            dt.Columns.Remove("VinNumber");
                            dt.Columns.Remove("IsCompleted");
                            dt.Columns.Remove("ReExamOkCount");
                            dt.Columns.Remove("ActualValue");
                            dt.Columns.Remove("Responsible");
                            dt.Columns.Remove("DamageCode");
                            dt.Columns.Remove("Comments");
                            dt.Columns.Remove("Attachment");
                            dt.Columns.Remove("QFLFeedbackWorkflowId");
                          
                            
                            if (((Convert.ToString(result.HistoryGateDetails[i].GateName) != "Rework") && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "ReExamination") 
                                && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "Seal" && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "ReExamination1")
                                
                            {
                                dt.Columns.Remove("ReworkModifiedBy");
                                dt.Columns.Remove("ReworkModifiedDateTime");
                                dt.Columns.Remove("ReworkExaminationBy");
                                dt.Columns.Remove("ReworkExaminationDateTime");
                                dt.Columns.Remove("ReworkModifiedBys");
                                dt.Columns.Remove("ReExaminationModifiedBy");


                                



                            }
                            ISheet sheet1;
                           
                            if (Convert.ToString(result.HistoryGateDetails[i].GateName) == "ReExamination")
                            {
                                 sheet1 = workbook.CreateSheet("QG Re-Examination");
                            }
                            else if (Convert.ToString(result.HistoryGateDetails[i].GateName) == "ReExamination1")
                            {
                                 sheet1 = workbook.CreateSheet("完成 Re-Examination");
                            }
                            else
                            {
                                 sheet1 = workbook.CreateSheet(Convert.ToString(result.HistoryGateDetails[i].GateName));
                            }
                           

                            //make a header row  
                            IRow row0 = sheet1.CreateRow(0);
                            var cra = new NPOI.SS.Util.CellRangeAddress(0, 0, 0, 7);
                            // sheet1.AddMergedRegion(cra);
                            // sheet1.AddMergedRegion
                            ICell cell0 = row0.CreateCell(0);
                            cell0.SetCellValue("VIN : " + VIN + " Vehicle Type: " + Convert.ToString(result.HistoryGateDetails[i].VariantName));

                            

                            IRow row1 = sheet1.CreateRow(1);
                            var font = workbook.CreateFont();
                            font.FontHeightInPoints = (short)12;
                            font.FontName = "Calibri";

                            font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                            NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                            NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                            NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                            //make a header row  
                            XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                            yourStyle.WrapText = true;
                            yourStyle.Alignment = HorizontalAlignment.Center;
                            yourStyle.VerticalAlignment = VerticalAlignment.Center;
                            yourStyle.BorderBottom = BorderStyle.Medium;
                            yourStyle.BorderRight = BorderStyle.Medium;
                            yourStyle.BorderTop = BorderStyle.Medium;
                            yourStyle.BorderLeft = BorderStyle.Medium;

                            cell0.CellStyle = yourStyle;
                          
                            // dt.Columns[4].ColumnName = "Created Time";
                            //dt.Columns[3].ColumnName = "Status";
                            if (((Convert.ToString(result.HistoryGateDetails[i].GateName) != "Rework") && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "ReExamination")
                                && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "Seal" && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "ReExamination1"
                                && (Convert.ToString(result.HistoryGateDetails[i].GateName)) != "Comments")
                            {

                                dt.Columns["PartName"].SetOrdinal(0);
                                dt.Columns["CheckItem"].SetOrdinal(1);
                                dt.Columns["Specification"].SetOrdinal(2);
                                dt.Columns["UserName"].SetOrdinal(3);
                                dt.Columns["GateName"].SetOrdinal(4);
                                dt.Columns["CreatedDateTime"].SetOrdinal(5);
                                dt.Columns["Status"].SetOrdinal(6);
                                dt.Columns["Okcount"].SetOrdinal(7);
                                dt.Columns["NotOkcount"].SetOrdinal(8);
                                dt.Columns["Skipcount"].SetOrdinal(9);


                                dt.Columns.Remove("Sno");
                                dt.Columns.Remove("CompletedName");
                                dt.Columns.Remove("CompletedDate");
                                dt.Columns.Remove("CompletedBY");
                                //dt.Columns.Remove("Filename");
                                dt.Columns.Remove("ModifiedBy");
                                dt.Columns.Remove("SignatureId");
                                dt.Columns.Remove("Standard");
                                dt.Columns.Remove("DefectPlace");
                                dt.Columns.Remove("DefectClass");

                                dt.Columns.Remove("Okcount");
                                dt.Columns.Remove("NotOkcount");
                                dt.Columns.Remove("Skipcount");

                                //Cycle 1
                                dt.Columns.Remove("ReworkModifiedBy1");
                                dt.Columns.Remove("ReworkModifiedDateTime1");
                                dt.Columns.Remove("Status1");
                                
                                //Cycle 2
                                dt.Columns.Remove("ReworkModifiedBy2");
                                dt.Columns.Remove("ReworkModifiedDateTime2");
                                dt.Columns.Remove("Status2");
                                
                                //Cycle 3
                                dt.Columns.Remove("ReworkModifiedBy3");
                                dt.Columns.Remove("ReworkModifiedDateTime3");
                                dt.Columns.Remove("Status3");
                                
                                //Cycle 4
                                dt.Columns.Remove("ReworkModifiedBy4");
                                dt.Columns.Remove("ReworkModifiedDateTime4");
                                dt.Columns.Remove("Status4");
                                
                                //Cycle 5
                                dt.Columns.Remove("ReworkModifiedBy5");
                                dt.Columns.Remove("ReworkModifiedDateTime5");
                                dt.Columns.Remove("Status5");

                                dt.Columns.Remove("ReExaminationModifiedBy1");
                                dt.Columns.Remove("ReworkExaminationDateTime1");

                                dt.Columns.Remove("ReExaminationModifiedBy2");
                                dt.Columns.Remove("ReworkExaminationDateTime2");

                                dt.Columns.Remove("ReExaminationModifiedBy3");
                                dt.Columns.Remove("ReworkExaminationDateTime3");

                                dt.Columns.Remove("ReExaminationModifiedBy4");
                                dt.Columns.Remove("ReworkExaminationDateTime4");

                                dt.Columns.Remove("ReExaminationModifiedBy5");
                                dt.Columns.Remove("ReworkExaminationDateTime5");


                                dt.Columns[3].ColumnName = "Checked By";
                                dt.Columns[5].ColumnName = "Checked On";
                                //dt.Columns[7].ColumnName = "Ok Count";
                                //dt.Columns[8].ColumnName = "Not Ok Count";
                                //dt.Columns[9].ColumnName = "Skip Count";
                            }

                            if ((Convert.ToString(result.HistoryGateDetails[i].GateName) == "Rework"))
                            {


                                dt.Columns["UserName"].SetOrdinal(0);
                                dt.Columns["GateName"].SetOrdinal(1);
                                dt.Columns["CreatedDateTime"].SetOrdinal(2);

                                dt.Columns["PartName"].SetOrdinal(3);

                                dt.Columns["Status"].SetOrdinal(4);
                                dt.Columns["DefectPlace"].SetOrdinal(5);
                                dt.Columns["DefectClass"].SetOrdinal(6);
                                //dt.Columns["ReworkModifiedBys"].SetOrdinal(7);
                                //dt.Columns["ReworkModifiedDateTime"].SetOrdinal(8);

                                //pERIYAN

                                // Cycle 1
                                int total = result.TotalHistoryMaxCount.ReworkCount;
                                int start = 7;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        ICell cell9 = row0.CreateCell(start);
                                        cell9.SetCellValue(x + "Cycle");
                                        var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 2);
                                        sheet1.AddMergedRegion(cra9);
                                        cell9.CellStyle = yourStyle;

                                        dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                        dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                        dt.Columns["Status" + x].SetOrdinal(start + 2);
                                        start = start + 3;
                                    }

                                }
                                else
                                {
                                    for (int x = 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                    }
                                }

                                if (total >= 1)
                                {
                                    for (int x = total + 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                    }

                                }



                                //ICell cell9 = row0.CreateCell(9);
                                //cell9.SetCellValue("1 Cycle");
                                //var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, 9, 11);
                                //sheet1.AddMergedRegion(cra9);
                                //cell9.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy1"].SetOrdinal(9);
                                //dt.Columns["ReworkModifiedDateTime1"].SetOrdinal(10);
                                //dt.Columns["Status1"].SetOrdinal(11);
                                //

                                // Cycle 2

                                //ICell cell12 = row0.CreateCell(12);
                                //cell12.SetCellValue("2 Cycle");
                                //var cra12 = new NPOI.SS.Util.CellRangeAddress(0, 0, 12, 14);
                                //sheet1.AddMergedRegion(cra12);
                                //cell12.CellStyle = yourStyle;
                                //dt.Columns["ReworkModifiedBy2"].SetOrdinal(12);
                                //dt.Columns["ReworkModifiedDateTime2"].SetOrdinal(13);
                                //dt.Columns["Status2"].SetOrdinal(14);

                                //

                                // Cycle 3

                                //ICell cell15 = row0.CreateCell(15);
                                //cell15.SetCellValue("3 Cycle");
                                //var cra15 = new NPOI.SS.Util.CellRangeAddress(0, 0, 15, 17);
                                //sheet1.AddMergedRegion(cra15);
                                //cell15.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy3"].SetOrdinal(15);
                                //dt.Columns["ReworkModifiedDateTime3"].SetOrdinal(16);
                                //dt.Columns["Status3"].SetOrdinal(17);
                                //

                                // Cycle 4

                                //ICell cell18 = row0.CreateCell(18);
                                //cell18.SetCellValue("4 Cycle");
                                //var cra18 = new NPOI.SS.Util.CellRangeAddress(0, 0, 18, 20);
                                //sheet1.AddMergedRegion(cra18);
                                //cell18.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy4"].SetOrdinal(18);
                                //dt.Columns["ReworkModifiedDateTime4"].SetOrdinal(19);
                                //dt.Columns["Status4"].SetOrdinal(20);
                                //

                                // Cycle 5

                                //ICell cell21 = row0.CreateCell(21);
                                //cell21.SetCellValue("5 Cycle");
                                //var cra21 = new NPOI.SS.Util.CellRangeAddress(0, 0, 21, 23);
                                //sheet1.AddMergedRegion(cra21);
                                //cell21.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy5"].SetOrdinal(21);
                                //dt.Columns["ReworkModifiedDateTime5"].SetOrdinal(22);
                                //dt.Columns["Status5"].SetOrdinal(23);


                                //

                                dt.Columns["Okcount"].SetOrdinal(9);
                                dt.Columns["NotOkcount"].SetOrdinal(10);
                                dt.Columns["Skipcount"].SetOrdinal(11);

                                dt.Columns.Remove("ReworkExaminationBy");
                                dt.Columns.Remove("ReworkExaminationDateTime");
                                dt.Columns.Remove("ReExaminationModifiedBy");
                                dt.Columns.Remove("Sno");
                                dt.Columns.Remove("CompletedName");
                                dt.Columns.Remove("CompletedDate");
                                dt.Columns.Remove("CompletedBY");
                                //dt.Columns.Remove("Filename");
                                dt.Columns.Remove("ModifiedBy");
                                dt.Columns.Remove("SignatureId");
                                dt.Columns.Remove("CheckItem");
                                dt.Columns.Remove("Specification");
                                dt.Columns.Remove("Standard");
                                dt.Columns.Remove("ReworkModifiedBy");

                                dt.Columns.Remove("Okcount");
                                dt.Columns.Remove("NotOkcount");
                                dt.Columns.Remove("Skipcount");

                                dt.Columns.Remove("ReExaminationModifiedBy1");
                                dt.Columns.Remove("ReworkExaminationDateTime1");

                                dt.Columns.Remove("ReExaminationModifiedBy2");
                                dt.Columns.Remove("ReworkExaminationDateTime2");

                                dt.Columns.Remove("ReExaminationModifiedBy3");
                                dt.Columns.Remove("ReworkExaminationDateTime3");

                                dt.Columns.Remove("ReExaminationModifiedBy4");
                                dt.Columns.Remove("ReworkExaminationDateTime4");

                                dt.Columns.Remove("ReExaminationModifiedBy5");
                                dt.Columns.Remove("ReworkExaminationDateTime5");

                                dt.Columns.Remove("ReworkModifiedBys");
                                dt.Columns.Remove("ReworkModifiedDateTime");


                                dt.Columns[0].ColumnName = "Checked By";
                                dt.Columns[2].ColumnName = "Checked On";
                                dt.Columns[5].ColumnName = "Defect";
                                //dt.Columns[6].ColumnName = "Rework Completed By";
                                //dt.Columns[7].ColumnName = "Rework Completed On";



                                start = 7;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                        dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                        start = start + 3;
                                    }

                                }



                                //Cycle 1
                                //dt.Columns[9].ColumnName = "Rework Completed By1";
                                //dt.Columns[10].ColumnName = "Rework Completed On1";

                                //Cycle 2

                                //dt.Columns[12].ColumnName = "Rework Completed By2";
                                //dt.Columns[13].ColumnName = "Rework Completed On2";


                                //Cycle 3
                                //dt.Columns[15].ColumnName = "Rework Completed By3";
                                //dt.Columns[16].ColumnName = "Rework Completed On3";


                                //Cycle 4
                                //dt.Columns[18].ColumnName = "Rework Completed By4";
                                //dt.Columns[19].ColumnName = "Rework Completed On4";


                                //Cycle 5
                                //dt.Columns[21].ColumnName = "Rework Completed By5";
                                //dt.Columns[22].ColumnName = "Rework Completed On5";





                            }



                            else if ((Convert.ToString(result.HistoryGateDetails[i].GateName)) == "ReExamination")
                            {


                                //dt.Columns["UserName"].SetOrdinal(0);
                                dt.Columns["GateName"].SetOrdinal(0);
                                //dt.Columns["CreatedDateTime"].SetOrdinal(2);
                                //dt.Columns["Status"].SetOrdinal(1);
                                dt.Columns["PartName"].SetOrdinal(1);
                                dt.Columns["Status"].SetOrdinal(2);

                                dt.Columns["DefectPlace"].SetOrdinal(3);
                                dt.Columns["DefectClass"].SetOrdinal(4);
                                //dt.Columns["ReworkModifiedBy"].SetOrdinal(4);
                                //dt.Columns["ReworkModifiedDateTime"].SetOrdinal(5);
                                //dt.Columns["ReExaminationModifiedBy"].SetOrdinal(6);
                                //dt.Columns["ReworkExaminationDateTime"].SetOrdinal(7);
                                //dt.Columns["Status"].SetOrdinal(8);


                                // Cycle 1


                                int total = result.TotalHistoryMaxCount.ReExaminationCount;
                                int start = 5;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        ICell cell9 = row0.CreateCell(start);
                                        cell9.SetCellValue(x + "Cycle");
                                        var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 4);
                                        sheet1.AddMergedRegion(cra9);
                                        cell9.CellStyle = yourStyle;

                                        dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                        dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                        dt.Columns["ReExaminationModifiedBy" + x].SetOrdinal(start + 2);
                                        dt.Columns["ReworkExaminationDateTime" + x].SetOrdinal(start + 3);
                                        dt.Columns["Status" + x].SetOrdinal(start + 4);

                                        start = start + 5;
                                    }

                                }
                                else
                                {
                                    for (int x = 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                        dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                    }
                                }

                                if (total >= 1)
                                {
                                    for (int x = total + 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                        dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                    }

                                }




                                //ICell cell9 = row0.CreateCell(9);
                                //cell9.SetCellValue("1 Cycle");

                                //var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, 9, 13);
                                //sheet1.AddMergedRegion(cra9);
                                //cell9.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy1"].SetOrdinal(9);
                                //dt.Columns["ReworkModifiedDateTime1"].SetOrdinal(10);
                                //dt.Columns["ReExaminationModifiedBy1"].SetOrdinal(11);
                                //dt.Columns["ReworkExaminationDateTime1"].SetOrdinal(12);
                                //dt.Columns["Status1"].SetOrdinal(13);
                                //

                                // Cycle 2

                                //ICell cell14 = row0.CreateCell(14);
                                //cell14.SetCellValue("2 Cycle");
                                //var cra14 = new NPOI.SS.Util.CellRangeAddress(0, 0, 14, 18);
                                //sheet1.AddMergedRegion(cra14);
                                //cell14.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy2"].SetOrdinal(14);
                                //dt.Columns["ReworkModifiedDateTime2"].SetOrdinal(15);
                                //dt.Columns["ReExaminationModifiedBy2"].SetOrdinal(16);
                                //dt.Columns["ReworkExaminationDateTime2"].SetOrdinal(17);
                                //dt.Columns["Status2"].SetOrdinal(18);
                                //

                                // Cycle 3

                                ////ICell cell19 = row0.CreateCell(19);
                                ////cell19.SetCellValue("3 Cycle");
                                ////var cra19 = new NPOI.SS.Util.CellRangeAddress(0, 0, 19, 23);
                                ////sheet1.AddMergedRegion(cra19);
                                ////cell19.CellStyle = yourStyle;

                                ////dt.Columns["ReworkModifiedBy3"].SetOrdinal(19);
                                ////dt.Columns["ReworkModifiedDateTime3"].SetOrdinal(20);
                                ////dt.Columns["ReExaminationModifiedBy3"].SetOrdinal(21);
                                ////dt.Columns["ReworkExaminationDateTime3"].SetOrdinal(22);
                                ////dt.Columns["Status3"].SetOrdinal(23);
                                //

                                // Cycle 4

                                //ICell cell24 = row0.CreateCell(24);
                                //cell24.SetCellValue("4 Cycle");
                                //var cra24 = new NPOI.SS.Util.CellRangeAddress(0, 0, 24, 28);
                                //sheet1.AddMergedRegion(cra24);
                                //cell24.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy4"].SetOrdinal(24);
                                //dt.Columns["ReworkModifiedDateTime4"].SetOrdinal(25);
                                //dt.Columns["ReExaminationModifiedBy4"].SetOrdinal(26);
                                //dt.Columns["ReworkExaminationDateTime4"].SetOrdinal(27);
                                //dt.Columns["Status4"].SetOrdinal(28);
                                //

                                // Cycle 5

                                //ICell cell29 = row0.CreateCell(29);
                                //cell29.SetCellValue("5 Cycle");
                                //var cra29 = new NPOI.SS.Util.CellRangeAddress(0, 0, 29, 33);
                                //sheet1.AddMergedRegion(cra29);
                                //cell29.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy5"].SetOrdinal(29);
                                //dt.Columns["ReworkModifiedDateTime5"].SetOrdinal(30);
                                //dt.Columns["ReExaminationModifiedBy5"].SetOrdinal(31);
                                //dt.Columns["ReworkExaminationDateTime5"].SetOrdinal(32);
                                //dt.Columns["Status5"].SetOrdinal(33);


                                //




                                //dt.Columns.Remove("ReworkModifiedBy");
                                //dt.Columns.Remove("ReworkModifiedDateTime");
                                dt.Columns.Remove("Sno");
                                dt.Columns.Remove("CompletedName");
                                dt.Columns.Remove("CompletedDate");
                                dt.Columns.Remove("CompletedBY");
                                //dt.Columns.Remove("Filename");
                                dt.Columns.Remove("ModifiedBy");
                                dt.Columns.Remove("SignatureId");
                                dt.Columns.Remove("CheckItem");
                                dt.Columns.Remove("Specification");
                                dt.Columns.Remove("Standard");
                                dt.Columns.Remove("Okcount");
                                dt.Columns.Remove("NotOkcount");
                                dt.Columns.Remove("Skipcount");
                                dt.Columns.Remove("ReworkModifiedBys");
                                dt.Columns.Remove("ReworkExaminationBy");

                                dt.Columns.Remove("UserName");
                                dt.Columns.Remove("CreatedDateTime");


                                dt.Columns.Remove("ReworkModifiedBy");
                                dt.Columns.Remove("ReworkModifiedDateTime");

                                dt.Columns.Remove("ReExaminationModifiedBy");
                                dt.Columns.Remove("ReworkExaminationDateTime");



                                //dt.Columns[0].ColumnName = "Completed By";
                                //dt.Columns[2].ColumnName = "Completed On";
                                dt.Columns[3].ColumnName = "Defect";
                                //dt.Columns[4].ColumnName = "Rework Completed By";
                                //dt.Columns[5].ColumnName = "Rework Completed On";
                                //dt.Columns[6].ColumnName = "Re-Examination By";
                                //dt.Columns[7].ColumnName = "Re-Examination On";


                                start = 5;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                        dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                        dt.Columns[start + 2].ColumnName = "Re-Examination By" + x;
                                        dt.Columns[start + 3].ColumnName = "Re-Examination On" + x;
                                        start = start + 5;
                                    }

                                }

                                // Cycle 1

                                //dt.Columns[9].ColumnName = "Rework Completed By1";
                                //dt.Columns[10].ColumnName = "Rework Completed On1";
                                //dt.Columns[11].ColumnName = "Re-Examination By1";
                                //dt.Columns[12].ColumnName = "Re-Examination On1";

                                // Cycle 2

                                //dt.Columns[14].ColumnName = "Rework Completed By2";
                                //dt.Columns[15].ColumnName = "Rework Completed On2";
                                //dt.Columns[16].ColumnName = "Re-Examination By2";
                                //dt.Columns[17].ColumnName = "Re-Examination On2";

                                // Cycle 3

                                //dt.Columns[19].ColumnName = "Rework Completed By3";
                                //dt.Columns[20].ColumnName = "Rework Completed On3";
                                //dt.Columns[21].ColumnName = "Re-Examination By3";
                                //dt.Columns[22].ColumnName = "Re-Examination On3";

                                // Cycle 4

                                //dt.Columns[24].ColumnName = "Rework Completed By4";
                                //dt.Columns[25].ColumnName = "Rework Completed On4";
                                //dt.Columns[26].ColumnName = "Re-Examination By4";
                                //dt.Columns[27].ColumnName = "Re-Examination On4";

                                // Cycle 5

                                //dt.Columns[29].ColumnName = "Rework Completed By5";
                                //dt.Columns[30].ColumnName = "Rework Completed On5";
                                //dt.Columns[31].ColumnName = "Re-Examination By5";
                                //dt.Columns[32].ColumnName = "Re-Examination On5";


                            }

                            else if ((Convert.ToString(result.HistoryGateDetails[i].GateName)) == "ReExamination1")
                            {


                                //dt.Columns["UserName"].SetOrdinal(0);
                                dt.Columns["GateName"].SetOrdinal(0);
                                //dt.Columns["CreatedDateTime"].SetOrdinal(2);
                                //dt.Columns["Status"].SetOrdinal(1);
                                dt.Columns["PartName"].SetOrdinal(1);
                                dt.Columns["Status"].SetOrdinal(2);

                                dt.Columns["DefectPlace"].SetOrdinal(3);
                                dt.Columns["DefectClass"].SetOrdinal(4);
                                //dt.Columns["ReworkModifiedBy"].SetOrdinal(4);
                                //dt.Columns["ReworkModifiedDateTime"].SetOrdinal(5);
                                //dt.Columns["ReExaminationModifiedBy"].SetOrdinal(6);
                                //dt.Columns["ReworkExaminationDateTime"].SetOrdinal(7);
                                //dt.Columns["Status"].SetOrdinal(8);


                                // Cycle 1


                                int total = result.TotalHistoryMaxCount.ReExaminationCount1;
                                int start = 5;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        ICell cell9 = row0.CreateCell(start);
                                        cell9.SetCellValue(x + "Cycle");
                                        var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 4);
                                        sheet1.AddMergedRegion(cra9);
                                        cell9.CellStyle = yourStyle;

                                        dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                        dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                        dt.Columns["ReExaminationModifiedBy" + x].SetOrdinal(start + 2);
                                        dt.Columns["ReworkExaminationDateTime" + x].SetOrdinal(start + 3);
                                        dt.Columns["Status" + x].SetOrdinal(start + 4);

                                        start = start + 5;
                                    }

                                }
                                else
                                {
                                    for (int x = 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                        dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                    }
                                }

                                if (total >= 1)
                                {
                                    for (int x = total + 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                        dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                    }

                                }




                                //ICell cell9 = row0.CreateCell(9);
                                //cell9.SetCellValue("1 Cycle");

                                //var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, 9, 13);
                                //sheet1.AddMergedRegion(cra9);
                                //cell9.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy1"].SetOrdinal(9);
                                //dt.Columns["ReworkModifiedDateTime1"].SetOrdinal(10);
                                //dt.Columns["ReExaminationModifiedBy1"].SetOrdinal(11);
                                //dt.Columns["ReworkExaminationDateTime1"].SetOrdinal(12);
                                //dt.Columns["Status1"].SetOrdinal(13);
                                //

                                // Cycle 2

                                //ICell cell14 = row0.CreateCell(14);
                                //cell14.SetCellValue("2 Cycle");
                                //var cra14 = new NPOI.SS.Util.CellRangeAddress(0, 0, 14, 18);
                                //sheet1.AddMergedRegion(cra14);
                                //cell14.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy2"].SetOrdinal(14);
                                //dt.Columns["ReworkModifiedDateTime2"].SetOrdinal(15);
                                //dt.Columns["ReExaminationModifiedBy2"].SetOrdinal(16);
                                //dt.Columns["ReworkExaminationDateTime2"].SetOrdinal(17);
                                //dt.Columns["Status2"].SetOrdinal(18);
                                //

                                // Cycle 3

                                ////ICell cell19 = row0.CreateCell(19);
                                ////cell19.SetCellValue("3 Cycle");
                                ////var cra19 = new NPOI.SS.Util.CellRangeAddress(0, 0, 19, 23);
                                ////sheet1.AddMergedRegion(cra19);
                                ////cell19.CellStyle = yourStyle;

                                ////dt.Columns["ReworkModifiedBy3"].SetOrdinal(19);
                                ////dt.Columns["ReworkModifiedDateTime3"].SetOrdinal(20);
                                ////dt.Columns["ReExaminationModifiedBy3"].SetOrdinal(21);
                                ////dt.Columns["ReworkExaminationDateTime3"].SetOrdinal(22);
                                ////dt.Columns["Status3"].SetOrdinal(23);
                                //

                                // Cycle 4

                                //ICell cell24 = row0.CreateCell(24);
                                //cell24.SetCellValue("4 Cycle");
                                //var cra24 = new NPOI.SS.Util.CellRangeAddress(0, 0, 24, 28);
                                //sheet1.AddMergedRegion(cra24);
                                //cell24.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy4"].SetOrdinal(24);
                                //dt.Columns["ReworkModifiedDateTime4"].SetOrdinal(25);
                                //dt.Columns["ReExaminationModifiedBy4"].SetOrdinal(26);
                                //dt.Columns["ReworkExaminationDateTime4"].SetOrdinal(27);
                                //dt.Columns["Status4"].SetOrdinal(28);
                                //

                                // Cycle 5

                                //ICell cell29 = row0.CreateCell(29);
                                //cell29.SetCellValue("5 Cycle");
                                //var cra29 = new NPOI.SS.Util.CellRangeAddress(0, 0, 29, 33);
                                //sheet1.AddMergedRegion(cra29);
                                //cell29.CellStyle = yourStyle;

                                //dt.Columns["ReworkModifiedBy5"].SetOrdinal(29);
                                //dt.Columns["ReworkModifiedDateTime5"].SetOrdinal(30);
                                //dt.Columns["ReExaminationModifiedBy5"].SetOrdinal(31);
                                //dt.Columns["ReworkExaminationDateTime5"].SetOrdinal(32);
                                //dt.Columns["Status5"].SetOrdinal(33);


                                //




                                //dt.Columns.Remove("ReworkModifiedBy");
                                //dt.Columns.Remove("ReworkModifiedDateTime");
                                dt.Columns.Remove("Sno");
                                dt.Columns.Remove("CompletedName");
                                dt.Columns.Remove("CompletedDate");
                                dt.Columns.Remove("CompletedBY");
                                //dt.Columns.Remove("Filename");
                                dt.Columns.Remove("ModifiedBy");
                                dt.Columns.Remove("SignatureId");
                                dt.Columns.Remove("CheckItem");
                                dt.Columns.Remove("Specification");
                                dt.Columns.Remove("Standard");
                                dt.Columns.Remove("Okcount");
                                dt.Columns.Remove("NotOkcount");
                                dt.Columns.Remove("Skipcount");
                                dt.Columns.Remove("ReworkModifiedBys");
                                dt.Columns.Remove("ReworkExaminationBy");

                                dt.Columns.Remove("UserName");
                                dt.Columns.Remove("CreatedDateTime");


                                dt.Columns.Remove("ReworkModifiedBy");
                                dt.Columns.Remove("ReworkModifiedDateTime");

                                dt.Columns.Remove("ReExaminationModifiedBy");
                                dt.Columns.Remove("ReworkExaminationDateTime");



                                //dt.Columns[0].ColumnName = "Completed By";
                                //dt.Columns[2].ColumnName = "Completed On";
                                dt.Columns[3].ColumnName = "Defect";
                                //dt.Columns[4].ColumnName = "Rework Completed By";
                                //dt.Columns[5].ColumnName = "Rework Completed On";
                                //dt.Columns[6].ColumnName = "Re-Examination By";
                                //dt.Columns[7].ColumnName = "Re-Examination On";


                                start = 5;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                        dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                        dt.Columns[start + 2].ColumnName = "Re-Examination By" + x;
                                        dt.Columns[start + 3].ColumnName = "Re-Examination On" + x;
                                        start = start + 5;
                                    }

                                }
                            }


                            else if ((Convert.ToString(result.HistoryGateDetails[i].GateName)) == "Comments")
                            {


                                dt.Columns["GateName"].SetOrdinal(0);
                                
                                dt.Columns["PartName"].SetOrdinal(1);
                                dt.Columns["Status"].SetOrdinal(2);

                                dt.Columns["DefectPlace"].SetOrdinal(3);
                                dt.Columns["DefectClass"].SetOrdinal(4);



                                int total = result.TotalHistoryMaxCount.ReworkCount;
                                int start = 5;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        ICell cell9 = row0.CreateCell(start);
                                        cell9.SetCellValue(x + "Cycle");
                                        var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 6);
                                        sheet1.AddMergedRegion(cra9);
                                        cell9.CellStyle = yourStyle;

                                        dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                        dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                        dt.Columns["ReworkComments" + x].SetOrdinal(start + 2);
                                        dt.Columns["ReExaminationModifiedBy" + x].SetOrdinal(start + 3);
                                        dt.Columns["ReworkExaminationDateTime" + x].SetOrdinal(start + 4);
                                        dt.Columns["ReExamiantionComments" + x].SetOrdinal(start + 5);
                                        dt.Columns["Status" + x].SetOrdinal(start + 6);
                                        start = start + 7;
                                    }

                                }
                                else
                                {
                                    for (int x = 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                        dt.Columns.Remove("ReworkComments" + x);
                                        dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                        dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                        dt.Columns.Remove("ReExamiantionComments" + x);
                                    }
                                }

                                if (total >= 1)
                                {
                                    for (int x = total + 1; x <= 5; x++)
                                    {

                                        dt.Columns.Remove("ReworkModifiedBy" + x);
                                        dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                        dt.Columns.Remove("Status" + x);
                                        dt.Columns.Remove("ReworkComments" + x);
                                        dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                        dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                        dt.Columns.Remove("ReExamiantionComments" + x);
                                    }

                                }

                              
                                dt.Columns.Remove("Sno");
                                dt.Columns.Remove("CompletedName");
                                dt.Columns.Remove("CompletedDate");
                                dt.Columns.Remove("CompletedBY");
                                //dt.Columns.Remove("Filename");
                                dt.Columns.Remove("ModifiedBy");
                                dt.Columns.Remove("SignatureId");
                                dt.Columns.Remove("CheckItem");
                                dt.Columns.Remove("Specification");
                                dt.Columns.Remove("Standard");
                                dt.Columns.Remove("Okcount");
                                dt.Columns.Remove("NotOkcount");
                                dt.Columns.Remove("Skipcount");
                                dt.Columns.Remove("UserName");
                                dt.Columns.Remove("CreatedDateTime");
                              
                                dt.Columns[3].ColumnName = "Defect";
                               


                                start = 5;
                                if (total > 0)
                                {
                                    for (int x = 1; x <= total; x++)
                                    {
                                        dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                        dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                        dt.Columns[start + 2].ColumnName = "Rework Comments" + x;
                                        dt.Columns[start + 3].ColumnName = "Re-Examination By" + x;
                                        dt.Columns[start + 4].ColumnName = "Re-Examination On" + x;
                                        dt.Columns[start + 5].ColumnName = "Re-Examination Comments" + x;
                                        start = start + 7;
                                    }

                                }
                            }











                            else if ((Convert.ToString(result.HistoryGateDetails[i].GateName)) == "Seal")
                            {
                                dt.Columns.Remove("UserName");
                                dt.Columns.Remove("CreatedDateTime");
                                dt.Columns.Remove("Status");
                                dt.Columns.Remove("Okcount");
                                dt.Columns.Remove("NotOkcount");
                                dt.Columns.Remove("Skipcount");
                                dt.Columns.Remove("CheckItem");
                                dt.Columns.Remove("Standard");
                                dt.Columns.Remove("Specification");
                                dt.Columns.Remove("DefectPlace");
                                dt.Columns.Remove("DefectClass");
                                dt.Columns.Remove("PartName");
                                //dt.Columns.Remove("ActualValue");
                                //dt.Columns.Remove("Responsible");
                                //dt.Columns.Remove("DamageCode");
                                //dt.Columns.Remove("Comments");
                                //dt.Columns.Remove("Attachment");
                                dt.Columns.Remove("Sno");
                                dt.Columns.Remove("ModifiedBy");
                                dt.Columns.Remove("SignatureId");
                                dt.Columns.Remove("CompletedBY");
                                dt.Columns.Remove("ReworkModifiedBy");
                                dt.Columns.Remove("ReworkModifiedDateTime");
                                dt.Columns.Remove("ReworkExaminationBy");
                                dt.Columns.Remove("ReworkExaminationDateTime");
                                dt.Columns.Remove("ReExaminationModifiedBy");
                                dt.Columns.Remove("ReworkModifiedBys");


                                //Cycle 1
                                dt.Columns.Remove("ReworkModifiedBy1");
                                dt.Columns.Remove("ReworkModifiedDateTime1");
                                dt.Columns.Remove("Status1");

                                //Cycle 2
                                dt.Columns.Remove("ReworkModifiedBy2");
                                dt.Columns.Remove("ReworkModifiedDateTime2");
                                dt.Columns.Remove("Status2");

                                //Cycle 3
                                dt.Columns.Remove("ReworkModifiedBy3");
                                dt.Columns.Remove("ReworkModifiedDateTime3");
                                dt.Columns.Remove("Status3");

                                //Cycle 4
                                dt.Columns.Remove("ReworkModifiedBy4");
                                dt.Columns.Remove("ReworkModifiedDateTime4");
                                dt.Columns.Remove("Status4");

                                //Cycle 5
                                dt.Columns.Remove("ReworkModifiedBy5");
                                dt.Columns.Remove("ReworkModifiedDateTime5");
                                dt.Columns.Remove("Status5");

                                dt.Columns.Remove("ReExaminationModifiedBy1");
                                dt.Columns.Remove("ReworkExaminationDateTime1");

                                dt.Columns.Remove("ReExaminationModifiedBy2");
                                dt.Columns.Remove("ReworkExaminationDateTime2");

                                dt.Columns.Remove("ReExaminationModifiedBy3");
                                dt.Columns.Remove("ReworkExaminationDateTime3");

                                dt.Columns.Remove("ReExaminationModifiedBy4");
                                dt.Columns.Remove("ReworkExaminationDateTime4");

                                dt.Columns.Remove("ReExaminationModifiedBy5");
                                dt.Columns.Remove("ReworkExaminationDateTime5");


                                // dt.Columns[1].ColumnName = "Sno";
                                dt.Columns[0].ColumnName = "Gate Name";
                                dt.Columns[1].ColumnName = "Completed By";
                                dt.Columns[2].ColumnName = "Completed Date";
                                // dt.Columns[3].ColumnName = "Completed BY";
                                dt.Columns[3].ColumnName = "Signature";

                            }

                            //for (int l = 0; l < dt.Columns.Count-1; l++)
                            //{
                            //    sheet1.SetColumnWidth(l, 9000);
                            //    ICell cell = row1.CreateCell(l);
                            //    cell.CellStyle = workbook.CreateCellStyle();

                            //    cell.CellStyle = yourStyle;
                            //    cell.CellStyle.SetFont(font);
                            //    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                            //    cell.CellStyle.FillPattern = FillPattern.NoFill;

                            //    String columnName = dt.Columns[l].ToString();
                            //    if (dt.Columns[l].ToString() == "Signature")
                            //    {
                            //        sign = dt.Columns[l].ToString();
                            //    }
                            //    if(columnName !="Filename")
                            //    {
                            //        cell.SetCellValue(columnName);
                            //    }
                               



                            //}

                            for (int k = 0; k < dt.Rows.Count; k++)
                            {
                                IRow row = sheet1.CreateRow(k + 2);
                                string value = string.Empty;

                                string sgn = dt.Rows[k].ItemArray[3].ToString();

                                if (sgn.Length > 10)
                                {
                                    value = sgn.Substring(0, 10);
                                }

                                for (int j = 0; j < dt.Columns.Count-1; j++)
                                {


                                    int l = j;
                                    sheet1.SetColumnWidth(l, 9000);
                                    ICell cell1 = row1.CreateCell(l);
                                    cell1.CellStyle = workbook.CreateCellStyle();

                                    cell1.CellStyle = yourStyle;
                                    cell1.CellStyle.SetFont(font);
                                    cell1.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell1.CellStyle.FillPattern = FillPattern.NoFill;

                                    String columnName1 = dt.Columns[l].ToString();
                                    if (dt.Columns[l].ToString() == "Signature")
                                    {
                                        sign = dt.Columns[l].ToString();
                                    }
                                    if (columnName1 != "Filename")
                                    {
                                        cell1.SetCellValue(columnName1);
                                    }










                                    ICell cell = row.CreateCell(j);

                                    cell.CellStyle = yourStyle;


                                    if ((Convert.ToString(result.HistoryGateDetails[i].GateName)) == "Seal")
                                    {
                                        row.Height = 932;

                                    }


                                    String columnName = dt.Columns[j].ToString();


                                    if (value == "Signature_" && columnName == "Signature")

                                    {
                                        byte[] data = null;
                                        WebServices _web = new WebServices();
                                        string filepath = _web.GetSignaturePathPath() + dt.Rows[k][columnName].ToString();// + "\\" + filename;
                                        data = GetBytesFromFile(filepath);
                                        int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
                                        ICreationHelper helper = workbook.GetCreationHelper();
                                        IDrawing drawing = sheet1.CreateDrawingPatriarch();
                                        IClientAnchor anchor = helper.CreateClientAnchor();

                                        //anchor.Dx1 = 0;
                                        //anchor.Dy1 = 0;
                                        //anchor.Dx2 = 5;
                                        //anchor.Dy2 = 5;
                                        anchor.Col1 = j;
                                        anchor.Row1 = k + j - 1;

                                        IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                                        picture.Resize(1,1);

                                        dt.Rows[k][columnName] = "";

                                    }

                                    if (columnName == "Defect")

                                    {
                                        var Defect = dt.Rows[k][columnName].ToString();
                                        if(Defect=="")
                                        {

                                        
                                        byte[] data = null;
                                        WebServices _web = new WebServices();
                                        string filepath = _web.GetSignaturePathPath()+ VIN + dt.Rows[k]["Filename"].ToString();// + "\\" + filename;

                                            string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
                                            string Filename = dt.Rows[k]["Filename"].ToString();
                                           
                                            string fileNameWithPath = path + @"" + VIN + @"\" + Filename;
                                            data = GetBytesFromFile(fileNameWithPath);
                                        int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
                                        ICreationHelper helper = workbook.GetCreationHelper();
                                        IDrawing drawing = sheet1.CreateDrawingPatriarch();
                                        IClientAnchor anchor = helper.CreateClientAnchor();

                                        //anchor.Dx1 = 0;
                                        //anchor.Dy1 = 0;
                                        //anchor.Dx2 = 5;
                                        //anchor.Dy2 = 5;
                                        anchor.Col1 = j;
                                        anchor.Row1 = k+2;
                                         
                                         IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                                        picture.Resize(1, 1);

                                        }
                                        else
                                        {
                                            if (columnName != "Filename")
                                            {
                                                cell.SetCellValue(dt.Rows[k][columnName].ToString());
                                            }
                                            

                                        }

                                    }

                                    else
                                    {

                                    cell.SetCellValue(dt.Rows[k][columnName].ToString());
                                                
                                    }
                                    foreach (DataColumn column in dt.Columns)
                                    {
                                        //dt.Columns.Remove("Filename");
                                        if (columnName != "Filename"|| columnName != "Signature")
                                        {
                                            sheet1.AutoSizeColumn(column.Ordinal);
                                        }
                                  
                                       
                                        
                                    }
                                }
                               
                                //ICell cell = row.CreateCell(j);
                                //cell.CellStyle = yourStyleRow;
                                //String columnName = dt.Columns[j].ToString();
                                //cell.SetCellValue(dt.Rows[k][columnName].ToString());


                            }

                            
                        }
                    }

                    using (var exportData = new MemoryStream())
                    {
                        Response.Clear();
                        workbook.Write(exportData);

                        Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", VIN + "-VinHistroyDetails" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx"));
                        Response.BinaryWrite(exportData.ToArray());
                        Response.End();
                    }


                }
            }
            catch (Exception ex)
            {

                ErrorLog.Log("Progressmonitor Excel - VINHistoryDownloadExcel " + ex.Message);
            }
        }

        [SessionExpire]
        [Obsolete]
        public ActionResult VINHistoryDownloadExcelHistory(int PlantId, string VinFrom, string VinTo, string FromDate, string ToDate)
        {

            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];
            VIN_DATAEXCEL(PlantId, VinFrom, VinTo, FromDate, ToDate, Users.Token);


            return null;

        }

        private void AddToArchive(ZipArchive ziparchive, string fileName, byte[] attach)
        {
            var zipEntry = ziparchive.CreateEntry(fileName, System.IO.Compression.CompressionLevel.Optimal);
            using (var zipStream = zipEntry.Open())
            using (var streamIn = new MemoryStream(attach))
            {
                streamIn.CopyTo(zipStream);
            }
        }
        [SessionExpire]
        [Obsolete]
        public void VIN_DATAEXCEL(int PlantId, string VinFrom, string VinTo, string FromDate, string ToDate, string token)
        {
            WebServices webService = new WebServices();
            string ToVin = "";
            string Todate = "";
            if (VinTo == "" || VinTo == null)
            {
                VinTo = VinFrom;
            }


            if (ToDate == "" || ToDate == null)
            {
                ToDate = FromDate;
            }
            try
            {


                DataSet ds = webService.Get_VINDATA(PlantId, VinFrom, VinTo, FromDate, ToDate, token);
                var datatable1 = ds.Tables[0];
                var datatable2 = ds.Tables[1];
                var datatable3 = ds.Tables[2];
                var datatable4 = ds.Tables[3];
                DataView view = new DataView(datatable1);
                DataView view1 = new DataView(datatable1);
                var uniqueline = view.ToTable(true, "LineName", "LineId");


                IWorkbook workbook = new XSSFWorkbook();
                var font = workbook.CreateFont();
                font.FontHeightInPoints = (short)12;
                font.FontName = "Calibri";

                font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                //make a header row  
                XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                yourStyle.WrapText = true;
                yourStyle.Alignment = HorizontalAlignment.Center;
                yourStyle.VerticalAlignment = VerticalAlignment.Center;
                XSSFCellStyle yourStyleRow = (XSSFCellStyle)workbook.CreateCellStyle();
                yourStyleRow.WrapText = true;

                yourStyle.BorderBottom = BorderStyle.Medium;
                yourStyle.BorderRight = BorderStyle.Medium;
                yourStyle.BorderTop = BorderStyle.Medium;
                yourStyle.BorderLeft = BorderStyle.Medium;

                for (var i = 0; i < uniqueline.Rows.Count; i++)
                {
                  
                        var uniquelineitemscount = datatable2.AsEnumerable()
                               .Where(r => r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"])).ToList();
                        if (uniquelineitemscount != null && uniquelineitemscount.Count != 0)
                        {

                            ISheet sheet1 = workbook.CreateSheet(Convert.ToString(uniqueline.Rows[i]["LineName"]));
                            IRow row1 = sheet1.CreateRow(0);
                            DataTable uniquelineitems = datatable2.AsEnumerable()
                                   .Where(r => r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"]))
                                   .CopyToDataTable();
                            int c = 0;
                            for (int j = 0; j < uniquelineitems.Columns.Count; j++)
                            {


                                String columnName = uniquelineitems.Columns[j].ToString();
                                if (columnName == "VINNumber" || columnName == "VehicleType" || columnName == "ModelName")
                                {
                                    ICell cell = row1.CreateCell(c);
                                    cell.SetCellValue(columnName);
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                    c = c + 1;

                                }
                                else if (columnName != "LineId" && columnName != "Rework" && columnName != "Reexam" && columnName != "Reexam1")
                                {
                                    var columngates = Convert.ToString(uniquelineitems.Columns[j]).Split('_')[1];
                                    var filtergate = datatable1.AsEnumerable()
                                         .Where(r => r.Field<Int64>("QGateId") == Convert.ToInt64(columngates) &&
                                                  r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"]))
                                         .ToList();


                                    if (filtergate.Count != 0)
                                    {
                                        ICell cell = row1.CreateCell(c);
                                        cell.SetCellValue(columnName.Split('_')[0] + " Date Time");
                                        sheet1.SetColumnWidth(c, 8000);
                                        cell.CellStyle = workbook.CreateCellStyle();
                                        cell.CellStyle = yourStyle;
                                        cell.CellStyle.SetFont(font);
                                        cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                        cell.CellStyle.FillPattern = FillPattern.NoFill;
                                        c = c + 1;
                                        cell = row1.CreateCell(c);
                                        cell.SetCellValue(columnName.Split('_')[0]);
                                        sheet1.SetColumnWidth(c, 8000);
                                        cell.CellStyle = workbook.CreateCellStyle();
                                        cell.CellStyle = yourStyle;
                                        cell.CellStyle.SetFont(font);
                                        cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                        cell.CellStyle.FillPattern = FillPattern.NoFill;
                                        c = c + 1;
                                        cell = row1.CreateCell(c);
                                        cell.SetCellValue(columnName.Split('_')[0] + " Not OK");
                                        sheet1.SetColumnWidth(c, 8000);
                                        cell.CellStyle = workbook.CreateCellStyle();
                                        cell.CellStyle = yourStyle;
                                        cell.CellStyle.SetFont(font);
                                        cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                        cell.CellStyle.FillPattern = FillPattern.NoFill;
                                        c = c + 1;

                                    }
                                }
                                else if (columnName == "Rework" && columnName != "LineId" && columnName != "Reexam" && columnName != "Reexam1")
                                {
                                    ICell cell = row1.CreateCell(c);
                                    cell.SetCellValue("Rework");
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                    c = c + 1;

                                    cell = row1.CreateCell(c);
                                    cell.SetCellValue("Rework Date Time");
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                    c = c + 1;

                                }
                                else if (columnName == "Reexam" && columnName != "LineId" && columnName != "Rework")
                                {
                                    ICell cell = row1.CreateCell(c);
                                    cell.SetCellValue("QG Re-examination");
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                    c = c + 1;

                                    cell = row1.CreateCell(c);
                                    cell.SetCellValue("QG Re-examination Not Ok");
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                    c = c + 1;
                                }


                                else if (columnName == "Reexam1" && columnName != "LineId" && columnName != "Rework")
                                {
                                    ICell cell = row1.CreateCell(c);
                                    cell.SetCellValue("完成 Re-examination");
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                    c = c + 1;

                                    cell = row1.CreateCell(c);
                                    cell.SetCellValue("完成 Re-examination Not Ok");
                                    sheet1.SetColumnWidth(c, 8000);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                                }

                                else { 
                                }
                            }

                            for (int k = 0; k < uniquelineitems.Rows.Count; k++)
                            {
                                IRow row = sheet1.CreateRow(k + 1);
                                c = 0;

                                for (int j = 0; j < uniquelineitems.Columns.Count; j++)
                                {
                                    var glboalrework = datatable4.AsEnumerable()
                                                                         .Where(r => r.Field<string>("VINNumber") == uniquelineitems.Rows[k]["VINNumber"].ToString())
                                                                         .ToList();
                                    ICell cell = row.CreateCell(c);
                                    cell.CellStyle = yourStyle;
                                    String columnName = uniquelineitems.Columns[j].ToString();
                                    if (columnName == "VINNumber" || columnName == "VehicleType" || columnName == "ModelName")
                                    {
                                        cell.CellStyle = yourStyle;
                                        cell.SetCellValue(uniquelineitems.Rows[k][columnName].ToString());
                                        c = c + 1;
                                        cell = row.CreateCell(c);
                                        cell.CellStyle = yourStyle;
                                    }
                                    else if (columnName != "LineId" && columnName != "Rework" && columnName != "Reexam" && columnName != "Reexam1")
                                    {
                                        var filtergate = datatable1.AsEnumerable()
                                        .Where(r => r.Field<Int64>("QGateId") == Convert.ToInt64(columnName.Split('_')[1]) &&
                                                 r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"]))
                                        .ToList();
                                        if (filtergate.Count != 0)
                                        {
                                            var glboaldata = datatable3.AsEnumerable()
                                             .Where(r => r.Field<Int64>("QGateId") == Convert.ToInt64(columnName.Split('_')[1]) &&
                                                      r.Field<string>("VINNumber") == uniquelineitems.Rows[k]["VINNumber"].ToString())
                                             .ToList();
                                            if (glboaldata.Count != 0)
                                            {
                                                cell.CellStyle = yourStyle;
                                                cell.SetCellValue(Convert.ToString(glboaldata[0]["Date"]));
                                                c = c + 1;
                                                cell = row.CreateCell(c);
                                                cell.CellStyle = yourStyle;
                                                if (Convert.ToString(uniquelineitems.Rows[k][columnName]).Split('.')[0] == "1")
                                                {
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("OK");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                }
                                                if (Convert.ToString(uniquelineitems.Rows[k][columnName]).Split('.')[0] == "2")
                                                {
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("NOT OK");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue(Convert.ToString(glboaldata[0]["Denomerator"]));
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                }
                                                if (Convert.ToString(uniquelineitems.Rows[k][columnName]).Split('.')[0] == "3")
                                                {
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("Pending");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                }
                                            }
                                            else
                                            {
                                                cell.CellStyle = yourStyle;
                                                cell.SetCellValue(string.Empty);
                                                c = c + 1;
                                                cell = row.CreateCell(c);
                                                cell.CellStyle = yourStyle;
                                                cell.SetCellValue(string.Empty);
                                                c = c + 1; cell = row.CreateCell(c);
                                                cell.CellStyle = yourStyle;
                                                cell.SetCellValue(string.Empty);
                                                c = c + 1;
                                                cell = row.CreateCell(c);
                                                cell.CellStyle = yourStyle;
                                            }
                                        }
                                    }
                                    else if (columnName == "Rework" && columnName != "LineId" && columnName != "Reexam" && columnName != "Reexam1")
                                    {
                                        var Numerator = 0;
                                        var Denomerator = 0;
                                         if (glboalrework.Count > 1) 
                                         {
                                             Numerator = Convert.ToInt32(glboalrework[0]["Numerator"]) + Convert.ToInt32(glboalrework[1]["Numerator"]);
                                             Denomerator = Convert.ToInt32(glboalrework[0]["Denomerator"]) + Convert.ToInt32(glboalrework[1]["Denomerator"]);
                                         }
                                    else {
                                         Numerator = Convert.ToInt32(glboalrework[0]["Numerator"]) ;
                                         Denomerator = Convert.ToInt32(glboalrework[0]["Denomerator"]);
                                    }

                                        cell.CellStyle = yourStyle;
                                        cell.SetCellValue(Convert.ToString(Numerator) + "/" + Convert.ToString(Denomerator));
                                        c = c + 1;
                                        cell = row.CreateCell(c);
                                        cell.CellStyle = yourStyle;
                                        cell.SetCellValue(Convert.ToString(glboalrework[0]["ReworkDate"]));
                                        c = c + 1;
                                        cell = row.CreateCell(c);
                                        cell.CellStyle = yourStyle;
                                    }
                                    else if (columnName == "Reexam" && columnName != "LineId" && columnName != "Rework")
                                    {

                                        if (Convert.ToString(glboalrework[0]["ReExaminationGateId"]) == "1")
                                        {
                                             if (Convert.ToString(glboalrework[0]["Denomerator"]) != "0" && Convert.ToString(glboalrework[0]["Numerator"]) == Convert.ToString(glboalrework[0]["Denomerator"]) && Convert.ToString(glboalrework[0]["Rework"]) == "0")
                                        {
                                            cell.CellStyle = yourStyle;
                                            cell.SetCellValue("OK");
                                            c = c + 1;
                                            cell = row.CreateCell(c);
                                            cell.CellStyle = yourStyle;
                                            c = c + 1;
                                            
                                        }

                                             else if (Convert.ToString(glboalrework[0]["Rework"]) != "0")
                                             {
                                                 cell.CellStyle = yourStyle;
                                                 cell.SetCellValue("NOT OK");
                                                 c = c + 1;
                                                 cell = row.CreateCell(c);
                                                 cell.CellStyle = yourStyle;
                                                 cell.SetCellValue(Convert.ToString(glboalrework[0]["Rework"]));
                                                 c = c + 1;
                                             }
                                             else
                                             {

                                                 cell.SetCellValue("");
                                                 c = c + 1;
                                                 cell = row.CreateCell(c);
                                                 cell.CellStyle = yourStyle;
                                                 c = c + 1;
                                             }
                                        }
                                       
                                        else
                                        {
                                            cell.SetCellValue("");
                                            c = c + 1;
                                            cell = row.CreateCell(c);
                                            cell.CellStyle = yourStyle;
                                            c = c + 1;
                                        }

                                    }

                                    else if (columnName == "Reexam1" && columnName != "LineId" && columnName != "Rework")
                                    {

                                        if (glboalrework.Count > 1)
                                        {

                                            if (Convert.ToString(glboalrework[1]["ReExaminationGateId"]) == "2")
                                            {
                                                if (Convert.ToString(glboalrework[1]["Denomerator"]) != "0" && Convert.ToString(glboalrework[1]["Numerator"]) == Convert.ToString(glboalrework[1]["Denomerator"]) && Convert.ToString(glboalrework[1]["Rework"]) == "0")
                                                {

                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("OK");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                }

                                                else if (Convert.ToString(glboalrework[1]["Rework"]) != "0")
                                                {
                                                    
                                                   
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("NOT OK");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue(Convert.ToString(glboalrework[1]["Rework"]));
                                                }
                                                else
                                                {
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                }
                                            }

                                        }
                                        else
                                        {

                                            if (Convert.ToString(glboalrework[0]["ReExaminationGateId"]) == "2")
                                            {
                                                if (Convert.ToString(glboalrework[0]["Denomerator"]) != "0" && Convert.ToString(glboalrework[0]["Numerator"]) == Convert.ToString(glboalrework[0]["Denomerator"]) && Convert.ToString(glboalrework[0]["Rework"]) == "0")
                                                {

                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("OK");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                   
                                                }

                                                else if (Convert.ToString(glboalrework[0]["Rework"]) != "0")
                                                {
                                                   
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue("NOT OK");
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                    cell.SetCellValue(Convert.ToString(glboalrework[1]["Rework"]));
                                                }
                                                else
                                                {
                                                    c = c + 1;
                                                    cell = row.CreateCell(c);
                                                    cell.CellStyle = yourStyle;
                                                }
                                            }
                                        }


                                      

                                      
                                        
                                     

                                    }

                                    else { }
                                }
                            }
                        }
                    
                    //else if (i == 1)
                    //{
                    //    var uniquelineitemscount = datatable2.AsEnumerable()
                    //           .Where(r => r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"])).ToList();

                      

                    //    if (uniquelineitemscount != null && uniquelineitemscount.Count != 0)
                    //    {
                    //        ISheet sheet2 = workbook.CreateSheet(Convert.ToString(uniqueline.Rows[i]["LineName"]));
                    //        IRow row2 = sheet2.CreateRow(0);
                    //        DataTable uniquelineitems = datatable2.AsEnumerable()
                    //        .Where(r => r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"]))
                    //        .CopyToDataTable();
                    //        int c = 0;
                    //        for (int j = 0; j < uniquelineitems.Columns.Count; j++)
                    //        {


                    //            String columnName = uniquelineitems.Columns[j].ToString();
                    //            if (j == 0 || j == 1 || j == 2)
                    //            {
                    //                ICell cell = row2.CreateCell(c);
                    //                cell.SetCellValue(columnName);
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                c = c + 1;
                    //            }
                    //            else if (columnName != "LineId" && columnName != "Rework" && columnName != "Reexam" && columnName != "Reexam1")
                    //            {
                    //                var columngates = Convert.ToString(uniquelineitems.Columns[j]).Split('_')[1];
                    //                var filtergate = datatable1.AsEnumerable()
                    //                     .Where(r => r.Field<Int64>("QGateId") == Convert.ToInt64(columngates) &&
                    //                              r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"]))
                    //                     .ToList();


                    //                if (filtergate.Count != 0)
                    //                {
                    //                    ICell cell = row2.CreateCell(c);
                    //                    cell.SetCellValue(columnName.Split('_')[0] + " Date Time");
                    //                    sheet2.SetColumnWidth(c, 8000);
                    //                    cell.CellStyle = workbook.CreateCellStyle();
                    //                    cell.CellStyle = yourStyle;
                    //                    cell.CellStyle.SetFont(font);
                    //                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                    c = c + 1;
                    //                    cell = row2.CreateCell(c);
                    //                    cell.SetCellValue(columnName.Split('_')[0]);
                    //                    sheet2.SetColumnWidth(c, 8000);
                    //                    cell.CellStyle = workbook.CreateCellStyle();
                    //                    cell.CellStyle = yourStyle;
                    //                    cell.CellStyle.SetFont(font);
                    //                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                    c = c + 1;
                    //                    cell = row2.CreateCell(c);
                    //                    cell.SetCellValue(columnName.Split('_')[0] + " Not OK");
                    //                    sheet2.SetColumnWidth(c, 8000);
                    //                    cell.CellStyle = workbook.CreateCellStyle();
                    //                    cell.CellStyle = yourStyle;
                    //                    cell.CellStyle.SetFont(font);
                    //                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                    cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                    c = c + 1;

                    //                }
                    //            }
                    //            else if (columnName == "Rework" && columnName != "LineId" && columnName != "Reexam" && columnName != "Reexam1")
                    //            {
                    //                ICell cell = row2.CreateCell(c);
                    //                cell.SetCellValue("Rework");
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                c = c + 1;
                    //                cell = row2.CreateCell(c);
                    //                cell.SetCellValue("Rework Date Time");
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                c = c + 1;
                    //            }
                    //            else if (columnName == "Reexam" && columnName != "LineId" && columnName != "Rework")
                    //            {
                    //                ICell cell = row2.CreateCell(c);
                    //                cell.SetCellValue("QG Re-examination");
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                c = c + 1;
                    //                cell = row2.CreateCell(c);
                    //                cell.SetCellValue("QG Re-examination Not Ok");
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                cell.CellStyle.BorderDiagonalLineStyle = BorderStyle.Thick;
                    //                c = c + 1;
                    //            }

                    //            else if (columnName == "Reexam1" && columnName != "LineId" && columnName != "Rework")
                    //            {
                    //                ICell cell = row2.CreateCell(c);
                    //                cell.SetCellValue("完成 Re-examination");
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                c = c + 1;
                    //                cell = row2.CreateCell(c);
                    //                cell.SetCellValue("完成 Re-examination Not Ok");
                    //                sheet2.SetColumnWidth(c, 8000);
                    //                cell.CellStyle = workbook.CreateCellStyle();
                    //                cell.CellStyle = yourStyle;
                    //                cell.CellStyle.SetFont(font);
                    //                cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                    //                cell.CellStyle.FillPattern = FillPattern.NoFill;
                    //                cell.CellStyle.BorderDiagonalLineStyle = BorderStyle.Thick;
                    //            }

                    //            else { }
                    //        }


                    //        for (int k = 0; k < uniquelineitems.Rows.Count; k++)
                    //        {
                    //            IRow row = sheet2.CreateRow(k + 1);
                    //            c = 0;
                    //            for (int j = 0; j < uniquelineitems.Columns.Count; j++)
                    //            {
                    //                var glboalrework = datatable4.AsEnumerable()
                    //                                                     .Where(r => r.Field<string>("VINNumber") == uniquelineitems.Rows[k]["VINNumber"].ToString())
                    //                                                     .ToList();
                    //                ICell cell = row.CreateCell(c);
                    //                String columnName = uniquelineitems.Columns[j].ToString();
                    //                if (columnName == "VINNumber" || columnName == "VehicleType" || columnName == "ModelName")
                    //                {
                    //                    cell.CellStyle = yourStyle;
                    //                    cell.SetCellValue(uniquelineitems.Rows[k][columnName].ToString());
                    //                    c = c + 1;
                    //                    cell = row.CreateCell(c);
                    //                    cell.CellStyle = yourStyle;
                    //                }
                    //                else if (columnName != "LineId" && columnName != "Rework" && columnName != "Reexam" && columnName != "Reexam1")
                    //                {
                    //                    var filtergate = datatable1.AsEnumerable()
                    //                    .Where(r => r.Field<Int64>("QGateId") == Convert.ToInt64(columnName.Split('_')[1]) &&
                    //                             r.Field<Int64>("LineId") == Convert.ToInt64(uniqueline.Rows[i]["LineId"]))
                    //                    .ToList();
                    //                    if (filtergate.Count != 0)
                    //                    {
                    //                        var glboaldata = datatable3.AsEnumerable()
                    //                         .Where(r => r.Field<Int64>("QGateId") == Convert.ToInt64(columnName.Split('_')[1]) &&
                    //                                  r.Field<string>("VINNumber") == uniquelineitems.Rows[k]["VINNumber"].ToString())
                    //                         .ToList();
                    //                        if (glboaldata.Count != 0)
                    //                        {
                    //                            cell.CellStyle = yourStyle;
                    //                            cell.SetCellValue(Convert.ToString(glboaldata[0]["Date"]));
                    //                            c = c + 1;
                    //                            cell = row.CreateCell(c);
                    //                            cell.CellStyle = yourStyle;
                    //                            if (Convert.ToString(uniquelineitems.Rows[k][columnName]).Split('.')[0] == "1")
                    //                            {
                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("OK");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                            }
                    //                            if (Convert.ToString(uniquelineitems.Rows[k][columnName]).Split('.')[0] == "2")
                    //                            {
                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("NOT OK");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue(Convert.ToString(glboaldata[0]["Denomerator"]));
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                            }
                    //                            if (Convert.ToString(uniquelineitems.Rows[k][columnName]).Split('.')[0] == "3")
                    //                            {
                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("Pending");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                            }
                    //                        }
                    //                        else
                    //                        {
                    //                            cell.CellStyle = yourStyle;
                    //                            cell.SetCellValue(string.Empty);
                    //                            c = c + 1;
                    //                            cell = row.CreateCell(c);
                    //                            cell.CellStyle = yourStyle;
                    //                            cell.SetCellValue(string.Empty);
                    //                            c = c + 1; cell = row.CreateCell(c);
                    //                            cell.CellStyle = yourStyle;
                    //                            cell.SetCellValue(string.Empty);
                    //                            c = c + 1;
                    //                            cell = row.CreateCell(c);
                    //                            cell.CellStyle = yourStyle;
                    //                        }
                    //                    }
                    //                }
                    //                else if (columnName == "Rework" && columnName != "LineId" && columnName != "Reexam" && columnName != "Reexam1")
                    //                {
                    //                    cell.CellStyle = yourStyle;
                    //                    cell.SetCellValue(Convert.ToString(glboalrework[0]["Numerator"]) + "/" + Convert.ToString(glboalrework[0]["Denomerator"]));
                    //                    c = c + 1;
                    //                    cell = row.CreateCell(c);
                    //                    cell.CellStyle = yourStyle;
                    //                    cell.SetCellValue(Convert.ToString(glboalrework[0]["ReworkDate"]));
                    //                    c = c + 1;
                    //                    cell = row.CreateCell(c);
                    //                    cell.CellStyle = yourStyle;
                    //                }

                    //                else if (columnName == "Reexam1" && columnName != "LineId" && columnName != "Rework")
                    //                {

                    //                    if (glboalrework.Count > 1)
                    //                    {

                    //                        if (Convert.ToString(glboalrework[1]["ReExaminationGateId"]) == "2")
                    //                        {
                    //                            if (Convert.ToString(glboalrework[1]["Denomerator"]) != "0" && Convert.ToString(glboalrework[1]["Numerator"]) == Convert.ToString(glboalrework[1]["Denomerator"]) && Convert.ToString(glboalrework[1]["Rework"]) == "0")
                    //                            {

                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("OK");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                            }

                    //                            else if (Convert.ToString(glboalrework[1]["Rework"]) != "0")
                    //                            {


                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("NOT OK");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue(Convert.ToString(glboalrework[1]["Rework"]));
                    //                            }
                    //                            else
                    //                            {
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                            }
                    //                        }

                    //                    }
                    //                    else
                    //                    {

                    //                        if (Convert.ToString(glboalrework[0]["ReExaminationGateId"]) == "2")
                    //                        {
                    //                            if (Convert.ToString(glboalrework[0]["Denomerator"]) != "0" && Convert.ToString(glboalrework[0]["Numerator"]) == Convert.ToString(glboalrework[0]["Denomerator"]) && Convert.ToString(glboalrework[0]["Rework"]) == "0")
                    //                            {

                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("OK");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;

                    //                            }

                    //                            else if (Convert.ToString(glboalrework[0]["Rework"]) != "0")
                    //                            {

                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue("NOT OK");
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                                cell.SetCellValue(Convert.ToString(glboalrework[1]["Rework"]));
                    //                            }
                    //                            else
                    //                            {
                    //                                c = c + 1;
                    //                                cell = row.CreateCell(c);
                    //                                cell.CellStyle = yourStyle;
                    //                            }
                    //                        }
                    //                    }








                    //                }


                    //                else { }
                    //            }
                    //        }

                    //    }
                    //}





                }

                using (var exportData = new MemoryStream())
                {
                    Response.Clear();
                    workbook.Write(exportData);
                    string Filename = "ProgressMonitor" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx";

                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", Filename));
                    Response.BinaryWrite(exportData.ToArray());


                    Response.End();


                }
            }
            catch (Exception ex)
            {
                ErrorLog.Log("Excel - VINHistoryDownloadExcel " + ex.Message);


            }

        }

        [SessionExpire]
        [Obsolete]
        public ActionResult HistoryVinAsZip(int PlantId, string VinFrom, string VinTo, string FromDate, string ToDate)
        {

            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];

            string VinNum = "";
            string Todate = "";

            #region Add new Action result
            WebServices webService = new WebServices();
            ProgressMonitorVINHistory result = new ProgressMonitorVINHistory();
            string ToVin = "";
            if (VinTo == "" || VinTo == null)
            {
                VinTo = VinFrom;
            }


            if (ToDate == "" || ToDate == null)
            {
                ToDate = FromDate;
            }
            result = webService.VINHistoryDownloadExcelHistory(PlantId, VinFrom, VinTo, FromDate, ToDate, Users.Token);
            try
            {

                ExcelPackage excel = new ExcelPackage();
                Dictionary<string, byte[]> reports = new Dictionary<string, byte[]>();


                var BindUniqueLine = (from item in result.HistoryVINDetails
                                      select item.ModelName).Distinct();

                var BindUniqueModel = (from item in result.HistoryVINDetails
                                      select item.ModelName).Distinct();

                //Create the worksheet  


                List<ProgressMonitorHistoryVINDetails> listDatas = new List<ProgressMonitorHistoryVINDetails>();
                List<ReworkandReExammaxcount> ListReworkandReExamCount = new List<ReworkandReExammaxcount>();
                List<ProgressMonitorHistoryVINDetailsForComments> listDataComments = new List<ProgressMonitorHistoryVINDetailsForComments>();


                foreach (var Vins in BindUniqueLine)
                {

                    IWorkbook workbook;
                    workbook = new XSSFWorkbook();

                    var filtergate = (from Vin in result.HistoryVINDetails
                                      where Vin.ModelName == Vins.ToString()
                                      select Vin).ToList();


                    var HistoryGateDetails = (from Gate in result.HistoryGateDetails
                                              where Gate.ModelName == Vins.ToString()
                                              select Gate).ToList();

                    var filterComments = (from Vin in result.ListOfComments
                                      where Vin.ModelName == Vins.ToString()
                                      select Vin).ToList();

                    var Filter = (from Vin in result.ListOfComments
                                          where Vin.VinNumber == ""
                                          select Vin).ToList();

                    var Filter1 = (from Vin in result.HistoryVINDetails
                                   where Vin.VinNumber == ""
                                   select Vin).ToList();


                    if (HistoryGateDetails.Count > 0)
                    {


                        for (int i = 0; i < HistoryGateDetails.Count; i++)
                        {
                            listDataComments = Filter;
                            listDatas = Filter1;
                            if (Convert.ToString(HistoryGateDetails[i].GateId) == "-5")
                            {
                                listDataComments = filterComments;
                            }
                            else
                            {
                                listDatas = (from item in filtergate
                                             where item.GateId == HistoryGateDetails[i].GateId
                                             //&& item.VIN == result.ModifiedDateDetailsList[i].VIN && item.Varaint == result.ModifiedDateDetailsList[i].Varaint
                                             select item).ToList();
                            }

                           


                            string VinNums = Convert.ToString(HistoryGateDetails[i].ModelName);
                            ListtoDataTable lsttodt = new ListtoDataTable();
                            string VINName = string.Empty;
                            if (listDatas.Count > 0 || listDataComments.Count > 0 )
                            {
                                //convert list to datatable
                              

                                DataTable dt;
                                if (Convert.ToString(HistoryGateDetails[i].GateId) == "-5")
                                {
                                    dt = lsttodt.ToDataTable(listDataComments);
                                }
                                else
                                {
                                    dt = lsttodt.ToDataTable(listDatas);
                                }

                                dt.Columns.Remove("GateId");
                                dt.Columns.Remove("CreatedBy");
                                dt.Columns.Remove("VinId");
                                dt.Columns.Remove("CreatedDate");
                                dt.Columns.Remove("CreatedTime");
                                dt.Columns.Remove("ReworkModifiedDate");
                                dt.Columns.Remove("ReworkModifiedTime");
                                dt.Columns.Remove("ReworkExaminationDate");
                                dt.Columns.Remove("ReworkExaminationTime");
                                dt.Columns.Remove("ActualID");
                                dt.Columns.Remove("VinNumber");
                                dt.Columns.Remove("IsCompleted");
                                dt.Columns.Remove("ReExamOkCount");
                                dt.Columns.Remove("ActualValue");
                                dt.Columns.Remove("Responsible");
                                dt.Columns.Remove("DamageCode");
                                dt.Columns.Remove("Comments");
                                dt.Columns.Remove("Attachment");
                                dt.Columns.Remove("QFLFeedbackWorkflowId");
                                dt.Columns.Remove("ModelName");
                                if (((Convert.ToString(HistoryGateDetails[i].GateName) != "Rework") && (Convert.ToString(HistoryGateDetails[i].GateName)) != "ReExamination")
                                    && (Convert.ToString(HistoryGateDetails[i].GateName)) != "Seal" && (Convert.ToString(HistoryGateDetails[i].GateName)) != "ReExamination1")
                                {
                                    dt.Columns.Remove("ReworkModifiedBy");
                                    dt.Columns.Remove("ReworkModifiedDateTime");
                                    dt.Columns.Remove("ReworkExaminationBy");
                                    dt.Columns.Remove("ReworkExaminationDateTime");
                                    dt.Columns.Remove("ReworkModifiedBys");
                                    dt.Columns.Remove("ReExaminationModifiedBy");
                                    
                                }
                                //Periyan
                                //ISheet sheet1 = workbook.CreateSheet(Convert.ToString(HistoryGateDetails[i].GateName));

                                ISheet sheet1;
                                if (Convert.ToString(HistoryGateDetails[i].GateName) == "ReExamination")
                                {
                                    sheet1 = workbook.CreateSheet("QG Re-Examination");
                                }
                                else if (Convert.ToString(HistoryGateDetails[i].GateName) == "ReExamination1")
                                {
                                    sheet1 = workbook.CreateSheet("完成 Re-Examination");
                                }
                                else
                                {
                                    sheet1 = workbook.CreateSheet(Convert.ToString(HistoryGateDetails[i].GateName));
                                }


                                //ISheet sheet1 = workbook.CreateSheet(Convert.ToString(HistoryGateDetails[i].GateName) + "-" + Convert.ToString(HistoryGateDetails[i].VINName));

                                //make a header row  
                                IRow row0 = sheet1.CreateRow(0);
                                var cra = new NPOI.SS.Util.CellRangeAddress(0, 0, 0, 7);
                                // sheet1.AddMergedRegion(cra);
                                // sheet1.AddMergedRegion
                                ICell cell0 = row0.CreateCell(0);
                                cell0.SetCellValue("VIN : " + Convert.ToString(HistoryGateDetails[i].ModelName) + "   Vehicle Type: " + Convert.ToString(HistoryGateDetails[i].VariantName));

                                IRow row1 = sheet1.CreateRow(1);

                                var font = workbook.CreateFont();
                                font.FontHeightInPoints = (short)12;
                                font.FontName = "Calibri";

                                font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                                NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                                NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                                NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                                //make a header row  
                                XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                                yourStyle.WrapText = true;
                                yourStyle.Alignment = HorizontalAlignment.Center;
                                yourStyle.VerticalAlignment = VerticalAlignment.Center;
                                yourStyle.BorderBottom = BorderStyle.Medium;
                                yourStyle.BorderRight = BorderStyle.Medium;
                                yourStyle.BorderTop = BorderStyle.Medium;
                                yourStyle.BorderLeft = BorderStyle.Medium;

                                XSSFCellStyle yourStyleRow = (XSSFCellStyle)workbook.CreateCellStyle();
                                yourStyleRow.WrapText = true;
                                cell0.CellStyle = yourStyle;
                                // dt.Columns[4].ColumnName = "Created Time";
                                dt.Columns[3].ColumnName = "Status";
                                if (((Convert.ToString(HistoryGateDetails[i].GateName) != "Rework") && (Convert.ToString(HistoryGateDetails[i].GateName)) != "ReExamination")
                                    && (Convert.ToString(HistoryGateDetails[i].GateName)) != "Seal" && (Convert.ToString(HistoryGateDetails[i].GateName)) != "ReExamination1"
                                    && (Convert.ToString(HistoryGateDetails[i].GateName)) != "Comments")
                                {

                                    dt.Columns["PartName"].SetOrdinal(0);
                                    dt.Columns["CheckItem"].SetOrdinal(1);
                                    dt.Columns["Specification"].SetOrdinal(2);
                                    dt.Columns["UserName"].SetOrdinal(3);
                                    dt.Columns["GateName"].SetOrdinal(4);
                                    dt.Columns["CreatedDateTime"].SetOrdinal(5);
                                    dt.Columns["Status"].SetOrdinal(6);
                                    dt.Columns["Okcount"].SetOrdinal(7);
                                    dt.Columns["NotOkcount"].SetOrdinal(8);
                                    dt.Columns["Skipcount"].SetOrdinal(9);



                                    dt.Columns.Remove("Sno");
                                    dt.Columns.Remove("CompletedName");
                                    dt.Columns.Remove("CompletedDate");
                                    dt.Columns.Remove("CompletedBY");
                                   // dt.Columns.Remove("Filename");
                                    dt.Columns.Remove("ModifiedBy");
                                    dt.Columns.Remove("SignatureId");
                                    dt.Columns.Remove("Standard");
                                    dt.Columns.Remove("DefectPlace");
                                    dt.Columns.Remove("DefectClass");

                                  
                                    dt.Columns.Remove("Okcount");
                                    dt.Columns.Remove("NotOkcount");
                                    dt.Columns.Remove("Skipcount");

                                     //Cycle 1
                                dt.Columns.Remove("ReworkModifiedBy1");
                                dt.Columns.Remove("ReworkModifiedDateTime1");
                                dt.Columns.Remove("Status1");
                                
                                //Cycle 2
                                dt.Columns.Remove("ReworkModifiedBy2");
                                dt.Columns.Remove("ReworkModifiedDateTime2");
                                dt.Columns.Remove("Status2");
                                
                                //Cycle 3
                                dt.Columns.Remove("ReworkModifiedBy3");
                                dt.Columns.Remove("ReworkModifiedDateTime3");
                                dt.Columns.Remove("Status3");
                                
                                //Cycle 4
                                dt.Columns.Remove("ReworkModifiedBy4");
                                dt.Columns.Remove("ReworkModifiedDateTime4");
                                dt.Columns.Remove("Status4");
                                
                                //Cycle 5
                                dt.Columns.Remove("ReworkModifiedBy5");
                                dt.Columns.Remove("ReworkModifiedDateTime5");
                                dt.Columns.Remove("Status5");

                                dt.Columns.Remove("ReExaminationModifiedBy1");
                                dt.Columns.Remove("ReworkExaminationDateTime1");

                                dt.Columns.Remove("ReExaminationModifiedBy2");
                                dt.Columns.Remove("ReworkExaminationDateTime2");

                                dt.Columns.Remove("ReExaminationModifiedBy3");
                                dt.Columns.Remove("ReworkExaminationDateTime3");

                                dt.Columns.Remove("ReExaminationModifiedBy4");
                                dt.Columns.Remove("ReworkExaminationDateTime4");

                                dt.Columns.Remove("ReExaminationModifiedBy5");
                                dt.Columns.Remove("ReworkExaminationDateTime5");



                                    dt.Columns[3].ColumnName = "Checked By";
                                    dt.Columns[5].ColumnName = "Checked On";
                                    //dt.Columns[7].ColumnName = "Ok Count";
                                    //dt.Columns[8].ColumnName = "Not Ok Count";
                                    //dt.Columns[9].ColumnName = "Skip Count";
                                }





                                if ((Convert.ToString(HistoryGateDetails[i].GateName) == "Rework"))
                                {


                                    dt.Columns["UserName"].SetOrdinal(0);
                                    dt.Columns["GateName"].SetOrdinal(1);
                                    dt.Columns["CreatedDateTime"].SetOrdinal(2);

                                    dt.Columns["PartName"].SetOrdinal(3);

                                    dt.Columns["Status"].SetOrdinal(4);
                                    dt.Columns["DefectPlace"].SetOrdinal(5);
                                    dt.Columns["DefectClass"].SetOrdinal(6);
                                    //dt.Columns["ReworkModifiedBys"].SetOrdinal(7);
                                    //dt.Columns["ReworkModifiedDateTime"].SetOrdinal(8);

                                    //pERIYAN

                                    // Cycle 1

                                    var ListCount = (from Vin in result.ReworkandReExammaxcountobj
                                                     where Vin.ModelName == Vins.ToString() &&
                                                     Vin.Gateid == "-1"
                                                     select Vin).ToList();

                                    int total = 0;
                                    if (ListCount.Count > 0)
                                    {
                                        if (ListCount.ElementAtOrDefault(0).ReworkCount == 0)
                                        {
                                            total = 0;
                                        }
                                        else
                                        {
                                            total = ListCount.ElementAtOrDefault(0).ReworkCount;
                                        }

                                    }


                                    int start = 7;
                                    if (total > 0)
                                    {
                                        for (int x = 1; x <= total; x++)
                                        {
                                            ICell cell9 = row0.CreateCell(start);
                                            cell9.SetCellValue(x + "Cycle");
                                            var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 2);
                                            sheet1.AddMergedRegion(cra9);
                                            cell9.CellStyle = yourStyle;

                                            dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                            dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                            dt.Columns["Status" + x].SetOrdinal(start + 2);
                                            start = start + 3;
                                        }

                                    }
                                    else
                                    {
                                        for (int x = 1; x <= 5; x++)
                                        {

                                            dt.Columns.Remove("ReworkModifiedBy" + x);
                                            dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                            dt.Columns.Remove("Status" + x);
                                        }
                                    }

                                    if (total >= 1)
                                    {
                                        for (int x = total + 1; x <= 5; x++)
                                        {

                                            dt.Columns.Remove("ReworkModifiedBy" + x);
                                            dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                            dt.Columns.Remove("Status" + x);
                                        }

                                    }




                                    dt.Columns["Okcount"].SetOrdinal(9);
                                    dt.Columns["NotOkcount"].SetOrdinal(10);
                                    dt.Columns["Skipcount"].SetOrdinal(11);

                                    dt.Columns.Remove("ReworkExaminationBy");
                                    dt.Columns.Remove("ReworkExaminationDateTime");
                                    dt.Columns.Remove("ReExaminationModifiedBy");
                                    dt.Columns.Remove("Sno");
                                    dt.Columns.Remove("CompletedName");
                                    dt.Columns.Remove("CompletedDate");
                                    dt.Columns.Remove("CompletedBY");
                                    //dt.Columns.Remove("Filename");
                                    dt.Columns.Remove("ModifiedBy");
                                    dt.Columns.Remove("SignatureId");
                                    dt.Columns.Remove("CheckItem");
                                    dt.Columns.Remove("Specification");
                                    dt.Columns.Remove("Standard");
                                    dt.Columns.Remove("ReworkModifiedBy");

                                    dt.Columns.Remove("Okcount");
                                    dt.Columns.Remove("NotOkcount");
                                    dt.Columns.Remove("Skipcount");

                                    dt.Columns.Remove("ReExaminationModifiedBy1");
                                    dt.Columns.Remove("ReworkExaminationDateTime1");

                                    dt.Columns.Remove("ReExaminationModifiedBy2");
                                    dt.Columns.Remove("ReworkExaminationDateTime2");

                                    dt.Columns.Remove("ReExaminationModifiedBy3");
                                    dt.Columns.Remove("ReworkExaminationDateTime3");

                                    dt.Columns.Remove("ReExaminationModifiedBy4");
                                    dt.Columns.Remove("ReworkExaminationDateTime4");

                                    dt.Columns.Remove("ReExaminationModifiedBy5");
                                    dt.Columns.Remove("ReworkExaminationDateTime5");

                                    dt.Columns.Remove("ReworkModifiedBys");
                                    dt.Columns.Remove("ReworkModifiedDateTime");


                                    dt.Columns[0].ColumnName = "Checked By";
                                    dt.Columns[2].ColumnName = "Checked On";
                                    dt.Columns[5].ColumnName = "Defect";
                                    //dt.Columns[6].ColumnName = "Rework Completed By";
                                    //dt.Columns[7].ColumnName = "Rework Completed On";



                                    start = 7;
                                    if (total > 0)
                                    {
                                        for (int x = 1; x <= total; x++)
                                        {
                                            dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                            dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                            start = start + 3;
                                        }

                                    }

                                }


                                else if ((Convert.ToString(HistoryGateDetails[i].GateName)) == "ReExamination")
                              {


                                  //dt.Columns["UserName"].SetOrdinal(0);
                                  dt.Columns["GateName"].SetOrdinal(0);
                                  //dt.Columns["CreatedDateTime"].SetOrdinal(2);
                                  //dt.Columns["Status"].SetOrdinal(1);
                                  dt.Columns["PartName"].SetOrdinal(1);
                                  dt.Columns["Status"].SetOrdinal(2);

                                  dt.Columns["DefectPlace"].SetOrdinal(3);
                                  dt.Columns["DefectClass"].SetOrdinal(4);


                                  var ListCount = (from Vin in result.ReworkandReExammaxcountobj
                                                   where Vin.ModelName == Vins.ToString() &&
                                                   Vin.Gateid == "-2"
                                                   select Vin).ToList();


                                  int total = 0;
                                  if (ListCount.Count > 0)
                                  {
                                      if (ListCount.ElementAtOrDefault(0).ReExaminationCount == 0)
                                      {
                                          total = 0;
                                      }
                                      else
                                      {
                                          total = ListCount.ElementAtOrDefault(0).ReExaminationCount;
                                      }

                                  }


                                  int start = 5;
                                  if (total > 0)
                                  {
                                      for (int x = 1; x <= total; x++)
                                      {
                                          ICell cell9 = row0.CreateCell(start);
                                          cell9.SetCellValue(x + "Cycle");
                                          var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 4);
                                          sheet1.AddMergedRegion(cra9);
                                          cell9.CellStyle = yourStyle;

                                          dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                          dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                          dt.Columns["ReExaminationModifiedBy" + x].SetOrdinal(start + 2);
                                          dt.Columns["ReworkExaminationDateTime" + x].SetOrdinal(start + 3);
                                          dt.Columns["Status" + x].SetOrdinal(start + 4);

                                          start = start + 5;
                                      }

                                  }
                                  else
                                  {
                                      for (int x = 1; x <= 5; x++)
                                      {

                                          dt.Columns.Remove("ReworkModifiedBy" + x);
                                          dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                          dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                          dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                          dt.Columns.Remove("Status" + x);
                                      }
                                  }

                                  if (total >= 1)
                                  {
                                      for (int x = total + 1; x <= 5; x++)
                                      {

                                          dt.Columns.Remove("ReworkModifiedBy" + x);
                                          dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                          dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                          dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                          dt.Columns.Remove("Status" + x);
                                      }

                                  }



                                  dt.Columns.Remove("Sno");
                                  dt.Columns.Remove("CompletedName");
                                  dt.Columns.Remove("CompletedDate");
                                  dt.Columns.Remove("CompletedBY");
                                  //dt.Columns.Remove("Filename");
                                  dt.Columns.Remove("ModifiedBy");
                                  dt.Columns.Remove("SignatureId");
                                  dt.Columns.Remove("CheckItem");
                                  dt.Columns.Remove("Specification");
                                  dt.Columns.Remove("Standard");
                                  dt.Columns.Remove("Okcount");
                                  dt.Columns.Remove("NotOkcount");
                                  dt.Columns.Remove("Skipcount");
                                  dt.Columns.Remove("ReworkModifiedBys");
                                  dt.Columns.Remove("ReworkExaminationBy");

                                  dt.Columns.Remove("UserName");
                                  dt.Columns.Remove("CreatedDateTime");


                                  dt.Columns.Remove("ReworkModifiedBy");
                                  dt.Columns.Remove("ReworkModifiedDateTime");

                                  dt.Columns.Remove("ReExaminationModifiedBy");
                                  dt.Columns.Remove("ReworkExaminationDateTime");

                                  dt.Columns[3].ColumnName = "Defect";


                                   start = 5;
                                  if (total > 0)
                                  {
                                      for (int x = 1; x <= total; x++)
                                      {
                                          dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                          dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                          dt.Columns[start + 2].ColumnName = "Re-Examination By" + x;
                                          dt.Columns[start + 3].ColumnName = "Re-Examination On" + x;
                                          start = start + 5;
                                      }

                                  }

                                


                              }





                                else if ((Convert.ToString(HistoryGateDetails[i].GateName)) == "ReExamination1")
                              {


                                  //dt.Columns["UserName"].SetOrdinal(0);
                                  dt.Columns["GateName"].SetOrdinal(0);
                                  //dt.Columns["CreatedDateTime"].SetOrdinal(2);
                                  //dt.Columns["Status"].SetOrdinal(1);
                                  dt.Columns["PartName"].SetOrdinal(1);
                                  dt.Columns["Status"].SetOrdinal(2);

                                  dt.Columns["DefectPlace"].SetOrdinal(3);
                                  dt.Columns["DefectClass"].SetOrdinal(4);


                                  var ListCount = (from Vin in result.ReworkandReExammaxcountobj
                                                   where Vin.ModelName == Vins.ToString() &&
                                                   Vin.Gateid == "-4"
                                                   select Vin).ToList();


                                  int total = 0;
                                  if (ListCount.Count > 0)
                                  {
                                      if (ListCount.ElementAtOrDefault(0).ReExaminationCount == 0)
                                      {
                                          total = 0;
                                      }
                                      else
                                      {
                                          total = ListCount.ElementAtOrDefault(0).ReExaminationCount;
                                      }

                                  }


                                  int start = 5;
                                  if (total > 0)
                                  {
                                      for (int x = 1; x <= total; x++)
                                      {
                                          ICell cell9 = row0.CreateCell(start);
                                          cell9.SetCellValue(x + "Cycle");
                                          var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 4);
                                          sheet1.AddMergedRegion(cra9);
                                          cell9.CellStyle = yourStyle;

                                          dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                          dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                          dt.Columns["ReExaminationModifiedBy" + x].SetOrdinal(start + 2);
                                          dt.Columns["ReworkExaminationDateTime" + x].SetOrdinal(start + 3);
                                          dt.Columns["Status" + x].SetOrdinal(start + 4);

                                          start = start + 5;
                                      }

                                  }
                                  else
                                  {
                                      for (int x = 1; x <= 5; x++)
                                      {

                                          dt.Columns.Remove("ReworkModifiedBy" + x);
                                          dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                          dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                          dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                          dt.Columns.Remove("Status" + x);
                                      }
                                  }

                                  if (total >= 1)
                                  {
                                      for (int x = total + 1; x <= 5; x++)
                                      {

                                          dt.Columns.Remove("ReworkModifiedBy" + x);
                                          dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                          dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                          dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                          dt.Columns.Remove("Status" + x);
                                      }

                                  }



                                  dt.Columns.Remove("Sno");
                                  dt.Columns.Remove("CompletedName");
                                  dt.Columns.Remove("CompletedDate");
                                  dt.Columns.Remove("CompletedBY");
                                  //dt.Columns.Remove("Filename");
                                  dt.Columns.Remove("ModifiedBy");
                                  dt.Columns.Remove("SignatureId");
                                  dt.Columns.Remove("CheckItem");
                                  dt.Columns.Remove("Specification");
                                  dt.Columns.Remove("Standard");
                                  dt.Columns.Remove("Okcount");
                                  dt.Columns.Remove("NotOkcount");
                                  dt.Columns.Remove("Skipcount");
                                  dt.Columns.Remove("ReworkModifiedBys");
                                  dt.Columns.Remove("ReworkExaminationBy");

                                  dt.Columns.Remove("UserName");
                                  dt.Columns.Remove("CreatedDateTime");


                                  dt.Columns.Remove("ReworkModifiedBy");
                                  dt.Columns.Remove("ReworkModifiedDateTime");

                                  dt.Columns.Remove("ReExaminationModifiedBy");
                                  dt.Columns.Remove("ReworkExaminationDateTime");

                                  dt.Columns[3].ColumnName = "Defect";


                                  start = 5;
                                  if (total > 0)
                                  {
                                      for (int x = 1; x <= total; x++)
                                      {
                                          dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                          dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                          dt.Columns[start + 2].ColumnName = "Re-Examination By" + x;
                                          dt.Columns[start + 3].ColumnName = "Re-Examination On" + x;
                                          start = start + 5;
                                      }

                                  }

                              }




                                else if ((Convert.ToString(HistoryGateDetails[i].GateName)) == "Comments")
                                {


                                    dt.Columns["GateName"].SetOrdinal(0);

                                    dt.Columns["PartName"].SetOrdinal(1);
                                    dt.Columns["Status"].SetOrdinal(2);

                                    dt.Columns["DefectPlace"].SetOrdinal(3);
                                    dt.Columns["DefectClass"].SetOrdinal(4);

                                    var ListCount = (from Vin in result.ReworkandReExammaxcountobj
                                                     where Vin.ModelName == Vins.ToString() &&
                                                     Vin.Gateid == "-1"
                                                     select Vin).ToList();



                                    int total = 0;
                                    if (ListCount.Count > 0)
                                    {
                                        if (ListCount.ElementAtOrDefault(0).ReworkCount == 0)
                                        {
                                            total = 0;
                                        }
                                        else
                                        {
                                            total = ListCount.ElementAtOrDefault(0).ReworkCount;
                                        }

                                    }

                                    int start = 5;
                                    if (total > 0)
                                    {
                                        for (int x = 1; x <= total; x++)
                                        {
                                            ICell cell9 = row0.CreateCell(start);
                                            cell9.SetCellValue(x + "Cycle");
                                            var cra9 = new NPOI.SS.Util.CellRangeAddress(0, 0, start, start + 6);
                                            sheet1.AddMergedRegion(cra9);
                                            cell9.CellStyle = yourStyle;

                                            dt.Columns["ReworkModifiedBy" + x].SetOrdinal(start);
                                            dt.Columns["ReworkModifiedDateTime" + x].SetOrdinal(start + 1);
                                            dt.Columns["ReworkComments" + x].SetOrdinal(start + 2);
                                            dt.Columns["ReExaminationModifiedBy" + x].SetOrdinal(start + 3);
                                            dt.Columns["ReworkExaminationDateTime" + x].SetOrdinal(start + 4);
                                            dt.Columns["ReExamiantionComments" + x].SetOrdinal(start + 5);
                                            dt.Columns["Status" + x].SetOrdinal(start + 6);
                                            start = start + 7;
                                        }

                                    }
                                    else
                                    {
                                        for (int x = 1; x <= 5; x++)
                                        {

                                            dt.Columns.Remove("ReworkModifiedBy" + x);
                                            dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                            dt.Columns.Remove("Status" + x);
                                            dt.Columns.Remove("ReworkComments" + x);
                                            dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                            dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                            dt.Columns.Remove("ReExamiantionComments" + x);
                                        }
                                    }

                                    if (total >= 1)
                                    {
                                        for (int x = total + 1; x <= 5; x++)
                                        {

                                            dt.Columns.Remove("ReworkModifiedBy" + x);
                                            dt.Columns.Remove("ReworkModifiedDateTime" + x);
                                            dt.Columns.Remove("Status" + x);
                                            dt.Columns.Remove("ReworkComments" + x);
                                            dt.Columns.Remove("ReExaminationModifiedBy" + x);
                                            dt.Columns.Remove("ReworkExaminationDateTime" + x);
                                            dt.Columns.Remove("ReExamiantionComments" + x);
                                        }

                                    }


                                    dt.Columns.Remove("Sno");
                                    dt.Columns.Remove("CompletedName");
                                    dt.Columns.Remove("CompletedDate");
                                    dt.Columns.Remove("CompletedBY");
                                    //dt.Columns.Remove("Filename");
                                    dt.Columns.Remove("ModifiedBy");
                                    dt.Columns.Remove("SignatureId");
                                    dt.Columns.Remove("CheckItem");
                                    dt.Columns.Remove("Specification");
                                    dt.Columns.Remove("Standard");
                                    dt.Columns.Remove("Okcount");
                                    dt.Columns.Remove("NotOkcount");
                                    dt.Columns.Remove("Skipcount");
                                    dt.Columns.Remove("UserName");
                                    dt.Columns.Remove("CreatedDateTime");

                                    dt.Columns[3].ColumnName = "Defect";



                                    start = 5;
                                    if (total > 0)
                                    {
                                        for (int x = 1; x <= total; x++)
                                        {
                                            dt.Columns[start].ColumnName = "Rework Completed By" + x;
                                            dt.Columns[start + 1].ColumnName = "Rework Completed On" + x;
                                            dt.Columns[start + 2].ColumnName = "Rework Comments" + x;
                                            dt.Columns[start + 3].ColumnName = "Re-Examination By" + x;
                                            dt.Columns[start + 4].ColumnName = "Re-Examination On" + x;
                                            dt.Columns[start + 5].ColumnName = "Re-Examination Comments" + x;
                                            start = start + 7;
                                        }

                                    }
                                }




                            

                               
                                else if ((Convert.ToString(HistoryGateDetails[i].GateName)) == "Seal")
                                {
                                    dt.Columns.Remove("UserName");
                                    dt.Columns.Remove("CreatedDateTime");
                                    dt.Columns.Remove("Status");
                                    dt.Columns.Remove("Okcount");
                                    dt.Columns.Remove("NotOkcount");
                                    dt.Columns.Remove("Skipcount");
                                    dt.Columns.Remove("CheckItem");
                                    dt.Columns.Remove("Standard");
                                    dt.Columns.Remove("Specification");
                                    dt.Columns.Remove("DefectPlace");
                                    dt.Columns.Remove("DefectClass");
                                    dt.Columns.Remove("PartName");
                                    //dt.Columns.Remove("ActualValue");
                                    //dt.Columns.Remove("Responsible");
                                    //dt.Columns.Remove("DamageCode");
                                    //dt.Columns.Remove("Comments");
                                    //dt.Columns.Remove("Attachment");
                                    dt.Columns.Remove("Sno");
                                    dt.Columns.Remove("ModifiedBy");
                                    //dt.Columns.Remove("SignatureId");
                                    dt.Columns.Remove("CompletedBY");
                                    dt.Columns.Remove("ReworkModifiedBy");
                                    //dt.Columns.Remove("ReworkModifiedDateTime");
                                    dt.Columns.Remove("ReworkModifiedDateTime");
                                    dt.Columns.Remove("ReworkExaminationBy");
                                    dt.Columns.Remove("ReworkExaminationDateTime");
                                    dt.Columns.Remove("ReExaminationModifiedBy");
                                    dt.Columns.Remove("ReworkModifiedBys");


                                    //Cycle 1
                                    dt.Columns.Remove("ReworkModifiedBy1");
                                    dt.Columns.Remove("ReworkModifiedDateTime1");
                                    dt.Columns.Remove("Status1");

                                    //Cycle 2
                                    dt.Columns.Remove("ReworkModifiedBy2");
                                    dt.Columns.Remove("ReworkModifiedDateTime2");
                                    dt.Columns.Remove("Status2");

                                    //Cycle 3
                                    dt.Columns.Remove("ReworkModifiedBy3");
                                    dt.Columns.Remove("ReworkModifiedDateTime3");
                                    dt.Columns.Remove("Status3");

                                    //Cycle 4
                                    dt.Columns.Remove("ReworkModifiedBy4");
                                    dt.Columns.Remove("ReworkModifiedDateTime4");
                                    dt.Columns.Remove("Status4");

                                    //Cycle 5
                                    dt.Columns.Remove("ReworkModifiedBy5");
                                    dt.Columns.Remove("ReworkModifiedDateTime5");
                                    dt.Columns.Remove("Status5");

                                    dt.Columns.Remove("ReExaminationModifiedBy1");
                                    dt.Columns.Remove("ReworkExaminationDateTime1");

                                    dt.Columns.Remove("ReExaminationModifiedBy2");
                                    dt.Columns.Remove("ReworkExaminationDateTime2");

                                    dt.Columns.Remove("ReExaminationModifiedBy3");
                                    dt.Columns.Remove("ReworkExaminationDateTime3");

                                    dt.Columns.Remove("ReExaminationModifiedBy4");
                                    dt.Columns.Remove("ReworkExaminationDateTime4");

                                    dt.Columns.Remove("ReExaminationModifiedBy5");
                                    dt.Columns.Remove("ReworkExaminationDateTime5");



                                    // dt.Columns[1].ColumnName = "Sno";
                                    dt.Columns[0].ColumnName = "Gate Name";
                                    dt.Columns[1].ColumnName = "Completed By";
                                    dt.Columns[2].ColumnName = "Completed Date";
                                    // dt.Columns[3].ColumnName = "Completed BY";
                                    dt.Columns[3].ColumnName = "Signature";

                                }


                                for (int l = 0; l < dt.Columns.Count-1; l++)
                                {
                                    sheet1.SetColumnWidth(l, 9000);
                                    ICell cell = row1.CreateCell(l);
                                    cell.CellStyle = workbook.CreateCellStyle();
                                    cell.CellStyle = yourStyle;
                                    cell.CellStyle.SetFont(font);
                                    cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                                    cell.CellStyle.FillPattern = FillPattern.NoFill;

                                    String columnName = dt.Columns[l].ToString();
                                    cell.SetCellValue(columnName);
                                }

                                for (int k = 0; k < dt.Rows.Count; k++)
                                {
                                    IRow row = sheet1.CreateRow(k + 2);

                                    //foreach (DataColumn column in dt.Columns)
                                    //{
                                    var findRework = "";
                                    bool check = false;

                                    for (int j = 0; j < dt.Columns.Count - 1; j++)
                                    {

                                        string value = string.Empty;

                                        if ((Convert.ToString(HistoryGateDetails[i].GateName)) == "Seal")
                                        {
                                            row.Height = 932;

                                        }
                                        ICell cell = row.CreateCell(j);
                                        cell.CellStyle = yourStyle;


                                        String columnName = dt.Columns[j].ToString();
                                        if (columnName == "GateName")
                                        {
                                            if (dt.Rows[k][columnName].ToString() == "Rework")
                                            {
                                                findRework = "Fine";
                                            }
                                            else
                                            {
                                                findRework = "";
                                            }
                                        }
                                        else
                                        {
                                            findRework = "";
                                        }

                                        if (check)
                                        {
                                            if ((dt.Rows[k][columnName].ToString()) == "Ok")
                                            {
                                                cell.SetCellValue("Completed");
                                            }
                                            else if (dt.Rows[k][columnName].ToString() == "Not Ok")
                                            {
                                                cell.SetCellValue("Not Completed");
                                            }
                                        }
                                        else
                                        {
                                            string sgn = dt.Rows[k][columnName].ToString();

                                            if (sgn.Length > 10)
                                            {
                                                value = sgn.Substring(0, 10);
                                            }

                                            if (value == "Signature_" && columnName == "Signature")
                                            {
                                                WebServices _web = new WebServices();
                                                string filepath = _web.GetSignaturePathPath() + dt.Rows[k][columnName].ToString();// + "\\" + filename;
                                                byte[] data = GetBytesFromFile(filepath);
                                                int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
                                                ICreationHelper helper = workbook.GetCreationHelper();
                                                IDrawing drawing = sheet1.CreateDrawingPatriarch();
                                                IClientAnchor anchor = helper.CreateClientAnchor();

                                                anchor.Dx1 = 0;
                                                anchor.Dy1 = 0;
                                                anchor.Dx2 = 5;
                                                anchor.Dy2 = 5;
                                                anchor.Col1 = 3;
                                                anchor.Row1 = k + j - 1;
                                                IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                                                picture.Resize(1, 1);

                                                dt.Rows[k][columnName] = "";
                                            }

                                            if (columnName == "Defect")

                                            {
                                                var Defect = dt.Rows[k][columnName].ToString();
                                                if (Defect == "")
                                                {


                                                    byte[] data = null;
                                                    WebServices _web = new WebServices();
                                                    //string filepath = _web.GetSignaturePathPath() + VIN + dt.Rows[k]["Filename"].ToString();// + "\\" + filename;

                                                    string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
                                                    string Filename = dt.Rows[k]["Filename"].ToString();

                                                    string fileNameWithPath = path + @"" + VinNums + @"\" + Filename;
                                                    data = GetBytesFromFile(fileNameWithPath);
                                                    int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
                                                    ICreationHelper helper = workbook.GetCreationHelper();
                                                    IDrawing drawing = sheet1.CreateDrawingPatriarch();
                                                    IClientAnchor anchor = helper.CreateClientAnchor();

                                                    //anchor.Dx1 = 0;
                                                    //anchor.Dy1 = 0;
                                                    //anchor.Dx2 = 5;
                                                    //anchor.Dy2 = 5;
                                                    anchor.Col1 = j;
                                                    anchor.Row1 = k + 2;

                                                    IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                                                    picture.Resize(1, 1);

                                                }
                                                else
                                                {
                                                    if (columnName != "Filename")
                                                    {
                                                        cell.SetCellValue(dt.Rows[k][columnName].ToString());
                                                    }


                                                }

                                            }
                                            else
                                            {
                                                cell.SetCellValue(dt.Rows[k][columnName].ToString());
                                            }
                                        }

                                        if (findRework == "Fine")
                                        {
                                            check = true;
                                        }
                                        else
                                        {
                                            check = false;
                                        }
                                        foreach (DataColumn column in dt.Columns)
                                        {
                                            //dt.Columns.Remove("Filename");
                                            if (columnName != "Filename" || columnName != "Signature")
                                            {
                                                sheet1.AutoSizeColumn(column.Ordinal);
                                            }



                                        }
                                        VinNum = Convert.ToString(HistoryGateDetails[i].ModelName);
                                    }

                                    //ICell cell = row.CreateCell(j);
                                    //cell.CellStyle = yourStyleRow;
                                    //String columnName = dt.Columns[j].ToString();
                                    //cell.SetCellValue(dt.Rows[k][columnName].ToString());

                                    //sheet1.AutoSizeColumn(column.Ordinal);

                                   
                                   
                                //}
                                }

                            }

                        }

                        using (var exportData = new MemoryStream())
                        {
                            //Response.Clear();

                            workbook.Write(exportData);
                            byte[] bytes = null;

                            bytes = exportData.ToArray();

                            reports.Add(Vins + "-HistroyDetails" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx", bytes);
                            //}



                        }


                    }




                }

                using (var memoryStream = new MemoryStream())
                {
                    using (var ziparchive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                    {
                        foreach (KeyValuePair<string, byte[]> item in reports)
                        {
                            AddToArchive(ziparchive, item.Key, item.Value);
                        }
                    }
                    return File(memoryStream.ToArray(), "application/zip", "HistoryVin_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".zip");
                }

            }

            catch (Exception ex)
            {
                ErrorLog.Log("HistoryVinAsZip Excel - VINHistoryDownloadExcel " + ex.Message);


            }
            #endregion 

            return null;

        }
        [SessionExpire]
        public ActionResult ChangePassword()
        {
            UserDetails users = (UserDetails)Session["UserDetails"];
            return Redirect(Convert.ToString(ConfigurationManager.AppSettings["Logout"]) + "Home/ChangePassword?Email=" + Convert.ToString(Session["EmailId"]) + "&Language=" + users.Language + "");
        }

        //public void Images()
        //{

        //    string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
        //    string filename = "Signature_05_05_2020_113204 (1).png";
        //    string excel = "Excel.xlsx";
        //    IWorkbook workbook = new XSSFWorkbook(new FileStream(path+excel, FileMode.Open));

        ////Get the first sheet
        //ISheet sheet = workbook.GetSheetAt(0);

        ////Add picture data to the workbook
        //byte[] bytes = System.IO.File.ReadAllBytes(path+filename);
        //workbook.AddPicture(bytes, PictureType.PNG);

        //    //Add a picture shape and set its position
        //    IDrawing drawing = sheet.CreateDrawingPatriarch();
        //IClientAnchor anchor = workbook.GetCreationHelper().CreateClientAnchor();
        //anchor.Dx1 = 0;
        //    anchor.Dy1 = 0;
        //    anchor.Col1 = 0;
        //    anchor.Row1 = 0;
        //    IPicture picture = drawing.CreatePicture(anchor, 0);

        ////Automatically adjust the image size
        //picture.Resize();
        //    string files = DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss") + "ExcelImage.xlsx";
        //    //Save the file
        //    FileStream file = System.IO.File.Create(path+ files);
        //workbook.Write(file);
        //    file.Close();

        //    //Launch
        //    System.Diagnostics.Process.Start(path+ files);
        //}

        [SessionExpire]
        public ActionResult UserAccess()
        {
            return View();
        }

        [SessionExpire]
        public void DowloadExcelForUserDetails(int plantid)
        {
            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];

            WebServices webService = new WebServices();



            GetUserAccessDetails result = new GetUserAccessDetails();
            result = webService.GetUserAccessDetails(plantid, Users.Token);


            //Create the worksheet



            try
            {
                WebServices _web = new WebServices();
                IWorkbook workbook;
                workbook = new XSSFWorkbook();

                List<GetUserAccessDetails> UserEmail = new List<GetUserAccessDetails>();
                List<GetUserAccessDetails> UserHeaders = new List<GetUserAccessDetails>();
                List<GetUserAccessDetails> UserDetails = new List<GetUserAccessDetails>();
                List<GetUserAccessDetails> LineList = new List<GetUserAccessDetails>();
                List<GetUserAccessDetails> UserList = new List<GetUserAccessDetails>();

                UserEmail = (from x in result.useremail select x).ToList();
                UserHeaders = (from x in result.userheaders select x).ToList();
                UserDetails = (from x in result.userdetaillist select x).ToList();
                LineList = (from x in result.Linelist select x).ToList();
                UserList = (from x in result.UserList select x).ToList();

                ListtoDataTable lsttodt = new ListtoDataTable();
                DataSet ds = new DataSet();

                if (UserEmail.Count > 0)
                {
                    //Create the worksheet
                    // ExcelWorksheet ws;
                    //IWorkbook workbook;
                    //workbook = new XSSFWorkbook();


                    //ds.Tables[0].Columns["VinNumber"].ColumnName = "VinNumber";
                    //ds.Tables[0].Columns["VehicleType"].ColumnName = "VehicleType";
                    //ds.Tables[0].Columns["ModelName"].ColumnName = "ModelName";
                    //ds.Tables[0].Columns["Inspection"].ColumnName = "Inspection";
                    //ds.Tables[0].Columns["Status"].ColumnName = "Status";


                    DataTable dtLine = new DataTable();

                    int progress = 0;
                    int QFL = 0;
                    int Masters = 0;
                    int Reports = 0;


                    var Header = (from item in UserHeaders
                                  where item.accesstype != "Page"
                                  select item).ToList();

                    int Headercount = Header.Count;
                    int EmailCount = UserEmail.Count;
                    DataTable dt = new DataTable();


                    dt.Columns.Add("EmailID");
                    dt.Columns.Add("Progress Monitor");
                    dt.Columns.Add("QFLFeedBack");
                    dt.Columns.Add("Masters");
                    dt.Columns.Add("Reports");


                    for (int i = 0; i < Headercount; i++)
                    {


                        dt.Columns.Add(Header[i].accessname);
                        //dt.Columns[i + 5].ColumnName = UserHeaders[i].accessname;
                    }

                    for (int i = 0; i < EmailCount; i++)
                    {
                        progress = 0;
                        QFL = 0;
                        Masters = 0;
                        Reports = 0;
                        DataRow dr = dt.NewRow();
                        dt.Rows.Add(dr);

                        dt.Rows[i]["EmailID"] = Convert.ToString(UserEmail[i].emailid);


                        var UserDetailList = (from item in UserDetails
                                              where item.userid == UserEmail[i].userid
                                              select item).ToList();

                        if (UserDetailList.Count > 0)
                        {

                            var UserLine = (from item in UserDetailList
                                            where item.userid == UserEmail[i].userid
                                            select item).ToList();

                            for (int j = 0; j < UserLine.Count; j++)
                            {
                                var UserAccess = (from item in UserDetailList
                                                  where item.accessname == UserLine[j].accessname
                                                  select item).ToList();

                                if (UserAccess.Count > 0)
                                {
                                    for (int a = 0; a < UserAccess.Count; a++)
                                    {
                                        if (UserAccess[a].accessname == "Progress Monitor")
                                        {
                                            progress = 1;
                                        }
                                        if (UserAccess[a].accessname == "QFL Feedback")
                                        {
                                            QFL = 1;
                                        }
                                        if (UserAccess[a].accessname == "Master Access")
                                        {
                                            Masters = 1;
                                        }
                                        if (UserAccess[a].accessname == "Report Access")
                                        {
                                            Reports = 1;
                                        }
                                    }


                                }

                            }

                            if (progress == 1)
                            {
                                dt.Rows[i]["Progress Monitor"] = "Yes";
                            }
                            else
                            {
                                dt.Rows[i]["Progress Monitor"] = "No";
                            }



                            if (QFL == 1)
                            {
                                dt.Rows[i]["QFLFeedBack"] = "Yes";
                            }
                            else
                            {
                                dt.Rows[i]["QFLFeedBack"] = "No";
                            }


                            if (Masters == 1)
                            {
                                dt.Rows[i]["Masters"] = "Yes";
                            }
                            else
                            {
                                dt.Rows[i]["Masters"] = "No";
                            }

                            if (Reports == 1)
                            {
                                dt.Rows[i]["Reports"] = "Yes";
                            }
                            else
                            {
                                dt.Rows[i]["Reports"] = "No";
                            }


                            for (int M = 0; M < Headercount; M++)
                            {

                                dt.Rows[i][Header[M].accessname] = "No";

                                //dt.Columns[i + 5].ColumnName = UserHeaders[i].accessname;
                            }

                            var User = (from item in UserDetails
                                        where item.userid == UserEmail[i].userid
                                        select item).ToList();

                            for (int M = 0; M < Headercount; M++)
                            {
                                for (int j = 0; j < User.Count; j++)
                                {
                                    if (User[j].accessname == Header[M].accessname)
                                    {
                                        dt.Rows[i][Header[M].accessname] = "Yes";
                                    }
                                }


                                //dt.Columns[i + 5].ColumnName = UserHeaders[i].accessname;
                            }



                        }

                        else
                        {
                            if (UserEmail[i].Roleid == 6)
                            {
                                dt.Rows[i]["Progress Monitor"] = "";
                                dt.Rows[i]["QFLFeedBack"] = "";
                                dt.Rows[i]["Masters"] = "";
                                dt.Rows[i]["Reports"] = "";


                            }
                            else
                            {
                                dt.Rows[i]["Progress Monitor"] = "Yes";
                                dt.Rows[i]["QFLFeedBack"] = "Yes";
                                dt.Rows[i]["Masters"] = "Yes";
                                dt.Rows[i]["Reports"] = "Yes";

                            }
                           

                            for (int M = 0; M < Headercount; M++)
                            {
                                if (UserEmail[i].Roleid == 6)
                                {
                                    dt.Rows[i][Header[M].accessname] = "";
                                }
                                else
                                {
                                    dt.Rows[i][Header[M].accessname] = "Yes";
                                }
                               

                                //dt.Columns[i + 5].ColumnName = UserHeaders[i].accessname;
                            }


                        }

                    }


                    ISheet sheet1 = workbook.CreateSheet(Convert.ToString("Sheet1"));







                    //header bold


                    var font = workbook.CreateFont();
                    font.FontHeightInPoints = (short)12;
                    font.FontName = "Calibri";

                    font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                    NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                    NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                    NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                    //make a header row  
                    IRow row1 = sheet1.CreateRow(0);

                    XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                    yourStyle.WrapText = true;
                    yourStyle.Alignment = HorizontalAlignment.Center;
                    yourStyle.VerticalAlignment = VerticalAlignment.Center;
                    yourStyle.BorderBottom = BorderStyle.Medium;
                    yourStyle.BorderRight = BorderStyle.Medium;
                    yourStyle.BorderTop = BorderStyle.Medium;
                    yourStyle.BorderLeft = BorderStyle.Medium;

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        sheet1.SetColumnWidth(j, 5000);
                        ICell cell = row1.CreateCell(j);
                        cell.CellStyle = workbook.CreateCellStyle();
                        cell.CellStyle = yourStyle;
                        cell.CellStyle.SetFont(font);
                        cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                        cell.CellStyle.FillPattern = FillPattern.NoFill;

                        String columnName = dt.Columns[j].ToString();
                        cell.SetCellValue(columnName);
                    }

                    //loops through data  
                    for (int m = 0; m < dt.Rows.Count; m++)
                    {
                        IRow row = sheet1.CreateRow(m + 1);
                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            ICell cell = row.CreateCell(j);
                            cell.CellStyle = yourStyle;
                            String columnName = dt.Columns[j].ToString();
                            cell.SetCellValue(dt.Rows[m][columnName].ToString());

                        }
                    }

                }

                using (var exportData = new MemoryStream())
                {
                    Response.Clear();
                    workbook.Write(exportData);

                    Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", "UserDetails" + "_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx"));
                    Response.BinaryWrite(exportData.ToArray());
                    Response.End();
                }
            }



            catch (Exception ex)
            {
                ErrorLog.Log("Progressmonitor Excel" + ex.Message);
            }

        }



        [SessionExpire]
        public ActionResult NewProgress()
        {
            return View();
        }





        [SessionExpire]
        [HttpPost]
        public ActionResult NotOkUploadImage(FormCollection formCollection)
        {
            string fileName;
            string Filename;
            string FullPath = ConfigurationManager.AppSettings["SignatureSitePath"].ToString();
            WebServices _web = new WebServices();
            try
            {

                HttpFileCollectionBase file = Request.Files;
                // fileName = Convert.ToString(formCollection["filename"]);
                 string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();
                string Vinnumber = Convert.ToString(formCollection["Vinnumber"]);  
                string ModelName = Convert.ToString(formCollection["ModelName"]);  
                int VinId = Convert.ToInt32(formCollection["VinId"]);  
                int Gateid = Convert.ToInt32(formCollection["GateId"]);  
              
                string vaild = Convert.ToString(formCollection["filedata"]);
                 Filename = DateTime.Now.ToString().Replace("/", "_").Replace(" ", "_").Replace(":", "") + ".png";
                Filename = "UploadNotOkImg_" + Vinnumber +'_'+ ModelName + '_' + VinId + "_" + Gateid + "_" + Filename.Replace("-", "_");

                string fileNameWithPath = path + @"" + Vinnumber  + @"\" + Filename;
                path = path + @"" + Vinnumber ;

                FullPath = fileNameWithPath;
             
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path);

                }

                using (FileStream fs = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {
                        byte[] data = Convert.FromBase64String(Convert.ToString(formCollection["filedata"]).Split(',')[1]);

                        bw.Write(data);
                      
                        bw.Close();
                    }

                }

            }
                catch (Exception ex)
                {
                    ErrorLog.Log("NotOkUploadImage: " + ex.Message);
                    return Json("error", JsonRequestBehavior.AllowGet);

                }

            return Json(Filename, JsonRequestBehavior.AllowGet);
        }


        [SessionExpire]
        public ActionResult EmailNotificationMaster()
        {
            return View();
        }


        [SessionExpire]
        public ActionResult PaintingMaster()
        {
            return View();
        }


        [SessionExpire]
        public JsonResult SignatureSaveBusImage(string imagedata, string Vinnumber, int VinId, int Gateid,string ModelName)
        {
            WebServices Service = new WebServices();
            UserDetails Signature = new UserDetails();
            string path = ConfigurationManager.AppSettings["PaintingImage"].ToString();
            string Filename = DateTime.Now.ToString().Replace("/", "_").Replace(" ", "_").Replace(":", "") + ".png";
            Filename = "PaintingImage_" + Vinnumber + '_' + VinId + "_" + Gateid + "_" + Filename.Replace("-", "_");
           // string fileNameWithPath = path + Filename;

            string fileNameWithPath = path + @"" + Vinnumber + @"\" + ModelName + @"\" + Filename;

            string postedFile = path + @"" + Vinnumber + @"\" + ModelName;

            if (!System.IO.Directory.Exists(postedFile))
            {
                System.IO.Directory.CreateDirectory(postedFile);

            }
            try
            {
                using (FileStream fs = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {

                        byte[] data = Convert.FromBase64String(imagedata);

                        bw.Write(data);

                        bw.Close();
                    }

                }
                //string token = GenerateToken(Convert.ToString(ConfigurationManager.AppSettings["TokenUser"]), Convert.ToString(ConfigurationManager.AppSettings["TokenPass"]));
                //Signature = Service.AddSignature(fileNameWitPath, token);

            }
            catch (Exception ex)
            {
                ErrorLog.Log("SignatureSaveBusImage " + ex.Message);
                return Json("Error", JsonRequestBehavior.AllowGet);

            }
            return Json(Filename, JsonRequestBehavior.AllowGet);

        }



        public ActionResult UploadPdfFileForPaint(FormCollection formCollection)
        {
            WebServices _web = new WebServices();
            string PostedFile = "";
            string PostedFilepng = "";

            try
            {


                HttpFileCollectionBase file = Request.Files;

                var fileName = Path.GetFileName(file[0].FileName);
                fileName = fileName.Substring(0, fileName.Length - 5) + "-" + Guid.NewGuid().ToString().Substring(0, 8)
                    + fileName.Substring(fileName.Length - 5, 5);

                CheckListMaster checkListMaster = new CheckListMaster()
                {
                    vehicletypeid = Convert.ToInt32(formCollection["vehicletypeid"]),
                    qgateid = Convert.ToInt32(formCollection["qgateid"]),
                    isactive = 1,
                    createdby = Convert.ToInt32(formCollection["createdby"]),
                    plantcode = Convert.ToInt32(formCollection["plantcode"]),
                    Linename = Convert.ToString(formCollection["LineName"]),
                    filename = fileName.Replace("pdf","png")
                };



                //var fileName = Convert.ToString(formCollection["filename"]);
                string path = _web.GetUploadPathForPaint() + "PaintUploadedImage\\" + checkListMaster.Linename + "\\";
                string vaild = Convert.ToString(formCollection["filedata"]);
                string imagedata = Convert.ToString(formCollection["imagedata"]);


                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path);
                    string existfilename = System.IO.Path.Combine(path, fileName);
                    PostedFile = existfilename;

                    using (var File = new FileStream(existfilename, FileMode.Create))
                    {
                        byte[] bytes = Convert.FromBase64String(Convert.ToString(formCollection["filedata"]).Split(',')[1]);
                        File.Write(bytes, 0, bytes.Length);
                        File.Flush();

                    }



                }

               
                else if (vaild != "")
                {
                    string existfilename = System.IO.Path.Combine(path, fileName);
                    PostedFile = existfilename;
                    var isvaild = Convert.ToString(formCollection["filedata"]).Split(',')[1];
                    byte[] bytes = Convert.FromBase64String(isvaild);
                    using (var File = new FileStream(existfilename, FileMode.Create))
                    {
                        File.Write(bytes, 0, bytes.Length);
                        File.Flush();

                    }


                }


                using (FileStream fs = new FileStream(PostedFile.Replace("pdf","png"), FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {

                        byte[] data = Convert.FromBase64String(imagedata);

                        bw.Write(data);

                        bw.Close();
                    }

                }




                //using (var document = PdfDocument.Load(_web.GetUploadPathForPaint() + "PaintUploadedImage\\" + checkListMaster.Linename + "\\" + fileName))
                //{
                //    var pageCount = document.PageCount;

                //    for (int i = 0; i < pageCount; i++)
                //    {
                //        var dpi = 300;

                //        using (var image = document.Render(i, dpi, dpi, PdfRenderFlags.CorrectFromDpi))
                //        {
                //            var encoder = ImageCodecInfo.GetImageEncoders()
                //                .First(c => c.FormatID == ImageFormat.Png.Guid);
                //            var encParams = new EncoderParameters(1);
                //            encParams.Param[0] = new EncoderParameter(
                //                System.Drawing.Imaging.Encoder.Quality, 100L);

                //            image.Save(_web.GetUploadPathForPaint() + "PaintUploadedImage\\" + checkListMaster.Linename + "\\" + fileName.Replace("pdf","png"), encoder, encParams);
                //        }
                //    }
                //}


                PostedFilepng = PostedFile.Replace("pdf", "png");
                string result = string.Empty;


                result = _web.AddUpdateCheckListMasterForPainting(checkListMaster, Convert.ToString(formCollection["token"]));
                result = result.Replace("\"", "");
                // Delete the uploaded file if insert into DB failed
                if (result.Equals("error"))
                {
                    if (System.IO.File.Exists(PostedFile))
                        System.IO.File.Delete(PostedFile);
                        System.IO.File.Delete(PostedFilepng);
                }

                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)

            {
                ErrorLog.Log("Upload file for Painting: " + ex.Message);
                return Json("error", JsonRequestBehavior.AllowGet);

            }
        }



        public FileResult DownloadchecklistFileForPainting(string checklistfilename,string Linename)
        {
            WebServices _web = new WebServices();
            //string checklistfilenames = Session["checklistfilename"].ToString();
            string filepath = Convert.ToString(ConfigurationManager.AppSettings["PaintingImage"]) + "PaintUploadedImage"+@"\" + Linename + @"\"+ checklistfilename;
            byte[] pdfByte = GetBytesFromFile(filepath);
            //return File(pdfByte, "application/xlsx", checklistfilename);

            Response.Clear();

            string attachment = String.Format("attachment; filename={0}", Server.UrlPathEncode(checklistfilename));
            Response.AddHeader("Content-Disposition", attachment);

            Response.ContentType = ".pdf";
            Response.Charset = "utf-8";
            Response.HeaderEncoding = UnicodeEncoding.UTF8;
            Response.ContentEncoding = UnicodeEncoding.UTF8;
            Response.BinaryWrite(pdfByte);
            Response.End();
            return null;
        }

        [SessionExpire]
        public ActionResult ProgressMonitorAll()
        {
            return View();
        }


        [SessionExpire]
        [Obsolete]




        public void DownloadExcelProgressAll(int PlantId, string VinFrom, string VinTo, string FromDate, string ToDate)
        {
            UserDetails Users = new UserDetails();
            Users = (UserDetails)Session["UserDetails"];

            DataSet ds = new DataSet();

            try
            {
                WebServices _web = new WebServices();
                IWorkbook workbook;
                workbook = new XSSFWorkbook();
                string ToVin = "";
                string Todate = "";
                if (ToDate == "" || ToDate == null)
                {
                    ToDate = FromDate;
                }
                if (VinTo == "" || VinTo == null)
                {
                    VinTo = VinFrom;
                }



                ds = _web.DownloadExcelProgressAll(PlantId, VinFrom, VinTo, FromDate, ToDate, Users.Token);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    //Create the worksheet
                    // ExcelWorksheet ws;
                    //IWorkbook workbook;
                    //workbook = new XSSFWorkbook();


                    //ds.Tables[0].Columns["VinNumber"].ColumnName = "VinNumber";
                    //ds.Tables[0].Columns["VehicleType"].ColumnName = "VehicleType";
                    //ds.Tables[0].Columns["ModelName"].ColumnName = "ModelName";
                    //ds.Tables[0].Columns["Inspection"].ColumnName = "Inspection";
                    //ds.Tables[0].Columns["Status"].ColumnName = "Status";


                    DataTable dtLine = new DataTable();



                    var BindUniqueLine = (from DataRow dRow in ds.Tables[1].Rows
                                          select dRow["LineName"]).Distinct();


                    DataTable DtBind = new DataTable();
                    DataTable DtBind1 = new DataTable();
                    foreach (var name in BindUniqueLine)
                    {

                        var filtergate = from Line in ds.Tables[1].AsEnumerable()
                                         where Line.Field<string>("LineName") == name.ToString()
                                         select new
                                         {
                                             LineName = Line.Field<Int64>("Sno")

                                         };

                        string LineName = Convert.ToString(name);
                        string expression = "LineId= '" + filtergate.ElementAt(0).LineName.ToString() + "'";


                        DataView dataView = ds.Tables[0].DefaultView;
                        //DataView dataView1 = ds.Tables[2].DefaultView;
                        if (!string.IsNullOrEmpty(LineName))
                        {
                            dataView.RowFilter = expression;
                            DtBind = dataView.ToTable();

                            //dataView1.RowFilter = expression;
                            //DtBind1 = dataView1.ToTable();
                            //DtBind.Columns["VariantId "].ColumnName = "VariantId";
                        }


                        var DynmaicColumnList = from DyColumns in ds.Tables[3].AsEnumerable()

                                                select new
                                                {
                                                    DynamicColumnName = DyColumns.Field<string>("DynamicColumnName"),
                                                    NewProgressColumnId = DyColumns.Field<Int64>("NewProgressColumnId"),


                                                };




                        DataTable dt = new DataTable();
                        dt.Columns.Add("VIN");
                        dt.Columns.Add("VehicleType");
                        dt.Columns.Add("Model");
                        dt.Columns.Add("GateName");
                        dt.Columns.Add("Part Name");
                        dt.Columns.Add("Defect");
                        dt.Columns.Add("Status");
                        dt.Columns.Add("CompletedDate");
                        if (DynmaicColumnList.Count() > 0)
                        {
                            for (int i = 0; i < DynmaicColumnList.Count(); i++)
                            {
                                if (Convert.ToString(DynmaicColumnList.ElementAt(i).DynamicColumnName) != "")
                                {
                                    dt.Columns.Add(DynmaicColumnList.ElementAt(i).DynamicColumnName);
                                }

                            }
                        }






                        ISheet sheet1 = workbook.CreateSheet(Convert.ToString(LineName));
                        int k = 0;
                        int RowFrom = 1;
                        int Filtercount = 0;





                        //byte[] data = System.IO.File.ReadAllBytes("D:\\Auto QFL Phase II\\MFBMAutomatedQFL\\MFBMAutomatedQFL\\Signature\\Signature_05_05_2020_153946.png");
                        //int pictureIndex = workbook.AddPicture(data, PictureType.PNG);
                        //ICreationHelper helper = workbook.GetCreationHelper();
                        //IDrawing drawing = sheet1.CreateDrawingPatriarch();
                        //IClientAnchor anchor = helper.CreateClientAnchor();
                        //anchor.Col1 = 4;//0 index based column
                        //anchor.Row1 = 0;//0 index based row
                        //IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                        //picture.Resize();

                        for (int i = 0; i < DtBind.Rows.Count; i++)
                        {

                            int counts = 1;

                            var filtergates = from Line in ds.Tables[2].AsEnumerable()
                                              where Line.Field<string>("VinNumber") == Convert.ToString(DtBind.Rows[i][0].ToString())
                                              select new
                                              {
                                                  Defect = Line.Field<string>("Defect"),
                                                  Vin = Line.Field<string>("VinNumber"),
                                                  VehicleType = Line.Field<string>("VehicleType"),
                                                  Model = Line.Field<string>("ModelName"),
                                                  CheckListItemStatusId = Line.Field<Int64>("CheckListItemStatusId"),
                                                  StatusCount = Line.Field<Int64>("StatusCount"),
                                                  ReExaminationCount = Line.Field<Int64>("ReExaminationCount"),
                                                  InspectionItem = Line.Field<string>("inspectionitem"),
                                                  Site1Image = Line.Field<string>("Site1Image"),
                                                  QFLFeedbackWorkflowId = Line.Field<Int64>("QFLFeedbackWorkflowId"),
                                                  VinId = Line.Field<Int64>("VinId"),
                                                  CompletedDate = Line.Field<string>("CompletedDate"),
                                                  GateName = Line.Field<string>("QgateName"),

                                              };
                            for (int j = 0; j < filtergates.Count(); j++)
                            {
                                Filtercount = filtergates.Count();
                                DataRow dr = dt.NewRow();
                                dt.Rows.Add(dr);


                                if (filtergates.ElementAt(j).Site1Image != "")
                                {

                                    int imgWidth = 50; // only initial if not known
                                    int imgHeight = 50;
                                    int LOGO_MARGIN = 2;
                                    byte[] data = null;
                                    WebServices _webs = new WebServices();
                                    string filepath = ConfigurationManager.AppSettings["SignaturePath"] + filtergates.ElementAt(j).Vin + @"\" + filtergates.ElementAt(j).Site1Image;
                                    ICreationHelper helper = workbook.GetCreationHelper();
                                    IDrawing drawing = sheet1.CreateDrawingPatriarch();
                                    IClientAnchor anchor = helper.CreateClientAnchor();

                                    data = GetBytesFromFile(filepath);
                                    int pictureIndex = workbook.AddPicture(data, PictureType.PNG);

                                    anchor.Col1 = 4;
                                    anchor.Row1 = j + 1;

                                    IPicture picture = drawing.CreatePicture(anchor, pictureIndex);
                                    picture.Resize(1);
                                    //picture.Resize(0.5 * imgWidth / XSSFShape.PIXEL_DPI, 5 * imgHeight / XSSFShape.PIXEL_DPI);




                                }


                                //if (counts == 1)
                                //{

                                    RowFrom = k + 1;


                                    //dt.Rows[k]["VIN"] = Convert.ToString(DtBind1.Rows[k][2].ToString());
                                    //dt.Rows[k]["VehicleType"] = Convert.ToString(DtBind1.Rows[k][4].ToString());
                                    //dt.Rows[k]["Model"] = Convert.ToString(DtBind1.Rows[k][3].ToString());
                                    //dt.Rows[k]["Defect"] = Convert.ToString(DtBind1.Rows[k][0].ToString());

                                    dt.Rows[k]["VIN"] = Convert.ToString(filtergates.ElementAt(j).Vin);
                                    dt.Rows[k]["VehicleType"] = Convert.ToString(filtergates.ElementAt(j).VehicleType);
                                    dt.Rows[k]["Model"] = Convert.ToString(filtergates.ElementAt(j).Model);
                                    dt.Rows[k]["GateName"] = Convert.ToString(filtergates.ElementAt(j).GateName);
                                    dt.Rows[k]["Part Name"] = Convert.ToString(filtergates.ElementAt(j).InspectionItem);

                                    dt.Rows[k]["Defect"] = Convert.ToString(filtergates.ElementAt(j).Defect);
                                    dt.Rows[k]["CompletedDate"] = Convert.ToString(filtergates.ElementAt(j).CompletedDate);


                                    if (filtergates.ElementAt(j).CheckListItemStatusId == 3 || filtergates.ElementAt(j).CheckListItemStatusId == 6)
                                    {
                                        dt.Rows[k]["Status"] = Convert.ToString("Rework");
                                    }
                                    else
                                    {
                                        dt.Rows[k]["Status"] = Convert.ToString("Re-Examination");
                                    }


                                    //var DynamicDetails ="";

                                    //var DynamicValueDetails = from DyColumns in ds.Tables[4].AsEnumerable()
                                    //                          where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                    //                          &&
                                    //                          DyColumns.Field<Int64>("VinId") == Convert.ToInt64(filtergates.ElementAt(j).VinId)
                                    //                          select new
                                    //                          {
                                    //                              DynamicColumnDetails = DyColumns.Field<string>("DynamicColumnDetails"),
                                    //                              NewProgressColumnId = DyColumns.Field<Int64>("NewProgressColumnId"),
                                    //                              QFLFeedBackworkflowId = DyColumns.Field<Int64>("QFLFeedBackworkflowId"),
                                    //                              VinId = DyColumns.Field<Int64>("VinId"),

                                    //                          };

                                    var DynamicList = (from DyColumns in ds.Tables[6].AsEnumerable()
                                                       where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                                       select DyColumns).ToList();



                                    DataTable dataTable = DynamicList.CopyToDataTable();
                                    if (DynmaicColumnList.Count() >= 1)
                                    {
                                        dt.Rows[k][8] = Convert.ToString(dataTable.Rows[0][1]);

                                    }
                                    if (DynmaicColumnList.Count() >= 2)
                                    {
                                        dt.Rows[k][9] = Convert.ToString(dataTable.Rows[0][2]);
                                    }
                                    if (DynmaicColumnList.Count() >= 3)
                                    {
                                        dt.Rows[k][10] = Convert.ToString(dataTable.Rows[0][3]);
                                    }
                                    if (DynmaicColumnList.Count() >= 4)
                                    {
                                        dt.Rows[k][11] = Convert.ToString(dataTable.Rows[0][4]);
                                    }
                                    if (DynmaicColumnList.Count() >= 5)
                                    {
                                        dt.Rows[k][12] = Convert.ToString(dataTable.Rows[0][5]);
                                    }
                                    if (DynmaicColumnList.Count() >= 6)
                                    {
                                        dt.Rows[k][13] = Convert.ToString(dataTable.Rows[0][6]);
                                    }
                                    if (DynmaicColumnList.Count() >= 7)
                                    {
                                        dt.Rows[k][14] = Convert.ToString(dataTable.Rows[0][7]);
                                    }
                                    if (DynmaicColumnList.Count() >= 8)
                                    {
                                        dt.Rows[k][15] = Convert.ToString(dataTable.Rows[0][8]);
                                    }
                                    if (DynmaicColumnList.Count() >= 9)
                                    {
                                        dt.Rows[k][16] = Convert.ToString(dataTable.Rows[0][9]);
                                    }
                                    if (DynmaicColumnList.Count() >= 10)
                                    {
                                        dt.Rows[k][17] = Convert.ToString(dataTable.Rows[0][10]);
                                    }
                                    if (DynmaicColumnList.Count() >= 11)
                                    {
                                        dt.Rows[k][18] = Convert.ToString(dataTable.Rows[0][11]);
                                    }
                                    if (DynmaicColumnList.Count() >= 12)
                                    {
                                        dt.Rows[k][19] = Convert.ToString(dataTable.Rows[0][12]);
                                    }
                                    if (DynmaicColumnList.Count() >= 13)
                                    {
                                        dt.Rows[k][20] = Convert.ToString(dataTable.Rows[0][13]);
                                    }
                                    if (DynmaicColumnList.Count() >= 14)
                                    {
                                        dt.Rows[k][21] = Convert.ToString(dataTable.Rows[0][14]);
                                    }
                                    if (DynmaicColumnList.Count() >= 15)
                                    {
                                        dt.Rows[k][22] = Convert.ToString(dataTable.Rows[0][15]);
                                    }
                                    if (DynmaicColumnList.Count() >= 16)
                                    {
                                        for (int a = 16; a < DynmaicColumnList.Count(); a++)

                                            dt.Rows[k][a + 5] = Convert.ToString(dataTable.Rows[0][a]);
                                    }


                                //int m = 0;
                                //while (m < DynmaicColumnList.Count())
                                //{





                                //    var DynamicDetails = (from item in DynamicValueDetails
                                //                          where item.NewProgressColumnId == Convert.ToInt64(DynmaicColumnList.ElementAt(m).NewProgressColumnId)
                                //                          select item).ToList();

                                //    if (DynamicDetails.Count > 0)
                                //    {

                                //        dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString(DynamicDetails.ElementAt(0).DynamicColumnDetails);
                                //    }
                                //    else
                                //    {
                                //        if (DynmaicColumnList.ElementAt(m).DynamicColumnName != "")
                                //        {
                                //            dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString("");
                                //        }

                                //    }
                                //    m++;
                                //}

                                //}
                                //else
                                //{
                                //    dt.Rows[k]["GateName"] = Convert.ToString(filtergates.ElementAt(j).GateName);
                                //    dt.Rows[k]["Part Name"] = Convert.ToString(filtergates.ElementAt(j).InspectionItem);

                                //    dt.Rows[k]["Defect"] = Convert.ToString(filtergates.ElementAt(j).Defect);
                                //    dt.Rows[k]["CompletedDate"] = Convert.ToString(filtergates.ElementAt(j).CompletedDate);

                                //    if (filtergates.ElementAt(j).CheckListItemStatusId == 3 || filtergates.ElementAt(j).CheckListItemStatusId == 6)
                                //    {
                                //        dt.Rows[k]["Status"] = Convert.ToString("Rework");
                                //    }
                                //    else
                                //    {
                                //        dt.Rows[k]["Status"] = Convert.ToString("Re-Examination");
                                //    }


                                //    //var DynamicValueDetails = from DyColumns in ds.Tables[4].AsEnumerable()
                                //    //                          where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                //    //                          &&
                                //    //                          DyColumns.Field<Int64>("VinId") == Convert.ToInt64(filtergates.ElementAt(j).VinId)
                                //    //                          select new
                                //    //                          {
                                //    //                              DynamicColumnDetails = DyColumns.Field<string>("DynamicColumnDetails"),
                                //    //                              NewProgressColumnId = DyColumns.Field<Int64>("NewProgressColumnId"),
                                //    //                              QFLFeedBackworkflowId = DyColumns.Field<Int64>("QFLFeedBackworkflowId"),
                                //    //                              VinId = DyColumns.Field<Int64>("VinId"),

                                //    //                          };

                                //    var DynamicList = (from DyColumns in ds.Tables[6].AsEnumerable()
                                //                       where DyColumns.Field<Int64>("QFLFeedBackworkflowId") == Convert.ToInt64(filtergates.ElementAt(j).QFLFeedbackWorkflowId)
                                //                       select DyColumns).ToList();

                                //    DataTable dataTable = DynamicList.CopyToDataTable();

                                //    if (DynmaicColumnList.Count() >= 1)
                                //    {
                                //        dt.Rows[k][8] = Convert.ToString(dataTable.Rows[0][1]);

                                //    }
                                //    if (DynmaicColumnList.Count() >= 2)
                                //    {
                                //        dt.Rows[k][9] = Convert.ToString(dataTable.Rows[0][2]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 3)
                                //    {
                                //        dt.Rows[k][10] = Convert.ToString(dataTable.Rows[0][3]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 4)
                                //    {
                                //        dt.Rows[k][11] = Convert.ToString(dataTable.Rows[0][4]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 5)
                                //    {
                                //        dt.Rows[k][12] = Convert.ToString(dataTable.Rows[0][5]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 6)
                                //    {
                                //        dt.Rows[k][13] = Convert.ToString(dataTable.Rows[0][6]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 7)
                                //    {
                                //        dt.Rows[k][14] = Convert.ToString(dataTable.Rows[0][7]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 8)
                                //    {
                                //        dt.Rows[k][15] = Convert.ToString(dataTable.Rows[0][8]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 9)
                                //    {
                                //        dt.Rows[k][16] = Convert.ToString(dataTable.Rows[0][9]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 10)
                                //    {
                                //        dt.Rows[k][17] = Convert.ToString(dataTable.Rows[0][10]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 11)
                                //    {
                                //        dt.Rows[k][18] = Convert.ToString(dataTable.Rows[0][11]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 12)
                                //    {
                                //        dt.Rows[k][19] = Convert.ToString(dataTable.Rows[0][12]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 13)
                                //    {
                                //        dt.Rows[k][20] = Convert.ToString(dataTable.Rows[0][13]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 14)
                                //    {
                                //        dt.Rows[k][21] = Convert.ToString(dataTable.Rows[0][14]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 15)
                                //    {
                                //        dt.Rows[k][22] = Convert.ToString(dataTable.Rows[0][15]);
                                //    }
                                //    if (DynmaicColumnList.Count() >= 16)
                                //    {
                                //        for (int a = 16; a < DynmaicColumnList.Count(); a++)

                                //            dt.Rows[k][a + 5] = Convert.ToString(dataTable.Rows[0][a]);
                                //    }

                                //    //int m = 0;
                                //    //while (m < DynmaicColumnList.Count())
                                //    //{


                                //    //    var DynamicDetails = (from item in DynamicValueDetails
                                //    //                          where item.NewProgressColumnId == Convert.ToInt64(DynmaicColumnList.ElementAt(m).NewProgressColumnId)
                                //    //                          select item).ToList();

                                //    //    if (DynamicDetails.Count > 0)
                                //    //    {

                                //    //        dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString(DynamicDetails.ElementAt(0).DynamicColumnDetails);
                                //    //    }
                                //    //    else
                                //    //    {


                                //    //        if (DynmaicColumnList.ElementAt(m).DynamicColumnName != "")
                                //    //        {
                                //    //            dt.Rows[k][DynmaicColumnList.ElementAt(m).DynamicColumnName] = Convert.ToString("");
                                //    //        }

                                //    //    }
                                //    //    m++;
                                //    //}


                                //    if (Filtercount == j + 1)
                                //    {
                                //        //new NPOI.SS.Util.CellRangeAddress(RowFrom,RowTo, FromColumn, ToColumn);
                                //        NPOI.SS.Util.CellRangeAddress cra = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 0, 0);
                                //        NPOI.SS.Util.CellRangeAddress cra1 = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 1, 1);
                                //        NPOI.SS.Util.CellRangeAddress cra2 = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 2, 2);
                                //        //NPOI.SS.Util.CellRangeAddress cra3 = new NPOI.SS.Util.CellRangeAddress(RowFrom, k + 1, 4, 4);
                                //        sheet1.AddMergedRegion(cra);
                                //        sheet1.AddMergedRegion(cra1);
                                //        sheet1.AddMergedRegion(cra2);
                                //        //sheet1.AddMergedRegion(cra3);


                                //    }



                                //}




                                counts++;
                                k++;


                            }
                        }

                        //header bold


                        var font = workbook.CreateFont();
                        font.FontHeightInPoints = (short)12;
                        font.FontName = "Calibri";

                        font.Boldweight = (short)NPOI.SS.UserModel.FontBoldWeight.Normal;

                        NPOI.HSSF.UserModel.HSSFWorkbook wob = new NPOI.HSSF.UserModel.HSSFWorkbook();//alfred test
                        NPOI.HSSF.UserModel.HSSFPalette pa = wob.GetCustomPalette();
                        NPOI.HSSF.Util.HSSFColor XlColour = pa.FindSimilarColor(192, 192, 192);

                        //make a header row  
                        IRow row1 = sheet1.CreateRow(0);

                        XSSFCellStyle yourStyle = (XSSFCellStyle)workbook.CreateCellStyle();
                        yourStyle.WrapText = true;
                        yourStyle.Alignment = HorizontalAlignment.Center;
                        yourStyle.VerticalAlignment = VerticalAlignment.Center;
                        yourStyle.BorderBottom = BorderStyle.Medium;
                        yourStyle.BorderRight = BorderStyle.Medium;
                        yourStyle.BorderTop = BorderStyle.Medium;
                        yourStyle.BorderLeft = BorderStyle.Medium;



                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            //sheet1.SetColumnWidth(j, 5000);
                            sheet1.SetColumnWidth(j, 9000);
                            ICell cell = row1.CreateCell(j);
                            cell.CellStyle = workbook.CreateCellStyle();
                            cell.CellStyle = yourStyle;
                            cell.CellStyle.SetFont(font);
                            cell.CellStyle.FillForegroundColor = XlColour.Indexed;
                            cell.CellStyle.FillPattern = FillPattern.NoFill;

                            String columnName = dt.Columns[j].ToString();
                            cell.SetCellValue(columnName);
                        }

                        //loops through data  
                        for (int m = 0; m < dt.Rows.Count; m++)
                        {
                            IRow row = sheet1.CreateRow(m + 1);
                            for (int j = 0; j < dt.Columns.Count; j++)
                            {
                                ICell cell = row.CreateCell(j);
                                cell.CellStyle = yourStyle;
                                String columnName = dt.Columns[j].ToString();
                                cell.SetCellValue(dt.Rows[m][columnName].ToString());

                            }
                        }

                    }

                    using (var exportData = new MemoryStream())
                    {
                        Response.Clear();
                        workbook.Write(exportData);

                        Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                        Response.AddHeader("Content-Disposition", string.Format("attachment;filename={0}", "Progress_Monitor" + "_" + DateTime.Now.ToString("dd-MM-yyyy_HH-mm-ss") + ".xlsx"));
                        Response.BinaryWrite(exportData.ToArray());
                        Response.End();
                    }
                }
            }


            catch (Exception ex)
            {
                ErrorLog.Log("ProgressmonitorAll Excel" + ex.Message);
            }
        }

        [SessionExpire]
        public JsonResult MovedToFolder(string Vinnumber, string ModelName)
        {
            WebServices Service = new WebServices();
            UserDetails Signature = new UserDetails();
            string token = "";
            GetVinlists res = Service.GetVinlist(Vinnumber, ModelName, token);

            string path = ConfigurationManager.AppSettings["SignaturePath"].ToString();

            var BindUniqueLine = (from item in res.GetVinlist
                                  select item).Distinct();
            string fileNameWithPath = "";
            string sourceFile = "";
           

      
            try
                {




                foreach (var Vins in BindUniqueLine)
                {
                    string vin = Vins.Vinnumber;

                 


                    fileNameWithPath = path + @"" + Vins.Vinnumber + @"\" + Vins.ModelName + @"\" + Vins.FileName;
                    string postedFile = path + @"" + Vins.Vinnumber + @"\" + Vins.ModelName;
                    sourceFile = path + @"" + Vins.Vinnumber + @"\" + Vins.FileName;

                    FileInfo file2 = new FileInfo(postedFile + "\\" + Vins.FileName);

                    if (!file2.Exists)//check file exsit or not  
                    {
                        

                    
                    

                    if (!System.IO.Directory.Exists(postedFile))
                    {
                        System.IO.Directory.CreateDirectory(postedFile);

                    }
                     
                        System.IO.File.Move(sourceFile, fileNameWithPath);
                       
                    }
                }
             
                

            }
            catch (Exception ex)
            {
                ErrorLog.Log(" File Move " + ex.Message);
            }
            return Json(JsonRequestBehavior.AllowGet);

        }

        public ActionResult MovedToFile()
        {
            return View();
        }


    }

}





 





