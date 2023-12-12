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
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IReport" in both code and config file together.
    [ServiceContract]

    public interface IReport
    {

        [OperationContract(Name = "GetDPUReportDropdownlist")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDPUReportDropdownlist")]
        DPUReportDropdownDetails GetDPUReportDropdownlist(DPUReportDropdownInput Input);

        [OperationContract(Name = "GetDPUReport")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDPUReport")]
        DPUReportDetails GetDPUReport(DPUReportInput Input);


        [OperationContract(Name = "GetDefectNumberReport")]
        [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare, UriTemplate = "/GetDefectNumberReport")]
        DPUReportDetails GetDefectNumberReport(DPUReportInput Input);

    }
}
