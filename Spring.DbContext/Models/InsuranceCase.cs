using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Spring.Common.Enums;

namespace Spring.DbContext.Models
{
    public abstract class InsuranceCase: IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        public virtual Customer Customer { get; set; }

        [ForeignKey("Mkb10")]
        public int? Mkb10Id { get; set; }

        public virtual Mkb10 Mkb10 { get; set; }

        public Threatment? Threatment { get; set; }

        public Therapy? Therapy { get; set; }

        [ForeignKey("Hospital")]
        public int? HospitalId { get; set; }

        public virtual Hospital Hospital { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
