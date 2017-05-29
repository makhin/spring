using System;
using System.Collections.Generic;

namespace Spring.Dto
{
    public class MedicalInsuranceCaseDto: InsuranceCaseDto
    {
        public DateTime? ReportDate { get; set; }
        public DateTime? DocumentDate { get; set; }
        public decimal? DiagnosisCosts { get; set; }
        public decimal? FoodCosts { get; set; }
        public decimal? TreatmentСosts { get; set; }
        public virtual ICollection<OrderDto> Orders { get; set; }
    }
}
