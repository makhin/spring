using System;
using System.ComponentModel.DataAnnotations;

namespace Spring.DbContext.Models
{
    public class Customer : IEntityBase
    {
        [Key]
        public int Id { get; set; }

        public Contract Contract { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [MaxLength(10), MinLength(10)]
        public string TIN { get; set; }

        public string Department { get; set; }

        public string PersonnelNumber { get; set; }

        public int DisabilityGroup { get; set; }

        public string MobilePhone { get; set; }

        public string Position { get; set; }

        public string AdditionalInfo { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
