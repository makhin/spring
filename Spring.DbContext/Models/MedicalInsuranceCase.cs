using System;
using System.Collections.Generic;

namespace Spring.DbContext.Models
{
    public class MedicalInsuranceCase: InsuranceCase
    {
        public DateTime? ReportDate { get; set; }
        public DateTime? DocumentDate { get; set; }
        public virtual IEnumerable<Order> Orders { get; set; }
    }
}
