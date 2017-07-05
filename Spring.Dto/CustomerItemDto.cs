using System;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class CustomerItemDto : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TIN { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? TotalAmount { get; set; }
        public int? TotalCount { get; set; }
    }
}
