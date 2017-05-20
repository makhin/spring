using System;

namespace Spring.DbContext.Models
{
    public class MedicalInsuranceCase: InsuranceCase
    {
        public DateTime? ReportDate { get; set; }
        public DateTime? DocumentDate { get; set; }
    }
}
