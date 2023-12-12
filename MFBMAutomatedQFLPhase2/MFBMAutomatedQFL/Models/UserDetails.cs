using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MFBMAutomatedQFL.Models
{
    public class UserDetails
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string LastLogin { get; set; }

        public string Token { get; set; }
        
        public string Api { get; set; }

        public string Language { get; set; }

        public string CountryCode { get; set; }

        public int DeptId { get; set; }

        public string language { get; set; }

        public int RoleId { get; set; }

        public int PlantId { get; set; }

        public string SiganturePath { get; set; }
        public string SignatureSitePath { get; set; }
        public string PaintingImagePath { get; set; }

      
        public List<UserAccess> AccessDetails { get; set; }
    }
    public class UserAccess
    {
        public int UserId { get; set; }
        public int AccessId { get; set; }
        public string AccessName { get; set; }
        public int ToolId { get; set; }
        public string AccessType { get; set; }
    }


    public class ModifiedDateDetails
    {
        public string VIN { get; set; }

        public int QGateId { get; set; }

        public int LineId { get; set; }

        public string ModifiedDate { get; set; }

        public string Varaint { get; set; }

        public string QGateName { get; set; }

        public string Rework { get; set; }
        public string Status { get; set; }
    }

    public class Excel_DetailsList
    {


        public List<ModifiedDateDetails> ModifiedDateDetailsList { get; set; }


    }

    public class ProgressMonitor
    {
       
        public int plantid { get; set; }
       
        public string vinfrom { get; set; }
        
        public string vinto { get; set; }
       
        public string fromdate { get; set; }
       
        public string todate { get; set; }
      
        public string VINNumber { get; set; }
    }
    public class Inputs
    {
        public int plantid { get; set; }
       
        public string vinfrom { get; set; }
        
        public string vinto { get; set; }
       
        public string fromdate { get; set; }
      
        public string todate { get; set; }
       
        public string VINNumber { get; set; }
        public string ModelName { get; set; }
    }

    public class PMExcelIssuedateResponse
    {
        public List<PMExcelIssuedate> pmExcels { get; set; }
    }

    public class PMExcelIssuedate
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public string VIN { get; set; }
        public string ModelName { get; set; }

        public string VehicleType { get; set; }
        public string DefectClass { get; set; }
        public string QGateName { get; set; }
        public string PartName { get; set; }
        //public string DefectDescription { get; set; }
        public string Status { get; set; }
       
        public string ReworkStatus { get; set; } // 9
        public string ReExaminationStatus { get; set; }
        public string ResponsibleName { get; set; }
        public string ActualValue { get; set; }
        public string Responsible { get; set; }
        public string DamageCode { get; set; }
        public string Comment { get; set; }
        public string Attachment { get; set; }
        public string Remarks1 { get; set; }
        public string Remarks2 { get; set; }
      


    }
    public class ProgressMonitorVINHistory
    {

        public List<ProgressMonitorHistoryGateDetails> HistoryGateDetails { get; set; }

    
       public List<ProgressMonitorHistoryVINDetails> HistoryVINDetails { get; set; }

        public List<ProgressMonitorHistoryVINDetails> FeedBackHistoryVINDetails { get; set; }
        public TotalHistoryMaxCount TotalHistoryMaxCount { get; set; }

        public List<ReworkandReExammaxcount> ReworkandReExammaxcountobj { get; set; }
       
        public List<ProgressMonitorHistoryVINDetailsForComments> ListOfComments { get; set; }

    }

    public class ReworkandReExammaxcount
    {
        public int QFLFeedbackWorkflowId { get; set; }
        public int TotalHistoryMaxCounts { get; set; }
        public int ReworkCount { get; set; }
        public int ReExaminationCount { get; set; }

        public string vinnumber { get; set; }
        public string Gateid { get; set; }
        public string ModelName { get; set; }

    }

    public class TotalHistoryMaxCount
    {
       
        public int QFLFeedbackWorkflowId { get; set; }
     
        public int TotalHistoryMaxCounts { get; set; }
      
        public int ReworkCount { get; set; }
       
        public int ReExaminationCount { get; set; }
        public int ReExaminationCount1 { get; set; }
    }


    public class ProgressMonitorHistoryGateDetails
    {

        public int GateId { get; set; }

        public string GateName { get; set; }

        public string VINName { get; set; }

        public string VariantName { get; set; }
        public string ModelName { get; set; }

    }




    public class ProgressMonitorHistoryVINDetails
    {

        public string UserName { get; set; }

        public int GateId { get; set; }

        public string GateName { get; set; }

        public string CreatedDateTime { get; set; }

        public string CreatedDate { get; set; }

        public string CreatedTime { get; set; }

        public string CreatedBy { get; set; }

        public string Status { get; set; }
        public int Okcount { get; set; }

        public int NotOkcount { get; set; }

        public int Skipcount { get; set; }

        public string CheckItem { get; set; }

        public string Standard { get; set; }

        public string Specification { get; set; }

        public string DefectPlace { get; set; }

        public string DefectClass { get; set; }

        public string PartName { get; set; }

        public string ActualValue { get; set; }

        public string Responsible { get; set; }

        public string DamageCode { get; set; }

        public string Comments { get; set; }

        public string Attachment { get; set; }

        public int ActualID { get; set; }

        public string ReworkModifiedBy { get; set; }


        public string ReworkModifiedDate { get; set; }

        public string ReworkModifiedTime { get; set; }

        public string ReworkModifiedDateTime { get; set; }

        public string ReworkExaminationBy { get; set; }

        public string ReworkExaminationDate { get; set; }

        public string ReworkExaminationTime { get; set; }

        public string ReworkExaminationDateTime { get; set; }
        public string VinId { get; set; }
        public string VinNumber { get; set; }

        public string Sno { get; set; }

        public string CompletedName { get; set; }
        public string CompletedDate { get; set; }
   
        public string CompletedBY { get; set; }
        
        public string IsCompleted { get; set; }

        public string Filename { get; set; }
       
        public string ModifiedBy { get; set; }
    
        public string SignatureId { get; set; }
        public string ReExaminationModifiedBy { get; set; }
        public string ReworkModifiedBys { get; set; }

        public int ReExamOkCount { get; set; }
         public int QFLFeedbackWorkflowId { get; set; }


        public string ReworkModifiedDateTime1 { get; set; }
        public string ReworkModifiedDateTime2 { get; set; }
        public string ReworkModifiedDateTime3 { get; set; }
        public string ReworkModifiedDateTime4 { get; set; }
        public string ReworkModifiedDateTime5 { get; set; }

        public string ReworkModifiedBy1 { get; set; }
        public string ReworkModifiedBy2 { get; set; }

        public string ReworkModifiedBy3 { get; set; }
        public string ReworkModifiedBy4 { get; set; }
        public string ReworkModifiedBy5 { get; set; }

        public string ReExaminationModifiedBy1 { get; set; }
        public string ReExaminationModifiedBy2 { get; set; }
        public string ReExaminationModifiedBy3 { get; set; }
        public string ReExaminationModifiedBy4 { get; set; }
        public string ReExaminationModifiedBy5 { get; set; }

        public string ReworkExaminationDateTime1 { get; set; }
        public string ReworkExaminationDateTime2 { get; set; }
        public string ReworkExaminationDateTime3 { get; set; }
        public string ReworkExaminationDateTime4 { get; set; }
        public string ReworkExaminationDateTime5 { get; set; }

        public string Status1 { get; set; }
        public string Status2 { get; set; }
        public string Status3 { get; set; }
        public string Status4 { get; set; }
        public string Status5 { get; set; }

        public string ModelName { get; set; }

    }


    public class ProgressMonitorHistoryVINDetailsForComments
    {
        public string ModelName { get; set; }

        public string UserName { get; set; }
        
        public int GateId { get; set; }
        
        public string GateName { get; set; }
        
        public string CreatedDateTime { get; set; }
        
        public string CreatedDate { get; set; }
        
        public string CreatedTime { get; set; }
        
        public string CreatedBy { get; set; }
        
        public string Status { get; set; }
        
        public int Okcount { get; set; }
        
        public int NotOkcount { get; set; }
        
        public int Skipcount { get; set; }
        
        public string CheckItem { get; set; }
        
        public string Standard { get; set; }
        
        public string Specification { get; set; }
        
        public string DefectPlace { get; set; }
        
        public string DefectClass { get; set; }
        
        public string PartName { get; set; }
        
        public string ActualValue { get; set; }
        
        public string Responsible { get; set; }
        
        public string DamageCode { get; set; }
        
        public string Comments { get; set; }
        
        public string Attachment { get; set; }
        
        public int ActualID { get; set; }
        
        public string ReworkModifiedBy { get; set; }

        
        public string ReworkModifiedDate { get; set; }
        
        public string ReworkModifiedTime { get; set; }
        
        public string ReworkModifiedDateTime { get; set; }
        
        public string ReworkExaminationBy { get; set; }
        
        public string ReworkExaminationDate { get; set; }
        
        public string ReworkExaminationTime { get; set; }
        
        public string ReworkExaminationDateTime { get; set; }

        
        public string VinId { get; set; }
        
        public string VinNumber { get; set; }
        
        public string Sno { get; set; }
        
        public string CompletedDate { get; set; }
        
        public string CompletedBY { get; set; }
        
        public string IsCompleted { get; set; }
        
        public string CompletedName { get; set; }
        
        public string Filename { get; set; }
        
        public string ModifiedBy { get; set; }
        
        public string SignatureId { get; set; }
        
        public int ReExamOkCount { get; set; }

        
        public string ReworkModifiedBys { get; set; }

        
        public string ReExaminationModifiedBy { get; set; }
        
        public int QFLFeedbackWorkflowId { get; set; }

        
        public string ReworkModifiedDateTime1 { get; set; }
        
        public string ReworkModifiedDateTime2 { get; set; }
        
        public string ReworkModifiedDateTime3 { get; set; }
        
        public string ReworkModifiedDateTime4 { get; set; }
        
        public string ReworkModifiedDateTime5 { get; set; }

        
        public string ReworkModifiedBy1 { get; set; }
        
        public string ReworkModifiedBy2 { get; set; }
        

        public string ReworkModifiedBy3 { get; set; }
        
        public string ReworkModifiedBy4 { get; set; }
        
        public string ReworkModifiedBy5 { get; set; }

        
        public string ReExaminationModifiedBy1 { get; set; }
        
        public string ReExaminationModifiedBy2 { get; set; }
        
        public string ReExaminationModifiedBy3 { get; set; }

        
        public string ReExaminationModifiedBy4 { get; set; }
        
        public string ReExaminationModifiedBy5 { get; set; }

        
        public string ReworkExaminationDateTime1 { get; set; }
        
        public string ReworkExaminationDateTime2 { get; set; }
        
        public string ReworkExaminationDateTime3 { get; set; }
        
        public string ReworkExaminationDateTime4 { get; set; }
        
        public string ReworkExaminationDateTime5 { get; set; }

        
        public string Status1 { get; set; }
        
        public string Status2 { get; set; }
        
        public string Status3 { get; set; }
        
        public string Status4 { get; set; }
        
        public string Status5 { get; set; }




        
        public string ReworkComments1 { get; set; }
        
        public string ReworkComments2 { get; set; }
        
        public string ReworkComments3 { get; set; }
        
        public string ReworkComments4 { get; set; }
        
        public string ReworkComments5 { get; set; }



        
        public string ReExamiantionComments1 { get; set; }
        
        public string ReExamiantionComments2 { get; set; }
        
        public string ReExamiantionComments3 { get; set; }
        
        public string ReExamiantionComments4 { get; set; }
        
        public string ReExamiantionComments5 { get; set; }

    }


    public class GetUserAccessDetails
    {
      
        public string emailid { get; set; }
       
        public int userid { get; set; }
       
        public string accessname { get; set; }
       
        public string accesstype { get; set; }
       
        public List<GetUserAccessDetails> useremail { get; set; }
       
        public List<GetUserAccessDetails> userheaders { get; set; }
       
        public List<GetUserAccessDetails> userdetaillist { get; set; }
      
        public List<GetUserAccessDetails> Linelist { get; set; }
        public List<GetUserAccessDetails> UserList { get; set; }

     
        public int Roleid { get; set; }

    }

    public class GetUserAccessDetailInput
    {
        public int PlantCode { get; set; }
    }

    public class GetVinlists
    {

        public string Vinnumber { get; set; }

        public string ModelName { get; set; }

        public string FileName { get; set; }
        public List<GetVinlists> GetVinlist { get; set; }
    }


}