using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace MFBMQFLAPI
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IMaster" in both code and config file together.
    [ServiceContract]
    public interface IMaster
    {

        [OperationContract(Name = "InsertUpdateQGateMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateQGateMaster")]
        QGateMasterInsert InsertUpdateQGateMaster(QgatemasterInput QgatemasterInput);


        [OperationContract(Name = "ReOrderByQgateMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/ReOrderByQgateMaster")]
        ReOrderQgateMaster ReOrderByQgateMaster(ReOrderInput ReOrderInput);

        
        [OperationContract(Name = "GetQGateMasterDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetQGateMasterDetails")]
        QGateMasterInsert GetQGateMasterDetails(QgatemasterInput QgatemasterInput);


        [OperationContract(Name = "AddUpdateStandardMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/AddUpdateStandardMaster")]
        string AddUpdateStandardMaster(StandardModel StandardMasterInput);

        [OperationContract(Name = "GetStandardMasterDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetStandardMasterDetails")]
        StandardMasterDetails GetStandardMasterDetails(StandardModel StandardMasterInput);

        // TODO: Add your service operations here

        [OperationContract(Name = "InsertupdateVinMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertupdateVinMaster")]
        VinMasterInsert InsertupdateVinMaster(VinMasterInput QgatemasterInput);

       
        [OperationContract(Name = "GetVinMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetVinMaster")]
        VinMasterInsert GetVinMaster(VinMasterInput QgatemasterInput);

        [OperationContract(Name = "InsertDefectPlaceMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertDefectPlaceMaster")]
        DefectPlaceMasterDetails InsertDefectPlaceMaster(DefectPlaceMasterInput DefectPlacemasterInput);

        [OperationContract(Name = "GetDefectPlaceMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDefectPlaceMaster")]
        DefectPlaceMasterDetails GetDefectPlaceMaster(DefectPlaceMasterInput DefectPlacemasterInput);

        [OperationContract(Name = "InserUpdateDefectPlaceMasterDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InserUpdateDefectPlaceMasterDetails")]
        DefectPlaceMasterDetails InserUpdateDefectPlaceMasterDetails(DefectPlaceMasterInput DefectPlaceMasterInput);

        [OperationContract(Name = "InserUpdateModelMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InserUpdateModelMaster")]
        ModelMasterDetails InserUpdateModelMaster(ModelMasterInput ModelMasterInput);

        [OperationContract(Name = "GetModelMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetModelMaster")]
        ModelMasterDetails GetModelMaster(ModelMasterInput ModelMasterInput);

        [OperationContract(Name = "InsertUpdateVehicleTypeMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateVehicleTypeMaster")]
        VehicleMasterDetails InsertUpdateVehicleTypeMaster(VehicleTypeMasterInput VehicleTypeMasterInput);


        [OperationContract(Name = "GetVehicleTypeMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetVehicleTypeMaster")]
        VehicleMasterDetails GetVehicleTypeMaster(VehicleTypeMasterInput VehicleTypeMasterInput);



        [OperationContract(Name = "VehicleAndModelmasterDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/VehicleAndModelmasterDetails")]
        VehicleAndModelmasterDetails VehicleAndModelmasterDetails(VehicleAndModelmasterInput VehicleAndModelmasterInput);

        [OperationContract(Name = "InsertUpdateCheckListmaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateCheckListmaster")]
        string InsertUpdateCheckListmaster(CheckListMaster checkListMaster);


        [OperationContract(Name = "GetCheckListHistory")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetCheckListHistory")]
        CheckListHistoryDetails GetCheckListHistory(CheckListMaster checkListMaster);

        [OperationContract(Name = "CheckVaildVin")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/CheckVaildVin")]
        VinMasterInsert CheckVaildVin(VinMasterInput QgatemasterInput);
        [OperationContract(Name = "CheckVaildModelVechicle")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/CheckVaildModelVechicle")]
        Checkvaildmodelvehicle CheckVaildModelVechicle(Checkvaildmodelvehicle masterInput);


        [OperationContract(Name = "DownloaadStandardMasterDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DownloaadStandardMasterDetails")]
        StandardMasterDetails DownloaadStandardMasterDetails(StandardModel StandardMasterInput);




        [OperationContract(Name = "GetUserAccessDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetUserAccessDetails")]
        GetUserAccessDetails GetUserAccessDetails(UserAccessInput UserAccessInput);


        [OperationContract(Name = "GetDynamicColumnList")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDynamicColumnList")]
        GetDynamicColumnList GetDynamicColumnList(GetDynamicColumnInput GetDynamicColumnInput);


        [OperationContract(Name = "InsertUpdateNewProgressColumn")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateNewProgressColumn")]
        InsertUpdateNewProgressColumn InsertUpdateNewProgressColumn(GetDynamicColumnInput GetDynamicColumnInput);

        [OperationContract(Name = "ReOrderByNewProgress")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/ReOrderByNewProgress")]
        ReOrderByNewProgress ReOrderByNewProgress(ReOrderInputNewProgress ReOrderInputNewProgress);

        [OperationContract(Name = "InsertUpdateEmailNotification")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateEmailNotification")]
        InsertUpdateEmailNotification InsertUpdateEmailNotification(InsertUpdateEmailNotificationInputs InsertUpdateEmailNotificationInputs);


        [OperationContract(Name = "GetEmailNotificationDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetEmailNotificationDetails")]
        GetEmailNotificationDetails GetEmailNotificationDetails(GetEmailNotificationDetailInputs GetEmailNotificationDetailInputs);


        [OperationContract(Name = "InsertUpdatePaintingMaster")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdatePaintingMaster")]
        InsertUpdatePaintingMaster InsertUpdatePaintingMaster(InsertUpdatePaintingMasterInputs InsertUpdatePaintingMasterInputs);



        [OperationContract(Name = "GetPaintingMasterDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetPaintingMasterDetails")]
        GetPaintingMasterDetails GetPaintingMasterDetails(GetPaintingMasterDetailsInputs GetPaintingMasterDetailsInputs);


        [OperationContract(Name = "InsertUpdateCheckListmasterForPainting")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateCheckListmasterForPainting")]
        string InsertUpdateCheckListmasterForPainting(CheckListMaster checkListMaster);



        [OperationContract(Name = "GetCheckListHistoryForPainting")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetCheckListHistoryForPainting")]
        CheckListHistoryDetails GetCheckListHistoryForPainting(CheckListMaster checkListMaster);

        [OperationContract(Name = "DeleteCheckListHistoryForPainting")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DeleteCheckListHistoryForPainting")]
        CheckListHistoryDetails DeleteCheckListHistoryForPainting(CheckListMaster checkListMaster);


        [OperationContract(Name = "DeleteActiveInActvieForPaintReExam")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DeleteActiveInActvieForPaintReExam")]
        string DeleteActiveInActvieForPaintReExam(QgatemasterInput QgatemasterInput);


        [OperationContract(Name = "DeleteActiveInActvieForMainGate")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DeleteActiveInActvieForMainGate")]
        string DeleteActiveInActvieForMainGate(QgatemasterInput QgatemasterInput);
    }
}
