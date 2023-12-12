using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace MFBMQFLAPI.JsonClass
{
    public class Master
    {
    }

    [Serializable]
    [DataContract]
    public class QgatemasterInput
    {

        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int roleid { get; set; }
        [DataMember]
        public string mode { get; set; }

        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public string qgatename { get; set; }
        [DataMember]
        public int lineid { get; set; }



        [DataMember]
        public int plantid { get; set; }
        public int status { get; set; }

        [DataMember]
        public bool rework { get; set; }
        [DataMember]
        public bool Active_InActive { get; set; }

        [DataMember]
        public int ReExaminationGateId { get; set; }
        [DataMember]
        public string QgateColor { get; set; }
    }

    [Serializable]
    [DataContract]
    public class PlantMaster
    {
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public string plantname { get; set; }

        [DataMember]
        public int plantcode { get; set; }
    }

    [Serializable]
    [DataContract]
    public class QGateMasterInsert
    {
        [DataMember]
        public string qgateinsertstatus { get; set; }
        [DataMember]
        public List<LineMaster> lline { get; set; }
        [DataMember]
        public List<GetQGateDetails> qgatedetails { get; set; }
        public List<LineMaster> line { get; internal set; }
    }


    [Serializable]
    [DataContract]
    public class GetQGateDetails
    {
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public string qgatename { get; set; }
        [DataMember]
        public int lineid { get; set; }
        [DataMember]
        public int plantid { get; set; }

        [DataMember]
        public bool rework { get; set; }
        [DataMember]
        public int accessid { get; set; }
        [DataMember]
        public int orderno { get; set; }
        [DataMember]
        public string linename { get; set; }
        [DataMember]

        public List<GetQGateDetails> getqgatemasterdetails { get; set; }

        [DataMember]
        public int ReExaminationGateId { get; set; }

        [DataMember]
        public bool Active_InActive { get; set; }
        [DataMember]
        public string QgateColor { get; set; }

    }

    [Serializable]
    [DataContract]
    public class LineMaster
    {
        [DataMember]
        public int lineid { get; set; }
        [DataMember]
        public string linename { get; set; }

        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public int characterposition { get; set; }

        [DataMember]
        public string charactervalue { get; set; }
     

      
    }

    [Serializable]
    [DataContract]
    public class ReOrderQgateMaster
    {
        [DataMember]
        public int orderno { get; set; }
        [DataMember]
        public int qgateid { get; set; }

    }

    [Serializable]
    [DataContract]
    public class ReOrderInput
    {
        [DataMember]
        public int orderno { get; set; }
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public List<ReOrderInput> order { get; set; }

    }

    [Serializable]
    [DataContract]
    public class StandardMasterDetails
    {

        [DataMember]
        public int standardid { get; set; }
        [DataMember]
        public string standardname { get; set; }
        [DataMember]
        public string filename { get; set; }
        [DataMember]
        public string fileguid { get; set; }
        [DataMember]
        public string filesize { get; set; }

        [DataMember]
        public string createdby { get; set; }
        [DataMember]
        public string CreatedDate { get; set; }
        [DataMember]
        public string ModifiedBy { get; set; }
        [DataMember]
        public string ModifiedDate { get; set; }

        [DataMember]
        public string result { get; set; }


        [DataMember]
        public List<StandardMasterDetails> liststandardmasters { get; set; }


    }

    [Serializable]
    [DataContract]
    public class StandardModel
    {
        [DataMember]
        public int standardid { get; set; }
        [DataMember]
        public string standardname { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public string mode { get; set; }
        [DataMember]
        public string filename { get; set; }
        [DataMember]
        public string fileguid { get; set; }
        [DataMember]
        public string filesize { get; set; }
        [DataMember]
        public string token { get; set; }
        [DataMember]
        public string filedata { get; set; }
        [DataMember]
        public int plantid { get; set; }




    }

    [Serializable]
    [DataContract]

    public class VinMasterInsert
    {
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public string vinnumber { get; set; }
        [DataMember]
        public Int64 modelid { get; set; }

        [DataMember]
        public int variantid { get; set; }

        [DataMember]
        public Int64 qgateid { get; set; }
        [DataMember]
        public string result { get; set; }

        [DataMember]
        public List<VinMasterInsert> vinmasterinsertdetails { get; set; }
    }


    [Serializable]
    [DataContract]
    public class VinMasterInput
    {
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public string vinnumber { get; set; }
        [DataMember]
        public string modelnumber { get; set; }
        [DataMember]
        public Int64 modelid { get; set; }

        [DataMember]
        public int variantid { get; set; }

        [DataMember]
        public Int64 qgateid { get; set; }

        [DataMember]
        public bool isactive { get; set; }
        [DataMember]
        public int createdby { get; set; }

        [DataMember]
        public string mode { get; set; }

    }


    [Serializable]
    [DataContract]
    public class DefectPlaceMasterInput
    {
        [DataMember]
        public int defectplaceid { get; set; }
        [DataMember]
        public string defectplacename { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public bool isactive { get; set; }
        [DataMember]
        public int createdby { get; set; }
        [DataMember]
        public string mode { get; set; }

        [DataMember]
        public int defectplaceitemid { get; set; }
        [DataMember]
        public string defectplaceitemname { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int positionnumber { get; set; }
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public List<DefectPlaceMasterInput> defectplacemasterinputlist { get; set; }

    }
    [Serializable]
    [DataContract]
    public class DefectPlaceMasterDetails
    {
        [DataMember]
        public int defectplaceid { get; set; }
        [DataMember]
        public string defectplacename { get; set; }
        [DataMember]
        public int defectplaceitemid { get; set; }
        [DataMember]
        public string defectplaceitemname { get; set; }
        [DataMember]
        public string result { get; set; }
        [DataMember]
        public int positionnumber { get; set; } 
        [DataMember]
        public List<DefectPlaceMasterDetails> defectplacemasterlist { get; set; }
    }

    [Serializable]
    [DataContract]
    public class ModelMasterInput
    {
        [DataMember]
        public int modelmasterid { get; set; }
        [DataMember]
        public string model { get; set; }
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public int plantcode { get; set; }
        [DataMember]
        public bool isactive { get; set; }
        [DataMember]
        public int createdby { get; set; }
        [DataMember]
        public string mode { get; set; }
        [DataMember]
        public string type { get; set; }
    }
    [Serializable]
    [DataContract]
    public class ModelMasterDetails
    {
        [DataMember]
        public int modelmasterid { get; set; }
        [DataMember]
        public string model { get; set; }
        [DataMember]
        public string result { get; set; }

        [DataMember]
        public List<ModelMasterDetails> modelmasterdetail { get; set; }
    }
    [Serializable]
    [DataContract]
    public class VehicleTypeMasterInput
    {
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public string vehicletype { get; set; }
        [DataMember]
        public string vehicledescription { get; set; }
        [DataMember]
        public int plantcode { get; set; }
        [DataMember]
        public bool isactive { get; set; }
        [DataMember]
        public int createdby { get; set; }
        [DataMember]
        public string mode { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public int lineid { get; set; }
    }

    [Serializable]
    [DataContract]
    public class VehicleMasterDetails
    {
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public string vehicletype { get; set; }
        [DataMember]
        public string vehicledescription { get; set; }
        [DataMember]
        public string result { get; set; }
        [DataMember]
        public List<VehicleMasterDetails> vehicletypemasterdetail { get; set; }
    }

    [Serializable]
    [DataContract]
    public class CheckListMaster
    {
        [DataMember]
        public int checklistid { get; set; }
        [DataMember]
        public int modelid { get; set; }
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public int plantcode { get; set; }
        [DataMember]
        public string filename { get; set; }
        [DataMember]
        public string checklistitems { get; set; }
        [DataMember]
        public byte isactive { get; set; }
        [DataMember]
        public int createdby { get; set; }
        [DataMember]
        public string mode { get; set; }
        [DataMember]
        public string result { get; set; }
    }

    [Serializable]
    [DataContract]
    public class CheckListHistoryDetails
    {
        [DataMember]
        public string filename { get; set; }
        [DataMember]
        public string vehicletypemodel { get; set; }
        [DataMember]
        public string uploadedby { get; set; }
        [DataMember]
        public string uploadeddate { get; set; }
        [DataMember]
        public List<CheckListHistoryDetails> checklisthistorydetails { get; set; }
        [DataMember]
        public string result { get; set; }
    }

    [Serializable]
    [DataContract]
    public class VehicleAndModelmasterDetails
    {
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public string vehicletype { get; set; }
        [DataMember]
        public string vehicledescription { get; set; }
        [DataMember]
        public int modelmasterid { get; set; }
        [DataMember]
        public string model { get; set; }

        [DataMember]
        public int checklistid { get; set; }
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public int plantcode { get; set; }

        [DataMember]
        public int checklistfileid { get; set; }

        [DataMember]
        public string checklistfilename { get; set; }



        [DataMember]
        public List<VehicleAndModelmasterDetails> vehicletypemasterdetail { get; set; }
        [DataMember]
        public List<VehicleAndModelmasterDetails> modelmasterdetail { get; set; }
        [DataMember]
        public List<VehicleAndModelmasterDetails> CheckListmasterList { get; set; }
        [DataMember]
        public List<ListLineMaster> ListLineMaster { get; set; }

    }

    [Serializable]
    [DataContract]
    public class VehicleAndModelmasterInput
    {
        [DataMember]
     public int plantid { get; set; }
       [DataMember]
      public int qgateid { get; set; }
        [DataMember]
      public int lineid { get; set; }
    }


    [Serializable]
    [DataContract]
    public class ListLineMaster
    {
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public int lineid { get; set; }
        [DataMember]
        public string linename { get; set; }
        [DataMember]
        public string characterposition { get; set; }
        [DataMember]
        public string charactervalue { get; set; }
    }

    [Serializable]
    [DataContract]
    public class Checkvaildmodelvehicle
    {
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public string vehicletype { get; set; }
        [DataMember]
        public string model { get; set; }
        [DataMember]
        public string result { get; set; }
        [DataMember]
        public int modelmasterid { get; set; }
        List<Checkvaildmodelvehicle> VaildDetailslist { get; set; }
    }

    [Serializable]
    [DataContract]
    public class UserAccessInput
    {

        [DataMember]
        public int PlantCode { get; set; }
      
    }

    [Serializable]
    [DataContract]
    public class GetUserAccessDetails
    {
        [DataMember]
        public string emailid { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public string accessname { get; set; }
        [DataMember]
        public string accesstype { get; set; }
        [DataMember]
        public string reaccessname { get; set; }

        [DataMember]
        public int counts { get; set; }
        [DataMember]
      public  List<GetUserAccessDetails> useremail { get; set; }
        [DataMember]
        public List<GetUserAccessDetails> userheaders { get; set; }
        [DataMember]
        public List<GetUserAccessDetails> userdetaillist { get; set; }
        [DataMember]
        public List<GetUserAccessDetails> Linelist { get; set; }

        [DataMember]
        public List<GetUserAccessDetails> AdminDetails { get; set; }
        [DataMember]
        public List<GetUserAccessDetails> UserList { get; set; }

          [DataMember]
        public int Roleid { get; set; }
      

    }

    [Serializable]
    [DataContract]
    public class GetDynamicColumnInput
    {

        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int roleid { get; set; }
        [DataMember]
        public string mode { get; set; }

        [DataMember]
        public int NewProgressColumnId { get; set; }
        [DataMember]
        public string DynamicColumnName { get; set; }
       
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public int status { get; set; }

    }


    [Serializable]
    [DataContract]
    public class GetDynamicColumnList
    {
        [DataMember]
        public int NewProgressColumnId { get; set; }
        [DataMember]
        public string DynamicColumnName { get; set; }
      
        [DataMember]
        public int plantid { get; set; }

        [DataMember]
        public int orderno { get; set; }
      
        [DataMember]
        public List<GetDynamicColumnList> GetNewProgressDynmamicColumnList { get; set; }

    }


    [Serializable]
    [DataContract]
    public class InsertUpdateNewProgressColumn
    {
        [DataMember]
        public string Columninsertstatus { get; set; }
      
        [DataMember]
        public List<GetDynamicColumnList> GetDynamicColumnList { get; set; }
    }


    [Serializable]
    [DataContract]
    public class ReOrderByNewProgress
    {
        [DataMember]
        public int orderno { get; set; }
        [DataMember]
        public int NewProgressColumnId { get; set; }

    }


    [Serializable]
    [DataContract]
    public class ReOrderInputNewProgress
    {
        [DataMember]
        public int orderno { get; set; }
        [DataMember]
        public int NewProgressColumnId { get; set; }
        [DataMember]
        public List<ReOrderInputNewProgress> order { get; set; }

    }

    [Serializable]
    [DataContract]
    public class InsertUpdateEmailNotificationInputs
    {
        [DataMember]
        public string Mode { get; set; }
        [DataMember]
        public int EmailManagerId { get; set; }
        [DataMember]
        public int EmailUserId { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public string ManagerVal { get; set; }
        [DataMember]
        public string UserVal { get; set; }
        [DataMember]
        public int GroupId { get; set; }

        [DataMember]
        public string Action { get; set; }

        [DataMember]
        public string DelEmailManagerId { get; set; }

        

        [DataMember]
        public List<InsertUpdateEmailNotificationInputs> ManagerLst { get; set; }
        [DataMember]
        public List<InsertUpdateEmailNotificationInputs> UserLst { get; set; }

    }

    [Serializable]
    [DataContract]
    public class InsertUpdateEmailNotification
    {
        [DataMember]
        public string Result { get; set; }

        public List<InsertUpdateEmailNotification> InsertUpdateEmailNotificationList { get; set; }

    }


    [Serializable]
    [DataContract]
    public class GetEmailNotificationDetailInputs
    {
        [DataMember]
        public int Plantid { get; set; }


    }


    [Serializable]
    [DataContract]
    public class GetEmailNotificationDetails
    {
        [DataMember]
        public int groupid { get; set; }
        [DataMember]
        public int EmailManagerId { get; set; }
        [DataMember]
        public int EmailUserId { get; set; }
       
        [DataMember]
        public string ManagerVal { get; set; }
        [DataMember]
        public string UserVal { get; set; }



        [DataMember]
        public List<GetEmailNotificationDetails> ManagerLst { get; set; }
        [DataMember]
        public List<GetEmailNotificationDetails> UserLst { get; set; }

        [DataMember]
        public List<GetEmailNotificationDetails> groupidlst { get; set; }

    }


    [Serializable]
    [DataContract]
    public class InsertUpdatePaintingMasterInputs
    {
        [DataMember]
        public string Mode { get; set; }
        [DataMember]
        public int PaintingMasterId { get; set; }
        [DataMember]
        public int OrderNo { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public string PaintingValues { get; set; }
       
        [DataMember]
        public int LineId { get; set; }

        [DataMember]
        public string LineName { get; set; }
    }

    [Serializable]
    [DataContract]
    public class InsertUpdatePaintingMaster
    {
        [DataMember]
        public string Result { get; set; }

        public List<InsertUpdatePaintingMaster> InsertUpdatePaintingMasterList { get; set; }

    }

    [Serializable]
    [DataContract]
    public class GetPaintingMasterDetailsInputs
    {
        [DataMember]
        public int Plantid { get; set; }


    }


    [Serializable]
    [DataContract]
    public class GetPaintingMasterDetails
    {
       
        [DataMember]
        public int PaintingMasterId { get; set; }
        [DataMember]
        public int OrderNo { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public string PaintingValues { get; set; }

        [DataMember]
        public int LineId { get; set; }
        [DataMember]
        public string LineName { get; set; }

        [DataMember]
        public string PaintingFileName { get; set; }
        [DataMember]
        public List<GetPaintingMasterDetails> GetPaintingMasterDetailsList { get; set; }
        [DataMember]
        public List<GetPaintingMasterDetails> GetLineList { get; set; }

    }

}
