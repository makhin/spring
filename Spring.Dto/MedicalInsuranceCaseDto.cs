using System;
using System.Collections.Generic;
using System.Text;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class MedicalInsuranceCaseDto: InsuranceCaseDto
    {
        public DateTime? ReportDate { get; set; }
        public DateTime? DocumentDate { get; set; }
        public virtual ICollection<OrderDto> Orders { get; set; }
    }
}
