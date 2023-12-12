using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
namespace MFBMAutomatedQFL.Models
{
  
     

    public class StandardModel
    {
        public int standardid { get; set; }

        public string standardname { get; set; }

        public int userid { get; set; }

        public string mode { get; set; }

        public string filename { get; set; }

        public string fileguid { get; set; }
        public string filesize { get; set; }
        public string token { get; set; }
        public string filedata { get; set; }
        public int plantid { get; set; }
    }
    
}