using MFBMQFLAPI.JsonClass;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

using System.Security.Cryptography;
using System.Text;

//using  MFBMQFLAPI.JsonClass.TabletUserDetails;

namespace MFBMQFLAPI.DAL
{
    public class UserDetailsDAL: DataComponent
    {
        #region User details method

        //public DataSet Get_UserDetails(string emailid)
        //{
        //    DEncrypt encrypt = new DEncrypt();
        //    SqlCommand cmd = new SqlCommand("ASP_GetUserDetails", con);
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.AddWithValue("@Email", emailid);
        //    return SelectCmd(cmd, sql_cs);
        //}

        public DataSet Get_UserDetails(UserDetailInputs Input)
        {
            SqlCommand cmd = new SqlCommand("ASP_GetUserDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", Input.Email);
            return SelectCmd(cmd, sql_cs);
        }
        #endregion

        #region Dropdownlist details method

        public DataSet DropDownlist_Details(DropdownDetailsInput DropdownDetailsInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_DropDownListsDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(DropdownDetailsInput.userid));
            cmd.Parameters.AddWithValue("@RoleId", Convert.ToInt32(DropdownDetailsInput.roleid));
        /*    cmd.Parameters.AddWithValue("@QGateId", Convert.ToString(DropdownDetailsInput.CheckListQGateId));*/
            return SelectCmd(cmd, sql_cs);
        }

        #endregion

        public DataSet GetGateDetails(CheckLineMasterInput CheckLineMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSB_CheckLineMaster", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(CheckLineMasterInput.plantid));
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet GetGateListDetails(CheckLineMasterInput CheckLineMasterInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetQGateAndVinCheckListDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@LineId", Convert.ToInt32(CheckLineMasterInput.lineid));
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet GetCheckListItems(CheckListItemInput CheckListItemInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetCheckListItems", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(CheckListItemInput.plantid));
            cmd.Parameters.AddWithValue("@ModelNumber", Convert.ToString(CheckListItemInput.modelnumber));
            cmd.Parameters.AddWithValue("@QgateId", Convert.ToInt32(CheckListItemInput.qgateid));
            cmd.Parameters.AddWithValue("@VinModel", Convert.ToString(CheckListItemInput.vinmodel));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CheckListItemInput.userid));
            cmd.Parameters.AddWithValue("@Mode", Convert.ToString(CheckListItemInput.mode));
            //cmd.Parameters.AddWithValue("@CheckListStatus", Convert.ToString(CheckListItemInput.checkliststatus));



            return SelectCmd(cmd, sql_cs);
        }



