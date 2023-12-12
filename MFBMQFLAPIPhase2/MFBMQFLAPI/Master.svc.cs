using MFBMQFLAPI.BAL;
using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Activation;

namespace MFBMQFLAPI
{
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple)]
    public class Master : IMaster
    {

        #region InsertUpdateMethod for QGateMaster
        public QGateMasterInsert InsertUpdateQGateMaster(QgatemasterInput QgatemasterInput)
        {
            QGateMasterInsert _QGateMasterInsert = new QGateMasterInsert();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _QGateMasterInsert = MasterBAL.InsertUpdateQgatemaster(QgatemasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Qgate Master" + " " + ex.Message);
            }
            return _QGateMasterInsert;
        }
        #endregion

        #region Method for ReOrderByQgateMaster
        public ReOrderQgateMaster ReOrderByQgateMaster(ReOrderInput ReOrderInput)
        {
            ReOrderQgateMaster _ReOrderQgateMaster = new ReOrderQgateMaster();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _ReOrderQgateMaster = MasterBAL.ReOrderQgateMaster(ReOrderInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Qgate Master ReOrder" + " " + ex.Message);
            }
            return _ReOrderQgateMaster;
        }
        #endregion

        #region GetMethod For QGateMaster
        public QGateMasterInsert GetQGateMasterDetails(QgatemasterInput QgatemasterInput)
        {
            QGateMasterInsert _QGateMasterInsert = new QGateMasterInsert();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _QGateMasterInsert = MasterBAL.GetQGateMaster(QgatemasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Varaint Master" + " " + ex.Message);
            }
            return _QGateMasterInsert;
        }
        #endregion

        #region InsertUpdateMethod for StandardMaster

        public string AddUpdateStandardMaster(StandardModel StandardMasterInput)
        {
            //StandardMasterDetails _AddUpdateStandard = new StandardMasterDetails();
            string result = string.Empty;
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                result = MasterBAL.AddUpdateStandardMaster(StandardMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Standard Add And Update" + " " + ex.Message);
            }
            return result;
        }
        #endregion

        #region GetMethod For StandardMaster

        public StandardMasterDetails GetStandardMasterDetails(StandardModel StandardMasterInput)
        {
            StandardMasterDetails _GetMasterDetails = new StandardMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetMasterDetails = MasterBAL.GetStandardMasterDetails(StandardMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetStandardDetails" + " " + ex.Message);
            }
            return _GetMasterDetails;
        }
        #endregion

        #region InsertUpdateMethod for VinMaster
        public VinMasterInsert InsertupdateVinMaster(VinMasterInput VinMaster_Input)
        {
            VinMasterInsert _VinMasterInsert = new VinMasterInsert();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _VinMasterInsert = MasterBAL.InsertUpdate_Vinmaster(VinMaster_Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Qgate Master" + " " + ex.Message);
            }
            return _VinMasterInsert;
        }
        #endregion

        #region GetMethod For VinMaster
        public VinMasterInsert GetVinMaster(VinMasterInput GetVinMaster_Output)
        {
            VinMasterInsert _VinMasterInsert = new VinMasterInsert();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _VinMasterInsert = MasterBAL.GetVinMasterDetails(GetVinMaster_Output);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Varaint Master" + " " + ex.Message);
            }
            return _VinMasterInsert;
        }
        #endregion

        #region InsertUpdateMethod for DefectPlaceMaster

        public DefectPlaceMasterDetails InsertDefectPlaceMaster(DefectPlaceMasterInput DefectPlacemasterInput)
        {
            DefectPlaceMasterDetails _DefectPlaceMasterInsert = new DefectPlaceMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _DefectPlaceMasterInsert = MasterBAL.InsertUpdateDefectPlacemaster_Input(DefectPlacemasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("AddUpdate Defect Master" + " " + ex.Message);
            }
            return _DefectPlaceMasterInsert;
        }
        #endregion

        #region InsertUpdateMethod for DefectPlaceMaster
        public DefectPlaceMasterDetails InserUpdateDefectPlaceMasterDetails(DefectPlaceMasterInput DefectPlaceMasterInput)
        {
            DefectPlaceMasterDetails _InserUpdateDefectPlace = new DefectPlaceMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _InserUpdateDefectPlace = MasterBAL.InserUpdateDefectPlaceMasterDetails(DefectPlaceMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DefectPlaceItemMaster" + " " + ex.Message);
            }
            return _InserUpdateDefectPlace;
        }
        #endregion

        #region GetMethod For DefaectPlaceMaster
        public DefectPlaceMasterDetails GetDefectPlaceMaster(DefectPlaceMasterInput DefectPlacemasterInput)
        {
            DefectPlaceMasterDetails _GetDefectPlaceMaster = new DefectPlaceMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetDefectPlaceMaster = MasterBAL.GetDefectPlacemaster_Details(DefectPlacemasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get DefectPlace Master" + " " + ex.Message);
            }
            return _GetDefectPlaceMaster;
        }
        #endregion

        #region InsertUpdateMethod for ModelMaster
        public ModelMasterDetails InserUpdateModelMaster(ModelMasterInput ModeleMasterInput)
        {
            ModelMasterDetails _InserUpdateModelMaster = new ModelMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _InserUpdateModelMaster = MasterBAL.InserUpdateModelMasterDetails(ModeleMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Insert Model Master" + " " + ex.Message);
            }
            return _InserUpdateModelMaster;
        }
        #endregion

        #region GetMethod For ModelMaster
        public ModelMasterDetails GetModelMaster(ModelMasterInput ModeleMasterInput)
        {
            ModelMasterDetails _GetModelMaster = new ModelMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetModelMaster = MasterBAL.GetModelMaster_Details(ModeleMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get Model Master" + " " + ex.Message);
            }
            return _GetModelMaster;
        }
        #endregion

        #region InsertUpdateMethod for VehicleTypeMaster
        public VehicleMasterDetails InsertUpdateVehicleTypeMaster(VehicleTypeMasterInput VehicleTypeMasterInput)
        {
            VehicleMasterDetails _InserUpdateVehicleType = new VehicleMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _InserUpdateVehicleType = MasterBAL.InsertUpdateVehicleTypeMasterDetails(VehicleTypeMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("VehicleType mMaster" + " " + ex.Message);
            }
            return _InserUpdateVehicleType;
        }
        #endregion

        #region GetMethod For VehicleTypeMaster 
        public VehicleMasterDetails GetVehicleTypeMaster(VehicleTypeMasterInput VehicleTypeMasterInput)
        {
            VehicleMasterDetails _GetVehicleTypeMaster = new VehicleMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetVehicleTypeMaster = MasterBAL.GetVehicleTypeMaster_Details(VehicleTypeMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("VehicleType Master" + " " + ex.Message);
            }
            return _GetVehicleTypeMaster;
        }

        public VehicleAndModelmasterDetails VehicleAndModelmasterDetails(VehicleAndModelmasterInput VehicleAndModelmasterInput)
        {
            VehicleAndModelmasterDetails _GetVehicleAndModelmaster = new VehicleAndModelmasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetVehicleAndModelmaster = MasterBAL.VehicleAndModelmasterDetails(VehicleAndModelmasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("VehicleAndModelmasterDetails" + " " + ex.Message);
            }
            return _GetVehicleAndModelmaster;
        }


        #endregion

        #region CheckListMaster
        public string InsertUpdateCheckListmaster(CheckListMaster checkListMaster)
        {
            string result = string.Empty;
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                result = MasterBAL.InsertUpdateCheckListmaster(checkListMaster);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertUploadChecklistMaster" + " " + ex.Message);
            }
            return result;
        }
        public CheckListHistoryDetails GetCheckListHistory(CheckListMaster checkListMaster)
        {
            CheckListHistoryDetails checkListHistory = new CheckListHistoryDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                checkListHistory = MasterBAL.GetCheckListHistory(checkListMaster.vehicletypeid, checkListMaster.qgateid, checkListMaster.plantcode);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetCheckListHistory" + " " + ex.Message);
            }
            return checkListHistory;
        }
        #endregion
        

        #region GetMethod For VinMaster
        public VinMasterInsert CheckVaildVin(VinMasterInput GetVinMaster_Output)
        {
            VinMasterInsert _VinMasterInsert = new VinMasterInsert();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _VinMasterInsert = MasterBAL.CheckVaildVin(GetVinMaster_Output);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Check Vaild Vin Master" + " " + ex.Message);
            }
            return _VinMasterInsert;
        }
        #endregion
        #region GetMethod For VinMaster
        public Checkvaildmodelvehicle CheckVaildModelVechicle(Checkvaildmodelvehicle Master_Output)
        {
            Checkvaildmodelvehicle _MasterInsert = new Checkvaildmodelvehicle();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _MasterInsert = MasterBAL.CheckVaildModelVechicle(Master_Output);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Check Vaild ModelVechicle Master" + " " + ex.Message);
            }
            return _MasterInsert;
        }
        #endregion

        #region GetMethod For StandardMasterFile

        public StandardMasterDetails DownloaadStandardMasterDetails(StandardModel StandardMasterInput)
        {
            StandardMasterDetails _GetMasterDetails = new StandardMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetMasterDetails = MasterBAL.DownloaadStandardMasterDetails(StandardMasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetStandardDetails" + " " + ex.Message);
            }
            return _GetMasterDetails;
        }
        #endregion



        #region GetMethod For UserAccess

        public GetUserAccessDetails GetUserAccessDetails(UserAccessInput UserAccessInput)
        {
            GetUserAccessDetails GetUserAccessDetails = new GetUserAccessDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                GetUserAccessDetails = MasterBAL.GetUserAccessDetails(UserAccessInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetStandardDetails" + " " + ex.Message);
            }
            return GetUserAccessDetails;
        }
        #endregion


        public GetDynamicColumnList GetDynamicColumnList(GetDynamicColumnInput GetDynamicColumnInput)
        {
            GetDynamicColumnList _GetDynamicColumnList = new GetDynamicColumnList();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetDynamicColumnList = MasterBAL.GetDynamicColumnList(GetDynamicColumnInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetDynamicColumnList" + " " + ex.Message);
            }
            return _GetDynamicColumnList;
        }


        public InsertUpdateNewProgressColumn InsertUpdateNewProgressColumn(GetDynamicColumnInput GetDynamicColumnInput)
        {
            InsertUpdateNewProgressColumn _InsertUpdateNewProgressColumn = new InsertUpdateNewProgressColumn();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _InsertUpdateNewProgressColumn = MasterBAL.InsertUpdateNewProgressColumn(GetDynamicColumnInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertUpdateNewProgressColumn" + " " + ex.Message);
            }
            return _InsertUpdateNewProgressColumn;
        }


        public ReOrderByNewProgress ReOrderByNewProgress(ReOrderInputNewProgress ReOrderInputNewProgress)
        {
            ReOrderByNewProgress _ReOrderNewProgress = new ReOrderByNewProgress();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _ReOrderNewProgress = MasterBAL.ReOrderByNewProgress(ReOrderInputNewProgress);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("ReOrderByNewProgress" + " " + ex.Message);
            }
            return _ReOrderNewProgress;
        }
        public InsertUpdateEmailNotification InsertUpdateEmailNotification(InsertUpdateEmailNotificationInputs InsertUpdateEmailNotificationInputs)
        {
            InsertUpdateEmailNotification _InsertUpdateEmailNotification = new InsertUpdateEmailNotification();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _InsertUpdateEmailNotification = MasterBAL.InsertUpdateEmailNotification(InsertUpdateEmailNotificationInputs);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertUpdateEmailNotification" + " " + ex.Message);
            }
            return _InsertUpdateEmailNotification;
        }

       


        public GetEmailNotificationDetails GetEmailNotificationDetails(GetEmailNotificationDetailInputs GetEmailNotificationDetailInputs)
        {
            GetEmailNotificationDetails _GetEmailNotificationDetails = new GetEmailNotificationDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetEmailNotificationDetails = MasterBAL.GetEmailNotificationDetails(GetEmailNotificationDetailInputs);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetEmailNotificationDetails" + " " + ex.Message);
            }
            return _GetEmailNotificationDetails;
        }


        public InsertUpdatePaintingMaster InsertUpdatePaintingMaster(InsertUpdatePaintingMasterInputs InsertUpdatePaintingMasterInputs)
        {
            InsertUpdatePaintingMaster _InsertUpdatePaintingMaster = new InsertUpdatePaintingMaster();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _InsertUpdatePaintingMaster = MasterBAL.InsertUpdatePaintingMaster(InsertUpdatePaintingMasterInputs);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertUpdatePaintingMaster" + " " + ex.Message);
            }
            return _InsertUpdatePaintingMaster;
        }


        public GetPaintingMasterDetails GetPaintingMasterDetails(GetPaintingMasterDetailsInputs GetPaintingMasterDetailsInputs)
        {
            GetPaintingMasterDetails _GetPaintingMasterDetails = new GetPaintingMasterDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                _GetPaintingMasterDetails = MasterBAL.GetPaintingMasterDetails(GetPaintingMasterDetailsInputs);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetPaintingMasterDetails" + " " + ex.Message);
            }
            return _GetPaintingMasterDetails;
        }

        public string InsertUpdateCheckListmasterForPainting(CheckListMaster checkListMaster)
        {
            string result = string.Empty;
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                result = MasterBAL.InsertUpdateCheckListmasterForPainting(checkListMaster);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertUploadChecklistMasterForPainting" + " " + ex.Message);
            }
            return result;
        }

        public CheckListHistoryDetails GetCheckListHistoryForPainting(CheckListMaster checkListMaster)
        {
            CheckListHistoryDetails checkListHistory = new CheckListHistoryDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                checkListHistory = MasterBAL.GetCheckListHistoryForPainting(checkListMaster.vehicletypeid, checkListMaster.qgateid, checkListMaster.plantcode);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetCheckListHistoryForPainting" + " " + ex.Message);
            }
            return checkListHistory;
        }


        public CheckListHistoryDetails DeleteCheckListHistoryForPainting(CheckListMaster checkListMaster)
        {
            CheckListHistoryDetails checkListHistory = new CheckListHistoryDetails();
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                checkListHistory = MasterBAL.DeleteCheckListHistoryForPainting(checkListMaster);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DeleteCheckListHistoryForPainting" + " " + ex.Message);
            }
            return checkListHistory;
        }

        public string DeleteActiveInActvieForPaintReExam(QgatemasterInput QgatemasterInput)
        {
            string result = string.Empty;
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                result = MasterBAL.DeleteActiveInActvieForPaintReExam(QgatemasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DeleteActiveInActvieForPaintReExam" + " " + ex.Message);
            }
            return result;
        }

        public string DeleteActiveInActvieForMainGate(QgatemasterInput QgatemasterInput)
        {
            string result = string.Empty;
            MasterBAL MasterBAL = new MasterBAL();
            try
            {
                result = MasterBAL.DeleteActiveInActvieForMainGate(QgatemasterInput);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DeleteActiveInActvieForMainGate" + " " + ex.Message);
            }
            return result;
        }


    }
}
