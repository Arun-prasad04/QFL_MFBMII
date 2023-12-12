using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace MFBMQFLAPI.JsonClass
{
    [Serializable]
    [DataContract]
    public class DPUReportDropdownDetails

    {
        [DataMember]
        public List<DPUReportModel> Model { get; set; }

        [DataMember]
        public List<DPUReportVechileType> VechileType { get; set; }

        [DataMember]
        public List<DPUReportQGate> QGate { get; set; }

    }
    [Serializable]
    [DataContract]
    public class DPUReportDropdownInput

    {
        [DataMember]
        public int UserId { get; set; }

        [DataMember]
        public int PlantId { get; set; }

    }

    [Serializable]
    [DataContract]
    public class DPUReportQGate

    {
        [DataMember]
        public int QGateId { get; set; }

        [DataMember]
        public string GateName { get; set; }

        [DataMember]
        public string LineName { get; set; }

    }

    [Serializable]
    [DataContract]
    public class DPUReportModel

    {
        [DataMember]
        public int ModelID { get; set; }

        [DataMember]
        public string Model { get; set; }
        [DataMember]
        public int VehicleTypeId { get; set; }
    }
    [Serializable]
    [DataContract]
    public class DPUReportVechileType
    {
        [DataMember]
        public int VechileTypeID { get; set; }

        [DataMember]
        public string VechileType { get; set; }

    }

    [Serializable]
    [DataContract]
    public class DPUReportDetails
    {
        [DataMember]
        public List<BarDPUReport> Bar { get; set; }

        [DataMember]
        public List<LineDPUReport> Line { get; set; }
    }

    [Serializable]
    [DataContract]
    public class BarDPUReport
    {
        [DataMember]
        public string Month { get; set; }
        [DataMember]
        public decimal VINCount { get; set; }
    }

    [Serializable]
    [DataContract]
    public class LineDPUReport
    {
        [DataMember]
        public string Month { get; set; }
        [DataMember]
        public decimal LineAverage { get; set; }
        [DataMember]
        public decimal VINCount { get; set; }
    }

    [Serializable]
    [DataContract]
    public class DPUReportInput
    {

        [DataMember]
        public string ModelIds { get; set; }
        [DataMember]
        public string VehicleIds { get; set; }
        [DataMember]
        public string QGateIds { get; set; }
        [DataMember]
        public string Year { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public int PlantId { get; set; }
        [DataMember]
        public int UserId { get; set; }
        [DataMember]
        public string FromDate { get; set; }
        [DataMember]
        public string EndDate { get; set; }

    }

}