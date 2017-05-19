using System;
using Spring.Common.Enums;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class InsuranceCaseItemDto: IEntityBase
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public string Mkb10Code { get; set; }

        public Threatment? Threatment { get; set; }

        public string HospitalName { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
