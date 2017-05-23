using System;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class OrderDto: IEntityBase
    {
        public int Id { get; set; }

        public DateTime? RecipeDate { get; set; }

        public DateTime? OrderDate { get; set; }

        public string RecipeNumber { get; set; }

        public string OrderNumber { get; set; }

        public string Pharmacy { get; set; }

        public decimal Amount { get; set; }
    }
}
