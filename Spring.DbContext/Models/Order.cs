using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spring.DbContext.Models
{
    public class Order: IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("MedicalInsuranceCase")]
        public int MedicalInsuranceCaseId { get; set; }

        public virtual MedicalInsuranceCase MedicalInsuranceCase { get; set; }

        public DateTime? RecipeDate { get; set; }

        public DateTime? OrderDate { get; set; }

        public string RecipeNumber { get; set; }

        public string OrderNumber { get; set; }

        public string Pharmacy { get; set; }

        public decimal Amount { get; set; }
    }
}
