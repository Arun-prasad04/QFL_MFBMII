using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using MFBMQFLAPI.JsonClass;
using System.Data.SqlClient;

namespace MFBMQFLAPI.DAL
{
    public class MasterDAL : DataComponent
    {
     
        #region QGate Methods

        public DataSet InsertUpdateQgatemaster(QgatemasterInput QgatemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateQGateMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(QgatemasterInput.userid));
            cmd.Parameters.AddWithValue("@RoleId", Convert.ToInt32(QgatemasterInput.roleid));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(QgatemasterInput.mode));
            cmd.Parameters.AddWithValue("@QGateId", Convert.ToInt32(QgatemasterInput.qgateid));
            cmd.Parameters.AddWithValue("@QGateName", Convert.ToString(QgatemasterInput.qgatename));
            cmd.Parameters.AddWithValue("@LineId", Convert.ToInt32(QgatemasterInput.lineid));
            cmd.Parameters.AddWithValue("@Rework", Convert.ToString(QgatemasterInput.rework));
            cmd.Parameters.AddWithValue("@ReExaminationGateId", Convert.ToInt32(QgatemasterInput.ReExaminationGateId));
            cmd.Parameters.AddWithValue("@QgateColor", Convert.ToString(QgatemasterInput.QgateColor));
            //cmd.Parameters.AddWithValue("@OrderXml", Convert.ToString(OrderXml));
            return SelectCmd(cmd, sql_cs);
        }

        #endregion
      
        #region GetQGateMaster Methods
        public DataSet GetQGate_MasterDetails(QgatemasterInput QgatemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_QGateMasterDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(QgatemasterInput.userid));
            cmd.Parameters.AddWithValue("@RoleId", Convert.ToInt32(QgatemasterInput.roleid));
          
            return SelectCmd(cmd, sql_cs);
        }
        public DataSet ReOrderQgates(string ReOrderQgates)
        {
            SqlCommand cmd = new SqlCommand("MSP_ReorderQGateMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@OrderXml", Convert.ToString(ReOrderQgates));
            return SelectCmd(cmd, sql_cs);
        }
        #endregion

        #region StandardMasterADDUpdate Methods

        public DataSet AddUpdateStandardMaster(StandardModel StandardMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddEditStandardMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StandardId", Convert.ToInt32(StandardMasterInput.standardid));
            cmd.Parameters.AddWithValue("@StandardName", Convert.ToString(StandardMasterInput.standardname));
            cmd.Parameters.AddWithValue("@FileName", Convert.ToString(StandardMasterInput.filename));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(StandardMasterInput.userid));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(StandardMasterInput.mode));
            cmd.Parameters.AddWithValue("@FileGUID", Convert.ToString(StandardMasterInput.fileguid));
            cmd.Parameters.AddWithValue("@FileSize", Convert.ToString(StandardMasterInput.filesize));
            cmd.Parameters.AddWithValue("@PlantID", Convert.ToInt32(StandardMasterInput.plantid));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion

        #region GetStandardMasterDetails Methods

        public DataSet GetStandardMasterDetails(StandardModel StandardMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_StandardMasterDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StandardId", Convert.ToInt32(StandardMasterInput.standardid));
            cmd.Parameters.AddWithValue("@PlantID", Convert.ToInt32(StandardMasterInput.plantid));
            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        #region InsertVinMaster Methods

        public DataSet InsertUpdateVin_master(VinMasterInput vinMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateVINMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VINId", Convert.ToInt32(vinMasterInput.vinid));
            cmd.Parameters.AddWithValue("@VINNumber", Convert.ToString(vinMasterInput.vinnumber));
            cmd.Parameters.AddWithValue("@ModelId", Convert.ToInt64(vinMasterInput.modelid));
            cmd.Parameters.AddWithValue("@VariantId", Convert.ToInt32(vinMasterInput.variantid));
            cmd.Parameters.AddWithValue("@QGateId", Convert.ToInt64(vinMasterInput.qgateid));
            cmd.Parameters.AddWithValue("@IsActive", Convert.ToBoolean(vinMasterInput.isactive));
            cmd.Parameters.AddWithValue("@CreatedBy", Convert.ToInt32(vinMasterInput.createdby));
            cmd.Parameters.AddWithValue("@MODE", Convert.ToString(vinMasterInput.mode));
            return SelectCmd(cmd, sql_cs);
        }

        #endregion

        #region GetVinMaster Methods

        public DataSet GetVin_MasterDetails(VinMasterInput GetVinMaster_Output)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetVINMasterDetail", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VINId", Convert.ToInt32(GetVinMaster_Output.vinid));
            cmd.Parameters.AddWithValue("@VINNumber", Convert.ToInt32(GetVinMaster_Output.vinnumber));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        
        #region InsertDefectPlaceMaster Methods

        public DataSet InsertUpdateDefect_Placemaster(DefectPlaceMasterInput DefectPlacemasterInput, string DefectItemXml)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateDefectPlaceMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@DefectPlaceId", Convert.ToInt32(DefectPlacemasterInput.defectplaceid));
            cmd.Parameters.AddWithValue("@DefectPlaceName", Convert.ToString(DefectPlacemasterInput.defectplacename));
            cmd.Parameters.AddWithValue("@IsActive", Convert.ToBoolean(DefectPlacemasterInput.isactive));
            cmd.Parameters.AddWithValue("@CreatedBy", Convert.ToInt32(DefectPlacemasterInput.createdby));
            cmd.Parameters.AddWithValue("@MODE", Convert.ToString(DefectPlacemasterInput.mode));
            cmd.Parameters.AddWithValue("@ItemXml",Convert.ToString(DefectItemXml));
            cmd.Parameters.AddWithValue("@PlantID", Convert.ToInt32(DefectPlacemasterInput.plantid));
           
            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        
        #region InsertDefectPlaceMaster Methods

        public DataSet GetDefect_Placemaster(DefectPlaceMasterInput DefectPlacemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetDefectPlaceMasterDetail", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@DefectPlaceId", Convert.ToInt32(DefectPlacemasterInput.defectplaceid));
            cmd.Parameters.AddWithValue("@Type", Convert.ToString(DefectPlacemasterInput.type));
            cmd.Parameters.AddWithValue("@PlantID", Convert.ToInt32(DefectPlacemasterInput.plantid));
           

            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        #region InsertDefectPlaceItemMaster Methods
        public DataSet InserUpdateDefectPlaceMasterDetails(string InserUpdateDefectPlaceMaster)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateDefectPlaceItemMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ItemXml", Convert.ToString(InserUpdateDefectPlaceMaster));
            return SelectCmd(cmd, sql_cs);
        }
        #endregion

        #region InsertModelMaster Methods

        public DataSet InsertUpdate_Modelmaster(ModelMasterInput ModelemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateModelMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ModelMasterId", Convert.ToInt32(ModelemasterInput.modelmasterid));
            cmd.Parameters.AddWithValue("@Model", Convert.ToString(ModelemasterInput.model));
            cmd.Parameters.AddWithValue("@VehicleTypeId", Convert.ToInt32(ModelemasterInput.vehicletypeid));
            cmd.Parameters.AddWithValue("@PlantCode", Convert.ToInt32(ModelemasterInput.plantcode));
            cmd.Parameters.AddWithValue("@IsActive", Convert.ToBoolean(ModelemasterInput.isactive));
            cmd.Parameters.AddWithValue("@CreatedBy", Convert.ToInt32(ModelemasterInput.createdby));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(ModelemasterInput.mode));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        
        #region GetModelMaster Methods

        public DataSet GetModel_Master(ModelMasterInput ModelemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetModelMasterDetail", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VehicleTypeId", Convert.ToInt32(ModelemasterInput.vehicletypeid));
            cmd.Parameters.AddWithValue("@ModelMasterId", Convert.ToInt32(ModelemasterInput.modelmasterid));
            cmd.Parameters.AddWithValue("@Type", Convert.ToString(ModelemasterInput.type));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion

        #region InsertVehicleTypeMaster Methods

        public DataSet InsertUpdate_VehicleTypemaster(VehicleTypeMasterInput VehicleTypemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateVehicleTypeMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VehicleTypeId", Convert.ToInt32(VehicleTypemasterInput.vehicletypeid));
            cmd.Parameters.AddWithValue("@VehicleType", Convert.ToString(VehicleTypemasterInput.vehicletype));
            cmd.Parameters.AddWithValue("@VehicleDescription", Convert.ToString(VehicleTypemasterInput.vehicledescription));
            cmd.Parameters.AddWithValue("@PlantCode", Convert.ToInt32(VehicleTypemasterInput.plantcode));
            cmd.Parameters.AddWithValue("@IsActive", Convert.ToBoolean(VehicleTypemasterInput.isactive));
            cmd.Parameters.AddWithValue("@CreatedBy", Convert.ToInt32(VehicleTypemasterInput.createdby));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(VehicleTypemasterInput.mode));
            cmd.Parameters.AddWithValue("@LineId", Convert.ToString(VehicleTypemasterInput.lineid));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        
        #region GetModelMaster Methods

        public DataSet GetVehicleType_Master(VehicleTypeMasterInput VehicleTypemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetVehicleTypeMasterDetail", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VehicleTypeId", Convert.ToInt32(VehicleTypemasterInput.vehicletypeid));
            cmd.Parameters.AddWithValue("@Type", Convert.ToString(VehicleTypemasterInput.type));
           

            return SelectCmd(cmd, sql_cs);
        }

        #endregion

        #region CheckList Master Methods
        public DataSet InsertUpdateCheckListmaster(CheckListMaster checkListMaster)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateCheckListMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CheckListId", checkListMaster.checklistid);
            //if(checkListMaster.modelid!=0)
            //{
            //    cmd.Parameters.AddWithValue("@ModelId", checkListMaster.modelid);
            //}
            if (checkListMaster.vehicletypeid!=0)
            {
                cmd.Parameters.AddWithValue("@VehicleTypeId", checkListMaster.vehicletypeid);
            }
            if(checkListMaster.qgateid!=0)
            {
                cmd.Parameters.AddWithValue("@QGateId", checkListMaster.qgateid);
            }
            if(checkListMaster.plantcode!=0)
            {
                cmd.Parameters.AddWithValue("@PlantCode", checkListMaster.plantcode);
            }
            if(!string.IsNullOrEmpty(checkListMaster.filename))
            {
                cmd.Parameters.AddWithValue("@Filename", checkListMaster.filename);
            }

            cmd.Parameters.AddWithValue("@IsActive", checkListMaster.isactive);
            cmd.Parameters.AddWithValue("@CreatedBy", checkListMaster.createdby);
            if (!string.IsNullOrEmpty(checkListMaster.checklistitems))
            {
                cmd.Parameters.AddWithValue("@CheckItem", checkListMaster.checklistitems);
            }
            return SelectCmd(cmd, sql_cs);
        }
        public DataSet GetCheckListHistory(int _vehicletypeId, int _qgateId, int _plantCode)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetCheckListHistory", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VehicleTypeId", _vehicletypeId);
            cmd.Parameters.AddWithValue("@QGateId", _qgateId);
            cmd.Parameters.AddWithValue("@PlantCode", _plantCode);
            return SelectCmd(cmd, sql_cs);
        }
        #endregion



     
        public DataSet VehicleAndModelmasterDetails(VehicleAndModelmasterInput VehicleAndModelmasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetVehicleAndModelDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToString(VehicleAndModelmasterInput.plantid));
            cmd.Parameters.AddWithValue("@QgateId", Convert.ToInt32(VehicleAndModelmasterInput.qgateid));
            cmd.Parameters.AddWithValue("@LineId", Convert.ToInt32(VehicleAndModelmasterInput.lineid));

            return SelectCmd(cmd, sql_cs);
        }
        

        #region CheckvaildVIN Methods

        public DataSet CheckVaild_VinMaster(VinMasterInput GetVinMaster_Output)
        {
            SqlCommand cmd = new SqlCommand("MSP_CheckValidVinNumber", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Vin_Number", Convert.ToString(GetVinMaster_Output.vinnumber));
            cmd.Parameters.AddWithValue("@Model_Number", Convert.ToString(GetVinMaster_Output.modelnumber));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion


        #region CheckvaildModelVechicle Methods

        public DataSet CheckVaild_ModelVechicle(Checkvaildmodelvehicle GMaster_Output)
        {
            SqlCommand cmd = new SqlCommand("MSP_CheckVaildMODELVechicle", con);
            cmd.CommandType = CommandType.StoredProcedure;
         
            cmd.Parameters.AddWithValue("@VehicletypeId", Convert.ToInt32(GMaster_Output.vehicletypeid));
            cmd.Parameters.AddWithValue("@vehicletype", Convert.ToString(GMaster_Output.vehicletype));
           
                cmd.Parameters.AddWithValue("@Model", Convert.ToString(GMaster_Output.model));
              
           
            cmd.Parameters.AddWithValue("@ModelID", Convert.ToString(GMaster_Output.modelmasterid));


            return SelectCmd(cmd, sql_cs);
        }

        public bool UpdateBlankCheckItem(string CheckItem, long checklistItemId, long staticchecklistItemId, int vinId, int qgateId)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_UpdateBlankCheckItem", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ChecklistItemId", checklistItemId);
            cmd.Parameters.AddWithValue("@StaticCheckListItem", staticchecklistItemId);
            
            cmd.Parameters.AddWithValue("@CheckItem", CheckItem);
            cmd.Parameters.AddWithValue("@vinId", vinId);
            cmd.Parameters.AddWithValue("@qgateId", qgateId);
            return ExecuteCmd(cmd, sql_cs);
        }

        #endregion
        #region DownloaadStandardMasterDetails Methods

        public DataSet DownloaadStandardMasterDetails(StandardModel StandardMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetDownloadStandardMasterFile", con);
            cmd.CommandType = CommandType.StoredProcedure;
          
            cmd.Parameters.AddWithValue("@StandardName", Convert.ToString(StandardMasterInput.standardname));
            cmd.Parameters.AddWithValue("@PlantID", Convert.ToString(StandardMasterInput.plantid));
            return SelectCmd(cmd, sql_cs);
        }

        #endregion

        #region GetQGateMaster Methods
        public DataSet GetUserAccessDetails(UserAccessInput UserAccessInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_MFMBUSERSACCESS", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(UserAccessInput.PlantCode));
          
            return SelectCmd(cmd, sql_cs);
        }
        #endregion


        public DataSet GetDynamicColumnList(GetDynamicColumnInput GetDynamicColumnInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetNewProgressDynamicColumns", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(GetDynamicColumnInput.plantid));

            return SelectCmd(cmd, sql_cs);
        }


        public DataSet InsertUpdateNewProgressColumn(GetDynamicColumnInput GetDynamicColumnInput)
        {
            SqlCommand cmd = new SqlCommand("InsertUpdateNewProgressColumn", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(GetDynamicColumnInput.userid));
            cmd.Parameters.AddWithValue("@RoleId", Convert.ToInt32(GetDynamicColumnInput.roleid));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(GetDynamicColumnInput.mode));
            cmd.Parameters.AddWithValue("@NewProgressColumnId", Convert.ToInt32(GetDynamicColumnInput.NewProgressColumnId));
            cmd.Parameters.AddWithValue("@DynamicColumnName", Convert.ToString(GetDynamicColumnInput.DynamicColumnName));
            cmd.Parameters.AddWithValue("@plantid", Convert.ToString(GetDynamicColumnInput.plantid));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet ReOrderByNewProgress(string ReOrderQgates)
        {
            SqlCommand cmd = new SqlCommand("MSP_ReorderNewProgressDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@OrderXml", Convert.ToString(ReOrderQgates));
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet InsertUpdateEmailNotification(string ManagerVal,string UserVal, InsertUpdateEmailNotificationInputs InsertUpdateEmailNotificationInputs)
        {
            SqlCommand cmd = new SqlCommand("MSP_InsertUpdateEmailNotification", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ManagerValXml", Convert.ToString(ManagerVal));
            cmd.Parameters.AddWithValue("@UserValXml", Convert.ToString(UserVal));
            cmd.Parameters.AddWithValue("@userid", Convert.ToInt32(InsertUpdateEmailNotificationInputs.userid));
            cmd.Parameters.AddWithValue("@plantid", Convert.ToInt32(InsertUpdateEmailNotificationInputs.plantid));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(InsertUpdateEmailNotificationInputs.Mode));
            cmd.Parameters.AddWithValue("@Action", Convert.ToString(InsertUpdateEmailNotificationInputs.Action));
            cmd.Parameters.AddWithValue("@GroupIds", Convert.ToInt64(InsertUpdateEmailNotificationInputs.GroupId));
            cmd.Parameters.AddWithValue("@DelEmailManagerId", Convert.ToString(InsertUpdateEmailNotificationInputs.DelEmailManagerId));

            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetEmailNotificationDetails(GetEmailNotificationDetailInputs GetEmailNotificationDetailInputs)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetEmailNotificationUserdetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(GetEmailNotificationDetailInputs.Plantid));

            return SelectCmd(cmd, sql_cs);
        }


        public DataSet InsertUpdatePaintingMaster(InsertUpdatePaintingMasterInputs InsertUpdatePaintingMasterInputs)
        {
            SqlCommand cmd = new SqlCommand("MSP_InsertUpdatePaintingMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PaintingMasterId", Convert.ToInt32(InsertUpdatePaintingMasterInputs.PaintingMasterId));
            cmd.Parameters.AddWithValue("@OrderNo", Convert.ToInt32(InsertUpdatePaintingMasterInputs.OrderNo));
            cmd.Parameters.AddWithValue("@PaintingValues", Convert.ToString(InsertUpdatePaintingMasterInputs.PaintingValues));
           
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(InsertUpdatePaintingMasterInputs.plantid));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(InsertUpdatePaintingMasterInputs.userid));
            cmd.Parameters.AddWithValue("@LineId", Convert.ToInt32(InsertUpdatePaintingMasterInputs.plantid));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(InsertUpdatePaintingMasterInputs.Mode));
          
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet GetPaintingMasterDetails(GetPaintingMasterDetailsInputs GetPaintingMasterDetailsInputs)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetPaintingMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(GetPaintingMasterDetailsInputs.Plantid));

            return SelectCmd(cmd, sql_cs);
        }

        public DataSet InsertUpdateCheckListmasterForPainting(CheckListMaster checkListMaster)
        {
            SqlCommand cmd = new SqlCommand("MSP_AddUpdateCheckListMasterForPainting", con);
            cmd.CommandType = CommandType.StoredProcedure;
            
            if (checkListMaster.vehicletypeid != 0)
            {
                cmd.Parameters.AddWithValue("@VehicleTypeId", checkListMaster.vehicletypeid);
            }
            if (checkListMaster.qgateid != 0)
            {
                cmd.Parameters.AddWithValue("@QGateId", checkListMaster.qgateid);
            }
            if (checkListMaster.plantcode != 0)
            {
                cmd.Parameters.AddWithValue("@PlantCode", checkListMaster.plantcode);
            }
            if (!string.IsNullOrEmpty(checkListMaster.filename))
            {
                cmd.Parameters.AddWithValue("@Filename", checkListMaster.filename);
            }

            cmd.Parameters.AddWithValue("@IsActive", checkListMaster.isactive);
            cmd.Parameters.AddWithValue("@CreatedBy", checkListMaster.createdby);
            
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetCheckListHistoryForPainting(int _vehicletypeId, int _qgateId, int _plantCode)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetCheckListHistoryForPainting", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VehicleTypeId", _vehicletypeId);
            cmd.Parameters.AddWithValue("@QGateId", _qgateId);
            cmd.Parameters.AddWithValue("@PlantCode", _plantCode);
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet DeleteCheckListHistoryForPainting(CheckListMaster CheckListMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_DeleteCheckListHistoryForPainting", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VehicleTypeId", CheckListMasterInput.vehicletypeid);
            cmd.Parameters.AddWithValue("@QGateId", CheckListMasterInput.qgateid);
            cmd.Parameters.AddWithValue("@PlantCode", CheckListMasterInput.plantcode);
            cmd.Parameters.AddWithValue("@UserId", CheckListMasterInput.createdby);
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet DeleteActiveInActvieForPaintReExam(QgatemasterInput QgatemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_DeleteActiveInActvieForPaintReExam", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@qgateid", Convert.ToInt32(QgatemasterInput.qgateid));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(QgatemasterInput.userid));
            cmd.Parameters.AddWithValue("@Active_InActive", Convert.ToBoolean(QgatemasterInput.Active_InActive));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet DeleteActiveInActvieForMainGate(QgatemasterInput QgatemasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_DeleteActiveInActvieForMainGate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@qgateid", Convert.ToInt32(QgatemasterInput.qgateid));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(QgatemasterInput.userid));
            cmd.Parameters.AddWithValue("@Active_InActive", Convert.ToBoolean(QgatemasterInput.Active_InActive));
            return SelectCmd(cmd, sql_cs);
        }


    }
}