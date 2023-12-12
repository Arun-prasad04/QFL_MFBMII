using MFBMQFLAPI.DAL;
using MFBMQFLAPI.JsonClass;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Text;

namespace MFBMQFLAPI.BAL
{
    public class GetProgressBAL
    {
        public string GetProgressMonitorData(ProgressMonitor Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();            
            DataSet ds = _ob.GetProgressMonitorData(Input);
            string json = string.Empty;
            json = JsonConvert.SerializeObject(ds);
           
            return json;
        }

        public ProgressMonitorVINHistory ProgressMonitorVINHistory(ProgressMonitor Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();
            ProgressMonitorVINHistory vinHistroy = new ProgressMonitorVINHistory();
            List<ProgressMonitorHistoryGateDetails> listofGate = new List<ProgressMonitorHistoryGateDetails>();
            List<ProgressMonitorHistoryVINDetails> listVINDetails = new List<ProgressMonitorHistoryVINDetails>();
            List<ProgressMonitorHistoryVINDetails> listVINDetailsHistory = new List<ProgressMonitorHistoryVINDetails>();
            TotalHistoryMaxCount TotalHistoryMaxCountObj = new TotalHistoryMaxCount();

            List<ProgressMonitorHistoryVINDetailsForComments> listVINComments = new List<ProgressMonitorHistoryVINDetailsForComments>();
            List<ProgressMonitorHistoryComments> CommentList = new List<ProgressMonitorHistoryComments>();


            DataSet ds = _ob.ProgressMonitorVINHistory(Input);

            if (ds.Tables != null && ds.Tables.Count > 0)
            {
                if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables[0].Rows)
                    {
                        ProgressMonitorHistoryGateDetails gateDetails = new ProgressMonitorHistoryGateDetails();

                        //gateDetails.GateId = Convert.ToInt32(ds.Tables[0].Rows[0]["GateId"]);
                        //gateDetails.GateName = Convert.ToString(ds.Tables[0].Rows[0]["GateName"]);
                        //gateDetails.VINName = Convert.ToString(ds.Tables[0].Rows[0]["VINName"]);
                        //gateDetails.VariantName = Convert.ToString(ds.Tables[0].Rows[0]["VariantName"]);

                        gateDetails.GateId = Convert.ToInt32(item["GateId"]);
                        gateDetails.GateName = Convert.ToString(item["GateName"]);
                        gateDetails.VINName = Convert.ToString(item["VINName"]);
                        gateDetails.VariantName = Convert.ToString(item["VariantName"]);

                        listofGate.Add(gateDetails);
                    }
                }

