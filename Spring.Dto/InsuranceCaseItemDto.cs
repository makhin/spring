using System;
using Spring.Common.Enums;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class InsuranceCaseItemDto: IEntityBase
    {
        public int Id { get; set; }

        public string Mkb10Code { get; set; }

        public Treatment? Treatment { get; set; }

        public string HospitalName { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
