using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.ServiceModel.Activation;
using MFBMQFLAPI.JsonClass;

namespace MFBMQFLAPI
{
    [ServiceContract]
    public interface IQFL
    {

        //Get User Details
        //[OperationContract(Name = "GetUserDetails")]
        //[WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetUserDetails?emailid={emailid}")]
        //UserDetails GetUserDetails(string emailid);

        [OperationContract(Name = "GetUserDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetUserDetails")]
        string GetUserDetails(UserDetailInputs Input);


        [OperationContract(Name = "DropDownlistDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DropDownlistDetails")]
        DropDownlistDetails DropDownlistDetails(DropdownDetailsInput DropdownDetailsInput);


        [OperationContract(Name = "GetGateDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetGateDetails")]
        GateDetails GetGateDetails(CheckLineMasterInput CheckLineMasterInput);

        [OperationContract(Name = "GetGateListDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetGateListDetails")]
        GateDetails GetGateListDetails(CheckLineMasterInput CheckLineMasterInput);


        [OperationContract(Name = "GetCheckListItems")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetCheckListItems")]
        CheckListItems GetCheckListItems(CheckListItemInput CheckListItemInput);

        [OperationContract(Name = "UpdateCheckListItemStatus")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateCheckListItemStatus")]
        UpdateCheckListItemStatus UpdateCheckListItemStatus(CheckListItemStatusInput CheckListItemStatusInput);

        [OperationContract(Name = "UpdateBlankCheckItem")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateBlankCheckItem")]
        UpdateCheckListItemStatus UpdateBlankCheckItem(BlankCheckListItem checkListItems);

        [OperationContract(Name = "GetDefectCheckListItems")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDefectCheckListItems")]
        GetDefectCheckListItems GetDefectCheckListItems(GetDefectCheckListItemInput GetDefectCheckListItemInput);


        [OperationContract(Name = "InsertUpdateActualCommentDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateActualCommentDetails")]
        string InsertUpdateActualCommentDetails(Actualcomment ActualcommentInput);



        [OperationContract(Name = "GetActualCommentDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetActualCommentDetails")]
        ActualcommentDetils GetActualCommentDetails(Actualcomment ActualcommentInput);



        [OperationContract(Name = "InsertSignature")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertSignature")]
        InsertSignature InsertSignature(InsertSignatureInput InsertSignatureInput);

        [OperationContract(Name = "GetSealGateDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetSealGateDetails")]
        GetSealGateDetails GetSealGateDetails(GetSealGateDetailsInput IGetSealGateDetailsInput);

        [OperationContract(Name = "InsertStaticCheckItems")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertStaticCheckItems")]
        InsertStaticCheckItems InsertStaticCheckItems(InsertStaticCheckItemsInput InsertStaticCheckItemsInput);


        [OperationContract(Name = "GetDefectCheckListItemNotOk")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDefectCheckListItemNotOk")]
        GetDefectCheckListItems GetDefectCheckListItemNotOk(GetDefectCheckListItemInput GetDefectCheckListItemInput);


        [OperationContract(Name = "UpdateCheckListItemsNotOk")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateCheckListItemsNotOk")]
        UpdateCheckListItemStatus UpdateCheckListItemsNotOk(CheckListItemStatusInput CheckListItemStatusInput);


        [OperationContract(Name = "GetUserValidate")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetUserValidate")]
        UsersDetails GetUserValidate(Users Input);

        [OperationContract(Name = "GetChangePassword")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetChangePassword")]
        ChangePasswordOutput GetChangePassword(ChangePassword Input);


        [OperationContract(Name = "ResetPassword")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/ResetPassword")]
        string ResetPassword(ResetPassword Input);


        [OperationContract(Name = "GetCommunicationDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetCommunicationDetails")]
        GetCommunicationDetails GetCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput);


        [OperationContract(Name = "InsertCommunicationDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertCommunicationDetails")]
        InsertCommunicationDetails InsertCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput);


        [OperationContract(Name = "GetSendEmail")]
        [WebInvoke(Method = "GET", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetSendEmail")]
        EmailDetails GetSendEmail();

        [OperationContract(Name = "UpdateSendEmail")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateSendEmail")]
        string UpdateSendEmail(IsEmailDetails Input);


        [OperationContract(Name = "GetEmailNotificationCheckListItems")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetEmailNotificationCheckListItems")]
        CheckListItems GetEmailNotificationCheckListItems(CheckListItemInput CheckListItemInput);



        [OperationContract(Name = "InsertUpdateCheckListItemImages")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertUpdateCheckListItemImages")]
        InsertUpdateCheckListItemImages InsertUpdateCheckListItemImages(CheckListItemImageInput CheckListItemImageInput);


        [OperationContract(Name = "GetCheckListItemImage")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetCheckListItemImage")]
        GetCheckListItemImage GetCheckListItemImage(CheckListItemImageInput CheckListItemImageInput);


        [OperationContract(Name = "DeleteCheckListItemImages")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/DeleteCheckListItemImages")]
        DeleteCheckListItemImages DeleteCheckListItemImages(CheckListItemImageInput CheckListItemImageInput);


        [OperationContract(Name = "GetCheckListItemImagesForRework")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetCheckListItemImagesForRework")]
        GetCheckListItemImage GetCheckListItemImagesForRework(CheckListItemImageInput CheckListItemImageInput);


        [OperationContract(Name = "UpdateImageFileName")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateImageFileName")]
        InsertUpdateCheckListItemImages UpdateImageFileName(CheckListItemImageInput CheckListItemImageInput);




        [OperationContract(Name = "GetPaintingCommunicationDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetPaintingCommunicationDetails")]
        GetCommunicationDetails GetPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput);


        [OperationContract(Name = "InsertPaintingCommunicationDetails")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/InsertPaintingCommunicationDetails")]
        InsertCommunicationDetails InsertPaintingCommunicationDetails(GetCommunicationDetailsInput CommunicationDetailsInput);



        [OperationContract(Name = "UpdateCheckListItemStatusForPainting")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/UpdateCheckListItemStatusForPainting")]
        UpdateCheckListItemStatus UpdateCheckListItemStatusForPainting(CheckListItemStatusInput CheckListItemStatusInput);
    }
}

