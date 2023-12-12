using MFBMQFLAPI.DAL;
using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.RegularExpressions;
using System.Web;
//using static  MFBMQFLAPI.JsonClass.TabletUserDetails;
using System.Net.Mail;
using System.Configuration;
using Newtonsoft.Json;
using System.IO;

using System.Security.Cryptography;
using System.Text;


namespace MFBMQFLAPI.BAL
{
    public class UserDetailsBAL
    {

        #region User Details Method

        //public UserDetails GetUserDetails(string emailid)
        //{
        //    UserDetails User = new UserDetails();
        //    DataSet ds_UserDetails = new DataSet();
        //    UserDetailsDAL _dal = new UserDetailsDAL();
        //    ds_UserDetails = _dal.Get_UserDetails(emailid);
        //    if (ds_UserDetails != null && ds_UserDetails.Tables.Count > 0 && ds_UserDetails.Tables[0].Rows.Count > 0)
        //    {
        //        User.Email = Convert.ToString(ds_UserDetails.Tables[0].Rows[0]["Email"]);
        //        User.UserName = Convert.ToString(ds_UserDetails.Tables[0].Rows[0]["UserName"]);
        //        User.LastLogin = Convert.ToString(ds_UserDetails.Tables[0].Rows[0]["LastLogin"]);
        //        User.UserId = Convert.ToInt32(ds_UserDetails.Tables[0].Rows[0]["UserId"]);
        //        User.CountryCode = Convert.ToString(ds_UserDetails.Tables[0].Rows[0]["CountryCode"]);
        //        User.DeptId = Convert.ToInt32(ds_UserDetails.Tables[0].Rows[0]["DeptId"]);
        //        User.RoleId = Convert.ToInt32(ds_UserDetails.Tables[0].Rows[0]["RoleId"]);
        //        User.AccessDetails = new List<UserAccess>();
        //        if (ds_UserDetails.Tables[1].Rows.Count > 0)
        //        {
        //            foreach (DataRow dr in ds_UserDetails.Tables[1].Rows)
        //            {
        //                User.AccessDetails.Add(new UserAccess()
        //                {
        //                    ToolId = Convert.ToInt32(dr["ToolId"]),
        //                    UserId = Convert.ToInt32(dr["UserId"]),
        //                    AccessId = Convert.ToInt32(dr["AccessId"]),
        //                    AccessName = Convert.ToString(dr["AccessName"]),
        //                    AccessType = Convert.ToString(dr["AccessType"])
        //                });
        //            }
        //        }
        //    }
        //    return User;
        //}

        public string GetUserDetails(UserDetailInputs Input)
        {
            DataSet ds = new DataSet();
            string json = string.Empty;
            UserDetailsDAL _dal = new UserDetailsDAL();
            ds = _dal.Get_UserDetails(Input);
         
            json = JsonConvert.SerializeObject(ds);
            return json;
        }

        #endregion


        #region DropDownlistDetails Method

        public DropDownlistDetails DropDownlist_Details(DropdownDetailsInput DropdownDetailsInput)
        {
            DropDownlistDetails DropDownlisResult = new DropDownlistDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
          
            List<PlantMaster> Plant = new List<PlantMaster>();

            DataSet ds = UserDetailsDAL.DropDownlist_Details(DropdownDetailsInput);


    

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Plant.Add(new PlantMaster
                    {
                        plantid = Convert.ToInt32(ds.Tables[0].Rows[i]["PlantId"]),
                        plantname = Convert.ToString(ds.Tables[0].Rows[i]["PlantName"]),
                        plantcode = Convert.ToInt32(ds.Tables[0].Rows[i]["PlantCode"])
                    });
                }
            }

            DropDownlisResult.Plant = Plant;

