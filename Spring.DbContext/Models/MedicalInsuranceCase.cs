using System;
using System.Collections.Generic;
using System.Text;

namespace Spring.DbContext.Models
{
    public class MedicalInsuranceCase: InsuranceCase
    {
        public DateTime? ReportDate { get; set; }
        public DateTime? DocumentDate { get; set; }
    }
}