                if (ds.Tables[1] != null && ds.Tables[1].Rows.Count > 0)
                {

                    foreach (DataRow item in ds.Tables[1].Rows)
                    {
                        ProgressMonitorHistoryVINDetails vinDetails = new ProgressMonitorHistoryVINDetails();

                        vinDetails.UserName = Convert.ToString(item["UserName"]);
                        vinDetails.GateId = Convert.ToInt32(item["GateId"]);
                        vinDetails.GateName = Convert.ToString(item["GateName"]);
                        vinDetails.CreatedDateTime = Convert.ToString(item["CreatedDateTime"]);
                        vinDetails.CreatedDate = Convert.ToString(item["CreatedDate"]);
                        vinDetails.CreatedTime = Convert.ToString(item["CreatedTime"]);
                        vinDetails.CreatedBy = Convert.ToString(item["CreatedBy"]);
                        vinDetails.Status = Convert.ToString(item["Status"]);
                        vinDetails.Okcount = Convert.ToInt32(item["Okcount"]);
                        vinDetails.NotOkcount = Convert.ToInt32(item["NotOkcount"]);
                        vinDetails.Skipcount = Convert.ToInt32(item["Skipcount"]);
                        vinDetails.CheckItem = Convert.ToString(item["CheckItem"]);
                        vinDetails.Standard = Convert.ToString(item["Standard"]);
                        vinDetails.Specification = Convert.ToString(item["Specification"]);
                        vinDetails.DefectPlace = Convert.ToString(item["DefectPlace"]);
                        vinDetails.DefectClass = Convert.ToString(item["DefectClass"]);
                        vinDetails.PartName = Convert.ToString(item["PartName"]);
                        vinDetails.ActualValue = Convert.ToString(item["ActualValue"]);
                        vinDetails.Responsible = Convert.ToString(item["Responsible"]);
                        vinDetails.DamageCode = Convert.ToString(item["DamageCode"]);
                        vinDetails.Comments = Convert.ToString(item["Comments"]);
                        vinDetails.Attachment = Convert.ToString(item["Attachment"]);
                        vinDetails.ActualID = Convert.ToInt32(item["ActualID"]);
                        vinDetails.ReworkModifiedBy = Convert.ToString(item["ReworkModifiedBy"]);
                        vinDetails.ReworkModifiedDate = Convert.ToString(item["ReworkModifiedDate"]);
                        vinDetails.ReworkModifiedTime = Convert.ToString(item["ReworkModifiedTime"]);
                        vinDetails.ReworkModifiedDateTime = Convert.ToString(item["ReworkModifiedDateTime"]);
                        vinDetails.ReworkExaminationBy = Convert.ToString(item["ReworkExaminationBy"]);
                        vinDetails.ReworkExaminationDate = Convert.ToString(item["ReworkExaminationDate"]);
                        vinDetails.ReworkExaminationTime = Convert.ToString(item["ReworkExaminationTime"]);
                        vinDetails.ReworkExaminationDateTime = Convert.ToString(item["ReworkExaminationDateTime"]);
                        vinDetails.Sno = Convert.ToString(item["Sno"]);
                        vinDetails.CompletedDate = Convert.ToString(item["CompletedDate"]);
                        vinDetails.CompletedBY = Convert.ToString(item["CompletedBY"]);
                        vinDetails.CompletedName = Convert.ToString(item["CompletedName"]);
                        vinDetails.IsCompleted = Convert.ToString(item["IsCompleted"]);
                        vinDetails.Filename = Convert.ToString(item["Filename"]);
                        vinDetails.ModifiedBy = Convert.ToString(item["ModifiedBy"]);
                        vinDetails.SignatureId = Convert.ToString(item["SignatureId"]);
                        vinDetails.ReExamOkCount = Convert.ToInt32(item["ReExaminationCount"]);
                        vinDetails.ReworkModifiedBys = Convert.ToString(item["ReworkModifiedBys"]);
                        vinDetails.ReExaminationModifiedBy = Convert.ToString(item["ReExaminationModifiedBy"]);
                        vinDetails.QFLFeedbackWorkflowId = Convert.ToInt32(item["QFLFeedbackWorkflowId"]);
                        vinDetails.NotOkUploadImage = Convert.ToString(item["NotOkUploadImage"]);
                        vinDetails.VinId = Convert.ToString(item["VinId"]);



                        if (item.Table.Columns.Contains("ReworkModifiedBy1"))
                        {
                            vinDetails.ReworkModifiedBy1 = Convert.ToString(item["ReworkModifiedBy1"]);
                            vinDetails.ReworkModifiedDateTime1 = Convert.ToString(item["ReworkModifiedDateTime1"]);
                            vinDetails.ReExaminationModifiedBy1 = Convert.ToString(item["ReExaminationModifiedBy1"]);
                            vinDetails.ReworkExaminationDateTime1 = Convert.ToString(item["ReworkExaminationDateTime1"]);
                            vinDetails.Status1 = Convert.ToString(item["Status1"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy2"))
                        {
                            vinDetails.ReworkModifiedBy2 = Convert.ToString(item["ReworkModifiedBy2"]);
                            vinDetails.ReworkModifiedDateTime2 = Convert.ToString(item["ReworkModifiedDateTime2"]);
                            vinDetails.ReExaminationModifiedBy2 = Convert.ToString(item["ReExaminationModifiedBy2"]);
                            vinDetails.ReworkExaminationDateTime2 = Convert.ToString(item["ReworkExaminationDateTime2"]);
                            vinDetails.Status2 = Convert.ToString(item["Status2"]);


                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy3"))
                        {
                            vinDetails.ReworkModifiedBy3 = Convert.ToString(item["ReworkModifiedBy3"]);
                            vinDetails.ReworkModifiedDateTime3 = Convert.ToString(item["ReworkModifiedDateTime3"]);
                            vinDetails.ReExaminationModifiedBy3 = Convert.ToString(item["ReExaminationModifiedBy3"]);
                            vinDetails.ReworkExaminationDateTime3 = Convert.ToString(item["ReworkExaminationDateTime3"]);
                            vinDetails.Status3 = Convert.ToString(item["Status3"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy4"))
                        {
                            vinDetails.ReworkModifiedBy4 = Convert.ToString(item["ReworkModifiedBy4"]);
                            vinDetails.ReworkModifiedDateTime4 = Convert.ToString(item["ReworkModifiedDateTime4"]);
                            vinDetails.ReExaminationModifiedBy4 = Convert.ToString(item["ReExaminationModifiedBy4"]);
                            vinDetails.ReworkExaminationDateTime4 = Convert.ToString(item["ReworkExaminationDateTime4"]);
                            vinDetails.Status4 = Convert.ToString(item["Status4"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy5"))
                        {
                            vinDetails.ReworkModifiedBy5 = Convert.ToString(item["ReworkModifiedBy5"]);
                            vinDetails.ReworkModifiedDateTime5 = Convert.ToString(item["ReworkModifiedDateTime5"]);
                            vinDetails.ReExaminationModifiedBy5 = Convert.ToString(item["ReExaminationModifiedBy5"]);
                            vinDetails.ReworkExaminationDateTime5 = Convert.ToString(item["ReworkExaminationDateTime5"]);
                            vinDetails.Status5 = Convert.ToString(item["Status5"]);

                        }


                        listVINDetails.Add(vinDetails);
                    }
                }

                if (ds.Tables[2] != null && ds.Tables[2].Rows.Count > 0)
                {
                    TotalHistoryMaxCountObj.TotalHistoryMaxCounts = Convert.ToInt32(ds.Tables[2].Rows[0]["TotalHistoryMaxCounts"]);
                    TotalHistoryMaxCountObj.ReworkCount = Convert.ToInt32(ds.Tables[2].Rows[0]["ReworkCount"]);
                    TotalHistoryMaxCountObj.ReExaminationCount = Convert.ToInt32(ds.Tables[2].Rows[0]["ReExaminationCount"]);
                    TotalHistoryMaxCountObj.ReExaminationCount1 = Convert.ToInt32(ds.Tables[2].Rows[0]["ReExaminationCount1"]);
                }





                if (ds.Tables[3] != null && ds.Tables[3].Rows.Count > 0)
                {

                    foreach (DataRow item in ds.Tables[3].Rows)
                    {
                        ProgressMonitorHistoryVINDetailsForComments vinDetails = new ProgressMonitorHistoryVINDetailsForComments();


                        vinDetails.GateId = Convert.ToInt32(item["GateId2"]);
                        vinDetails.GateName = Convert.ToString(item["GateName1"]);

                        vinDetails.Status = Convert.ToString(item["Status"]);

                        vinDetails.DefectPlace = Convert.ToString(item["DefectPlace"]);
                        vinDetails.DefectClass = Convert.ToString(item["DefectClass"]);
                        vinDetails.PartName = Convert.ToString(item["PartName"]);

                        vinDetails.VinId = Convert.ToString(item["VinId"]);
                        //vinDetails.Comments1 = Convert.ToString(item["Comment1"]);



                        vinDetails.QFLFeedbackWorkflowId = Convert.ToInt32(item["QFLFeedbackWorkflowId"]);


                        if (item.Table.Columns.Contains("ReworkModifiedBy1"))
                        {
                            vinDetails.ReworkModifiedBy1 = Convert.ToString(item["ReworkModifiedBy1"]);
                            vinDetails.ReworkModifiedDateTime1 = Convert.ToString(item["ReworkModifiedDateTime1"]);
                            vinDetails.ReExaminationModifiedBy1 = Convert.ToString(item["ReExaminationModifiedBy1"]);
                            vinDetails.ReworkExaminationDateTime1 = Convert.ToString(item["ReworkExaminationDateTime1"]);
                            vinDetails.Status1 = Convert.ToString(item["Status1"]);
                            vinDetails.ReworkComments1 = Convert.ToString(item["ReworkComments1"]);
                            vinDetails.ReExamiantionComments1 = Convert.ToString(item["ReExamiantionComments1"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy2"))
                        {
                            vinDetails.ReworkModifiedBy2 = Convert.ToString(item["ReworkModifiedBy2"]);
                            vinDetails.ReworkModifiedDateTime2 = Convert.ToString(item["ReworkModifiedDateTime2"]);
                            vinDetails.ReExaminationModifiedBy2 = Convert.ToString(item["ReExaminationModifiedBy2"]);
                            vinDetails.ReworkExaminationDateTime2 = Convert.ToString(item["ReworkExaminationDateTime2"]);
                            vinDetails.Status2 = Convert.ToString(item["Status2"]);
                            vinDetails.ReworkComments2 = Convert.ToString(item["ReworkComments2"]);
                            vinDetails.ReExamiantionComments2 = Convert.ToString(item["ReExamiantionComments2"]);
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy3"))
                        {
                            vinDetails.ReworkModifiedBy3 = Convert.ToString(item["ReworkModifiedBy3"]);
                            vinDetails.ReworkModifiedDateTime3 = Convert.ToString(item["ReworkModifiedDateTime3"]);
                            vinDetails.ReExaminationModifiedBy3 = Convert.ToString(item["ReExaminationModifiedBy3"]);
                            vinDetails.ReworkExaminationDateTime3 = Convert.ToString(item["ReworkExaminationDateTime3"]);
                            vinDetails.Status3 = Convert.ToString(item["Status3"]);
                            vinDetails.ReworkComments3 = Convert.ToString(item["ReworkComments3"]);
                            vinDetails.ReExamiantionComments3 = Convert.ToString(item["ReExamiantionComments3"]); ;
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy4"))
                        {
                            vinDetails.ReworkModifiedBy4 = Convert.ToString(item["ReworkModifiedBy4"]);
                            vinDetails.ReworkModifiedDateTime4 = Convert.ToString(item["ReworkModifiedDateTime4"]);
                            vinDetails.ReExaminationModifiedBy4 = Convert.ToString(item["ReExaminationModifiedBy4"]);
                            vinDetails.ReworkExaminationDateTime4 = Convert.ToString(item["ReworkExaminationDateTime4"]);
                            vinDetails.Status4 = Convert.ToString(item["Status4"]);
                            vinDetails.ReworkComments4 = Convert.ToString(item["ReworkComments4"]);
                            vinDetails.ReExamiantionComments4 = Convert.ToString(item["ReExamiantionComments4"]);
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy5"))
                        {
                            vinDetails.ReworkModifiedBy5 = Convert.ToString(item["ReworkModifiedBy5"]);
                            vinDetails.ReworkModifiedDateTime5 = Convert.ToString(item["ReworkModifiedDateTime5"]);
                            vinDetails.ReExaminationModifiedBy5 = Convert.ToString(item["ReExaminationModifiedBy5"]);
                            vinDetails.ReworkExaminationDateTime5 = Convert.ToString(item["ReworkExaminationDateTime5"]);
                            vinDetails.Status5 = Convert.ToString(item["Status5"]);
                            vinDetails.ReworkComments5 = Convert.ToString(item["ReworkComments5"]);
                            vinDetails.ReExamiantionComments5 = Convert.ToString(item["ReExamiantionComments5"]);
                        }


                        listVINComments.Add(vinDetails);
                    }
                }

                if (ds.Tables[4] != null && ds.Tables[4].Rows.Count > 0)
                {

                    foreach (DataRow item in ds.Tables[4].Rows)
                    {
                        ProgressMonitorHistoryComments comments = new ProgressMonitorHistoryComments();
                        comments.QFLFeedbackWorkflowId = Convert.ToInt32(item["QFLFeedbackWorkflowId"]);
                        CommentList.Add(comments);
                    }

                }
            }
               vinHistroy.HistoryGateDetails = listofGate;
            vinHistroy.HistoryVINDetails = listVINDetails;
            vinHistroy.TotalHistoryMaxCount = TotalHistoryMaxCountObj;
            vinHistroy.ListOfComments = listVINComments;
            vinHistroy.CommentsCheck = CommentList;

            return vinHistroy;
        }

        public bool DeleteVINandDetails(DeleteVIN deleteVIN)
        {
            bool result = false;
            GetProgressDAL detailsBAL = new GetProgressDAL();
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
            List<GetProgressMonitorNew> listofMonitorNew = new List<GetProgressMonitorNew>();
            List<GetProgressMonitorNew> listofMonitorInspection = new List<GetProgressMonitorNew>();
            List<GetLineDetails> LineMasters = new List<GetLineDetails>();
            List<GetProgressMonitorNewForDefect> listofDefect = new List<GetProgressMonitorNewForDefect>();

            List<GetProgressMonitorNewForDynamicColumn> listofDynamicColumn = new List<GetProgressMonitorNewForDynamicColumn>();
            List<GetProgressMonitorNewForDynamicDetails> listofDynamicDetails = new List<GetProgressMonitorNewForDynamicDetails>();
            GetCommunicationDetails GetCommunicationDetails = new GetCommunicationDetails();
            List<GetCommunicationDetails> CommunicationList = new List<GetCommunicationDetails>();

            
            GetProgressDAL _ob = new GetProgressDAL();
            DataSet ds = _ob.GetProgressMonitoNewData(Input);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    listofMonitorNew.Add(new GetProgressMonitorNew
                    {
                        lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        VinNumber = Convert.ToString(ds.Tables[0].Rows[i]["VinNumber"]),

                        //gateid = Convert.ToInt32(ds.Tables[0].Rows[i]["QGateId"]),
                        //gatename = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        //Inspection = Convert.ToString(ds.Tables[0].Rows[i]["Inspection"]),
                        //vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),

                        //ModelName = Convert.ToString(ds.Tables[0].Rows[i]["ModelName"]),
                        //VehicleType = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"]),
                        //Status = Convert.ToString(ds.Tables[0].Rows[i]["Status"]),
                        //StatusCount = Convert.ToInt32(ds.Tables[0].Rows[i]["StatusCount"]),
                        //StatusId = Convert.ToInt32(ds.Tables[0].Rows[i]["StatusId"]),
                        //CreatedDate = Convert.ToString(ds.Tables[0].Rows[i]["CreatedDate"]),
                        //CreatedBy = Convert.ToString(ds.Tables[0].Rows[i]["CreatedBy"]),
                        //reexaminationcount = Convert.ToInt32(ds.Tables[0].Rows[i]["ReExaminationCount"]),
                        //reexaminatiostatus = Convert.ToString(ds.Tables[0].Rows[i]["ReExaminatioStatus"])

                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    LineMasters.Add(new GetLineDetails
                    {
                        lineid = Convert.ToInt32(ds.Tables[1].Rows[i]["Sno"]),
                        linename = Convert.ToString(ds.Tables[1].Rows[i]["LineName"])
                        

                    });
                }

            }

            //if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            //{
            //    for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
            //    {
            //        listofMonitorInspection.Add(new GetProgressMonitorNew
            //        {
            //            gateid = Convert.ToInt32(ds.Tables[2].Rows[i]["QGateId"]),
            //            gatename = Convert.ToString(ds.Tables[2].Rows[i]["GateName"]),
            //            Inspection = Convert.ToString(ds.Tables[2].Rows[i]["Inspection"]),
            //            vinid = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
            //            lineid = Convert.ToInt32(ds.Tables[2].Rows[i]["LineId"]),
            //            VinNumber = Convert.ToString(ds.Tables[2].Rows[i]["VinNumber"]),
            //            ModelName = Convert.ToString(ds.Tables[2].Rows[i]["ModelName"]),
            //            VehicleType = Convert.ToString(ds.Tables[2].Rows[i]["VehicleType"]),
            //            Status = Convert.ToString(ds.Tables[2].Rows[i]["Status"]),
            //            StatusCount = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusCount"]),
            //            StatusId = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusId"]),
            //            CreatedDate = Convert.ToString(ds.Tables[2].Rows[i]["CreatedDate"]),
            //            CreatedBy = Convert.ToString(ds.Tables[2].Rows[i]["CreatedBy"]),
            //            reexaminationcount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReExaminationCount"])
            //        });
            //    }

            //}


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    listofDefect.Add(new GetProgressMonitorNewForDefect
                    {
                        inspectionitem = Convert.ToString(ds.Tables[2].Rows[i]["InspectionItem"]),
                        QFLFeedbackWorkflowId = Convert.ToInt32(ds.Tables[2].Rows[i]["QFLFeedbackWorkflowId"]),
                        CheckListItemId = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListItemId"]),
                        DefectPlace = Convert.ToString(ds.Tables[2].Rows[i]["DefectPlace"]),
                        Site1 = Convert.ToString(ds.Tables[2].Rows[i]["Site1"]),
                        Site2 = Convert.ToString(ds.Tables[2].Rows[i]["Site2"]),
                        Site3 = Convert.ToString(ds.Tables[2].Rows[i]["Site3"]),
                        Site4 = Convert.ToString(ds.Tables[2].Rows[i]["Site4"]),
                        Site5 = Convert.ToString(ds.Tables[2].Rows[i]["Site5"]),
                        Damage = Convert.ToString(ds.Tables[2].Rows[i]["Damage"]),
                        DefectClass = Convert.ToString(ds.Tables[2].Rows[i]["DefectClass"]),
                        StaticCheckItemId = Convert.ToInt32(ds.Tables[2].Rows[i]["StaticCheckItemId"]),
                        VinId = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
                        VinNumber = Convert.ToString(ds.Tables[2].Rows[i]["VinNumber"]),
                        ModelName = Convert.ToString(ds.Tables[2].Rows[i]["ModelName"]),
                        VehicleType = Convert.ToString(ds.Tables[2].Rows[i]["VehicleType"]),
                        StatusCount = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusCount"]),
                        ReExaminationCount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReExaminationCount"]),
                        Defect = Convert.ToString(ds.Tables[2].Rows[i]["Defect"]),
                        CheckListItemStatusId = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListItemStatusId"]),
                        Site1Image = Convert.ToString(ds.Tables[2].Rows[i]["Site1Image"]),
                        NotOkUploadImage = Convert.ToString(ds.Tables[2].Rows[i]["NotOkUploadImage"]),
                        ReworkCyclecount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReworkCyclecount"]),
                        ReexaminationCycleCount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReexaminationCycleCount"]),
                       

                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[3].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[3].Rows.Count; i++)
                {
                    listofDynamicColumn.Add(new GetProgressMonitorNewForDynamicColumn
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[3].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnName = Convert.ToString(ds.Tables[3].Rows[i]["DynamicColumnName"]),
                        Counts = Convert.ToInt32(ds.Tables[3].Rows[i]["Counts"]),



                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[4].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[4].Rows.Count; i++)
                {
                    listofDynamicDetails.Add(new GetProgressMonitorNewForDynamicDetails
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[4].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnDetails = Convert.ToString(ds.Tables[4].Rows[i]["DynamicColumnDetails"]),
                        NewProgressColumnDetailsId = Convert.ToInt32(ds.Tables[4].Rows[i]["NewProgressColumnDetailsId"]),
                        QFLFeedBackworkflowId = Convert.ToInt32(ds.Tables[4].Rows[i]["QFLFeedBackworkflowId"]),
                        VinId = Convert.ToInt32(ds.Tables[4].Rows[i]["VinId"]),
                        Vinnumber = Convert.ToString(ds.Tables[4].Rows[i]["Vinnumber"]),



                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[5].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[5].Rows.Count; i++)
                {
                    CommunicationList.Add(new GetCommunicationDetails
                    {

                        VinId = Convert.ToInt32(ds.Tables[5].Rows[i]["VinId"]),
                        QFLFeedBackWorkFlowId = Convert.ToInt32(ds.Tables[5].Rows[i]["QFLFeedBackWorkFlowId"]),
                        GateName = Convert.ToString(ds.Tables[5].Rows[i]["GateName"]),
                        Comments = Convert.ToString(ds.Tables[5].Rows[i]["Comments"]),
                        CompletedDate = Convert.ToString(ds.Tables[5].Rows[i]["CompletedDate"]),
                        CompletedBy = Convert.ToString(ds.Tables[5].Rows[i]["CompletedBy"]),
                        StartPosition = Convert.ToString(ds.Tables[5].Rows[i]["StartPosition"]),

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 7 && ds.Tables[7].Rows.Count > 0)
            {
                GetProgressMonitorNew.Result = Convert.ToString(ds.Tables[7].Rows[0]["Result"]);
            }


            GetProgressMonitorNew.listsProgressMonitorNew = listofMonitorNew;
            GetProgressMonitorNew.listsProgressMonitorInspection = listofMonitorInspection;
            GetProgressMonitorNew.listlinedetails = LineMasters;
            GetProgressMonitorNew.listsProgressMonitorNewForDefect = listofDefect;
            GetProgressMonitorNew.listsProgressMonitorNewForDynamicColumn = listofDynamicColumn;
            GetProgressMonitorNew.ListProgressMonitorNewForDynamicDetails = listofDynamicDetails;
            GetProgressMonitorNew.ListofCommunicationDetails = CommunicationList;

            return GetProgressMonitorNew;
            }


        public GetProgressMonitorNew GetProgressMonitorAllData(ProgressMonitor Input)
        {
            GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();
            List<GetProgressMonitorNew> listofMonitorNew = new List<GetProgressMonitorNew>();
            List<GetProgressMonitorNew> listofMonitorInspection = new List<GetProgressMonitorNew>();
            List<GetLineDetails> LineMasters = new List<GetLineDetails>();
            List<GetProgressMonitorNewForDefect> listofDefect = new List<GetProgressMonitorNewForDefect>();

            List<GetProgressMonitorNewForDynamicColumn> listofDynamicColumn = new List<GetProgressMonitorNewForDynamicColumn>();
            List<GetProgressMonitorNewForDynamicDetails> listofDynamicDetails = new List<GetProgressMonitorNewForDynamicDetails>();
            GetCommunicationDetails GetCommunicationDetails = new GetCommunicationDetails();
            List<GetCommunicationDetails> CommunicationList = new List<GetCommunicationDetails>();


            GetProgressDAL _ob = new GetProgressDAL();
            DataSet ds = _ob.GetProgressMonitorAllData(Input);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    listofMonitorNew.Add(new GetProgressMonitorNew
                    {
                        lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        VinNumber = Convert.ToString(ds.Tables[0].Rows[i]["VinNumber"]),


                        //gateid = Convert.ToInt32(ds.Tables[0].Rows[i]["QGateId"]),
                        //gatename = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        //Inspection = Convert.ToString(ds.Tables[0].Rows[i]["Inspection"]),
                        //vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),
                        //lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        //VinNumber = Convert.ToString(ds.Tables[0].Rows[i]["VinNumber"]),
                        //ModelName = Convert.ToString(ds.Tables[0].Rows[i]["ModelName"]),
                        //VehicleType = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"]),
                        //Status = Convert.ToString(ds.Tables[0].Rows[i]["Status"]),
                        //StatusCount = Convert.ToInt32(ds.Tables[0].Rows[i]["StatusCount"]),
                        //StatusId = Convert.ToInt32(ds.Tables[0].Rows[i]["StatusId"]),
                        //CreatedDate = Convert.ToString(ds.Tables[0].Rows[i]["CreatedDate"]),
                        //CreatedBy = Convert.ToString(ds.Tables[0].Rows[i]["CreatedBy"]),
                        //reexaminationcount = Convert.ToInt32(ds.Tables[0].Rows[i]["ReExaminationCount"]),
                        //reexaminatiostatus = Convert.ToString(ds.Tables[0].Rows[i]["ReExaminatioStatus"])

                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    LineMasters.Add(new GetLineDetails
                    {
                        lineid = Convert.ToInt32(ds.Tables[1].Rows[i]["Sno"]),
                        linename = Convert.ToString(ds.Tables[1].Rows[i]["LineName"])


                    });
                }

            }

            //if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            //{
            //    for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
            //    {
            //        listofMonitorInspection.Add(new GetProgressMonitorNew
            //        {
            //            gateid = Convert.ToInt32(ds.Tables[2].Rows[i]["QGateId"]),
            //            gatename = Convert.ToString(ds.Tables[2].Rows[i]["GateName"]),
            //            Inspection = Convert.ToString(ds.Tables[2].Rows[i]["Inspection"]),
            //            vinid = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
            //            lineid = Convert.ToInt32(ds.Tables[2].Rows[i]["LineId"]),
            //            VinNumber = Convert.ToString(ds.Tables[2].Rows[i]["VinNumber"]),
            //            ModelName = Convert.ToString(ds.Tables[2].Rows[i]["ModelName"]),
            //            VehicleType = Convert.ToString(ds.Tables[2].Rows[i]["VehicleType"]),
            //            Status = Convert.ToString(ds.Tables[2].Rows[i]["Status"]),
            //            StatusCount = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusCount"]),
            //            StatusId = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusId"]),
            //            CreatedDate = Convert.ToString(ds.Tables[2].Rows[i]["CreatedDate"]),
            //            CreatedBy = Convert.ToString(ds.Tables[2].Rows[i]["CreatedBy"]),
            //            reexaminationcount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReExaminationCount"]),
                       
            //        });
            //    }

            //}


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    listofDefect.Add(new GetProgressMonitorNewForDefect
                    {
                        inspectionitem = Convert.ToString(ds.Tables[2].Rows[i]["InspectionItem"]),
                        QFLFeedbackWorkflowId = Convert.ToInt32(ds.Tables[2].Rows[i]["QFLFeedbackWorkflowId"]),
                        CheckListItemId = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListItemId"]),
                        DefectPlace = Convert.ToString(ds.Tables[2].Rows[i]["DefectPlace"]),
                        Site1 = Convert.ToString(ds.Tables[2].Rows[i]["Site1"]),
                        Site2 = Convert.ToString(ds.Tables[2].Rows[i]["Site2"]),
                        Site3 = Convert.ToString(ds.Tables[2].Rows[i]["Site3"]),
                        Site4 = Convert.ToString(ds.Tables[2].Rows[i]["Site4"]),
                        Site5 = Convert.ToString(ds.Tables[2].Rows[i]["Site5"]),
                        Damage = Convert.ToString(ds.Tables[2].Rows[i]["Damage"]),
                        DefectClass = Convert.ToString(ds.Tables[2].Rows[i]["DefectClass"]),
                        StaticCheckItemId = Convert.ToInt32(ds.Tables[2].Rows[i]["StaticCheckItemId"]),
                        VinId = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
                        VinNumber = Convert.ToString(ds.Tables[2].Rows[i]["VinNumber"]),
                        ModelName = Convert.ToString(ds.Tables[2].Rows[i]["ModelName"]),
                        VehicleType = Convert.ToString(ds.Tables[2].Rows[i]["VehicleType"]),
                        StatusCount = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusCount"]),
                        ReExaminationCount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReExaminationCount"]),
                        Defect = Convert.ToString(ds.Tables[2].Rows[i]["Defect"]),
                        CheckListItemStatusId = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListItemStatusId"]),
                        Site1Image = Convert.ToString(ds.Tables[2].Rows[i]["Site1Image"]),
                        NotOkUploadImage = Convert.ToString(ds.Tables[2].Rows[i]["NotOkUploadImage"]),
                        VinnumberColor = Convert.ToString(ds.Tables[2].Rows[i]["VinnumberColor"]),
                        ModalColor = Convert.ToString(ds.Tables[2].Rows[i]["ModalColor"]),
                        VehicleColor = Convert.ToString(ds.Tables[2].Rows[i]["VehicleColor"]),
                        DefectColor = Convert.ToString(ds.Tables[2].Rows[i]["DefectColor"]),
                        GateName = Convert.ToString(ds.Tables[2].Rows[i]["QgateName"]),
                        CompletedDate = Convert.ToString(ds.Tables[2].Rows[i]["CompletedDate"]),
                        ReworkCyclecount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReworkCyclecount"]),
                        ReexaminationCycleCount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReexaminationCycleCount"]),
                        


                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[3].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[3].Rows.Count; i++)
                {
                    listofDynamicColumn.Add(new GetProgressMonitorNewForDynamicColumn
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[3].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnName = Convert.ToString(ds.Tables[3].Rows[i]["DynamicColumnName"]),
                        Counts = Convert.ToInt32(ds.Tables[3].Rows[i]["Counts"]),



                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[4].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[4].Rows.Count; i++)
                {
                    listofDynamicDetails.Add(new GetProgressMonitorNewForDynamicDetails
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[4].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnDetails = Convert.ToString(ds.Tables[4].Rows[i]["DynamicColumnDetails"]),
                        NewProgressColumnDetailsId = Convert.ToInt32(ds.Tables[4].Rows[i]["NewProgressColumnDetailsId"]),
                        QFLFeedBackworkflowId = Convert.ToInt32(ds.Tables[4].Rows[i]["QFLFeedBackworkflowId"]),
                        VinId = Convert.ToInt32(ds.Tables[4].Rows[i]["VinId"]),
                        Vinnumber = Convert.ToString(ds.Tables[4].Rows[i]["Vinnumber"]),



                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[5].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[5].Rows.Count; i++)
                {
                    CommunicationList.Add(new GetCommunicationDetails
                    {

                        VinId = Convert.ToInt32(ds.Tables[5].Rows[i]["VinId"]),
                        QFLFeedBackWorkFlowId = Convert.ToInt32(ds.Tables[5].Rows[i]["QFLFeedBackWorkFlowId"]),
                        GateName = Convert.ToString(ds.Tables[5].Rows[i]["GateName"]),
                        Comments = Convert.ToString(ds.Tables[5].Rows[i]["Comments"]),
                        CompletedDate = Convert.ToString(ds.Tables[5].Rows[i]["CompletedDate"]),
                        CompletedBy = Convert.ToString(ds.Tables[5].Rows[i]["CompletedBy"]),
                        StartPosition = Convert.ToString(ds.Tables[5].Rows[i]["StartPosition"]),

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 7 && ds.Tables[7].Rows.Count > 0)
            {
                GetProgressMonitorNew.Result = Convert.ToString(ds.Tables[7].Rows[0]["Result"]);
            }


            GetProgressMonitorNew.listsProgressMonitorNew = listofMonitorNew;
            GetProgressMonitorNew.listsProgressMonitorInspection = listofMonitorInspection;
            GetProgressMonitorNew.listlinedetails = LineMasters;
            GetProgressMonitorNew.listsProgressMonitorNewForDefect = listofDefect;
            GetProgressMonitorNew.listsProgressMonitorNewForDynamicColumn = listofDynamicColumn;
            GetProgressMonitorNew.ListProgressMonitorNewForDynamicDetails = listofDynamicDetails;
            GetProgressMonitorNew.ListofCommunicationDetails = CommunicationList;

            return GetProgressMonitorNew;
        }

        public string GetProgressMonitorNewDatas(ProgressMonitor Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();
            DataSet ds = _ob.GetProgressMonitoNewData(Input);
            string json = string.Empty;
            json = JsonConvert.SerializeObject(ds);
            return json;
        }

        public string GetProgressMonitorAllDataForExcel(ProgressMonitor Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();
            DataSet ds = _ob.GetProgressMonitorAllData(Input);
            string json = string.Empty;
            json = JsonConvert.SerializeObject(ds);
            return json;
        }



        public PMExcelIssuedateResponse ExcelDownloadforIssueDate(ProgressMonitor Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();
            PMExcelIssuedateResponse pmResponse = new PMExcelIssuedateResponse();
            List<PMExcelIssuedate> pMExcelIssuedates = new List<PMExcelIssuedate>();

            DataSet ds = new DataSet();
            try
            {
                ds = _ob.ExcelDownloadforIssueDate(Input);

                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        PMExcelIssuedate issuedate = new PMExcelIssuedate();
                        issuedate.Date = Convert.ToString(row["CreatedDate"]);
                        issuedate.Time = Convert.ToString(row["CreatedTime"]);
                        issuedate.VIN = Convert.ToString(row["VINNumber"]);
                        issuedate.ModelName = Convert.ToString(row["ModelName"]);
                        issuedate.VehicleType = Convert.ToString(row["VehicleType"]);
                        issuedate.DefectClass = Convert.ToString(row["DefectClass"]);
                        issuedate.QGateName = Convert.ToString(row["GateName"]);
                        issuedate.PartName = Convert.ToString(row["PartName"]);
                        issuedate.Status = Convert.ToString(row["Status"]);
                        issuedate.ReExaminationStatus = Convert.ToString(row["ReExaminationStatus"]);
                        issuedate.ReworkStatus = Convert.ToString(row["ReworkStatus"]);
                        issuedate.ResponsibleName = Convert.ToString(row["ResponsibleName"]);
                        issuedate.Comment = Convert.ToString(row["Comment"]);
                        issuedate.ActualValue = Convert.ToString(row["Specifications"]);
                        issuedate.Responsible = Convert.ToString(row["Responsible"]);
                        issuedate.DamageCode = Convert.ToString(row["DamageCode"]);
                        issuedate.Attachment = Convert.ToString(row["Attachment"]);
                        issuedate.Remarks1 = Convert.ToString(row["Remarks1"]);
                        issuedate.Remarks2 = Convert.ToString(row["Remarks2"]);
                        pMExcelIssuedates.Add(issuedate);
                    }
                }
                pmResponse.pmExcels = pMExcelIssuedates;
            }
            catch (Exception ex)
            {

            }
            return pmResponse;
        }

        public ProgressMonitorVINHistory ProgressMonitorVINHistoryExcel(ProgressMonitor Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();
            ProgressMonitorVINHistory vinHistroy = new ProgressMonitorVINHistory();
            List<ProgressMonitorHistoryGateDetails> listofGate = new List<ProgressMonitorHistoryGateDetails>();
            List<ProgressMonitorHistoryVINDetails> listVINDetails = new List<ProgressMonitorHistoryVINDetails>();
            List<ProgressMonitorHistoryVINDetailsForComments> listVINComments = new List<ProgressMonitorHistoryVINDetailsForComments>();
            TotalHistoryMaxCount TotalHistoryMaxCountObj = new TotalHistoryMaxCount();

            List<ReworkandReExammaxcount> listReworkandReExammaxcount = new List<ReworkandReExammaxcount>();


            DataSet ds = _ob.ProgressMonitorVINHistoryExcel(Input);

            if (ds.Tables != null && ds.Tables.Count > 0)
            {
                if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables[0].Rows)
                    {
                        ProgressMonitorHistoryGateDetails gateDetails = new ProgressMonitorHistoryGateDetails();

                        //gateDetails.GateId = Convert.ToInt32(ds.Tables[0].Rows[0]["GateId"]);
                        //gateDetails.GateName = Convert.ToString(ds.Tables[0].Rows[0]["GateName"]);
                        //gateDetails.VINName = Convert.ToString(ds.Tables[0].Rows[0]["VINName"]);
                        //gateDetails.VariantName = Convert.ToString(ds.Tables[0].Rows[0]["VariantName"]);

                        gateDetails.GateId = Convert.ToInt32(item["GateId"]);
                        gateDetails.GateName = Convert.ToString(item["GateName"]);
                        gateDetails.VINName = Convert.ToString(item["VINName"]);
                        gateDetails.VariantName = Convert.ToString(item["VariantName"]);
                        gateDetails.ModelName = Convert.ToString(item["ModelName"]);

                        listofGate.Add(gateDetails);
                    }
                }

                if (ds.Tables[1] != null && ds.Tables[1].Rows.Count > 0)
                {

                    foreach (DataRow item in ds.Tables[1].Rows)
                    {
                        ProgressMonitorHistoryVINDetails vinDetails = new ProgressMonitorHistoryVINDetails();

                        vinDetails.UserName = Convert.ToString(item["UserName"]);
                        vinDetails.GateId = Convert.ToInt32(item["GateId"]);
                        vinDetails.GateName = Convert.ToString(item["GateName"]);
                        vinDetails.CreatedDateTime = Convert.ToString(item["CreatedDateTime"]);
                        vinDetails.CreatedDate = Convert.ToString(item["CreatedDate"]);
                        vinDetails.CreatedTime = Convert.ToString(item["CreatedTime"]);
                        vinDetails.CreatedBy = Convert.ToString(item["CreatedBy"]);
                        vinDetails.Status = Convert.ToString(item["Status"]);
                        vinDetails.CheckItem = Convert.ToString(item["CheckItem"]);
                        vinDetails.Standard = Convert.ToString(item["Standard"]);
                        vinDetails.Specification = Convert.ToString(item["Specification"]);
                        vinDetails.DefectPlace = Convert.ToString(item["DefectPlace"]);
                        vinDetails.DefectClass = Convert.ToString(item["DefectClass"]);
                        vinDetails.PartName = Convert.ToString(item["PartName"]);
                        vinDetails.ActualValue = Convert.ToString(item["ActualValue"]);
                        vinDetails.Responsible = Convert.ToString(item["Responsible"]);
                        vinDetails.DamageCode = Convert.ToString(item["DamageCode"]);
                        vinDetails.Comments = Convert.ToString(item["Comments"]);
                        vinDetails.Attachment = Convert.ToString(item["Attachment"]);
                        vinDetails.ActualID = Convert.ToInt32(item["ActualID"]);
                        vinDetails.ReworkModifiedBy = Convert.ToString(item["ReworkModifiedBy"]);
                        vinDetails.ReworkModifiedDate = Convert.ToString(item["ReworkModifiedDate"]);
                        vinDetails.ReworkModifiedTime = Convert.ToString(item["ReworkModifiedTime"]);
                        vinDetails.ReworkModifiedDateTime = Convert.ToString(item["ReworkModifiedDateTime"]);
                        vinDetails.ReworkExaminationBy = Convert.ToString(item["ReworkExaminationBy"]);
                        vinDetails.ReworkExaminationDate = Convert.ToString(item["ReworkExaminationDate"]);
                        vinDetails.ReworkExaminationTime = Convert.ToString(item["ReworkExaminationTime"]);
                        vinDetails.ReworkExaminationDateTime = Convert.ToString(item["ReworkExaminationDateTime"]);
                        vinDetails.Okcount = Convert.ToInt32(item["Okcount"]);
                        vinDetails.NotOkcount = Convert.ToInt32(item["NotOkcount"]);
                        vinDetails.Skipcount = Convert.ToInt32(item["Skipcount"]);
                        vinDetails.VinId = Convert.ToString(item["VinId"]);
                        vinDetails.VinNumber = Convert.ToString(item["VinNumber"]);
                        vinDetails.Sno = Convert.ToString(item["Sno"]);
                        vinDetails.CompletedDate = Convert.ToString(item["CompletedDate"]);
                        vinDetails.CompletedBY = Convert.ToString(item["CompletedBY"]);
                        vinDetails.CompletedName = Convert.ToString(item["CompletedName"]);
                        vinDetails.IsCompleted = Convert.ToString(item["IsCompleted"]);
                        vinDetails.Filename = Convert.ToString(item["Filename"]);
                        vinDetails.ModifiedBy = Convert.ToString(item["ModifiedBy"]);
                        vinDetails.SignatureId = Convert.ToString(item["SignatureId"]);
                        vinDetails.ReworkModifiedBys = Convert.ToString(item["ReworkModifiedBys"]);
                        vinDetails.ReExaminationModifiedBy = Convert.ToString(item["ReExaminationModifiedBy"]);

                        vinDetails.QFLFeedbackWorkflowId = Convert.ToInt32(item["QFLFeedbackWorkflowId"]);
                        vinDetails.ModelName = Convert.ToString(item["ModelName"]);


                        if (item.Table.Columns.Contains("ReworkModifiedBy1"))
                        {
                            vinDetails.ReworkModifiedBy1 = Convert.ToString(item["ReworkModifiedBy1"]);
                            vinDetails.ReworkModifiedDateTime1 = Convert.ToString(item["ReworkModifiedDateTime1"]);
                            vinDetails.ReExaminationModifiedBy1 = Convert.ToString(item["ReExaminationModifiedBy1"]);
                            vinDetails.ReworkExaminationDateTime1 = Convert.ToString(item["ReworkExaminationDateTime1"]);
                            vinDetails.Status1 = Convert.ToString(item["Status1"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy2"))
                        {
                            vinDetails.ReworkModifiedBy2 = Convert.ToString(item["ReworkModifiedBy2"]);
                            vinDetails.ReworkModifiedDateTime2 = Convert.ToString(item["ReworkModifiedDateTime2"]);
                            vinDetails.ReExaminationModifiedBy2 = Convert.ToString(item["ReExaminationModifiedBy2"]);
                            vinDetails.ReworkExaminationDateTime2 = Convert.ToString(item["ReworkExaminationDateTime2"]);
                            vinDetails.Status2 = Convert.ToString(item["Status2"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy3"))
                        {
                            vinDetails.ReworkModifiedBy3 = Convert.ToString(item["ReworkModifiedBy3"]);
                            vinDetails.ReworkModifiedDateTime3 = Convert.ToString(item["ReworkModifiedDateTime3"]);
                            vinDetails.ReExaminationModifiedBy3 = Convert.ToString(item["ReExaminationModifiedBy3"]);
                            vinDetails.ReworkExaminationDateTime3 = Convert.ToString(item["ReworkExaminationDateTime3"]);
                            vinDetails.Status3 = Convert.ToString(item["Status3"]);
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy4"))
                        {
                            vinDetails.ReworkModifiedBy4 = Convert.ToString(item["ReworkModifiedBy4"]);
                            vinDetails.ReworkModifiedDateTime4 = Convert.ToString(item["ReworkModifiedDateTime4"]);
                            vinDetails.ReExaminationModifiedBy4 = Convert.ToString(item["ReExaminationModifiedBy4"]);
                            vinDetails.ReworkExaminationDateTime4 = Convert.ToString(item["ReworkExaminationDateTime4"]);
                            vinDetails.Status4 = Convert.ToString(item["Status4"]);
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy5"))
                        {
                            vinDetails.ReworkModifiedBy5 = Convert.ToString(item["ReworkModifiedBy5"]);
                            vinDetails.ReworkModifiedDateTime5 = Convert.ToString(item["ReworkModifiedDateTime5"]);
                            vinDetails.ReExaminationModifiedBy5 = Convert.ToString(item["ReExaminationModifiedBy5"]);
                            vinDetails.ReworkExaminationDateTime5 = Convert.ToString(item["ReworkExaminationDateTime5"]);
                            vinDetails.Status5 = Convert.ToString(item["Status5"]);
                        }


                        listVINDetails.Add(vinDetails);
                    }
                }
                if (ds.Tables[2] != null && ds.Tables[2].Rows.Count > 0)
                {
                    TotalHistoryMaxCountObj.TotalHistoryMaxCounts = Convert.ToInt32(ds.Tables[2].Rows[0]["TotalHistoryMaxCounts"]);
                    TotalHistoryMaxCountObj.ReworkCount = Convert.ToInt32(ds.Tables[2].Rows[0]["ReworkCount"]);
                    TotalHistoryMaxCountObj.ReExaminationCount = Convert.ToInt32(ds.Tables[2].Rows[0]["ReExaminationCount"]);
                    TotalHistoryMaxCountObj.ReExaminationCount1 = Convert.ToInt32(ds.Tables[2].Rows[0]["ReExaminationCount1"]);


                }



                if (ds.Tables[3] != null && ds.Tables[3].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables[3].Rows)
                    {
                        ReworkandReExammaxcount ReworkandReExammaxcounts = new ReworkandReExammaxcount();

                        ReworkandReExammaxcounts.ReworkCount = Convert.ToInt32(item["ReworkMaxCounts"]);
                        ReworkandReExammaxcounts.vinnumber = Convert.ToString(item["VINNumber"]);
                        ReworkandReExammaxcounts.Gateid = Convert.ToString(item["GateId"]);
                        ReworkandReExammaxcounts.ModelName = Convert.ToString(item["ModelName"]);
                        listReworkandReExammaxcount.Add(ReworkandReExammaxcounts);
                    }
                }

                if (ds.Tables[4] != null && ds.Tables[4].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables[4].Rows)
                    {
                        ReworkandReExammaxcount ReworkandReExammaxcounts = new ReworkandReExammaxcount();

                        ReworkandReExammaxcounts.ReExaminationCount = Convert.ToInt32(item["ReExaminationMaxCounts"]);
                        ReworkandReExammaxcounts.vinnumber = Convert.ToString(item["VINNumber"]);
                        ReworkandReExammaxcounts.Gateid = Convert.ToString(item["GateId"]);
                        ReworkandReExammaxcounts.ModelName = Convert.ToString(item["ModelName"]);

                        listReworkandReExammaxcount.Add(ReworkandReExammaxcounts);
                    }
                }

                if (ds.Tables[5] != null && ds.Tables[5].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables[5].Rows)
                    {
                        ReworkandReExammaxcount ReworkandReExammaxcounts = new ReworkandReExammaxcount();

                        ReworkandReExammaxcounts.ReExaminationCount = Convert.ToInt32(item["ReExaminationMaxCounts"]);
                        ReworkandReExammaxcounts.vinnumber = Convert.ToString(item["VINNumber"]);
                        ReworkandReExammaxcounts.Gateid = Convert.ToString(item["GateId"]);
                        ReworkandReExammaxcounts.ModelName = Convert.ToString(item["ModelName"]);

                        listReworkandReExammaxcount.Add(ReworkandReExammaxcounts);
                    }
                }





                if (ds.Tables[6] != null && ds.Tables[6].Rows.Count > 0)
                {

                    foreach (DataRow item in ds.Tables[6].Rows)
                    {
                        ProgressMonitorHistoryVINDetailsForComments vinDetails = new ProgressMonitorHistoryVINDetailsForComments();


                        vinDetails.GateId = Convert.ToInt32(item["GateId2"]);
                        vinDetails.GateName = Convert.ToString(item["GateName1"]);

                        vinDetails.Status = Convert.ToString(item["Status"]);

                        vinDetails.DefectPlace = Convert.ToString(item["DefectPlace"]);
                        vinDetails.DefectClass = Convert.ToString(item["DefectClass"]);
                        vinDetails.PartName = Convert.ToString(item["PartName"]);

                        vinDetails.VinId = Convert.ToString(item["VinId"]);
                        vinDetails.VinNumber = Convert.ToString(item["Vinnumber"]);
                        vinDetails.ModelName = Convert.ToString(item["ModelName"]);


                        vinDetails.QFLFeedbackWorkflowId = Convert.ToInt32(item["QFLFeedbackWorkflowId"]);


                        if (item.Table.Columns.Contains("ReworkModifiedBy1"))
                        {
                            vinDetails.ReworkModifiedBy1 = Convert.ToString(item["ReworkModifiedBy1"]);
                            vinDetails.ReworkModifiedDateTime1 = Convert.ToString(item["ReworkModifiedDateTime1"]);
                            vinDetails.ReExaminationModifiedBy1 = Convert.ToString(item["ReExaminationModifiedBy1"]);
                            vinDetails.ReworkExaminationDateTime1 = Convert.ToString(item["ReworkExaminationDateTime1"]);
                            vinDetails.Status1 = Convert.ToString(item["Status1"]);
                            vinDetails.ReworkComments1 = Convert.ToString(item["ReworkComments1"]);
                            vinDetails.ReExamiantionComments1 = Convert.ToString(item["ReExamiantionComments1"]);

                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy2"))
                        {
                            vinDetails.ReworkModifiedBy2 = Convert.ToString(item["ReworkModifiedBy2"]);
                            vinDetails.ReworkModifiedDateTime2 = Convert.ToString(item["ReworkModifiedDateTime2"]);
                            vinDetails.ReExaminationModifiedBy2 = Convert.ToString(item["ReExaminationModifiedBy2"]);
                            vinDetails.ReworkExaminationDateTime2 = Convert.ToString(item["ReworkExaminationDateTime2"]);
                            vinDetails.Status2 = Convert.ToString(item["Status2"]);
                            vinDetails.ReworkComments2 = Convert.ToString(item["ReworkComments2"]);
                            vinDetails.ReExamiantionComments2 = Convert.ToString(item["ReExamiantionComments2"]);
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy3"))
                        {
                            vinDetails.ReworkModifiedBy3 = Convert.ToString(item["ReworkModifiedBy3"]);
                            vinDetails.ReworkModifiedDateTime3 = Convert.ToString(item["ReworkModifiedDateTime3"]);
                            vinDetails.ReExaminationModifiedBy3 = Convert.ToString(item["ReExaminationModifiedBy3"]);
                            vinDetails.ReworkExaminationDateTime3 = Convert.ToString(item["ReworkExaminationDateTime3"]);
                            vinDetails.Status3 = Convert.ToString(item["Status3"]);
                            vinDetails.ReworkComments3 = Convert.ToString(item["ReworkComments3"]);
                            vinDetails.ReExamiantionComments3 = Convert.ToString(item["ReExamiantionComments3"]); ;
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy4"))
                        {
                            vinDetails.ReworkModifiedBy4 = Convert.ToString(item["ReworkModifiedBy4"]);
                            vinDetails.ReworkModifiedDateTime4 = Convert.ToString(item["ReworkModifiedDateTime4"]);
                            vinDetails.ReExaminationModifiedBy4 = Convert.ToString(item["ReExaminationModifiedBy4"]);
                            vinDetails.ReworkExaminationDateTime4 = Convert.ToString(item["ReworkExaminationDateTime4"]);
                            vinDetails.Status4 = Convert.ToString(item["Status4"]);
                            vinDetails.ReworkComments4 = Convert.ToString(item["ReworkComments4"]);
                            vinDetails.ReExamiantionComments4 = Convert.ToString(item["ReExamiantionComments4"]);
                        }

                        if (item.Table.Columns.Contains("ReworkModifiedBy5"))
                        {
                            vinDetails.ReworkModifiedBy5 = Convert.ToString(item["ReworkModifiedBy5"]);
                            vinDetails.ReworkModifiedDateTime5 = Convert.ToString(item["ReworkModifiedDateTime5"]);
                            vinDetails.ReExaminationModifiedBy5 = Convert.ToString(item["ReExaminationModifiedBy5"]);
                            vinDetails.ReworkExaminationDateTime5 = Convert.ToString(item["ReworkExaminationDateTime5"]);
                            vinDetails.Status5 = Convert.ToString(item["Status5"]);
                            vinDetails.ReworkComments5 = Convert.ToString(item["ReworkComments5"]);
                            vinDetails.ReExamiantionComments5 = Convert.ToString(item["ReExamiantionComments5"]);
                        }


                        listVINComments.Add(vinDetails);
                    }
                }



            }
            vinHistroy.HistoryGateDetails = listofGate;
            vinHistroy.HistoryVINDetails = listVINDetails;
            vinHistroy.TotalHistoryMaxCount = TotalHistoryMaxCountObj;
            vinHistroy.ReworkandReExammaxcountobj = listReworkandReExammaxcount;
            vinHistroy.ListOfComments = listVINComments;
            return vinHistroy;
        }



        public InsertDynamicColumnText InsertDynamicColumnText(InsertDynamicColumnTextInputs InsertDynamicColumnTextInputs)
        {
            InsertDynamicColumnText InsertDynamicColumnText = new InsertDynamicColumnText();
            GetProgressDAL _ob = new GetProgressDAL();
            StringBuilder sb = new StringBuilder();
            sb.Append("<rows>");

            if (InsertDynamicColumnTextInputs.ListOfDetails != null && InsertDynamicColumnTextInputs.ListOfDetails.Count > 0)
            {
                for (int i = 0; i < InsertDynamicColumnTextInputs.ListOfDetails.Count; i++)
                {
                    sb.Append("<row>");
                    sb.Append("<DynamicValues>" + Convert.ToString(InsertDynamicColumnTextInputs.ListOfDetails[i].DynamicValues) + "</DynamicValues>");
                    sb.Append("<QFLWorkFeedBackworkflowId>" + Convert.ToInt32(InsertDynamicColumnTextInputs.ListOfDetails[i].QFLWorkFeedBackworkflowId) + "</QFLWorkFeedBackworkflowId>");
                    sb.Append("<VinNumber>" + Convert.ToString(InsertDynamicColumnTextInputs.ListOfDetails[i].VinNumber) + "</VinNumber>");

                    sb.Append("<VinId>" + Convert.ToInt32(InsertDynamicColumnTextInputs.ListOfDetails[i].VinId) + "</VinId>");
                    sb.Append("<NewProgressColumnId>" + Convert.ToInt32(InsertDynamicColumnTextInputs.ListOfDetails[i].NewProgressColumnId) + "</NewProgressColumnId>");
                    sb.Append("<userid>" + Convert.ToInt32(InsertDynamicColumnTextInputs.ListOfDetails[i].userid) + "</userid>");
                    sb.Append("<NewProgressColumnDetailsId>" + Convert.ToInt32(InsertDynamicColumnTextInputs.ListOfDetails[i].NewProgressColumnDetailsId) + "</NewProgressColumnDetailsId>");

                    sb.Append("</row>");
                }
            }
            sb.Append("</rows>");

            DataSet ds = _ob.InsertDynamicColumnText(sb.ToString());

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                InsertDynamicColumnText.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
 
            }

            

            return InsertDynamicColumnText;
        }


        public GetProgressMonitorNew GetProgressMonitorNewDataForTablet(ProgressMonitor Input)
        {
            GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();
            List<GetProgressMonitorNew> listofMonitorNew = new List<GetProgressMonitorNew>();
            List<GetProgressMonitorNew> listofMonitorInspection = new List<GetProgressMonitorNew>();
            List<GetLineDetails> LineMasters = new List<GetLineDetails>();
            List<GetProgressMonitorNewForDefect> listofDefect = new List<GetProgressMonitorNewForDefect>();

            List<GetProgressMonitorNewForDynamicColumn> listofDynamicColumn = new List<GetProgressMonitorNewForDynamicColumn>();
            List<GetProgressMonitorNewForDynamicDetails> listofDynamicDetails = new List<GetProgressMonitorNewForDynamicDetails>();
            GetCommunicationDetails GetCommunicationDetails = new GetCommunicationDetails();
            List<GetCommunicationDetails> CommunicationList = new List<GetCommunicationDetails>();


            GetProgressDAL _ob = new GetProgressDAL();
            DataSet ds = _ob.GetProgressMonitorNewDataForTablet(Input);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    listofMonitorNew.Add(new GetProgressMonitorNew
                    {
                        lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        VinNumber = Convert.ToString(ds.Tables[0].Rows[i]["VinNumber"]),

                        //gateid = Convert.ToInt32(ds.Tables[0].Rows[i]["QGateId"]),
                        //gatename = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        //Inspection = Convert.ToString(ds.Tables[0].Rows[i]["Inspection"]),
                        //vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),

                        //ModelName = Convert.ToString(ds.Tables[0].Rows[i]["ModelName"]),
                        //VehicleType = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"]),
                        //Status = Convert.ToString(ds.Tables[0].Rows[i]["Status"]),
                        //StatusCount = Convert.ToInt32(ds.Tables[0].Rows[i]["StatusCount"]),
                        //StatusId = Convert.ToInt32(ds.Tables[0].Rows[i]["StatusId"]),
                        //CreatedDate = Convert.ToString(ds.Tables[0].Rows[i]["CreatedDate"]),
                        //CreatedBy = Convert.ToString(ds.Tables[0].Rows[i]["CreatedBy"]),
                        //reexaminationcount = Convert.ToInt32(ds.Tables[0].Rows[i]["ReExaminationCount"]),
                        //reexaminatiostatus = Convert.ToString(ds.Tables[0].Rows[i]["ReExaminatioStatus"])

                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    LineMasters.Add(new GetLineDetails
                    {
                        lineid = Convert.ToInt32(ds.Tables[1].Rows[i]["Sno"]),
                        linename = Convert.ToString(ds.Tables[1].Rows[i]["LineName"])


                    });
                }

            }

            //if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            //{
            //    for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
            //    {
            //        listofMonitorInspection.Add(new GetProgressMonitorNew
            //        {
            //            gateid = Convert.ToInt32(ds.Tables[2].Rows[i]["QGateId"]),
            //            gatename = Convert.ToString(ds.Tables[2].Rows[i]["GateName"]),
            //            Inspection = Convert.ToString(ds.Tables[2].Rows[i]["Inspection"]),
            //            vinid = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
            //            lineid = Convert.ToInt32(ds.Tables[2].Rows[i]["LineId"]),
            //            VinNumber = Convert.ToString(ds.Tables[2].Rows[i]["VinNumber"]),
            //            ModelName = Convert.ToString(ds.Tables[2].Rows[i]["ModelName"]),
            //            VehicleType = Convert.ToString(ds.Tables[2].Rows[i]["VehicleType"]),
            //            Status = Convert.ToString(ds.Tables[2].Rows[i]["Status"]),
            //            StatusCount = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusCount"]),
            //            StatusId = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusId"]),
            //            CreatedDate = Convert.ToString(ds.Tables[2].Rows[i]["CreatedDate"]),
            //            CreatedBy = Convert.ToString(ds.Tables[2].Rows[i]["CreatedBy"]),
            //            reexaminationcount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReExaminationCount"])
            //        });
            //    }

            //}


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    listofDefect.Add(new GetProgressMonitorNewForDefect
                    {
                        inspectionitem = Convert.ToString(ds.Tables[2].Rows[i]["InspectionItem"]),
                        QFLFeedbackWorkflowId = Convert.ToInt32(ds.Tables[2].Rows[i]["QFLFeedbackWorkflowId"]),
                        CheckListItemId = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListItemId"]),
                        DefectPlace = Convert.ToString(ds.Tables[2].Rows[i]["DefectPlace"]),
                        Site1 = Convert.ToString(ds.Tables[2].Rows[i]["Site1"]),
                        Site2 = Convert.ToString(ds.Tables[2].Rows[i]["Site2"]),
                        Site3 = Convert.ToString(ds.Tables[2].Rows[i]["Site3"]),
                        Site4 = Convert.ToString(ds.Tables[2].Rows[i]["Site4"]),
                        Site5 = Convert.ToString(ds.Tables[2].Rows[i]["Site5"]),
                        Damage = Convert.ToString(ds.Tables[2].Rows[i]["Damage"]),
                        DefectClass = Convert.ToString(ds.Tables[2].Rows[i]["DefectClass"]),
                        StaticCheckItemId = Convert.ToInt32(ds.Tables[2].Rows[i]["StaticCheckItemId"]),
                        VinId = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
                        VinNumber = Convert.ToString(ds.Tables[2].Rows[i]["VinNumber"]),
                        ModelName = Convert.ToString(ds.Tables[2].Rows[i]["ModelName"]),
                        VehicleType = Convert.ToString(ds.Tables[2].Rows[i]["VehicleType"]),
                        StatusCount = Convert.ToInt32(ds.Tables[2].Rows[i]["StatusCount"]),
                        ReExaminationCount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReExaminationCount"]),
                        Defect = Convert.ToString(ds.Tables[2].Rows[i]["Defect"]),
                        CheckListItemStatusId = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListItemStatusId"]),
                        Site1Image = Convert.ToString(ds.Tables[2].Rows[i]["Site1Image"]),
                        NotOkUploadImage = Convert.ToString(ds.Tables[2].Rows[i]["NotOkUploadImage"]),
                       ReworkCyclecount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReworkCyclecount"]),
                        ReexaminationCycleCount = Convert.ToInt32(ds.Tables[2].Rows[i]["ReexaminationCycleCount"]),


                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[3].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[3].Rows.Count; i++)
                {
                    listofDynamicColumn.Add(new GetProgressMonitorNewForDynamicColumn
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[3].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnName = Convert.ToString(ds.Tables[3].Rows[i]["DynamicColumnName"]),
                        Counts = Convert.ToInt32(ds.Tables[3].Rows[i]["Counts"]),



                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[4].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[4].Rows.Count; i++)
                {
                    listofDynamicDetails.Add(new GetProgressMonitorNewForDynamicDetails
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[4].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnDetails = Convert.ToString(ds.Tables[4].Rows[i]["DynamicColumnDetails"]),
                        NewProgressColumnDetailsId = Convert.ToInt32(ds.Tables[4].Rows[i]["NewProgressColumnDetailsId"]),
                        QFLFeedBackworkflowId = Convert.ToInt32(ds.Tables[4].Rows[i]["QFLFeedBackworkflowId"]),
                        VinId = Convert.ToInt32(ds.Tables[4].Rows[i]["VinId"]),
                        Vinnumber = Convert.ToString(ds.Tables[4].Rows[i]["Vinnumber"]),



                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[5].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[5].Rows.Count; i++)
                {
                    CommunicationList.Add(new GetCommunicationDetails
                    {

                        VinId = Convert.ToInt32(ds.Tables[5].Rows[i]["VinId"]),
                        QFLFeedBackWorkFlowId = Convert.ToInt32(ds.Tables[5].Rows[i]["QFLFeedBackWorkFlowId"]),
                        GateName = Convert.ToString(ds.Tables[5].Rows[i]["GateName"]),
                        Comments = Convert.ToString(ds.Tables[5].Rows[i]["Comments"]),
                        CompletedDate = Convert.ToString(ds.Tables[5].Rows[i]["CompletedDate"]),
                        CompletedBy = Convert.ToString(ds.Tables[5].Rows[i]["CompletedBy"]),
                        StartPosition = Convert.ToString(ds.Tables[5].Rows[i]["StartPosition"]),

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 7 && ds.Tables[7].Rows.Count > 0)
            {
                GetProgressMonitorNew.Result = Convert.ToString(ds.Tables[7].Rows[0]["Result"]);
            }


            GetProgressMonitorNew.listsProgressMonitorNew = listofMonitorNew;
            GetProgressMonitorNew.listsProgressMonitorInspection = listofMonitorInspection;
            GetProgressMonitorNew.listlinedetails = LineMasters;
            GetProgressMonitorNew.listsProgressMonitorNewForDefect = listofDefect;
            GetProgressMonitorNew.listsProgressMonitorNewForDynamicColumn = listofDynamicColumn;
            GetProgressMonitorNew.ListProgressMonitorNewForDynamicDetails = listofDynamicDetails;
            GetProgressMonitorNew.ListofCommunicationDetails = CommunicationList;

            return GetProgressMonitorNew;
        }

        public GETDynamicColumnText GETDynamicColumnText(GETDynamicColumnTextInputs Input)
        {
            GETDynamicColumnText GETDynamicColumnText = new GETDynamicColumnText();
            List<GETDynamicColumnText> ListDynamicColumnText = new List<GETDynamicColumnText>();
        
            GetProgressDAL _ob = new GetProgressDAL();

            DataSet ds = _ob.GETDynamicColumnText(Input);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    ListDynamicColumnText.Add(new GETDynamicColumnText
                    {
                        NewProgressColumnDetailsId = Convert.ToInt32(ds.Tables[0].Rows[i]["NewProgressColumnDetailsId"]),
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[0].Rows[i]["NewProgressColumnId"]),
                        VinId = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),
                        QFLWorkFeedBackworkflowId = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedBackworkflowId"]),
                        VinNumber = Convert.ToString(ds.Tables[0].Rows[i]["VinNumber"]),
                        DynamicValues = Convert.ToString(ds.Tables[0].Rows[i]["DynamicColumnDetails"]),
                      

                    });
                }

            }


            GETDynamicColumnText.ListOfDetails = ListDynamicColumnText;

            return GETDynamicColumnText;
        }

        public ColorResult UpdateAllProgressColor(ColorInputs Input)
        {
            ColorResult result = new ColorResult();
            GetProgressDAL _ob = new GetProgressDAL();
          
 
            DataSet ds = _ob.UpdateAllProgressColor(Input);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                result.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }

            return result;
        }


        public GetVinlists GetVinlists(GetVinlists Input)
        {
            GetProgressDAL _ob = new GetProgressDAL();
            GetVinlists vinHistroy = new GetVinlists();
            List<GetVinlists> listofVin = new List<GetVinlists>();
           


            DataSet ds = _ob.GetVinlists(Input);

            if (ds.Tables != null && ds.Tables.Count > 0)
            {
                if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow item in ds.Tables[0].Rows)
                    {
                        GetVinlists GetVinlists = new GetVinlists();

                        //gateDetails.GateId = Convert.ToInt32(ds.Tables[0].Rows[0]["GateId"]);
                        //gateDetails.GateName = Convert.ToString(ds.Tables[0].Rows[0]["GateName"]);
                        //gateDetails.VINName = Convert.ToString(ds.Tables[0].Rows[0]["VINName"]);
                        //gateDetails.VariantName = Convert.ToString(ds.Tables[0].Rows[0]["VariantName"]);

                        GetVinlists.Vinnumber = Convert.ToString(item["Vinnumber"]);
                        GetVinlists.ModelName = Convert.ToString(item["ModelName"]);
                        GetVinlists.FileName = Convert.ToString(item["FileName"]);
                       

                        listofVin.Add(GetVinlists);
                    }
                }




            }
            vinHistroy.GetVinlist = listofVin;
           
            return vinHistroy;
        }

        public List<VinCheckListUploadHistroy> Get_VinUploadCheckListHistory()
        {
            List<VinCheckListUploadHistroy> lst = new List<VinCheckListUploadHistroy>();
            GetProgressDAL _dal = new GetProgressDAL();
            DataSet ds = _dal.Get_VinUploadCheckListHistory();
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    lst.Add(new VinCheckListUploadHistroy
                    {

                        Vinnumber = Convert.ToString(ds.Tables[0].Rows[i]["Vinnumber"]),
                        ModelName = Convert.ToString(ds.Tables[0].Rows[i]["ModelName"]),
                       
                       

                    });
                }
            }
            return lst;
        }

    }
}