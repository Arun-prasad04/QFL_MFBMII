using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MFBMAutomatedQFL.Models
{
    public class CheckListMaster
    {
        public int checklistid { get; set; }
        public int modelid { get; set; }
        public int vehicletypeid { get; set; }
        public int qgateid { get; set; }
        public int plantcode { get; set; }
        public string filename { get; set; }
        public string checklistitems { get; set; }
        public byte isactive { get; set; }
        public int createdby { get; set; }
        public string mode { get; set; }
        public string result { get; set; }
        public string Linename { get; set; }
    }
}