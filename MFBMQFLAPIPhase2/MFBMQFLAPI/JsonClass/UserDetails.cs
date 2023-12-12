using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MFBMQFLAPI.JsonClass
{
    [Serializable]
    [DataContract]
    public class UserDetails
    {
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string LastLogin { get; set; }
        [DataMember]
        public string Token { get; set; }
        [DataMember]
        public string Api { get; set; }
        [DataMember]
        public string CountryCode { get; set; }
        [DataMember]
        public int DeptId { get; set; }
        [DataMember]
        public int RoleId { get; set; }
        [DataMember]
        public List<UserAccess> AccessDetails { get; set; }
    }

    [Serializable]
    [DataContract]
    public class UserAccess
    {
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public int AccessId { get; set; }
        [DataMember]
        public string AccessName { get; set; }
        [DataMember]
        public int ToolId { get; set; }
        [DataMember]
        public string AccessType { get; set; }
    }

    [Serializable]
    [DataContract]
    public class UserDetailInputs
    {
        [DataMember]
        public string Email { get; set; }
       

    }

    [Serializable]
    [DataContract]
    public class DropDownlistDetails
    {
      
        [DataMember]
        public List<PlantMaster> Plant { get; set; }
    }
   
    [Serializable]
    [DataContract]
    public class DropdownDetailsInput
    {
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public int roleid { get; set; }
       
    }


    [Serializable]
    [DataContract]
    public class GateDetails
    {
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public string gatename { get; set; }
        [DataMember]
        public int lineid { get; set; }
        [DataMember]
        public int Rework { get; set; }
        [DataMember]
        public int orderno { get; set; }
        [DataMember]
        public int ReExaminationGateId { get; set; }
        [DataMember]
        public List<GateDetails> gatelist { get; set; }
        [DataMember]
        public List<LineMaster> linemasterdetails { get; set; }
    }

    [Serializable]
    [DataContract]
    public class CheckLineMasterInput
    {
        [DataMember]
        public string vinmodel { get; set; }
        [DataMember]
        public int plantid { get; set; }

        [DataMember]
        public int lineid { get; set; }


    }


    [Serializable]
    [DataContract]
    public class CheckListItemInput
    {
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public string modelnumber { get; set; }
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public string vinmodel { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public string mode { get; set; }
        [DataMember]
        public string checkliststatus { get; set; }

    
        
    }

    [Serializable]
    [DataContract]
    public class BlankCheckListItem
    {
        [DataMember]
        public int checklistitemid { get; set; }
        [DataMember]
        public int staticchecklistItemId { get; set; }
        
        [DataMember]
        public string checkitems { get; set; }
        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public int vinid { get; set; }
    }

    [Serializable]
    [DataContract]
    public class CheckListItems
    {
        [DataMember]
        public int checklistitemid { get; set; }

        [DataMember]
        public int statichecklistitemid { get; set; }
        [DataMember]
        public int checklistid { get; set; }
        [DataMember]

        public string inspectionitem { get; set; }
        [DataMember]
        public string checkitems { get; set; }
        [DataMember]
        public string specification { get; set; }

        [DataMember]
        public int qgateid { get; set; }
        [DataMember]
        public int vehicletypeid { get; set; }
        [DataMember]
        public int modelid { get; set; }

        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public int qflfeedbackworkflowid { get; set; }
        [DataMember]
        public int checklistitemstatusid { get; set; }        

        [DataMember]
        public string result { get; set; }
        [DataMember]
        public string standard { get; set; }
        [DataMember]
        public string actualid { get; set; }

        [DataMember]
        public string checklistitemname { get; set; }

        [DataMember]
        public string issignature { get; set; }

        [DataMember]
        public bool iscompleted { get; set; }

        [DataMember]
        public int notokcheckcount { get; set; }

        [DataMember]
        public int givennotokcount { get; set; }

        [DataMember]
        public int okcheckcount { get; set; }
        [DataMember]
        public int individualitemcount { get; set; }
        [DataMember]
        public string vinexists { get; set; }
        [DataMember]
        public bool isreworkcompleted { get; set; }
        [DataMember]
        public bool isreexaminationcompleted { get; set; }
         [DataMember]
        public bool isreexaminationcompletedjp { get; set; }

         [DataMember]
         public bool ReverCompleteOnlyAdmin { get; set; }


        [DataMember]
        public int reexaminationcount { get; set; }
        [DataMember]
        public bool isreexamsignature { get; set; }
        [DataMember]
        public bool isreexamflg { get; set; }
        [DataMember]
        public string Site1Image { get; set; }
        [DataMember]
        public string EditCheckItems { get; set; }

        [DataMember]
        public bool IsAutoFillPartName { get; set; }

        [DataMember]
        public string OriginalInspectionItem { get; set; }

        [DataMember]
        public string GateName { get; set; }


        [DataMember]
        public string ReworkModifiedBy { get; set; }


        [DataMember]
        public string ReworkModifiedDate { get; set; }

        [DataMember]
        public bool IsCommunication { get; set; }

        [DataMember]
        public bool QGReExamBackgroundColor { get; set; }

        [DataMember]
        public bool JPReExamBackgroundColor { get; set; }

        [DataMember]
        public string NotOkUploadImage { get; set; }

        [DataMember]
        public int ReworkNotificationcount { get; set; }


        [DataMember]
        public string Vinnumber { get; set; }

        [DataMember]
        public string TableName { get; set; }
        [DataMember]
        public bool Active_InActive { get; set; }
        [DataMember]
        public string QgateColor { get; set; }

        [DataMember]
        public List<CheckListItems> listofchecklistitems { get; set; }
        [DataMember]
        public List<CheckListStatus> checkliststatus { get; set; }

        [DataMember]
        public List<blankcheckitems> blankcheckitems { get; set; }

        [DataMember]
        public List<StandardMasterItems> standardmasteritems { get; set; }

        [DataMember]
        public List<GetDefectCheckListForRework> DefectCheckListForRework { get; set; }

        [DataMember]
        public List<GetDefectPlaceCheckList> GetDefectPlaceCheckList { get; set; }
    }


    [Serializable]
    [DataContract]
    public class StandardMasterItems
    {
        [DataMember]
        public string standardfilename { get; set; }


        [DataMember]
        public string standardguid { get; set; }
        [DataMember]
        public string standardname { get; set; }
    }

    [Serializable]
    [DataContract]
    public class blankcheckitems
    {
        [DataMember]
        public string spec { get; set; }
        [DataMember]
        public string inspectionitem { get; set; }
        [DataMember]
        public int checklistitemid { get; set; }
        [DataMember]
        public int qflworkflowid { get; set; }
    }


    [Serializable]
    [DataContract]
    public class CheckListStatus
    {
        [DataMember]
        public string checkliststatus { get; set; }
        [DataMember]
        public int count { get; set; }
    }

    [Serializable]
    [DataContract]
    public class CheckListItemStatusInput
    {
        [DataMember]
        public int checkitemstatus { get; set; }
        [DataMember]
        public string staticchecklistitemid { get; set; }
        [DataMember]
        public string qflfeedbackworkflowid { get; set; }
        [DataMember]
        public string checklistitemid { get; set; }
        [DataMember]
        public string gatename { get; set; }
        [DataMember]
        public string checkitemvalue { get; set; }
        [DataMember]
        public int userid { get; set; }

        [DataMember]
        public string vinnumber { get; set; }
        [DataMember]
        public string selecteddefectplace { get; set; }
        [DataMember]
        public string uploadedFileName { get; set; }

        [DataMember]
        public int CheckItemDefectId { get; set; }
        [DataMember]
        public int ReExaminationOrderNo { get; set; }
        [DataMember]
        public int Vinid { get; set; }
        [DataMember]
        public string ModelName { get; set; }
        
    }

    [Serializable]
    [DataContract]
    public class UpdateCheckListItemStatus
    {
        [DataMember]
        public string Result { get; set; }

        [DataMember]
        public int totalrecords { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public List<UpdateCheckListItemStatus> UpdateCheckListItem { get; set; }

    }

    [Serializable]
    [DataContract]
    public class GetDefectCheckListItemInput
    {
        [DataMember]
        public string checklistitemid { get; set; }
        [DataMember]
        public string staticchecklistitemid { get; set; }
        [DataMember]
        public string defectplace { get; set; }
        [DataMember]
        public string site1 { get; set; }
        [DataMember]
        public string site2 { get; set; }
        [DataMember]
        public string site3 { get; set; }
        [DataMember]
        public string site4 { get; set; }
        [DataMember]
        public string site5 { get; set; }
        [DataMember]
        public string damage { get; set; }
        [DataMember]
        public int vinid { get; set; }

        [DataMember]
        public int qflfeedbackworkflowid { get; set; }
        [DataMember]
        public int qgateid { get; set; }

    }

    [Serializable]
    [DataContract]
    public class GetDefectCheckListItems
    {
        [DataMember]
        public string checklistitemid { get; set; }

        [DataMember]
        public string staticchecklistitemid { get; set; }
        [DataMember]
        public string defectplace { get; set; }
        [DataMember]
        public string site1 { get; set; }
        [DataMember]
        public string site2 { get; set; }
        [DataMember]
        public string site3 { get; set; }
        [DataMember]
        public string site4 { get; set; }
        [DataMember]
        public string site5 { get; set; }
        [DataMember]
        public string damage { get; set; }
        [DataMember]
        public string defectclass { get; set; }

        [DataMember]
        public string qflselectedname { get; set; }
        [DataMember]
        public int qflfeedbackworkflowid { get; set; }

        [DataMember]
        public int positionnumber { get; set; }
        [DataMember]
        public string selectedvalue { get; set; }
       
        [DataMember]
        public List<GetDefectSelectedValue> listdefectselectedvalue { get; set; }

        [DataMember]
        public List<GetDefectCheckListItems> listchecklistdefectitems { get; set; }
        [DataMember]
        public List<GetOtherSiteRowCount> getothersiterowcount { get; set; }

    }

    [Serializable]
    [DataContract]
    public class GetDefectSelectedValue
    {
       
        [DataMember]
        public string selectedvalue { get; set; }

    }

    [Serializable]
    [DataContract]
    public class GetOtherSiteRowCount
    {

        [DataMember]
        public string othersiterowcount { get; set; }

    }


    [Serializable]
    [DataContract]
    public class Actualcomment
    {
        [DataMember]
        public int fileid { get; set; }
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public string staticchecklistitemid { get; set; }
        [DataMember]
        public int actualid { get; set; }
        [DataMember]
        public int checklistitemid { get; set; }
        [DataMember]
        public string actualvalue { get; set; }
        [DataMember]
        public string responsible { get; set; }
        [DataMember]
        public string damagecode { get; set; }
        [DataMember]

        public string comments { get; set; }
        [DataMember]
        public string filename { get; set; }
        [DataMember]
        public string filesize { get; set; }
        [DataMember]
        public string filedata { get; set; }
        [DataMember]
        public string guid { get; set; }
        [DataMember]
        public string result { get; set; }
        [DataMember]
        public string token { get; set; }
        [DataMember]
        public string mode { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public string filedetail { get; set; }
        [DataMember]
        public string createddate { get; set; }

        [DataMember]
        public List<Actualcomment> actualdetail { get; set; }
    }
    [Serializable]
    [DataContract]
    public class ActualcommentDetils
    {
        [DataMember]
        public string actualid { get; set; }
        [DataMember]
        public int checklistitemid { get; set; }
        [DataMember]
        public string actualvalue { get; set; }
        [DataMember]
        public string responsible { get; set; }
        [DataMember]
        public string damagecode { get; set; }
        [DataMember]
        public string comments { get; set; }
        [DataMember]
        public string result { get; set; }
        [DataMember]
        public string foldername { get; set; }
        [DataMember]
        public string createddate { get; set; }
        [DataMember]
        public string username { get; set; }
        [DataMember]
        public List<ActualcommentDetils> ActualDetail { get; set; }
        [DataMember]
       public List<Actualcomment> ActualComments { get; set; }
    }


    [Serializable]
    [DataContract]
    public class InsertSignatureInput
    {
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public string filename { get; set; }
        [DataMember]      
        public int userid { get; set; }
        [DataMember]
        public bool iscompleted { get; set; }
        [DataMember]
        public bool isreworkcompleted { get; set; }
        [DataMember]
        public bool isreexaminationcompleted { get; set; }
        [DataMember]
        public string vinnumber { get; set; }
        [DataMember]
        public string gatename { get; set; }
        [DataMember]
        public string ModelName { get; set; }


    }
    [Serializable]
    [DataContract]
    public class InsertSignature
    {
        
        [DataMember]
        public string result { get; set; }
       

    }

    [Serializable]
    [DataContract]
    public class GetSealGateDetails
    {
        [DataMember]
        public int sno { get; set; }
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public int gateid { get; set; }

        [DataMember]
        public string gatename { get; set; }

        [DataMember]
        public string completeddate { get; set; }

        [DataMember]
        public string completedby { get; set; }
        [DataMember]
        public string filename { get; set; }

        [DataMember]
        public int signatureid { get; set; }

        [DataMember]
        public int iscompleted { get; set; }

        [DataMember]
        public string completedname { get; set; }

        [DataMember]
        public int isreworkcompleted { get; set; }

        [DataMember]
        public string reworkcompletedname { get; set; }
        [DataMember]
        public string reworkcompleteddate { get; set; }

        [DataMember]
        public string reworkcompletedby { get; set; }


        [DataMember]
        public int isreexaminationcompleted { get; set; }

        [DataMember]
        public string reexaminationcompletedname { get; set; }
        [DataMember]
        public string reexaminationcompleteddate { get; set; }

        [DataMember]
        public string reexaminationcompletedby { get; set; }

        [DataMember]
        public List<GetSealGateDetails> listsealgate { get; set; }
        [DataMember]
        public List<GetSealGateDetails> listsealgate1 { get; set; }

    }

  

    [Serializable]
    [DataContract]
    public class GetSealGateDetailsInput
    {
        [DataMember]
        public string vinnumber { get; set; }
        [DataMember]
        public string gatename { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public string ModelName { get; set; }
    }


    [Serializable]
    [DataContract]
    public class InsertStaticCheckItemsInput
    {
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public string checklistitemid { get; set; }
        [DataMember]
        public string site1 { get; set; }
        [DataMember]
        public string site2 { get; set; }
        [DataMember]
       
        public string site3 { get; set; }
        [DataMember]
        
        public string site4 { get; set; }
        [DataMember]
        public string site5 { get; set; }
        [DataMember]
        public string damage { get; set; }
          [DataMember]
        public string defectclass { get; set; }
        [DataMember]
        public string userid { get; set; }
        [DataMember]
        public string gateid { get; set; }
        [DataMember]
        public int qflworkflowid { get; set; }
        [DataMember]
        public string selectedchecklistitemid { get; set; }
        [DataMember]
        public string selectedstaticchecklistitemid { get; set; }

        [DataMember]
        public string defectplace { get; set; }

        [DataMember]
        public string vinnumber { get; set; }
        [DataMember]
        public bool isreexamflg { get; set; }
        [DataMember]
        public string SiteSaveImage { get; set; }

        [DataMember]
        public string uploadedFileName { get; set; }
        [DataMember]
        public string StaticCheckListItemId { get; set; }
        [DataMember]
        public string ModelName { get; set; }
    }

    [Serializable]
    [DataContract]
    public class InsertStaticCheckItems
    {
        [DataMember]
       
        public string result { get; set; }

    }




    [Serializable()]
    [DataContract]
    public class Users
    {
        [DataMember]
        public string username { get; set; }
        [DataMember]
        public string password { get; set; }
    }

    [Serializable()]
    [DataContract]
    public class UsersDetails
    {
        [DataMember]
        public string username { get; set; }
        [DataMember]
        public string email { get; set; }
        [DataMember]
        public string lastlogin { get; set; }
        [DataMember]
        public int AuditTool { get; set; }
        [DataMember]
        public int TaskTracker { get; set; }
        [DataMember]
        public int ConcernTracker { get; set; }
        [DataMember]
        public int ELearning { get; set; }
        [DataMember]
        public int RPMS { get; set; }
        [DataMember]
        public int AutomatedQFL { get; set; }
        [DataMember]
        public int QmLab { get; set; }
        [DataMember]
        public int Administrator { get; set; }
        [DataMember]
        public bool ChangePassword { get; set; }
        [DataMember]
        public string LoginStatus { get; set; }

        [DataMember]
        public List<UserDetails> UserLogin { get; set; }

    }

    [Serializable()]
    [DataContract]
    public class ChangePassword
    {
        [DataMember]
        public string strUserName { get; set; }
        [DataMember]
        public string strOldPassword { get; set; }
        [DataMember]
        public string strNewPassword { get; set; }

    }

    [Serializable()]
    [DataContract]
    public class ResetPassword
    {
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string RandomPassword { get; set; }

    }
    [Serializable()]
    [DataContract]
    public class ChangePasswordOutput
    {
        [DataMember]
        public string strStatus { get; set; }
    }

    public class Email
    {
        public string ETMUserName { get; set; }
        public string ETMUserEmailId { get; set; }
        public string ETMPassword { get; set; }
    }

    [Serializable]
    [DataContract]
    public class GetDefectCheckListForRework
    {
        [DataMember]
        public int checklistitemid { get; set; }

        [DataMember]
        public int staticchecklistitemid { get; set; }
        [DataMember]
        public string inspectionitem { get; set; }
          [DataMember]
        public string defectplace { get; set; }
        [DataMember]
        public string site1 { get; set; }
        [DataMember]
        public string site2 { get; set; }
        [DataMember]
        public string site3 { get; set; }
        [DataMember]
        public string site4 { get; set; }
        [DataMember]
        public string site5 { get; set; }
        [DataMember]
        public string damage { get; set; }
        [DataMember]
        public string defectclass { get; set; }

        [DataMember]
        public int qflfeedbackworkflowid { get; set; }
        [DataMember]
        public int vinid { get; set; }


      

    }


    [Serializable]
    [DataContract]
    public class GetDefectPlaceCheckList
    {
       
        [DataMember]
        public string defectiveplace { get; set; }
       
        [DataMember]
        public int qflfeedbackworkflowid { get; set; }
        [DataMember]
        public int vinid { get; set; }

        [DataMember]
        public string vinnumber { get; set; }



    }



    [Serializable]
    [DataContract]
    public class GetCommunicationDetails
    {
        [DataMember]
        public int VinId { get; set; }
        [DataMember]
        public int QFLFeedBackWorkFlowId { get; set; }
        [DataMember]
        public string GateName { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public string CompletedDate { get; set; }
        [DataMember]
        public string CompletedBy { get; set; }
        [DataMember]
        public string StartPosition { get; set; }
        [DataMember]
        public bool IsDisabledComments { get; set; }
        [DataMember]
        public int CheckItemDefectId { get; set; }
        [DataMember]
        public string FileName { get; set; }
        [DataMember]
        public string ModelName { get; set; }
        [DataMember]
        public string Vinnumber { get; set; }
      


        [DataMember]
        public List<GetCommunicationDetails> ListofCommunicationDetails { get; set; }
     
    }


    [Serializable]
    [DataContract]
    public class GetCommunicationDetailsInput
    {
        [DataMember]
        public int VinId { get; set; }
        [DataMember]
        public int communaicateQFLFeedBackid { get; set; }
        [DataMember]
        public string Vinnumber { get; set; }
        [DataMember]
        public string communaicateGateName { get; set; }
        [DataMember]
        public string userid { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public int CheckListItemStatusId { get; set; }
        [DataMember]
        public int CheckItemDefectId { get; set; }

        [DataMember]
        public string ModelName { get; set; }

        [DataMember]
        public string uploadedFileName { get; set; }
        
    }



    [Serializable]
    [DataContract]
    public class InsertCommunicationDetails
    {
        [DataMember]

        public string result { get; set; }

    }


    [Serializable]
    [DataContract]
    public class EmailDetails
    {
        [DataMember]
        public List<EmailSending> EmailSending { get; set; }

    }
    [Serializable]
    [DataContract]
    public class EmailSending
    {
        [DataMember]
        public string SendEmailID { get; set; }
        [DataMember]
        public string ManagerEmail { get; set; }
        [DataMember]
        public string UserEmail { get; set; }
        [DataMember]
        public string ModifiedBy { get; set; }
        [DataMember]
        public string ModifiedOn { get; set; }
        [DataMember]
        public string Subject { get; set; }
        [DataMember]
        public string Body { get; set; }
        [DataMember]

        public string Vinnumber { get; set; }
        [DataMember]


        public string Model { get; set; }
        [DataMember]

        public string QGateName { get; set; }
        [DataMember]

        public string InspectionItem { get; set; }
        [DataMember]

        public string Defect { get; set; }
        [DataMember]

        public string Comments { get; set; }
        [DataMember]

        public string CompletedBy { get; set; }
        [DataMember]

        public string CompletedDate { get; set; }
        [DataMember]

        public int VinId { get; set; }
        [DataMember]

        public int QFLFeedBackWorkFlowId { get; set; }

    }

    [Serializable]
    [DataContract]
    public class IsEmailDetails
    {
        [DataMember]
        public List<IsEmail> Input { get; set; }

    }
    [Serializable]
    [DataContract]
    public class IsEmail
    {
        [DataMember]
        public int id { get; set; }
        [DataMember]
        public int templateid { get; set; }
    }



    [Serializable]
    [DataContract]
    public class CheckListItemImageInput
    {
        [DataMember]
        public int PlantId { get; set; }
        [DataMember]
        public int QgateId { get; set; }
        [DataMember]
        public string Vinnumber { get; set; }
        [DataMember]
        public int CheckItemImageId { get; set; }
        [DataMember]
        public int userid { get; set; }
        [DataMember]
        public string ImageFileName { get; set; }
        [DataMember]
        public int LineId { get; set; }
        [DataMember]
        public string DamageValue { get; set; }
        [DataMember]
        public string DefectClass { get; set; }
        [DataMember]
        public string DamageImage { get; set; }
        [DataMember]
        public int Vinid { get; set; }

        [DataMember]
        public string ModelName { get; set; }

        [DataMember]
        public int MarginTop { get; set; }

        [DataMember]
        public string MarginLeft { get; set; }

        [DataMember]
        public int PaintingOrderNo { get; set; }

        [DataMember]
        public string PaintingImage { get; set; }
        [DataMember]
        public int CheckItemDefectId { get; set; }
        [DataMember]
        public string NotOkUploadImageFORPaint { get; set; }

        [DataMember]
        public string PointX { get; set; }

    }



    [Serializable]
    [DataContract]
    public class InsertUpdateCheckListItemImages
    {
        [DataMember]

        public string result { get; set; }

    }

    [Serializable]
    [DataContract]
    public class DeleteCheckListItemImages
    {
        [DataMember]

        public string result { get; set; }

    }



    [Serializable]
    [DataContract]
    public class GetCheckListItemImage
    {
        
        [DataMember]
        public int QgateId { get; set; }
        [DataMember]
        public string Vinnumber { get; set; }
        [DataMember]
        public int CheckItemImageId { get; set; }
        
        [DataMember]
        public string ImageFileName { get; set; }
        [DataMember]
        public string UploadedFileName { get; set; }
        [DataMember]
        public int LineId { get; set; }
        [DataMember]
        public string DamageValue { get; set; }
        [DataMember]
        public string DefectClass { get; set; }
        [DataMember]
        public string DamageImage { get; set; }
        [DataMember]
        public int Vinid { get; set; }

        [DataMember]
        public int CheckItemDefectId { get; set; }

        [DataMember]
        public int DynamicCount { get; set; }

        [DataMember]
        public string  result { get; set; }
        [DataMember]
        public string PaintingImage { get; set; }

        [DataMember]
        public int MarginTop { get; set; }

        [DataMember]
        public string MarginLeft { get; set; }

        [DataMember]
        public int PaintingOrderNo { get; set; }
        [DataMember]
        public string GateName { get; set; }
        [DataMember]
        public string PaintingColor { get; set; }
        [DataMember]
        public string CompletedDate { get; set; }
        [DataMember]
        public string CompletedBy { get; set; }

        [DataMember]
        public int CheckListItemStatusId { get; set; }

        [DataMember]
        public string NotOkUploadImageFORPaint { get; set; }

        [DataMember]
        public bool IsCommunication { get; set; }
        [DataMember]
        public bool isreexamflg { get; set; }
        [DataMember]
        public int ReExaminationOrderNo { get; set; }
        [DataMember]
        public bool iscompleted { get; set; }
        [DataMember]
        public bool isreworkcompleted { get; set; }
        [DataMember]
        public bool isreexaminationcompleted { get; set; }
        [DataMember]
        public bool IsEnabledReExamination { get; set; }
        [DataMember]
        public string PointX { get; set; }


        [DataMember]
        public List<GetCheckListItemImage> ListOfCheckListItemImage { get; set; }

        [DataMember]
        public List<GetCheckListItemImage> PaintingCheckItemDefect { get; set; }

    }


}