        public DataSet UpdateCheckListItemStatus(CheckListItemStatusInput CheckListItemStatusInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_UpdateCheckListItems", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@QFLFeedbackWorkflowId", Convert.ToString(CheckListItemStatusInput.qflfeedbackworkflowid));
            cmd.Parameters.AddWithValue("@CheckItemStatus", Convert.ToInt32(CheckListItemStatusInput.checkitemstatus));
            cmd.Parameters.AddWithValue("@Checklistitemid", Convert.ToString(CheckListItemStatusInput.checklistitemid));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CheckListItemStatusInput.gatename));
            cmd.Parameters.AddWithValue("@CheckItemValue", Convert.ToString(CheckListItemStatusInput.checkitemvalue));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt16(CheckListItemStatusInput.userid));
            cmd.Parameters.AddWithValue("@StaticChecklistitemid", Convert.ToString(CheckListItemStatusInput.staticchecklistitemid));
            cmd.Parameters.AddWithValue("@VinNumber", Convert.ToString(CheckListItemStatusInput.vinnumber));
            cmd.Parameters.AddWithValue("@DefectPlace", Convert.ToString(CheckListItemStatusInput.selecteddefectplace));
            cmd.Parameters.AddWithValue("@uploadedFileName", Convert.ToString(CheckListItemStatusInput.uploadedFileName));
            cmd.Parameters.AddWithValue("@VinIds", Convert.ToInt64(CheckListItemStatusInput.Vinid));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(CheckListItemStatusInput.ModelName));


            return SelectCmd(cmd, sql_cs);
        }

        public DataSet GetDefectCheckListItems(GetDefectCheckListItemInput GetDefectCheckListItemInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetDefectCheckListItems", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CheckListItemId", Convert.ToString(GetDefectCheckListItemInput.checklistitemid));
            cmd.Parameters.AddWithValue("@StaticCheckListItemId", Convert.ToString(GetDefectCheckListItemInput.staticchecklistitemid));
            cmd.Parameters.AddWithValue("@GateId", Convert.ToString(GetDefectCheckListItemInput.qgateid));
            cmd.Parameters.AddWithValue("@VinId", Convert.ToString(GetDefectCheckListItemInput.vinid));
            cmd.Parameters.AddWithValue("@DefectPlace", Convert.ToString(GetDefectCheckListItemInput.defectplace));
            cmd.Parameters.AddWithValue("@Site1", Convert.ToString(GetDefectCheckListItemInput.site1));
            cmd.Parameters.AddWithValue("@Site2", Convert.ToString(GetDefectCheckListItemInput.site2));
            cmd.Parameters.AddWithValue("@Site3", Convert.ToString(GetDefectCheckListItemInput.site3));
            cmd.Parameters.AddWithValue("@Site4", Convert.ToString(GetDefectCheckListItemInput.site4));
            cmd.Parameters.AddWithValue("@Site5", Convert.ToString(GetDefectCheckListItemInput.site5));
            cmd.Parameters.AddWithValue("@Damage", Convert.ToString(GetDefectCheckListItemInput.damage));
            return SelectCmd(cmd, sql_cs);
        }

        #region Insertedupdate ActualComment Methods

        public DataSet InsertUpdateActualCommentDetails(Actualcomment ActualcommentInput)
        {
            SqlCommand cmd = new SqlCommand("MSB_AddUpdateActualComments", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ActulaId", Convert.ToInt32(ActualcommentInput.actualid));
            cmd.Parameters.AddWithValue("@CheckListItemId", Convert.ToInt32(ActualcommentInput.checklistitemid));
            cmd.Parameters.AddWithValue("@ActualValue", Convert.ToString(ActualcommentInput.actualvalue));
            cmd.Parameters.AddWithValue("@Responsible", Convert.ToString(ActualcommentInput.responsible));
            cmd.Parameters.AddWithValue("@DamageCode", Convert.ToString(ActualcommentInput.damagecode));
            cmd.Parameters.AddWithValue("@Comments", Convert.ToString(ActualcommentInput.comments));
            cmd.Parameters.AddWithValue("@Guid", Convert.ToString(ActualcommentInput.guid));
            cmd.Parameters.AddWithValue("@Userid", Convert.ToInt32(ActualcommentInput.userid));
            cmd.Parameters.AddWithValue("@mode", Convert.ToString(ActualcommentInput.mode));
            cmd.Parameters.AddWithValue("@FileXML", Convert.ToString(ActualcommentInput.filedetail));
            cmd.Parameters.AddWithValue("@Fileid", Convert.ToInt32(ActualcommentInput.fileid));
            cmd.Parameters.AddWithValue("@VinID", Convert.ToInt32(ActualcommentInput.vinid));
            cmd.Parameters.AddWithValue("@StaticCheckID", Convert.ToString(ActualcommentInput.staticchecklistitemid));

            return SelectCmd(cmd, sql_cs);
        }

        #endregion
        #region Get Actual comments Methods

        public DataSet GetActualCommentDetails(Actualcomment ActualInput)
        {
            SqlCommand cmd = new SqlCommand("MSB_GetActualComments", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ActualId", Convert.ToString(ActualInput.actualid));
            return SelectCmd(cmd, sql_cs);
        }

        #endregion


        public DataSet InsertSignature(InsertSignatureInput InsertSignatureInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_InsertSignature", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(InsertSignatureInput.vinid));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(InsertSignatureInput.userid));
            cmd.Parameters.AddWithValue("@Filename", Convert.ToString(InsertSignatureInput.filename));
            cmd.Parameters.AddWithValue("@IsCompleted", Convert.ToString(InsertSignatureInput.iscompleted));
            cmd.Parameters.AddWithValue("@VinNumber", Convert.ToString(InsertSignatureInput.vinnumber));
            cmd.Parameters.AddWithValue("@IsReworkCompleted", Convert.ToString(InsertSignatureInput.isreworkcompleted));
            cmd.Parameters.AddWithValue("@IsReExaminationCompleted", Convert.ToString(InsertSignatureInput.isreexaminationcompleted));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(InsertSignatureInput.gatename));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(InsertSignatureInput.ModelName));


            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetSealGateDetails(GetSealGateDetailsInput GetSealGateDetailsInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetSealGateList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinNumber", Convert.ToString(GetSealGateDetailsInput.vinnumber));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(GetSealGateDetailsInput.gatename));
            cmd.Parameters.AddWithValue("@UserID", Convert.ToString(GetSealGateDetailsInput.userid));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(GetSealGateDetailsInput.ModelName));


            return SelectCmd(cmd, sql_cs);
        }

        public DataSet InsertStaticCheckItems(InsertStaticCheckItemsInput InsertStaticCheckItemsInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_InsertStaticCheckListItems", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinId", Convert.ToString(InsertStaticCheckItemsInput.vinid));
            cmd.Parameters.AddWithValue("@QFLWorkflowId", Convert.ToString(InsertStaticCheckItemsInput.qflworkflowid));
            cmd.Parameters.AddWithValue("@Site1", Convert.ToString(InsertStaticCheckItemsInput.site1));
            cmd.Parameters.AddWithValue("@Site2", Convert.ToString(InsertStaticCheckItemsInput.site2));
            cmd.Parameters.AddWithValue("@Site3", Convert.ToString(InsertStaticCheckItemsInput.site3));
            cmd.Parameters.AddWithValue("@Site4", Convert.ToString(InsertStaticCheckItemsInput.site4));
            cmd.Parameters.AddWithValue("@Site5", Convert.ToString(InsertStaticCheckItemsInput.site5));
            cmd.Parameters.AddWithValue("@Damage", Convert.ToString(InsertStaticCheckItemsInput.damage));
            cmd.Parameters.AddWithValue("@DefectClass", Convert.ToString(InsertStaticCheckItemsInput.defectclass));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToString(InsertStaticCheckItemsInput.userid));
            cmd.Parameters.AddWithValue("@GateId", Convert.ToString(InsertStaticCheckItemsInput.gateid));
            cmd.Parameters.AddWithValue("@SelectedCheckListItemid", Convert.ToString(InsertStaticCheckItemsInput.selectedchecklistitemid));
            cmd.Parameters.AddWithValue("@SelectedStaticCheckListItemid", Convert.ToString(InsertStaticCheckItemsInput.selectedstaticchecklistitemid));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToString(InsertStaticCheckItemsInput.vinnumber));
            cmd.Parameters.AddWithValue("@DefectPlace", Convert.ToString(InsertStaticCheckItemsInput.defectplace));
            cmd.Parameters.AddWithValue("@SiteSaveImage", Convert.ToString(InsertStaticCheckItemsInput.SiteSaveImage));
            cmd.Parameters.AddWithValue("@uploadedFileName", Convert.ToString(InsertStaticCheckItemsInput.uploadedFileName));
            cmd.Parameters.AddWithValue("@CheckListItemId", Convert.ToString(InsertStaticCheckItemsInput.checklistitemid));
            cmd.Parameters.AddWithValue("@StaticChecklistitemid", Convert.ToString(InsertStaticCheckItemsInput.StaticCheckListItemId));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(InsertStaticCheckItemsInput.ModelName));

            return SelectCmd(cmd, sql_cs);
        }

        public DataSet GetDefectCheckListItemNotOk(GetDefectCheckListItemInput GetDefectCheckListItemInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetDefectCheckListItemNotOk", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CheckListItemId", Convert.ToString(GetDefectCheckListItemInput.checklistitemid));
            cmd.Parameters.AddWithValue("@StaticCheckListItemId", Convert.ToString(GetDefectCheckListItemInput.staticchecklistitemid));
            cmd.Parameters.AddWithValue("@GateId", Convert.ToString(GetDefectCheckListItemInput.qgateid));
            cmd.Parameters.AddWithValue("@VinId", Convert.ToString(GetDefectCheckListItemInput.vinid));
            cmd.Parameters.AddWithValue("@DefectPlace", Convert.ToString(GetDefectCheckListItemInput.defectplace));
            cmd.Parameters.AddWithValue("@Site1", Convert.ToString(GetDefectCheckListItemInput.site1));
            cmd.Parameters.AddWithValue("@Site2", Convert.ToString(GetDefectCheckListItemInput.site2));
            cmd.Parameters.AddWithValue("@Site3", Convert.ToString(GetDefectCheckListItemInput.site3));
            cmd.Parameters.AddWithValue("@Site4", Convert.ToString(GetDefectCheckListItemInput.site4));
            cmd.Parameters.AddWithValue("@Site5", Convert.ToString(GetDefectCheckListItemInput.site5));
            cmd.Parameters.AddWithValue("@Damage", Convert.ToString(GetDefectCheckListItemInput.damage));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet UpdateCheckListItemsNotOk(CheckListItemStatusInput CheckListItemStatusInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_UpdateCheckListItemsNotOk", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@QFLFeedbackWorkflowId", Convert.ToString(CheckListItemStatusInput.qflfeedbackworkflowid));
            cmd.Parameters.AddWithValue("@CheckItemStatus", Convert.ToInt32(CheckListItemStatusInput.checkitemstatus));
            cmd.Parameters.AddWithValue("@Checklistitemid", Convert.ToString(CheckListItemStatusInput.checklistitemid));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CheckListItemStatusInput.gatename));
            cmd.Parameters.AddWithValue("@CheckItemValue", Convert.ToString(CheckListItemStatusInput.checkitemvalue));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt16(CheckListItemStatusInput.userid));
            cmd.Parameters.AddWithValue("@StaticChecklistitemid", Convert.ToString(CheckListItemStatusInput.staticchecklistitemid));
            cmd.Parameters.AddWithValue("@VinNumber", Convert.ToString(CheckListItemStatusInput.vinnumber));
            cmd.Parameters.AddWithValue("@DefectPlace", Convert.ToString(CheckListItemStatusInput.selecteddefectplace));
            cmd.Parameters.AddWithValue("@uploadedFileName", Convert.ToString(CheckListItemStatusInput.uploadedFileName));
            cmd.Parameters.AddWithValue("@VinIds", Convert.ToInt64(CheckListItemStatusInput.Vinid));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(CheckListItemStatusInput.ModelName));


            return SelectCmd(cmd, sql_cs);
        }

        public DataSet Get_UserValidate(string username, string password)
        {
            DataSet ds = new DataSet();
            SqlCommand cmd = new SqlCommand("Asp_DTAQMUsersValidate", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserName", username);
            cmd.Parameters.AddWithValue("@Password", password);
            return SelectCmd(cmd, sql_cs1);
        }

        public DataSet Get_ChangePassword(ChangePassword Input)
        {
            DataSet ds = new DataSet();
            DEncrypt encrpt = new DEncrypt();
            SqlCommand cmd = new SqlCommand("ASP_ChangePassword", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserName", Convert.ToString(Input.strUserName).ToUpper());
            cmd.Parameters.AddWithValue("@OldPassword", encrpt.Encrypt(Input.strOldPassword, Input.strUserName));
            cmd.Parameters.AddWithValue("@NewPassword", encrpt.Encrypt(Input.strNewPassword, Input.strUserName));
            return SelectCmd(cmd, sql_cs1);
        }

        public DataSet Reset_Password(ResetPassword Input)
        {
            DataSet ds = new DataSet();
            DEncrypt encrpt = new DEncrypt();
            SqlCommand cmd = new SqlCommand("Asp_ForgotPassword", con);
            cmd.Parameters.AddWithValue("@Email", Input.Email);
            cmd.Parameters.AddWithValue("@EncrptPassword", encrpt.Encrypt(Input.RandomPassword, Input.Email));
            cmd.CommandType = CommandType.StoredProcedure;
            //ErrorLog.WriteToLog(Email);
            //ErrorLog.WriteToLog(encrpt.Encrypt(RandomPassword, Email));
            //ErrorLog.WriteToLog(RandomPassword);
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetCommunicationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CommunicationDetailsInput.VinId));
            cmd.Parameters.AddWithValue("@QFLFeedBackWorkFlowId", Convert.ToString(CommunicationDetailsInput.communaicateQFLFeedBackid));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToInt32(CommunicationDetailsInput.Vinnumber));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CommunicationDetailsInput.communaicateGateName));
            cmd.Parameters.AddWithValue("@UserId ", Convert.ToInt32(CommunicationDetailsInput.userid));
            cmd.Parameters.AddWithValue("@CheckListItemStatusId", Convert.ToInt32(CommunicationDetailsInput.CheckListItemStatusId));

            return SelectCmd(cmd, sql_cs);
        }

        public DataSet InsertCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_InsertCommunicationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CommunicationDetailsInput.VinId));
            cmd.Parameters.AddWithValue("@QFLFeedBackWorkFlowId", Convert.ToInt32(CommunicationDetailsInput.communaicateQFLFeedBackid));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToString(CommunicationDetailsInput.Vinnumber));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CommunicationDetailsInput.communaicateGateName));
            cmd.Parameters.AddWithValue("@Comments", Convert.ToString(CommunicationDetailsInput.Comments));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CommunicationDetailsInput.userid));
            cmd.Parameters.AddWithValue("@CheckListItemStatusId", Convert.ToInt32(CommunicationDetailsInput.CheckListItemStatusId));

            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(CommunicationDetailsInput.ModelName));
            cmd.Parameters.AddWithValue("@uploadedFileName", Convert.ToString(CommunicationDetailsInput.uploadedFileName));

            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetSendEmail()
        {
            SqlCommand cmd = new SqlCommand("MSP_SendEmail");
            cmd.CommandType = CommandType.StoredProcedure;
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet UpdateSendEmail(string Input)
        {
            SqlCommand cmd = new SqlCommand("MSP_IsMailSend");
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@InputXML", Convert.ToString(Input));


            return SelectCmd(cmd, sql_cs);
        }




        public DataSet GetEmailNotificationCheckListItems(CheckListItemInput CheckListItemInput)
        {
            SqlCommand cmd = new SqlCommand("NEW_MSP_GetEmailNotificationCheckItems", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@userid ", Convert.ToInt32(CheckListItemInput.userid));
            return SelectCmd(cmd, sql_cs);
        }


        public DataSet InsertUpdateCheckListItemImages(CheckListItemImageInput CheckListItemImageInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_InsertUpdateCheckListItemImages", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(CheckListItemImageInput.PlantId));
            cmd.Parameters.AddWithValue("@QgateId", Convert.ToInt32(CheckListItemImageInput.QgateId));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToString(CheckListItemImageInput.Vinnumber));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CheckListItemImageInput.userid));
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CheckListItemImageInput.Vinid));
            cmd.Parameters.AddWithValue("@CheckItemImageId", Convert.ToInt32(CheckListItemImageInput.CheckItemImageId));
            cmd.Parameters.AddWithValue("@ImageFileName", Convert.ToString(CheckListItemImageInput.ImageFileName));
            cmd.Parameters.AddWithValue("@LineId", Convert.ToInt32(CheckListItemImageInput.LineId));
            cmd.Parameters.AddWithValue("@DamageValue", Convert.ToString(CheckListItemImageInput.DamageValue));
            cmd.Parameters.AddWithValue("@DefectClass", Convert.ToString(CheckListItemImageInput.DefectClass));
            cmd.Parameters.AddWithValue("@DamageImage", Convert.ToString(CheckListItemImageInput.DamageImage));
            cmd.Parameters.AddWithValue("@MarginTop", Convert.ToInt32(CheckListItemImageInput.MarginTop));

            cmd.Parameters.AddWithValue("@MarginLeft", Convert.ToString(CheckListItemImageInput.MarginLeft));

            cmd.Parameters.AddWithValue("@PaintingOrderNo", Convert.ToInt32(CheckListItemImageInput.PaintingOrderNo));
            cmd.Parameters.AddWithValue("@PaintingImage", Convert.ToString(CheckListItemImageInput.PaintingImage));
            cmd.Parameters.AddWithValue("@NotOkUploadImageFORPaint", Convert.ToString(CheckListItemImageInput.NotOkUploadImageFORPaint));
            cmd.Parameters.AddWithValue("@PointX", Convert.ToString(CheckListItemImageInput.PointX));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(CheckListItemImageInput.ModelName));


            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetCheckListItemImage(CheckListItemImageInput CheckListItemImageInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetCheckListItemImages", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(CheckListItemImageInput.PlantId));
            cmd.Parameters.AddWithValue("@ModelNumber", Convert.ToString(CheckListItemImageInput.ModelName));
            cmd.Parameters.AddWithValue("@QgateId", Convert.ToInt32(CheckListItemImageInput.QgateId));
            cmd.Parameters.AddWithValue("@VinModel", Convert.ToString(CheckListItemImageInput.Vinnumber));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CheckListItemImageInput.userid));
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CheckListItemImageInput.Vinid));
            cmd.Parameters.AddWithValue("@CheckItemImageId", Convert.ToInt32(CheckListItemImageInput.CheckItemImageId));
            cmd.Parameters.AddWithValue("@ImageFileName", Convert.ToString(CheckListItemImageInput.ImageFileName));
            
            return SelectCmd(cmd, sql_cs);
        }

        public DataSet DeleteCheckListItemImages(CheckListItemImageInput CheckListItemImageInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_DeleteCheckListItemImages", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CheckItemDefectId", Convert.ToInt32(CheckListItemImageInput.CheckItemDefectId));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CheckListItemImageInput.userid));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToString(CheckListItemImageInput.Vinnumber));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToString(CheckListItemImageInput.ModelName));
           


            return SelectCmd(cmd, sql_cs);
        }


        public DataSet GetCheckListItemImagesForRework(CheckListItemImageInput CheckListItemImageInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetCheckListItemImagesForRework", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PlantId", Convert.ToInt32(CheckListItemImageInput.PlantId));
            cmd.Parameters.AddWithValue("@ModelNumber", Convert.ToString(CheckListItemImageInput.ModelName));
            cmd.Parameters.AddWithValue("@QgateId", Convert.ToInt32(CheckListItemImageInput.QgateId));
            cmd.Parameters.AddWithValue("@VinModel", Convert.ToString(CheckListItemImageInput.Vinnumber));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CheckListItemImageInput.userid));
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CheckListItemImageInput.Vinid));
            cmd.Parameters.AddWithValue("@CheckItemImageId", Convert.ToInt32(CheckListItemImageInput.CheckItemImageId));
            cmd.Parameters.AddWithValue("@ImageFileName", Convert.ToString(CheckListItemImageInput.ImageFileName));

            return SelectCmd(cmd, sql_cs);
        }


        public DataSet UpdateImageFileName(CheckListItemImageInput CheckListItemImageInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_UpdateImageFileName", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ImageFileName", Convert.ToString(CheckListItemImageInput.ImageFileName));
            cmd.Parameters.AddWithValue("@CheckItemImageId", Convert.ToInt32(CheckListItemImageInput.CheckItemImageId));

            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CheckListItemImageInput.userid));


            return SelectCmd(cmd, sql_cs);
        }



        public DataSet GetPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_GetPaintingCommunicationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CommunicationDetailsInput.VinId));
            cmd.Parameters.AddWithValue("@CheckItemDefectId", Convert.ToString(CommunicationDetailsInput.CheckItemDefectId));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToInt32(CommunicationDetailsInput.Vinnumber));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CommunicationDetailsInput.communaicateGateName));
            cmd.Parameters.AddWithValue("@UserId ", Convert.ToInt32(CommunicationDetailsInput.userid));
            cmd.Parameters.AddWithValue("@CheckListItemStatusId", Convert.ToInt32(CommunicationDetailsInput.CheckListItemStatusId));

            return SelectCmd(cmd, sql_cs);
        }

        public DataSet InsertPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_InsertPaintingCommunicationDetails", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@VinId", Convert.ToInt32(CommunicationDetailsInput.VinId));

            cmd.Parameters.AddWithValue("@CheckItemDefectId", Convert.ToInt32(CommunicationDetailsInput.CheckItemDefectId));
            cmd.Parameters.AddWithValue("@Vinnumber", Convert.ToString(CommunicationDetailsInput.Vinnumber));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CommunicationDetailsInput.communaicateGateName));
            cmd.Parameters.AddWithValue("@Comments", Convert.ToString(CommunicationDetailsInput.Comments));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt32(CommunicationDetailsInput.userid));
            cmd.Parameters.AddWithValue("@CheckListItemStatusId", Convert.ToInt32(CommunicationDetailsInput.CheckListItemStatusId));
            cmd.Parameters.AddWithValue("@ModelName", Convert.ToInt32(CommunicationDetailsInput.ModelName));
            cmd.Parameters.AddWithValue("@uploadedFileName", Convert.ToString(CommunicationDetailsInput.uploadedFileName));



            return SelectCmd(cmd, sql_cs);
        }


        public DataSet UpdateCheckListItemStatusForPainting(CheckListItemStatusInput CheckListItemStatusInput)
        {
            SqlCommand cmd = new SqlCommand("MSP_UpdateCheckListItemsForPainting", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CheckItemDefectId", Convert.ToString(CheckListItemStatusInput.CheckItemDefectId));
            cmd.Parameters.AddWithValue("@GateName", Convert.ToString(CheckListItemStatusInput.gatename));
            cmd.Parameters.AddWithValue("@CheckItemValue", Convert.ToString(CheckListItemStatusInput.checkitemvalue));
            cmd.Parameters.AddWithValue("@UserId", Convert.ToInt16(CheckListItemStatusInput.userid));
            cmd.Parameters.AddWithValue("@VinNumber", Convert.ToString(CheckListItemStatusInput.vinnumber));
            cmd.Parameters.AddWithValue("@ReExaminationOrderNo", Convert.ToString(CheckListItemStatusInput.ReExaminationOrderNo));
           

            return SelectCmd(cmd, sql_cs);
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


    }
}