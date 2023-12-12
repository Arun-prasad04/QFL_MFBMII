using MFBMQFLAPI.BAL;
using MFBMQFLAPI.JsonClass;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace MFBMQFLAPI
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.

    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    [ServiceBehavior(ConcurrencyMode = ConcurrencyMode.Multiple)]
    public class QFL : IQFL
    {

        #region GetUserDetails

        //public UserDetails GetUserDetails(string emailid)
        //{
        //    UserDetails result = new UserDetails();
        //    UserDetailsBAL _obj = new UserDetailsBAL();
        //    try
        //    {
        //        result = _obj.GetUserDetails(emailid);
        //    }

        //    catch (Exception ex)
        //    {
        //        ErrorLog.WriteToLog("Get User Details" + ex.Message);
        //    }
        //    return result;
        //}

        public string GetUserDetails(UserDetailInputs Input)
        {
            //GetProgressMonitorNew GetProgressMonitorNew = new GetProgressMonitorNew();
            string result = string.Empty;

            UserDetailsBAL _obj = new UserDetailsBAL();
            try
            {
                result = _obj.GetUserDetails(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetUserDetails" + " " + ex.Message);
            }
            return result;

        }

        #endregion


        public DropDownlistDetails DropDownlistDetails(DropdownDetailsInput DropdownDetailsInput)
        {

            DropDownlistDetails DropDownlisResult = new DropDownlistDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                DropDownlisResult = UserDetailsBAL.DropDownlist_Details(DropdownDetailsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get User Details" + ex.Message);
            }
            return DropDownlisResult;
        }


        public GateDetails GetGateDetails(CheckLineMasterInput CheckLineMasterInput)
        {

            GateDetails listofgatedetails = new GateDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                listofgatedetails = UserDetailsBAL.GetGateDetails(CheckLineMasterInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetGateDetails" + ex.Message);
            }
            return listofgatedetails;
        }

        public GateDetails GetGateListDetails(CheckLineMasterInput CheckLineMasterInput)
        {

            GateDetails listofgatedetails = new GateDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                listofgatedetails = UserDetailsBAL.GetGateListDetails(CheckLineMasterInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetGateListDetails" + ex.Message);
            }
            return listofgatedetails;
        }

        public CheckListItems GetCheckListItems(CheckListItemInput CheckListItemInput)
        {

            CheckListItems checklistitems = new CheckListItems();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                checklistitems = UserDetailsBAL.GetCheckListItems(CheckListItemInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetCheckListItems" + ex.Message);
            }
            return checklistitems;
        }


        public UpdateCheckListItemStatus UpdateCheckListItemStatus(CheckListItemStatusInput CheckListItemStatusInput)
        {

            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                UpdateCheckListItemStatus = UserDetailsBAL.UpdateCheckListItemStatus(CheckListItemStatusInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateCheckListItemStatus" + ex.Message);
            }
            return UpdateCheckListItemStatus;
        }

        public GetDefectCheckListItems GetDefectCheckListItems(GetDefectCheckListItemInput GetDefectCheckListItemInput)
        {
            GetDefectCheckListItems GetDefectCheckListItems = new GetDefectCheckListItems();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                GetDefectCheckListItems = UserDetailsBAL.GetDefectCheckListItems(GetDefectCheckListItemInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetDefectCheckListItems" + ex.Message);
            }
            return GetDefectCheckListItems;
        }

        public GetDefectCheckListItems GetDefectCheckListItemNotOk(GetDefectCheckListItemInput GetDefectCheckListItemInput)
        {
            GetDefectCheckListItems GetDefectCheckListItems = new GetDefectCheckListItems();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                GetDefectCheckListItems = UserDetailsBAL.GetDefectCheckListItemNotOk(GetDefectCheckListItemInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetDefectCheckListItemNotOk" + ex.Message);
            }
            return GetDefectCheckListItems;
        }

        public UpdateCheckListItemStatus UpdateBlankCheckItem(BlankCheckListItem checkListItems)
        {
            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            MasterBAL masterBAL = new MasterBAL();

            try
            {
                UpdateCheckListItemStatus = masterBAL.UpdateBlankCheckItem(checkListItems.checkitems, Convert.ToInt64(checkListItems.checklistitemid), Convert.ToInt64(checkListItems.staticchecklistItemId), checkListItems.vinid, checkListItems.qgateid);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateBlankCheckItem" + ex.Message);
            }
            return UpdateCheckListItemStatus;
        }


        public GetCommunicationDetails GetCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {

            GetCommunicationDetails CommunicationDetails = new GetCommunicationDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                CommunicationDetails = UserDetailsBAL.GetCommunicationDetails(CommunicationDetailsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetCommunicationDetails" + ex.Message);
            }
            return CommunicationDetails;
        }


        public InsertCommunicationDetails InsertCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            InsertCommunicationDetails InsertCommunicationDetails = new InsertCommunicationDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                InsertCommunicationDetails = UserDetailsBAL.InsertCommunicationDetails(CommunicationDetailsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertCommunicationDetails" + ex.Message);
            }
            return InsertCommunicationDetails;
        }



        #region InsertUpdateMethod for ActualComment
        public string InsertUpdateActualCommentDetails(Actualcomment Actualcomment_Input)
        {
            ActualcommentDetils _Actualcommen = new ActualcommentDetils();
            string result = string.Empty;
            UserDetailsBAL MasterBAL = new UserDetailsBAL();
            try
            {
                result = MasterBAL.InsertUpdateActualCommentDetails(Actualcomment_Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Insert Actual Comment" + " " + ex.Message);
            }
            return result;
        }



        public ActualcommentDetils GetActualCommentDetails(Actualcomment Actualcomment_Input)
        {
            ActualcommentDetils _Actualcommen = new ActualcommentDetils();
            UserDetailsBAL MasterBAL = new UserDetailsBAL();
            try
            {
                _Actualcommen = MasterBAL.GetActualCommentDetails(Actualcomment_Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog(" Get Actual Comment" + " " + ex.Message);
            }
            return _Actualcommen;
        }



        public InsertSignature InsertSignature(InsertSignatureInput InsertSignatureInput)
        {

            InsertSignature InsertSignature = new InsertSignature();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                InsertSignature = UserDetailsBAL.InsertSignature(InsertSignatureInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateCheckListItemStatus" + ex.Message);
            }
            return InsertSignature;
        }


        public GetSealGateDetails GetSealGateDetails(GetSealGateDetailsInput GetSealGateDetailsInput)
        {

            GetSealGateDetails GetSealGateDetails = new GetSealGateDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                GetSealGateDetails = UserDetailsBAL.GetSealGateDetails(GetSealGateDetailsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetGateDetails" + ex.Message);
            }
            return GetSealGateDetails;
        }


        public InsertStaticCheckItems InsertStaticCheckItems(InsertStaticCheckItemsInput InsertStaticCheckItemsInput)
        {
            InsertStaticCheckItems InsertStaticCheckItems = new InsertStaticCheckItems();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                InsertStaticCheckItems = UserDetailsBAL.InsertStaticCheckItems(InsertStaticCheckItemsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertStaticCheckItems" + ex.Message);
            }
            return InsertStaticCheckItems;
        }


        public UpdateCheckListItemStatus UpdateCheckListItemsNotOk(CheckListItemStatusInput CheckListItemStatusInput)
        {

            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                UpdateCheckListItemStatus = UserDetailsBAL.UpdateCheckListItemsNotOk(CheckListItemStatusInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateCheckListItemsNotOk" + ex.Message);
            }
            return UpdateCheckListItemStatus;
        }


        public UsersDetails GetUserValidate(Users Input)
        {
            UsersDetails result = new UsersDetails();
            UserDetailsBAL _obj = new UserDetailsBAL();

            try
            {
                result = _obj.GetUserValidate(Input);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get User Validate " + ex.Message);
            }

            return result;
        }

        public ChangePasswordOutput GetChangePassword(ChangePassword Input)
        {
            UserDetailsBAL _obj = new UserDetailsBAL();
            ChangePasswordOutput _objChangePasswordOutput = new ChangePasswordOutput();
            try
            {
                _objChangePasswordOutput = _obj.GetChangePassword(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog(ex + " Get Change Password");

            }
            return _objChangePasswordOutput;
        }

        public string ResetPassword(ResetPassword Input)
        {
            string result = string.Empty;
            UserDetailsBAL _obj = new UserDetailsBAL();
            try
            {
                result = _obj.ResetPassword(Input);
            }
            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Test");
                ErrorLog.WriteToLog("Reset Password" + " " + ex.Message);
            }

            return result;
        }



        public EmailDetails GetSendEmail()
        {
            EmailDetails result = new EmailDetails();
            UserDetailsBAL _obj = new UserDetailsBAL();

            try
            {
                result = _obj.GetSendEmail();
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get Repeated User Record " + ex.Message);
            }

            return result;
        }


        public string UpdateSendEmail(IsEmailDetails Input)
        {
            var result = "";
            UserDetailsBAL _obj = new UserDetailsBAL();

            try
            {
                result = _obj.UpdateSendEmail(Input);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("Get Repeated User Record " + ex.Message);
            }

            return result;
        }



        public CheckListItems GetEmailNotificationCheckListItems(CheckListItemInput CheckListItemInput)
        {

            CheckListItems checklistitems = new CheckListItems();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                checklistitems = UserDetailsBAL.GetEmailNotificationCheckListItems(CheckListItemInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetEmailNotificationCheckListItems" + ex.Message);
            }
            return checklistitems;
        }


        public InsertUpdateCheckListItemImages InsertUpdateCheckListItemImages(CheckListItemImageInput CheckListItemImageInput)
        {
            InsertUpdateCheckListItemImages InsertUpdateCheckListItemImages = new InsertUpdateCheckListItemImages();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                InsertUpdateCheckListItemImages = UserDetailsBAL.InsertUpdateCheckListItemImages(CheckListItemImageInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertUpdateCheckListItemImages" + ex.Message);
            }
            return InsertUpdateCheckListItemImages;
        }

        public GetCheckListItemImage GetCheckListItemImage(CheckListItemImageInput CheckListItemImageInput)
        {

            GetCheckListItemImage GetCheckListItemImage = new GetCheckListItemImage();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                GetCheckListItemImage = UserDetailsBAL.GetCheckListItemImage(CheckListItemImageInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetCheckListItemImage" + ex.Message);
            }
            return GetCheckListItemImage;
        }


        public DeleteCheckListItemImages DeleteCheckListItemImages(CheckListItemImageInput CheckListItemImageInput)
        {
            DeleteCheckListItemImages DeleteCheckListItemImages = new DeleteCheckListItemImages();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                DeleteCheckListItemImages = UserDetailsBAL.DeleteCheckListItemImages(CheckListItemImageInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("DeleteCheckListItemImages" + ex.Message);
            }
            return DeleteCheckListItemImages;
        }

        public GetCheckListItemImage GetCheckListItemImagesForRework(CheckListItemImageInput CheckListItemImageInput)
        {

            GetCheckListItemImage GetCheckListItemImage = new GetCheckListItemImage();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                GetCheckListItemImage = UserDetailsBAL.GetCheckListItemImagesForRework(CheckListItemImageInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetCheckListItemImagesForRework " + ex.Message);
            }
            return GetCheckListItemImage;
        }


        public InsertUpdateCheckListItemImages UpdateImageFileName(CheckListItemImageInput CheckListItemImageInput)
        {
            InsertUpdateCheckListItemImages UpdateImageFileName = new InsertUpdateCheckListItemImages();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                UpdateImageFileName = UserDetailsBAL.UpdateImageFileName(CheckListItemImageInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateImageFileName" + ex.Message);
            }
            return UpdateImageFileName;
        }




        public GetCommunicationDetails GetPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {

            GetCommunicationDetails CommunicationDetails = new GetCommunicationDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                CommunicationDetails = UserDetailsBAL.GetPaintingCommunicationDetails(CommunicationDetailsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("GetPaintingCommunicationDetails" + ex.Message);
            }
            return CommunicationDetails;
        }


        public InsertCommunicationDetails InsertPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput)
        {
            InsertCommunicationDetails InsertCommunicationDetails = new InsertCommunicationDetails();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();
            try
            {
                InsertCommunicationDetails = UserDetailsBAL.InsertPaintingCommunicationDetails(CommunicationDetailsInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("InsertPaintingCommunicationDetails" + ex.Message);
            }
            return InsertCommunicationDetails;
        }

        public UpdateCheckListItemStatus UpdateCheckListItemStatusForPainting(CheckListItemStatusInput CheckListItemStatusInput)
        {

            UpdateCheckListItemStatus UpdateCheckListItemStatus = new UpdateCheckListItemStatus();
            UserDetailsBAL UserDetailsBAL = new UserDetailsBAL();

            try
            {
                UpdateCheckListItemStatus = UserDetailsBAL.UpdateCheckListItemStatusForPainting(CheckListItemStatusInput);
            }

            catch (Exception ex)
            {
                ErrorLog.WriteToLog("UpdateCheckListItemStatusForPainting" + ex.Message);
            }
            return UpdateCheckListItemStatus;
        }


    }
}


        #endregion


        
