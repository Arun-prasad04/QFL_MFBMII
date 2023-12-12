using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MFBMQFLAPI.JsonClass;
using MFBMQFLAPI.DAL;
using System.Data;
using System.Text;

namespace MFBMQFLAPI.BAL
{
    public class MasterBAL
    {

        #region QGate Method

        public QGateMasterInsert InsertUpdateQgatemaster(QgatemasterInput QgatemasterInput)
        {
            QGateMasterInsert QGateMasterInsert = new QGateMasterInsert();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            List<GetQGateDetails> QGateDetails = new List<GetQGateDetails>();
            List<LineMaster> LineDetails = new List<LineMaster>();

            DataSet ds = MasterDAL.InsertUpdateQgatemaster(QgatemasterInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Status = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }
            QGateMasterInsert.qgateinsertstatus = Status;

            return QGateMasterInsert;
        }

        #endregion


        #region GetQGate Method
        public QGateMasterInsert GetQGateMaster(QgatemasterInput QgatemasterInput)
        {
            QGateMasterInsert QGateMasterInsert = new QGateMasterInsert();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            List<GetQGateDetails> QGateMasterDetails = new List<GetQGateDetails>();
            List<LineMaster> LMaster = new List<LineMaster>();
            DataSet ds = MasterDAL.GetQGate_MasterDetails(QgatemasterInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    LMaster.Add(new LineMaster
                    {
                        lineid = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        linename = Convert.ToString(ds.Tables[0].Rows[i]["LineName"]),
                        plantid = Convert.ToInt32(ds.Tables[0].Rows[i]["PlantId"])
                    });
                }
            }
            QGateMasterInsert.lline = LMaster;

            if (ds != null && ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    QGateMasterDetails.Add(new GetQGateDetails
                    {
                        qgateid = Convert.ToInt32(ds.Tables[1].Rows[i]["QGateId"]),
                        qgatename = Convert.ToString(ds.Tables[1].Rows[i]["QGateName"]),
                        lineid = Convert.ToInt32(ds.Tables[1].Rows[i]["LineId"]),
                        rework = Convert.ToBoolean(ds.Tables[1].Rows[i]["Rework"]),
                        orderno = Convert.ToInt32(ds.Tables[1].Rows[i]["orderno"]),
                        ReExaminationGateId = Convert.ToInt32(ds.Tables[1].Rows[i]["ReExaminationGateId"]),
                        QgateColor = Convert.ToString(ds.Tables[1].Rows[i]["QgateColor"]),
                  // Active_InActive = Convert.ToBoolean(ds.Tables[1].Rows[i]["Active_InActive"])
                    });
                }
            }

            QGateMasterInsert.qgatedetails = QGateMasterDetails;



