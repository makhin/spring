using System;
using System.ComponentModel.DataAnnotations;

namespace Spring.DbContext.Models
{
    public class Contract : IEntityBase
    {
        public Contract()
        {
            IsActive = true;
        }

        [Required]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(10), MinLength(3)]
        public string Code { get; set; }

        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime BeginDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }

        [Required]
        public bool IsActive { get; set; }
    }
}
