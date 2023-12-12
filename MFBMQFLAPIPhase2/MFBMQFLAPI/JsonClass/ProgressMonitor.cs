using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MFBMQFLAPI.JsonClass
{
    [Serializable]
    [DataContract]
    public class ProgressMonitor
    {
        [DataMember]
        public int plantid { get; set; }
        [DataMember]
        public string vinfrom { get; set; }
        [DataMember]
        public string vinto { get; set; }
        [DataMember]
        public string fromdate { get; set; }
        [DataMember]
        public string todate { get; set; }
        [DataMember]
        public string VINNumber { get; set; }


        [DataMember]
        public int fromcount { get; set; }

        [DataMember]
        public int tocount { get; set; }

        [DataMember]
        public int Lineid { get; set; }
        
         [DataMember]
        public string ModelName { get; set; }
    }

    [Serializable]
    [DataContract]
    public class ProgressMonitorVINHistory
    {
        [DataMember]
        public List<ProgressMonitorHistoryGateDetails> HistoryGateDetails { get; set; }
        [DataMember]
        public List<ProgressMonitorHistoryVINDetails> HistoryVINDetails { get; set; }
        [DataMember]
        public List<ProgressMonitorHistoryVINDetails> FeedBackHistoryVINDetails { get; set; }
        [DataMember]
        public TotalHistoryMaxCount TotalHistoryMaxCount { get; set; }

        [DataMember]
        public List<ReworkandReExammaxcount> ReworkandReExammaxcountobj { get; set; }
        [DataMember]
        public List<ProgressMonitorHistoryVINDetailsForComments> ListOfComments { get; set; }
        [DataMember]
        public List<ProgressMonitorHistoryComments> CommentsCheck { get; set; }
     

    }


    [Serializable]
    [DataContract]
    public class ReworkandReExammaxcount
    {
        [DataMember]
        public string ModelName { get; set; }
        [DataMember]
        public int QFLFeedbackWorkflowId { get; set; }
        [DataMember]
        public int TotalHistoryMaxCounts { get; set; }
        [DataMember]
        public int ReworkCount { get; set; }
        [DataMember]
        public int ReExaminationCount { get; set; }

        [DataMember]
        public string vinnumber { get; set; }

        [DataMember]
        public string Gateid { get; set; }

    }




    [Serializable]
    [DataContract]
    public class TotalHistoryMaxCount
    {
        [DataMember]
        public int QFLFeedbackWorkflowId { get; set; }
        [DataMember]
        public int TotalHistoryMaxCounts { get; set; }
         [DataMember]
        public int ReworkCount { get; set; }
         [DataMember]
        public int ReExaminationCount { get; set; }
         [DataMember]
         public int ReExaminationCount1 { get; set; }
    }


    [Serializable]
    [DataContract]
    public class ProgressMonitorHistoryGateDetails
    {
        [DataMember]
        public int GateId { get; set; }
        [DataMember]
        public string GateName { get; set; }
        [DataMember]
        public string VINName { get; set; }
        [DataMember]
        public string VariantName { get; set; }

        [DataMember]
        public string ModelName { get; set; }

    }

    [Serializable]
    [DataContract]
    public class ProgressMonitorHistoryVINDetails
    {

        [DataMember]
        public string ModelName { get; set; }

        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public int GateId { get; set; }
        [DataMember]
        public string GateName { get; set; }
        [DataMember]
        public string CreatedDateTime { get; set; }
        [DataMember]
        public string CreatedDate { get; set; }
        [DataMember]
        public string CreatedTime { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public int Okcount { get; set; }
        [DataMember]
        public int NotOkcount { get; set; }
        [DataMember]
        public int Skipcount { get; set; }
        [DataMember]
        public string CheckItem { get; set; }
        [DataMember]
        public string Standard { get; set; }
        [DataMember]
        public string Specification { get; set; }
        [DataMember]
        public string DefectPlace { get; set; }
        [DataMember]
        public string DefectClass { get; set; }
        [DataMember]
        public string PartName { get; set; }
        [DataMember]
        public string ActualValue { get; set; }
        [DataMember]
        public string Responsible { get; set; }
        [DataMember]
        public string DamageCode { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public string Attachment { get; set; }
        [DataMember]
        public int ActualID { get; set; }
        [DataMember]
        public string ReworkModifiedBy { get; set; }

        [DataMember]
        public string ReworkModifiedDate { get; set; }
        [DataMember]
        public string ReworkModifiedTime { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime { get; set; }
        [DataMember]
        public string ReworkExaminationBy { get; set; }
        [DataMember]
        public string ReworkExaminationDate { get; set; }
        [DataMember]
        public string ReworkExaminationTime { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime { get; set; }

        [DataMember]
        public string  VinId { get; set; }
        [DataMember]
        public string VinNumber { get; set; }
        [DataMember]
        public string Sno { get; set; }
        [DataMember]
        public string CompletedDate { get; set; }
        [DataMember]
        public string CompletedBY { get; set; }
        [DataMember]
        public string IsCompleted { get; set; }
        [DataMember]
        public string CompletedName { get; set; }
        [DataMember]
        public string Filename { get; set; }
        [DataMember]
        public string ModifiedBy { get; set; }
        [DataMember]
        public string SignatureId { get; set; }
        [DataMember]
        public int ReExamOkCount { get; set; }

        [DataMember]
        public string ReworkModifiedBys { get; set; }

        [DataMember]
        public string ReExaminationModifiedBy { get; set; }
        [DataMember]
        public int QFLFeedbackWorkflowId { get; set; }

        [DataMember]
        public string ReworkModifiedDateTime1 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime2 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime3 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime4 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime5 { get; set; }

        [DataMember]
        public string ReworkModifiedBy1 { get; set; }
        [DataMember]
        public string ReworkModifiedBy2 { get; set; }
        [DataMember]
      
        public string ReworkModifiedBy3 { get; set; }
        [DataMember]
        public string ReworkModifiedBy4 { get; set; }
        [DataMember]
        public string ReworkModifiedBy5 { get; set; }

        [DataMember]
        public string ReExaminationModifiedBy1 { get; set; }
        [DataMember]
        public string ReExaminationModifiedBy2 { get; set; }
        [DataMember]
        public string ReExaminationModifiedBy3 { get; set; }

        [DataMember]
        public string ReExaminationModifiedBy4 { get; set; }
        [DataMember]
        public string ReExaminationModifiedBy5 { get; set; }

        [DataMember]
        public string ReworkExaminationDateTime1 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime2 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime3 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime4 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime5 { get; set; }

        [DataMember]
        public string Status1 { get; set; }
        [DataMember]
        public string Status2 { get; set; }
        [DataMember]
        public string Status3 { get; set; }
        [DataMember]
        public string Status4 { get; set; }
        [DataMember]
        public string Status5 { get; set; }
        [DataMember]
        public string NotOkUploadImage { get; set; }

    }


    [Serializable]
    [DataContract]
    public class ProgressMonitorHistoryComments
    {
        [DataMember]
        public int QFLFeedbackWorkflowId { get; set; }
    }

     [Serializable]
    [DataContract]
    public class ProgressMonitorHistoryVINDetailsForComments
    {
        [DataMember]
        public string ModelName { get; set; }
         [DataMember]
        public string Comments1 { get; set; }

        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public int GateId { get; set; }
        [DataMember]
        public string GateName { get; set; }
        [DataMember]
        public string CreatedDateTime { get; set; }
        [DataMember]
        public string CreatedDate { get; set; }
        [DataMember]
        public string CreatedTime { get; set; }
        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public int Okcount { get; set; }
        [DataMember]
        public int NotOkcount { get; set; }
        [DataMember]
        public int Skipcount { get; set; }
        [DataMember]
        public string CheckItem { get; set; }
        [DataMember]
        public string Standard { get; set; }
        [DataMember]
        public string Specification { get; set; }
        [DataMember]
        public string DefectPlace { get; set; }
        [DataMember]
        public string DefectClass { get; set; }
        [DataMember]
        public string PartName { get; set; }
        [DataMember]
        public string ActualValue { get; set; }
        [DataMember]
        public string Responsible { get; set; }
        [DataMember]
        public string DamageCode { get; set; }
        [DataMember]
        public string Comments { get; set; }
        [DataMember]
        public string Attachment { get; set; }
        [DataMember]
        public int ActualID { get; set; }
        [DataMember]
        public string ReworkModifiedBy { get; set; }

        [DataMember]
        public string ReworkModifiedDate { get; set; }
        [DataMember]
        public string ReworkModifiedTime { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime { get; set; }
        [DataMember]
        public string ReworkExaminationBy { get; set; }
        [DataMember]
        public string ReworkExaminationDate { get; set; }
        [DataMember]
        public string ReworkExaminationTime { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime { get; set; }

        [DataMember]
        public string VinId { get; set; }
        [DataMember]
        public string VinNumber { get; set; }
        [DataMember]
        public string Sno { get; set; }
        [DataMember]
        public string CompletedDate { get; set; }
        [DataMember]
        public string CompletedBY { get; set; }
        [DataMember]
        public string IsCompleted { get; set; }
        [DataMember]
        public string CompletedName { get; set; }
        [DataMember]
        public string Filename { get; set; }
        [DataMember]
        public string ModifiedBy { get; set; }
        [DataMember]
        public string SignatureId { get; set; }
        [DataMember]
        public int ReExamOkCount { get; set; }

        [DataMember]
        public string ReworkModifiedBys { get; set; }

        [DataMember]
        public string ReExaminationModifiedBy { get; set; }
        [DataMember]
        public int QFLFeedbackWorkflowId { get; set; }

        [DataMember]
        public string ReworkModifiedDateTime1 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime2 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime3 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime4 { get; set; }
        [DataMember]
        public string ReworkModifiedDateTime5 { get; set; }

        [DataMember]
        public string ReworkModifiedBy1 { get; set; }
        [DataMember]
        public string ReworkModifiedBy2 { get; set; }
        [DataMember]

        public string ReworkModifiedBy3 { get; set; }
        [DataMember]
        public string ReworkModifiedBy4 { get; set; }
        [DataMember]
        public string ReworkModifiedBy5 { get; set; }

        [DataMember]
        public string ReExaminationModifiedBy1 { get; set; }
        [DataMember]
        public string ReExaminationModifiedBy2 { get; set; }
        [DataMember]
        public string ReExaminationModifiedBy3 { get; set; }

        [DataMember]
        public string ReExaminationModifiedBy4 { get; set; }
        [DataMember]
        public string ReExaminationModifiedBy5 { get; set; }

        [DataMember]
        public string ReworkExaminationDateTime1 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime2 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime3 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime4 { get; set; }
        [DataMember]
        public string ReworkExaminationDateTime5 { get; set; }

        [DataMember]
        public string Status1 { get; set; }
        [DataMember]
        public string Status2 { get; set; }
        [DataMember]
        public string Status3 { get; set; }
        [DataMember]
        public string Status4 { get; set; }
        [DataMember]
        public string Status5 { get; set; }



        [DataMember]
        public string ReworkComments1 { get; set; }
        [DataMember]
        public string ReworkComments2 { get; set; }
        [DataMember]
        public string ReworkComments3 { get; set; }
        [DataMember]
        public string ReworkComments4 { get; set; }
        [DataMember]
        public string ReworkComments5 { get; set; }



        [DataMember]
        public string ReExamiantionComments1 { get; set; }
        [DataMember]
        public string ReExamiantionComments2 { get; set; }
        [DataMember]
        public string ReExamiantionComments3 { get; set; }
        [DataMember]
        public string ReExamiantionComments4 { get; set; }
        [DataMember]
        public string ReExamiantionComments5 { get; set; }
    }

    [Serializable]
    [DataContract]
    public class DeleteVIN
    {
        [DataMember]
        public long userid { get; set; }

        [DataMember]
        public string vin { get; set; }

        [DataMember]
        public string comments { get; set; }

        [DataMember]
        public string vehicletypename { get; set; }

        [DataMember]
        public string modelname { get; set; }

        [DataMember]
        public int plantid { get; set; }

        [DataMember]
        public string result { get; set; }
    }


    [Serializable]
    [DataContract]
    public class GetProgressMonitorNew
    {
        [DataMember]
        public string Inspection { get; set; }
        [DataMember]
        public int vinid { get; set; }
        [DataMember]
        public int gateid { get; set; }
        [DataMember]
        public int lineid { get; set; }

        [DataMember]
        public string gatename { get; set; }

        [DataMember]
        public string VinNumber { get; set; }

        [DataMember]
        public string ModelName { get; set; }
        [DataMember]
        public string VehicleType { get; set; }

        [DataMember]
        public string Status { get; set; }

        [DataMember]
        public int StatusId { get; set; }

        [DataMember]
        public int StatusCount { get; set; }

        [DataMember]
        public string CreatedDate { get; set; }

        [DataMember]
        public string CreatedBy { get; set; }
        [DataMember]
        public int reexaminationcount { get; set; }
        [DataMember]
        public string reexaminatiostatus { get; set; }
        [DataMember]
        public string Result { get; set; }

        [DataMember]
        public List<GetProgressMonitorNew> listsProgressMonitorNew { get; set; }

        [DataMember]
        public List<GetProgressMonitorNew> listsProgressMonitorInspection { get; set; }
        [DataMember]
        public List<GetLineDetails> listlinedetails { get; set; }

        [DataMember]
        public List<GetProgressMonitorNewForDefect> listsProgressMonitorNewForDefect { get; set; }

           [DataMember]
        public List<GetProgressMonitorNewForDynamicColumn> listsProgressMonitorNewForDynamicColumn { get; set; }
            [DataMember]
           public List<GetProgressMonitorNewForDynamicDetails> ListProgressMonitorNewForDynamicDetails { get; set; }

            [DataMember]
            public List<GetCommunicationDetails> ListofCommunicationDetails { get; set; }
        
    }



    [Serializable]
    [DataContract]
    public class GetLineDetails
    {
        [DataMember]
        public int lineid { get; set; }

        [DataMember]
        public string linename { get; set; }

       

    }

    [Serializable]
    [DataContract]
    public class GetProgressMonitorNewForDefect
    {
      

        [DataMember]
        public string inspectionitem { get; set; }
        [DataMember]
        public string DefectPlace { get; set; }
        [DataMember]
        public string Site1 { get; set; }
        [DataMember]
        public string Site2 { get; set; }
        [DataMember]
        public string Site3 { get; set; }
        [DataMember]
        public string Site4 { get; set; }
        [DataMember]
        public string Site5 { get; set; }
        [DataMember]
        public string Damage { get; set; }
        [DataMember]
        public string DefectClass { get; set; }
        [DataMember]
        public string VinNumber { get; set; }
        [DataMember]
        public int QFLFeedbackWorkflowId { get; set; }
        [DataMember]
        public int CheckListItemId { get; set; }
        [DataMember]
        public int StaticCheckItemId { get; set; }
        [DataMember]
        public int VinId { get; set; }

        [DataMember]
        public string ModelName { get; set; }
        [DataMember]
        public string VehicleType { get; set; }
        [DataMember]
        public int StatusCount { get; set; }
        [DataMember]
        public int ReExaminationCount { get; set; }
        [DataMember]
        public int CheckListItemStatusId { get; set; }
        [DataMember]

        public string Defect { get; set; }
        [DataMember]
        public string Site1Image { get; set; }
        [DataMember]
        public string NotOkUploadImage { get; set; }

        [DataMember]
        public string VinnumberColor { get; set; }

        [DataMember]
        public string ModalColor { get; set; }

        [DataMember]
        public string VehicleColor { get; set; }

        [DataMember]
        public string DefectColor { get; set; }

        [DataMember]
        public string GateName { get; set; }
        [DataMember]
        public string CompletedDate { get; set; }

        [DataMember]
        public int ReworkCyclecount { get; set; }
        [DataMember]
        public int ReexaminationCycleCount { get; set; }
    }



    [Serializable]
    [DataContract]
    public class GetProgressMonitorNewForDynamicColumn
    {


        [DataMember]
        public int NewProgressColumnId { get; set; }
        [DataMember]
        public string DynamicColumnName { get; set; }

        [DataMember]
        public int Counts { get; set; }
     


    }


    [Serializable]
    [DataContract]
    public class GetProgressMonitorNewForDynamicDetails
    {


        [DataMember]
        public int NewProgressColumnId { get; set; }
        [DataMember]
        public string DynamicColumnDetails { get; set; }

        [DataMember]
        public int QFLFeedBackworkflowId { get; set; }

        [DataMember]
        public int NewProgressColumnDetailsId { get; set; }

        [DataMember]
        public int VinId { get; set; }

        [DataMember]
        public string Vinnumber { get; set; }


    }



    [Serializable()]
    [DataContract]
    public class PMExcelIssuedateResponse
    {
        [DataMember]
        public List<PMExcelIssuedate> pmExcels { get; set; }
    }


    [Serializable()]
    [DataContract]
    public class PMExcelIssuedate
    {
        [DataMember]
        public string Date { get; set; }

        [DataMember]
        public string Time { get; set; }

        [DataMember]
        public string VIN { get; set; }

        [DataMember]
        public string QGateName { get; set; }

        [DataMember]
        public string ModelName { get; set; }
        [DataMember]
        public string VehicleType { get; set; }
        [DataMember]
        public string DefectClass { get; set; }

        [DataMember]
        public string PartName { get; set; }

        [DataMember]
        public string DefectDescription { get; set; }

        [DataMember]
        public string Status { get; set; }

        [DataMember]
        public string ReExaminationStatus { get; set; }

        [DataMember]
        public string ReworkStatus { get; set; }

        [DataMember]
        public string ResponsibleName { get; set; }

        [DataMember]
        public string Comment { get; set; }

        [DataMember]
        public string Responsible { get; set; }

        [DataMember]
        public string ActualValue { get; set; }

        [DataMember]
        public string DamageCode { get; set; }

        [DataMember]
        public string Attachment { get; set; }

        [DataMember]
        public string Remarks1 { get; set; }

        [DataMember]
        public string Remarks2 { get; set; }

        
    }


    [Serializable]
    [DataContract]
    public class InsertDynamicColumnText
    {
       
        [DataMember]
        public string Result { get; set; }

    }


    [Serializable]
    [DataContract]
    public class InsertDynamicColumnTextInputs
    {
        [DataMember]
        public string DynamicValues { get; set; }
        [DataMember]
        public int QFLWorkFeedBackworkflowId { get; set; }

        [DataMember]
        public string VinNumber { get; set; }
        [DataMember]
        public int VinId { get; set; }
        [DataMember]
        public int NewProgressColumnId { get; set; }
         [DataMember]
        public int userid { get; set; }

         [DataMember]
         public int NewProgressColumnDetailsId { get; set; }
        [DataMember]
        public string ModelName { get; set; }
        

        [DataMember]
        public List<InsertDynamicColumnTextInputs> ListOfDetails { get; set; }

    }



    [Serializable]
    [DataContract]
    public class GETDynamicColumnTextInputs
    {
      
        [DataMember]
        public int QFLWorkFeedBackworkflowId { get; set; }

        [DataMember]
        public string VinNumber { get; set; }
        [DataMember]
        public int VinId { get; set; }
      

    }



    [Serializable]
    [DataContract]
    public class GETDynamicColumnText
    {
        [DataMember]
        public string DynamicValues { get; set; }
        [DataMember]
        public int QFLWorkFeedBackworkflowId { get; set; }

        [DataMember]
        public string VinNumber { get; set; }
        [DataMember]
        public int VinId { get; set; }
        [DataMember]
        public int NewProgressColumnId { get; set; }
        

        [DataMember]
        public int NewProgressColumnDetailsId { get; set; }


        [DataMember]
        public List<GETDynamicColumnText> ListOfDetails { get; set; }

    }


    [Serializable]
    [DataContract]
    public class ColorInputs
    {
        [DataMember]
        public string Vinnumber { get; set; }
        [DataMember]
        public int QFLWorkFeedBackworkflowId { get; set; }

        [DataMember]
        public string SelectValue { get; set; }
        [DataMember]
        public string SelectedColor { get; set; }

    }
    [Serializable]
    [DataContract]
    public class ColorResult
    {
        [DataMember]
        public string Result { get; set; }
      
      
    }
    [Serializable]
    [DataContract]
    public class GetVinlists
    {
        [DataMember]
        public string Vinnumber { get; set; }
        [DataMember]
        public string ModelName { get; set; }
        [DataMember]
        public string FileName { get; set; }
        [DataMember]
        public List<GetVinlists> GetVinlist { get; set; }
    }

    [Serializable]
    [DataContract]
    public class VinCheckListUploadHistroy
    {
     

        [DataMember]
        public string Vinnumber { get; set; }
        [DataMember]
        public string ModelName { get; set; }
      
    }


}