            return QGateMasterInsert;
        }

        #endregion

        public ReOrderQgateMaster ReOrderQgateMaster(ReOrderInput ReOrderInput)
        {
            ReOrderQgateMaster ReOrderQgate = new ReOrderQgateMaster();
            MasterDAL MasterDAL = new MasterDAL();
            StringBuilder sb = new StringBuilder();
            sb.Append("<rows>");

            if (ReOrderInput.order != null && ReOrderInput.order.Count > 0)
            {
                for (int i = 0; i < ReOrderInput.order.Count; i++)
                {
                    sb.Append("<row>");
                    sb.Append("<OrderNo>" + Convert.ToInt32(ReOrderInput.order[i].orderno) + "</OrderNo>");
                    sb.Append("<QGateId>" + Convert.ToInt32(ReOrderInput.order[i].qgateid) + "</QGateId>");
                    //sb.Append("<QGateName>" + Convert.ToString(ReOrderQgateMaster.Order[i].QGateName) + "</QGateName>");
                    sb.Append("</row>");
                }
            }
            sb.Append("</rows>");

            DataSet ds = MasterDAL.ReOrderQgates(sb.ToString());

            return ReOrderQgate;
        }


        public string AddUpdateStandardMaster(StandardModel StandardMasterInput)
        {
            //StandardMasterDetails _AddUpdateStandardMaster = new StandardMasterDetails();
            MasterDAL MasterDAL = new MasterDAL();
            string result = string.Empty;
            DataSet ds = MasterDAL.AddUpdateStandardMaster(StandardMasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }
            return result;
        }

        public StandardMasterDetails GetStandardMasterDetails(StandardModel StandardMasterInput)
        {
            StandardMasterDetails _AddUpdateStandardMaster = new StandardMasterDetails();
            MasterDAL MasterDAL = new MasterDAL();
            List<StandardMasterDetails> StandardMasterDetails = new List<StandardMasterDetails>();
            DataSet ds = MasterDAL.GetStandardMasterDetails(StandardMasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    StandardMasterDetails.Add(new StandardMasterDetails
                    {
                        standardid = Convert.ToInt32(ds.Tables[0].Rows[i]["StandardId"]),
                        standardname = Convert.ToString(ds.Tables[0].Rows[i]["StandardName"]),
                        filename = Convert.ToString(ds.Tables[0].Rows[i]["FileName"]),
                        fileguid = Convert.ToString(ds.Tables[0].Rows[i]["FileGUID"]),
                        filesize = Convert.ToString(ds.Tables[0].Rows[i]["FileSize"]),
                        createdby = Convert.ToString(ds.Tables[0].Rows[i]["CreatedBy"]),
                        CreatedDate = Convert.ToString(ds.Tables[0].Rows[i]["CreatedDate"]),
                        ModifiedBy = Convert.ToString(ds.Tables[0].Rows[i]["ModifiedBy"]),
                        ModifiedDate = Convert.ToString(ds.Tables[0].Rows[i]["ModifiedDate"])//==null?"": Convert.ToString(ds.Tables[0].Rows[i]["ModifiedDate"])


                    });
                }
            }
            _AddUpdateStandardMaster.liststandardmasters = StandardMasterDetails;
            return _AddUpdateStandardMaster;
        }


        public VinMasterInsert InsertUpdate_Vinmaster(VinMasterInput vinMasterInput)
        {
            VinMasterInsert VinMasterInsert = new VinMasterInsert();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.InsertUpdateVin_master(vinMasterInput);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                VinMasterInsert.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }
            return VinMasterInsert;

        }
        //GetVinMasterDetails
        public VinMasterInsert GetVinMasterDetails(VinMasterInput GetVinMaster_Output)
        {
            VinMasterInsert VinMasterOutput = new VinMasterInsert();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            List<VinMasterInsert> VinMasterInsertDetails = new List<VinMasterInsert>();


            DataSet ds = MasterDAL.GetVin_MasterDetails(GetVinMaster_Output);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    VinMasterInsertDetails.Add(new VinMasterInsert
                    {
                        vinid = Convert.ToInt32(ds.Tables[0].Rows[i]["VINId"]),
                        vinnumber = Convert.ToString(ds.Tables[0].Rows[i]["VINNumber"]),
                        modelid = Convert.ToInt64(ds.Tables[0].Rows[i]["ModelId"]),
                        variantid = Convert.ToInt32(ds.Tables[0].Rows[i]["VariantId"]),
                        qgateid = Convert.ToInt64(ds.Tables[0].Rows[i]["QGateId"])
                    });
                }
            }
            VinMasterOutput.vinmasterinsertdetails = VinMasterInsertDetails;

            return VinMasterOutput;
        }
        #region Defect Inert Method
        public DefectPlaceMasterDetails InsertUpdateDefectPlacemaster_Input(DefectPlaceMasterInput DefectPlacemasterInput)
        {
            DefectPlaceMasterDetails DefectPlaceMasterInsert = new DefectPlaceMasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            StringBuilder sb = new StringBuilder();
            sb.Append("<rows>");

            if (DefectPlacemasterInput.defectplacemasterinputlist != null && DefectPlacemasterInput.defectplacemasterinputlist.Count > 0)
            {
                for (int i = 0;  i < DefectPlacemasterInput.defectplacemasterinputlist.Count; i++)
                {
                    sb.Append("<row>");
                    sb.Append("<DefectPlaceItemId>" + Convert.ToInt32(DefectPlacemasterInput.defectplacemasterinputlist[i].defectplaceitemid) + "</DefectPlaceItemId>");
                    sb.Append("<DefectPlaceItemName>" + Convert.ToString(DefectPlacemasterInput.defectplacemasterinputlist[i].defectplaceitemname).Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</DefectPlaceItemName>");
                    sb.Append("<PositionNumber>" + Convert.ToString(DefectPlacemasterInput.defectplacemasterinputlist[i].positionnumber).Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</PositionNumber>");
                    sb.Append("</row>");
                }

            }
            sb.Append("</rows>");
            DataSet ds = MasterDAL.InsertUpdateDefect_Placemaster(DefectPlacemasterInput,sb.ToString());
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                DefectPlaceMasterInsert.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }
            return DefectPlaceMasterInsert;

        }
        #endregion

        #region Defect Get Method
        public DefectPlaceMasterDetails GetDefectPlacemaster_Details(DefectPlaceMasterInput DefectPlacemasterInput)
        {
            DefectPlaceMasterDetails DefectMasterInsert = new DefectPlaceMasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.GetDefect_Placemaster(DefectPlacemasterInput);
            List<DefectPlaceMasterDetails> DefectPlaceMasterList = new List<DefectPlaceMasterDetails>();

            if (DefectPlacemasterInput.type == "Master")
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DefectPlaceMasterList.Add(new DefectPlaceMasterDetails
                        {
                            defectplaceid = Convert.ToInt32(ds.Tables[0].Rows[i]["DefectPlaceId"]),
                            defectplacename = Convert.ToString(ds.Tables[0].Rows[i]["DefectPlaceName"])

                        });
                    }
                }
                DefectMasterInsert.defectplacemasterlist = DefectPlaceMasterList;
            }

            else if (DefectPlacemasterInput.type == "Detail")
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        DefectPlaceMasterList.Add(new DefectPlaceMasterDetails
                        {
                            defectplaceitemid = Convert.ToInt32(ds.Tables[0].Rows[i]["DefectPlaceItemId"]),
                            defectplaceitemname = Convert.ToString(ds.Tables[0].Rows[i]["DefectPlaceItemName"]),
                            positionnumber = Convert.ToInt32(ds.Tables[0].Rows[i]["PositionNumber"])
                        });
                    }
                }
                
                DefectMasterInsert.defectplacemasterlist = DefectPlaceMasterList;
            }
            return DefectMasterInsert;

        }
        #endregion

        public DefectPlaceMasterDetails InserUpdateDefectPlaceMasterDetails(DefectPlaceMasterInput DefectPlaceMasterInput)
        {
            DefectPlaceMasterDetails InserUpdateDefect = new DefectPlaceMasterDetails();
            MasterDAL MasterDAL = new MasterDAL();
            StringBuilder sb = new StringBuilder();
            sb.Append("<rows>");

            if (DefectPlaceMasterInput.defectplacemasterinputlist != null && DefectPlaceMasterInput.defectplacemasterinputlist.Count > 0)
            {
                for (int i = 0; i < DefectPlaceMasterInput.defectplacemasterinputlist.Count; i++)
                {
                    sb.Append("<row>");
                    sb.Append("<DefectPlaceItemId>" + Convert.ToInt32(DefectPlaceMasterInput.defectplacemasterinputlist[i].defectplaceitemid) + "</DefectPlaceItemId>");
                    sb.Append("<DefectPlaceItemName>" + Convert.ToString(DefectPlaceMasterInput.defectplacemasterinputlist[i].defectplaceitemname).Replace("&", "&amp;").Replace("<", "&lt;").Replace(">", "&gt;").Replace("\"", "&quot;").Replace("'", "&apos;") + "</DefectPlaceItemName>");
                    sb.Append("<DefectPlaceId>" + Convert.ToInt32(DefectPlaceMasterInput.defectplacemasterinputlist[i].defectplaceid) + "</DefectPlaceId>");
                    sb.Append("<UserId>" + Convert.ToInt32(DefectPlaceMasterInput.defectplacemasterinputlist[i].userid) + "</UserId>");
                    sb.Append("</row>");
                }

            }
            sb.Append("</rows>");

            DataSet ds = MasterDAL.InserUpdateDefectPlaceMasterDetails(sb.ToString());

            return InserUpdateDefect;
        }


        public ModelMasterDetails InserUpdateModelMasterDetails(ModelMasterInput ModelemasterInput)
        {
            ModelMasterDetails ModelMasterInsert = new ModelMasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.InsertUpdate_Modelmaster(ModelemasterInput);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                ModelMasterInsert.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }
            return ModelMasterInsert;

        }


        public ModelMasterDetails GetModelMaster_Details(ModelMasterInput ModelemasterInput)
        {
            ModelMasterDetails ModelMaster = new ModelMasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.GetModel_Master(ModelemasterInput);
            List<ModelMasterDetails> ModelMasterDetail = new List<ModelMasterDetails>();

            if (ModelemasterInput.type == "Master")
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        ModelMasterDetail.Add(new ModelMasterDetails
                        {
                            modelmasterid = Convert.ToInt32(ds.Tables[0].Rows[i]["ModelMasterId"]),
                            model = Convert.ToString(ds.Tables[0].Rows[i]["Model"])

                        });
                    }
                }
                ModelMaster.modelmasterdetail = ModelMasterDetail;
            }

            else if (ModelemasterInput.type == "Detail")
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        ModelMasterDetail.Add(new ModelMasterDetails
                        {
                            modelmasterid = Convert.ToInt32(ds.Tables[0].Rows[i]["ModelMasterId"]),
                            model = Convert.ToString(ds.Tables[0].Rows[i]["Model"])

                        });
                    }
                }
                ModelMaster.modelmasterdetail = ModelMasterDetail;
            }
            return ModelMaster;

        }


        public VehicleMasterDetails InsertUpdateVehicleTypeMasterDetails(VehicleTypeMasterInput VehicleTypemasterInput)
        {
            VehicleMasterDetails VehicleMasterInsert = new VehicleMasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.InsertUpdate_VehicleTypemaster(VehicleTypemasterInput);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                VehicleMasterInsert.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }
            return VehicleMasterInsert;

        }

        public VehicleMasterDetails GetVehicleTypeMaster_Details(VehicleTypeMasterInput VehicleTypemasterInput)
        {
            VehicleMasterDetails VehicleTypeMaster = new VehicleMasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.GetVehicleType_Master(VehicleTypemasterInput);
            List<VehicleMasterDetails> VehicleMaster = new List<VehicleMasterDetails>();

            if (VehicleTypemasterInput.type == "Master")
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        VehicleMaster.Add(new VehicleMasterDetails
                        {
                            vehicletypeid = Convert.ToInt32(ds.Tables[0].Rows[i]["VehicleTypeId"]),
                            vehicletype = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"]),
                            vehicledescription = Convert.ToString(ds.Tables[0].Rows[i]["VehicleDescription"])

                        });
                    }
                }
                VehicleTypeMaster.vehicletypemasterdetail = VehicleMaster;
            }

            else if (VehicleTypemasterInput.type == "Detail")
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        VehicleMaster.Add(new VehicleMasterDetails
                        {
                            vehicletypeid = Convert.ToInt32(ds.Tables[0].Rows[i]["VehicleTypeId"]),
                            vehicletype = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"]),
                            vehicledescription = Convert.ToString(ds.Tables[0].Rows[i]["VehicleDescription"])

                        });
                    }
                }
                VehicleTypeMaster.vehicletypemasterdetail = VehicleMaster;
            }
            return VehicleTypeMaster;

        }



        public VehicleAndModelmasterDetails VehicleAndModelmasterDetails(VehicleAndModelmasterInput VehicleAndModelmasterInput)
        {
            VehicleAndModelmasterDetails ModelMaster = new VehicleAndModelmasterDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            DataSet ds = MasterDAL.VehicleAndModelmasterDetails(VehicleAndModelmasterInput);
            List<VehicleAndModelmasterDetails> GetVehicleMaster = new List<VehicleAndModelmasterDetails>();
            List<VehicleAndModelmasterDetails> GetModelmaster = new List<VehicleAndModelmasterDetails>();
            List<VehicleAndModelmasterDetails> CheckListmaster = new List<VehicleAndModelmasterDetails>();
            List<ListLineMaster> ListLineMaster = new List<ListLineMaster>();

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    GetVehicleMaster.Add(new VehicleAndModelmasterDetails
                    {
                        vehicletypeid = Convert.ToInt32(ds.Tables[0].Rows[i]["VehicleTypeId"]),
                        vehicletype = Convert.ToString(ds.Tables[0].Rows[i]["VehicleType"]),
                        vehicledescription = Convert.ToString(ds.Tables[0].Rows[i]["VehicleDescription"])



                    });
                }
            }
            ModelMaster.vehicletypemasterdetail = GetVehicleMaster;


            if (ds != null && ds.Tables.Count > 1 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    GetModelmaster.Add(new VehicleAndModelmasterDetails
                    {
                        modelmasterid = Convert.ToInt32(ds.Tables[1].Rows[i]["ModelMasterId"]),
                        model = Convert.ToString(ds.Tables[1].Rows[i]["Model"]),
                        vehicletypeid = Convert.ToInt32(ds.Tables[1].Rows[i]["VehicleTypeId"]),
                        checklistid = Convert.ToInt32(ds.Tables[1].Rows[i]["CheckListId"]),
                        qgateid = Convert.ToInt32(ds.Tables[1].Rows[i]["QGateId"]),
                        plantcode = Convert.ToInt32(ds.Tables[1].Rows[i]["PlantCode"]),
                        checklistfileid = Convert.ToInt32(ds.Tables[1].Rows[i]["CheckListFileId"]),
                        checklistfilename = Convert.ToString(ds.Tables[1].Rows[i]["CheckListFileName"])

                    });
                }
            }

            ModelMaster.modelmasterdetail = GetModelmaster;

            //if (ds != null && ds.Tables.Count > 2 && ds.Tables[2].Rows.Count > 0)
            //{
            //    for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
            //    {
            //        CheckListmaster.Add(new VehicleAndModelmasterDetails
            //        {
            //            checklistid = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListId"]),
            //            modelmasterid = Convert.ToInt32(ds.Tables[2].Rows[i]["ModelId"]),
            //            vehicletypeid = Convert.ToInt32(ds.Tables[2].Rows[i]["VehicleTypeId"]),
            //            qgateid = Convert.ToInt32(ds.Tables[2].Rows[i]["QGateId"]),
            //            plantcode = Convert.ToInt32(ds.Tables[2].Rows[i]["PlantCode"]),
            //            checklistfileid = Convert.ToInt32(ds.Tables[2].Rows[i]["CheckListFileId"]),
            //            checklistfilename = Convert.ToString(ds.Tables[2].Rows[i]["CheckListFileName"])

            //        });
            //    }
            //}
            //ModelMaster.CheckListmasterList = CheckListmaster;



            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    ListLineMaster.Add(new ListLineMaster
                    {
                        lineid = Convert.ToInt32(ds.Tables[2].Rows[i]["LineId"]),
                        linename = Convert.ToString(ds.Tables[2].Rows[i]["LineName"]),
                        plantid = Convert.ToInt16(ds.Tables[2].Rows[i]["PlantId"]),
                        characterposition = Convert.ToString(ds.Tables[2].Rows[i]["CharacterPosition"]),
                        charactervalue = Convert.ToString(ds.Tables[2].Rows[i]["CharacterValue"])



                    });
                }
            }
            ModelMaster.ListLineMaster = ListLineMaster;

            return ModelMaster;

        }
        
        public string InsertUpdateCheckListmaster(CheckListMaster checkListMaster)
        {
            MasterDAL masterDAL = new MasterDAL();
            string result = string.Empty;
            StringBuilder checkItems = new StringBuilder();



            DataSet ds = masterDAL.InsertUpdateCheckListmaster(checkListMaster);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["result"]);

            }
            return result;
        }

       

        public CheckListHistoryDetails GetCheckListHistory(int _vehicletypeId, int _qgateId, int _plantCode)
        {
            CheckListHistoryDetails checkListHistory = new CheckListHistoryDetails();
            List<CheckListHistoryDetails> checkListHistoryDetails = new List<CheckListHistoryDetails>();
            MasterDAL masterDAL = new MasterDAL();
            DataSet ds = masterDAL.GetCheckListHistory(_vehicletypeId, _qgateId, _plantCode);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    checkListHistoryDetails.Add(new CheckListHistoryDetails
                    {
                        filename = Convert.ToString(ds.Tables[0].Rows[i]["CheckListFilename"]),
                        vehicletypemodel = Convert.ToString(ds.Tables[0].Rows[i]["VehicleTypeModel"]),
                        uploadedby = Convert.ToString(ds.Tables[0].Rows[i]["UploadedBy"]),
                        uploadeddate = Convert.ToDateTime(ds.Tables[0].Rows[i]["UploadedDate"]).ToString("dd/MM/yyyy hh:mm:ss tt") + " JST"
                    });
                }
            }
            checkListHistory.checklisthistorydetails = checkListHistoryDetails;
            return checkListHistory;
        }
        public VinMasterInsert CheckVaildVin(VinMasterInput GetVinMaster_Output)
        {
            VinMasterInsert VinMasterOutput = new VinMasterInsert();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            List<VinMasterInsert> VinMasterInsertDetails = new List<VinMasterInsert>();


            DataSet ds = MasterDAL.CheckVaild_VinMaster(GetVinMaster_Output);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                VinMasterOutput.result = Convert.ToString(ds.Tables[0].Rows[0]["result"]);

            }


            return VinMasterOutput;
        }


        public Checkvaildmodelvehicle CheckVaildModelVechicle(Checkvaildmodelvehicle Master_Output)
        {
            Checkvaildmodelvehicle MasterOutput = new Checkvaildmodelvehicle();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();



            DataSet ds = MasterDAL.CheckVaild_ModelVechicle(Master_Output);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                MasterOutput.result = Convert.ToString(ds.Tables[0].Rows[0]["RESULT"]);

            }


            return MasterOutput;
        }

        public UpdateCheckListItemStatus UpdateBlankCheckItem(string CheckItem, long checklistItemId,long staticchecklistItemId, int vinId, int qgateid)
        {
            UpdateCheckListItemStatus itemStatus = new UpdateCheckListItemStatus();
            MasterDAL masterDAL = new MasterDAL();
            bool result = masterDAL.UpdateBlankCheckItem(CheckItem, checklistItemId, staticchecklistItemId, vinId, qgateid);
            itemStatus.Result = Convert.ToString(result);
            return itemStatus;
        }

        public StandardMasterDetails DownloaadStandardMasterDetails(StandardModel StandardMasterInput)
        {
            StandardMasterDetails _AddUpdateStandardMaster = new StandardMasterDetails();
            MasterDAL MasterDAL = new MasterDAL();
//List<StandardMasterDetails> StandardMasterDetails = new List<StandardMasterDetails>();
            DataSet ds = MasterDAL.DownloaadStandardMasterDetails(StandardMasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {

                    _AddUpdateStandardMaster.filename = Convert.ToString(ds.Tables[0].Rows[i]["FileName"]);
                    _AddUpdateStandardMaster.fileguid = Convert.ToString(ds.Tables[0].Rows[i]["FileGUID"]);
                    
                }
            }
           // _AddUpdateStandardMaster.liststandardmasters = StandardMasterDetails;
            return _AddUpdateStandardMaster;
        }


        public GetUserAccessDetails GetUserAccessDetails(UserAccessInput UserAccessInput)
        {
            GetUserAccessDetails UserAccessDetails = new GetUserAccessDetails();
            List<GetUserAccessDetails> UserEmail = new List<GetUserAccessDetails>();
            List<GetUserAccessDetails> UserHeaders = new List<GetUserAccessDetails>();
            List<GetUserAccessDetails> UserList = new List<GetUserAccessDetails>();
            List<GetUserAccessDetails> Linedetails = new List<GetUserAccessDetails>();
            List<GetUserAccessDetails> adminlist = new List<GetUserAccessDetails>();
            List<GetUserAccessDetails> userlist = new List<GetUserAccessDetails>();
            MasterDAL masterDAL = new MasterDAL();
            DataSet ds = masterDAL.GetUserAccessDetails(UserAccessInput);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    UserEmail.Add(new GetUserAccessDetails
                    {
                        emailid = Convert.ToString(ds.Tables[0].Rows[i]["EmailId"]),
                        userid = Convert.ToInt32(ds.Tables[0].Rows[i]["UserID"]),
                        Roleid = Convert.ToInt32(ds.Tables[0].Rows[i]["Roleid"]),
                       
                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    UserHeaders.Add(new GetUserAccessDetails
                    {
                        accessname = Convert.ToString(ds.Tables[1].Rows[i]["AccessName"]),
                        accesstype = Convert.ToString(ds.Tables[1].Rows[i]["AccessType"]),
                        counts = Convert.ToInt32(ds.Tables[1].Rows[i]["Counts"]),
                        reaccessname= Convert.ToString(ds.Tables[1].Rows[i]["ReAccessName"])
                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    UserList.Add(new GetUserAccessDetails
                    {
                        userid = Convert.ToInt32(ds.Tables[2].Rows[i]["UserId"]),
                        accessname = Convert.ToString(ds.Tables[2].Rows[i]["AccessName"])

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[3].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[3].Rows.Count; i++)
                {
                    Linedetails.Add(new GetUserAccessDetails
                    {
                       
                        accesstype = Convert.ToString(ds.Tables[3].Rows[i]["AccessType"])

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[4].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[4].Rows.Count; i++)
                {
                    userlist.Add(new GetUserAccessDetails
                    {
                        accessname = Convert.ToString(ds.Tables[4].Rows[i]["AccessName"]),
                        userid = Convert.ToInt32(ds.Tables[4].Rows[i]["UserId"]),
                         reaccessname = Convert.ToString(ds.Tables[4].Rows[i]["ReAccessName"])

                    });
                }
            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[5].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[5].Rows.Count; i++)
                {
                    adminlist.Add(new GetUserAccessDetails
                    {
                        emailid = Convert.ToString(ds.Tables[5].Rows[i]["EmailId"]),
                        userid = Convert.ToInt32(ds.Tables[5].Rows[i]["UserId"])


                    });
                }
            }

            UserAccessDetails.useremail = UserEmail;
            UserAccessDetails.userheaders = UserHeaders;
            UserAccessDetails.userdetaillist = UserList;
            UserAccessDetails.AdminDetails = adminlist;
            UserAccessDetails.UserList = userlist;
            UserAccessDetails.Linelist = Linedetails;
            return UserAccessDetails;
        }


        public GetDynamicColumnList GetDynamicColumnList(GetDynamicColumnInput GetDynamicColumnInput)
        {
            GetDynamicColumnList GetDynamicColumnList = new GetDynamicColumnList();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            List<GetDynamicColumnList> DynamicColumnList = new List<GetDynamicColumnList>();
            List<LineMaster> LMaster = new List<LineMaster>();
            DataSet ds = MasterDAL.GetDynamicColumnList(GetDynamicColumnInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    DynamicColumnList.Add(new GetDynamicColumnList
                    {
                        NewProgressColumnId = Convert.ToInt32(ds.Tables[0].Rows[i]["NewProgressColumnId"]),
                        DynamicColumnName = Convert.ToString(ds.Tables[0].Rows[i]["DynamicColumnName"]),
                        orderno = Convert.ToInt32(ds.Tables[0].Rows[i]["OrderNo"]),
                    });
                }
            }

            GetDynamicColumnList.GetNewProgressDynmamicColumnList = DynamicColumnList;
            return GetDynamicColumnList;
        }

     
        public InsertUpdateNewProgressColumn InsertUpdateNewProgressColumn(GetDynamicColumnInput GetDynamicColumnInput)
        {
            InsertUpdateNewProgressColumn _InsertUpdateNewProgressColumn = new InsertUpdateNewProgressColumn();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();

            DataSet ds = MasterDAL.InsertUpdateNewProgressColumn(GetDynamicColumnInput);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                Status = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
            }
            _InsertUpdateNewProgressColumn.Columninsertstatus = Status;

            return _InsertUpdateNewProgressColumn;
        }

        public ReOrderByNewProgress ReOrderByNewProgress(ReOrderInputNewProgress ReOrderInput)
        {
            ReOrderByNewProgress ReOrderNewProgress = new ReOrderByNewProgress();
            MasterDAL MasterDAL = new MasterDAL();
            StringBuilder sb = new StringBuilder();
            sb.Append("<rows>");

            if (ReOrderInput.order != null && ReOrderInput.order.Count > 0)
            {
                for (int i = 0; i < ReOrderInput.order.Count; i++)
                {
                    sb.Append("<row>");
                    sb.Append("<OrderNo>" + Convert.ToInt32(ReOrderInput.order[i].orderno) + "</OrderNo>");
                    sb.Append("<NewProgressColumnId>" + Convert.ToInt32(ReOrderInput.order[i].NewProgressColumnId) + "</NewProgressColumnId>");
                    //sb.Append("<QGateName>" + Convert.ToString(ReOrderQgateMaster.Order[i].QGateName) + "</QGateName>");
                    sb.Append("</row>");
                }
            }
            sb.Append("</rows>");

            DataSet ds = MasterDAL.ReOrderByNewProgress(sb.ToString());

            return ReOrderNewProgress;
        }


        public InsertUpdateEmailNotification InsertUpdateEmailNotification(InsertUpdateEmailNotificationInputs InsertUpdateEmailNotificationInputs)
        {
            InsertUpdateEmailNotification _InsertUpdateEmailNotification = new InsertUpdateEmailNotification();
            MasterDAL MasterDAL = new MasterDAL();
            StringBuilder sb = new StringBuilder();
            StringBuilder sb1 = new StringBuilder();
            sb.Append("<rows>");
            sb1.Append("<rows>");

            if (InsertUpdateEmailNotificationInputs.ManagerLst != null && InsertUpdateEmailNotificationInputs.ManagerLst.Count > 0)
            {
                for (int i = 0; i < InsertUpdateEmailNotificationInputs.ManagerLst.Count; i++)
                {
                    sb.Append("<row>");
                    sb.Append("<ManagerVal>" + Convert.ToString(InsertUpdateEmailNotificationInputs.ManagerLst[i].ManagerVal) + "</ManagerVal>");
                    sb.Append("<EmailManagerId>" + Convert.ToString(InsertUpdateEmailNotificationInputs.ManagerLst[i].EmailManagerId) + "</EmailManagerId>");
                    sb.Append("</row>");
                }
            }
            sb.Append("</rows>");

            if (InsertUpdateEmailNotificationInputs.UserLst != null && InsertUpdateEmailNotificationInputs.UserLst.Count > 0)
            {
                for (int i = 0; i < InsertUpdateEmailNotificationInputs.UserLst.Count; i++)
                {
                    sb1.Append("<row>");
                    sb1.Append("<UserVal>" + Convert.ToString(InsertUpdateEmailNotificationInputs.UserLst[i].UserVal) + "</UserVal>");
                    sb1.Append("<EmailUserId>" + Convert.ToString(InsertUpdateEmailNotificationInputs.UserLst[i].EmailUserId) + "</EmailUserId>");
                    sb1.Append("</row>");
                }
            }
            sb1.Append("</rows>");

            DataSet ds = MasterDAL.InsertUpdateEmailNotification(sb.ToString(), sb1.ToString(), InsertUpdateEmailNotificationInputs);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {


                _InsertUpdateEmailNotification.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);
                        
            }
            return _InsertUpdateEmailNotification;
        }



        public GetEmailNotificationDetails GetEmailNotificationDetails(GetEmailNotificationDetailInputs GetEmailNotificationDetailInputs)
        {
            GetEmailNotificationDetails GetEmailNotificationDetails = new GetEmailNotificationDetails();
            string Status = string.Empty;
            MasterDAL MasterDAL = new MasterDAL();
            List<GetEmailNotificationDetails> ListofManager = new List<GetEmailNotificationDetails>();
            List<GetEmailNotificationDetails> ListofUser = new List<GetEmailNotificationDetails>();
            List<GetEmailNotificationDetails> Listofgroup = new List<GetEmailNotificationDetails>();
            List<LineMaster> LMaster = new List<LineMaster>();
            DataSet ds = MasterDAL.GetEmailNotificationDetails(GetEmailNotificationDetailInputs);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    Listofgroup.Add(new GetEmailNotificationDetails
                    {
                        
                        groupid = Convert.ToInt32(ds.Tables[0].Rows[i]["GroupId"]),
                    });
                }

            }



            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    ListofManager.Add(new GetEmailNotificationDetails
                    {
                        EmailManagerId = Convert.ToInt32(ds.Tables[1].Rows[i]["ManagerId"]),
                        ManagerVal = Convert.ToString(ds.Tables[1].Rows[i]["Manager"]),
                        groupid = Convert.ToInt32(ds.Tables[1].Rows[i]["GroupId"]),
                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[2].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
                {
                    ListofUser.Add(new GetEmailNotificationDetails
                    {
                        EmailManagerId = Convert.ToInt32(ds.Tables[2].Rows[i]["ManagerId"]),
                        UserVal = Convert.ToString(ds.Tables[2].Rows[i]["Users"]),
                        groupid = Convert.ToInt32(ds.Tables[2].Rows[i]["GroupId"]),
                        EmailUserId = Convert.ToInt32(ds.Tables[2].Rows[i]["UserId"]),
                    });
                }

            }


            GetEmailNotificationDetails.ManagerLst = ListofManager;
            GetEmailNotificationDetails.groupidlst = Listofgroup;
            GetEmailNotificationDetails.UserLst = ListofUser;

            return GetEmailNotificationDetails;
        }


        public InsertUpdatePaintingMaster InsertUpdatePaintingMaster(InsertUpdatePaintingMasterInputs InsertUpdatePaintingMasterInputs)
        {
            InsertUpdatePaintingMaster _InsertUpdatePaintingMaster = new InsertUpdatePaintingMaster();
            MasterDAL MasterDAL = new MasterDAL();
          
            DataSet ds = MasterDAL.InsertUpdatePaintingMaster(InsertUpdatePaintingMasterInputs);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {


                _InsertUpdatePaintingMaster.Result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }
            return _InsertUpdatePaintingMaster;
        }


        public GetPaintingMasterDetails GetPaintingMasterDetails(GetPaintingMasterDetailsInputs GetPaintingMasterDetailsInputs)
        {
            GetPaintingMasterDetails _GetPaintingMasterDetails = new GetPaintingMasterDetails();
            MasterDAL MasterDAL = new MasterDAL();
            List<GetPaintingMasterDetails> ListPaintingMasterDetails = new List<GetPaintingMasterDetails>();
            List<GetPaintingMasterDetails> ListOfLines = new List<GetPaintingMasterDetails>();
           
            DataSet ds = MasterDAL.GetPaintingMasterDetails(GetPaintingMasterDetailsInputs);


            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    ListPaintingMasterDetails.Add(new GetPaintingMasterDetails
                    {

                        PaintingMasterId = Convert.ToInt32(ds.Tables[0].Rows[i]["PaintingMasterId"]),
                        PaintingValues = Convert.ToString(ds.Tables[0].Rows[i]["PaintingValues"]),
                        OrderNo = Convert.ToInt32(ds.Tables[0].Rows[i]["OrderNo"]),
                        LineId = Convert.ToInt32(ds.Tables[0].Rows[i]["LineId"]),
                        plantid = Convert.ToInt32(ds.Tables[0].Rows[i]["Plantid"]),
                        PaintingFileName = Convert.ToString(ds.Tables[0].Rows[i]["PaintingFileName"]),
                       
                    });
                }

            }

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    ListOfLines.Add(new GetPaintingMasterDetails
                    {

                      
                        LineId = Convert.ToInt32(ds.Tables[1].Rows[i]["LineId"]),
                        LineName = Convert.ToString(ds.Tables[1].Rows[i]["LineName"]),

                    });
                }

            }



            _GetPaintingMasterDetails.GetPaintingMasterDetailsList = ListPaintingMasterDetails;
            _GetPaintingMasterDetails.GetLineList = ListOfLines;

            return _GetPaintingMasterDetails;
        }


        public string InsertUpdateCheckListmasterForPainting(CheckListMaster checkListMaster)
        {
            MasterDAL masterDAL = new MasterDAL();
            string result = string.Empty;
            StringBuilder checkItems = new StringBuilder();



            DataSet ds = masterDAL.InsertUpdateCheckListmasterForPainting(checkListMaster);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["result"]);

            }
            return result;
        }


        public CheckListHistoryDetails GetCheckListHistoryForPainting(int _vehicletypeId, int _qgateId, int _plantCode)
        {
            CheckListHistoryDetails checkListHistory = new CheckListHistoryDetails();
            List<CheckListHistoryDetails> checkListHistoryDetails = new List<CheckListHistoryDetails>();
            MasterDAL masterDAL = new MasterDAL();
            DataSet ds = masterDAL.GetCheckListHistoryForPainting(_vehicletypeId, _qgateId, _plantCode);
            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    checkListHistoryDetails.Add(new CheckListHistoryDetails
                    {
                        filename = Convert.ToString(ds.Tables[0].Rows[i]["CheckListFilename"]),
                        vehicletypemodel = Convert.ToString(ds.Tables[0].Rows[i]["VehicleTypeModel"]),
                        uploadedby = Convert.ToString(ds.Tables[0].Rows[i]["UploadedBy"]),
                        uploadeddate = Convert.ToDateTime(ds.Tables[0].Rows[i]["UploadedDate"]).ToString("dd/MM/yyyy hh:mm:ss tt") + " JST"
                    });
                }
            }
            checkListHistory.checklisthistorydetails = checkListHistoryDetails;
            return checkListHistory;
        }

        public CheckListHistoryDetails DeleteCheckListHistoryForPainting(CheckListMaster CheckListMasterInput)
        {
            CheckListHistoryDetails CheckListHistoryDetails = new CheckListHistoryDetails();
            MasterDAL masterDAL = new MasterDAL();

            DataSet ds = masterDAL.DeleteCheckListHistoryForPainting(CheckListMasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {

                CheckListHistoryDetails.result = Convert.ToString(ds.Tables[0].Rows[0]["Result"]);

            }


            return CheckListHistoryDetails;
        }


        public string DeleteActiveInActvieForPaintReExam(QgatemasterInput QgatemasterInput)
        {
            string result = string.Empty;
            MasterDAL masterDAL = new MasterDAL();

            DataSet ds = masterDAL.DeleteActiveInActvieForPaintReExam(QgatemasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["result"]);

            }

            return result;
        }


        public string DeleteActiveInActvieForMainGate(QgatemasterInput QgatemasterInput)
        {
            string result = string.Empty;
            MasterDAL masterDAL = new MasterDAL();

            DataSet ds = masterDAL.DeleteActiveInActvieForMainGate(QgatemasterInput);

            if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                result = Convert.ToString(ds.Tables[0].Rows[0]["result"]);

            }

            return result;
        }

    }

}