            return DropDownlisResult;
        }

        #endregion


        #region Line and GateMaster Method

        public GateDetails GetGateDetails(CheckLineMasterInput CheckLineMasterInput)
        {
            GateDetails ListOfGateDetails = new GateDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            List<LineMaster> linedetails = new List<LineMaster>();
            DataSet ds = UserDetailsDAL.GetGateDetails(CheckLineMasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    linedetails.Add(new LineMaster
                    {
                        lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        linename = Convert.ToString(ds.Tables[0].Rows[i]["LineName"]),
                        plantid = Convert.ToInt32(ds.Tables[0].Rows[i]["PlantId"]),
                        characterposition = Convert.ToInt32(ds.Tables[0].Rows[i]["CharacterPosition"]),
                        charactervalue = Convert.ToString(ds.Tables[0].Rows[i]["CharacterValue"])
                    });
                }
            }

            ListOfGateDetails.linemasterdetails = linedetails;
            return ListOfGateDetails;
        }

        #endregion

        public GateDetails GetGateListDetails(CheckLineMasterInput CheckLineMasterInput)
        {
            GateDetails ListOfGateDetails = new GateDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<GateDetails> GetGatelist = new List<GateDetails>();
            DataSet ds = UserDetailsDAL.GetGateListDetails(CheckLineMasterInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    GetGatelist.Add(new GateDetails
                    {
                        qgateid = Convert.ToInt32(ds.Tables[0].Rows[i]["QGateId"]),
                        gatename = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        Rework = Convert.ToInt32(ds.Tables[0].Rows[i]["ReWork"]),
                        orderno = Convert.ToInt32(ds.Tables[0].Rows[i]["OrderNo"]),
                        ReExaminationGateId = Convert.ToInt32(ds.Tables[0].Rows[i]["ReExaminationGateId"]),
                    });
                }
            }

            ListOfGateDetails.gatelist = GetGatelist;


            return ListOfGateDetails;



        }



        public CheckListItems GetCheckListItems(CheckListItemInput CheckListItemInput) 
        {
            CheckListItems GetCheckListItems = new CheckListItems();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<CheckListItems> ChecklistItems = new List<CheckListItems>();
            List<CheckListStatus> checkListStatus = new List<CheckListStatus>();
            List<blankcheckitems> blankcheckitems = new List<blankcheckitems>();
            List<StandardMasterItems> standardmasteritem = new List<StandardMasterItems>();
            List<GetDefectCheckListForRework> GetDefectCheckListForRework = new List<GetDefectCheckListForRework>();
            List<GetDefectPlaceCheckList> GetDefectPlaceCheckList = new List<GetDefectPlaceCheckList>();
           
            DataSet ds = UserDetailsDAL.GetCheckListItems(CheckListItemInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    ChecklistItems.Add(new CheckListItems
                    {
                        //qgateid = Convert.ToInt32(ds.Tables[0].Rows[i]["QGateId"]),
                        //checklistid = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckListId"]),
                        checklistitemid = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckListItemId"]),
                        inspectionitem = Convert.ToString(ds.Tables[0].Rows[i]["InspectionItem"]),
                        checkitems = Convert.ToString(ds.Tables[0].Rows[i]["CheckItems"]),
                        specification = Convert.ToString(ds.Tables[0].Rows[i]["Specification"]),
                        //modelid = Convert.ToInt32(ds.Tables[0].Rows[i]["ModelId"]),
                        //vehicletypeid = Convert.ToInt32(ds.Tables[0].Rows[i]["VehicleTypeId"])
                        checklistitemstatusid = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckListItemStatusId"]),
                        vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VINId"]),
                        qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackWorkflowId"]),
                         checklistitemname = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemName"]),
                        standard = Convert.ToString(ds.Tables[0].Rows[i]["Standard"]),
                         actualid = Convert.ToString(ds.Tables[0].Rows[i]["ActualId"]),
                        statichecklistitemid = Convert.ToInt32(ds.Tables[0].Rows[i]["StaticCheckItemId"]),
                        notokcheckcount = Convert.ToInt32(ds.Tables[0].Rows[i]["NotOkCheckcount"]),
                        givennotokcount = Convert.ToInt32(ds.Tables[0].Rows[i]["GivenNotOkCount"]),
                        iscompleted = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsCompleted"]),
                        okcheckcount = Convert.ToInt32(ds.Tables[0].Rows[i]["OkCheckcount"]),
                        individualitemcount = Convert.ToInt32(ds.Tables[0].Rows[i]["IndividualItemCount"]),
                        reexaminationcount = Convert.ToInt32(ds.Tables[0].Rows[i]["ReExaminationCount"]),
                        isreexamflg = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsReExamFlg"]),
                        Site1Image = Convert.ToString(ds.Tables[0].Rows[i]["Site1Image"]),
                        EditCheckItems = Convert.ToString(ds.Tables[0].Rows[i]["EditCheckItems"]),
                        OriginalInspectionItem = Convert.ToString(ds.Tables[0].Rows[i]["OriginalInspectionItem"]),
                        GateName = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        ReworkModifiedBy = Convert.ToString(ds.Tables[0].Rows[i]["ReworkModifiedBy"]),
                        ReworkModifiedDate = Convert.ToString(ds.Tables[0].Rows[i]["ReworkModifiedDate"]),
                        IsCommunication = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsCommunication"]),
                        NotOkUploadImage = Convert.ToString(ds.Tables[0].Rows[i]["NotOkUploadImage"]),
                        QgateColor = Convert.ToString(ds.Tables[0].Rows[i]["QgateColor"]),
                        
                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    checkListStatus.Add(new CheckListStatus
                    {
                        checkliststatus = Convert.ToString(ds.Tables[2].Rows[i]["Status"]),
                        count = Convert.ToInt32(ds.Tables[2].Rows[i]["TotalRecords"])
                    });
                }
            }

            GetCheckListItems.listofchecklistitems = ChecklistItems;
            GetCheckListItems.checkliststatus = checkListStatus;
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                GetCheckListItems.result = Convert.ToString(ds.Tables[1].Rows[0]["Result"]);
                GetCheckListItems.issignature = Convert.ToString(ds.Tables[1].Rows[0]["IsSignature"]);
                GetCheckListItems.iscompleted = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsCompleted"]);
                GetCheckListItems.vinexists = Convert.ToString(ds.Tables[1].Rows[0]["VinExists"]);
                GetCheckListItems.isreworkcompleted = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsReworkCompleted"]);
                GetCheckListItems.isreexaminationcompleted = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsReExaminationCompleted"]);
                GetCheckListItems.isreexaminationcompletedjp = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsReExaminationCompletedjp"]);
                GetCheckListItems.ReverCompleteOnlyAdmin = Convert.ToBoolean(ds.Tables[1].Rows[0]["ReverCompleteOnlyAdmin"]);


            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[3].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[3].Rows.Count; i++)
                {
                    blankcheckitems.Add(new blankcheckitems
                    {
                        checklistitemid = Convert.ToInt32(ds.Tables[3].Rows[i]["CheckListItemId"]),
                        qflworkflowid = Convert.ToInt32(ds.Tables[3].Rows[i]["QFLFeedbackWorkflowId"]),
                        spec = Convert.ToString(ds.Tables[3].Rows[i]["Spec"]),
                        inspectionitem = Convert.ToString(ds.Tables[3].Rows[i]["InspectionItem"])
                    });
                }
            }
            GetCheckListItems.blankcheckitems = blankcheckitems;

      
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[4].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[4].Rows.Count; i++)
                {
                    standardmasteritem.Add(new StandardMasterItems
                    {
                      standardfilename = Convert.ToString(ds.Tables[4].Rows[i]["FileName"]),
                      standardguid = Convert.ToString(ds.Tables[4].Rows[i]["FileGUID"]),
                      standardname = Convert.ToString(ds.Tables[4].Rows[i]["StandardName"])
                    });

                  

                }
            }
            GetCheckListItems.standardmasteritems = standardmasteritem;


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[5].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[5].Rows.Count; i++)
                {
                    GetDefectCheckListForRework.Add(new GetDefectCheckListForRework
                    {
                        
                        checklistitemid = Convert.ToInt32(ds.Tables[5].Rows[i]["CheckListItemId"]),
                        qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[5].Rows[i]["QFLFeedbackWorkflowId"]),
                        staticchecklistitemid = Convert.ToInt32(ds.Tables[5].Rows[i]["StaticCheckItemId"]),
                        inspectionitem = Convert.ToString(ds.Tables[5].Rows[i]["InspectionItem"]),
                        site1 = Convert.ToString(ds.Tables[5].Rows[i]["Site1"]),
                        site2 = Convert.ToString(ds.Tables[5].Rows[i]["Site2"]),
                        site3 = Convert.ToString(ds.Tables[5].Rows[i]["Site3"]),
                        site4 = Convert.ToString(ds.Tables[5].Rows[i]["Site4"]),
                        site5 = Convert.ToString(ds.Tables[5].Rows[i]["Site5"]),
                        damage = Convert.ToString(ds.Tables[5].Rows[i]["Damage"]),
                        defectplace = Convert.ToString(ds.Tables[5].Rows[i]["DefectPlace"]),
                        defectclass = Convert.ToString(ds.Tables[5].Rows[i]["DefectClass"]),
                        vinid = Convert.ToInt32(ds.Tables[5].Rows[i]["VinId"]),
                      
                    });
                }
            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[6].Rows.Count > 0)
            {
              
                GetCheckListItems.isreexamsignature = Convert.ToBoolean(ds.Tables[6].Rows[0]["IsReExamSignature"]);
                
            }

            GetCheckListItems.DefectCheckListForRework = GetDefectCheckListForRework;


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[7].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[7].Rows.Count; i++)
                {
                    GetDefectPlaceCheckList.Add(new GetDefectPlaceCheckList
                    {

                        defectiveplace = Convert.ToString(ds.Tables[7].Rows[i]["DefectPlace"]),
                        qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[7].Rows[i]["QFLFeedbackWorkflowId"]),
                        vinid = Convert.ToInt32(ds.Tables[7].Rows[i]["VinId"]),
                        vinnumber = Convert.ToString(ds.Tables[7].Rows[i]["Vinnumber"])

                    });
                }
            }
            GetCheckListItems.GetDefectPlaceCheckList = GetDefectPlaceCheckList;


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[8].Rows.Count > 0)
            {

                GetCheckListItems.QGReExamBackgroundColor = Convert.ToBoolean(ds.Tables[8].Rows[0]["QGReExamBackgroundColor"]);
                GetCheckListItems.JPReExamBackgroundColor = Convert.ToBoolean(ds.Tables[8].Rows[0]["JPReExamBackgroundColor"]);

            }
            if (ds != null && ds.Tables.Count > 9 && ds.Tables[9].Rows.Count > 0)
            {
                GetCheckListItems.TableName = Convert.ToString(ds.Tables[9].Rows[0]["TableName"]);
            }
            return GetCheckListItems;
        }

        public UpdateCheckListItemStatus UpdateCheckListItemStatus(CheckListItemStatusInput CheckListItemStatusInput)
        {
            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            List<UpdateCheckListItemStatus> Status = new List<UpdateCheckListItemStatus>();
            DataSet ds = UserDetailsDAL.UpdateCheckListItemStatus(CheckListItemStatusInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                UpdateCheckListItemStatus.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    Status.Add(new UpdateCheckListItemStatus
                    {
                        Status = Convert.ToString(ds.Tables[1].Rows[i]["Status"]),
                        totalrecords = Convert.ToInt32(ds.Tables[1].Rows[i]["TotalRecords"])
                        
                    });
                }
            }
        
            UpdateCheckListItemStatus.UpdateCheckListItem = Status;
            return UpdateCheckListItemStatus;
        }



        public GetDefectCheckListItems GetDefectCheckListItems(GetDefectCheckListItemInput GetDefectCheckListItemInput)
        {
            GetDefectCheckListItems GetDefectCheckListItems = new GetDefectCheckListItems();
            
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            List<GetDefectCheckListItems> listDefectListItems = new List<GetDefectCheckListItems>();
            List<GetDefectSelectedValue> ListDefectSelectedValue = new List<GetDefectSelectedValue>();
            List<GetOtherSiteRowCount> othersiterowcount = new List<GetOtherSiteRowCount>();

            DataSet ds = UserDetailsDAL.GetDefectCheckListItems(GetDefectCheckListItemInput);
            string columnName = "";
            foreach (DataColumn column in ds.Tables[0].Columns)
            {
                if(column.ColumnName != "QFLFeedbackId" && column.ColumnName != "CheckListItemId" && column.ColumnName != "StaticCheckListItemId" && column.ColumnName != "PositionNumber")
                {
                    columnName = column.ColumnName;
                }
                
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    if (columnName== "DefectPlace")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            defectplace = Convert.ToString(ds.Tables[0].Rows[i]["DefectPlace"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"]),
                            positionnumber = Convert.ToInt32(ds.Tables[0].Rows[i]["PositionNumber"])
                        });
                    }

                   else if (columnName == "Site1" )
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),

                            site1 = Convert.ToString(ds.Tables[0].Rows[i]["Site1"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 1";
                    }

                    else if (columnName == "Site2" )
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site2 = Convert.ToString(ds.Tables[0].Rows[i]["Site2"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 2";
                    }

                    else if (columnName == "Site3")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site3 = Convert.ToString(ds.Tables[0].Rows[i]["Site3"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])

                        });
                        GetDefectCheckListItems.qflselectedname = "Site 3";
                    }

                    else if (columnName == "Site4")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site4 = Convert.ToString(ds.Tables[0].Rows[i]["Site4"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 4";
                    }

                    else if (columnName == "Site5")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site5 = Convert.ToString(ds.Tables[0].Rows[i]["Site5"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 5";
                    }

                    else if (columnName == "Damage")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            damage = Convert.ToString(ds.Tables[0].Rows[i]["Damage"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Damage";
                    }
                    else if (columnName == "DefectClass")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            defectclass = Convert.ToString(ds.Tables[0].Rows[i]["DefectClass"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "DefectClass";

                    }


                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    ListDefectSelectedValue.Add(new GetDefectSelectedValue
                    {
                        selectedvalue = Convert.ToString(ds.Tables[1].Rows[i]["SelectedValue"]),
                        
                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    othersiterowcount.Add(new GetOtherSiteRowCount
                    {
                        othersiterowcount = Convert.ToString(ds.Tables[2].Rows[i]["OtherSiteRowCount"]),

                    });
                }

            }

            GetDefectCheckListItems.listchecklistdefectitems = listDefectListItems;
            GetDefectCheckListItems.listdefectselectedvalue = ListDefectSelectedValue;
            GetDefectCheckListItems.getothersiterowcount = othersiterowcount;

            return GetDefectCheckListItems;
        }
        public string InsertUpdateActualCommentDetails(Actualcomment Actualcomment)
        {
            //StandardMasterDetails _AddUpdateStandardMaster = new StandardMasterDetails();
            UserDetailsDAL userdal = new UserDetailsDAL();
            string result = string.Empty;


           
            DataSet ds = userdal.InsertUpdateActualCommentDetails(Actualcomment);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }
            return result;
        }
        public ActualcommentDetils GetActualCommentDetails(Actualcomment Actualcomment)
        {
            UserDetailsDAL masterDAL = new UserDetailsDAL();
            string result = string.Empty;
            ActualcommentDetils Actualcommentoutput = new ActualcommentDetils();
            List<Actualcomment> actualdetails = new List<Actualcomment>();
            // StringBuilder checkItems = new StringBuilder();



            DataSet ds = masterDAL.GetActualCommentDetails(Actualcomment);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Actualcommentoutput.actualid = Convert.ToString(ds.Tables[0].Rows[0]["Id"]);
                    Actualcommentoutput.checklistitemid = Convert.ToInt32(ds.Tables[0].Rows[0]["CheckListItemId"]);
                    Actualcommentoutput.actualvalue = Convert.ToString(ds.Tables[0].Rows[0]["ActualValue"]);
                    Actualcommentoutput.responsible = Convert.ToString(ds.Tables[0].Rows[0]["Responsible"]);
                    Actualcommentoutput.damagecode = Convert.ToString(ds.Tables[0].Rows[0]["DamageCode"]);
                    Actualcommentoutput.comments = Convert.ToString(ds.Tables[0].Rows[0]["Comments"]);
                    Actualcommentoutput.foldername = Convert.ToString(ds.Tables[0].Rows[0]["FolderName"]);
                    Actualcommentoutput.createddate = Convert.ToString(ds.Tables[0].Rows[0]["CreatedDate"]);
                    Actualcommentoutput.username = Convert.ToString(ds.Tables[0].Rows[0]["UserName"]);
                }

            }
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    actualdetails.Add(new Actualcomment
                    {
                        fileid = Convert.ToInt32(ds.Tables[1].Rows[i]["Id"]),
                        actualid = Convert.ToInt32(ds.Tables[1].Rows[i]["QFLCheckItemCommentsId"]),
                        filename = Convert.ToString(ds.Tables[1].Rows[i]["CommentsFilename"]),
                        filesize = Convert.ToString(ds.Tables[1].Rows[i]["FileSize"]),
                        createddate = Convert.ToString(ds.Tables[1].Rows[i]["CreatedDate"])



                });
                }
            }
            Actualcommentoutput.ActualComments = actualdetails;

            return Actualcommentoutput;
        }



        public InsertSignature InsertSignature(InsertSignatureInput InsertSignatureInput)
        {
            InsertSignature InsertSignature = new InsertSignature();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            DataSet ds = UserDetailsDAL.InsertSignature(InsertSignatureInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                InsertSignature.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }

            return InsertSignature;
        }


        public GetSealGateDetails GetSealGateDetails(GetSealGateDetailsInput GetSealGateDetailsInput)
        {
            GetSealGateDetails GetSealGateDetails = new GetSealGateDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            List<GetSealGateDetails> SealGate = new List<GetSealGateDetails>();
            List<GetSealGateDetails> SealGate1 = new List<GetSealGateDetails>();
            DataSet ds = UserDetailsDAL.GetSealGateDetails(GetSealGateDetailsInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    SealGate.Add(new GetSealGateDetails
                    {
                        sno = Convert.ToInt32(ds.Tables[0].Rows[i]["SNo"]),
                        gateid = Convert.ToInt32(ds.Tables[0].Rows[i]["QGateId"]),
                        gatename = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        completeddate = Convert.ToString(ds.Tables[0].Rows[i]["CompletedDate"]),
                        completedby = Convert.ToString(ds.Tables[0].Rows[i]["CompletedBY"]),
                        signatureid = Convert.ToInt32(ds.Tables[0].Rows[i]["SignatureId"]),
                        filename = Convert.ToString(ds.Tables[0].Rows[i]["Filename"]),
                        iscompleted = Convert.ToInt32(ds.Tables[0].Rows[i]["IsCompleted"]),
                        completedname = Convert.ToString(ds.Tables[0].Rows[i]["CompletedName"]),

                        reworkcompleteddate = Convert.ToString(ds.Tables[0].Rows[i]["ReworkCompletedDate"]),
                        reworkcompletedby = Convert.ToString(ds.Tables[0].Rows[i]["ReworkCompletedBY"]),
                        isreworkcompleted = Convert.ToInt32(ds.Tables[0].Rows[i]["IsReworkCompleted"]),

                        reexaminationcompleteddate = Convert.ToString(ds.Tables[0].Rows[i]["ReExaminationCompletedDate"]),
                        reexaminationcompletedby = Convert.ToString(ds.Tables[0].Rows[i]["ReExaminationCompletedBy"]),
                        isreexaminationcompleted = Convert.ToInt32(ds.Tables[0].Rows[i]["IsReExaminationCompleted"])
                    });
                }
            }
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    SealGate1.Add(new GetSealGateDetails
                    {
                        sno = Convert.ToInt32(ds.Tables[1].Rows[i]["SNo"]),
                        gateid = Convert.ToInt32(ds.Tables[1].Rows[i]["QGateId"]),
                        gatename = Convert.ToString(ds.Tables[1].Rows[i]["GateName"]),
                        completeddate = Convert.ToString(ds.Tables[1].Rows[i]["CompletedDate"]),
                        completedby = Convert.ToString(ds.Tables[1].Rows[i]["CompletedBY"]),
                        signatureid = Convert.ToInt32(ds.Tables[1].Rows[i]["SignatureId"]),
                        filename = Convert.ToString(ds.Tables[1].Rows[i]["Filename"]),
                        iscompleted = Convert.ToInt32(ds.Tables[1].Rows[i]["IsCompleted"]),
                        completedname = Convert.ToString(ds.Tables[1].Rows[i]["CompletedName"]),

                        reworkcompleteddate = Convert.ToString(ds.Tables[1].Rows[i]["ReworkCompletedDate"]),
                        reworkcompletedby = Convert.ToString(ds.Tables[1].Rows[i]["ReworkCompletedBY"]),
                        isreworkcompleted = Convert.ToInt32(ds.Tables[1].Rows[i]["IsReworkCompleted"]),

                        reexaminationcompleteddate = Convert.ToString(ds.Tables[1].Rows[i]["ReExaminationCompletedDate"]),
                        reexaminationcompletedby = Convert.ToString(ds.Tables[1].Rows[i]["ReExaminationCompletedBy"]),
                        isreexaminationcompleted = Convert.ToInt32(ds.Tables[1].Rows[i]["IsReExaminationCompleted"])
                    });
                }
            }

            GetSealGateDetails.listsealgate = SealGate;
            GetSealGateDetails.listsealgate1 = SealGate1;
            return GetSealGateDetails;
        }


        public InsertStaticCheckItems InsertStaticCheckItems(InsertStaticCheckItemsInput InsertStaticCheckItemsInput)
        {
            InsertStaticCheckItems InsertStaticCheckItems = new InsertStaticCheckItems();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
          
            DataSet ds = UserDetailsDAL.InsertStaticCheckItems(InsertStaticCheckItemsInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                InsertStaticCheckItems.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
                       
            }

           
            return InsertStaticCheckItems;
        }


        public GetDefectCheckListItems GetDefectCheckListItemNotOk(GetDefectCheckListItemInput GetDefectCheckListItemInput)
        {
            GetDefectCheckListItems GetDefectCheckListItems = new GetDefectCheckListItems();
            GetDefectSelectedValue GetDefectSelectedValue = new GetDefectSelectedValue();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            List<GetDefectCheckListItems> listDefectListItems = new List<GetDefectCheckListItems>();
            List<GetDefectSelectedValue> ListDefectSelectedValue = new List<GetDefectSelectedValue>();
            List<GetOtherSiteRowCount> othersiterowcount = new List<GetOtherSiteRowCount>();
            DataSet ds = UserDetailsDAL.GetDefectCheckListItemNotOk(GetDefectCheckListItemInput);
            string columnName = "";
            foreach (DataColumn column in ds.Tables[0].Columns)
            {
                if (column.ColumnName != "QFLFeedbackId" && column.ColumnName != "CheckListItemId" && column.ColumnName != "StaticCheckListItemId" && column.ColumnName != "PositionNumber")
                {
                    columnName = column.ColumnName;
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    if (columnName == "DefectPlace")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            defectplace = Convert.ToString(ds.Tables[0].Rows[i]["DefectPlace"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"]),
                            positionnumber = Convert.ToInt32(ds.Tables[0].Rows[i]["PositionNumber"])
                        });
                    }

                    else if (columnName == "Site1")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),

                            site1 = Convert.ToString(ds.Tables[0].Rows[i]["Site1"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 1";
                    }

                    else if (columnName == "Site2")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site2 = Convert.ToString(ds.Tables[0].Rows[i]["Site2"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 2";
                    }

                    else if (columnName == "Site3")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site3 = Convert.ToString(ds.Tables[0].Rows[i]["Site3"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])

                        });
                        GetDefectCheckListItems.qflselectedname = "Site 3";
                    }

                    else if (columnName == "Site4")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site4 = Convert.ToString(ds.Tables[0].Rows[i]["Site4"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 4";
                    }

                    else if (columnName == "Site5")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            site5 = Convert.ToString(ds.Tables[0].Rows[i]["Site5"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Site 5";
                    }

                    else if (columnName == "Damage")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            damage = Convert.ToString(ds.Tables[0].Rows[i]["Damage"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "Damage";
                    }
                    else if (columnName == "DefectClass")
                    {
                        listDefectListItems.Add(new GetDefectCheckListItems
                        {
                            checklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["CheckListItemId"]),
                            staticchecklistitemid = Convert.ToString(ds.Tables[0].Rows[i]["StaticCheckListItemId"]),
                            defectclass = Convert.ToString(ds.Tables[0].Rows[i]["DefectClass"]),
                            qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackId"])
                        });
                        GetDefectCheckListItems.qflselectedname = "DefectClass";

                    }


                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    ListDefectSelectedValue.Add(new GetDefectSelectedValue
                    {
                        selectedvalue = Convert.ToString(ds.Tables[1].Rows[i]["SelectedValue"]),

                    });
                }

            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    othersiterowcount.Add(new GetOtherSiteRowCount
                    {
                        othersiterowcount = Convert.ToString(ds.Tables[2].Rows[i]["OtherSiteRowCount"]),

                    });
                }

            }

           
            GetDefectCheckListItems.getothersiterowcount = othersiterowcount;
            GetDefectCheckListItems.listchecklistdefectitems = listDefectListItems;
            GetDefectCheckListItems.listdefectselectedvalue = ListDefectSelectedValue;

            return GetDefectCheckListItems;
        }


        public UpdateCheckListItemStatus UpdateCheckListItemsNotOk(CheckListItemStatusInput CheckListItemStatusInput)
        {
            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            DataSet ds = UserDetailsDAL.UpdateCheckListItemsNotOk(CheckListItemStatusInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                UpdateCheckListItemStatus.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }

            return UpdateCheckListItemStatus;
        }





        public UsersDetails GetUserValidate(Users Input)
        {
            UsersDetails result = new UsersDetails();
            List<UserDetails> UserEmail = new List<UserDetails>();
           
            UserDetails User = new UserDetails();
            DataSet ds = new DataSet();
            UserDetailsDAL _dal = new UserDetailsDAL();
            DEncrypt encrpt = new DEncrypt();
            ds = _dal.Get_UserValidate(Input.username, encrpt.Encrypt(Input.password, Input.username));
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result.email = Convert.ToString(ds.Tables[0].Rows[0]["Email"]);
                result.username = Convert.ToString(ds.Tables[0].Rows[0]["Username"]);
                result.lastlogin = Convert.ToString(ds.Tables[0].Rows[0]["LastLogin"]);
                result.ChangePassword = Convert.ToBoolean(ds.Tables[0].Rows[0]["ChangePassword"]);
            }

            if (ds != null && ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                result.AuditTool = Convert.ToInt32(ds.Tables[1].Rows[0]["AuditTool"]);
                result.TaskTracker = Convert.ToInt32(ds.Tables[1].Rows[0]["TaskTracker"]);
                result.ConcernTracker = Convert.ToInt32(ds.Tables[1].Rows[0]["ConcernTracker"]);
                result.ELearning = Convert.ToInt32(ds.Tables[1].Rows[0]["ELearning"]);
                result.RPMS = Convert.ToInt32(ds.Tables[1].Rows[0]["RPMS"]);
                result.AutomatedQFL = Convert.ToInt32(ds.Tables[1].Rows[0]["AutomatedQFL"]);
                result.Administrator = Convert.ToInt32(ds.Tables[1].Rows[0]["Administrator"]);
                result.QmLab = Convert.ToInt32(ds.Tables[1].Rows[0]["QmLab"]);
            }

            if (ds != null && ds.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
            {
                result.LoginStatus = Convert.ToString(ds.Tables[2].Rows[0]["LoginStatus"]);
            }

            return result;
        }

        #region Change Password


        public ChangePasswordOutput GetChangePassword(ChangePassword Input)
        {
            ChangePasswordOutput _objChangePasswordOutput = new ChangePasswordOutput();
            UserDetailsDAL _dal = new UserDetailsDAL();
            DataSet ds = _dal.Get_ChangePassword(Input);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                if (Convert.ToString(ds.Tables[0].Rows[0]["Status"]) == "1")
                {
                    _objChangePasswordOutput.strStatus = "true";
                }
                else
                {
                    _objChangePasswordOutput.strStatus = "false";
                }

            }
            return _objChangePasswordOutput;
        }


        #endregion

        #region Reset Password

        public string ResetPassword(ResetPassword Input)
        {
            string Result = string.Empty;
            UserDetailsDAL _dal = new UserDetailsDAL();
            ErrorLog.WriteToLog("ResetPassword :" + Input.Email + "," + Input.RandomPassword);
            DataSet ds = _dal.Reset_Password(Input);
            ErrorLog.WriteToLog("ds Success");
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

                ErrorLog.WriteToLog(Result);
            }

            if (ds != null && ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                ErrorLog.WriteToLog("ds Table 1 Inside ");
                string EmailBody = string.Empty;
                string EmailSubject = string.Empty;

                Email _email = new Email();
                _email.ETMUserName = Convert.ToString(ds.Tables[1].Rows[0]["Name"]);
                _email.ETMUserEmailId = Convert.ToString(ds.Tables[1].Rows[0]["EmailId"]);
                _email.ETMPassword = Input.RandomPassword;
                if (ds != null && ds.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
                {
                    ErrorLog.WriteToLog("Email  Body");
                    EmailBody = MergeEmailBody(Convert.ToString(ds.Tables[2].Rows[0]["EmailBody"]), _email);
                    EmailSubject = MergeEmailBody(Convert.ToString(ds.Tables[2].Rows[0]["EmailSubject"]), _email);

                    bool isSend = SendEmail(Convert.ToString(ds.Tables[1].Rows[0]["EmailId"]), EmailSubject, EmailBody);
                }
            }

            return Result;
        }

        #endregion

        #region Email

        public string MergeEmailBody(string EmailBody, Email _email)
        {
            try
            {
                Email objEmailTemplateModel = _email;
                var regex = new Regex(@"%ETM.\S+%");
                var match = regex.Match(EmailBody);
                while (match.Success)
                {
                    var value = match.Value;
                    var memberName = value.Replace('%', ' ').Replace("ETM.", "").Trim(); //Some code you write to parse out the member name from the match value
                    var propertyInfo = objEmailTemplateModel.GetType().GetProperty(memberName);
                    var memberValue = propertyInfo.GetValue(objEmailTemplateModel, null);
                    EmailBody = EmailBody.Replace(value, memberValue != null ? memberValue.ToString() : string.Empty);
                    match = match.NextMatch();
                }
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog(ex.Message);
            }
            return EmailBody;
        }

        public bool SendEmail(string ToId, string EmailSubject, string EmailBody)
        {
            ErrorLog.WriteToLog("Send Email:" + ToId + "," + EmailSubject + "," + EmailBody);
            MailMessage MyMailMessage = new MailMessage();
            MyMailMessage.To.Add(ToId);
            //MyMailMessage.To.Add("balamurugan.kadamba_technologies@daimler.com");            
            MyMailMessage.From = new MailAddress(ConfigurationManager.AppSettings["FromId"]);
            MyMailMessage.IsBodyHtml = true;
            MyMailMessage.Body = EmailBody;
            MyMailMessage.Subject = EmailSubject;
            MyMailMessage.Priority = MailPriority.Normal;
            SmtpClient SMTPServer = new SmtpClient(ConfigurationManager.AppSettings["Host"], Convert.ToInt32(ConfigurationManager.AppSettings["Port"]));
            bool emailsent = false;
            ErrorLog.WriteToLog(SMTPServer.ToString());
            try
            {
                ErrorLog.WriteToLog(MyMailMessage.ToString());
                SMTPServer.Send(MyMailMessage);
                emailsent = true;
                ErrorLog.WriteToLog("Email Send Successfull");
            }
            catch (Exception ex)
            {
                emailsent = false;
                ErrorLog.WriteToLog("Email Send Failed");
            }
            return emailsent;
        }

        #endregion



        public GetCommunicationDetails GetCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            GetCommunicationDetails GetCommunicationDetails= new GetCommunicationDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<GetCommunicationDetails> CommunicationList = new List<GetCommunicationDetails>();

            DataSet ds = UserDetailsDAL.GetCommunicationDetails(CommunicationDetailsInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    CommunicationList.Add(new GetCommunicationDetails
                    {

                        VinId = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),
                        QFLFeedBackWorkFlowId = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedBackWorkFlowId"]),
                        GateName = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        Comments = Convert.ToString(ds.Tables[0].Rows[i]["Comments"]),
                        CompletedDate = Convert.ToString(ds.Tables[0].Rows[i]["CompletedDate"]),
                        CompletedBy = Convert.ToString(ds.Tables[0].Rows[i]["CompletedBy"]),
                        StartPosition = Convert.ToString(ds.Tables[0].Rows[i]["StartPosition"]),
                        FileName = Convert.ToString(ds.Tables[0].Rows[i]["FileName"]),
                        ModelName = Convert.ToString(ds.Tables[0].Rows[i]["ModelName"]),
                        Vinnumber = Convert.ToString(ds.Tables[0].Rows[i]["Vinnumber"]),
                       
                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                GetCommunicationDetails.IsDisabledComments = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsDisabledComments"]);

            }

            GetCommunicationDetails.ListofCommunicationDetails = CommunicationList;
            return GetCommunicationDetails;
        }



        public InsertCommunicationDetails InsertCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            InsertCommunicationDetails InsertCommunicationDetails = new InsertCommunicationDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            DataSet ds = UserDetailsDAL.InsertCommunicationDetails(CommunicationDetailsInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                InsertCommunicationDetails.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }

            return InsertCommunicationDetails;
        }







     
            public class DEncrypt
            {
                public string Encrypt(string toEncrypt, string username)
                {

                    byte[] keyArray;
                    byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);
                    MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                    keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(username.ToLower()));
                    hashmd5.Clear();
                    TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
                    tdes.Key = keyArray;
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;
                    ICryptoTransform cTransform = tdes.CreateEncryptor();
                    byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
                    tdes.Clear();
                    return Convert.ToBase64String(resultArray, 0, resultArray.Length);
                }
                public string Decrypt(string cipherString, string username)
                {
                    byte[] keyArray;
                    byte[] toDecryptArray = Convert.FromBase64String(cipherString);
                    MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                    keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(username.ToLower()));
                    hashmd5.Clear();
                    TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
                    tdes.Key = keyArray;
                    tdes.Mode = CipherMode.ECB;
                    tdes.Padding = PaddingMode.PKCS7;
                    ICryptoTransform cTransform = tdes.CreateDecryptor();
                    byte[] resultArray = cTransform.TransformFinalBlock(toDecryptArray, 0, toDecryptArray.Length);
                    tdes.Clear();
                    return UTF8Encoding.UTF8.GetString(resultArray);
                }


            }

        public EmailDetails GetSendEmail()
        {

            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            string result = string.Empty;
            DataSet ds = UserDetailsDAL.GetSendEmail();
            EmailDetails emailDetails = new EmailDetails();
            List<EmailSending> stateChanges = new List<EmailSending>();
            
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    stateChanges.Add(new EmailSending
                    {
                        SendEmailID = Convert.ToString(dr["SendEmailID"]),
                        ManagerEmail = Convert.ToString(dr["ManagerEmail"]),
                        UserEmail = Convert.ToString(dr["UserEmail"]),
                        ModifiedBy = Convert.ToString(dr["CreatedDate"]),
                        ModifiedOn = Convert.ToString(dr["CreatedBy"]),
                        Body = Convert.ToString(dr["Body"]),
                        Subject = Convert.ToString(dr["Subject"]),
                        Vinnumber = Convert.ToString(dr["Vinnumber"]),
                        VinId = Convert.ToInt32(dr["VinId"]),
                        QFLFeedBackWorkFlowId = Convert.ToInt32(dr["QFLFeedBackWorkFlowId"]),
                        

                    });

                }
                emailDetails.EmailSending = stateChanges;
            }


         
            return emailDetails;
        }

        public string UpdateSendEmail(IsEmailDetails Input)
        {

            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            StringBuilder data = new StringBuilder("");
            StringBuilder data1 = new StringBuilder("");
            EmailDetails emailDetails = new EmailDetails();
            StringBuilder data2 = new StringBuilder("");
            data.Append("<Root>");
            foreach (var sd in Input.Input)
            {
                data.Append("<row>");
                data.Append(string.Format("<Id>{0}</Id>", sd.id));
                data.Append("</row>");
            }
            data.Append("</Root>");
         

           

            string result = string.Empty;
            DataSet ds = UserDetailsDAL.UpdateSendEmail(data.ToString());
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }

            return result;
        }



        public CheckListItems GetEmailNotificationCheckListItems(CheckListItemInput CheckListItemInput)
        {
            CheckListItems GetCheckListItems = new CheckListItems();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<CheckListItems> ChecklistItems = new List<CheckListItems>();
            List<CheckListStatus> checkListStatus = new List<CheckListStatus>();
            List<blankcheckitems> blankcheckitems = new List<blankcheckitems>();
            List<StandardMasterItems> standardmasteritem = new List<StandardMasterItems>();
            List<GetDefectCheckListForRework> GetDefectCheckListForRework = new List<GetDefectCheckListForRework>();
            List<GetDefectPlaceCheckList> GetDefectPlaceCheckList = new List<GetDefectPlaceCheckList>();

            DataSet ds = UserDetailsDAL.GetEmailNotificationCheckListItems(CheckListItemInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    ChecklistItems.Add(new CheckListItems
                    {
                       
                        checklistitemid = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckListItemId"]),
                        inspectionitem = Convert.ToString(ds.Tables[0].Rows[i]["InspectionItem"]),
                        checkitems = Convert.ToString(ds.Tables[0].Rows[i]["CheckItems"]),
                        checklistitemstatusid = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckListItemStatusId"]),
                        vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VINId"]),
                        qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[0].Rows[i]["QFLFeedbackWorkflowId"]),
                        statichecklistitemid = Convert.ToInt32(ds.Tables[0].Rows[i]["StaticCheckItemId"]),
                        GateName = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        Vinnumber = Convert.ToString(ds.Tables[0].Rows[i]["Vinnumber"]),
                        Site1Image = Convert.ToString(ds.Tables[0].Rows[i]["Site1Image"]),
                        ReworkModifiedBy = Convert.ToString(ds.Tables[0].Rows[i]["ReworkModifiedBy"]),
                        ReworkModifiedDate = Convert.ToString(ds.Tables[0].Rows[i]["ReworkModifiedDate"]),

                    });
                }
            }


          



            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    GetDefectCheckListForRework.Add(new GetDefectCheckListForRework
                    {

                        checklistitemid = Convert.ToInt32(ds.Tables[1].Rows[i]["CheckListItemId"]),
                        qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[1].Rows[i]["QFLFeedbackWorkflowId"]),
                        staticchecklistitemid = Convert.ToInt32(ds.Tables[1].Rows[i]["StaticCheckItemId"]),
                        inspectionitem = Convert.ToString(ds.Tables[1].Rows[i]["InspectionItem"]),
                        site1 = Convert.ToString(ds.Tables[1].Rows[i]["Site1"]),
                        site2 = Convert.ToString(ds.Tables[1].Rows[i]["Site2"]),
                        site3 = Convert.ToString(ds.Tables[1].Rows[i]["Site3"]),
                        site4 = Convert.ToString(ds.Tables[1].Rows[i]["Site4"]),
                        site5 = Convert.ToString(ds.Tables[1].Rows[i]["Site5"]),
                        damage = Convert.ToString(ds.Tables[1].Rows[i]["Damage"]),
                        defectplace = Convert.ToString(ds.Tables[1].Rows[i]["DefectPlace"]),
                        defectclass = Convert.ToString(ds.Tables[1].Rows[i]["DefectClass"]),
                        vinid = Convert.ToInt32(ds.Tables[1].Rows[i]["VinId"]),


                    });
                }
            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    GetDefectPlaceCheckList.Add(new GetDefectPlaceCheckList
                    {

                        defectiveplace = Convert.ToString(ds.Tables[2].Rows[i]["DefectPlace"]),
                        qflfeedbackworkflowid = Convert.ToInt32(ds.Tables[2].Rows[i]["QFLFeedbackWorkflowId"]),
                        vinid = Convert.ToInt32(ds.Tables[2].Rows[i]["VinId"]),
                        vinnumber = Convert.ToString(ds.Tables[2].Rows[i]["Vinnumber"])

                    });
                }
            }
            GetCheckListItems.GetDefectPlaceCheckList = GetDefectPlaceCheckList;


            GetCheckListItems.listofchecklistitems = ChecklistItems;

            GetCheckListItems.DefectCheckListForRework = GetDefectCheckListForRework;






            return GetCheckListItems;
        }


        public InsertUpdateCheckListItemImages InsertUpdateCheckListItemImages(CheckListItemImageInput CheckListItemImageInput)
        {
            InsertUpdateCheckListItemImages InsertUpdateCheckListItemImages = new InsertUpdateCheckListItemImages();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            DataSet ds = UserDetailsDAL.InsertUpdateCheckListItemImages(CheckListItemImageInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                InsertUpdateCheckListItemImages.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }


            return InsertUpdateCheckListItemImages;
        }


        public GetCheckListItemImage GetCheckListItemImage(CheckListItemImageInput CheckListItemImageInput)
        {
            GetCheckListItemImage GetCheckListItemImage = new GetCheckListItemImage();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<GetCheckListItemImage> CheckItemImageList = new List<GetCheckListItemImage>();
            List<GetCheckListItemImage> PaintingCheckItemDefectList = new List<GetCheckListItemImage>();
           
            
            DataSet ds = UserDetailsDAL.GetCheckListItemImage(CheckListItemImageInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    CheckItemImageList.Add(new GetCheckListItemImage
                    {

                        CheckItemImageId = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckItemImageId"]),
                        Vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),
                        Vinnumber = Convert.ToString(ds.Tables[0].Rows[i]["Vinnumber"]),
                        LineId = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        ImageFileName = Convert.ToString(ds.Tables[0].Rows[i]["ImageFileName"]),
                        QgateId = Convert.ToInt32(ds.Tables[0].Rows[i]["QgateId"]),
                        DynamicCount = Convert.ToInt32(ds.Tables[0].Rows[i]["DynamicCount"]),
                        UploadedFileName = Convert.ToString(ds.Tables[0].Rows[i]["UploadedFileName"]),
                       

                    });
                }
            }






            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    PaintingCheckItemDefectList.Add(new GetCheckListItemImage
                    {

                        CheckItemImageId = Convert.ToInt32(ds.Tables[1].Rows[i]["CheckItemImageId"]),
                        CheckItemDefectId = Convert.ToInt32(ds.Tables[1].Rows[i]["CheckItemDefectId"]),
                        DamageValue = Convert.ToString(ds.Tables[1].Rows[i]["Damage"]),
                        DefectClass = Convert.ToString(ds.Tables[1].Rows[i]["DefectClass"]),
                        DamageImage = Convert.ToString(ds.Tables[1].Rows[i]["DefectFileName"]),
                        Vinnumber = Convert.ToString(ds.Tables[1].Rows[i]["Vinnumber"]),
                        MarginTop = Convert.ToInt32(ds.Tables[1].Rows[i]["MarginTop"]),
                        MarginLeft = Convert.ToString(ds.Tables[1].Rows[i]["MarginLeft"]),
                        PaintingOrderNo = Convert.ToInt32(ds.Tables[1].Rows[i]["PaintingOrderNo"]),
                        PaintingImage = Convert.ToString(ds.Tables[1].Rows[i]["PaintingImage"]),
                        PaintingColor = Convert.ToString(ds.Tables[1].Rows[i]["PaintingColor"]),
                        PointX = Convert.ToString(ds.Tables[1].Rows[i]["PointX"]),

                    });
                }
            }


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                GetCheckListItemImage.result = Convert.ToString(ds.Tables[2].Rows[0]["Result"]);
                GetCheckListItemImage.iscompleted = Convert.ToBoolean(ds.Tables[2].Rows[0]["IsCompleted"]);
            }


            GetCheckListItemImage.ListOfCheckListItemImage = CheckItemImageList;


            GetCheckListItemImage.PaintingCheckItemDefect = PaintingCheckItemDefectList;
            return GetCheckListItemImage;
        }

        public DeleteCheckListItemImages DeleteCheckListItemImages(CheckListItemImageInput CheckListItemImageInput)
        {
            DeleteCheckListItemImages DeleteCheckListItemImages = new DeleteCheckListItemImages();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            DataSet ds = UserDetailsDAL.DeleteCheckListItemImages(CheckListItemImageInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                DeleteCheckListItemImages.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }


            return DeleteCheckListItemImages;
        }



        public GetCheckListItemImage GetCheckListItemImagesForRework(CheckListItemImageInput CheckListItemImageInput)
        {
            GetCheckListItemImage GetCheckListItemImage = new GetCheckListItemImage();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<GetCheckListItemImage> CheckItemImageList = new List<GetCheckListItemImage>();
            List<GetCheckListItemImage> PaintingCheckItemDefectList = new List<GetCheckListItemImage>();


            DataSet ds = UserDetailsDAL.GetCheckListItemImagesForRework(CheckListItemImageInput);


 
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    PaintingCheckItemDefectList.Add(new GetCheckListItemImage
                    {

                        CheckItemImageId = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckItemImageId"]),
                        CheckItemDefectId = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckItemDefectId"]),
                        DamageValue = Convert.ToString(ds.Tables[0].Rows[i]["Damage"]),
                        DefectClass = Convert.ToString(ds.Tables[0].Rows[i]["DefectClass"]),
                        DamageImage = Convert.ToString(ds.Tables[0].Rows[i]["DefectFileName"]),
                        Vinnumber = Convert.ToString(ds.Tables[0].Rows[i]["Vinnumber"]),
                        MarginTop = Convert.ToInt32(ds.Tables[0].Rows[i]["MarginTop"]),
                        MarginLeft = Convert.ToString(ds.Tables[0].Rows[i]["MarginLeft"]),
                        PaintingOrderNo = Convert.ToInt32(ds.Tables[0].Rows[i]["PaintingOrderNo"]),
                        PaintingImage = Convert.ToString(ds.Tables[0].Rows[i]["PaintingImage"]),
                        GateName = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        CompletedDate = Convert.ToString(ds.Tables[0].Rows[i]["CreatedDate"]),
                        CompletedBy = Convert.ToString(ds.Tables[0].Rows[i]["CreatedBy"]),
                        ImageFileName = Convert.ToString(ds.Tables[0].Rows[i]["ImageFileName"]),
                        CheckListItemStatusId = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckListItemStatusId"]),
                        NotOkUploadImageFORPaint = Convert.ToString(ds.Tables[0].Rows[i]["NotOkUploadImageFORPaint"]),
                        Vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),
                        IsCommunication = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsCommunication"]),
                        isreexamflg = Convert.ToBoolean(ds.Tables[0].Rows[i]["IsReExamFlg"]),
                        ReExaminationOrderNo = Convert.ToInt32(ds.Tables[0].Rows[i]["ReExaminationOrderNo"]),

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                GetCheckListItemImage.isreworkcompleted = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsReworkCompleted"]);
                GetCheckListItemImage.isreexaminationcompleted = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsReExaminationCompleted"]);
                GetCheckListItemImage.IsEnabledReExamination = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsEnabledReExamination"]);
            }



            GetCheckListItemImage.PaintingCheckItemDefect = PaintingCheckItemDefectList;
            return GetCheckListItemImage;
        }

        public InsertUpdateCheckListItemImages UpdateImageFileName(CheckListItemImageInput CheckListItemImageInput)
        {
            InsertUpdateCheckListItemImages UpdateImageFileName = new InsertUpdateCheckListItemImages();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            DataSet ds = UserDetailsDAL.UpdateImageFileName(CheckListItemImageInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                UpdateImageFileName.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }


            return UpdateImageFileName;
        }



        public GetCommunicationDetails GetPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            GetCommunicationDetails GetCommunicationDetails = new GetCommunicationDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            List<GetCommunicationDetails> CommunicationList = new List<GetCommunicationDetails>();

            DataSet ds = UserDetailsDAL.GetPaintingCommunicationDetails(CommunicationDetailsInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    CommunicationList.Add(new GetCommunicationDetails
                    {

                        VinId = Convert.ToInt32(ds.Tables[0].Rows[i]["VinId"]),
                        CheckItemDefectId = Convert.ToInt32(ds.Tables[0].Rows[i]["CheckItemDefectId"]),
                        GateName = Convert.ToString(ds.Tables[0].Rows[i]["GateName"]),
                        Comments = Convert.ToString(ds.Tables[0].Rows[i]["Comments"]),
                        CompletedDate = Convert.ToString(ds.Tables[0].Rows[i]["CompletedDate"]),
                        CompletedBy = Convert.ToString(ds.Tables[0].Rows[i]["CompletedBy"]),
                        StartPosition = Convert.ToString(ds.Tables[0].Rows[i]["StartPosition"]),

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                GetCommunicationDetails.IsDisabledComments = Convert.ToBoolean(ds.Tables[1].Rows[0]["IsDisabledComments"]);

            }

            GetCommunicationDetails.ListofCommunicationDetails = CommunicationList;
            return GetCommunicationDetails;
        }



        public InsertCommunicationDetails InsertPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            InsertCommunicationDetails InsertCommunicationDetails = new InsertCommunicationDetails();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();

            DataSet ds = UserDetailsDAL.InsertPaintingCommunicationDetails(CommunicationDetailsInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                InsertCommunicationDetails.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }

            return InsertCommunicationDetails;
        }


        public UpdateCheckListItemStatus UpdateCheckListItemStatusForPainting(CheckListItemStatusInput CheckListItemStatusInput)
        {
            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            UserDetailsDAL UserDetailsDAL = new UserDetailsDAL();
            List<UpdateCheckListItemStatus> Status = new List<UpdateCheckListItemStatus>();
            DataSet ds = UserDetailsDAL.UpdateCheckListItemStatusForPainting(CheckListItemStatusInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                UpdateCheckListItemStatus.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    Status.Add(new UpdateCheckListItemStatus
                    {
                        Status = Convert.ToString(ds.Tables[1].Rows[i]["Status"]),
                       

                    });
                }
            }
            UpdateCheckListItemStatus.UpdateCheckListItem = Status;
            return UpdateCheckListItemStatus;
        }



    }


}